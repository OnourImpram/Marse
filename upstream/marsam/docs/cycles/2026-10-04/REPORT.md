# MARSAM 0.10.0 geliştirme ve eleştirel inceleme raporu

## Kapsam ve başlangıç

Bu döngü master mission belgesini yeni bir site taslağı olarak değil, mevcut ürün için stratejik çerçeve olarak ele alır. Kaynak başlangıcı 58bf9f82c18c95f76f9a11bc84423acf94546679, canlı başlangıç 0.9.4'tür. Tam kaynak arşivi, güncel üretim modülleri, testler, araştırma belgeleri, tasarım kararları ve sürüm geçmişi incelendi. 682 canlı HTML dosyasının tamamı manifest ile karşılaştırıldı. Sekiz dilde 48 kamuya açık tarayıcı adresi ayrıca ziyaret edildi. Bu kapsam, 682 sayfanın her birinin insan uzman tarafından bilimsel ve dilsel olarak incelendiği anlamına gelmez.

Başlangıç işi 37211251927 mevcut testlerden geçti. Ana işlevler, kapsam, responsive yerleşim, araştırma katmanı, çini ve bilimsel katman Chromium, Firefox ve WebKit ile çalıştırıldı. Araştırma örneğinin Python betiği, notebook'u ve kurcalama kontrolleri gerçekten yürütüldü. Başlangıç verileri audit/mission-20261004 dalının docs/cycles/2026-10-04/baseline klasöründe ve ilgili Actions artifact'ında korunur.

## Korunan güçlü yapı

Node statik üretici, ortak kaynak kataloğu, sekiz dil, yerel arama, RIS ve BibTeX dışa aktarma, araştırma rehberleri ve laboratuvarı korundu. Kurucu anlatısı zaten görünür ve ölçülüydü. Halil Ekşi akademik girişimin kurucusu olarak kalır, belgelenmemiş bir merkez müdürlüğü atfedilmez. Onaylı ebru portalı, iki simetri maskesi, İznik arka planı, bütün görsel dosyalar ve public/site.css değiştirilmedi.

Ölçek kimlikleri de korunur. Ekşi ve Kardaş'ın 29 maddelik aracı ile Paloutzian ve Ellison'ın 20 maddelik aracı birleştirilmez. İlk kaynaktaki SRMR .50 ve .050 uyuşmazlığı sessizce düzeltilmez. Ölçek maddeleri yayımlanmaz. Mevcut ölçme ve yöntem şablonlarının güçlü ayrımları, yeni ve bakımı zor bir laboratuvar eklenerek yinelenmez.

## Gerçek zayıflıklar ve düzeltmeler

Önceki kanıt kaydı, dil metninin kendisi değiştiğinde yalnız ortak özetin hash'ini kontrol ederek metni güncel gösterebiliyordu. Yeni kalıcı kaynak ve dil taslağı defteri bu açığı kapatır. Üstveri, bulgu, örneklem veya sınırlılık metninin izinsiz değişmesi artık test ve build hatası üretir. Yazılım anlam eşdeğerliğini, bilimsel doğruluğu veya anadil kalitesini kanıtladığını söylemez.

DOI kimliğinin büyük ve küçük harfle tekrarlanması yakalanır. OUT_OF_SCOPE kararı yanlışlıkla retain eylemiyle birlikte kaydedilse bile kaynak kamusal seçkiye giremez. İlgili okumaların ve araç kullanım bağlantılarının varlığı doğrulanır. Tam metnin belirli bölümleri incelenmiş bir kaydın görünür kaynak sayfasında yalnız özet okunmuş gibi tanıtılması da düzeltildi. Bu son test ilk aşamada HTML içindeki arayüz sözlüğünü de sayıyordu, ardından yalnız görünür main içeriğine sınırlandı ve eski sürüm üzerinde doğru nedenle başarısız olduğu ayrıca gösterildi.

README 0.9.1, teslim notu 0.9.2 sürümünde kalmıştı. Metinler değiştirilmeden tarihsel dosyalara alındı. Güncel kaynak sürümü ile doğrulanmış canlı yayın durumu ayrıldı.

## Kaynak seçkisi

Başlangıçtaki 38 kamusal kaynak korunur. Önceki döngüde arşivlenen Maneviyatın Keşfi ve Manevi Yaşam Pratikleri bu döngünün yeni çıkarmaları olarak gösterilmez. Genel başlıklı görünmesine rağmen açıkça manevi boyuta ayrılmış CBT, grupla danışma ve psikoterapi kuramı baskıları korunur. PRISMA, TOAD ve WHO kaydı bağlamsal yöntem ve etik kaynaklarıdır, ruh sağlığı sonuçlarına ilişkin doğrudan etki kanıtları değildir.

Altı ekleme ile kamusal seçki 44 kaynağa çıkar. Her mevcut ve arşivdeki kaydın gerekçesi CATALOGUE_DISPOSITION.md dosyasındadır. Yeni kaynakların inceleme kapsamı SOURCE_REVIEW.json içinde ayrı ayrı kayıtlıdır.

| Yeni kaynak | Katkı | Korunan sınır |
| --- | --- | --- |
| Prati, 2025, 10.1177/09567976251325449 | Britanya verisinde kişi içi analiz ve çoğunlukla anlamsız ilişkiler | Anlamsız sonuç sıfır etkinin kesin kanıtı değildir, gözlemsel tasarım nedensellik sağlamaz. |
| Major-Smith ve arkadaşları, 2025, 10.1371/journal.pone.0319796 | ALSPAC ebeveyn kuşağında iki yönlülük ve belirsiz bulgular | Önkayıt, gözlemsel bulguyu randomize nedensel kanıta dönüştürmez. |
| de Diego-Cordero ve arkadaşları, 2026, 10.1007/s10943-025-02461-w | Brezilya'da 277 tıp öğrencisinin iki yıllık izlemi ve DUREL kullanımı | Bağlam aktarımı ve nedensellik sınırlı, araç kullanımı bağımsız doğrulama değildir. |
| Aslan ve Topuz, 2026, 10.1080/13607863.2025.2606354 | Türkiye'de eşini kaybetmiş 403 yaşlı yetişkinde maneviyat, anlam ve iyi oluş | Erişilen özette zaman sırası açık değil, kesitsel veya boylamsal etiket tahmin edilmez. |
| Westhead ve Georgiades, 2025, 10.1111/eip.70061 | Psikoz bağlamında 35 çalışmanın derlemesi ve başa çıkma ayrımı | Özetin nedensel dili aynen taşınmaz, dini inanç patolojinin tek başına göstergesi değildir. |
| Durkin ve arkadaşları, 2025, 10.1371/journal.pone.0317821 | Din görevlileriyle ilişkili cinsel istismar sonrası manevi zararın kapsam derlemesi | 12 yayın 12 tedavi deneyi değildir, kalite değerlendirmesi yapılmamıştır, Katolik bağlamı tüm dinleri temsil etmez. |

Özgün yazar sırası, DOI, dergi, cilt, sayı ve sayfalar kayıtlıdır. Çevrimiçi ilk yayın ile sayı yılı ayrı tutulur. Altı kaynağın tam metin ve tüm eklerinin kapsamlı biçimde incelendiği ileri sürülmez. PLOS çalışmalarının ilgili HTML bölümleri okundu, diğerlerinde doğrulanabilen kayıt, özet ve erişilen yöntem parçalarıyla sınırlı kalındı. Eski kaynakların inceleme tarihleri topluca yenilenmedi. PsycINFO veya başka bir abonelik veri tabanında yapılmamış tarama iddia edilmedi.

## Sentez, ölçme ve keşif

Mevcut Kanıtı okumak sayfasına iki tema eklendi. Boylamsal yorum teması kişiler arası fark, kişi içi değişim, zaman sırası ve kültürel bağlamı ayırır. Zarar ve klinik bağlam teması manevi zarar ile psikoz araştırmasını farklı sorular olarak ele alır. Yan yana durmaları aralarında nedensel bağ bulunduğunu ima etmez. Toplam sekiz tema vardır.

Kaynak sayfalarından karşılaştırmalı okumaya doğrudan geçilir. Bunlar editoryal bağlantılardır, doğrulanmış replikasyon veya etkililik sıralaması değildir. DUREL profilinden Brezilya çalışmasına gidilir ve araç kullanımının geçerlik, uyarlama veya izin kanıtı olmadığı aynı yerde belirtilir. Mevcut arama algoritması bu ihtiyaçları zaten karşılıyordu. Algoritma yeniden yazılmadı, yeni altı kaydın özgün başlık ve DOI ile sekiz dilde bulunması testlere eklendi.

## Dil modeli ve inceleme durumu

Altı ortak bilimsel özetten 48 yeni dil metni ve iki temanın 16 dil anlatısı oluşturuldu. Türkçe, İngilizce, Almanca, Çince, Rusça, Arapça, Endonezce ve Malayca aynı örneklem, bulgu yönü ve çıkarım sınırını koruyacak biçimde ayrı ayrı ele alındı. Bilimsel ve anadil incelemesi hâlâ beklemektedir. Endonezce ve Malayca birbiri yerine kullanılmadı.

19 kanıt kaydı için 152 satırlık teknik dil matrisi üretilir. Kaynak eşleşmesi, dil taslağı eşleşmesi, ortak özet eşleşmesi ve zorunlu alanların varlığı ayrı alanlardır. Bu matrise semantik sertifika veya insan değerlendirmesi eklenmez. Bütün eski site içeriğinin bu yeni modele geçirildiği de söylenmez. Eski legacy-seed kayıtlarının ayrıca ele alınması gerekir.

## Güncel işlev kıyaslaması

Harvard Human Flourishing Program'ın yayın sayfasında tema, kavram, ölçme ve araştırma alanlarının ayrılması gözlendi. MARSAM için çıkarılan ders konusal keşfi kaynak kimliğiyle bağlamaktır, aynı kapsam veya marka dilini kopyalamak değildir. Kaynak https://hfh.fas.harvard.edu/publications.

Duke'un incelenen research adresinin ana gövdesi kısa bir add links yer tutucusu içeriyordu. Bu belirli sayfa, sırf kurum adı nedeniyle tamamlanmış bilgi mimarisi örneği sayılmadı. Bu gözlem merkezin araştırma kalitesi hakkında bir hüküm değildir. Kaynak https://spiritualityandhealth.duke.edu/index.php/research/.

ASERVIC'in best practices erişim sayfası mesleki rehbere ulaşmak için kullanıldı. Mesleki rehberin rolü klinik sonuç araştırmasından ayrıdır. Bir dış bağlantı MARSAM'a ortaklık veya kurumsal onay kazandırmaz. Kaynak https://aservic.org/aservic-best-practices/.

## Testler ve kalan sınırlar

İlk beş bütünlük testi eski davranışta başarısız oldu. Altı döngü testi, yeni içerik ve bağlantılar eklenmeden önce başarısız oldu. Görünür inceleme kapsamı için ek regresyon testi de eski sürümde başarısız oldu. Son yerel çalışmada 12 yeni test, bütün kaynak testleri ve her iki dağıtım kökünün build kontrolleri geçti. CSS gzip 13962 bayt, JavaScript gzip 9660 bayt olarak kaldı. Bunlar dosya bütçesidir, saha Core Web Vitals ölçümü değildir.

Bu oturumun yerel Chromium'u yönetici politikası nedeniyle localhost erişimini ERR_BLOCKED_BY_ADMINISTRATOR ile reddetti. Bu, ürün hatası veya geçen tarayıcı testi olarak yazılmadı. Adayın ve gerçek yayının tarayıcı kontrolü mevcut GitHub Actions ortamında yürütülmelidir. Nihai iş, motor ve yayın kimlikleri ayrı makine okunur teslim kaydına eklenecektir. Testlerde başarısızlık çıkarsa özgün kayıt korunacaktır.

İnceleme türü ardışık yapay zekâ destekli editoryal ve teknik özdenetimdir. Bağımsız hakem, insan bilimsel editör, sekiz anadil uzmanı, ekran okuyucu kullanıcı araştırması veya WCAG sertifikası yoktur. Kapsamlı geri çekme ve düzeltme taraması yapılmış değildir. Mevcut hak sınırları korunur. Yeni tam metin, şekil, tablo, mağdur anlatısı ve ölçek maddesi yeniden yayımlanmadı.

## Bilinçli sapmalar ve sonraki bilimsel gündem

Yüzlerce kaynak eklemek yerine mevcut seçkinin yorum dengesini değiştiren altı kaynak eklendi. Bu tercih yeni kayıt sayısını değil araştırmacının çıkarım kalitesini öne çıkarır. Kurucu alanı, iki eski kitap çıkarımı, arama ve laboratuvarı yeniden yapmak yerine mevcut güçlü çözümler korundu. Yeni menüler yerine iki sentez ve kaynaklar arası okuma bağlantıları kullanıldı. Tasarım değişimi yapılmadı.

Ana eksik bir resmî merkez iddiası veya daha büyük bibliyografya değil, sistematik ve insan denetimli kanıt güncellemesidir. Türkiye'de iyi tanımlanmış boylamsal sorular, kültürler arası ölçme değişmezliği, dini olmayan anlam sistemleri ve az temsil edilen coğrafyalar sonraki seçkilerde ayrıca incelenmelidir. Bunlar bu döngüde tamamlanmış projeler veya kanıtlanmış alan boşlukları olarak değil, daha kapsamlı taramayla sınanacak araştırma soruları olarak önerilir.
