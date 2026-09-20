// 当商会の実績報告（資産推移）で使う数字。
//
// ここに置くのは「すでに記事で公開した数字」だけ。売買記録そのものは入れない。
// 週次総括を公開したら weeklyRecords に1行足す（単位：万円、維持率は%）。
// 月初に口座画面を撮り直したら brokerSnapshot を更新する。

export type WeeklyRecord = {
	/** 週末の日付（その日の終値ベース） */
	date: string;
	/** 純資産（万円） */
	netAssets: number;
	/** 総ポジション＝現金＋現物＋信用建玉（万円）。会社の貸借対照表でいう総資産とは別物 */
	totalPosition: number;
	/** 含み損益（万円）。記事に出していない週は null */
	unrealized: number | null;
	/** 信用維持率（%） */
	maintenance: number | null;
	/** 出所の記事スラッグ */
	slug: string;
};

export const weeklyRecords: WeeklyRecord[] = [
	{
		date: '2026-09-05',
		netAssets: 4241,
		totalPosition: 10854,
		unrealized: null,
		maintenance: 51.1,
		slug: 'weekly-2026w36-midlarge-56buys',
	},
	{
		date: '2026-09-11',
		netAssets: 4158,
		totalPosition: 11552,
		unrealized: -101,
		maintenance: 44.0,
		slug: 'weekly-2026w37-cut-and-buy-down',
	},
	{
		date: '2026-09-18',
		netAssets: 4547,
		totalPosition: 10862,
		unrealized: 251,
		maintenance: 56.7,
		slug: 'weekly-2026w38-week-summary',
	},
];

/** 月ごとのお預り資産評価額（株券等貸借を除く／単位：円） */
export type MonthlyRecord = {
	/** YYYY-MM */
	month: string;
	/** お預り資産評価額（円） */
	amount: number;
	/** 月末ではなく途中の基準日のときだけ入れる（例：2026年9月18日時点） */
	asOf?: string;
};

/**
 * 出所：野村證券「ご投資状況／お預り資産評価の推移」（2026年9月20日出力・2026年9月18日基準）。
 * 数字は口座の明細そのままで、推計ではない。毎月、最新の明細が出たら1行足す。
 * ※元のPDFは氏名が入っているので、リポジトリにも公開物にも置かない（数字だけここに転記する）。
 */
export const monthlyRecords: MonthlyRecord[] = [
	{ month: '2025-07', amount: 13737382 },
	{ month: '2025-08', amount: 18552397 },
	{ month: '2025-09', amount: 21414981 },
	{ month: '2025-10', amount: 23433341 },
	{ month: '2025-11', amount: 25263941 },
	{ month: '2025-12', amount: 33517162 },
	{ month: '2026-01', amount: 34254323 },
	{ month: '2026-02', amount: 43151441 },
	{ month: '2026-03', amount: 41373612 },
	{ month: '2026-04', amount: 37018647 },
	{ month: '2026-05', amount: 42630530 },
	{ month: '2026-06', amount: 41392661 },
	{ month: '2026-07', amount: 44379757 },
	{ month: '2026-08', amount: 43588193 },
	{ month: '2026-09', amount: 45102836, asOf: '2026年9月18日時点' },
];

/** 証券口座の画面そのもの（月次）。月初に前月末の成績を反映する */
export const brokerSnapshot = {
	account: '野村證券 実口座',
	asOf: '2026年9月18日',
	label: 'お預り資産合計（株券等貸借除く）',
	amount: 45102836,
	unrealizedLabel: '評価損益合計',
	unrealized: 2506926,
	/** 2026年8月に撮った口座画面。数字はその時点のもの */
	image: '/images/nomura-asset-chart-202608.png',
	imageAlt: '野村證券の口座画面。2025年7月から2026年8月までの資産推移',
	imageAsOf: '2026年8月',
	imageAmount: 43075651,
};

/** 「実績報告」に並べる記事シリーズ（series.ts の id） */
export const recordSeriesIds = ['weekly', 'holdings-status'];
