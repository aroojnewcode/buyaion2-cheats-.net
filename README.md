# buyaion2cheats.net

Aion 2 cheats site for PC — aimbot, ESP, wallhack, radar, drop ESP and costume changer.

## Production (Cloudflare)

The live site must serve the Astro **`dist/`** folder. If you only see plain text **Hello world**, the domain is still pointed at a default Cloudflare Worker—not this site.

**Workers (static assets, recommended with `wrangler.toml`):**

```bash
npm run deploy
```

Then in Cloudflare Dashboard → **Workers & Pages** → **buyaion2cheats-net** → **Settings** → **Domains & Routes**, attach **buyaion2cheats.net** and remove any old “Hello world” worker route on the same hostname.

**Cloudflare Pages (GitHub):**

| Setting | Value |
|--------|--------|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js | 22 |

Or run `npm run deploy:pages` after `wrangler login`.

Do **not** use the repo root `index.html` as the publish folder (removed on purpose); it was an old static mockup, not the Astro app.
