import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';
import fs from 'node:fs';
import path from 'node:path';

const heroSrc =
  'C:/Users/DELL 7280/.cursor/projects/c-Users-DELL-7280-Documents-aion2-cheats/assets/c__Users_DELL_7280_AppData_Roaming_Cursor_User_workspaceStorage_276047740f1361531619d234702f1ee1_images_Dark_Fantasy_MMORPG_ESP_Battlefield__1_-de16f29b-7dc4-4d68-9771-5911fe6ea0de.png';
const heroDest = path.join(process.cwd(), 'public/images/gameplay/aion-2-hero-esp-battlefield.png');
if (!fs.existsSync(heroDest) && fs.existsSync(heroSrc)) {
  fs.mkdirSync(path.dirname(heroDest), { recursive: true });
  fs.copyFileSync(heroSrc, heroDest);
}

async function ensureHeroWebp() {
  if (!fs.existsSync(heroDest)) return;
  const { default: sharp } = await import('sharp');
  for (const width of [640, 960]) {
    const webpOut = heroDest.replace(/\.png$/i, `-${width}.webp`);
    if (fs.existsSync(webpOut)) continue;
    await sharp(heroDest)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(webpOut);
  }
}

void ensureHeroWebp();

export default defineConfig({
  site: 'https://buyaion2cheats.net',
  trailingSlash: 'always',
  redirects: {
    '/cheats/': '/products/aion-2-cheats/',
    '/cheats/lite/': '/products/aion-2-cheats/',
    '/cheats/pro/': '/products/aion-2-cheats/',
    '/cheats/elite/': '/products/aion-2-cheats/elite/',
    '/cheats/compare/': '/blog/aion-2-lite-vs-pro/',
    '/products/dota-2-cheats/': '/products/aion-2-cheats/',
    '/products/dota-2-cheats/elite/': '/products/aion-2-cheats/elite/',
    '/products/dota-2-cheats/utilities/': '/products/aion-2-cheats/utilities/',
    '/products/fortnite-cheats/': '/products/aion-2-cheats/',
    '/products/fortnite-cheats/elite/': '/products/aion-2-cheats/elite/',
    '/products/fortnite-cheats/utilities/': '/products/aion-2-cheats/utilities/',
    '/go/fortnite/': '/go/aion-2/',
    '/contact/': '/support/',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  server: {
    host: '127.0.0.1',
    port: 4321,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          ko: 'ko-KR',
          'zh-tw': 'zh-TW',
          de: 'de-DE',
          'pt-br': 'pt-BR',
          th: 'th-TH',
          ja: 'ja-JP',
          es: 'es-ES',
          fr: 'fr-FR',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});
