# MARSAM 0.7.1. Visual correction candidate

Restores the approved 0.6 heritage composition and Marmara masthead without rolling back the richer 0.7 catalogue, search, provenance, eight locales or citation exports. Planned affiliation uses official faculty and department names. The homepage warning strip and governance-promotion block are removed. Candidate browser receipts are in docs/releases/restoration-0.7.1-candidate.json. Live delivery must be verified separately before it is announced.

## Previous completed release record

# MARSAM. Tamamlanan okuma ve araştırma platformu sürümü

2 Ekim 2026. Uygulama sürümü 0.7.0.

## Canlı yayın

İngilizce https://onourimpram.github.io/MARSAM/en/

Türkçe https://onourimpram.github.io/MARSAM/tr/

Yayımlanan uygulama kaynağı 0e8a30477876b7b8e910348bbf46b50cf3df8934. Yayın deposundaki commit ffbbe35d28407189c4b927bd930f76445acc2611. Sonraki belge güncellemeleri bu uygulama sürümünü değiştirmez.

Onaylanan tasarım araştırmasının uygulaması tamamlandı ve gerçek GitHub Pages adresinde doğrulandı. Yeni sürüm yalnız geliştirme dalında bırakılmadı. Kaynak ana dala alındı, üretilen site yayın deposunun yalnız MARSAM bölümüne yerleştirildi.

## Kullanıcıya yansıyan değişiklikler

Gezinme beş görev alanına ayrıldı. Konuları keşfet, kütüphane, öğrenme, araştırma ve hakkında. Arama açılışta doğrudan görünür. Mobil ekranda dekoratif görsel içerik erişiminin önüne geçmez. Ebru, kâğıt tonları ve ölçülü geometrik bezeme korundu. Uzun okumalar ve kaynak sayfaları sade yüzeyler kullanır.

Kitaplar ve makaleler ortak katalog verileriyle sunulur. Kitaplarda kapak ve liste görünümü vardır. Arama özgün eser adlarını, yazarları, DOI ve ISBN bilgilerini kullanır. Kimlik sorguları önceliklendirilir. Türkçe, Çince, Rusça ve Arapça yazım özellikleri ortak arama modülünde ayrı ele alınır. Dil değiştirildiğinde ilgili sayfa ve filtreler korunur.

Kaynak kimliği, erişilip incelenen kapsam, bilimsel değerlendirme, güncellik, dil incelemesi ve kullanım hakları altı ayrı boyutta gösterilir. Tek bir yeşil onay etiketiyle eşitlenmez. Kaynakların özgün yazar sırası, yayın künyeleri, kitap kapakları ve mevcut bibliyografik sınırlılıklar korunur. Ortak yazarlık merkez üyeliği veya danışmanlık ilişkisi olarak sunulmaz.

Sekiz dil ve Arapça sağdan sola düzen sürer. Çeviri kayıtları kaynak ve hedef sürüm hash değerlerini taşır. Okuma listesi kullanılan tarayıcıda saklanır. Atıf dosyaları ve kaynak karşılaştırma indirmeleri çalışır. Katkı formu hataları ilgili alana bağlar ve yalnız yerel dosya oluşturduğunu açıkça bildirir. Gönderim yapılmış gibi davranmaz.

## Teknik düzenleme

Açık bileşen yapısı ve tek semantik değişkenli stil dosyası kullanılır. Önceki HTML üzerinde düzenli ifadeyle sonradan değişiklik yapan katman kaldırıldı. Genel kurum adı yasağı yerine ilişki türünü ve onayını denetleyen kurallar getirildi. Gerçek bilimsel kaynaklarda kurum adlarının bulunması tek başına engellenmez. Kitap ve makale sayıları gelecekteki genişlemeyi engelleyen sabit test kuralları değildir.

Ana dal doğrulaması güncel üç motorlu testlere bağlandı. Kaynak deposunun yayın iş akışı yalnız kaynak sürümüne bağlı Pages paketi hazırlar. Gerçek yayın ayrı mevcut host üzerinde MARSAM kapsamıyla sınırlıdır. Taşıma dosyaları ve tek kullanımlık düzeltme betikleri ana dala alınmadı.

## Gerçek canlı doğrulama

Kaynak ana dal kontrolü https://github.com/OnourImpram/MARSAM/actions/runs/36969902819

Canlı yayın ve tarayıcı kontrolü https://github.com/OnourImpram/onourimpram.github.io/actions/runs/36969983821

İki kontrol de başarıyla tamamlandı. Canlı sunucudaki 599 dosya kaynak sürümünün hash kayıtlarıyla eşleşti. Sorgu parametresi olmayan giriş ve temel uygulama dosyaları da kontrol edildi. Üç gerçek tarayıcı motorunda 818 temel etkileşim, 899 kapsam ve 2243 yerleşim kontrolü geçti. Motorlar Chromium 149.0.7827.55, Firefox 151.0 ve WebKit 26.5. Sekiz dil ve 320, 390, 768, 1440 piksel genişlikler kullanıldı. Girdi ve çıktı sahteleştirilmedi. Ekranlar canlı adresten alındı.

Yarım kalan WebKit Rusça seçim kutusu taşması önce yeniden üretildi. Native seçim ve klavye odağı korunarak düzeltildi. Sayfayı kırpmak çözüm olarak kullanılmadı. Önceki başarısız test ve betik tekrar çalıştırma kayıtları başarı olarak yeniden etiketlenmedi.

## Yayın sınırları

Marmara Üniversitesi bağlamında önerilen merkez çerçevesi görünür. Kuruluş, üniversite sahipliği, resmî logo kullanımı, onay, akreditasyon veya klinik işletme yetkisi doğrulanmış değildir. Bu nedenle kamusal başlıkta onaysız resmî üniversite logo birleşimi kullanılmaz.

Bilimsel editör ve ana dil uzmanı incelemesi henüz tamamlanmış sayılmaz. Otomatik kontroller ekran okuyucu, gerçek cihaz, kullanıcı araştırması veya bağımsız erişilebilirlik onayı değildir. Dosya boyutu testleri sahadan ölçülmüş performans sonuçları değildir. Kitap kapakları ve diğer eserler için ilgili hak değerlendirmeleri ayrı kalır.

Bilgi grafiği, gerçek editör hesapları, güvenli CMS, korumalı araştırma katılımı ve tam kişi kimliği ayrıştırması bu sürüme eklenmedi. Bunlar araştırma raporunda sonraki aşama olarak tanımlanan, ayrıca karar gerektiren işlerdir. Özel ders ödevleri, yayımlanmamış bölüm metinleri ve kişisel araştırma verisi yayımlanmadı.

GitHub Pages yanıt başlıkları ölçüldü. Yanıt düzeyinde CSP veya X-Frame-Options gözlenmedi. Bilinmeyen adres gerçek 404 döndürür ve host varsayılan sayfasını kullanır. Ortak kök 404 veya robots dosyası değiştirilmedi. noindex erişim kontrolü sayılmaz.

## Korunan diğer siteler ve kayıtlar

Yayın deposunda yalnız MARSAM ağacı değişti. Elif Tasarım, kişisel index.html, kök README, .github ve .nojekyll girdilerinin önceki hash değerleri aynen korundu.

Güncel kapsam docs/design/COVERAGE.md, uygulama ve tasarım sözleşmeleri docs/design/README.md, kalıcı doğrulama kaydı docs/releases/reading-room-0.7.0-verification.json, sürüm kimliği docs/LIVE_REVIEW_RELEASE.json dosyalarında bulunur. Önceki 0.6 teslimi docs/releases/DELIVERY_0_6.md, önceki yayın kimliği docs/releases/RELEASE_0_6.json olarak arşivlenmiştir.
