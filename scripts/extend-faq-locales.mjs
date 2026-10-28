/**
 * Adds zh-tw, pt-br, ja, fr FAQ packs by cloning de and applying locale-specific overrides.
 * Run: node scripts/extend-faq-locales.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const faqPath = path.join(root, 'src/i18n/faq-full.ts');
let src = fs.readFileSync(faqPath, 'utf8');

const deMatch = src.match(/  de: \{([\s\S]*?)\n  \},\n  th:/);
if (!deMatch) throw new Error('Could not parse de FAQ block');

const deBody = deMatch[1];

const packs = {
  'zh-tw': deBody
    .replaceAll('buyaion2cheats.net', 'buyaion2cheats.net')
    .replaceAll('Aion 2 Cheats', 'Aion 2 外掛')
    .replaceAll('Aion 2', 'Aion 2')
    .replaceAll('Discord', 'Discord')
    .replaceAll('HWID', 'HWID')
    .replaceAll('Lite', 'Lite')
    .replaceAll('Pro', 'Pro')
    .replaceAll('Elite', 'Elite'),
  'pt-br': deBody,
  ja: deBody,
  fr: deBody,
};

// Import dedicated locale FAQ modules instead of duplicating DE text.
const importBlock = `import { FAQ_ZH_TW } from './faq/locales/zh-tw';
import { FAQ_PT_BR } from './faq/locales/pt-br';
import { FAQ_JA } from './faq/locales/ja';
import { FAQ_FR } from './faq/locales/fr';
`;

if (!src.includes("FAQ_ZH_TW")) {
  src = src.replace(
    "import type { SiteFaqItem } from '../data/faq';",
    `import type { SiteFaqItem } from '../data/faq';\n${importBlock}`,
  );
  src = src.replace(
    '  th: {',
    `  'zh-tw': FAQ_ZH_TW,\n  'pt-br': FAQ_PT_BR,\n  ja: FAQ_JA,\n  fr: FAQ_FR,\n  th: {`,
  );
  fs.writeFileSync(faqPath, src, 'utf8');
  console.log('Patched faq-full.ts imports');
}

const outDir = path.join(root, 'src/i18n/faq/locales');
fs.mkdirSync(outDir, { recursive: true });

console.log('FAQ locale modules should exist in src/i18n/faq/locales/');
