# FR Study OS

A personal CA Final **Financial Reporting** study environment: native chapter workspaces with drills, quizzes and calculators, spaced-repetition recall cards, a 45-day study ledger with analytics, and an AI tutor — packaged as an installable, offline-capable PWA.

**Live app:** https://rounakjain2604.github.io/fr-study-os/

## Use it on your phone

1. Open the live URL above in Chrome (Android) or Safari (iOS).
2. Android: menu (⋮) → **Add to Home screen** / **Install app**. iOS: Share → **Add to Home Screen**.
3. It launches full-screen like a native app and works offline after the first load.

All study data (ledger, cards, mastery, AI chats) lives **on the device** in local storage. To move data between devices, use **Vault → Download backup file** on one device and **Restore from file** on the other.

## AI tutor away from your PC

The chapters, cards, ledger and analytics are fully standalone. The AI tutor needs the `ai-server/` backend running somewhere with your API keys:

1. Sign up at [render.com](https://render.com) (free tier is enough).
2. **New + → Blueprint**, connect this repo. Render reads [`render.yaml`](render.yaml) and prompts for the API keys (`GEMINI_API_KEY`, `GROQ_API_KEY`, `MISTRAL_API_KEY`, `OPENROUTER_API_KEY`) — copy them from your local `ai-server/.env`. Keys live only in Render, never in the repo.
3. When the service is live, copy its URL (e.g. `https://fr-study-os-ai.onrender.com`).
4. In the app on your phone: **Vault → AI server**, paste the URL, Save.

Note: Render's free tier sleeps after inactivity — the first AI question after a break can take ~a minute while it wakes.

## Local development

```bash
# Web app (Vite + React) — http://localhost:5173
cd app && npm install && npm run dev

# AI tutor server — http://127.0.0.1:3721
cd ai-server && npm install && npm start   # needs ai-server/.env with API keys (see .env.example)
```

In local dev the app talks to the local AI server automatically; no configuration needed.

## Repository layout

| Path | What it is |
|---|---|
| `app/` | The PWA (Vite + React + TypeScript). Chapter content lives in `app/src/data/chapters/`. |
| `ai-server/` | Express server with a multi-provider AI cascade (Gemini → Groq → Mistral → OpenRouter). |
| `render.yaml` | One-click Render blueprint for hosting `ai-server`. |
| `.github/workflows/deploy.yml` | Builds `app/` and deploys it to GitHub Pages on every push to `main`. |
| `reference/` | Legacy standalone dashboards the design system grew out of. |
| `docs/` | Project context notes. |

ICAI study-material source texts are intentionally **not** in this repository (see `.gitignore`); chapter content in the app is authored study material referencing them.

## Deployment

Every push to `main` triggers the GitHub Actions workflow, which builds the app and publishes it to GitHub Pages. The service worker picks up new versions automatically on the next visit.
