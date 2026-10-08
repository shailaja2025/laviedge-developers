import fs from 'fs';

const file = new URL('../src/i18n/te.js', import.meta.url);
const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
const start = lines.findIndex((line) => line.includes('"nri": {'));
const eyebrow = lines.findIndex((line, i) => i > start && line.includes('"eyebrow"'));
const lede = lines.findIndex((line, i) => i > start && /^\s*"lede":/.test(line));
const title = lines.find((line, i) => i > start && i < lede && /^\s*"title":/.test(line) && line.trim().endsWith(','));
const titleLines = lines.find((line, i) => i > start && i < lede && /^\s*"titleLines":/.test(line) && line.includes(']'));

if (start < 0 || eyebrow < 0 || lede < 0) {
  throw new Error(`markers missing start=${start} eyebrow=${eyebrow} lede=${lede}`);
}

const insert = [
  '    "byline": "Laviedge Developers",',
  '    "placeLine": "\\u0c35\\u0c3f\\u0c28\\u0c41\\u0c15\\u0c4a\\u0c02\\u0c21, \\u0c06\\u0c02\\u0c27\\u0c4d\\u0c30\\u0c2a\\u0c4d\\u0c30\\u0c26\\u0c47\\u0c36\\u0c4d",',
  title || '    "title": "NRI Township",',
  titleLines ||
    '    "titleLines": ["\\u0c38\\u0c4a\\u0c02\\u0c24 \\u0c2d\\u0c42\\u0c2e\\u0c3f.", "\\u0c2d\\u0c35\\u0c3f\\u0c37\\u0c4d\\u0c2f\\u0c24\\u0c4d\\u0c24\\u0c41 \\u0c28\\u0c3f\\u0c30\\u0c4d\\u0c2e\\u0c3f\\u0c02\\u0c1a\\u0c41\\u0c15\\u0c4b\\u0c02\\u0c21\\u0c3f.", "\\u0c07\\u0c02\\u0c15\\u0c3e \\u0c0e\\u0c15\\u0c4d\\u0c15\\u0c41\\u0c35\\u0c17\\u0c3e \\u0c07\\u0c02\\u0c1f\\u0c3f\\u0c15\\u0c3f \\u0c30\\u0c02\\u0c21\\u0c3f."],',
];

const next = [...lines.slice(0, eyebrow + 1), ...insert, ...lines.slice(lede)].join('\n');
fs.writeFileSync(file, next);
console.log('ok');
