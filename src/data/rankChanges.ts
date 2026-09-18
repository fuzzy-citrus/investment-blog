export interface RankChangeEntry {
  /** ランクを更新した日（YYYY-MM-DD）。同日の変更は複数件あってよい */
  changedAt: string;
  ticker: string;
  companyName: string;
  /** 変更前ランク（stockRanks の rating 表記に合わせる） */
  from: string;
  /** 変更後ランク */
  to: string;
  /** 変更の根拠を説明する記事の slug（content collection の id）。/blog/{articleSlug}/ にリンクする */
  articleSlug: string;
}

// 直近のランク変更履歴。追加は末尾でよい（表示側で changedAt 降順に並べ替えて先頭2〜3件だけ表示する）。
export const rankChanges: RankChangeEntry[] = [
  {
    changedAt: '2026-09-13',
    ticker: '368A',
    companyName: '北里コーポレーション',
    from: 'A',
    to: 'A-',
    articleSlug: 'rerank-45-current-price-audit',
  },
  {
    changedAt: '2026-09-13',
    ticker: '4040',
    companyName: '南海化学',
    from: 'A-',
    to: 'A+',
    articleSlug: 'rerank-45-current-price-audit',
  },
];
