"""Real HTTP, native browser state, downloads and script-aware screenshots.

No request routing, storage substitutes, CSP removal or network mocks. The browser
engine matrix is selected with BROWSERS. A public run uses PREVIEW_ORIGIN and the
same generated manifest as the candidate. Test receipts describe their limits.
"""
from __future__ import annotations
import json
import os
import subprocess
import time
import traceback
import urllib.request
from pathlib import Path
from urllib.parse import quote
from playwright.sync_api import sync_playwright, expect
import re, pwd
# Container HOME must belong to its effective user, especially for Firefox.
os.environ["HOME"] = pwd.getpwuid(os.getuid()).pw_dir

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = json.loads((ROOT / 'dist/build-manifest.json').read_text())
BASE = MANIFEST['base']
VERSION = MANIFEST['version']
PORTS = {'core': '4191', 'scope': '4192', 'layout': '4193'}
LOCALES = MANIFEST['locales']
DOI = '10.37898/spiritualpc.1793082'
ISBN = '978-625-8804-58-4'

class Review:
    def __init__(self, mode: str):
        self.mode = mode
        self.origin = os.environ.get('PREVIEW_ORIGIN', f'http://127.0.0.1:{PORTS[mode]}').rstrip('/')
        self.output = ROOT / '.browser-results/reading-room' / mode
        self.output.mkdir(parents=True, exist_ok=True)
        self.receipts = ROOT / 'verification'
        self.receipts.mkdir(exist_ok=True)
        self.checks = []
        self.errors = []
        self.posts = []
        self.engines = {}
        self.last_page = None
        self.server = None

    def ck(self, name, result):
        passed = bool(result)
        self.checks.append({'name': name, 'passed': passed})
        if not passed:
            raise AssertionError(name)

    def goto(self, page, locale, path=''):
        self.last_page = page
        response = page.goto(self.origin + BASE + locale + '/' + path, wait_until='load')
        self.ck(f'HTTP {locale}/{path}', response is not None and response.status == 200)
        expect(page.locator("body")).to_have_attribute("data-release", VERSION)
        return response

    def fit(self, page, name):
        size = page.evaluate('({width:innerWidth,document:document.documentElement.scrollWidth})')
        if size['document'] > size['width'] + 1:
            offenders = page.evaluate("""() => [...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&getComputedStyle(e).visibility!=='hidden'&&(r.right>innerWidth+1||r.left < -1)}).slice(0,35).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent.slice(0,85),rect:e.getBoundingClientRect().toJSON()}))""")
            intrinsic = page.evaluate("""() => [...document.querySelectorAll('body *')].filter(e=>{const s=getComputedStyle(e);return e.clientWidth>0&&e.scrollWidth>e.clientWidth+1&&s.overflowX==='visible'}).map(e=>({tag:e.tagName,cls:String(e.className),text:e.textContent.slice(0,100),scroll:e.scrollWidth,client:e.clientWidth,rect:e.getBoundingClientRect().toJSON()}))""")
            (self.output / 'overflow.json').write_text(json.dumps({'name': name, 'size': size, 'offenders': offenders, 'intrinsic': intrinsic}, ensure_ascii=False, indent=2))
        self.ck(name, size['document'] <= size['width'] + 1)

    def context(self, browser, **kwargs):
        ctx = browser.new_context(accept_downloads=True, **kwargs)
        ctx.on('page', lambda p: p.on('pageerror', lambda error: self.errors.append(str(error))))
        ctx.on('request', lambda request: self.posts.append(request.url) if request.method == 'POST' else None)
        return ctx

    def download(self, page, selector):
        with page.expect_download() as event:
            page.locator(selector).click()
        return Path(event.value.path()).read_text(encoding='utf-8')

    def core(self, browser, engine):
        for locale in LOCALES:
            ctx = self.context(browser, viewport={'width': 1280, 'height': 920})
            page = ctx.new_page()
            self.goto(page, locale, 'dossier/preferences-and-boundaries/')
            page.locator('[data-open-search]').click()
            self.ck(f'{engine}/{locale} dialog focus', page.locator('#global-search').evaluate('(e)=>e===document.activeElement'))
            page.keyboard.press('Escape')
            self.ck(f'{engine}/{locale} dialog restores focus', page.locator('[data-open-search]').evaluate('(e)=>e===document.activeElement'))
            page.locator('[data-save]').click()
            page.reload(wait_until='load')
            self.ck(f'{engine}/{locale} saved state persists', page.locator('[data-save]').get_attribute('aria-pressed') == 'true')
            self.goto(page, locale, 'saved/')
            page.wait_for_selector('.saved-item')
            self.ck(f'{engine}/{locale} saved record resolves', page.locator('.saved-item').count() == 1)
            self.ck(f'{engine}/{locale} storage scope disclosed', len(page.locator('main .notice p').inner_text()) > 40)
            page.locator('[data-clear-saved]').click()
            expect(page.locator(".saved-item")).to_have_count(0)

            self.goto(page, locale, 'search/')
            page.locator('#page-search').fill('https://doi.org/' + DOI)
            page.wait_for_selector('[data-search-results] .search-result')
            self.ck(f'{engine}/{locale} exact DOI first', '/resource/sipas/' in page.locator('.search-result').first.get_attribute('href'))
            page.locator('#page-search').fill('ISBN ' + ISBN.replace('-', ''))
            expect(page.locator(".search-result").first).to_have_attribute("href", re.compile(r"/resource/trauma-spirituality/"))
            self.ck(f'{engine}/{locale} identifier not generic search', page.locator('.search-result').count() == 1)
            page.locator('#page-search').fill('<svg onload=alert(1)>')
            page.wait_for_timeout(250)
            self.ck(f'{engine}/{locale} hostile query is text', page.locator('[data-search-results] svg').count() == 0)

            self.goto(page, locale, 'books/')
            page.locator('[data-view="list"]').click()
            page.locator('[data-bib-query]').fill(ISBN)
            expect(page.locator("[data-bib-record]:not([hidden])")).to_have_count(1)
            self.ck(f'{engine}/{locale} native list toggle', page.locator('.books-full').get_attribute('data-view') == 'list')
            target = 'ar' if locale != 'ar' else 'ms'
            page.locator('.language-select summary').click()
            with page.expect_navigation(wait_until='load'):
                page.locator(f'.language-panel a[hreflang="{target}"]').click()
            page.wait_for_selector('[data-view="list"][aria-pressed="true"]')
            self.ck(f'{engine}/{locale} filter survives language change', page.locator('[data-bib-query]').input_value() == ISBN and page.locator('[data-bib-record]:visible').count() == 1)
            self.ck(f'{engine}/{locale} view survives language change', 'view=list' in page.url and 'q=' in page.url)
            page.locator('[data-bib-form] button[type=reset]').click()
            expect(page.locator("[data-bib-record]:not([hidden])")).to_have_count(page.locator("[data-bib-record]").count())

            self.goto(page, locale, 'library/')
            buttons = page.locator('[data-compare-id]')
            self.ck(f'{engine}/{locale} all sources comparable', buttons.count() == MANIFEST['resources'])
            for i in range(4):
                buttons.nth(i).click()
            buttons.nth(4).click()
            self.ck(f'{engine}/{locale} comparison limit', buttons.nth(4).get_attribute('aria-pressed') == 'false')
            page.locator('[data-compare-nav]').first.click()
            page.wait_for_selector('.comparison-table')
            self.ck(f'{engine}/{locale} four record columns', page.locator('.comparison-table thead th').count() == 5)
            data = json.loads(self.download(page, '[data-comparison-export]'))
            self.ck(f'{engine}/{locale} descriptive real export', len(data['items']) == 4 and data['scientificApproval'] is False and data['clinicalRanking'] is False)
            page.set_viewport_size({'width': 390, 'height': 900})
            for comparison_width in [320, 390]:
                page.set_viewport_size({'width': comparison_width, 'height': 900})
                self.fit(page, f'{engine}/{locale}/{comparison_width} comparison scroll contained')
            native = page.locator('#compare-1')
            native.focus()
            self.ck(f'{engine}/{locale} native select keeps keyboard focus', native.evaluate('(e)=>e.tagName==="SELECT"&&e===document.activeElement'))
            native.select_option('client-preference')
            expect(page.locator('.comparison-table thead th')).to_have_count(4)
            self.ck(f'{engine}/{locale} native selection updates comparison', native.input_value() == 'client-preference')
            if engine == 'webkit' and locale in ['ru','ar','en']:
                page.screenshot(path=str(self.output / f'{locale}-comparison-mobile.png'), full_page=True)
            self.goto(page, locale, 'compare/?ids=aservic-principles,aservic-principles,unknown,%3Cimg%3E')
            self.ck(f'{engine}/{locale} selection validation', page.locator('.comparison-table thead th').count() == 2)

            self.goto(page, locale, 'resource/sipas/')
            self.ck(f'{engine}/{locale} separate review dimensions', page.locator('.review-dimensions > div').count() == 6)
            self.ck(f'{engine}/{locale} actual RIS', DOI in self.download(page, 'a[download][href$=".ris"]'))
            self.ck(f'{engine}/{locale} actual BibTeX', DOI in self.download(page, 'a[download][href$=".bib"]'))

            self.goto(page, locale, 'contribute/')
            page.locator('[data-requires-js]').click()
            page.wait_for_selector('[data-error-summary]:visible')
            self.ck(f'{engine}/{locale} summary receives focus', page.locator('[data-error-summary]').evaluate('(e)=>e===document.activeElement'))
            page.locator('[data-error-summary] a[href="#draft-title"]').click()
            self.ck(f'{engine}/{locale} error links to field', page.locator('#draft-title').evaluate('(e)=>e===document.activeElement'))
            page.locator('#draft-title').fill('Public bibliographic suggestion')
            page.locator('#draft-url').fill('https://doi.org/' + DOI)
            page.locator('#draft-note').fill('A public source suggestion, without personal or clinical data.')
            page.locator('#draft-confirm').check()
            data = json.loads(self.download(page, '[data-requires-js]'))
            self.ck(f'{engine}/{locale} local proposal not submission', data['submission'] == 'not-sent' and data['status'] == 'local-draft')
            ctx.close()

    def scope(self, browser, engine):
        for locale in LOCALES:
            ctx = self.context(browser, viewport={'width': 390, 'height': 900})
            page = ctx.new_page()
            for path in ['about/', 'governance/', 'research/', 'events/', 'media/', 'projects/', 'news/']:
                self.goto(page, locale, path)
                self.fit(page, f'{engine}/{locale}/{path} fits')
                self.ck(f'{engine}/{locale}/{path} planned masthead', page.locator('[data-institution-status="planned"]').count() == 1)
                self.ck(f'{engine}/{locale}/{path} restored planned institution', page.locator('.university-signature').count() == 1 and page.locator('[data-institution-status=planned]').count() == 1 and page.locator('.institution-card,.partner-grid').count() == 0)
            self.goto(page, locale, 'governance/')
            self.ck(f'{engine}/{locale} privacy addressable', page.locator('#privacy').count() == 1)
            self.ck(f'{engine}/{locale} accessibility addressable', page.locator('#accessibility').count() == 1)
            self.goto(page, locale, 'research/')
            cells = page.locator('.collection-profile tbody tr td').all_text_contents()
            # The visible table counts the selected source ledger, not population evidence.
            self.ck(f'{engine}/{locale} real catalogue counts', sum(int(v) for v in cells if v.strip().isdigit()) == MANIFEST['sources'])
            ctx.close()
        ctx = self.context(browser, java_script_enabled=False, viewport={'width': 390, 'height': 900})
        page = ctx.new_page()
        for locale in ['tr', 'en', 'ar', 'zh', 'ms']:
            self.goto(page, locale, 'books/')
            self.ck(f'{engine}/{locale} readable no-JS books', page.locator('.book-object').count() >= 1)
            self.ck(f'{engine}/{locale} no-JS inactive toggle hidden', not page.locator('[data-view-switch]').is_visible())
            self.goto(page, locale, 'publications/')
            self.ck(f'{engine}/{locale} readable no-JS papers', page.locator('.research-record').count() >= 1)
            self.goto(page, locale, 'dossier/reading-evidence/')
            self.ck(f'{engine}/{locale} no-JS scholarly reading', page.locator('.reading-body p').count() > 5)
        ctx.close()

    def layout(self, browser, engine):
        for locale in LOCALES:
            ctx = self.context(browser, viewport={'width': 1440, 'height': 1000})
            page = ctx.new_page()
            for width in [320, 390, 768, 1440]:
                page.set_viewport_size({'width': width, 'height': 1000})
                for path in ['', 'books/', 'publications/', 'resource/sipas/', 'dossier/reading-evidence/', 'measurement-observatory/', 'evidence-bridges/', 'datasets/', 'construct-dictionary/']:
                    self.goto(page, locale, path)
                    page.evaluate('document.fonts.ready')
                    self.fit(page, f'{engine}/{locale}/{path}/{width} reflow')
                    self.ck(f'{engine}/{locale}/{path}/{width} direction', page.locator('html').get_attribute('dir') == ('rtl' if locale == 'ar' else 'ltr'))
                    self.ck(f'{engine}/{locale}/{path}/{width} one stylesheet', page.locator('link[rel=stylesheet]').count() == 1)
                    if path == '':
                        self.ck(f'{engine}/{locale}/{width} global search remains reachable', page.locator('[data-open-search]').is_visible())
                        self.ck(f'{engine}/{locale}/{width} rejected hero block absent', page.locator('.hero-search-form,.hero-deck,.hero-actions').count() == 0)
                        self.ck(f'{engine}/{locale}/{width} crossed-out embellishments absent', page.locator('.heritage-floral,.heritage-rosette').count() == 0)
                        art = page.locator('.approved-portal-image')
                        art.evaluate('(e)=>e.decode()')
                        box = art.bounding_box()
                        self.ck(f'{engine}/{locale}/{width} exact approved portal is square', abs(box['width']-box['height']) <= 1 and art.evaluate('async e=>{const i=new Image();i.src=e.currentSrc;await i.decode();return i.naturalWidth===i.naturalHeight&&[480,960].includes(i.naturalWidth)}'))
                        self.ck(f'{engine}/{locale}/{width} decorative picture never captures input', art.evaluate('(e)=>getComputedStyle(e).pointerEvents') == 'none')
                        self.ck(f'{engine}/{locale}/{width} superseded subtitle and flat overlay absent', page.locator('.manuscript-subline,.manuscript-inner').count() == 0)
                        if width < 650:
                            self.ck(f'{engine}/{locale}/{width} compact heritage follows title', page.locator('.heritage-art').bounding_box()['y'] > page.locator('#centre-title').bounding_box()['y'] and page.locator('.heritage-art').bounding_box()['height'] < 340)
                            page.locator('.mobile-nav summary').click()
                            self.fit(page, f'{engine}/{locale}/{width} open menu')
                            page.locator('.mobile-nav summary').click()
                    if engine == 'chromium' and locale in ['tr', 'en', 'ar', 'zh'] and width in [390, 1440] and (not path or (locale == 'en' and width == 1440)):
                        page.evaluate("async()=>{for(const i of document.images){if(i.loading==='lazy')i.loading='eager'}await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))}")
                        self.ck(f'{locale}/{path}/{width} images decode', page.evaluate("[...document.images].every(i=>i.complete&&i.naturalWidth>0)"))
                        name = f'{locale}-{path.strip("/").replace("/", "_") or "home"}-{width}'
                        page.screenshot(path=str(self.output / (name + '.png')), full_page=True)
                        if not path:
                            page.screenshot(path=str(self.output / (name + '-viewport.png')), full_page=False)
            ctx.close()
        # Text resizing changes the root size rather than emulating browser zoom.
        for locale in ['en', 'de', 'ar', 'zh']:
            ctx = self.context(browser, viewport={'width': 390, 'height': 1000}, reduced_motion='reduce')
            page = ctx.new_page()
            for path in ['', 'books/', 'resource/sipas/', 'governance/']:
                self.goto(page, locale, path)
                page.evaluate("document.documentElement.style.fontSize='200%'")
                self.fit(page, f'{engine}/{locale}/{path} 200-percent text')
            self.ck(f'{engine}/{locale} reduced motion', page.evaluate("matchMedia('(prefers-reduced-motion:reduce)').matches"))
            ctx.close()
        ctx = self.context(browser, viewport={'width': 390, 'height': 1000}, forced_colors='active')
        page = ctx.new_page()
        self.goto(page, 'en')
        self.fit(page, f'{engine} forced-colour layout')
        self.ck(f'{engine} forced-colour decoration removed', not page.locator('.heritage-art').is_visible())
        ctx.close()

    def run(self):
        failed = None
        try:
            if not os.environ.get('PREVIEW_ORIGIN'):
                self.server = subprocess.Popen(['node', 'scripts/serve.mjs'], cwd=ROOT, env={**os.environ, 'PORT': PORTS[self.mode]}, stdout=subprocess.DEVNULL)
            for _ in range(60):
                try:
                    with urllib.request.urlopen(self.origin + BASE + 'en/', timeout=3):
                        break
                except Exception:
                    time.sleep(.2)
            with sync_playwright() as p:
                for engine in os.environ.get('BROWSERS', 'chromium').split(','):
                    engine = engine.strip()
                    browser = getattr(p, engine).launch(headless=True)
                    self.engines[engine] = browser.version
                    try:
                        getattr(self, self.mode)(browser, engine)
                    finally:
                        if self.last_page and not self.last_page.is_closed():
                            try:
                                self.last_page.screenshot(path=str(self.output / f'{engine}-last-state.png'), full_page=True)
                            except Exception:
                                pass
                        browser.close()
            self.ck('no uncaught browser exceptions', not self.errors)
            self.ck('no POST requests', not self.posts)
        except Exception:
            failed = traceback.format_exc()
            raise
        finally:
            if self.server:
                self.server.terminate()
                self.server.wait(timeout=10)
            receipt = {'mode': 'REAL_HTTP_NATIVE_BROWSER', 'suite': self.mode, 'origin': self.origin, 'base': BASE, 'release': VERSION, 'browsers': self.engines, 'checks': self.checks, 'passed': sum(c['passed'] for c in self.checks), 'total': len(self.checks), 'success': failed is None, 'error': failed, 'browserErrors': self.errors, 'posts': self.posts, 'mockedIO': False, 'limits': ['Not an independent accessibility audit, screen-reader assessment, human usability study, scientific approval or native-language review.', 'The text enlargement test uses root font sizing, not a claim about every browser zoom configuration.']}
            (self.receipts / f'reading-room-{self.mode}.json').write_text(json.dumps(receipt, ensure_ascii=False, indent=2))
        print(json.dumps({'suite': self.mode, 'passed': len(self.checks), 'engines': self.engines}))
