# -*- coding: utf-8 -*-
"""公開済み記事の索引を作る。ChatGPT（企画・SEO担当）の情報源に入れるもの。

なぜ本文ではなく索引か：
  ChatGPTの仕事は「既出テーマの重複回避」と「内部リンク設計」。
  それには全体の地図が要る。個別の中身はブログを直接読ませればよい。

なぜ評価ランクと目標株価を落とすか：
  ブログでは公開しているが、これが販促コピーに紛れ込むと
  金融商品取引法上の投資助言に読まれる。手元に置かないのが確実。

使い方：記事を公開したら py scripts/make_index.py → 出力をChatGPTの情報源に再アップロード
"""
import io, os, re, sys, datetime
sys.stdout.reconfigure(encoding='utf-8')

D = 'src/content/blog'
rows = []
for fn in sorted(os.listdir(D)):
    if not fn.endswith('.md'):
        continue
    t = io.open(os.path.join(D, fn), encoding='utf-8').read()
    m = re.match(r'---\n(.*?)\n---', t, re.S)
    if not m:
        continue
    fm = m.group(1)
    def g(k):
        mm = re.search(r'^\s*%s:\s*"?(.*?)"?\s*$' % k, fm, re.M)
        return mm.group(1) if mm else ''
    if g('draft').lower() == 'true':
        continue
    stock = ('%s %s' % (g('ticker'), g('companyName'))).strip()
    rows.append((g('pubDate')[:10], fn[:-3], g('title').replace('|', '｜'), stock))

rows.sort(reverse=True)
n_stock = sum(1 for r in rows if r[3])
out = [
    '# 沼底バリュー商会｜公開済みブログ記事の索引',
    '',
    '> **用途**：企画とSEOで、既出テーマの重複を避け、内部リンクを設計するため。',
    '> **すべて公開情報**。本文は含まない。URLは `https://numasoko-value.com/blog/<スラッグ>/`',
    '> 個別の記事の中身が要るときは、そのURLを直接読みに行ってよい。',
    '> 生成日：%s／**公開%d本**（うち銘柄記事%d本）' % (datetime.date.today().isoformat(), len(rows), n_stock),
    '',
    '> ⚠️ **この索引から意図的に外してあるもの：評価ランク（A++〜B）と目標株価。**',
    '> ブログ本文には載っているが、**販促物には絶対に書かない。**',
    '> 金融商品取引法上の投資助言・代理業に読まれるため。',
    '> ブログを直接読んで見つけた場合も、販促コピーには持ち込まないこと。',
    '',
    '| 公開日 | スラッグ | タイトル | 扱った銘柄 |',
    '|---|---|---|---|',
]
for d, s, t, st in rows:
    out.append('| %s | `%s` | %s | %s |' % (d, s, t, st))

p = os.path.join(os.environ['USERPROFILE'], 'Documents', 'numasoko-reports-backup',
                 '05_AI共同運営', '05_公開済み記事の索引.md')
io.open(p, 'w', encoding='utf-8', newline='').write('\n'.join(out) + '\n')
print('保存:', p)
print('%d本（うち銘柄記事%d本）。ChatGPTの情報源に再アップロードすること' % (len(rows), n_stock))
