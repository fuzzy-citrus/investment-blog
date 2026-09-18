// 連載シリーズの定義。
//
// ここに登録すると、該当記事の下部に「シリーズ全話ナビ」が自動で入る。
// related は4本で打ち切られるため、5本以上のシリーズは related では表現できない。
// 全話の相互リンクはこのファイルが担保する（記事側に手でリストを書かない）。
//
// 新しい回を書いたら slugs に1行足すだけでよい。順序は読む順（第1回が先頭）。
// 下書き（draft: true）のスラッグを先に入れておいても壊れない。公開されるまで表示されない。

export type Series = {
	id: string;
	/** ナビの見出しに出るシリーズ名 */
	name: string;
	/** 1行説明。ナビ見出しの下に小さく出る */
	lead: string;
	/** 読む順に並べたスラッグ */
	slugs: string[];
	/** 各話のラベル（省略時は「第N回」）。slugs と同じ順で対応させる */
	labels?: string[];
};

export const seriesList: Series[] = [
	{
		id: 'weekly',
		name: '週次運用記録',
		lead: '1週間の売買を全件開示し、ポートフォリオの現況と維持率まで数字で出すシリーズ。',
		slugs: [
			'weekly-2026w36-midlarge-56buys',
			'weekly-2026w37-cut-and-buy-down',
			'weekly-2026w38-nihon-gear-round-trip',
			'weekly-2026w38-week-summary',
		],
		labels: [
			'2026年8月30日〜9月5日',
			'2026年9月7日〜11日',
			'2026年9月14日〜16日',
			'2026年9月14日〜18日（総括）',
		],
	},
	{
		id: 'reverse-value',
		name: '逆バリュー投資',
		lead: '日向が企画する実験連載。バリューの物差しを上下逆に使い、価値から離れすぎた株を少量ずつ売る。',
		slugs: [
			'small-short-overvaluation-2026',
			'reverse-value-02-short-screening',
		],
		labels: [
			'第1回｜なぜ少量ずつ売るのか',
			'第2回｜高PERの4つの型',
		],
	},
	{
		id: 'census',
		name: 'シケモク圏の人口調査',
		lead: '保有・紹介銘柄を毎月同じ条件で数え、安い株が増えたか減ったかを記録する月次の定点観測。',
		slugs: [
			'cheap-stock-census-2026-09',
		],
		labels: [
			'2026年9月',
		],
	},
	{
		id: 'scorecard',
		name: '紹介銘柄の通信簿',
		lead: '紹介した銘柄を全件答え合わせし、ランクが機能したかを検証するシリーズ。３か月ごとに更新。',
		slugs: [
			'scorecard-45-stocks-2026q3',
		],
		labels: [
			'第1回｜2026年9月・45銘柄',
		],
	},
	{
		id: 'dividend',
		name: '配当シリーズ',
		lead: '配当を「入口の利回り」ではなく「続く理由」と「出口の道具」から見直す全4回。',
		slugs: [
			'dividend-series-01-what-is-dividend',
			'dividend-series-02-low-payout-opportunity',
			'dividend-series-03-dividend-as-exit-strategy',
			'dividend-series-04-afterword',
		],
		labels: ['第1回｜配当とは何か', '第2回｜低配当性向は宝', '第3回｜配当は出口で使う', '第4回｜あとがき'],
	},
	{
		id: 'holdings-status',
		name: '紹介銘柄の現況シリーズ',
		lead: '紹介した銘柄をその後どうしたか。ランク改定とロット調整を含めて追跡する全5回。',
		slugs: [
			'holdings-status-01-saas',
			'holdings-status-02-kitazato-shinyei',
			'holdings-status-03-kozosodo-tobu',
			'holdings-status-04-okaya-tokai',
			'holdings-status-05-crash-entry',
		],
		labels: ['①SaaS系', '②北里・神栄', '③construct・東部', '④岡谷・東海', '⑤急落エントリー'],
	},
	{
		id: 'activist',
		name: 'アクティビスト先回りシリーズ',
		lead: '「安い資産バリューには外圧が来る」を、仕組み・探し方・実例で検証する全4回。',
		slugs: [
			'activist-front-running-01',
			'activist-front-running-02',
			'activist-front-running-03',
			'activist-front-running-real-cases',
		],
		labels: ['第1回｜なぜ来るのか', '第2回｜どう探すか', '第3回｜どう構えるか', '実例編'],
	},
];

/** スラッグから、それが属するシリーズと位置を引く */
export function findSeries(slug: string): { series: Series; index: number } | null {
	for (const series of seriesList) {
		const index = series.slugs.indexOf(slug);
		if (index >= 0) return { series, index };
	}
	return null;
}
