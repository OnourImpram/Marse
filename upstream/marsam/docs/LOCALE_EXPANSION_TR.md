# Arapça, Endonezce ve Malayca genişletmesi

## Kapsam

Kullanıcının gerekçesi Malezya ve Endonezya'daki akademik çevrelere erişimdir. Bu sürüm Türkçe, İngilizce, Almanca, Basitleştirilmiş Çince ve Rusçaya Arapça, Endonezce ve Malayca ekler. Cavaca ve Sundaca eklenmemiştir. Bu tercih herhangi bir dilin bilimsel değeri hakkında genel bir hüküm değildir.

## Uygulama

Her yeni dil için 360 benzersiz kaynak dizgesinin açık çevirisi vardır. Menüler, kaynak açıklamaları, sekiz dosyanın tam metni, öğrenme rotaları, kurumsal durum, form mesajları ve editoryal sınırlar kapsanır. Endonezce ve Malayca ayrı sözlüklerdir. Eksik çeviride İngilizce metin sessizce gösterilmez, derleme durur. Kaynak dizgesi değiştiğinde eşleşme yeniden yapılmalıdır. Arapça arama, hareke ve tatvil farklılıklarını sorgu ve dizinde aynı biçimde normalleştirir, gösterilen metni değiştirmez.

Arapça belgelerde HTML yönü RTL olarak belirtilir. Kenar boşlukları ve gezinme mantıksal CSS özelliklerini izler. Yön okları aynalanır. Kaynak künyeleri, DOI ve Latin yazılı özgün başlıklar LTR kalır. Dil adları bdi ile yalıtılır. Kaynak başlıkları varsayımla Arapçaya çevrilmez.

## Bölgesel kaynaklar

Sazali ve Hanin Hamjah'ın 2024 tarihli Al-Hikmah kaydı UKM'nin resmî dergi sayfasından kontrol edildi. Özetin belirttiği desen, önceki yayınların içerik analizidir. Yeni bir klinik deney veya bağımsız nedensel etkililik kanıtı olarak sunulmadı.
https://spaj.ukm.my/jalhikmah/index.php/jalhikmah/article/view/514

Universitas Islam Indonesia'nın Pusat Studi Psikologi Islam sayfası, İslami psikoloji araştırmalarına bir giriş kaynağı olarak eklendi. Kurumsal kaynak kaydıdır. Klinik etkililik, güncel personel, program uygunluğu veya MARSAM ortaklığı doğrulaması değildir. Sayfanın arama dizini ve açılan sürümü ayrıntıda farklılaştığı için yalnız dar kapsamlı kurum ve alan tanımlaması kullanıldı.
https://psychology.uii.ac.id/pusat-studi-psikologi-islam/

Yukarıdaki iki kaynak, 18 kayıtlık önceki kütüphaneyi 20 kayda çıkarır. Her dilde 50 mantıksal sayfa, sekiz dilde 400 içerik rotası üretilir. Dil seçim sayfası ve 404 ile toplam 402 HTML dosyasıdır. Bunlar 400 özgün araştırma veya yayın değildir.

## İnceleme durumu

Üç dildeki çeviriler AI_ASSISTED_DRAFT olarak işaretlidir. Ana dili konuşan akademik uzman incelemesi yapılmış gibi gösterilmez. Klinik ihtiyat ve kaynak sınırlılıkları çevirilerde korunmuştur. Yeni kaynaklar V1 / PARTIALLY_VERIFIED düzeyindedir. Teknik testler bilimsel onay yerine geçmez.

İlk yerel testte altı genişletme kontrolü başarısız oldu. Çeviri sözlükleri, güvenli rota listesi, RTL çıktı ve Arapça normalleştirme eklendikten sonra 20 birim/içerik ve 9 derleme/bağlantı testi geçti. Çincedeki metin uzunluğu kontrolü dilin yazı özelliklerine göre düzeltildi, metin silinmedi. Yerel Chromium doğrudan HTTP gezinmesini yönetici ilkesiyle engelledi. İlke değiştirilmedi. Ayrı HTTP istekleri ve açıkça taklit edilmiş tarayıcı I/O'su kullanan görsel testler yürütüldü. Gerçek HTTP tarayıcı testi ayrı tests/browser_e2e.py dosyasıdır, çalıştırılma sonucu varsa verification/live-browser.json içinde yer alır.

## Teknik dayanaklar

W3C, Structural markup and right-to-left text in HTML.
https://www.w3.org/International/questions/qa-html-dir

W3C, Inline markup and bidirectional text in HTML.
https://www.w3.org/International/articles/inline-bidi-markup/index

Playwright, Continuous Integration, Python.
https://playwright.dev/python/docs/ci

## Yayın sınırı

MARSAM'ın kurumsal statüsü hâlen önizleme olarak belirtilir. Yayın izni, alan adı, resmî e-posta, editoryal ve dilsel insan onayı bu geliştirme tesliminden ayrıdır. Özel ders dosyaları veya danışan verileri bu genişletmeye dâhil edilmemiştir.
