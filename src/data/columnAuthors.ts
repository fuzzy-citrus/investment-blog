// コラム記事の「担当キャラ（発信元）」と表示色。
// 新しいコラムを追加したら、ここに1行足すとカードにキャラバッジ＋色が付く。
// 色は /map のテーマカラーと連動（同じテーマ＝同じ色）。

export interface ColumnAuthor {
  emoji: string;
  name: string;
  fill: string;   // バッジ背景（light）
  text: string;   // バッジ文字（dark）
  accent: string; // カード左ボーダー・名前色（mid）
}

// キャラ定義（テーマ色と対応）
const C = {
  numata:    { emoji: '🧑‍💼', name: '沼田課長', fill: '#E6F1FB', text: '#042C53', accent: '#185FA5' },
  kawachi:   { emoji: '🦦', name: '河内', fill: '#E1F5EE', text: '#04342C', accent: '#0F6E56' },
  yomi:      { emoji: '🦉', name: '夜見', fill: '#E1F5EE', text: '#04342C', accent: '#0F6E56' },
  machibuse: { emoji: '🐊', name: '待伏', fill: '#FAECE7', text: '#4A1B0C', accent: '#993C1D' },
  morita:    { emoji: '🦞', name: '守田', fill: '#FAEEDA', text: '#412402', accent: '#854F0B' },
  nomura:    { emoji: '🧓', name: '野村創業者', fill: '#FAEEDA', text: '#412402', accent: '#854F0B' },
  hanaoka:   { emoji: '🐝', name: '花岡', fill: '#FBEAF0', text: '#4B1528', accent: '#993556' },
} satisfies Record<string, ColumnAuthor>;

export const columnAuthors: Record<string, ColumnAuthor> = {
  'activist-front-running-01': C.machibuse,
  'activist-front-running-02': C.machibuse,
  'activist-front-running-03': C.machibuse,
  'hidden-policy-stock-kitazato': C.numata,
  'hidden-policy-stock-nihon-hospice': C.numata,
  'tokyo-crematorium-monopoly-discount': C.nomura,
  'nomura-margin-rate-1-69-alchemy': C.nomura,
  'saas-death-japan-it': C.numata,
  'holdings-status-01-saas': C.numata,
  'holdings-status-02-kitazato-shinyei': C.numata,
  'holdings-status-03-kozosodo-tobu': C.numata,
  'us-treasury-etf-hedge-2255-237a': C.morita,
  'daiken-5900-activist-entry': C.machibuse,
  'ryoyu-systems-4685-q1-recheck': C.morita,
  'shinyei-3004-q1-recheck': C.yomi,
  'lighting-sector-summary': C.numata,
  'activist-front-running-real-cases': C.machibuse,
  'holdings-status-05-crash-entry': C.numata,
  'kioxia-285a-crash-analysis': C.nomura,
  'margin-maintenance-rate-balance': C.nomura,
  'disaster-recovery-demand-value-stocks': C.numata,
  'security-sector-consolidation': C.numata,
  'food-tax-cut-1percent-value-stocks': C.numata,
  'margin-carry-10year-model': C.nomura,
  'broadcasting-selloff-opportunity': C.numata,
  'holdings-status-04-okaya-tokai': C.numata,
  'construction-selloff-opportunity': C.numata,
  'healthcare-selloff-opportunity': C.numata,
  'japan-market-distortion-01': C.numata,
  'net-net-graham-investing': C.morita,
  'buffett-japan-trading-houses': C.numata,
  'how-to-find-net-net-japan': C.kawachi,
  'value-concept': C.numata,
  'why-value-stocks-win': C.numata,
  'per-value-investing': C.numata,
  'good-stock-vs-good-company': C.numata,
  'japan-stock-midterm-outlook-2026': C.numata,
  'efficient-market-hypothesis': C.kawachi,
  'value-tob-strategy-2026': C.machibuse,
  'spacex-ipo-spcx-2026': C.machibuse,
  'capital-management-survival': C.morita,
  'value-investor-decision-unrealized-loss': C.morita,
  'value-investor-decision-withdrawal': C.morita,
  'value-investor-decision-afterword': C.numata,
  'prime-market-strategy': C.morita,
  'debt-credit-trading-strategy': C.nomura,
  'virtual-mortgage-strategy': C.nomura,
  'nisa-vs-margin-expected-return': C.yomi,
  'dividend-series-01-what-is-dividend': C.hanaoka,
  'dividend-series-02-low-payout-opportunity': C.hanaoka,
  'dividend-series-03-dividend-as-exit-strategy': C.hanaoka,
  'dividend-series-04-afterword': C.hanaoka,
  'low-payout-internal-compounding': C.numata,
  'august-september-rights-2026': C.hanaoka,
};
