import { readFileSync, writeFileSync } from 'node:fs';

const T = (hex) =>
  hex
    .trim()
    .split(/\s+/)
    .map((h) => String.fromCodePoint(parseInt(h, 16)))
    .join('');

const path = new URL('../src/i18n/te.js', import.meta.url);
let src = readFileSync(path, 'utf8');

const enter = T('004E 0052 0049 0020 0C1F 0C4C 0C28 0C4D 200C 0C37 0C3F 0C2A 0C4D 200C 0C32 0C4B 0C15 0C3F');
const scroll = T('0C15 0C4D 0C30 0C3F 0C02 0C26 0C3F 0C15 0C3F');
const plots = T('0C28 0C2E 0C4B 0C26 0C3F 0C24 0020 0C2A 0C4D 0C32 0C3E 0C1F 0C4D 0C32 0C41');
const place = T('0C2A 0C4D 0C30 0C26 0C47 0C36 0C02');
const road = T('0C15 0C3E 0C30 0C3F 0C21 0C3E 0C30 0C4D');
const founded = T('0C38 0C4D 0C25 0C3E 0C2A 0C28');
const ret = T('0C24 0C3F 0C30 0C3F 0C17 0C3F 0020 0C35 0C46 0C33 0C4D 0C33 0C02 0C21 0C3F');

if (!src.includes('"enterFlagship"')) {
  src = src.replace(`"return": "${ret}"`, `"return": "${ret}",\n    "enterFlagship": "${enter}"`);
}

if (!src.includes('"facts"')) {
  src = src.replace(
    /("hero": \{[\s\S]*?"body": "[^"]+")\n  \},/,
    `$1,\n    "scroll": "${scroll}",\n    "enterFlagship": "${enter}"\n  },
  "facts": {
    "rera": "Phase-1 RERA",
    "plots": "${plots}",
    "place": "${place}",
    "road": "${road}",
    "founded": "${founded}"
  },`,
  );
}

writeFileSync(path, src);
console.log('te.js facts ready');
