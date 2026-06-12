// ai-server/orchestrator.mjs
// Fallback orchestrator — tries providers in priority order with JSON validation & repair.

import { MODEL_CASCADE, PROVIDER_ORDER } from './config.mjs';
import { callGroq } from './providers/groq.mjs';
import { callGemini } from './providers/gemini.mjs';
import { callMistral } from './providers/mistral.mjs';
import { callOpenRouter } from './providers/openrouter.mjs';

const providerFns = {
  groq: callGroq,
  gemini: callGemini,
  mistral: callMistral,
  openrouter: callOpenRouter,
};

// ── JSON repair helpers ─────────────────────────────────────────────────────

/**
 * Attempt to parse text as JSON. If it fails, try common repairs once.
 * Returns parsed object or null.
 */
function tryParseJson(text) {
  // 1. Direct parse
  try {
    return JSON.parse(text);
  } catch { /* continue to repair */ }

  // 2. Strip markdown code fences: ```json ... ```
  let cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch { /* continue */ }

  // 3. Extract first { ... } or [ ... ] block
  const braceMatch = text.match(/\{[\s\S]*\}/);
  if (braceMatch) {
    try {
      return JSON.parse(braceMatch[0]);
    } catch { /* continue */ }
  }

  const bracketMatch = text.match(/\[[\s\S]*\]/);
  if (bracketMatch) {
    try {
      return JSON.parse(bracketMatch[0]);
    } catch { /* continue */ }
  }

  // 4. Try removing trailing commas before } or ]
  cleaned = text
    .replace(/,\s*([}\]])/g, '$1')
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch { /* give up */ }

  return null;
}

// ── error classification & model availability tracking ─────────────────────

// Models the provider API has told us it does not serve (404 / "model not
// found"). Remembered for the lifetime of the process so the desired-but-
// unavailable names in the cascade cost one failed call, not one per request.
const unavailableModels = new Set();

export const getUnavailableModels = () => [...unavailableModels];

const MODEL_NOT_FOUND_RE = /not[ _]found|does not exist|unknown model|invalid model|model_not_found|decommissioned|deprecated|no such model|is not supported/i;

function isModelUnavailableError(err) {
  const status = err.status || 0;
  if (status === 404) return true;
  if ((status === 400 || status === 422) && MODEL_NOT_FOUND_RE.test(err.message || '')) return true;
  return false;
}

// Auth errors are provider-wide: trying more models with the same bad key is
// pointless, so the orchestrator moves to the next provider.
const isProviderAuthError = (err) => [401, 403].includes(err.status || 0);

// ── Main orchestrator ───────────────────────────────────────────────────────

/**
 * Run the AI request through providers in fallback order.
 * @param {string} systemPrompt
 * @param {string} userPrompt
 * @param {string} mode - The request mode for response context
 * @param {boolean} requireJson - Whether to validate response as JSON
 * @returns {Promise<object>} Structured response
 */
export async function orchestrate(systemPrompt, userPrompt, mode = 'answer_check', requireJson = true) {
  const fallbacksTried = [];
  const startTime = Date.now();

  for (const providerName of PROVIDER_ORDER) {
    const callFn = providerFns[providerName];
    if (!callFn) continue;

    // Skip providers whose API key is not set (soft skip, not an error)
    const keyEnvMap = {
      groq: 'GROQ_API_KEY',
      gemini: process.env.GEMINI_API_KEY ? 'GEMINI_API_KEY' : 'GOOGLE_API_KEY',
      mistral: 'MISTRAL_API_KEY',
      openrouter: 'OPENROUTER_API_KEY',
    };
    const keyName = keyEnvMap[providerName];
    if (providerName !== 'gemini' && !process.env[keyName]) {
      fallbacksTried.push({ provider: providerName, error: `${keyName} not set`, skipped: true });
      continue;
    }
    if (providerName === 'gemini' && !process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
      fallbacksTried.push({ provider: 'gemini', error: 'GEMINI_API_KEY not set', skipped: true });
      continue;
    }

    const models = MODEL_CASCADE[providerName] || [];
    for (const requestedModel of models) {
      const modelKey = `${providerName}:${requestedModel}`;
      if (unavailableModels.has(modelKey)) {
        continue; // already confirmed unavailable this session
      }
      try {
        const providerStart = Date.now();
        const { text, model, provider } = await callFn(systemPrompt, userPrompt, {
          requireJson,
          model: requestedModel,
        });
        const providerLatency = Date.now() - providerStart;

        if (requireJson) {
          const parsed = tryParseJson(text);
          if (!parsed) {
            fallbacksTried.push({
              provider: providerName,
              model,
              error: 'Invalid JSON response',
              latencyMs: providerLatency,
            });
            continue; // try next model/provider
          }

          return {
            success: true,
            provider,
            model,
            mode,
            result: parsed,
            fallbacksTried,
            latencyMs: Date.now() - startTime,
          };
        }

        // Non-JSON mode (tutor)
        return {
          success: true,
          provider,
          model,
          mode,
          answer: text,
          fallbacksTried,
          latencyMs: Date.now() - startTime,
        };

      } catch (err) {
        const errMsg = err.message || 'Unknown error';
        console.error(`[Orchestrator] ${providerName}/${requestedModel} failed: ${errMsg}`);
        fallbacksTried.push({
          provider: providerName,
          model: requestedModel,
          error: errMsg.slice(0, 200),
          status: err.status || null,
        });

        if (isModelUnavailableError(err)) {
          unavailableModels.add(modelKey);
          console.warn(`[Orchestrator] Marking ${modelKey} unavailable for this session.`);
          continue; // next model in this provider's cascade
        }

        if (isProviderAuthError(err)) {
          break; // bad key — skip the rest of this provider's models
        }
        // rate limits, timeouts, 5xx, network errors: try the next model/provider
      }
    }
  }

  // All providers failed
  return {
    success: false,
    provider: null,
    model: null,
    mode,
    result: null,
    error: 'All AI providers failed. Check your API keys and network connection.',
    fallbacksTried,
    latencyMs: Date.now() - startTime,
  };
}
