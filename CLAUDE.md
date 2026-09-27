# Nilda Forbes VA portfolio

Professional static portfolio website for Nilda Forbes, virtual assistant. Replaces
https://nildatoraneo.mystrikingly.com/. Hosted on GitHub Pages.

## Stack

- Next.js (App Router) with TypeScript, built as a **static export** (`output: "export"` in
  `next.config.ts`). No server, no API routes, no database.
- Tailwind CSS for styling.
- Hosting: GitHub Pages, deployed from a GitHub Actions workflow that builds `out/` and publishes it.
- Package manager: npm.

Commands (set up in the first handoff; keep them working):

- install: `npm install`
- dev server: `npm run dev`
- lint: `npm run lint`
- typecheck: `npm run typecheck` (`tsc --noEmit`)
- test: `npm test`
- build: `npm run build` (produces `out/`)

Git flow: `main` + `develop`, feature branches off `develop`, squash-merged pull requests. Workers
never merge; Mira merges after review.
