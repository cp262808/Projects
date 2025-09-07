# Iron Codex — W3Schools‑style Site (Next.js + Tailwind)

Vercel‑ready scaffold mirroring the W3Schools aesthetic: sticky header with mega‑menus, dark domain bar, big hero search, pastel tiles, example blocks, and a clean footer.

## Deploy (no CLI needed)
1. Make a new GitHub repo and upload these files (web UI or GitHub Desktop).
2. In **Vercel**, import the repo → Deploy.

## Tech
- Next.js App Router (14+)
- Tailwind CSS
- TypeScript

## Add content later
- Place JSON under `/content` or add MDX pages.
- Topic pages in `app/topics/...`, guides in `app/guides/...`.

## Common error fix
If you ever see `ReferenceError: module is not defined in ES module scope`, ensure **PostCSS config uses CommonJS** (`postcss.config.cjs`) like in this repo.
