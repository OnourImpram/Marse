# MARSAM 0.9.1

Maneviyat ve Ruh Sağlığı Araştırmaları Merkezi için sekiz dilli akademik bilgi platformu. Planlanan akademik yapı Marmara Üniversitesi, Atatürk Eğitim Fakültesi, Eğitim Bilimleri Bölümü, Rehberlik ve Psikolojik Danışmanlık Anabilim Dalıdır. Resmî kuruluş, akreditasyon veya klinik hizmet yetkisi bu teknik teslimle doğrulanmış sayılmaz.

## Canlı site

Türkçe https://onourimpram.github.io/MARSAM/tr/

English https://onourimpram.github.io/MARSAM/en/

Araştırma rehberleri https://onourimpram.github.io/MARSAM/tr/research/

Ölçme araçları https://onourimpram.github.io/MARSAM/tr/measures/

## 0.9.1 bilimsel düzeltmesi

Bu sürüm 0.9.0'ın görsel sistemini ve bilgi mimarisini koruyarak ölçme ve çok dilli kanıt sürekliliğindeki somut açıkları giderir.

- Ekşi ve Kardaş 2017 tarafından geliştirilen 29 maddelik Spiritual Well-Being Scale ile Paloutzian ve Ellison'ın 20 maddelik Spiritual Well-Being Scale arayüzde ve veri modelinde ayrı ölçme araçları olarak tanımlanır.
- Ekşi ve Kardaş kaynağındaki SRMR uyuşmazlığı gizlenmez. Özet .50, Tablo 6 ise .050 verir. MARSAM bunu kaynak içi uyuşmazlık olarak kaydeder, sessizce düzeltmez.
- Türkçe form, uyarlama, geliştirme ve bağımsız doğrulama kavramları birbirinin yerine kullanılmaz.
- Hakkında sayfasındaki yinelenen giriş kaldırılır.
- Kurucu metni, kanıt temaları ve ölçme anlatıları kaynak ve dil sürümü bağlarıyla izlenir. Bir içerik değiştiğinde eski dil sürümünün sessizce güncel görünmesi engellenir.
- Kaynak defterinde tek bir üst düzey kontrol tarihi yerine kayıt düzeyindeki inceleme tarihleri yetkilidir.
- Görsel tasarım, ebru portalı, çini yoğunluğu, Marmara masthead'i, palet, tipografi ve akademik içerik düzeni değiştirilmedi.

## Bilimsel içerik

MARSAM 36 kaynaklık kamusal akademik seçki, altı temalı Kanıtı okumak alanı, araştırma ve yöntem rehberleri, yeniden üretilebilir örnekler ve ölçme profilleri sunar. Kaynak seçimi yazarlık prestijine değil, maneviyat ve ruh sağlığı alanına maddi katkıya dayanır.

## Doğrulama

0.9.1 kaynak commit: `b0f1ddb59b97b480fb994226a196e2d40d184d9c`.

Aday doğrulama: https://github.com/OnourImpram/MARSAM/actions/runs/37192115633

Ana dal doğrulama: https://github.com/OnourImpram/MARSAM/actions/runs/37201521701

Hosting staging doğrulama: https://github.com/OnourImpram/onourimpram.github.io/actions/runs/37201910825

GitHub Pages yayını: https://github.com/OnourImpram/onourimpram.github.io/actions/runs/37202021619

Hosting commit: `0e0a0e9f38451ccf18b8a421f1be900edc19ad31`.

MARSAM yayın ağacı: `b584efaa8bc5f3e5be6a74fbc3258809ff533dc7`.

Güncel teslim kaydı [DELIVERY_STATUS.md](DELIVERY_STATUS.md), değişmez sürüm kaydı [docs/releases/scholarly-correction-0.9.1-live.json](docs/releases/scholarly-correction-0.9.1-live.json) içindedir.

## Geliştirme

Node.js 22 veya üzeri.

```sh
npm run check
BASE_PATH=/MARSAM/ PAGES_PREVIEW=true npm run check
node scripts/budget.mjs
BROWSERS=chromium,firefox,webkit python tests/browser_e2e.py
BROWSERS=chromium,firefox,webkit python tests/scope_e2e.py
BROWSERS=chromium,firefox,webkit python tests/heritage_e2e.py
BROWSERS=chromium,firefox,webkit python tests/research_e2e.py
BROWSERS=chromium,firefox,webkit python tests/cini_e2e.py
BROWSERS=chromium,firefox,webkit python tests/scholarship_e2e.py
python tests/research_artifacts.py
```

Teknik testler bilimsel editör onayı, ana dil uzmanı incelemesi, gerçek cihaz veya ekran okuyucu araştırması ya da bağımsız erişilebilirlik sertifikası değildir. Özel ders dosyaları, tanımlanabilir katılımcı verileri ve paylaşım izni olmayan ham veri setleri yayımlanmaz.
