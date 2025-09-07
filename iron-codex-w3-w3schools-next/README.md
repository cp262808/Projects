# Iron Codex — W3Schools‑style (Next.js + Tailwind + MDX)

Vercel‑ready scaffold mirroring the W3Schools aesthetic: sticky header with mega‑menus, dark domain bar, big hero search, pastel tiles, example blocks, and a clean footer.

## Deploy (no CLI needed)
1. Create a new GitHub repo and upload these files at the **repo root**.
2. In **Vercel**, import the repo → Deploy.

## Preview without production
- Push to a non-`main` branch; Vercel auto-creates **Preview Deploys**.

## Tech
- Next.js App Router (14+)
- Tailwind CSS
- MDX support
- Vercel Analytics

## Search
- Client UI: `/search`
- API route: `/api/search` reading from `/content/search.json`

## Common gotchas
- If you see `module is not defined in ES module scope`, ensure `postcss.config.cjs` exists (not `.js`).
- If the site 404s, check that `package.json` is at the **repo root**, or set **Root Directory** in Vercel.
