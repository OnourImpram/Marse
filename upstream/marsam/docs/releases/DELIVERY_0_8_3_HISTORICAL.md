# MARSAM 0.8.3. Onaylanan katmanlı portal ve geri plandaki çini

3 Ekim 2026. Proje sahibinin seçtiği katmanlı MARSAM portalı, mevcut akademik ana sayfa düzeni içinde yayımlandı. Arka plandaki çini motifleri önceki yüksek görünürlük düzeyinden geri çekildi. Akademik içerik, sekiz dil, Marmara kimliği ve mevcut etkileşimler korunuyor.

## Canlı site

https://onourimpram.github.io/MARSAM/tr/?v=0.8.3

https://onourimpram.github.io/MARSAM/en/?v=0.8.3

## Görsel değişiklik

Ana sayfadaki eski düz MARSAM paneli, proje sahibinin açıkça onayladığı katmanlı portal görseliyle değiştirildi. Kompozisyon fildişi ve sıcak kâğıt yüzeyler, mevcut turkuaz ebru paleti, ince altın hatlar ve tekrarlanan kemer katmanlarından oluşuyor. Görselin merkezinde yalnızca MARSAM yer alıyor. Önceki “Araştırma · Öğrenme” alt yazısı ve ayrı ön plan kelime katmanı kaldırılmış durumda.

Orijinal onaylı görsel yeniden üretilmedi veya yeniden renklendirilmedi. 960 ve 480 piksel WebP türevleri aynı kare oran korunarak hazırlandı. Masaüstü türevinin SHA256 değeri `00a058dc8f737d73d9bfbd49ef9e541fe54defb2f8d0015efa3ad77cfaa6c66b`.

Sayfa, hero ve üst boşluktaki mevcut özgün çini SVG’leri aynı çizim ve renklerle korunuyor. Yalnız görünürlükleri geri plana alındı. Masaüstü alfa değerleri yaklaşık 0,09, 0,11 ve 0,08. Daha dar kırılma noktalarında 0,05 ila 0,07 aralığı kullanılıyor. Motifler merkeze doğru alfa maskesiyle kayboluyor. Beyaz örtü, parlama, bulanıklık, neon etki veya hareket eklenmedi.

Marmara Üniversitesi logosu, Atatürk Eğitim Fakültesi, Eğitim Bilimleri Bölümü ve Rehberlik ve Psikolojik Danışmanlık Anabilim Dalı satırı aynı kaldı. Tipografi, grid, kartlar, kitap ve makale kayıtları, araştırma rehberleri, indirilebilir dosyalar, arama, okuma listesi, kaynak karşılaştırma ve sekiz dil korunuyor.

## Doğrulama

Tam aday doğrulaması https://github.com/OnourImpram/MARSAM/actions/runs/37103211071

Bu doğrulamada Chromium, Firefox ve WebKit kullanıldı. Ana etkileşim paketi 818, kapsam paketi 899, yerleşim paketi 2723, araştırma tarayıcı paketi 2324 ve çini paketi 1393 kontrolü başarıyla tamamladı. Bunlar otomatik assertion sayılarıdır, bağımsız kullanıcı veya senaryo sayıları değildir.

Kaynak ana dalına aktarım sonrasında standart doğrulama ayrıca başlatıldı. Uygulama dosyalarının yayımlanan kimliği aşağıdaki kaynak committir.

## Yayın

Uygulama kaynağı `4ecce9f3f3be90e532890f1f071e4301bd035bd3`.

Hosting staging işi https://github.com/OnourImpram/onourimpram.github.io/actions/runs/37104882349 başarıyla tamamlandı. İş, tam kaynak commitini derledi, sürümün 0.8.3 olduğunu kontrol etti ve yalnız MARSAM alt ağacını staging dalında değiştirdi.

Hosting ana dalında yalnız MARSAM alt ağacı, staging işinde üretilen `ff558e3279001baefccc6e020ad1ec4b9d9fc541` ağacıyla değiştirildi. Diğer üst düzey içerik mevcut ana dal ağacından korundu.

Hosting commit `1245e91a67b2de15ca6846820b48612a496f6437`.

GitHub Pages build ve deployment https://github.com/OnourImpram/onourimpram.github.io/actions/runs/37104944002 başarıyla tamamlandı.

Yayımlanan `MARSAM/release.json`, sürümü `0.8.3`, kaynak commitini `4ecce9f3f3be90e532890f1f071e4301bd035bd3` ve 652 kamusal dosyayı kaydediyor.

## Performans ve erişilebilirlik sınırları

Yeni portal iki WebP türevi ekler. Yeni JavaScript, font, animasyon veya üçüncü taraf görsel bağımlılığı eklenmez. CSS gzip ölçümü aday doğrulamasında 13.320 bayt ile mevcut bütçe içindedir.

Dekoratif görsel etkileşim yakalamaz. Yazdırma ve zorlanmış renk modlarındaki korumalar sürer. Mobilde duvar kâğıdı etkisi kullanılmaz. Bu kontroller bağımsız WCAG sertifikası, saha Core Web Vitals ölçümü veya gerçek kullanıcı araştırması değildir.

## Kurumsal ve akademik sınır

Teknik yayın resmî kuruluş, akreditasyon, klinik hizmet yetkisi, bilimsel editör onayı veya insan tarafından tamamlanmış sekiz dil incelemesi anlamına gelmez. Bu durumlar ayrı yönetişim süreçleri olarak korunur.

Görsel karar docs/design/APPROVED_PORTAL_0_8_3.md dosyasında, görsel kökeni ve işleme kaydı docs/design/APPROVED_PORTAL_ASSETS.json dosyasında yer alır. 0.8.2 ve daha eski teslimler Git geçmişinde korunur.
