/**
 * Builds src/i18n/products/detail-locales.ts from scripts/products-i18n/*.json
 * Run: node scripts/build-product-detail-locales.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const inDir = path.join(root, 'scripts/products-i18n');
const outPath = path.join(root, 'src/i18n/products/detail-locales.ts');

const locales = ['ko', 'zh-tw', 'de', 'pt-br', 'fr', 'ja'];
const packs = {};
for (const locale of locales) {
  const file = path.join(inDir, `${locale}.json`);
  if (fs.existsSync(file)) {
    packs[locale] = JSON.parse(fs.readFileSync(file, 'utf8'));
  }
}

const header = `import type { ProductPage } from '../../data/products';
import type { Locale } from '../locales';

export type ProductDetailOverlay = Partial<
  Pick<
    ProductPage,
    | 'title'
    | 'subtitle'
    | 'desc'
    | 'features'
    | 'overview'
    | 'acquisition'
    | 'goodToKnow'
    | 'limitations'
    | 'fullFeatures'
    | 'systemRequirements'
    | 'about'
    | 'body'
  >
> & {
  badge?: string;
  imageAlts?: string[];
  imageCaptions?: string[];
  imageCaptionDescs?: string[];
};

export const PRODUCT_DETAIL: Partial<Record<Locale, Record<string, ProductDetailOverlay>>> = `;

fs.writeFileSync(outPath, `${header}${JSON.stringify(packs, null, 2)};\n`, 'utf8');
console.log('Wrote', outPath);
