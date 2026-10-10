# MARSAM 0.9.2. Portal simetri düzeltmesi

4 Ekim 2026. MARSAM 0.9.2, 0.9.1 bilimsel sürümünün içeriğini ve bilgi mimarisini değiştirmeden, sahibin ekran görüntüsünde sarı ile işaretlediği tek görsel kusuru düzeltir. Sol dış iç-geçit boyunca kalan dar fildişi açıklık, sağ taraftaki karşılık gelen turkuaz ebru yüzeyinin yalnız gerekli şerit içinde aynalanmasıyla kapatıldı.

## Canlı site

https://onourimpram.github.io/MARSAM/tr/?v=0.9.2

https://onourimpram.github.io/MARSAM/en/?v=0.9.2

## Düzeltmenin sınırı

Onaylı 960 ve 480 piksel WebP portal varlıkları byte düzeyinde değiştirilmedi. MARSAM yazısı, iç içe kemerler, sıcak kâğıt yüzeyi, ebru dokusu, İznik esintili arka plan, Marmara masthead'i, renk paleti, tipografi, grid ve akademik içerik aynen korundu.

Düzeltme yalnız `.manuscript-frame.approved-portal::after` üzerinde çalışır. Mevcut 960 piksel portal görseli yatay olarak aynalanır ve yalnız şu dar maske görünür bırakılır.

`polygon(84.5% 32.5%, 86.5% 33%, 86.2% 86.5%, 84.6% 83.5%)`

Bu nedenle yeni bir görsel üretilmedi, görsel bütünü aynalanmadı, yeniden renklendirme yapılmadı ve metin yeniden oluşturulmadı. Katman etkileşimsizdir ve portal karesinin dışına taşamaz.

## Test ve doğrulama

Kaynak ana dal doğrulaması 37203871480 üzerinde başarıyla tamamlandı. İki deployment root, içerik sözleşmeleri, notebook ve kurcalama kontrolleri, Chromium, Firefox ve WebKit tabanlı native tarayıcı kontrolleri, sekiz dil ve responsive yerleşimler geçti.

Hosting yayın işi 37204284924 başarıyla tamamlandı. İş exact kaynak commitini yeniden çekti, 0.9.2'yi yeniden oluşturdu ve doğruladı, yalnız `MARSAM/` alt ağacını değiştirdi, eşzamanlı host değişikliği kontrolünü uyguladı ve tek kullanımlık yayın workflow'unu final committen kaldırdı.

GitHub Pages build ve deployment işi 37204309163 başarıyla tamamlandı.

Deployment sonrasında gerçek kamusal URL ayrı bir canlı tarayıcı oturumunda yeniden açıldı. Sol taraftaki dar açıklığın turkuaz ebru şeridiyle kapandığı, sağ tarafla görsel olarak eşleştiği ve görünür dikiş, boşluk, distorsiyon veya yeni asimetri oluşmadığı doğrulandı. MARSAM wordmarkı ve portalın geri kalanı değişmemiş görünmektedir.

## Sürüm kimliği

Kaynak payload commit: `aeddf3f175f0ea4a799d683cc18a2d05ecc557cb`.

Kaynak tree: `1cefa0a7741e60865dbb1665d0e5854ee092c7ab`.

Hosting commit: `002e004e5fa35e19643d421c836a9d44f81c0abd`.

Host tree: `0bb9b6deaa9cfbc145923fd70967cd6b355b4d12`.

MARSAM subtree: `637f220ab61d00b3e7c65d7391ea80a4203e159d`.

Canlı hosttaki `MARSAM/release.json`, sürümü `0.9.2`, release kimliğini `marsam-portal-symmetry-repair-0.9.2` ve sourceCommit değerini yukarıdaki payload commit olarak kaydeder. Manifest 821 kamusal dosyayı kapsar.

## Korunan 0.9.1 bilimsel katmanı

0.9.1'de yapılan SWBS kimlik ayrımı, Ekşi ve Kardaş 2017 içindeki SRMR uyuşmazlığının açık gösterimi, geliştirme, uyarlama ve bağımsız doğrulama ayrımı, sekiz dilde kaynak parmak izi sistemi ve kayıt düzeyi inceleme tarihleri bu görsel patchte değiştirilmedi.

## Bilinen sınırlar

0.9.2 görsel bir hata düzeltmesidir. Bağımsız erişilebilirlik sertifikası, saha Core Web Vitals çalışması, insan bilimsel hakem incelemesi veya sekiz dilde anadil uzmanı onayı iddia etmez. MARSAM'ın resmî kurumsal kuruluş statüsünü de değiştirmez.
