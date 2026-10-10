from pathlib import Path
import json

# A srcset image's naturalWidth is density-corrected. Inspect the selected file
# without srcset to test encoded pixels, rather than confusing CSS width with pixels.
p=Path('tests/browser_suite.py');s=p.read_text();old="art.evaluate('e=>e.naturalWidth===e.naturalHeight&&e.naturalWidth>=480')";assert old in s
s=s.replace(old,"art.evaluate('async e=>{const i=new Image();i.src=e.currentSrc;await i.decode();return i.naturalWidth===i.naturalHeight&&[480,960].includes(i.naturalWidth)}')");p.write_text(s)
p=Path('tests/cini_e2e.py');s=p.read_text();old='await e.decode();return e.naturalWidth>=480&&e.naturalWidth===e.naturalHeight&&getComputedStyle(e).filter===\"none\"';assert old in s
s=s.replace(old,'await e.decode();const i=new Image();i.src=e.currentSrc;await i.decode();return [480,960].includes(i.naturalWidth)&&i.naturalWidth===i.naturalHeight&&getComputedStyle(e).filter===\"none\"');p.write_text(s)

p=Path('tests/research_e2e.py');s=p.read_text();a=s.index("                    values=page.locator('.manuscript-inner')");b=s.index("                    check('Marmara restored'",a)
s=s[:a]+'''                    values=page.locator('.approved-portal').evaluate('e=>({image:getComputedStyle(e).backgroundImage,filter:getComputedStyle(e).filter,before:getComputedStyle(e,"::before").display,after:getComputedStyle(e,"::after").display})')
                    check(f'{engine}/{locale}/{width} no white overlay',values['after']=='none' and values['before']=='none')
                    check(f'{engine}/{locale}/{width} no glow gradient',values['image']=='none' and values['filter']=='none')
                    check('no superseded wordmark or subtitle overlay',page.locator('.manuscript-wordmark,.manuscript-subline,.manuscript-pattern').count()==0)
                    check('approved geometry belongs to the unchanged artwork',page.locator('.approved-portal-image').evaluate('async e=>{await e.decode();return /approved-portal-(480|960)\\.webp/.test(e.currentSrc)&&e.naturalWidth>0}'))
'''+s[b:];p.write_text(s)

# Preserve the legacy ebru attribution, but do not misattribute the new AI artwork.
notes=[
'Katmanlı MARSAM kemer görseli yapay zekâ desteğiyle üretilmiş ve site için onaylanmıştır. Gerçek bir yapı fotoğrafı değildir. Önceki ebru dokusunun kaynağı Akcire.14, Battal Ebru, CC BY-SA 4.0, renk uyarlaması yapılmıştır. Kenar çini bezemeleri bu site için çizilmiştir. Kitap kapaklarının hakları yayıncılara aittir.',
'The approved layered MARSAM portal is AI-generated artwork, not a photograph of a real building. Legacy ebru texture credit, Akcire.14, Battal Ebru, CC BY-SA 4.0, colours adapted. The peripheral cini ornaments were drawn for this site. Book covers remain copyrighted by their publishers.',
'Das freigegebene mehrschichtige MARSAM-Portal ist eine KI-generierte Grafik, kein Foto eines realen Gebäudes. Frühere Ebru-Textur von Akcire.14, Battal Ebru, CC BY-SA 4.0, Farben angepasst. Die Randornamente wurden für diese Website gezeichnet. Buchcover bleiben urheberrechtlich geschützt.',
'经批准的MARSAM多层拱门图像由人工智能辅助生成，并非真实建筑的照片。此前使用的Ebru纹理由Akcire.14创作，作品Battal Ebru，CC BY-SA 4.0，颜色经过调整。边缘纹样为本站原创绘制。书籍封面版权归相应出版方所有。',
'Утверждённое изображение многослойного портала MARSAM создано с помощью ИИ и не является фотографией реального здания. Прежняя текстура эбру, Akcire.14, Battal Ebru, CC BY-SA 4.0, цвета изменены. Орнаменты по краям созданы для сайта. Права на обложки принадлежат издателям.',
'صورة بوابة MARSAM متعددة الطبقات عمل معتمد أُنتج بمساعدة الذكاء الاصطناعي، وليست صورة فوتوغرافية لمبنى حقيقي. نسيج الإبرو السابق من Akcire.14، Battal Ebru، بترخيص CC BY-SA 4.0 مع تعديل الألوان. زخارف الحواف رُسمت لهذا الموقع. حقوق الأغلفة للناشرين.',
'Gambar portal MARSAM berlapis yang disetujui dibuat dengan bantuan AI, bukan foto bangunan nyata. Kredit tekstur ebru sebelumnya, Akcire.14, Battal Ebru, CC BY-SA 4.0, dengan adaptasi warna. Ornamen tepi digambar untuk situs ini. Hak cipta sampul milik penerbit.',
'Gambar portal MARSAM berlapis yang diluluskan dihasilkan dengan bantuan AI, bukan foto bangunan sebenar. Kredit tekstur ebru terdahulu, Akcire.14, Battal Ebru, CC BY-SA 4.0, dengan warna disesuaikan. Hiasan tepi dilukis untuk laman ini. Hak cipta kulit buku milik penerbit.'
]
p=Path('src/heritage-copy.mjs');s=p.read_text();a=s.index(' imageNote:C(');b=s.index('\n',a)
s=s[:a]+' imageNote:C('+','.join(json.dumps(n,ensure_ascii=False)for n in notes)+'),'+s[b:];p.write_text(s)
