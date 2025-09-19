Steps without local CLI:
1) Drop this ZIP into your repo. Commit.
2) Edit package.json in GitHub to include:
   - dependency: "zod": "^3.23.8"
   - scripts:
     "refactor": "node scripts/refactor-content.mjs",
     "build": "npm run refactor && next build"
3) In app/layout.tsx, change header import to:
     import NavBar from "@/components/IronHeader.data";
4) Push. Vercel will run the refactor during build and generate data/*.json and nav.json automatically.
