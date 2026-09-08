# -*- coding: utf-8 -*-
"""株探から「確定した終値」を取る。場中値を終値と取り違えないためのスクリプト。

  py scripts/price.py 8841
  py scripts/price.py 4629 4040 5408
  py scripts/price.py 8841 --days 10

なぜ要るか
----------
株探の銘柄ページは場中も「株価」を出し続ける。時系列ページも、その日の
ザラ場中は当日の行が未確定のまま並ぶ。過去に、前場引け値を終値として
記事に書いてしまう事故を起こしている。

そこで本スクリプトは、銘柄ページの <time ...>終値</time> が指す日付を
「確定した終値の日付」の正とし、時系列ページの同じ日付の行から値を取る。
時系列の最上段が確定日より新しければ、それは場中の行なので捨てる。

出力の「場中」は、確定終値より新しい行が時系列にあるかどうかで判定している。
"""
import io
import re
import sys
import time
import urllib.request

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
MAIN = 'https://kabutan.jp/stock/?code=%s'
KABUKA = 'https://kabutan.jp/stock/kabuka?code=%s'


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read().decode('utf-8', 'ignore')


def confirmed_date(main_html):
    """銘柄ページで「終値」ラベルが付いている <time> の日付を返す（YYYY-MM-DD）

    注意：株探は「終値」ラベル付きの <time> を複数出す。前日終値と当日終値が
    並ぶ日があり、先頭を取ると1営業日古い日付を掴む。必ず最も新しいものを採る。
    """
    hits = re.findall(r'<time[^>]*datetime="([\d-]{10})"[^>]*>\s*終値\s*</time>', main_html)
    if hits:
        return max(hits)
    # ラベルが別構造のとき用のフォールバック：日付だけの datetime を最も新しいものから
    cands = sorted(set(re.findall(r'<time[^>]*datetime="([\d-]{10})"', main_html)))
    return cands[-1] if cands else None


def kabuka_rows(html):
    """時系列テーブルを [(YYYY-MM-DD, 始, 高, 安, 終), ...] で返す（新しい順）"""
    t = re.sub(r'<[^>]*>', '|', html)
    rows = []
    pat = (r'\|*(\d{2})/(\d{2})/(\d{2})\|*\s*\|([\d,\.]+)\|\s*\|([\d,\.]+)\|'
           r'\s*\|([\d,\.]+)\|\s*\|([\d,\.]+)\|')
    for m in re.finditer(pat, t):
        y, mo, d, o, h, l, c = m.groups()
        rows.append(('20%s-%s-%s' % (y, mo, d), o, h, l, c))
    return rows


def metrics(main_html):
    """PER / PBR / 利回り / 信用倍率 / 時価総額 / 発行済株式数"""
    out = {}
    m = re.search(r'PER.*?利回り.*?信用倍率(.{0,400})', main_html, re.S)
    if m:
        x = re.sub(r'<[^>]*>', '|', m.group(1))
        x = re.sub(r'\s+', '', x)
        vals = re.findall(r'([\d,\.]+)\|*(倍|％|億円)', x)
        # 銘柄によって信用倍率が無い。位置ではなく単位の並びで振り分ける
        bai = [v for v, u in vals if u == '倍']
        pct = [v for v, u in vals if u == '％']
        oku = [v for v, u in vals if u == '億円']
        if len(bai) > 0:
            out['PER'] = bai[0] + '倍'
        if len(bai) > 1:
            out['PBR'] = bai[1] + '倍'
        if pct:
            out['配当利回り'] = pct[0] + '％'
        if len(bai) > 2:
            out['信用倍率'] = bai[2] + '倍'
        # 兆円規模は「6兆1,535億円」と分かれて出る。兆を落とさない
        mc = re.search(r'時価総額\|*(?:([\d,]+)\|*兆\|*)?([\d,\.]+)\|*億円', x)
        if mc:
            cho = float(mc.group(1).replace(',', '')) if mc.group(1) else 0.0
            oku2 = float(mc.group(2).replace(',', ''))
            total = cho * 10000 + oku2
            out['時価総額'] = ('%s兆%s億円' % (mc.group(1), mc.group(2))) if cho else (mc.group(2) + '億円')
            out['_mcap_oku'] = total
        elif oku:
            out['時価総額'] = oku[0] + '億円'
    n = re.search(r'発行済株式数[^0-9]{0,40}([\d,]+)', main_html)
    if n:
        out['発行済株式数'] = n.group(1) + '株'
    t = re.search(r'<title>([^<（(【\[|｜]{1,24})', main_html)
    if t:
        out['銘柄名'] = t.group(1).strip()
    return out


def report(code, days=5):
    try:
        main_html = fetch(MAIN % code)
        kab_html = fetch(KABUKA % code)
    except Exception as e:
        print('%s: 取得に失敗しました（%s）' % (code, e))
        return None

    conf = confirmed_date(main_html)
    rows = kabuka_rows(kab_html)
    if not rows:
        print('%s: 時系列を読めませんでした。ページ構造が変わった可能性があります。' % code)
        return None

    info = metrics(main_html)
    name = info.get('銘柄名', '')
    newest = rows[0][0]
    intraday = bool(conf and newest > conf)

    # 確定日より新しい「確定済みに見える行」が時系列にあれば、取りこぼしを疑う
    stale = [r[0] for r in rows if conf and r[0] > conf]
    if len(stale) > 1:
        print('  !! 注意: 確定日 %s より新しい行が %d 本あります（%s）。'
              % (conf, len(stale), ', '.join(stale[:3])))
        print('     株探のページ構造が変わった可能性があります。時系列を直接確認してください。')

    hit = next((r for r in rows if r[0] == conf), None)
    if hit is None:
        # 確定日の行が無いときは、確定日以前で最も新しい行を使う
        hit = next((r for r in rows if not conf or r[0] <= conf), rows[0])

    print('')
    print('=' * 58)
    print('%s %s' % (code, name))
    print('=' * 58)
    if intraday:
        print('  ★ いまは場中です。時系列の最上段 %s は未確定の行なので使わないこと。' % newest)
    print('  確定終値   : %s  →  %s 円' % (hit[0], hit[4]))
    if intraday:
        print('  （参考）現在: %s  始%s 高%s 安%s 現値%s' % (newest, rows[0][1], rows[0][2], rows[0][3], rows[0][4]))
    print('')
    print('  直近%d営業日（確定分）' % days)
    shown = 0
    for r in rows:
        if intraday and r[0] == newest:
            continue
        print('    %s  始%-9s 高%-9s 安%-9s 終%s' % (r[0], r[1], r[2], r[3], r[4]))
        shown += 1
        if shown >= days:
            break
    if info:
        print('')
        line = '  '.join('%s %s' % (k, v) for k, v in info.items() if not k.startswith('_') and k != '銘柄名')
        if line:
            print('  ' + line)
    return {'code': code, 'name': name, 'date': hit[0], 'close': hit[4], 'intraday': intraday}


def main(argv):
    days = 5
    if '--days' in argv:
        i = argv.index('--days')
        days = int(argv[i + 1])
        argv = argv[:i] + argv[i + 2:]
    codes = [a for a in argv if not a.startswith('--')]
    if not codes:
        print(__doc__)
        return 1
    got = []
    for i, c in enumerate(codes):
        if i:
            time.sleep(1)
        r = report(c, days)
        if r:
            got.append(r)
    if len(got) > 1:
        print('')
        print('=' * 58)
        print('まとめ（記事に貼る用）')
        for r in got:
            print('  %s %-14s %s終値 %s円%s'
                  % (r['code'], r['name'], r['date'].replace('-', '/'), r['close'],
                     '  ※取得時は場中' if r['intraday'] else ''))
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
