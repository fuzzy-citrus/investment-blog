// YouTube 動画の一覧（/youtube とトップの案内で使う）。
// 【足し方】新しい動画を公開したら、配列の先頭に1件足す。サムネイルは src/assets/youtube/ に置く。
//   title は YouTube のタイトルと同じにする（YouTube 側で変えたらここも直す）。
//   chapters は概要欄のチャプターと同じ時刻。points・summary の数字は動画の台詞にあるものだけを書く。
// 【出さないもの】未公開・確認版の動画は入れない（入れるとページとサイトマップに出る）。
import type { ImageMetadata } from 'astro';
import introMembers from '../assets/youtube/intro-members.jpg';
import tobuTokai from '../assets/youtube/tobu-tokai.jpg';
import wallet from '../assets/youtube/wallet.jpg';

export const YOUTUBE_CHANNEL_NAME = '沼底バリュー商会';

export interface VideoChapter {
  /** 'mm:ss' */
  time: string;
  title: string;
}

export interface VideoEntry {
  /** YouTube の動画ID（youtu.be/ のあと） */
  id: string;
  /** ページ内のアンカー（/youtube#slug） */
  slug: string;
  kind: '紹介' | '銘柄' | '手法';
  title: string;
  /** 一覧やトップで使う短い呼び名 */
  shortTitle: string;
  /** 公開日時（JST のオフセット付き） */
  published: string;
  /** 表示用の長さ */
  duration: string;
  /** ISO 8601 の長さ（構造化データ用） */
  isoDuration: string;
  thumb: ImageMetadata;
  summary: string;
  points: string[];
  chapters: VideoChapter[];
  related: { href: string; label: string }[];
  /** 数字の基準日や保有の有無など、動画ごとの注記 */
  note?: string;
}

export const videos: VideoEntry[] = [
  {
    id: 't1euarRTOWI',
    slug: 'wallet',
    kind: '手法',
    title: '100万円入りの財布が80万円なら買う？｜お宝銘柄を見抜くための作法',
    shortTitle: '100万円の財布で、割安株の考え方を最初から最後まで',
    published: '2026-10-15T21:00:00+09:00',
    duration: '8分49秒',
    isoDuration: 'PT8M49S',
    thumb: wallet,
    summary:
      '100万円が入った財布が、80万円で売られていたら。株の「割安」を、財布と炊飯器のたとえで最初から最後まで説明します。中身を自分で数えること、税金や見込み違いの分を先に引くこと、待ち方を先に決めることを順に扱います。',
    points: [
      '株を買うのは、会社の財布を買うこと',
      '中身は自分で数える（期限切れの商品券、在庫、売掛金）',
      '税金を引くと余白は縮む。保有株の値下がりで含み益も減るので、数えた時点を確かめる',
      '買取店が1万円の炊飯器を6,000円でしか買わない理由（安全余裕）',
      '少し高くても買える「増える財布」',
      'ずれがいつ埋まるかは選べない。だから待ち方を先に決める',
    ],
    chapters: [
      { time: '00:00', title: '100万円が80万円？' },
      { time: '00:28', title: '会社の財布を開ける' },
      { time: '01:53', title: '本当に100万円ある？' },
      { time: '03:12', title: '税金で変わる余白' },
      { time: '04:22', title: '買取店は、なぜ安く買う？' },
      { time: '05:41', title: '毎年、増える財布' },
      { time: '06:51', title: '開けられない財布' },
      { time: '07:58', title: '買う前の点検表' },
    ],
    related: [
      { href: '/blog/value-concept/', label: '資産性バリューと収益性バリューの違いとは' },
      { href: '/comics/wallet/', label: '四コマ「80万円の財布」' },
      { href: '/comics/margin/', label: '四コマ「買取店の6,000円」' },
      { href: '/concept/', label: '経営コンセプト' },
    ],
    note: '財布と炊飯器の金額は、説明のためのたとえ話です。実例の数字は当商会の推定で、各決算時点のものです。',
  },
  {
    id: 'nHUOTKBo2eM',
    slug: 'tobu-tokai',
    kind: '銘柄',
    title: '沼底バリュー商会の主力株紹介｜東部ネットワーク・東海エレクトロニクス',
    shortTitle: '東部ネットワークと東海エレクトロニクスを決算書から読む',
    published: '2026-10-13T08:39:00+09:00',
    duration: '9分26秒',
    isoDuration: 'PT9M26S',
    thumb: tobuTokai,
    summary:
      '土地が厚い東部ネットワーク（9036）と、現金が厚い東海エレクトロニクス（8071）。同じ「資産に比べて安い」でも、土地と現金では確かめることが違います。決算短信と有価証券報告書を開いて、資料の読み方を2社で確かめる回です。',
    points: [
      '土地の帳簿価額と、会社が算定した時価は別の数字',
      '現預金から借入金を引いても、自由に配れるお金にはならない',
      '決算のあとの買収で、現金はどう変わるか（東海エレクトロニクスは現金54.5億円の買収が10月1日に完了）',
      '配当、売買のしやすさ、待つあいだに確かめること',
    ],
    chapters: [
      { time: '00:00', title: '資産バリューの二つの顔' },
      { time: '00:49', title: '東部ネットワーク｜物流の奥にある不動産' },
      { time: '03:25', title: '決算の後も、会社は動いている' },
      { time: '04:05', title: '東海エレクトロニクス｜現預金の厚さを見る' },
      { time: '07:14', title: '二社を並べると、見えること' },
    ],
    related: [
      { href: '/blog/tobu-network-9036/', label: '銘柄紹介｜東部ネットワーク（9036）' },
      { href: '/blog/tobu-network-9036-ma-recheck/', label: '続報｜東部ネットワークの14.3億円M&Aを登記簿で洗った' },
      { href: '/blog/tokai-electronics-8071/', label: '銘柄紹介｜東海エレクトロニクス（8071）' },
    ],
    note: '数字の基準日：貸借対照表は2026年6月末、不動産の時価は2026年3月末の有価証券報告書、株価は2026年10月8日・9日の終値です。買収後の金額は、6月末の残高から対価を引いただけの机上の計算で、実際の残高ではありません。筆者は両社の株式を保有しています（2026年10月時点）。',
  },
  {
    id: '1qzNNqoHCHI',
    slug: 'intro-members',
    kind: '紹介',
    title: '高配当株もインデックスも試した個人投資家が、日本の割安株を探す理由｜バリュー投資ブログ「沼底バリュー商会」の紹介',
    shortTitle: '筆者とメンバーの紹介',
    published: '2026-10-11T01:38:00+09:00',
    duration: '6分47秒',
    isoDuration: 'PT6M47S',
    thumb: introMembers,
    summary:
      '高配当株の分散から始めて、インデックス、米国株、債券、金。寄り道をしてきた筆者が、いま日本の割安株を1社ずつ調べている理由と、調べ方を分担する部下たちを紹介します。最初の1本におすすめです。',
    points: [
      '筆者がたどった寄り道と、いまのやり方',
      'ライバルの「インデックス宗教法人」と「本場モメンタムチンパンジー組合」は、どちらも昔の自分',
      '割安発掘・インカム・チェック・先見戦略の4班とAI担当が、それぞれ何を見ているか',
      '見つける係の隣に、買う前に止める係がいる理由',
    ],
    chapters: [
      { time: '00:00', title: 'はじめての会議' },
      { time: '00:26', title: '筆者と、これまでの寄り道' },
      { time: '01:05', title: '二つのライバル組織' },
      { time: '02:36', title: '四つの班と、AI担当' },
      { time: '03:22', title: '待つ間を、暮らしにつなぐ' },
      { time: '04:08', title: '買う前に、止める人' },
      { time: '04:42', title: '先の景色と、強さの理由' },
      { time: '05:34', title: '最後は、自分で確かめる' },
    ],
    related: [
      { href: '/about/', label: '筆者紹介' },
      { href: '/characters/', label: '部下の紹介' },
      { href: '/org/', label: '会社組織図・勢力図' },
      { href: '/concept/', label: '経営コンセプト（投資哲学）' },
    ],
  },
];

/** 'mm:ss' → 秒 */
export const chapterSeconds = (time: string) => {
  const [m, s] = time.split(':').map(Number);
  return m * 60 + s;
};

/** 公開日を「2026年10月13日」の形で返す（JST の日付をそのまま読む） */
export const videoDateLabel = (published: string) => {
  const [y, m, d] = published.slice(0, 10).split('-').map(Number);
  return `${y}年${m}月${d}日`;
};
