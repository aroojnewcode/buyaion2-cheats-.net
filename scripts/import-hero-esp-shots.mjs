/**
 * Import homepage hero ESP screenshots into public/images/gameplay.
 * Run: node scripts/import-hero-esp-shots.mjs && npm run optimize:images
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const assetsDir = path.resolve(
  'C:/Users/DELL 7280/.cursor/projects/c-Users-DELL-7280-Documents-aion2-cheats/assets',
);

const SHOTS = [
  {
    src: 'c__Users_DELL_7280_AppData_Roaming_Cursor_User_workspaceStorage_276047740f1361531619d234702f1ee1_images_image-d5bc53ef-147a-4ead-86f8-5a9ac14b8164.jpg',
    out: 'aion-2-esp-boss-arena.png',
  },
  {
    src: 'c__Users_DELL_7280_AppData_Roaming_Cursor_User_workspaceStorage_276047740f1361531619d234702f1ee1_images_image-9de1945a-7374-4ea6-a06a-eb2681151de7.jpg',
    out: 'aion-2-esp-cemetery.png',
  },
  {
    src: 'c__Users_DELL_7280_AppData_Roaming_Cursor_User_workspaceStorage_276047740f1361531619d234702f1ee1_images_image-8ff64267-38ec-43f1-a9cd-583b904a2669.jpg',
    out: 'aion-2-combat-purple.png',
  },
  {
    src: 'c__Users_DELL_7280_AppData_Roaming_Cursor_User_workspaceStorage_276047740f1361531619d234702f1ee1_images_image-27e42a80-7afb-4c94-ad23-beb269c4d63c.jpg',
    out: 'aion-2-combat-plateau.png',
  },
];

const outDir = path.resolve('public/images/gameplay');
fs.mkdirSync(outDir, { recursive: true });

for (const shot of SHOTS) {
  const input = path.join(assetsDir, shot.src);
  if (!fs.existsSync(input)) {
    throw new Error(`Missing source: ${input}`);
  }
  const dest = path.join(outDir, shot.out);
  await sharp(input)
    .resize({ width: 1920, withoutEnlargement: true })
    .png({ compressionLevel: 8 })
    .toFile(dest);
  console.log('Wrote', dest);
}
