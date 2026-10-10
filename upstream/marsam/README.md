# MARSAM 0.11.0 candidate · live baseline 0.10.2

Maneviyat ve Ruh Sağlığı Araştırmaları Merkezi girişimi için sekiz dilli akademik bilgi platformu. Planlanan akademik yapı Marmara Üniversitesi, Atatürk Eğitim Fakültesi, Eğitim Bilimleri Bölümü, Rehberlik ve Psikolojik Danışmanlık Anabilim Dalıdır. Teknik yayın, resmî kuruluş veya bilimsel onay değildir.

## 0.10.2 arayüz sadeleştirmesi

Tekrarlanan genel dipnotlar, klinik hizmet uyarısı, okuma rotası uyarısı ve yinelenen taslak panelleri kaldırıldı. Kaynak kayıtları, bilimsel sınırlılıklar, kullanım izinleri ve 0.10.1 portalı değişmedi.

## Platform

Türkçe https://onourimpram.github.io/MARSAM/tr/

English https://onourimpram.github.io/MARSAM/en/

44 kamusal kaynak kaydı, sekiz kanıt teması, 19 ortak bilimsel özete bağlı araştırma kaydı ve bu kayıtlar için 152 dil metni bulunur. Sekiz dildeki tüm eski dosyaların bağımsız anadil veya bilimsel incelemesinin tamamlandığı iddia edilmez. Eski içeriklerin legacy-seed modeli ayrıca kaydedilir.

## 0.10.1 görsel düzeltmesi

Sol alt birleşimdeki dikdörtgen yama izi kaldırıldı. İki bağımsız CSS kaplaması yerine tek, kendi içinde yeterli portal-continuous-v1.svg kullanılır. Dosya özgün WebP görselini bir kez gömer ve sağdaki ilk kemer konturunu sol tarafta yeniden kullanır. Alt çerçeveye taşan dikdörtgen maske yoktur. MARSAM yazısı veya görsel yeniden üretilmedi. Özgün WebP dosyaları değişmeden saklanır.

Mobil ve masaüstü aynı kompozisyonu kullanır. Regresyon testleri artık hatalı eski CSS kompozisyonuna eşitliği değil, korunacak özgün pikselleri, düzeltilen ayağı ve kaplamasız görüntülemeyi denetler. Ayrıntılar [görsel düzeltme kaydında](docs/design/PORTAL_CONTINUITY_0_10_1.md), canlı kanıt [yayın kaydında](docs/releases/portal-continuity-0.10.1-live.json) bulunur.

## Korunan akademik katman

0.10.0 döngüsündeki altı yeni kaynak, boylamsal ve kişi içi bulgular, Türkiye'de eş kaybı, Brezilya'daki tıp öğrencileri, psikoz bağlamı ve din görevlileriyle ilişkili istismar sonrası manevi zarar konularını seçkiye ekler. İki sentez, farklı örneklem ve yöntemlerden gelen sonuçları tek bir etkililik hükmüne indirgemez. Bu içerik 0.10.1 düzeltmesinde değiştirilmedi.

Kaynak üstverisi ve her dil metni kalıcı taslak parmak izleriyle korunur. Build sırasında eski parmak izleri otomatik olarak yeniden onaylanmaz. data/locale-parity.json alanların varlığını ve kayıtlı içerikle eşleşmeyi gösterir. Bu dosya anlam eşdeğerliği, doğruluk veya insan onayı sertifikası değildir.

Marmara kimliği, çini, gezinme, kurucu anlatısı ve araştırma laboratuvarı korunur. İki SWBS ayrı araç olarak kalır. Ekşi ve Kardaş 2017 kaynağındaki .50 ve .050 SRMR uyuşmazlığı gizlenmez.

Akademik döngünün ayrıntıları [döngü raporunda](docs/cycles/2026-10-04/REPORT.md), güncel teknik teslim [teslim durumunda](DELIVERY_STATUS.md) bulunur. Önceki sürümler ve doğrulama kayıtları tarihsel kanıt olarak saklanır.

## Geliştirme ve kontrol

Node.js 22 veya üzeri. Ek bir uygulama çatısı veya tarayıcı çalışma zamanı bağımlılığı yoktur.

```sh
node scripts/portal-art.mjs
npm run check
BASE_PATH=/MARSAM/ PAGES_PREVIEW=true npm run check
node scripts/budget.mjs
python tests/research_artifacts.py
BROWSERS=chromium,firefox,webkit python tests/browser_e2e.py
BROWSERS=chromium,firefox,webkit python tests/scope_e2e.py
BROWSERS=chromium,firefox,webkit python tests/heritage_e2e.py
BROWSERS=chromium,firefox,webkit python tests/research_e2e.py
BROWSERS=chromium,firefox,webkit python tests/cini_e2e.py
BROWSERS=chromium,firefox,webkit python tests/scholarship_e2e.py
BROWSERS=chromium,firefox,webkit python tests/evidence_cycle_e2e.py
BROWSERS=chromium,firefox,webkit python tests/portal_pixels.py
```

Kalıcı taslak kayıtlarının güncellenmesi için [bakım yönergesini](docs/cycles/2026-10-04/MAINTENANCE.md) izleyin. Özel ders belgeleri, katılımcı verileri, izin alınmamış ölçek maddeleri ve font dosyaları yayımlanmaz. Teknik kontroller insan bilimsel değerlendirmesi, bağımsız erişilebilirlik sertifikası veya anadil incelemesi yerine geçmez.


## 0.11.0 research infrastructure

This release candidate implements the 5 October research roadmap in the source repository. It contains the original nine roadmap records plus a second eight-record high-information tranche, expands the Measurement Observatory and Türkiye–international evidence bridges, keeps the dataset registry and construct dictionary, records post-publication correction state, and exposes versioned static research API outputs under `data/v1/`. New scholarly prose remains `AI_ASSISTED_DRAFT` until human scientific and native-language review. The approved heritage portal, visual identity and 0.10.2 disclaimer cleanup are unchanged.
