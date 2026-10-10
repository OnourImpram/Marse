"""Install a pinned CJK face on a disposable test host only. Never publish it."""
from pathlib import Path
from urllib.request import urlopen
import hashlib,json,subprocess,time,os,pwd
# Use the same effective-user home as the native browsers.
os.environ["HOME"] = pwd.getpwuid(os.getuid()).pw_dir
commit='f8d157532fbfaeda587e826d4cd5b21a49186f7c'
url=f'https://raw.githubusercontent.com/notofonts/noto-cjk/{commit}/Serif/OTF/SimplifiedChinese/NotoSerifCJKsc-Regular.otf'
blob='cba8a4783cc38574ac7cda52cae7d9b4241c07a5'
font=Path.home()/'.local/share/fonts/marsam-test/NotoSerifCJKsc-Regular.otf'
font.parent.mkdir(parents=True,exist_ok=True)
for attempt in range(3):
    try:
        with urlopen(url,timeout=45)as response:data=response.read()
        assert hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()==blob
        font.write_bytes(data)
        break
    except Exception:
        if attempt==2:raise
        time.sleep(2)
subprocess.run(['fc-cache','-f',str(font.parent)],check=True)
match=subprocess.check_output(['fc-match','Noto Serif CJK SC'],text=True).strip()
assert 'CJK' in match,match
Path('verification').mkdir(exist_ok=True)
Path('verification/reading-room-font-environment.json').write_text(json.dumps({'repository':'notofonts/noto-cjk','commit':commit,'blob':blob,'sha256':hashlib.sha256(data).hexdigest(),'match':match,'testHostOnly':True,'distributed':False},indent=2))
