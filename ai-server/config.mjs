// ai-server/config.mjs
// Centralised configuration for server, provider priority, model cascades, and timeouts.

export const PORT = Number(process.env.PORT || 3721);
export const HOST = process.env.HOST || '127.0.0.1';

// Defensive model-name validation: provider model ids are slug-like
// (letters, digits, dot, dash, underscore, slash, colon). Anything else is
// almost certainly a typo or copy-paste artefact and would 404 every request.
const MODEL_NAME_RE = /^[A-Za-z0-9][\w.\/:-]*$/;

const csv = (value, fallback) =>
  String(value || fallback)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((model) => {
      if (MODEL_NAME_RE.test(model)) return true;
      console.warn(`[config] Ignoring invalid model name: "${model}"`);
      return false;
    });

// Owner's requested priority: Gemini 3.5 Flash → Gemini 3.1 Flash Lite →
// best Groq models (reasoning-capable first) → other thinking models →
// smaller/basic fallbacks. Known-good current Gemini names are appended
// after the requested ones so the cascade still answers if the requested
// names are not yet (or no longer) served by the API — they are skipped
// at runtime once the API reports them unavailable.
export const MODEL_CASCADE = {
  gemini: csv(
    process.env.GEMINI_MODELS || process.env.GEMINI_MODEL,
    [
      'gemini-3.5-flash',
      'gemini-3.1-flash-lite',
      'gemini-flash-latest',
      'gemini-2.5-flash',
      'gemini-2.5-flash-lite',
    ].join(','),
  ),
  groq: csv(
    process.env.GROQ_MODELS || process.env.GROQ_MODEL,
    [
      'openai/gpt-oss-120b',
      'qwen/qwen3-32b',
      'openai/gpt-oss-20b',
      'llama-3.3-70b-versatile',
      'llama-3.1-8b-instant',
      'groq/compound',
      'groq/compound-mini',
    ].join(','),
  ),
  mistral: csv(process.env.MISTRAL_MODELS || process.env.MISTRAL_MODEL, 'mistral-large-latest,mistral-small-latest'),
  openrouter: csv(
    process.env.OPENROUTER_MODELS || process.env.OPENROUTER_MODEL,
    'google/gemini-3.5-flash,anthropic/claude-sonnet-4.5,openai/gpt-5-mini,meta-llama/llama-3.3-70b-instruct:free',
  ),
};

// Backward-compatible first model per provider.
export const MODELS = Object.fromEntries(
  Object.entries(MODEL_CASCADE).map(([provider, models]) => [provider, models[0]]),
);

export const TIMEOUTS = {
  gemini: 30_000,
  groq: 30_000,
  mistral: 30_000,
  openrouter: 45_000,
};

export const PROVIDER_ORDER = ['gemini', 'groq', 'mistral', 'openrouter'];

export const CACHE_TTL_MS = 10 * 60 * 1000;
export const MAX_BODY_BYTES = 150_000;
