# MARSAM GitHub Pages yayını

## Mevcut inceleme sitesi

https://onourimpram.github.io/MARSAM/

Sürüm 0.4.0 yayımlanmış ve gerçek adreste doğrulanmıştır. Uygulamanın kaynak deposu `OnourImpram/MARSAM`, yayın deposu `OnourImpram/onourimpram.github.io` içindeki `MARSAM/` klasörüdür. Source deposunun kendi Pages yönetim ayarını değiştirmek gerekmez.

## Güncelleme akışı

Önce MARSAM kaynak kodu ve sekiz dilin testleri çalıştırılır. `BASE_PATH=/MARSAM/` ve `PAGES_PREVIEW=true` ile temiz statik üretim yapılır. Yalnız üretilmiş MARSAM klasörü yayın deposundaki mevcut sürümün yerine konur. Eski sayfaların yayında kalmaması için bu klasör bütün olarak değiştirilir. Başka bir web sitesi veya ana sayfa dosyası değiştirilmez.

Mevcut düzeltmenin aşamaları yayın deposunun `publish/marsam-scope-20261001` dalındaki `.github/workflows/marsam-scope-publish.yml` dosyasında kayıtlıdır. Bu iş akışı kaynak commit'ini sabitler, doğrulanmış adayı üretir ve canlı adresin aynı sürümü sunmasını bekler. Aday klasörün ana dala aktarılması ayrıca kontrollü biçimde yapılır. Kaynak ana dalındaki her değişiklik kendiliğinden canlıya geçmez.

## Doğrulama

Canlı `release.json` dosyası kaynak commit'ini ve dosya hash'lerini taşır. Yayımlanan dosyalar bu kayıtla karşılaştırılır. Eski kaldırılmış sayfalar, arama verileri ve gerçek tarayıcı etkileşimleri de denetlenir. Teslim kanıtı `LIVE_REVIEW_RELEASE.json` içindedir.

## Sınırlar

GitHub Pages inceleme sürümü herkese açıktır. `noindex` gizlilik sağlamaz. Özel yazışmalar, ders dosyaları, yayımlanmamış eserler ve katılımcı verileri yayına eklenmez. Bu statik sürüm yönetici hesabı, CMS, LMS veya araştırma veri tabanı sağlamaz. Üniversitenin resmî alan adına geçişi ve kuruluş onayı ayrı kurumsal işlemlerdir.
