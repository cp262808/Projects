# Iron Codex — W3Schools‑style Site (Next.js + Tailwind)

This repo is a ready‑to‑deploy scaffold for Vercel. It mirrors the W3Schools aesthetic: sticky header with mega‑menus, dark domain bar, big hero search, pastel tiles, example blocks, and a clean footer.

## Deploy steps (no CLI required)
1. Create a new **GitHub repo** and upload these files (drag‑and‑drop or GitHub Desktop).
2. In **Vercel**, import the repo. No extra config needed.
3. Vercel will install, build, and deploy automatically.

## Tech
- Next.js App Router (14+)
- Tailwind CSS (Preflight on; but components use consistent classes)
- TypeScript
- Ready for future JSON/MDX content

## Where to add content
- Add JSON under `/content` or create MDX routes later.
- Add topic pages under `app/topics/...` and guide pages under `app/guides/...`.

## Local (optional)
If you ever use a terminal:
```bash
npm i
npm run dev
```

## Database?
Not required for static references. Add one later for auth, favorites, analytics:
- Vercel Postgres (easy) or Typesense/Algolia for search.
- On AWS: Aurora Serverless (Postgres) or DynamoDB + OpenSearch/Typesense.
