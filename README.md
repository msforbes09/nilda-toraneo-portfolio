# Nilda Toraneo — portfolio

Static one-page portfolio for Nilda Toraneo, Amazon Account Manager and Admin Virtual Assistant.
Next.js (App Router, static export), TypeScript, Tailwind CSS, Motion. Hosted on GitHub Pages.

## Commands

| Command             | What it does                                            |
| ------------------- | ------------------------------------------------------- |
| `npm install`       | Install dependencies                                    |
| `npm run dev`       | Dev server at http://localhost:3000                     |
| `npm run lint`      | ESLint                                                  |
| `npm run typecheck` | `tsc --noEmit`                                          |
| `npm test`          | Vitest (site) and `node --test` (kit hooks), once       |
| `npm run build`     | Static export into `out/`                               |

Environment values are documented in `.env.example`. All copy and data live in
`content/site.ts`; anything marked `sample: true` there is placeholder content that Nilda
replaces.

## Deploy

`.github/workflows/deploy.yml` builds `out/` with `NEXT_PUBLIC_BASE_PATH=/nilda-toraneo-portfolio` and
publishes it to GitHub Pages on every push to `main`, or manually via `workflow_dispatch`.
