# Iron Codex — W3-style (Next.js + Tailwind + MDX)

Vercel‑ready scaffold mirroring the W3 design (header + topics scroller + hero), with MDX docs, syntax highlighting, and a search API.

## Deploy (no CLI)
1. Upload these files to a GitHub repo at the **root**.
2. Import the repo in **Vercel** → Deploy.

## Preview / PRs
- Push to a non-`main` branch; Vercel auto-creates **Preview Deploys**.

## Includes
- Next.js App Router (14+), Tailwind CSS
- MDX with remark-gfm + rehype-pretty-code (Shiki)
- W3-style top nav, ghost-arrow topics scroller, steel-book logo
- Search UI at `/search` + `/api/search`

## Notes
- If you hit ESM errors with PostCSS, ensure `postcss.config.cjs` is present (not `.js`).
- If you see 404s after import, verify `package.json` is at the Vercel **Root Directory**.
