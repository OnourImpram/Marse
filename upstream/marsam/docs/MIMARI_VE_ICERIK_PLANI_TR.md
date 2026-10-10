# MARSAM. Güncel mimari ve içerik planı

1 Ekim 2026. Marmara Üniversitesi bünyesinde planlanan merkez için sürüm 0.3.0. Bu dosya önceki beş dilli planı günceller. İlk plan Git geçmişinde korunmaktadır.

## Kurumsal amaç

Maneviyat ve ruh sağlığı alanında araştırma, mesleki öğrenme ve kaynak erişimini Marmara Üniversitesi kimliği altında bir araya getirmek. Önizleme, resmî kuruluş kararı ve üniversite yayın onayı değildir. Kurumsal statü kullanıcı tarafından bildirilen plan olarak korunur.

## İçerik düzeni

Keşfet. Kavram atlası, kuramlar ve altı tematik koleksiyon.

Araştır. Kaynak kütüphanesi, karşılaştırma, ölçme dizini, yöntem, araştırma gündemi ve katılım koşulları.

Öğren. Öğrenci, uygulayıcı ve araştırmacı rotaları, mesleki uygulama, etik ve dış eğitim kaynakları.

MARSAM. Kurumsal amaç, uluslararası kaynak dizini, tarihli dış etkinlikler, yayın ilkeleri ve yerel katkı önerisi.

22 kaynak kaydı, sekiz başlangıç dosyası ve üç rota sekiz dilde sunulur. Çeviriler ayrı dil kayıtlarıdır. Arapça sağdan sola düzenlenir. Endonezce ve Malayca ayrı tutulur. Bölgesel başka diller eklenmemiştir.

## Kaynak ve kullanıcı iş akışı

Bir koleksiyondan ilgili okumalara ve özgün kaynaklara geçilir. Kütüphaneden en fazla dört kaynak yan yana karşılaştırılabilir. Seçim yerel olarak ve paylaşılabilir adresle korunur. Dil değiştirmek seçilen kaynakları değiştirmez. RIS, BibTeX ve açıklayıcı JSON dışa aktarma bulunur. Bunlar klinik yorum veya etkililik sıralaması üretmez.

## Teknik yapı

Node.js standart kütüphanesiyle statik HTML üretilir. GitHub Pages yalnız `dist` klasörünü barındırır. Hesap, araştırma veritabanı ve LMS varmış gibi sunulmaz. Arama dizini aynı sitede bulunur. Okuma ve karşılaştırma listesi tarayıcıda tutulur. Katkı formu sunucuya veri göndermez.

## İnceleme dayanağı

Dört hedef kurumun gözlemleri, kaynakları ve uygulanan tasarım kararları [ayrıntılı karşılaştırma dosyasında](ACADEMIC_BENCHMARK_TR.md). Marmara işaretlerinin kaynak ve hash kaydı [MARMARA_ASSETS.json](MARMARA_ASSETS.json) dosyasındadır. [Teknik doğrulama](VERIFICATION_MARMARA.md) ve [Pages kurulumu](GITHUB_PAGES_TR.md) ayrı izlenir.

## Hocayla görüşmede karara bağlanacaklar

İlk tam tematik dosyaların sorumlu editörleri, izinle kullanılabilecek yayınlar ve ders materyalleri, çeviri incelemesi, kurumsal yönetim bilgileri, resmî iletişim kanalı ve üniversite alan adı. CMS ve araştırma katılımcısı altyapısı eklenecekse kullanıcı rolleri, veri sorumluluğu ve barındırma koşulları ayrıca belirlenmelidir.

Özel mesajlar, yayımlanmamış kitap bölümleri, ders ödevleri ve klinik veriler açık depoya taşınmamıştır. Teknik önizleme yetkisi bilimsel yayına veya veri toplamaya izin sayılmaz.
