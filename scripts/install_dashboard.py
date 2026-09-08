# -*- coding: utf-8 -*-
"""野村PFダッシュボードを public/holdings.html として設置する。

更新.bat で作り直したあと、これを実行すればブログ側に反映される。
何度実行しても結果は同じ。設置ついでに、生成側が古いままでも直るように後処理を入れている。

  1. 戻るリンクを挿入
  2. 権利確定月を「中間＝上期末／期末＝決算月」で計算し直す（interim.json が要る）
  3. ストレステストのパネルを一番下へ移す

2 と 3 は fill_book.py / build_html.py 側でも直してあるので、パイプラインを回し直した後は
このスクリプトは何もしない（＝二重には効かない）。

  py scripts/install_dashboard.py
  py scripts/install_dashboard.py "C:\\path\\to\\dashboard.html"
"""
import io
import json
import os
import re
import shutil
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEST = os.path.join(ROOT, 'public', 'holdings.html')
BACKUP_DIR = os.path.join(ROOT, '_archive')
PIPELINE = os.path.expanduser(r'~\OneDrive\Desktop\野村PF更新')

DEFAULT_SOURCES = [
    os.path.expanduser(r'~\Downloads\野村PFダッシュボード_公開用.html'),
    os.path.join(PIPELINE, '野村PFダッシュボード_公開用.html'),
]

BACKLINK_ID = 'numasoko-backlink'
_PILL = ('display:inline-block;font-size:12.5px;text-decoration:none;'
         'border:1px solid var(--line);border-radius:999px;padding:5px 14px;background:#fff;')

BLOG_DIR = os.path.join(ROOT, 'src', 'content', 'blog')


def latest_weekly():
    """週次運用記録のうち、公開済みで最新のものを (slug, 日付) で返す。

    ファイル名が weekly- で始まる記事を週次とみなす。draft: true は除く。
    週次を書き足すたび、ダッシュボード側のリンクが自動で最新へ張り替わる。
    """
    best = None
    if not os.path.isdir(BLOG_DIR):
        return None
    for name in os.listdir(BLOG_DIR):
        if not name.startswith('weekly-') or not name.endswith('.md'):
            continue
        try:
            text = io.open(os.path.join(BLOG_DIR, name), encoding='utf-8').read()
        except OSError:
            continue
        head = text.split('---', 2)[1] if text.count('---') >= 2 else ''
        if 'draft: true' in head:
            continue
        m = re.search(r'^pubDate:\s*"?([\d-]+)', head, re.M)
        date = m.group(1) if m else ''
        slug = name[:-3]
        if best is None or date > best[1]:
            best = (slug, date)
    return best


def build_backlink():
    """ダッシュボード上部の戻るリンク。週次記事があれば3つ目のピルを足す。"""
    pills = [
        '<a href="/" style="%scolor:var(--muted)">&larr; 沤底バリュー商会トップへ</a>' % _PILL,
        '<a href="/blog/core-satellite-onkabu-design/" style="%scolor:#185FA5;font-weight:600">'
        '📖 この配置の考え方を読む（コラム）</a>' % _PILL,
    ]
    wk = latest_weekly()
    if wk:
        pills.append(
            '<a href="/blog/%s/" style="%scolor:#0F6E56;font-weight:600">'
            '🗓️ 直近1週間の売買を見る（週次運用記録）</a>'
            % (wk[0], _PILL)
        )
    return (
        '<nav id="%s" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">%s</nav>\n'
        % (BACKLINK_ID, ''.join(pills))
    )

# 生成側の呼称変更が反映されていない古いHTML向けの後処理
RENAMES = [
    ('<title>ポートフォリオ ダッシュボード</title>', '<title>最新ポートフォリオ</title>'),
    ('<h1>ポートフォリオ ダッシュボード</h1>', '<h1>最新ポートフォリオ</h1>'),
]

ANCHOR = '<body><div class="wrap">\n'

STRESS_PANEL = (
    '<div class="panel"><h2>ストレステスト（保有株が一律下落したときの維持率）</h2>\n'
    '  <div class="scroll" style="max-height:none"><table id="stress"></table></div>\n'
    '</div>\n'
)
POS_PANEL_END = '  <div class="scroll"><table id="pos"></table></div>\n</div>\n'

CAL_OLD = """   '<tr><th class="l">月</th><th>年間配当金額</th><th style="width:40%"></th><th>優待銘柄数</th></tr>'+
   ks.map(k=>`<tr><td class="l">${k}</td><td class="num">${c[k].div?yen(c[k].div):'—'}</td>
   <td><div class="barbg"><div class="bar" style="width:${c[k].div/mx*100}%;background:var(--purple)"></div></div></td>
   <td class="num">${c[k].yutai||'—'}</td></tr>`).join('');"""
CAL_NEW = """   '<tr><th class="l">月</th><th>受取配当</th><th>うち中間</th><th style="width:34%"></th><th>優待銘柄数</th></tr>'+
   ks.map(k=>`<tr><td class="l">${k}</td><td class="num">${c[k].div?yen(c[k].div):'—'}</td>
   <td class="num mini">${c[k].mid?yen(c[k].mid):'—'}</td>
   <td><div class="barbg"><div class="bar" style="width:${c[k].div/mx*100}%;background:var(--purple)"></div></div></td>
   <td class="num">${c[k].yutai||'—'}</td></tr>`).join('');"""


def load_interim():
    for p in (os.path.join(PIPELINE, 'interim.json'), os.path.join(ROOT, 'scripts', 'interim.json')):
        if os.path.exists(p):
            return json.load(io.open(p, encoding='utf-8')), p
    return None, None


def mid_month(sm):
    """決算月から上期末（中間配当の基準月）を出す。3月決算→9月、9月決算→3月。"""
    return (sm + 6 - 1) % 12 + 1


def rebuild_calendar(html):
    """年間配当を決算月にまとめている計算を、中間／期末に振り分け直す。"""
    m = re.search(r'const D\s*=\s*(\{.*?\});\s*\n', html, re.S)
    if not m:
        return html, '対象なし（const D が見つからない）'
    D = json.loads(m.group(1))
    cal = D.get('calendar') or {}
    if any((v or {}).get('mid') for v in cal.values()):
        return html, 'スキップ（生成側で振り分け済み）'

    iv_map, iv_path = load_interim()
    if iv_map is None:
        return html, 'スキップ（interim.json が無い。py fetch_interim.py を先に）'

    new = {'%d月' % i: {'div': 0.0, 'mid': 0.0, 'yutai': 0} for i in range(1, 13)}
    for p in D.get('positions', []):
        sh, an, sm = (p.get('shares') or 0), (p.get('div') or 0), p.get('smonth')
        if sh and an and sm:
            iv = (iv_map.get(str(p.get('code'))) or {}).get('interim') or 0
            if iv and 0 < iv < an:
                new['%d月' % mid_month(sm)]['div'] += sh * iv
                new['%d月' % mid_month(sm)]['mid'] += sh * iv
                new['%d月' % sm]['div'] += sh * (an - iv)
            else:
                new['%d月' % sm]['div'] += sh * an
        ym = p.get('yutaiMonth')
        if p.get('yutai') and ym:
            for i in range(1, 13):
                if '%d月' % i in str(ym):
                    new['%d月' % i]['yutai'] += 1

    before = sum((v or {}).get('div', 0) for v in cal.values())
    after = sum(v['div'] for v in new.values())
    if round(before) != round(after):
        return html, '中止（合計が合わない: %d → %d）' % (before, after)

    D['calendar'] = new
    html = html[:m.start(1)] + json.dumps(D, ensure_ascii=False) + html[m.end(1):]
    if CAL_OLD in html:
        html = html.replace(CAL_OLD, CAL_NEW, 1)
    sep = '9月 %s円（うち中間 %s円）' % (format(int(new['9月']['div']), ','), format(int(new['9月']['mid']), ','))
    return html, '振り分け直した（%s／%s）' % (sep, os.path.basename(iv_path))


def move_stress(html):
    if STRESS_PANEL not in html:
        return html, 'スキップ（既に移動済みか形が違う）'
    if POS_PANEL_END not in html:
        return html, 'スキップ（保有銘柄パネルが見つからない）'
    html = html.replace(STRESS_PANEL + '\n', '', 1) if (STRESS_PANEL + '\n') in html else html.replace(STRESS_PANEL, '', 1)
    html = html.replace(POS_PANEL_END, POS_PANEL_END + '\n' + STRESS_PANEL, 1)
    return html, '保有銘柄の下へ移動'


def pick_source(argv):
    if len(argv) > 1:
        return argv[1]
    for p in DEFAULT_SOURCES:
        if os.path.exists(p):
            return p
    return None


def main():
    src = pick_source(sys.argv)
    if not src or not os.path.exists(src):
        print('元ファイルが見つかりません。パスを引数で渡してください。')
        for p in DEFAULT_SOURCES:
            print('  探した場所: %s' % p)
        return 1

    html = io.open(src, encoding='utf-8').read()

    if ANCHOR not in html:
        print('!! <body><div class="wrap"> が無いため戻るリンクは入れません。')
    elif BACKLINK_ID not in html:
        html = html.replace(ANCHOR, ANCHOR + build_backlink(), 1)

    renamed = 0
    for _a, _b in RENAMES:
        if _a in html:
            html = html.replace(_a, _b)
            renamed += 1

    html, cal_msg = rebuild_calendar(html)
    html, mv_msg = move_stress(html)

    # 直前版は public/ の外へ退避する（public/ に置くとそのまま公開されてしまう）
    if os.path.exists(DEST):
        os.makedirs(BACKUP_DIR, exist_ok=True)
        shutil.copy2(DEST, os.path.join(BACKUP_DIR, 'holdings.prev.html'))
    io.open(DEST, 'w', encoding='utf-8', newline='').write(html)

    asof = re.search(r'asof["\']?\s*:\s*["\']([\d/\-]+)', html)
    gen = re.search(r'generated["\']?\s*:\s*["\']([^"\']+)', html)
    print('設置しました: %s (%.1f KB)' % (DEST, len(html.encode('utf-8')) / 1024))
    print('  株価基準日  : %s' % (asof.group(1) if asof else '不明'))
    print('  生成日時    : %s' % (gen.group(1) if gen else '不明'))
    _wk = latest_weekly()
    print('  ナビ        : %s' % (
        ('あり（トップ／コラム／週次 %s）' % _wk[1]) if (BACKLINK_ID in html and _wk)
        else ('あり（トップ／コラム）' if BACKLINK_ID in html else 'なし')))
    print('  呼称        : %s' % ('最新ポートフォリオへ変更 %d箇所' % renamed if renamed else '生成側で対応済み'))
    print('  権利確定月  : %s' % cal_msg)
    print('  ストレステスト: %s' % mv_msg)
    print('このあと npm run build → wrangler pages deploy で本番へ。')
    return 0


if __name__ == '__main__':
    sys.exit(main())
