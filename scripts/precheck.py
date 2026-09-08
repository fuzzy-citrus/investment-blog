# -*- coding: utf-8 -*-
"""記事の公開前チェック。npm run build の前にこれを通す。

  py scripts/precheck.py                  … 全記事
  py scripts/precheck.py daishin-chemical-4629 nankai-chemical-4040
  py scripts/precheck.py --drafts         … 下書きだけ
  py scripts/precheck.py --changed        … git で変更のあった記事だけ

過去に実際やらかしたものを、そのまま検査項目にしてある。

  1. span / strong のタグ交差・未閉鎖（<span> を </strong> で閉じる事故が頻発した）
  2. 日本語・英数字以外の文字の混入（ヘブライ文字 סּ、キリル文字 это の実績あり）
  3. ** の個数が奇数の行（CJK 太字がビルド後に素通しで残る）
  4. Markdown 表の列数不一致
  5. related のスラッグ切れ・自己参照・重複
  6. シリーズ記事なのに src/data/series.ts に未登録
  7. frontmatter の必須キー欠落
  8. 本文の「YYYY年M月D日終値」と pubDate の乖離（古い株価のまま公開する事故）
  9. stockCard の currentPrice と本文の終値の食い違い

エラーがあれば終了コード 1 を返す。警告だけなら 0。
"""
import datetime
import io
import os
import re
import subprocess
import sys

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG = os.path.join(ROOT, 'src', 'content', 'blog')
SERIES_TS = os.path.join(ROOT, 'src', 'data', 'series.ts')

# 日本語圏の文字と、記事で普通に使う記号以外が出たら疑う
# 投資記事で普通に使うギリシャ文字（アルファ・ベータ等）は通す
GREEK_OK = set('αβγδΔεθλμπρσΣτφχωΩ')
FOREIGN = re.compile(
    r'[Ͱ-Ͽ'      # ギリシャ文字（GREEK_OK は後段で除外）
    r'Ѐ-ӿ'       # キリル文字
    r'԰-֏'       # アルメニア文字
    r'֐-׿'       # ヘブライ文字
    r'؀-ۿ'       # アラビア文字
    r'฀-๿'       # タイ文字
    r'가-힯]'      # ハングル
)
# シリーズとして扱うファイル名の接頭辞
SERIES_PREFIX = ('weekly-', 'dividend-series-', 'holdings-status-',
                 'activist-front-running-', 'reverse-value-', 'cheap-stock-census-')

ERR, WARN = 'ERROR', 'WARN'


def split_fm(text):
    parts = text.split('---', 2)
    return (parts[1], parts[2]) if len(parts) >= 3 else ('', text)


def check_tags(lines, add):
    """span / strong の交差・未閉鎖を行単位で見る"""
    for i, line in enumerate(lines, 1):
        stack = []
        crossed = False
        for m in re.finditer(r'<(/?)(span|strong)\b[^>]*>', line):
            closing, tag = m.group(1), m.group(2)
            if not closing:
                stack.append(tag)
                continue
            if not stack:
                add(ERR, i, '閉じタグが多い </%s>' % tag, line)
                crossed = True
                break
            if stack[-1] != tag:
                add(ERR, i, 'タグ交差 <%s> を </%s> で閉じている' % (stack[-1], tag), line)
                crossed = True
                break
            stack.pop()
        if not crossed and stack:
            add(ERR, i, '閉じられていないタグ %s' % ','.join(stack), line)


def check_foreign(lines, add):
    for i, line in enumerate(lines, 1):
        for m in FOREIGN.finditer(line):
            ch = m.group()
            if ch in GREEK_OK:
                continue
            add(ERR, i, '日本語以外の文字 %r (U+%04X)' % (ch, ord(ch)), line)


def check_bold(lines, add):
    for i, line in enumerate(lines, 1):
        if line.lstrip().startswith('|'):
            continue
        if line.count('**') % 2 == 1:
            add(ERR, i, '** の個数が奇数（太字が閉じていない）', line)


def check_tables(lines, add):
    """区切り行の列数を基準に、表の本体の列数を照合する"""
    i = 0
    while i < len(lines):
        if re.match(r'^\s*\|[\s:|-]+\|\s*$', lines[i]) and i > 0 and lines[i - 1].lstrip().startswith('|'):
            cols = len(lines[i].strip().strip('|').split('|'))
            head = len(lines[i - 1].strip().strip('|').split('|'))
            if head != cols:
                add(ERR, i, '表の見出しが%d列、区切りが%d列' % (head, cols), lines[i - 1])
            j = i + 1
            while j < len(lines) and lines[j].lstrip().startswith('|'):
                n = len(lines[j].strip().strip('|').split('|'))
                if n != cols:
                    add(WARN, j + 1, '表の列数が%d（見出しは%d）' % (n, cols), lines[j])
                j += 1
            i = j
        else:
            i += 1


def check_related(slug, fm, all_slugs, add):
    m = re.search(r'^related:\s*\[(.*?)\]', fm, re.M)
    if not m:
        add(WARN, 0, 'related が無い', '')
        return
    rel = [x.strip().strip('"\'') for x in m.group(1).split(',') if x.strip()]
    for r in rel:
        if r == slug:
            add(ERR, 0, 'related が自分自身を指している', r)
        elif r not in all_slugs:
            add(ERR, 0, 'related のスラッグが存在しない', r)
    dup = {r for r in rel if rel.count(r) > 1}
    for d in dup:
        add(WARN, 0, 'related が重複', d)
    if len(rel) > 6:
        add(WARN, 0, 'related が%d本（表示は6本まで）' % len(rel), '')


def check_series(slug, registered, add):
    if slug.startswith(SERIES_PREFIX) and slug not in registered:
        add(ERR, 0, 'シリーズ記事だが src/data/series.ts に未登録', slug)


def check_frontmatter(fm, add):
    for key in ('title', 'description', 'pubDate'):
        if not re.search(r'^%s:' % key, fm, re.M):
            add(ERR, 0, 'frontmatter に %s が無い' % key, '')
    if re.search(r'^cardDesc:', fm, re.M) is None:
        add(WARN, 0, 'cardDesc が無い（カードの説明が出ない）', '')


def check_price_date(fm, body, add):
    """本文の「YYYY年M月D日終値」を拾い、pubDate との乖離と currentPrice との整合を見る"""
    pub = re.search(r'^pubDate:\s*"?(\d{4})-(\d{2})-(\d{2})', fm, re.M)
    hits = re.findall(r'(\d{4})年(\d{1,2})月(\d{1,2})日終値\s*([\d,]+)?', body)
    if not hits:
        return
    dates = {'%04d-%02d-%02d' % (int(y), int(mo), int(d)) for y, mo, d, _ in hits}
    if len(dates) > 1:
        add(WARN, 0, '本文に複数の終値基準日がある', ' / '.join(sorted(dates)))
    if pub:
        pubs = '%s-%s-%s' % pub.groups()
        newest = max(dates)
        gap = (datetime.date(*map(int, pubs.split('-')))
               - datetime.date(*map(int, newest.split('-')))).days
        if newest > pubs:
            add(ERR, 0, '終値の基準日が公開日より未来', '%s > %s' % (newest, pubs))
        elif gap >= 4:
            add(WARN, 0, '終値の基準日が公開日から%d日前' % gap, '%s -> %s' % (newest, pubs))
    cp = re.search(r'^\s*currentPrice:\s*([\d.]+)', fm, re.M)
    if cp:
        want = cp.group(1)
        prices = {p.replace(',', '') for _, _, _, p in hits if p}
        if prices and want not in prices:
            add(ERR, 0, 'stockCard.currentPrice と本文の終値が食い違う',
                'card=%s / 本文=%s' % (want, ','.join(sorted(prices))))


def load_registered_series():
    if not os.path.exists(SERIES_TS):
        return set()
    return set(re.findall(r"'([a-z0-9-]{6,})'", io.open(SERIES_TS, encoding='utf-8').read()))


def changed_slugs():
    try:
        out = subprocess.check_output(['git', 'status', '--porcelain'], cwd=ROOT).decode('utf-8', 'ignore')
    except Exception:
        return None
    got = []
    for line in out.splitlines():
        p = line[3:].strip().strip('"')
        if p.startswith('src/content/blog/') and p.endswith('.md'):
            got.append(os.path.basename(p)[:-3])
    return got


def main(argv):
    all_slugs = {f[:-3] for f in os.listdir(BLOG) if f.endswith('.md')}
    registered = load_registered_series()

    args = [a for a in argv if not a.startswith('--')]
    flags = {a for a in argv if a.startswith('--')}

    if '--changed' in flags:
        targets = changed_slugs()
        if targets is None:
            print('git が使えないため全記事を見ます')
            targets = sorted(all_slugs)
        elif not targets:
            print('変更のある記事はありません。')
            return 0
    elif args:
        targets = args
    else:
        targets = sorted(all_slugs)

    n_err = n_warn = 0
    checked = 0
    for slug in targets:
        path = os.path.join(BLOG, slug + '.md')
        if not os.path.exists(path):
            print('!! %s が見つかりません' % slug)
            n_err += 1
            continue
        text = io.open(path, encoding='utf-8').read()
        fm, body = split_fm(text)
        if '--drafts' in flags and 'draft: true' not in fm:
            continue
        checked += 1
        found = []

        def add(level, line, msg, ctx):
            found.append((level, line, msg, str(ctx)[:90].replace('\n', ' ')))

        lines = text.split('\n')
        check_tags(lines, add)
        check_foreign(lines, add)
        check_bold(lines, add)
        check_tables(lines, add)
        check_related(slug, fm, all_slugs, add)
        check_series(slug, registered, add)
        check_frontmatter(fm, add)
        check_price_date(fm, body, add)

        errs = [f for f in found if f[0] == ERR]
        warns = [f for f in found if f[0] == WARN]
        n_err += len(errs)
        n_warn += len(warns)
        if found:
            mark = 'NG' if errs else '--'
            print('\n[%s] %s  (エラー%d / 警告%d)' % (mark, slug, len(errs), len(warns)))
            for level, line, msg, ctx in found:
                where = ('L%d' % line) if line else '  -'
                print('   %-5s %-5s %s' % (level, where, msg))
                if ctx:
                    print('              %s' % ctx)

    print('\n' + '=' * 62)
    print('%d本を検査 / エラー %d件 / 警告 %d件' % (checked, n_err, n_warn))
    if n_err:
        print('エラーがあります。直してから npm run build してください。')
        return 1
    print('エラーなし。ビルドに進んで問題ありません。')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
