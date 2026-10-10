# MARSAM içerik platformu — tasarım önerisi

## Amaç ve dayanak

Profesyonellerin ve öğrencilerin manevi yönelimli psikolojik danışma/terapi alanındaki kavram, araştırma, uygulama, yetkinlik ve etik kaynaklarına erişmesini sağlayan beş dilli dijital önizleme. Verilen proje brifinin önceliği içeriktir. Bu dosya geliştirici önerisidir; bilimsel kurulun veya editörün onay verdiğini göstermez.

## Diller ve kapsam

Türkçe, İngilizce, Almanca, Basitleştirilmiş Çince (zh) ve Rusça. Kullanıcı arayüzü, katalog açıklamaları ve başlangıç okuma dosyaları beş dilde yazılır. Özgün yayın başlıkları ve bibliyografik bilgiler çevrilmez. Çeviri inceleme durumu görünür kalır. Aynı sayfada dil değiştirme mümkün olmalıdır.

## Bilgi mimarisi

- Keşfet: kavram atlası, kuramlar ve yaklaşımlar, tematik dosyalar.
- Araştır: kaynak kütüphanesi, ölçme araçları dizini, araştırma yöntemleri, projeler ve katılım.
- Öğren: öğrenme rotaları, video ve eğitim kaynakları, mesleki uygulama ve etik.
- Bağlantı kur: uluslararası kaynak ağı, haber ve duyurular, MARSAM hakkında, katkı ve yayın ilkeleri.

Fazla menü maddesi yerine dört anlaşılır ana grup ve bütün içerikleri kapsayan arama kullanılır. İçerikler konu, kaynak türü ve hedef kitleyle ilişkilendirilir. Bir kaynağa farklı giriş yollarından erişilir.

## Üç yaklaşım ve seçim

1. WordPress: editör için tanıdık arayüz; eklenti, çok dillilik ve güvenlik bakım yükü oluşturur.
2. Tam uygulama + yönetilen CMS: editoryal işbirliğinde güçlü; başlangıçta hesap, maliyet, veri yönetişimi ve hizmet kararları gerektirir.
3. Statik üretim + sürüm kontrollü içerik: hızlı, taşınabilir, önizleme için hesap veya veritabanı gerektirmez; tarayıcıdan ortak yayın yönetimi sonraki fazdır.

Bu sürüm üçüncü yaklaşımı uygular. Node.js standart kütüphanesiyle statik HTML üretilir. Sitedeki temel içerik JavaScript olmadan okunabilir. Tarayıcı betiği arama, filtreleme, yer imleri, dil menüsü ve yerel katkı taslağını iyileştirir. Gerçek CMS varmış gibi davranılmaz.

## Görsel yön

Sakin, çağdaş bir araştırma yayını. Mürekkep yeşili, sıcak kâğıt zemini, kontrollü kil rengi. Büyük ama ölçülü tipografi. İçeriğin okunabilirliği, kanıt etiketleri ve mekânsal hiyerarşi önceliklidir. Resmî üniversite arması, uydurma ekip fotoğrafı ve yapay kurumsal sayılar yoktur. MARSAM için önerilen özgün bir tipografik işaret kullanılır.

## Bilimsel kontrol

Kaynak kimliği, yerel iddia, kaynak türü, erişilen bölüm, doğrulama düzeyi, durum, kontrol tarihi, sınırlılık ve telif bağlantısı ayrıdır. İncelenen IAPOS kanonu OnourImpram/IAPOS reposudur. Bu platform IAPOS'un yerine geçmez; yalnız ilgili kontrol alanlarını içerik şemasına taşır. Teknik test başarısı bilimsel doğrulama değildir.

## Kurumsal ve klinik sınırlar

MARSAM henüz resmî olarak kurulmuş bir merkez gibi sunulmaz. Arayüz ve her dildeki hakkında bölümü kuruluş fikri / geliştirme önizlemesi statüsünü açıklar. Üniversite bağı, yöneticiler, kurul üyeleri, iletişim adresi, akreditasyon ve ortaklıklar atanmaz. Ruh sağlığı hizmeti, tanı, kriz müdahalesi veya kayıt kabul edilmez.

Anket kataloğu, etik ve veri sorumlusu bilgisi olmadan aktif veri toplamaz. Ölçek maddeleri ve puanlama araçları izin olmadan yayımlanmaz. Video içeriği gömülmez; özgün kaynağa kullanıcı eylemiyle gidilir. Araştırma verisi, sağlık verisi veya özel kitap dosyaları depoya alınmaz.

## Teknik kabul koşulları

Beş dilde aynı gezinme ve içerik yapısı. Klavye erişimi ve görünür odak. Dar ekranda yatay taşma olmaması. JavaScript kapalıyken temel bağlantıların çalışması. Güvensiz URL, HTML enjeksiyonu ve eksik çevirinin derlemede reddedilmesi. Sahte form başarı mesajı olmaması. Dil değiştirmede sayfanın korunması. Kaynakçanın kopyalanabilir ve indirilebilir olması. Doğrudan URL'lerde içerik bulunması. Başlangıçta indekslemeye kapalı önizleme.

## Açık insan kararları

Kurumun statüsü, içerik sorumluları, alan adı, kurumsal e-posta, yayın izni, çeviri denetimi, kaynak telifleri, ölçme ve katılımcı veri yönetişimi. Canlı yayın bu geliştirme tesliminin dışındadır.
