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

/** 証券口座の画面そのもの（月次）。月初に前月末の成績を反映する */
export const brokerSnapshot = {
	account: '野村証券 実口座',
	asOf: '2026年8月末',
	label: 'お預り資産合計',
	amount: 43075651,
	unrealizedLabel: '評価損益合計',
	unrealized: 1462125,
	image: '/images/nomura-asset-chart-202608.png',
	imageAlt: '野村証券の口座画面。2025年7月から2026年8月までの資産推移',
};

/** 「実績報告」に並べる記事シリーズ（series.ts の id） */
export const recordSeriesIds = ['weekly', 'holdings-status'];
