// 関連記事 frontmatter 一括挿入スクリプト（1回限り）
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'content', 'blog');

// 関連記事マップ（銘柄⇔関連コラム、コラム⇔実例銘柄）
const map = {
  'value-concept': ['why-value-stocks-win', 'per-value-investing', 'value-tob-strategy-2026', 'tokai-electronics-8071'],
  'why-value-stocks-win': ['value-concept', 'efficient-market-hypothesis', 'tokai-electronics-8071', 'value-tob-strategy-2026'],
  'per-value-investing': ['value-concept', 'nihon-hospice-7061', 'ryoyu-systems-4685', 'good-stock-vs-good-company'],
  'good-stock-vs-good-company': ['per-value-investing', 'spacex-ipo-spcx-2026', 'why-value-stocks-win'],
  'efficient-market-hypothesis': ['tokai-electronics-8071', 'why-value-stocks-win', 'okaya-kouki-7485', 'value-tob-strategy-2026'],
  'debt-credit-trading-strategy': ['virtual-mortgage-strategy', 'japan-stock-midterm-outlook-2026', 'value-concept'],
  'virtual-mortgage-strategy': ['debt-credit-trading-strategy', 'japan-stock-midterm-outlook-2026', 'value-tob-strategy-2026'],
  'japan-stock-midterm-outlook-2026': ['value-tob-strategy-2026', 'debt-credit-trading-strategy', 'prime-market-strategy'],
  'value-tob-strategy-2026': ['kozosodo-hd-7868', 'nssol-2327', 'nihon-bs-hoso-9414', 'efficient-market-hypothesis'],
  'prime-market-strategy': ['japan-stock-midterm-outlook-2026', 'value-tob-strategy-2026', 'value-concept'],
  'spacex-ipo-spcx-2026': ['good-stock-vs-good-company', 'per-value-investing', 'efficient-market-hypothesis'],
  'tobu-network-9036': ['keihan-hd-9045', 'shinyei-3004', 'value-tob-strategy-2026'],
  'shinyei-3004': ['okaya-kouki-7485', 'tobu-network-9036', 'value-concept'],
  'kitazato-368a': ['nihon-hospice-7061', 'ryoyu-systems-4685', 'per-value-investing'],
  'keihan-hd-9045': ['tobu-network-9036', 'nihon-bs-hoso-9414', 'prime-market-strategy'],
  'nihon-bs-hoso-9414': ['kozosodo-hd-7868', 'value-tob-strategy-2026', 'keihan-hd-9045'],
  'okaya-kouki-7485': ['tokai-electronics-8071', 'shinyei-3004', 'efficient-market-hypothesis'],
  'tokai-electronics-8071': ['efficient-market-hypothesis', 'okaya-kouki-7485', 'punch-industry-6165'],
  'nssol-2327': ['kozosodo-hd-7868', 'value-tob-strategy-2026', 'ryoyu-systems-4685'],
  'kozosodo-hd-7868': ['nssol-2327', 'nihon-bs-hoso-9414', 'value-tob-strategy-2026'],
  'punch-industry-6165': ['tokai-electronics-8071', 'okaya-kouki-7485', 'spacex-ipo-spcx-2026'],
  'nihon-hospice-7061': ['kitazato-368a', 'per-value-investing', 'ryoyu-systems-4685'],
  'ryoyu-systems-4685': ['nssol-2327', 'punch-industry-6165', 'per-value-investing'],
};

let done = 0;
const skipped = [];
for (const [slug, rel] of Object.entries(map)) {
  const fp = path.join(dir, slug + '.md');
  if (!fs.existsSync(fp)) { skipped.push(slug + '(なし)'); continue; }
  let text = fs.readFileSync(fp, 'utf8');
  if (/^related:/m.test(text)) { skipped.push(slug + '(既存)'); continue; }
  const lines = text.split('\n');
  let count = 0, idx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') { count++; if (count === 2) { idx = i; break; } }
  }
  if (idx === -1) { skipped.push(slug + '(fm不明)'); continue; }
  const yaml = 'related: [' + rel.map(r => '"' + r + '"').join(', ') + ']';
  lines.splice(idx, 0, yaml);
  fs.writeFileSync(fp, lines.join('\n'), 'utf8');
  done++;
}
console.log('挿入: ' + done + '件');
if (skipped.length) console.log('スキップ: ' + skipped.join(', '));
