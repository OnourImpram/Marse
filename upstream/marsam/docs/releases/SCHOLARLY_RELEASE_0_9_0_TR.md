# MARSAM 0.9.0 geliştirme ve değerlendirme raporu

3 Ekim 2026. [MARSAM 0.9.0 canlı inceleme sürümü](https://onourimpram.github.io/MARSAM/tr/) yayımlandı ve doğrulandı. Kaynak başlangıcı `90a2e98ecf2c7ed94ae20ffb22236b977c0a685b`. Bu rapor, MARSAM'ın mevcut mimarisini temel alan bilimsel içerik geliştirmesini açıklar. Kesin kaynak ve yayın commitleri, canlı dosya karşılaştırması ve son tarayıcı sonuçları aynı klasördeki `scholarly-evidence-0.9.0-live.json` kaydındadır.

## Sonuç ve kapsam

Kamusal seçki, 27 eski kaynak arasından korunan 25 kayıt ve eklenen 11 araştırma veya ölçme kaynağıyla 36 kaynaktan oluşur. Sekiz dilde Kanıtı okumak alanı, dört araç profili ve ölçülü bir kurucu tanıtımı mevcut araştırma rehberleriyle bütünleşir. Eski içeriklerin tamamı yeniden yazılmış gösterilmez. Yeni 88 kaynak metni ortak bilgi özetlerine bağlanırken eski metinlerin mevcut taslak ve dil kökeni kayıtları korunur.

Çalışma bir sistematik derleme değildir. Kaynak sayısı, coğrafi dağılım veya kurucuya atıf sayısı için yapay hedef uygulanmadı. İlgililik, yöntem çeşitliliği ve çıkarım sınırı esas alındı. Bu sürüm, kurum tarafından bilimsel veya dil açısından onaylanmış bir yayın olarak sunulmaz.

## Başlangıçtaki güçlü yönler ve sorunlar

| Alan | Güçlü yön | Giderilen veya açıklığa kavuşturulan sorun |
| --- | --- | --- |
| Kimlik | Marmara akademik birim satırı, sıcak palet, onaylı ebru portalı ve geride kalan çini | İçerik geliştirmesi sırasında görsel sistemi yeniden tasarlamak gerekmiyordu. Reddedilmiş beyaz yama ve ayrı yazı katmanı yayıma alınmadı. |
| Mimari | Bağımlılığı az statik üretici, iki yayın kökü, yerel arama ve indirilebilir atıflar | Yeni kaynakların mevcut bibliyografik türleri ve arama kayıtlarıyla uyumlu olması gerekiyordu. |
| Bilimsel kayıt | Kaynak kimliği, inceleme kapsamı ve izinleri ayıran yapı | Kaynaklar araştırma tasarımı ve çıkarım sınırı bakımından yeterince karşılaştırılabilir değildi. |
| Seçki | Manevi danışma ve Türkiye bağlamına ilişkin güçlü eserler | Güncel vitrin kurucu çevresinde daralıyordu. Bazı kişisel gelişim eserlerinin akademik rolü doğrulanmamıştı. |
| Ölçme | Ölçme rehberi ve kaynak dizini | Dört araç için amaç, boyut ve yorum sınırlarını birlikte veren başlangıç profilleri eklendi. |
| Diller | Sekiz dil, Arapça yönü, Çince arama normalizasyonu | Yeni bilgi değişince eski dil metninin sessizce geçerli kalmasını engelleyen bağ eklendi. Arapça bilimsel aralıkların görünür sırası düzeltildi. |

Başlangıçtaki 537 kamusal sayfanın HTTP incelemesi `docs/research/LIVE_BASELINE.json` içinde bulunur. Bu erişim kontrolü, her sayfanın bilimsel içeriğinin tam metin olarak incelendiği anlamına gelmez.

## Eser bazında kapsam kararı

Tam envanter `docs/research/SCOPE_AUDIT.json` içindedir. Her eski kaydın sınıfı, eylemi, gerekçesi, kaynak bağlantısı ve inceleme tarihi vardır. Geçersiz bir eylem, yazım hatası olsa bile derlemeyi durdurur.

İki eser kamusal bilimsel seçkiden çıkarıldı. Maneviyatın Keşfi, 21 Boyutta Kendi Kendine Yardım Kılavuzu ve Manevi Yaşam Pratikleri. Yayıncı açıklamaları kişisel keşif ve gündelik uygulamaları öne çıkarıyordu. Bu geliştirme döngüsünde araştırma veya mesleki eğitim için somut bir işlev doğrulanmadı. Karar eserlerin genel değerine ilişkin bir yargı değildir. Özgün kayıtlar ve Git geçmişi korunur. Yeniden eklemek için açık bir akademik işlev belgelenmelidir.

Ana başlığı genel görünen üç mesleki eser çıkarılmadı. Bilişsel Davranışçı Terapi, Manevi Perspektifli Teori ve Uygulamalar. Grupla Psikolojik Danışma Uygulamaları, Psikospiritüel Gelişim Kılavuzu. Psikoterapi ve Psikolojik Danışma Kuramları, Manevi Boyutlarıyla. İncelenen baskıların alt başlıkları ve yayıncı kayıtları manevi odağı açıkça gösteriyordu. Başlığa dayalı mekanik dışlama, ilgili kaynakları yanlışlıkla kaybettirecekti.

Manevi yönelimli danışma, aile terapisi, travma ve teknik kitapları mesleki veya kuramsal kaynak olarak kaldı. Bunların katalogda bulunması tedavi etkililiği kanıtı olarak yorumlanmaz. PRISMA, araştırma raporlaması için bağlamsal kaynaktır. WHO yapay zekâ etiği rehberi dijital araçların değerlendirilmesi için bağlamsal kaynaktır. İkisi de manevi müdahalenin etkililiğine kanıt oluşturmaz.

## Eklenen araştırmalar ve ölçme kaynakları

| Kaynak | Bilimsel işlev | Temel yorum sınırı |
| --- | --- | --- |
| Zwingmann, 2026. DOI `10.1007/s10943-025-02406-3` | Almanca konuşulan bağlamlarda meta analiz | Küçük korelasyon nedensellik değildir. Çevrim içi tarih 2025, cilt yılı 2026 olarak ayrı tutulur. |
| Mannion ve arkadaşları, 2026. DOI `10.1007/s10943-026-02736-w` | Ergenlerde kültürler arası sistematik derleme | Yararlı, nötr ve olumsuz bulgular birlikte vardır. Evrensel koruyuculuk çıkarılamaz. |
| Aggarwal ve arkadaşları, 2023. DOI `10.1186/s12888-023-05091-2` | Gençlerde depresyon ve kaygı üzerine derleme ve meta analiz | Maneviyatın boyutları ayrılmalıdır. Kalite ve müdahale heterojenliği çıkarımı sınırlar. |
| Coelho Júnior ve arkadaşları, 2022. DOI `10.3389/fmed.2022.877213` | İleri yaşta gözlemsel araştırmaların meta analizi | Tedavi etkisi göstermez. Özet ve gövde çalışma sayıları uyuşmadığından toplam sayı aktarılmadı. |
| Chen ve arkadaşları, 2020. DOI `10.1093/ije/dyaa120` | Üç ileriye dönük ABD kohortu | Artık karıştırıcılık mümkündür. Dini katılım maneviyatın bütünü değildir. |
| Sedlar ve arkadaşları, 2018. DOI `10.3390/rel9080242` | Ateist ve teist örneklemlerde manevi mücadele | Kesitsel veriler bütün inançsız insanlara genellenemez. |
| Koenig ve arkadaşları, 2015. DOI `10.1097/NMD.0000000000000273` | Dini uyarlamalı BDT ile standart BDT arasında pilot randomize deneme | Genel farkın anlamlı olmaması eşdeğerlik kanıtı değildir. |
| Öztürk ve Horozcu, 2025. DOI `10.56432/tmdrd.1645518` | Türkiye depremleri sonrası uzman görüşmelerine dayalı nitel araştırma | Gereksinim ve deneyimler hakkında bilgi verir. Müdahale etkililiğini sınamaz. |
| Pargament ve arkadaşları, 2011. DOI `10.3390/rel2010051` | Brief RCOPE psikometrik derlemesi | Olumlu ve olumsuz dini başa çıkma ayrılır. Dil ve kültür geçerliği ayrıca gerekir. |
| Steger ve arkadaşları, 2006. DOI `10.1037/0022-0167.53.1.80` | Yaşamın Anlamı Ölçeği | Anlamın varlığı ve aranması ayrılır. Anlam, dindarlık veya psikiyatrik tanı değildir. |
| Koenig ve Büssing, 2010. DOI `10.3390/rel1010078` | DUREL tanıtımı | Dindarlığın üç boyutunu ele alır. Tüm maneviyatı veya klinik gereksinimi ölçmez. |

Doğrulama temeli yayıncı özetleri, yayıncı tarafından sağlanan Crossref metaverisi ve özetleri, Europe PMC kaydı ve resmî araç açıklamalarıdır. Tam yöntem değerlendirmesi yapılmış gösterilmez. Kaynakların esas kayıtları ilgili kamusal kaynak sayfasından açılır. Taşıma gözlemleri `SOURCE_TRANSPORT.json` içindedir. HTTP başarısı bilimsel onay değildir.

## Kanıt haritası, uyuşmazlıklar ve araştırma boşlukları

Altı bağlantılı tema, kavramsal ayrım, nedensel çıkarım, manevi mücadele, yaşam dönemi ve kültür, müdahaleler ve araştırma soruları arasında okuma sağlar. Bir çalışmanın kaydı, araştırma tasarımı, örneklem, bulgu ve sınırlılığını yan yana sunar.

Olumlu dini başa çıkma, manevi iyi oluş, dinin kişisel önemi ve dini katılım tek değişken gibi ele alınmaz. Bulgular farklı yapıların aynı yönde davranmadığını gösterir. Ölçek maneviyat tanımına iyi oluşu dahil ettiğinde ilişki kısmen kavramsal örtüşmeyi yansıtabilir. Böyle bir ilişki otomatik olarak koruyucu mekanizma değildir.

Gözlemsel ilişki, zaman içindeki değişim ve randomize müdahale karşılaştırması farklı çıkarımlar destekler. Pilot BDT denemesinin nötr genel sonucu, daha geniş manevi uyarlamalı psikoterapi derlemesiyle birlikte okunabilir. Bu, araştırmaların birbirini basitçe doğruladığı anlamına gelmez. Karşılaştırma koşulu, katılımcı tercihleri ve ölçülen sonuçlar incelenmelidir.

Seçki Türkiye, Almanca konuşulan bağlamlar, farklı ergen bağlamları, Malezya kökenli mevcut kavramsal çalışma, ABD kohortları ve ateist örneklemleri içerir. Bu dağılım dünya literatürünün temsili örneklemi değildir. Türkiye dışındaki düşük ve orta gelirli bağlamlar, farklı inanç gelenekleri, azınlık deneyimleri ve din dışı anlam kaynakları için daha geniş tarama gerekir.

Araştırma açısından öncelikli boşluklar, Türkiye bağlamında tercih duyarlı karşılaştırmalı müdahale çalışmaları, olası zararların sistematik ölçümü, kültürler arası ölçüm değişmezliği, manevi mücadele süreçlerinin boylamsal sınanması ve dijital araçların insan yetkisiyle ilişkisidir. Bunlar tamamlanmış MARSAM projeleri veya kesin etki vaatleri olarak yayımlanmaz.

## Kurucu ve kurum iddiaları

Prof. Dr. Halil Ekşi'nin kurucu ve akademik başlatıcı rolü, proje sahibinin verdiği bilgiye dayanır. Ana sayfada kısa bir tanıtım, Hakkımızda alanında daha geniş bir metin ve seçilmiş ilgili eser bağlantıları vardır. Resmî AVESIS profili bağlantılanır. Sentetik veya izni belirsiz portre kullanılmadı.

Kurucu tanıtımı bilimsel seçimin merkezine geçirilmedi. Ana sayfanın araştırma vitrini uluslararası sentez ve Türkiye'deki nitel çalışma için alan açar. Kurucu eserleri konuya uygunluklarına göre korunur. Resmî müdürlük, kuruluş tarihi, yönetim kurulu, tamamlanmış üniversite kuruluşu veya kurum ortaklığı üretilmez. Marmara akademik birim kimliği ile planlanan merkez statüsü ayrı tutulur.

## Ölçme ve yöntem altyapısı

Brief RCOPE, RSS kısa formu, Yaşamın Anlamı Ölçeği ve DUREL için dört başlangıç profili vardır. RSS profili mevcut Türkiye uyarlamasıyla ilişkilidir. Özgün araç adı ve RSS 14 kısaltması farklı dil metinlerinden bağımsız bulunabilir.

Profiller bir ölçek uygulama paketi değildir. Maddeler, puanlama tabloları ve izni belirsiz çeviriler çoğaltılmadı. Psikometrik bulgular klinik tanı yetkisi veya kullanım izni olarak sunulmaz. Belirli örneklemdeki geçerlik, başka yaş, dil veya kültür grubunda otomatik geçerlik sağlamaz. Uyarlama örneklemleri ve ölçüm değişmezliği için kapsamlı araç envanteri henüz yoktur.

Önceki dört araştırma rehberi ve kaynak envanteri, arama kaydı, kanıt matrisi ve yöntem taslağı için indirilebilir dosyalar korunur. Envanter betiği ve Jupyter defteri gerçek kaynak kimlikleriyle çalışır. İndirilen dosyalar belirli bir araştırmanın tamamlanmış bulgusu veya etik izin belgesi değildir. Değiştirilmiş veri ve yinelenen kimliklere ilişkin kontroller devam eder.

## Çok dilli yapı ve arama

Türkçe, İngilizce, Almanca, Basitleştirilmiş Çince, Rusça, Arapça, Endonezce ve Malayca korunur. Yeni kaynaklar için hiçbir dil diğerinin kaynak dili değildir. Ortak bilgi özetinde araştırma tasarımı, örneklem, sonuç, sınırlılık kodları ve inceleme temeli bulunur. Sekiz metin bu aynı içerikle ilişkilendirilir.

88 yeni metnin her birinde kullanılan bilgi özeti hash'i saklanır. Özet değişirse eski metin derlemeyi durdurur. Metin hash'leri, iddia kimlikleri ve kaynak kimlikleri denetim dosyasında yer alır. Kaynak DOI'si, bibliyografik DOI, kaynak kimliği ve kanonik bağlantı birbirine uymalıdır. Arapçada Latin bilimsel ifadeler ve sayısal aralıklar ayrı soldan sağa parçalarla sunulur.

Bu yapı metnin doğruluğunu veya anadil niteliğini matematiksel olarak kanıtlamaz. Yeni metinler yapay zekâ destekli taslaktır. Önceki yüzlerce metin yeniden yazılmış veya anadil uzmanlarınca incelenmiş gösterilmez. Tema, kurucu ve RSS açıklamalarında yapısal dil kontrolü vardır. Bu metinler 88 kaynak metniyle aynı bilgi özeti tazelik korumasına sahip değildir.

Arama, kaynakların yerelleştirilmiş metinlerini, özgün başlıkları, DOI ve ISBN kimliklerini korur. Kanıt sayfası ve araç profilleri de dizine girer. Religious and Spiritual Struggles Scale ifadesi sekiz dilde ilgili profile ulaşır. Çince arama kelime bölümlemesi ve Arapça toleranslı eşleştirme mevcut altyapıda sürdürülür. Kullanıcı verisi bir sunucuya gönderilmez.

## UX, erişilebilirlik ve performans

Beş ana gezinme grubu korunarak kanıt alanı ilgili gruba katıldı. Tek bir uzun kaynak yığını yerine altı temalı okuma yüzeyi kullanıldı. Kanıt paneli kaynağa giderken bulgu ile çıkarım sınırını birlikte gösterir. Araç profilleri mevcut ölçme rehberine döner.

Dar ekranlarda bibliyografik filtreler tek sütuna alınır. Bu değişiklik, WebKit Arapça görünümünde yüzde 200 metin boyutunda gözlenen doğal seçim denetimi taşmasını ele alır. Metin kesilerek hata gizlenmez. Yeni bilimsel aralıklar gerçek tarayıcıdaki karakter koordinatlarıyla sınanır.

Yeni çalışma bir JavaScript kütüphanesi, font, izleyici veya görsel animasyon eklemez. CSS ve JavaScript sıkıştırılmış dosya bütçeleri korunur. Bunlar dosya boyutu kontrolleridir. Saha Core Web Vitals ölçümü değildir. Klavye, JavaScript kapalı okuma, yazdırma, zorlanmış renkler ve duyarlı yerleşim mevcut testlerle değerlendirilir. Ekran okuyucu kullanıcı araştırması veya bağımsız erişilebilirlik sertifikası yapılmadı.

## Son kod incelemesi ve doğrulama

İlk bağımsız yapay zekâ incelemesinin düzeltilmiş bulguları `docs/research/FINAL_REVIEW.md` içindedir. Yayın öncesi ikinci dar kapsamlı inceleme dört ek sorun yakaladı. Kaynak kimliğinin farklı kaynağa bağlanabilmesi. Geçersiz kapsam eyleminin arşiv kararını aşması. Arapça bilimsel ifadelerde sıra bozulması. RSS tam adının aranamaması.

Dört sorun önce başarısız testlerle yeniden üretildi. Düzeltmeden sonra 13 bilimsel altyapı testi geçti. Tüm kaynak ve üretilmiş sayfa testleri iki yayın kökünde yeniden çalıştırıldı. Üç tarayıcı ve defter yürütmesi için nihai CI kaydı ile canlı kök kontrolleri yayın makbuzunda belirtilir. Yerel süreç kısıtından doğan Jupyter ve Firefox sorunu geçmiş bir başarıyla örtülmez. Tam sürüm kapısı uygun CI ortamında yürütülür.

Teknik testler insan bilimsel onayı, anadil onayı veya kurumsal onay yerine geçmez. Tek başına bir commit, çalışan yerel sayfa veya GitHub Actions sonucu canlı yayının doğrulandığını göstermez. Canlı sürüm kimliği ve dosya hash'leri ayrıca eşleştirilir.

## Bilinçli sapmalar ve bakım

Stratejik metindeki bütün öneriler birebir yeni bölüm olarak üretilmedi. Altı tema tek bir kanıt alanında birleştirildi. Dört başlangıç aracı profili mevcut yöntem altyapısını genişletti. Başlığı genel görünen ancak manevi baskısı açık üç eser korundu. İki sınırdaki eser arşivlendi. Eski yararlı dosyalar yeniden yazılmadı ve eski dil kökenleri dürüstçe etiketlendi. Onaylı portal ve palet korundu. Bu kararlar yinelenen sayfaları, gereksiz yeniden yazımı ve yanıltıcı tamamlanmışlık iddialarını azaltır.

Literatür keşif betiği en fazla 20 incelenmemiş aday üretebilir. Kamusal kataloğa otomatik kayıt ekleyemez. Bir editör asıl kaydı, DOI ve sürüm kimliğini, ilgililiği, yöntem türünü, sınırlılıkları ve izinleri incelemelidir. Sonra sekiz metin ve kapsam kararı birlikte güncellenir. Bu tarama dar bir keşif aracıdır, yaşayan sistematik derleme değildir.

İnsan incelemesinde öncelik, nicel iddiaların asıl kaynaklarla eşleştirilmesi, psikometrik yorumlar, dil başına akademik doğallık ve klinik çıkarım sınırlarıdır. Bilimsel, anadil ve resmî kurumsal onay alanları tamamlanmadan doğru olarak işaretlenmez. Bu eksiklikler platformun mevcut teknik inceleme sürümünün yayınını durdurmak için yeni bir yetki talebi oluşturmaz.

Kesin değişen dosya listesi ve sürüm commitleri canlı yayın makbuzunda bulunur. Kaynak kodu yalnız MARSAM deposunda güncellenir. Mevcut yayın deposunda yalnız `MARSAM/` ağacı değiştirilir. Diğer köklerin Git ağaç kimlikleri yayın öncesi ve sonrası karşılaştırılır.

## Kesin yayın ve test sonuçları

Test edilen ve yayımlanan kaynak commit `05963f0512cab78e599945448d4365a6a705b835`. Kaynak PR 5'in birleştirme commit'i `78e21464efa5fcdcc30bbd480c6a8341a3796ab8`. Kamusal yayın commit'i `aaeb7ca009a6763f34239a5b87d7dbaa6107f12f`. Yayın deposunda değişen 712 dosyanın tamamı MARSAM klasörü içindedir. Elif Tasarım, kök ana sayfa ve diğer kök girişlerin Git kimlikleri korunmuştur.

[Kaynak doğrulaması](https://github.com/OnourImpram/MARSAM/actions/runs/37145524289) iki yayın kökünde 93 kaynak testi ve 11 üretilmiş sayfa testiyle başarılıdır. Gerçek Jupyter çekirdeği dahil beş araştırma dosyası testi ve altı tam tarayıcı takımı da aynı CI çalıştırmasında geçmiştir. [GitHub Pages yayını](https://github.com/OnourImpram/onourimpram.github.io/actions/runs/37146061890) başarılıdır.

Canlı paket, sürüm manifesti ve kaynak commit'i ile eşleşir. HTML, CSS, JavaScript, arama verisi, atıf dosyası ve diğer varlıklardan oluşan 784 dosyanın byte boyutu ve SHA 256 hash'i canlı sunucuda karşılaştırılmıştır. Arşivlenen iki kaynağın sekiz dildeki toplam 16 eski adresi HTTP 404 döndürür.

| Canlı tarayıcı takımı | Başarılı kontrol | Sonuç |
| --- | ---: | --- |
| Genel gezinme, arama, karşılaştırma ve yerel taslak indirme | 818 | Tam takımın yeniden çalıştırılması başarılı |
| Kaynak kapsamı ve kurumsal sınırlar | 899 | İlk canlı çalıştırmada başarılı |
| Duyarlı yerleşim ve erişilebilirlik davranışları | 2.723 | İlk canlı çalıştırmada başarılı |
| Araştırma rehberleri ve indirilebilir araştırma dosyaları | 2.324 | İlk canlı çalıştırmada başarılı |
| Çini, portal ve görsel sistem davranışları | 1.393 | İlk canlı çalıştırmada başarılı |
| Yeni kanıt, ölçme, DOI araması ve Arapça bilimsel sıralama | 397 | İlk canlı çalıştırmada başarılı |
| Toplam | 8.554 | Altı takımın nihai sonuçları başarılı |

Tarayıcılar Chromium 149.0.7827.55, Firefox 151.0 ve WebKit 26.5'tir. Bu toplam bilimsel uzman değerlendirmesinin sayısı değildir. Otomatik teknik kontrol sayısıdır.

[İlk canlı çalışma](https://github.com/OnourImpram/onourimpram.github.io/actions/runs/37145692432) genel gezinme takımında başarısızdır. 710 kontrolden sonra Rusça katkı sayfasının beklenen HTTP 200 yanıtı alınmamıştır. Kaydedilen WebKit görüntüsü MARSAM içeriği yerine GitHub'ın servis hata sayfasını gösterir. O andaki HTTP durum kodu günlükte bulunmadığından kesin kod belirtilmez. Diğer beş takım ve bütün dosya karşılaştırması başarılıdır.

[Ayrı tam gezinme tekrarı](https://github.com/OnourImpram/onourimpram.github.io/actions/runs/37146510935) aynı test edilen kaynak koduyla ve hiçbir koşulu gevşetmeden üç tarayıcıda 818 kontrolü geçmiştir. Eklenen tanı kaydı, 280 gezinme yanıtının tamamının HTTP 200 olduğunu gösterir. İlk hata kaydı ve GitHub hata görüntüsü korunur. Böylece başarısız ilk çalıştırma başarılı bir toplu çalışma gibi sunulmaz.

CSS sıkıştırılmış bütçesi 13.652 byte, JavaScript bütçesi 9.660 byte olarak geçmiştir. Bütçe kaydı aynı sürümün arama verilerini de içerir. Saha performansı veya Core Web Vitals sonucu üretilmemiştir.

Güncel ham kayıtlar `verification/0.9.0` altındadır. İlk çalışma arşivinde bulunan eski `live-browser.json` bu çalışma tarafından üretilmediği için güncel sonuçlara dahil edilmemiştir. Güncel toplam yalnız yukarıdaki altı takımın doğrulanan kayıtlarını içerir. Canlı ana sayfa, kanıt alanı ve Arapça RSS profili ayrıca herkese açık tarayıcıda incelenmiş, aynı ekran görüntüleri `screenshots` altında saklanmıştır.

Bu teslim, sahibinin yetkilendirdiği kamusal inceleme sürümünün teknik geliştirilmesini ve yayınını tamamlar. Bilimsel uzman, anadil uzmanı ve resmî kurumsal onay durumları henüz tamamlanmamıştır ve doğru olarak işaretlenmemiştir.
