// ai-server/server.mjs
// Express server with multi-provider AI fallback for CA Final dashboard.

import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { PORT, HOST, MODEL_CASCADE, MODELS, PROVIDER_ORDER } from './config.mjs';
import { orchestrate, getUnavailableModels } from './orchestrator.mjs';
import { SYSTEM_PROMPT, TUTOR_SYSTEM_PROMPT, buildUserPrompt, buildTutorPrompt } from './prompts.mjs';
import { cacheGet, cacheSet, cacheStats } from './cache.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const app = express();

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: '150kb' }));

// CORS — allow local file:// and localhost development
app.use((req, res, next) => {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Request logging (no sensitive data)
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  }
  next();
});

// ── POST /api/ai — Structured Answer Checker ────────────────────────────────
app.post('/api/ai', async (req, res) => {
  try {
    const payload = req.body;

    if (!payload.question && !payload.studentAnswer) {
      return res.status(400).json({
        success: false,
        error: 'Request must include at least "question" or "studentAnswer".',
      });
    }

    // Check cache
    const cached = cacheGet(payload);
    if (cached) {
      console.log('[Cache] Hit');
      return res.json({ ...cached, cached: true });
    }

    const userPrompt = buildUserPrompt(payload);
    const result = await orchestrate(SYSTEM_PROMPT, userPrompt, payload.mode || 'answer_check', true);

    if (result.success) {
      cacheSet(payload, result);
    }

    const statusCode = result.success ? 200 : 502;
    return res.status(statusCode).json(result);
  } catch (err) {
    console.error('[/api/ai] Error:', err.message);
    return res.status(500).json({
      success: false,
      error: err.message || 'Internal server error.',
    });
  }
});

// ── POST /api/ai-tutor — Backward-compatible tutor endpoint ─────────────────
app.post('/api/ai-tutor', async (req, res) => {
  try {
    const payload = req.body;
    const userPrompt = buildTutorPrompt(payload);
    const result = await orchestrate(TUTOR_SYSTEM_PROMPT, userPrompt, payload.mode || 'explain', false);

    if (result.success) {
      return res.json({
        answer: result.answer,
        model: result.model,
        provider: result.provider,
        fallbacksTried: result.fallbacksTried,
        latencyMs: result.latencyMs,
      });
    }

    return res.status(502).json({
      error: result.error || 'All AI providers failed.',
      fallbacksTried: result.fallbacksTried,
    });
  } catch (err) {
    console.error('[/api/ai-tutor] Error:', err.message);
    return res.status(500).json({ error: err.message || 'Internal server error.' });
  }
});

// ── GET /api/health — Server & provider status ──────────────────────────────
app.get('/api/health', (req, res) => {
  const providers = {};
  for (const name of PROVIDER_ORDER) {
    const keyMap = {
      groq: 'GROQ_API_KEY',
      gemini: 'GEMINI_API_KEY',
      mistral: 'MISTRAL_API_KEY',
      openrouter: 'OPENROUTER_API_KEY',
    };
    providers[name] = {
      model: MODELS[name],
      models: MODEL_CASCADE[name] || [],
      keySet: !!(process.env[keyMap[name]] || (name === 'gemini' && process.env.GOOGLE_API_KEY)),
    };
  }

  res.json({
    status: 'ok',
    uptime: Math.round(process.uptime()),
    providers,
    cache: cacheStats(),
    providerOrder: PROVIDER_ORDER,
    unavailableModels: getUnavailableModels(),
  });
});

// ── Static file serving (serve dashboard files from parent directory) ────────
app.use(express.static(ROOT, {
  extensions: ['html'],
  index: 'ind_as_109_unit2_dashboard.html',
}));

// ── Start server ────────────────────────────────────────────────────────────
app.listen(PORT, HOST, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║  Trinsic AI Proxy Server                                    ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log(`  → Server:   http://${HOST}:${PORT}`);
  console.log(`  → Dashboard: http://${HOST}:${PORT}/ind_as_109_unit2_dashboard.html`);
  console.log(`  → Health:   http://${HOST}:${PORT}/api/health`);
  console.log('');
  console.log('  Provider Status:');
  for (const name of PROVIDER_ORDER) {
    const keyMap = { groq: 'GROQ_API_KEY', gemini: 'GEMINI_API_KEY', mistral: 'MISTRAL_API_KEY', openrouter: 'OPENROUTER_API_KEY' };
    const hasKey = !!(process.env[keyMap[name]] || (name === 'gemini' && process.env.GOOGLE_API_KEY));
    console.log(`    ${hasKey ? '✓' : '✗'} ${name.padEnd(12)} → ${MODELS[name]}${hasKey ? '' : '  (key missing)'}`);
  }
  console.log('');
});
