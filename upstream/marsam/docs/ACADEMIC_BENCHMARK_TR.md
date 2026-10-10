# MARSAM. Akademik web platformları incelemesi ve tasarım kararları

1 Ekim 2026. Kurumsal prototip için hazırlanmıştır.

## Amaç, kapsam ve yorum sınırı

İnceleme, Harvard Human Flourishing Program, Duke Center for Spirituality, Theology and Health, Teachers College, Columbia University bünyesindeki Spirituality Mind Body Institute ve International Association for the Psychology of Religion yapılarını kapsar. IAPR burada din psikolojisi derneğidir. Bir program, araştırma merkezi, enstitü ve bilimsel dernek aynı örgütsel işlevi taşımadığından, karşılaştırma kurumsal büyüklük veya bilimsel saygınlık sıralaması değildir.

Resmî sitelerin ana sayfaları ile yayın, ölçme, eğitim, uygulama kılavuzu, etkinlik ve dergi sayfaları incelendi. Sekiz sayfa ayrıca gerçek Chromium oturumunda açıldı. Dört ana sayfanın 1440 ve 390 piksel genişliğindeki görüntüleri alındı. Sekiz hedef de bu oturumda HTTP 200 verdi. Dört ana sayfada 390 pikselde gövde taşması görülmedi. Bu bulgu, söz konusu sitelerin mobil uyumsuz olduğu gibi genel bir eleştiriyi desteklemez.

İnceleme, kullanıcılarla yapılmış görev testi, kapsamlı erişilebilirlik denetimi, tekrarlı performans ölçümü veya bütün yayınların bilimsel değerlendirmesi değildir. Aşağıda resmî sayfada görülen yapı, bu yapıdan yaptığımız tasarım çıkarımı ve MARSAM için uygulanan karar birbirinden ayrılmıştır. Bir sitenin kodunda bulunan betik sayısı hız veya güvenlik puanı olarak kullanılmamıştır. Ekran görüntüleri değerlendirme kanıtıdır, rakip sitelerin görselleri MARSAM'a kopyalanmamıştır.

## Harvard. Tematik yayın düzeni ve ölçme altyapısı

### Gözlenen yapı

Human Flourishing Program'ın gezinmesi kurumsal bilgi, araştırma, etki, katılım ve blog başlıklarını ayırır. Araştırma alanında ölçüm, Global Flourishing Study, alanlar ve yollar ile yayınlar için farklı girişler vardır. Yayın sayfası seçilmiş çalışmaları görsel olarak öne çıkarırken daha geniş yayın listesini anlam, amaç, sağlık, ilişkiler ve benzeri konu kümeleriyle sunar. Ölçme sayfası araç, çeviri ve kullanım koşullarını ayrı bilgiler olarak ele alır. Bunlar tek başına genel bir bilimsel üstünlük değil, içeriğin düzenlenmesine ilişkin gözlemlerdir.

Dayanaklar. [Ana sayfa](https://hfh.fas.harvard.edu/), [yayınlar](https://hfh.fas.harvard.edu/publications), [ölçme kaynakları](https://hfh.fas.harvard.edu/measuring-flourishing), [alanlar ve yollar](https://hfh.fas.harvard.edu/domains-pathways).

### MARSAM için çıkarım

Bir akademik portal yalnız yayın kronolojisine göre düzenlenirse, belirli bir danışma sorunuyla gelen okur önce hangi yayını aradığını bilmek zorunda kalır. Tematik giriş, bu yükü azaltabilecek bir tasarım tercihidir. Bunun kullanıcı başarısını gerçekten artırıp artırmadığı ayrıca ölçülmelidir. Harvard'daki geniş yayın birikimini küçük bir başlangıç kataloğuyla eşitlediğimizi veya aştığımızı ileri sürmüyoruz.

### Uygulanan karşılık

Altı tematik koleksiyon oluşturuldu. Danışma süreci, temel kavramlar, kuram, ölçme, etik ve dijital araçlar. Her koleksiyon, bir düşünme sorusunu kısa okuma dosyaları ve özgün kaynak kayıtlarıyla ilişkilendiriyor. Bir kaynak, kütüphanede yalnız bir kez tutuluyor ve birden fazla koleksiyondan bulunabiliyor. Bu yaklaşım, içerik çoğaltmadan farklı kullanıcı girişleri sağlıyor. Ölçek seçimi için izin ve geçerlik bilgileri birbirine karıştırılmıyor.

## Duke. Araştırma ile uygulama kaynaklarının ayrılması

### Gözlenen yapı

Duke sitesinde araştırma, eğitim, yayınlar ve manevi bakım kaynakları belirgin başlıklardır. Dini uyarlanmış bilişsel davranışçı terapi projesinin kılavuzları ile araştırma yayınları farklı sayfalarda sunulur. Kılavuz dizininde farklı dini geleneklere göre belgeler ve bazı sürüm ayrımları bulunur. Eğitim sayfalarında tarihli program bilgisi vardır. Crossroads sayfası araştırma özetlerini, yorumları ve duyuruları tarihli bülten arşiviyle ilişkilendirir.

Dayanaklar. [Merkez](https://spiritualityandhealth.duke.edu/), [eğitim](https://spiritualityandhealth.duke.edu/index.php/education/education-programs/), [terapi kılavuzları](https://spiritualityandhealth.duke.edu/index.php/religious-cbt-study/therapy-manuals/), [araştırma yayınları](https://spiritualityandhealth.duke.edu/index.php/religious-cbt-study/research-publications/), [Crossroads](https://spiritualityandhealth.duke.edu/index.php/publications/crossroads/).

### MARSAM için çıkarım

Bir kılavuzu bulabilmek, onu herhangi bir danışanda uygulamak için yeterlik veya izin kazanmak değildir. Kılavuzun varlığı ile o yaklaşımın sınandığı çalışma birbirine bağlanmalı, ama özdeş sayılmamalıdır. Ayrıca etkinliğin tarihi geçince sayfanın metninde yer alan bir kayıt çağrısı otomatik biçimde geçerli kalmamalıdır. Tarih, organizatör ve erişim koşulu ayrı alanlar olmalıdır.

### Uygulanan karşılık

Kaynak karşılaştırma sayfasında dört kayıt tür, açıklama, incelenen kapsam, yorum sınırı, haklar ve künye üzerinden yan yana gösteriliyor. Bu bir müdahale öneri motoru veya etkililik puanlaması değildir. Takvimde gerçek dış kurum etkinlikleri ve geçmiş etkinlik arşivi bulunur. Tarihi gelecek olan bir etkinlik için bile kayıtların açık olduğu ileri sürülmez. Özgün organizatör sayfasına yönlendirme korunur. Duke belgeleri indirilebilir diye yeniden barındırılmamıştır.

## Columbia SMBI. Üniversite kimliği ve öğrenme yolculuğu

### Gözlenen yapı

SMBI'ın kurumsal başlığı Teachers College, Columbia University ilişkisini açıkça taşır. Çalışma alanları araştırma, doğa ve ekoloji, eğitim ve gelişim, liderlik ile ruh sağlığı ve iyilik hali çevresinde düzenlenir. Lisansüstü çalışma için ayrı giriş bulunur. Görsel anlatım, araştırma gündemi ve eğitim kimliği birlikte sunulur. Kurumun kendi misyon metni veya eğitim vaadi, bağımsız etkililik kanıtı olarak değerlendirilmemiştir.

Dayanaklar. [SMBI](https://spiritualitymindbody.tc.columbia.edu/), [çalışma alanları](https://spiritualitymindbody.tc.columbia.edu/our-work/), [lisansüstü çalışma](https://spiritualitymindbody.tc.columbia.edu/smb-graduate-studies/welcome/), [etkinlikler](https://spiritualitymindbody.tc.columbia.edu/events/).

### MARSAM için çıkarım

MARSAM'ın üniversite ilişkisi yalnız alt bilgiye eklenmiş bir isim olmamalıdır. Üst kimlik, merkezin adı ve önizlemenin statüsü ilk ekranda anlaşılmalıdır. Buna karşılık kurumsal görsel düzenin ciddiyeti, merkezin kuruluş işlemleri veya içeriklerin akademik onayı tamamlanmış gibi sunulmamalıdır. Öğrenci ile deneyimli uygulayıcıya aynı başlangıç okumasını zorunlu kılmak yerine, amaçlarına göre takip edilebilir yollar verilmelidir.

### Uygulanan karşılık

Marmara Üniversitesi'nin yayımladığı genel üniversite işaretinin Türkçe ve İngilizce yatay sürümleri kullanıldı. MARSAM bunların yanında, ayrı bir merkez adı olarak yerleştirildi. Kullanıcının bildirdiği kurumsal hedef, sekiz dilde Marmara Üniversitesi bünyesinde planlanan merkez olarak ifade edildi. Öğrenci, uygulayıcı ve araştırmacı girişleri korundu. Öğrenme rotaları sertifikalı eğitim veya resmî ders olarak adlandırılmadı.

## IAPR. Bilimsel topluluk, yayın ve süreklilik

### Gözlenen yapı

IAPR bir üniversite merkezi değildir. Derneğin sitesinde bilimsel topluluğa katılım, yönetim ve kurumsal bilgiler, konferanslar, dergi ve ödüller için farklı alanlar bulunur. Archive for the Psychology of Religion bağlantısı araştırma üretimiyle topluluğun sürekliliğini ilişkilendirir. Derginin resmî sayfası kuram, araştırma ve pedagoji bölümlerini ayırır. International Journal for the Psychology of Religion ile karıştırılmamalıdır. Konferans sayfaları etkinlik geçmişini izlemeye olanak verir. Bu örgütsel işlevler klinik hizmet sunumu olarak değerlendirilmemiştir.

Dayanaklar. [Dernek](https://www.iaprweb.org/), [hakkında](https://www.iaprweb.org/about-us/), [dergi](https://www.iaprweb.org/journal/), [konferanslar](https://www.iaprweb.org/conferences/).

### MARSAM için çıkarım

Bir platformun canlılığı yalnız ana sayfaya haber eklenmesiyle sağlanamaz. İçeriğin sorumlusu, güncelleme zamanı ve katılımın nasıl gerçekleştiği açıklanmalıdır. Gerçek bir üyelik veya iletişim sistemi hazır değilken çalışan bir kayıt formu izlenimi vermek ise bu amaca hizmet etmez. Dış kurumların ağda görünmesi ortaklık veya onay anlamına gelmemelidir.

### Uygulanan karşılık

Dört kurum için türünü ve bilimsel işlevini açıklayan uluslararası kaynak görünümü eklendi. Her profilde araştırma, eğitim, ölçme, dergi veya etkinlik gibi farklı özgün girişlere erişim var. Kaynak önerisi aracı yalnız yerel JSON dosyası hazırlıyor. Üyelik, başvuru, e-posta gönderimi veya gerçekleşmiş ortaklık uydurulmadı. Tarihli dış etkinlikler geçmiş ve yaklaşan olarak ayrılıyor.

## Marmara kurumsal tasarımının somut karşılığı

Üniversitenin kurumsal logo kılavuzundaki ana dijital renk RGB 0, 61, 114, yani `#003d72` olarak kullanıldı. Ana rengin üzerine serbest gradyan veya farklı tonlar üretilmedi. Tamamlayıcı mavi, açık nötr yüzeyler ve sınırlı sıcak vurgu araştırma portalının bilgi hiyerarşisine hizmet ediyor. Logonun öğeleri yeniden çizilmedi, orantısız ölçeklenmedi veya başka bir fakülte işaretiyle karıştırılmadı. Orijinal PNG dosyaları korunarak CSS ile orantılı görüntülendi.

Web yazı ailesinde Open Sans önceliği tanımlandı, bulunmadığında sistem yazı ailesine dönülür. Özel font dosyası dağıtılmadığı için her cihazda aynı fontun yüklü olduğu ileri sürülmez. Kurumsal kılavuzun kullanılması, üniversitenin bu prototipi resmen onayladığı anlamına gelmez.

Dayanaklar. [Kurumsal logo sayfası](https://isletme.marmara.edu.tr/fakulte/kurumsal-logo), [kurumsal logo kullanım kılavuzu](https://isletme.marmara.edu.tr/dosya/isf/Kurumsal_Logo_Kullanim_Kilavuzu.pdf). Varlık kayıtları `docs/MARMARA_ASSETS.json` dosyasındadır.

## Daha iyi olma hedefini nasıl sınayacağız

İyileştirme hedefi, dört kurumdan daha büyük bir katalog varmış gibi görünmek değil, MARSAM'ın hedef kitlesinin somut işlerini iyi tamamlamasıdır. Önerilen görevler aşağıdadır.

| Kullanıcı işi | Prototipteki karşılık | Kontrol biçimi |
| --- | --- | --- |
| Bir sorudan ilgili kaynağa ulaşmak | Tematik koleksiyon ve kaynak bağlantısı | Her koleksiyondaki bağlantıların gerçek kayda ulaşması |
| İki farklı kaynak türünü ayırmak | Yan yana karşılaştırma | Tür, kapsam, künye ve hakların ayrı satırlarda olması |
| Aynı karşılaştırmayı başka dilde sürdürmek | Kaynak kimlikli paylaşım adresi | Dil değişiminde aynı kayıtların korunması |
| Arapça sayfada özgün künyeyi okumak | RTL arayüz, LTR künye | Mobil yerleşim ve metin yönü kontrolü |
| Etkinlik tarihinin geçip geçmediğini anlamak | Tarihe göre arşiv ve yaklaşan görünümü | Geçmiş etkinliğin yaklaşan listesine girmemesi |
| Okuma işini daha sonra sürdürmek | Yerel okuma ve karşılaştırma listeleri | Yenileme ve dil değişiminde korunma |
| Taslakla resmî yayını ayırmak | Marmara ilişkisinin ve önizleme durumunun görünürlüğü | Sekiz dilde statü ve onay alanlarının kontrolü |

Bunların teknik olarak çalışması, kullanıcıların görevleri daha hızlı veya daha doğru yaptığı sonucunu vermez. Bir sonraki kullanılabilirlik çalışmasında öğrenciler, uygulayıcılar ve araştırmacılarla görev tamamlama, yanlış seçim, kaynak türünü ayırt etme ve geri dönülebilirlik değerlendirilebilir. Böyle bir araştırma bu teslimde yapılmamıştır. Bu nedenle sayısal üstünlük veya bağımsız kalite sertifikası verilmemiştir.

## İçerik ve yayın yönetimi

Başlangıç koleksiyonundaki kısa dosyalar, hakemli makale veya merkez yayını olarak etiketlenmez. Kaynak kayıtlarında bibliyografik kimlik, incelenen kapsam ve iddiayı destekleyen içerik ayrılır. Dil çevirisi, ölçme aracının psikometrik uyarlaması olarak sunulmaz. Kaynaklar V1 ve PARTIALLY_VERIFIED olarak kalır. Kurum sayfaları için gözlem, o kurumun bütün araştırmalarına verilmiş bilimsel onay değildir.

Halil Hoca'nın içerik önceliği açısından en önemli sonraki karar, ilk tam tematik dosyaların sorumlu editörleriyle belirlenmesidir. Bu prototipte hazır olmayan ortak editör hesabı, form veritabanı veya LMS varmış gibi davranılmıyor. Git geçmişiyle içerik değişikliği izlenebilir, ama bu özellik birden fazla kişinin güvenli rol tabanlı yayın panelinin yerini tutmaz. Böyle bir panel eklendiğinde üniversitenin veri, kimlik ve yetki düzeni ayrıca kararlaştırılmalıdır.

## GitHub Pages ve aktarılabilirlik

Kod, mevcut sekiz dilli statik üretim üzerine eklenmiştir. `/MARSAM/` alt yolu, görselleri, aramayı, dosya indirmelerini ve doğrudan içerik adreslerini birlikte taşır. GitHub Pages'e yalnız üretilmiş `dist` klasörü gönderilir. Ders dosyaları, özel mesajlar, danışan bilgileri ve yayımlanmamış kitap bölümleri dağıtım paketinin parçası değildir. Teknik taslağın kamuya açılması ile resmî akademik yayının onayı farklıdır.

GitHub Pages ilk etkinleştirmesi için bu oturumdaki otomatik deneme, GitHub'ın entegrasyona verdiği izin sınırına takılmıştır. Kurulum tamamlanmadan erişilebilir site veya başarılı dağıtım ilan edilmez. Kalıcı iş akışı, üniversite alan adına geçişten ayrı olarak taslak gösterimini destekler. Site daha sonra kurumsal ortama taşınabilir. GitHub Pages özel HTTP başlık dosyalarını uygulamadığından, `_headers` dosyası orada ek güvenlik garantisi sayılmaz. HTML içindeki meta CSP ve noindex korunur. Kurumsal yayın ortamında sunucu düzeyindeki başlıklar ayrıca uygulanmalıdır.

## İnceleme bağımsızlığı

Karşılaştırma, içerik seçimi, yazılım geliştirme ve iç kontrol aynı asistan çalışma sürecinde gerçekleştirilmiştir. Bağımsız insan hakemliği, ana dil uzmanı onayı, üniversite onayı veya karşılaştırmalı kullanıcı araştırması değildir. Gerçek tarayıcı otomasyonu, bilimsel yorumların doğrulanması yerine geçmez. Teknik kontrol sonuçları kendi günlükleriyle birlikte sunulur.
