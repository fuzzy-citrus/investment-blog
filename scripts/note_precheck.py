# -*- coding: utf-8 -*-
"""note原稿の公開前チェック。

`04_note原稿/00_note運用マニュアル.md` の「5. 実際に踏んだ罠」と
「3. 原稿の書き方ルール」を機械で検査する。1本出すたびの手作業を無くすのが目的。

    py scripts/note_precheck.py 原稿.md [原稿2.md ...]
    py scripts/note_precheck.py --dir "C:\\...\\04_note原稿\\たとえ話シリーズ_20260922"
    py scripts/note_precheck.py 原稿.md --urls      # URLの生存確認もする（遅い）

エラーがあれば終了コード1。警告だけなら0。
"""
import io
import os
import re
import sys
import glob

sys.stdout.reconfigure(encoding='utf-8')

ERR, WARN, INFO = 'ERROR', 'WARN', 'INFO'

# 禁止表現。有料記事の価値を売買判断に置かない（運用マニュアル §7／市場学習プレイブック §2）
NG_PHRASES = [
    ('必ず儲かる', '保証表現'),
    ('絶対に儲かる', '保証表現'),
    ('必ず上がる', '保証表現'),
    ('損しない', '保証表現'),
    ('元本保証', '保証表現'),
    ('確実に儲か', '保証表現'),
    ('ノーリスク', '保証表現'),
    ('今すぐ買', '売買の指示'),
    ('買うべきです', '売買の指示'),
    ('売るべきです', '売買の指示'),
    ('推奨銘柄', '売買の指示'),
    ('おすすめ銘柄', '売買の指示'),
]
# 有料側に置いてはいけない成果物（無料側に置く約束のもの）
PAID_ONLY_NG = ['目標株価', '期待株価', '評価ランク']

FOREIGN = re.compile(r'[\u0400-\u04FF\uAC00-\uD7AF\u0370-\u03FF\u0E00-\u0E7F]+')
BRACKET_URL = re.compile(r'<https?://')
MD_IMG = re.compile(r'!\[[^\]]*\]\(([^)]+)\)')
URL = re.compile(r'https?://[^\s)）」』、。，,\]]+')
MD_LINK = re.compile(r'!?\[[^\]]*\]\([^)]*\)')
# 素のURL（マークダウンリンクの外）の末尾に句読点や閉じ括弧が食い込んでいるもの
BARE_TRAIL = re.compile(r'https?://[^\s<>\[\]()（）「」『』、。，]*[)）」』、。，]')


def check(path):
    text = io.open(path, encoding='utf-8').read()
    lines = text.split('\n')
    found = []

    def add(level, line, msg, ctx=''):
        found.append((level, line, msg, ctx))

    # --- 罠12：異言語混入（「別」が「별」になった事故） ---
    for i, l in enumerate(lines, 1):
        for m in FOREIGN.findall(l):
            add(ERR, i, '異言語の文字が混入', m)

    # --- 太字の閉じ忘れ ---
    for i, l in enumerate(lines, 1):
        if l.count('**') % 2:
            add(ERR, i, '太字（**）が奇数個', l.strip()[:60])

    # --- 罠7：山括弧つきURL ---
    for i, l in enumerate(lines, 1):
        if BRACKET_URL.search(l):
            add(ERR, i, '山括弧つきURL。素のURLか [文字](URL) にする', l.strip()[:60])

    # --- 素のURLに句読点・閉じ括弧が食い込んでいる（[文字](URL) の ) は正しいので除く） ---
    for i, l in enumerate(lines, 1):
        bare = MD_LINK.sub('', l)
        for m in BARE_TRAIL.findall(bare):
            add(ERR, i, '素のURLの末尾に句読点か閉じ括弧が入っている', m[:70])

    # --- note非対応：マークダウンの表 ---
    in_code = False
    for i, l in enumerate(lines, 1):
        if l.lstrip().startswith('```'):
            in_code = not in_code
            continue
        if in_code:
            continue
        if re.match(r'^\s*\|.*\|\s*$', l):
            add(ERR, i, 'noteは表を解釈しない。見出し＋箇条書きにする', l.strip()[:60])
            break  # 1本につき1回だけ出す

    # --- note非対応：チェックボックス ---
    for i, l in enumerate(lines, 1):
        if re.match(r'^\s*[-*]\s+\[[ xX]\]', l):
            add(ERR, i, 'チェックボックスは [ ] がそのまま出る。「- □ 」にする', l.strip()[:60])

    # --- 引用（>）をリンク紹介や注記に使っていないか（罠8／出典欄が空で並ぶ） ---
    for i, l in enumerate(lines, 1):
        s = l.lstrip()
        if s.startswith('>') and ('http' in s or '📎' in s):
            add(ERR, i, '引用の中にリンク。空の出典欄が並ぶ。ふつうの段落にする', s[:60])

    # --- 罠6：画像はnoteのCDNでなく自ドメインを書く ---
    for i, l in enumerate(lines, 1):
        for u in MD_IMG.findall(l):
            if 'st-note.com' in u or 'assets.st-note' in u:
                add(ERR, i, '画像がnoteのCDN URL。自ドメインに置いて貼り直す', u[:70])
            elif not u.startswith('http'):
                add(WARN, i, '画像が相対パス。noteには絶対URLが要る', u[:70])
            elif 'numasoko-value.com' not in u:
                add(WARN, i, '画像が自ドメイン以外', u[:70])

    # --- soft line break（段落内の改行がそのまま<br>になる） ---
    runs = []
    cur = 0
    for l in lines:
        s = l.strip()
        plain = s and not s.startswith(('#', '-', '*', '>', '|', '```', '1.', '2.', '3.'))
        if plain:
            cur += 1
        else:
            if cur > 1:
                runs.append(cur)
            cur = 0
    if cur > 1:
        runs.append(cur)
    breaks = sum(r - 1 for r in runs)
    if breaks >= 20:
        add(WARN, 0, '段落内の改行が%d個。noteでは全部<br>になる' % breaks,
            '1段落が最大%d行' % (max(runs) if runs else 0))
    elif breaks:
        add(INFO, 0, '段落内の改行が%d個' % breaks, '')

    # --- 行末の半角スペース2つ（意図しない改行） ---
    for i, l in enumerate(lines, 1):
        if l.rstrip('\n').endswith('  ') and l.strip():
            add(WARN, i, '行末に半角スペース2つ（強制改行になる）', l.strip()[:50])

    # --- 見出しの重複（罠3：見出しが二重になる事故の検出） ---
    heads = {}
    for i, l in enumerate(lines, 1):
        m = re.match(r'^(#{1,3})\s+(.+?)\s*$', l)
        if m:
            key = m.group(2)
            if key in heads:
                add(ERR, i, '同じ見出しが2回ある（貼り付け事故の典型）',
                    '%s（L%dにも）' % (key[:40], heads[key]))
            else:
                heads[key] = i

    # --- 保証表現・売買の指示 ---
    for i, l in enumerate(lines, 1):
        for ng, why in NG_PHRASES:
            if ng in l:
                add(ERR, i, '%s：「%s」' % (why, ng), l.strip()[:60])
        for ng in PAID_ONLY_NG:
            if ng in l:
                add(WARN, i, '「%s」はブログ（無料）側に置く約束のもの' % ng, l.strip()[:60])

    # --- 見出しレベルの注意 ---
    deep = sum(1 for l in lines if re.match(r'^#{3,}\s', l))
    if deep:
        add(INFO, 0, '### 以下が%d個。noteでは太字の段落になる（見出しにならない）' % deep, '')

    # --- コードブロック ---
    fences = sum(1 for l in lines if l.lstrip().startswith('```'))
    if fences:
        if fences % 2:
            add(ERR, 0, 'コードブロックの ``` が奇数個', '')
        else:
            add(INFO, 0, 'コードブロック%d個。noteでは引用ブロックになる' % (fences // 2), '')

    urls = sorted(set(URL.findall(text)))
    return found, urls


def check_urls(urls):
    import urllib.request
    import urllib.error
    out = []
    for u in urls:
        try:
            req = urllib.request.Request(u, method='HEAD',
                                         headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=20) as r:
                code = r.status
        except urllib.error.HTTPError as e:
            code = e.code
        except Exception as e:
            code = str(e)[:40]
        out.append((u, code))
    return out


def main(argv):
    do_urls = '--urls' in argv
    argv = [a for a in argv if a != '--urls']
    paths = []
    if '--dir' in argv:
        i = argv.index('--dir')
        d = argv[i + 1]
        paths = sorted(p for p in glob.glob(os.path.join(d, '*.md'))
                       if not p.endswith('_body.md'))
    else:
        for a in argv:
            paths.extend(sorted(glob.glob(a)))
    if not paths:
        print('使い方: py scripts/note_precheck.py 原稿.md [--dir フォルダ] [--urls]')
        return 2

    n_err = n_warn = 0
    all_urls = set()
    for p in paths:
        found, urls = check(p)
        all_urls.update(urls)
        errs = [f for f in found if f[0] == ERR]
        warns = [f for f in found if f[0] == WARN]
        n_err += len(errs)
        n_warn += len(warns)
        mark = 'NG' if errs else ('--' if warns else 'OK')
        print('\n[%s] %s  (エラー%d / 警告%d)' % (mark, os.path.basename(p), len(errs), len(warns)))
        for level, line, msg, ctx in found:
            where = ('L%d' % line) if line else '  '
            print('   %-7s %-4s %s' % (level, where, msg))
            if ctx:
                print('              %s' % ctx)

    print('\n' + '=' * 62)
    print('%d本を検査 / エラー %d件 / 警告 %d件' % (len(paths), n_err, n_warn))

    if do_urls and all_urls:
        print('\n■ URLの生存確認（%d件）' % len(all_urls))
        bad = 0
        for u, code in check_urls(sorted(all_urls)):
            ok = (code == 200)
            if not ok:
                bad += 1
            print('   %-4s %s' % (code, u[:90]))
        if bad:
            print('   → %d件が200以外' % bad)
            n_err += bad

    if n_err:
        print('\nエラーを直してから貼り付けること。')
    else:
        print('\n■ 機械で見られない分（貼り付け時に手で確認）')
        print('   - タイトルはクリップボード経由で入れる（typeだと数字が落ちる）')
        print('   - 貼り付け後、画像のsrcが assets.st-note.com になってから保存する')
        print('   - 公開後、ログアウト状態で有料部分が漏れていないか')
    return 1 if n_err else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
