# Prompt For Claude Code

You are working on a local-only handoff of my CA Final FR Study OS / FR Ledger PWA. Do not push to GitHub, do not deploy, do not add remote CI, and do not modify anything outside this folder unless I explicitly approve it.

## Goal

Transform this into a polished, comprehensive local PWA for my 45-day CA Final FR study workflow. It should feel like the polished `Ind_AS_23_Borrowing_Costs_Dashboard_polished.html` dashboard across the whole app, while improving the UX so the app opens to a proper home screen and lets me navigate into subjects, chapters, dashboards, ledger, revision, mocks, errors, vault, and AI help.

## What Is In This Bundle

- `app/`: The current Vite React PWA.
- `ai-server/`: Local AI tutor/evaluator server.
- `reference/legacy-dashboards/`: Standalone dashboard references, especially the polished Ind AS 23 dashboard.
- `reference/study-os-prototype/`: Older prototype for UX comparison.
- `docs/`: Project context.

## First Steps

1. Inspect the folder structure and read `README_HANDOFF.md`.
2. Run the PWA locally:
   ```powershell
   cd app
   npm install
   npm run dev -- --host 127.0.0.1 --port 5173
   ```
3. Run the AI server locally:
   ```powershell
   cd ai-server
   Copy-Item .env.example .env
   npm install
   npm start
   ```
4. Do not require real API keys for basic UI testing. If keys are missing, the app should degrade gracefully.

## Main Work

Please review and improve the code so the app works locally and feels cohesive.

Priorities:

1. Preserve the visual direction of `reference/legacy-dashboards/Ind_AS_23_Borrowing_Costs_Dashboard_polished.html` across the whole app.
2. Make the opening experience a proper home/dashboard screen instead of a haphazard direct ledger entry.
3. Make navigation clear and fast: Home, Library, Chapter Dashboard, Ledger, Analytics, Errors, Revision, Mocks, Vault, AI.
4. Make Ind AS 23 the best integrated chapter first. The user should be able to open it from the syllabus/library and see a sophisticated chapter dashboard.
5. Improve the "Ask AI" UX:
   - Chapter-aware prompts.
   - Selected-text or selected-section context if feasible.
   - Clean drawer/modal behavior.
   - Useful loading, error, and fallback states.
6. Keep the AI provider fallback order aligned with this preference:
   - Gemini 3.5 Flash
   - Gemini 3.1 Flash Lite
   - best available Groq model
   - best thinking/reasoning models available through configured providers
   - smaller/basic fallbacks
7. Validate provider model names in config defensively. Do not hard crash if an unavailable model is configured.
8. Fix broken local behavior in legacy dashboards if those files are still referenced by the app.
9. Review the service worker so local development does not get stale-cache problems, while the PWA can still auto-update in production later.
10. Keep the solution maintainable. Prefer structured React components and data catalogs over large ad hoc HTML blobs where practical.

## Quality Checks

Before finishing, run:

```powershell
cd app
npm run lint
npm run build
```

And in `ai-server/`:

```powershell
node --check server.mjs
node --check orchestrator.mjs
node --check config.mjs
node --check prompts.mjs
```

Then summarize:

- What you changed.
- What still needs API keys or owner decisions.
- Any remaining risks.
- Exact local commands to run the app.

Remember: local-only. No GitHub push, no deployment, no external upload.
