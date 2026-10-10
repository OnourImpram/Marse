# MARSAM 0.12.0. Bitmiş merkez dili, tam yerelleştirme ve kurucu yayınları

5 Ekim 2026. Canlı: https://onourimpram.github.io/MARSAM/tr/

## Değişiklikler

Sahibin 5 Ekim kararıyla sekiz dilde "planlanan merkez", "kuruluş hazırlığı", "dijital önizleme" ve "web taslağı" ifadeleri kaldırıldı; altbilgideki aşama etiketi emekliye ayrıldı. Kuruluş tarihi, kurul, akreditasyon veya istatistik eklenmedi. Yapay zekâ destekli çeviri tek cümleyle belirtilir.

Türkçe dışındaki dillerde İngilizce kalan 17 stratejik kaynak ve 31 yol haritası metni yerelleştirildi; eksik yerelleştirme artık derlemeyi durdurur. Doğrulanmış çeviri bulguları uygulandı (danışan/client, counseling, literature review, religious and spiritual struggles, Rusça birim adı, Çincede kaynakta olmayan eklemelerin kaldırılması).

Prof. Dr. Halil Ekşi'nin maneviyat alanındaki 18 hakemli makalesi eklendi. Künye atomları Crossref kaydından alındı, başlık her yayıncı sayfasında doğrulandı; her biri için kapsam kararı SCOPE_AUDIT'e yazıldı. Özetlerdeki sayılar kaynak özetle karşılaştırıldı.

Sosyal paylaşım kartı (og:image, 1200×630) onaylı portal görseli değiştirilmeden üretildi. RIS dosyalarında boş etiketler artık satır sonu boşluğu taşımaz.

## Doğrulama

Kaynak testleri 132/132, oluşturulmuş site testleri 12/12. Ana dal doğrulaması 37327112170 (c30f506) başarılı: core 818, scope 899, layout 4263, portal 745, research 2420, campus 1393/1393 kontrol; Chromium, Firefox, WebKit. Yayın işi 37328376811 başarılı, host commit ba695a8 iş akışı ile tetiklendi.

Yerel mobil tarama: 8 dilde 1040 sayfa, 390 px genişlikte taşan öğe 0 (negatif kontrol taşmayı yakaladı). Tam derlemede durum dili 0 sayfa (önceki sürümde 897).

Canlı adreste release.json 0.12.0 ve kaynak c30f506; 8 dil × 4 sayfa 200, durum dili 0, og:image her sayfada, 18 yeni yayının 18'i görünür, kök site 200.

Teknik kontroller insan bilimsel editör, ana dil uzmanı veya bağımsız erişilebilirlik onayı değildir. Site `noindex` önizleme modunda kalır.

## 6 Ekim 2026. Kaynak kimliğinin bilinçli yeniden bağlanması

s-attendance-cohorts kaynak notundaki "Artık karıştırıcılık olasıdır." ifadesi "Kalıntı karıştırıcı etkiler göz ardı edilemez." olarak düzeltildi (özgün: "Residual confounding remains possible"). Sahip onayıyla (6 Ekim 2026) yalnız bu kaynak `node scripts/rebind-editions.mjs --rebind-source=s-attendance-cohorts --write` ile yeniden bağlandı; bayraksız çalıştırma kaynağı yeniden bağlamaz, kapı aynen denetler.
