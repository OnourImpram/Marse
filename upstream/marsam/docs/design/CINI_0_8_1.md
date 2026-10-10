# MARSAM 0.8.1. İznik esintili çini yüzeyi

2 Ekim 2026. Kullanıcı üç yaklaşım arasından önerilen seyrek, asimetrik köşe kompozisyonunu onayladı. Mevcut geometrik arka planı yalnızca korumak veya daha da silikleştirmek yerine özgün bir çini dili istedi.

## Uygulama

İki özgün SVG, hatayi esintili çok yapraklı çiçekleri, rumi karakterli kıvrımları, stilize laleleri ve uzun yaprakları farklı dal kompozisyonlarında birleştirir. Belirli bir tarihî eser, panel, müze fotoğrafı veya haricî SVG çizimi kopyalanmaz. Kobalt #46647a ve turkuaz #648a88 yalnız bezemede kullanılır. Mercan eklenmedi.

Tekrarlı sayfa ve açılış geometrisi kaldırıldı. Yerine kısmen ekran dışında kalan, tekrar etmeyen çini parçaları geçti. Maskeler mevcut 82,5 rem içerik sınırına bağlıdır. Merkezdeki şeffaf liste satırlarının arkasına bezeme taşınmaz. Açılış başlığının ÜSTÜNDEKİ boşlukta ayrı küçük bir dal fragmanı vardır. Metnin arkasına gelmez. Yalnız çizimin alfa kanalı kaybolur. Beyaz örtü, ışık halesi, bulanıklaştırma veya parlama yoktur.

Masaüstü kenarlarının başlangıç alfa değeri 0,07, açılış kenarlarının 0,105 ve başlık üstü negatif alanın 0,095 değeridir. Bunlar algısal yoğunluk yüzdesi değildir. İnce çizgi ve düşük doygunluk ile birlikte ekran görüntülerinde değerlendirilir. Tablet yoğunluğu düşer. Mobilde genel kenarlar kapanır, açılışın tek köşesinde küçük bir fragman kalır. Baskıda ve zorlanmış renklerde tüm yeni bezeme kapanır.

## Değişmeyenler

Marmara logosu, fakülte ve PDR satırı, menüler, grid, kartlar, tüm akademik metinler ve sekiz dil aynı kalır. Ebru çerçeve, kemerli mat panel ve panelin tek büyük geometrik rozeti değiştirilmez. Kaynak inceleme ve kurumsal onay durumları yükseltilmez. Yeni koyu tema eklenmez. Mevcut koyu araştırma kartı ve alt bilgi yüzeyine ikinci bir motif yığılmaz. Yeni JavaScript, font, animasyon veya raster görsel eklenmez.

## Görsel araştırma ve köken

Yalnız görsel gramer için incelenen müze açıklamaları. https://www.metmuseum.org/art/collection/search/453400 ve https://www.metmuseum.org/art/collection/search/451739 . Bu bağlantılar ortaklık veya müze onayı değildir. Görselleri ve çizim verileri kopyalanmamıştır.

Maskenin alfa kanalını azaltma davranışı için resmî teknik açıklama. https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mask-image . Maske desteklenmezse yeni bezeme tamamen kapatılır. İçerik ve diğer görsel öğeler değişmez.

Yeni vektörler bu çalışma sırasında kodla özgün olarak oluşturuldu. Tarihî bir parçanın reprodüksiyonu oldukları veya bir insan çini sanatçısı tarafından onaylandıkları iddia edilmez. Mevcut ebru görselinin ayrı atfı ve lisansı aynen korunur.

## Kabul kontrolleri

Yeni dosya ve yerleşim testleri eski kaynak üzerinde beklenen nedenle başarısız oldu. Ardından birim ve derleme testleri uygulanır. Gerçek HTTP üzerinde Chromium, Firefox ve WebKit, sekiz dil ve beş ekran genişliği kontrol edilir. Aynı ortamda eski sürümle grid, tipografi ve panel piksel karşılaştırması yapılır. Arama odağı, baskı, zorlanmış renk, azaltılmış hareket ve dar ekran taşması ayrıca sınanır.

SVG toplam sıkıştırılmış boyut hedefi 8 KiB altında, mevcut CSS bütçesi 18.000 bayttır. Sayısal dosya bütçesi Core Web Vitals saha ölçümü değildir. Canlı sürüm ve gerçek görüntüler ayrıca doğrulanmadan yayımlandı denmez.

## Piksel ve yükleme karşılaştırması

Kesirli CSS koordinatlarının ekran görüntüsünde dışarı yuvarlanması, dış zeminden örneklenen tek piksellik kenarda fark oluşturur. Test yalnız bir piksellik dış örnekleme sınırını kırpar. Panelin geri kalanında toleranssız piksel eşitliği aranır. Kitap gridi karşılaştırılmadan önce her iki sitede tembel yüklenen kapaklara kaydırılır ve yükleme tamamlanır. Grid ve metin ölçüleri aynı yükleme durumunda karşılaştırılır.


## 0.8.2. Mevcut motiflerin görünürlük düzeltmesi

Kullanıcının son talebi yeni tasarım veya yeni çizim değil, mevcut çiniyi belirginleştirmektir. Aynı iki SVG, aynı renk kodları, aynı konumlar ve aynı boyutlar korunur. Yalnız CSS opaklığı ve dış kenardaki alfa geçişi değişir. Masaüstünde sayfa 0,30, açılış kenarı 0,32, başlık üstü mevcut motif 0,34 opaklıktadır. Bu sayılar algısal yoğunluk ölçümü değildir. Tablet 0,18 ila 0,24 ve mobildeki tek mevcut fragman 0,20 değerini kullanır. Maske içerik sınırından 8 veya 10 piksel önce tamamen kaybolmaya devam eder. Panelin içine, kartlara veya başlıkların arkasına yeni görsel eklenmez.

Yeni görsel, SVG, JavaScript, font, renk, motif, hareket veya düzen değişikliği yoktur. Koyu yüzeyler, Marmara kimliği, ebru paneli, sekiz dil ve tüm akademik içerik korunur. Önceden üretilen on görsel taslak siteye aktarılmamıştır.
