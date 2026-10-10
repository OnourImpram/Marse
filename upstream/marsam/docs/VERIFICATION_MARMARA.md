# MARSAM. Marmara sürümü için doğrulama kaydı

1 Ekim 2026. Uygulama sürümü 0.3.0.

## Kayıtlı çalışma

Doğrulama iş akışı [36871527013](https://github.com/OnourImpram/MARSAM/actions/runs/36871527013). Sonuç success. Testlerden sonra kaynak dosyaları geliştirme dalına `e7087f6805431438fa3aba83627cf0084c52026d` commit'iyle yazıldı.

Kök yol ve `/MARSAM/` için ayrı ayrı 29 Node içerik, dil ve sözleşme testi ile 9 üretilmiş bağlantı testi geçti. Önceki kullanıcı işlevleri için 642, Marmara geliştirmeleri için 803 gerçek Chromium kontrolü geçti. Bu sayılar otomatik doğrulama koşullarını gösterir, birbirinden bağımsız kullanıcı senaryosu veya bilimsel kalite puanı değildir.

## Kapsam

Sekiz dil, 320, 390, 768 ve 1440 piksel genişlik. Ana sayfa, kaynaklar, iç sayfalar ve yeni koleksiyon, karşılaştırma, etkinlik ve uluslararası kaynak sayfaları. Gerçek HTTP yanıtları, görünen üniversite görselleri, dil yönü, kapalı ve açık mobil menü, kaynak seçme sınırı, yerel saklama, sayfa yenileme, diller arası seçim korunması, tablo kaydırması, gerçek JSON indirmesi, geçersiz kimlikler, geçmiş etkinlik ayrımı ve JavaScript olmadan kaynak bağlantıları.

Başarılı koşuda yakalanmamış JavaScript hatası veya POST isteği kaydedilmedi. Katılımcı verisi toplanmadı. İşlemler fetch, localStorage veya indirme taklidi kullanmadı.

## Saptanan ve giderilen sorunlar

İlk görsel kontrolde Almanca ve Rusça uzun araştırma ağı başlıkları 320 pikselde metin kutusunu aşıyordu. Gerçek görüntüyle doğrulandı, başlık satır kırılmasıyla düzeltildi. Kapalı mobil menünün yerleşime etkisi ve Malayca üst bildirimin taşması da giderildi. Ekranı taşma gizleyen bir body kuralıyla kırpmak yerine ilgili bileşenler düzeltildi. Son iki tarayıcı testi bu düzeltmeleri içerir.

## Açık kalan değerlendirmeler

Safari ve Firefox, ekran okuyucu, bağımsız erişilebilirlik denetimi, yerel dil uzmanı, bilimsel editör onayı ve gerçek kullanıcılarla karşılaştırmalı kullanılabilirlik araştırması yapılmadı. İnceleme aynı asistan sürecindeki ardışık iç kontroldür, bağımsız insan hakemliği değildir.

GitHub Pages canlı yayını ayrı bir sonuçtur. İlk etkinleştirme yetki nedeniyle reddedildi. Kalıcı dağıtım iş akışı, testleri `/MARSAM/` yolunda yeniden çalıştırır ve canlı manifestin commit kimliğini doğrular. Bu belge tek başına dağıtım başarısı ilan etmez.
