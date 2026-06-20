# Trinsic

Trinsic is a personal CA Final study environment: native chapter workspaces with drills, quizzes and calculators, spaced-repetition recall cards, a sprint ledger with analytics, and an AI tutor — packaged as an installable, offline-capable PWA.

**Current live app:** https://rounakjain2604.github.io/fr-study-os/

## Use it on your phone

1. Open the live URL above in Chrome (Android) or Safari (iOS).
2. Android: menu (⋮) → **Add to Home screen** / **Install app**. iOS: Share → **Add to Home Screen**.
3. It launches full-screen like a native app and works offline after the first load.

All study data (ledger, cards, mastery, AI chats) lives **on the device** in local storage. To move data between devices, use **Vault → Download backup file** on one device and **Restore from file** on the other.

## Cloud: AI tutor + cross-device sync (Cloudflare Worker)

The chapters, cards, ledger and analytics are fully standalone. One free Cloudflare Worker ([`worker/`](worker/)) adds the rest — the AI tutor everywhere (no cold starts, unlike free Render/Heroku-style hosts) and automatic progress sync between phone and desktop.

One-time deploy (free Cloudflare account, no card):

```bash
cd worker
npm install
npx wrangler login                          # opens browser approval
npx wrangler kv namespace create SYNC_KV    # paste the returned id into wrangler.toml
npx wrangler secret put GEMINI_API_KEY      # repeat for GROQ_API_KEY, MISTRAL_API_KEY,
npx wrangler secret put SYNC_SECRET         # OPENROUTER_API_KEY; SYNC_SECRET = passphrase you invent
npm run deploy                              # → https://trinsic-api.<you>.workers.dev if you deploy under that worker name
```

Then on **each device**: open the app → **Vault → Cloud connection** → paste the Worker URL + your sync passphrase → Save. From then on the device pulls the latest state on open, pushes edits in the background, and shows a "Cloud synced" indicator in the rail. AI questions route through the same Worker.

Sync model: the whole state (ledger, cards, mastery, AI chats) is mirrored as one document; the newer side wins, fresh installs adopt the cloud copy. Local dev keeps working with zero config (`worker`: `npm run dev` serves an offline emulator on port 8787; secrets go in a gitignored `.dev.vars`).

`render.yaml` remains as an alternative if you ever prefer hosting `ai-server/` on Render instead.

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
| `app/` | The Trinsic PWA (Vite + React + TypeScript). Chapter content lives in `app/src/data/chapters/`. |
| `ai-server/` | Express server with a multi-provider AI cascade (Gemini → Groq → Mistral → OpenRouter). |
| `render.yaml` | One-click Render blueprint for hosting `ai-server`. |
| `.github/workflows/deploy.yml` | Builds `app/` and deploys it to GitHub Pages on every push to `main`. |
| `reference/` | Legacy standalone dashboards the design system grew out of. |
| `docs/` | Project context notes. |

ICAI study-material source texts are intentionally **not** in this repository (see `.gitignore`); chapter content in the app is authored study material referencing them.

## Deployment

Every push to `main` triggers the GitHub Actions workflow, which builds the app and publishes it to GitHub Pages. The service worker picks up new versions automatically on the next visit.
