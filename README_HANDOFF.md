# Trinsic Local Handoff

This bundle is a local-only handoff for reviewing and improving the Trinsic CA Final study PWA with Claude Code.

It intentionally excludes Git metadata, GitHub workflows, node_modules, dist builds, real environment files, and the heavy ICAI/source-material corpus. Do not push or deploy from this bundle unless the owner explicitly asks later.

## Folder Layout

- `app/`: Current Trinsic PWA, built from the FR Ledger app.
- `ai-server/`: Local AI tutor/evaluator server and provider cascade.
- `reference/legacy-dashboards/`: Standalone dashboard HTML files used as visual and content references.
- `reference/study-os-prototype/`: Earlier Study OS prototype for UX comparison.
- `docs/`: Project context notes copied from the workspace.
- `CLAUDE_PROMPT.md`: Prompt to paste into Claude Code.

## Run Locally

PWA:

```powershell
cd app
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

Open `http://127.0.0.1:5173`.

AI server:

```powershell
cd ai-server
Copy-Item .env.example .env
npm install
npm start
```

Add API keys to `ai-server/.env` before expecting live AI responses. Check `http://127.0.0.1:3721/api/health`.

## Current Architecture

The app is a Vite React PWA that opens into the Trinsic shell styled after the polished Ind AS 23 dashboard (dark-teal rail, gold active nav, warm paper grid). Navigation: Home, Library, Chapter, Ledger, Analytics, Errors, Revision, Mocks, Vault, and a dedicated AI Tutor page.

Ind AS 23 is now a **first-class native chapter** — no iframe. Its content lives in a typed block model (`app/src/data/chapterDoc.ts` + `app/src/data/chapters/indAs23.ts`) rendered by `app/src/components/ChapterDashboard.tsx`: 14 sections, flips, tables, formulas, 3 live calculators, the 14-scenario drill, 8 TYK practicals, the 20-MCQ quiz, and the trap sheet, with per-section mastery saved to the same localStorage key the standalone board used (`indas23done`). Ind AS 109 Unit 2 and Ind AS 115 still render their legacy HTML boards as in-app iframe embeds until migrated to the same block model.

The AI Tutor is a calm full-page chat (no sidebar): assistant replies render as Markdown (tables, lists, bold figures via react-markdown + remark-gfm), the composer is never pre-filled, and chapter/section/practice/selected-text context rides along as a small dismissible chip. Highlighting text inside a chapter shows a floating "Ask AI about this" button that jumps to the AI page with that passage attached. The AI server tries Gemini 3.5 Flash → Gemini 3.1 Flash Lite → known-good Gemini fallbacks → Groq (reasoning models first) → Mistral → OpenRouter. Model names are validated at startup and any model the API reports as not-found is blacklisted for the session (visible in `/api/health` under `unavailableModels`).

The service worker registers only in production builds; dev mode actively unregisters workers and clears both `trinsic*` and legacy `fr-study-os*` caches, so local development never serves stale assets.

## Known Review Areas

- Ind AS 109 Unit 2 and Ind AS 115 should eventually be ported to the same block model as Ind AS 23 (their legacy HTML checker buttons are not wired to the AI server).
- Library subjects other than FR are placeholders awaiting content.
- Keep all work local. Do not push to GitHub, deploy, or add CI unless explicitly requested later.

## Suggested Definition Of Done

- `npm run lint` passes in `app/`.
- `npm run build` passes in `app/`.
- `node --check server.mjs`, `node --check orchestrator.mjs`, `node --check config.mjs`, and `node --check prompts.mjs` pass in `ai-server/`.
- The PWA opens locally to a polished home screen, lets the owner navigate to Ind AS 23, and provides a usable AI affordance from chapter context.
- The app remains installable as a PWA without breaking local development.
