/**
 * Import single homepage hero slide from user asset.
 * Run: node scripts/import-hero-battlefield.mjs && npm run optimize:images
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const input = path.resolve(
  'C:/Users/DELL 7280/.cursor/projects/c-Users-DELL-7280-Documents-aion2-cheats/assets/c__Users_DELL_7280_AppData_Roaming_Cursor_User_workspaceStorage_276047740f1361531619d234702f1ee1_images_Dark_Fantasy_MMORPG_ESP_Battlefield__1_-de16f29b-7dc4-4d68-9771-5911fe6ea0de.png',
);
const outDir = path.resolve('public/images/gameplay');
const outFile = 'aion-2-hero-esp-battlefield.png';

if (!fs.existsSync(input)) {
  throw new Error(`Missing source: ${input}`);
}

fs.mkdirSync(outDir, { recursive: true });
const dest = path.join(outDir, outFile);
await sharp(input)
  .resize({ width: 1920, withoutEnlargement: true })
  .png({ compressionLevel: 8 })
  .toFile(dest);
console.log('Wrote', dest);
