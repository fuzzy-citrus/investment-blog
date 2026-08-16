# -*- coding: utf-8 -*-
"""完全版レポートを分類してバックアップし、閲覧用インデックスを生成する。"""
import io, sys, re, os, glob, shutil, hashlib, datetime, html
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

REPO = r'C:\Users\fuzzy\Documents\my-investment-blog'
SRC  = os.path.join(REPO, 'public', 'analysis')
DST  = r'C:\Users\fuzzy\Documents\numasoko-reports-backup'
D_ST = os.path.join(DST, '01_銘柄レポート')
D_CO = os.path.join(DST, '02_コラム・モデル')
D_MD = os.path.join(DST, '03_記事原稿')
SITE = 'https://numasoko-value.com'

# ── 記事メタ ──────────────────────────────────────────────
arts = {}
for f in glob.glob(os.path.join(REPO, 'src', 'content', 'blog', '*.md')):
    t = open(f, encoding='utf-8').read()
    fm = t.split('---')[1]
    g = lambda k: (re.search(k, fm, re.M).group(1) if re.search(k, fm, re.M) else None)
    slug = os.path.basename(f)[:-3]
    arts[slug] = dict(slug=slug, body=t, title=g(r'title:\s*"(.*?)"\s*$') or slug,
        pub=(g(r'pubDate:\s*"([^"]+)"') or '')[:10], draft='draft: true' in fm,
        ticker=g(r'ticker:\s*"([^"]+)"'), company=g(r'companyName:\s*"([^"]+)"'),
        rating=g(r'rating:\s*"([^"]+)"'), price=g(r'currentPrice:\s*(\d+)'),
        pbr=g(r'modifiedPBR:\s*"([^"]+)"'))

refs = {}
for a in arts.values():
    for fn in set(re.findall(r'/analysis/([A-Za-z0-9_\-]+\.html)', a['body'])):
        refs.setdefault(fn, []).append(a)

CODE = r'(?:^|[-_])(\d{4}|\d{3}[A-Z])(?=[-_.]|$)'

def identify(fn, path, owners):
    """(ticker, 会社名) を決める。銘柄が特定できなければ (None, None)。"""
    for o in owners:
        if o['ticker']:
            return o['ticker'], o['company']
    m = re.search(CODE, os.path.splitext(fn)[0])
    tk = m.group(1) if m else None
    if not tk:
        for o in owners:
            m2 = re.search(r'[（(](\d{4}|\d{3}[A-Z])[）)]', o['title'])
            if m2:
                tk = m2.group(1); break
    if not tk:
        return None, None
    # 会社名はレポート本体の見出しから拾う
    head = open(path, encoding='utf-8', errors='ignore').read(40000)
    m3 = re.search(r'<h1[^>]*>\s*([^<]{2,40}?)\s*<em>', head)
    co = m3.group(1).strip() if m3 else None
    if not co:
        for s, a in arts.items():
            if a['ticker'] == tk and a['company']:
                co = a['company']; break
    return tk, co

reports = []
for path in sorted(glob.glob(os.path.join(SRC, '*.html'))):
    fn = os.path.basename(path)
    owners = refs.get(fn, [])
    tk, co = identify(fn, path, owners)
    primary = next((o for o in owners if o['ticker']), owners[0] if owners else None)
    reports.append(dict(fn=fn, path=path, size=os.path.getsize(path),
        md5=hashlib.md5(open(path, 'rb').read()).hexdigest(),
        kind='stock' if tk else 'column', ticker=tk, company=co,
        primary=primary, owners=owners))

stocks  = sorted([r for r in reports if r['kind'] == 'stock'], key=lambda r: (r['ticker'], r['fn']))
columns = sorted([r for r in reports if r['kind'] == 'column'],
                 key=lambda r: (r['primary']['pub'] if r['primary'] else ''))

# ── コピー（古い分類フォルダは作り直す） ──────────────────
for old in ('01_銘柄紹介', '02_コラム', '01_銘柄レポート', '02_コラム・モデル', '03_記事原稿'):
    p = os.path.join(DST, old)
    if os.path.isdir(p):
        shutil.rmtree(p)
for d in (DST, D_ST, D_CO, D_MD):
    os.makedirs(d, exist_ok=True)

copied = verified = 0
failed = []
for r in reports:
    dest = os.path.join(D_ST if r['kind'] == 'stock' else D_CO, r['fn'])
    shutil.copy2(r['path'], dest); copied += 1
    if hashlib.md5(open(dest, 'rb').read()).hexdigest() == r['md5']:
        verified += 1
    else:
        failed.append(r['fn'])

# ── 記事原稿とサイト設定もミラーする ──────────────────────
md_files = sorted(glob.glob(os.path.join(REPO, 'src', 'content', 'blog', '*.md')))
md_pub = md_draft = 0
for f in md_files:
    shutil.copy2(f, os.path.join(D_MD, os.path.basename(f)))
    if 'draft: true' in open(f, encoding='utf-8').read().split('---')[1]:
        md_draft += 1
    else:
        md_pub += 1
DATA = os.path.join(D_MD, '_サイト設定')
os.makedirs(DATA, exist_ok=True)
side = 0
for rel in ('src/data/contentMap.ts', 'src/data/columnAuthors.ts',
            'src/components/BookSidebar.astro', 'src/pages/value.astro',
            'src/pages/margin.astro', 'src/pages/index.astro'):
    src_p = os.path.join(REPO, *rel.split('/'))
    if os.path.exists(src_p):
        shutil.copy2(src_p, os.path.join(DATA, os.path.basename(src_p)))
        side += 1
md_mb = sum(os.path.getsize(f) for f in md_files) / 1048576

today = datetime.datetime.now().strftime('%Y年%m月%d日 %H:%M')
esc = html.escape
total_mb = sum(r['size'] for r in reports) / 1048576
multi = len({r['ticker'] for r in stocks})

def owner_cell(r):
    if not r['owners']:
        return '<span class="warn">参照記事なし</span>'
    out = []
    for o in sorted(r['owners'], key=lambda x: x['pub']):
        d = ' <span class="draft">下書き</span>' if o['draft'] else ''
        out.append(f'<a href="{SITE}/blog/{o["slug"]}/" target="_blank">{esc(o["title"][:56])}…</a>{d}')
    return '<br>'.join(out)

def rows(lst, folder, is_stock):
    out = []
    for r in lst:
        p = r['primary'] or {}
        rt = p.get('rating')
        badge = f'<span class="rt">{esc(rt)}</span>' if rt else ''
        if is_stock:
            c1 = esc(r['ticker'] or '—')
            name = r['company'] or (p.get('title', '')[:24] if p else '—')
            px = f"{p['price']}円" if p.get('price') else ''
            pbr = p.get('pbr') or ''
            sub = esc(px) + (' / PBR ' + esc(pbr) if pbr else '')
        else:
            c1 = esc((p.get('pub') or '')[:10] or '—')
            name = (p.get('title', '') or r['fn'])[:30]
            sub = ''
        out.append(f"""      <tr>
        <td class="tk">{c1}</td>
        <td class="co"><b>{esc(name)}</b> {badge}{'<br><span class="sub">' + sub + '</span>' if sub else ''}</td>
        <td class="fl"><a href="{folder}/{r['fn']}">{r['fn']}</a><br><span class="sub">{r['size']/1024:.0f} KB</span></td>
        <td class="ar">{owner_cell(r)}</td>
      </tr>""")
    return '\n'.join(out)

INDEX = f"""<!doctype html>
<html lang="ja"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>沼底バリュー商会｜完全版レポート バックアップ索引</title>
<style>
 :root{{--ink:#1f2430;--ink2:#4a5160;--ink3:#8189a0;--bd:#e3e6ee;--bg:#f7f8fb}}
 *{{box-sizing:border-box}}
 body{{margin:0;padding:28px 20px 60px;background:var(--bg);color:var(--ink);
   font:14px/1.7 -apple-system,"Segoe UI","Hiragino Kaku Gothic ProN","Yu Gothic UI",sans-serif}}
 .wrap{{max-width:1180px;margin:0 auto}}
 h1{{font-size:1.5rem;margin:0 0 6px}}
 .meta{{color:var(--ink3);font-size:.84rem;margin-bottom:18px}}
 .kpi{{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin:18px 0 26px}}
 .k{{background:#fff;border:1px solid var(--bd);border-top:4px solid #185FA5;border-radius:9px;padding:14px;text-align:center}}
 .k:nth-child(2){{border-top-color:#0F6E56}} .k:nth-child(3){{border-top-color:#993C1D}}
 .k:nth-child(4){{border-top-color:#534AB7}} .k:nth-child(5){{border-top-color:#854F0B}}
 .kl{{font-size:.72rem;color:var(--ink3);font-weight:600}}
 .kv{{font-size:1.7rem;font-weight:800;letter-spacing:-.02em}}
 .kv span{{font-size:.85rem;margin-left:2px}}
 h2{{font-size:1.1rem;margin:34px 0 10px;padding-left:11px;border-left:5px solid #E8B84B}}
 .tw{{overflow-x:auto;background:#fff;border:1px solid var(--bd);border-radius:9px}}
 table{{border-collapse:collapse;width:100%;min-width:820px}}
 th,td{{padding:9px 11px;border-bottom:1px solid var(--bd);vertical-align:top;text-align:left}}
 th{{background:#eef1f7;font-size:.76rem;color:var(--ink2);position:sticky;top:0}}
 tr:last-child td{{border-bottom:none}}
 .tk{{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-weight:700;white-space:nowrap}}
 .co{{min-width:190px}} .fl{{min-width:215px}} .ar{{font-size:.82rem}}
 .sub{{font-size:.74rem;color:var(--ink3)}}
 .rt{{display:inline-block;background:#042C53;color:#fff;font-size:.68rem;font-weight:800;
   padding:1px 7px;border-radius:4px;margin-left:4px;vertical-align:1px}}
 .draft{{background:#FAEEDA;color:#854F0B;font-size:.68rem;font-weight:700;padding:1px 6px;border-radius:4px}}
 .warn{{color:#b3261e;font-weight:700}}
 a{{color:#185FA5}} a:hover{{opacity:.7}}
 .note{{background:#fff;border:1px solid var(--bd);border-left:5px solid #0F6E56;
   border-radius:9px;padding:14px 16px;margin-top:28px;font-size:.86rem;line-height:1.9}}
 code{{background:#eef1f7;padding:1px 6px;border-radius:4px;font-size:.82rem}}
 @media(max-width:720px){{.kpi{{grid-template-columns:repeat(2,1fr)}}}}
</style></head><body><div class="wrap">
 <h1>完全版レポート バックアップ索引</h1>
 <div class="meta">沼底バリュー商会（numasoko-value.com）／作成 {today}<br>
  コピー元：<code>my-investment-blog\\public\\analysis</code>（全{len(reports)}件・MD5照合済み）</div>

 <div class="kpi">
  <div class="k"><div class="kl">レポート総数</div><div class="kv">{len(reports)}<span>件</span></div></div>
  <div class="k"><div class="kl">銘柄レポート</div><div class="kv">{len(stocks)}<span>件</span></div></div>
  <div class="k"><div class="kl">対象銘柄数</div><div class="kv">{multi}<span>社</span></div></div>
  <div class="k"><div class="kl">記事原稿</div><div class="kv">{len(md_files)}<span>本</span></div></div>
  <div class="k"><div class="kl">合計サイズ</div><div class="kv">{total_mb + md_mb:.1f}<span>MB</span></div></div>
 </div>

 <h2>01_銘柄レポート（{len(stocks)}件／{multi}社）</h2>
 <div class="tw"><table>
  <thead><tr><th>コード</th><th>銘柄／評価</th><th>ファイル</th><th>掲載記事</th></tr></thead>
  <tbody>
{rows(stocks, '01_銘柄レポート', True)}
  </tbody></table></div>

 <h2>02_コラム・モデル（{len(columns)}件）</h2>
 <div class="tw"><table>
  <thead><tr><th>公開日</th><th>テーマ</th><th>ファイル</th><th>掲載記事</th></tr></thead>
  <tbody>
{rows(columns, '02_コラム・モデル', False)}
  </tbody></table></div>

 <h2>03_記事原稿（{len(md_files)}本）</h2>
 <div class="note" style="margin-top:10px;border-left-color:#534AB7">
  <code>src/content/blog/*.md</code> をそのままミラーしています。公開 <b>{md_pub}本</b>／下書き <b>{md_draft}本</b>（{md_mb:.1f} MB）。<br>
  <code>03_記事原稿/_サイト設定/</code> には、記事の登録先である
  <code>contentMap.ts</code>・<code>columnAuthors.ts</code>・<code>BookSidebar.astro</code> と、
  特設ページ <code>value.astro</code>・<code>margin.astro</code>・<code>index.astro</code> の計{side}本を入れてあります。
  記事だけ戻しても一覧やテーマ分類が復元できないため、セットで保管しています。
 </div>

 <div class="note">
  <b>復元のしかた</b><br>
  2つのフォルダの中身をまとめて <code>my-investment-blog\\public\\analysis\\</code> に戻せば元どおりです。
  フォルダ分けはバックアップ側の整理用で、サイト上はすべて <code>/analysis/</code> 直下に置かれます。<br><br>
  <b>分類の基準</b><br>
  ファイル名・記事の銘柄カード・記事タイトルのいずれかから証券コードを特定できたものを「銘柄レポート」としています。
  同じ銘柄で続報を出した場合は、コード順に並ぶので originals と並んで表示されます。<br><br>
  <b>更新のしかた</b><br>
  新しい完全版を追加したらバックアップ用スクリプトを再実行してください。フォルダごと作り直され、この索引も更新されます。
 </div>
</div></body></html>
"""
open(os.path.join(DST, 'index.html'), 'w', encoding='utf-8').write(INDEX)

def md_rows(lst, folder, is_stock):
    out = []
    for r in lst:
        p = r['primary'] or {}
        if is_stock:
            out.append(f"| {r['ticker']} | {r['company'] or '—'} | {p.get('rating') or '—'} | `{folder}/{r['fn']}` | {r['size']/1024:.0f} KB |")
        else:
            out.append(f"| {(p.get('pub') or '—')} | {(p.get('title','') or r['fn'])[:34]} | `{folder}/{r['fn']}` | {r['size']/1024:.0f} KB |")
    return '\n'.join(out)

README = f"""# 沼底バリュー商会｜完全版レポート バックアップ

- 作成日時：{today}
- コピー元：`C:\\Users\\fuzzy\\Documents\\my-investment-blog\\public\\analysis`
- 総数：**{len(reports)}件**（銘柄レポート {len(stocks)}件／{multi}社、コラム・モデル {len(columns)}件）・合計 **{total_mb:.1f} MB**
- 照合：レポートは全ファイルMD5一致を確認済み（{verified}/{copied}）
- 記事原稿：**{len(md_files)}本**（公開 {md_pub}／下書き {md_draft}・{md_mb:.1f} MB）＋サイト設定 {side}本

`index.html` をブラウザで開くと、証券コード・銘柄名・評価ランク・掲載記事つきの一覧から各レポートを直接開けます。

## フォルダ構成

```
numasoko-reports-backup/
├── index.html          ← 閲覧用の索引（これを開くのが早い）
├── README.md           ← このファイル
├── 01_銘柄レポート/    ← {len(stocks)}件（{multi}社）
├── 02_コラム・モデル/  ← {len(columns)}件
└── 03_記事原稿/        ← {len(md_files)}本（+ _サイト設定/ {side}本）
```

## 更新のしかた

記事を1本作る（または公開する）たびに、リポジトリ直下で次を実行します。

```
py scripts/backup.py
```

フォルダを作り直して索引も再生成するので、何度実行しても同じ結果になります。

## 復元

2つのフォルダの中身をまとめて `my-investment-blog/public/analysis/` に戻すだけです。
フォルダ分けはバックアップ側の整理用で、サイト上はすべて `/analysis/` 直下に配置されます。

## 分類の基準

ファイル名・記事の銘柄カード・記事タイトルのいずれかから証券コードを特定できたものを「銘柄レポート」としています。
続報レポート（例：菱友システムズ Ver.2、神栄 v3）は銘柄カードを持たない記事に紐づいていますが、
証券コードで判定して銘柄レポート側に分類し、コード順で originals の隣に並ぶようにしています。

## 01_銘柄レポート（{len(stocks)}件／{multi}社）

| コード | 銘柄 | 評価 | ファイル | サイズ |
|---|---|---|---|---|
{md_rows(stocks, '01_銘柄レポート', True)}

## 02_コラム・モデル（{len(columns)}件）

| 公開日 | テーマ | ファイル | サイズ |
|---|---|---|---|
{md_rows(columns, '02_コラム・モデル', False)}
"""
open(os.path.join(DST, 'README.md'), 'w', encoding='utf-8').write(README)

print(f'コピー {copied}件 / MD5一致 {verified}件' + (f'  !!NG {failed}' if failed else ''))
print(f'  01_銘柄レポート : {len(stocks)}件（{multi}社）')
print(f'  02_コラム・モデル: {len(columns)}件')
print(f'  03_記事原稿      : {len(md_files)}本（公開{md_pub}/下書き{md_draft}）＋設定{side}本')
for r in columns:
    print(f'      - {r["fn"]}')
print(f'  合計 {total_mb:.1f} MB → {DST}')
