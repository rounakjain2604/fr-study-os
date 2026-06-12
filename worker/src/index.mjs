// FR Study OS — Cloudflare Worker
// One always-on, free endpoint for everything the PWA needs away from home:
//   POST /api/ai-tutor  — multi-provider AI cascade (port of ai-server)
//   GET/PUT /api/sync   — whole-state device sync backed by Workers KV
//   GET /api/health     — provider/key status
//
// Secrets (set via `wrangler secret put`): GEMINI_API_KEY, GROQ_API_KEY,
// MISTRAL_API_KEY, OPENROUTER_API_KEY, SYNC_SECRET.
// Binding: SYNC_KV (Workers KV namespace).

// ── model cascade (mirrors ai-server/config.mjs) ─────────────────────────────

const MODEL_CASCADE = {
  gemini: [
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
    "gemini-flash-latest",
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
  ],
  groq: [
    "openai/gpt-oss-120b",
    "qwen/qwen3-32b",
    "openai/gpt-oss-20b",
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
    "groq/compound",
    "groq/compound-mini",
  ],
  mistral: ["mistral-large-latest", "mistral-small-latest"],
  openrouter: [
    "google/gemini-3.5-flash",
    "anthropic/claude-sonnet-4.5",
    "openai/gpt-5-mini",
    "meta-llama/llama-3.3-70b-instruct:free",
  ],
};

const PROVIDER_ORDER = ["gemini", "groq", "mistral", "openrouter"];

const TIMEOUTS = { gemini: 30_000, groq: 30_000, mistral: 30_000, openrouter: 45_000 };

// ── tutor prompt (mirrors ai-server/prompts.mjs) ─────────────────────────────

const TUTOR_SYSTEM_PROMPT = `You are an expert CA Final Financial Reporting tutor.
Use the selected chapter, dashboard, question, model answer, source note, and trap context when provided.
Do not invent ICAI facts outside the provided context; if a question needs confirmation from current ICAI material, say so.
When explaining a solution, preserve the dashboard's conclusion unless the student explicitly asks you to critique it.

FORMAT — your answer is rendered as Markdown in a study app, so:
- Keep it tight: answer the question first, then supporting reasoning. No long preambles.
- Use short bold lead-ins or ### headings only when the answer has multiple parts.
- Use bullet or numbered lists for steps and conditions; use Markdown tables for computations and journal entries.
- Bold the final figure or conclusion.
- Do not wrap the whole answer in a code block.`;

const cleanText = (value, maxLen = 8000) =>
  String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLen);

function buildTutorPrompt({ mode, userQuestion, context, history }) {
  const modeInstructions = {
    explain: "Explain step by step in simple CA Final exam language. Start with the principle, then apply it to the facts, then state the answer.",
    socratic: "Teach Socratically. Ask 3 short guided questions first, then give a compact answer key after the questions.",
    journal: "Focus on journal entry logic. Explain why each account is debited or credited and how measurement affects the entry.",
    exam: "Focus on exam traps, common mistakes, and a concise rule-memory hook.",
    answer_check: "Evaluate the student answer against the model answer. Award partial marks where deserved. List missing and incorrect points.",
  };

  let contextBlock;
  if (context) {
    contextBlock = `
Selected study context:
Subject: ${cleanText(context.subject)}
Chapter: ${cleanText(context.chapter)}
Unit: ${cleanText(context.unit)}
Section: ${cleanText(context.section)}
Title: ${cleanText(context.title)}
Topic: ${cleanText(context.topic)}
Selected text (the exact passage the student highlighted): ${cleanText(context.selection, 1200)}
Difficulty: ${cleanText(context.difficulty)}
Question: ${cleanText(context.question)}
Model answer / dashboard solution: ${cleanText(context.modelAnswer || context.solution)}
Summary: ${cleanText(context.summary)}
Key rules: ${cleanText(Array.isArray(context.keyRules) ? context.keyRules.join("; ") : context.keyRules)}
Traps: ${cleanText(Array.isArray(context.traps) ? context.traps.join("; ") : context.traps)}
Source reference: ${cleanText(context.sourceFile || context.sourceRef || context.source)}`;
  } else {
    contextBlock = "Selected study context: None. Answer cautiously from CA Final FR principles only.";
  }

  const historyBlock = Array.isArray(history)
    ? history.slice(-6).map((item) => `${item.role}: ${cleanText(item.content, 1200)}`).join("\n")
    : "";

  return `Mode: ${mode || "explain"}
Mode instruction: ${modeInstructions[mode] || modeInstructions.explain}

${contextBlock}

Recent tutor exchange:
${historyBlock || "None"}

Student question:
${cleanText(userQuestion)}`;
}

// ── providers (ports of ai-server/providers/*.mjs) ───────────────────────────

async function callGemini(env, systemPrompt, userPrompt, model) {
  const apiKey = env.GEMINI_API_KEY || env.GOOGLE_API_KEY;
  if (!apiKey) throw Object.assign(new Error("GEMINI_API_KEY is not set."), { status: 401 });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: userPrompt }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: { maxOutputTokens: 4096, temperature: 0.3 },
    }),
    signal: AbortSignal.timeout(TIMEOUTS.gemini),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw Object.assign(new Error(`Gemini ${res.status}: ${body.slice(0, 300)}`), { status: res.status });
  }
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  if (!text) throw new Error("Gemini returned empty response.");
  return { text, model, provider: "gemini" };
}

async function callOpenAiCompatible(provider, apiUrl, apiKey, systemPrompt, userPrompt, model, timeout) {
  if (!apiKey) throw Object.assign(new Error(`${provider} API key is not set.`), { status: 401 });

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 4096,
    }),
    signal: AbortSignal.timeout(timeout),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw Object.assign(new Error(`${provider} ${res.status}: ${body.slice(0, 300)}`), { status: res.status });
  }
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || "";
  if (!text) throw new Error(`${provider} returned empty response.`);
  return { text, model: data.model || model, provider };
}

const providerFns = {
  gemini: (env, sys, user, model) => callGemini(env, sys, user, model),
  groq: (env, sys, user, model) =>
    callOpenAiCompatible("groq", "https://api.groq.com/openai/v1/chat/completions", env.GROQ_API_KEY, sys, user, model, TIMEOUTS.groq),
  mistral: (env, sys, user, model) =>
    callOpenAiCompatible("mistral", "https://api.mistral.ai/v1/chat/completions", env.MISTRAL_API_KEY, sys, user, model, TIMEOUTS.mistral),
  openrouter: (env, sys, user, model) =>
    callOpenAiCompatible("openrouter", "https://openrouter.ai/api/v1/chat/completions", env.OPENROUTER_API_KEY, sys, user, model, TIMEOUTS.openrouter),
};

const providerHasKey = (env, name) =>
  name === "gemini" ? !!(env.GEMINI_API_KEY || env.GOOGLE_API_KEY) : !!env[`${name.toUpperCase()}_API_KEY`];

// ── orchestrator (port of ai-server/orchestrator.mjs, tutor mode) ────────────

// Per-isolate memory of models the APIs reported as unserved. Isolates are
// recycled by Cloudflare, so this is a soft cache — exactly like the
// process-lifetime cache in ai-server.
const unavailableModels = new Set();

const MODEL_NOT_FOUND_RE =
  /not[ _]found|does not exist|unknown model|invalid model|model_not_found|decommissioned|deprecated|no such model|is not supported/i;

const isModelUnavailableError = (err) =>
  err.status === 404 || ([400, 422].includes(err.status || 0) && MODEL_NOT_FOUND_RE.test(err.message || ""));

const isProviderAuthError = (err) => [401, 403].includes(err.status || 0);

async function orchestrate(env, systemPrompt, userPrompt) {
  const fallbacksTried = [];
  const startTime = Date.now();

  for (const providerName of PROVIDER_ORDER) {
    if (!providerHasKey(env, providerName)) {
      fallbacksTried.push({ provider: providerName, error: "API key not set", skipped: true });
      continue;
    }

    for (const model of MODEL_CASCADE[providerName]) {
      const modelKey = `${providerName}:${model}`;
      if (unavailableModels.has(modelKey)) continue;

      try {
        const result = await providerFns[providerName](env, systemPrompt, userPrompt, model);
        return {
          success: true,
          provider: result.provider,
          model: result.model,
          answer: result.text,
          fallbacksTried,
          latencyMs: Date.now() - startTime,
        };
      } catch (err) {
        fallbacksTried.push({
          provider: providerName,
          model,
          error: (err.message || "Unknown error").slice(0, 200),
          status: err.status || null,
        });
        if (isModelUnavailableError(err)) {
          unavailableModels.add(modelKey);
          continue;
        }
        if (isProviderAuthError(err)) break;
        // rate limits, timeouts, 5xx: fall through to next model/provider
      }
    }
  }

  return {
    success: false,
    error: "All AI providers failed. Check the API keys configured on the worker.",
    fallbacksTried,
    latencyMs: Date.now() - startTime,
  };
}

// ── sync API ─────────────────────────────────────────────────────────────────

const SYNC_KEY = "state:v1";
const MAX_SYNC_BYTES = 4_000_000;

const syncAuthorized = (request, env) => {
  if (!env.SYNC_SECRET) return false;
  const header = request.headers.get("Authorization") || "";
  return header === `Bearer ${env.SYNC_SECRET}`;
};

async function handleSyncGet(env) {
  const stored = await env.SYNC_KV.get(SYNC_KEY, "json");
  if (!stored) return json({ updatedAt: null, data: null }, 200);
  return json(stored, 200);
}

async function handleSyncPut(request, env) {
  const raw = await request.text();
  if (raw.length > MAX_SYNC_BYTES) return json({ error: "Payload too large." }, 413);

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid JSON." }, 400);
  }
  if (!body || typeof body !== "object" || typeof body.data !== "object" || body.data === null) {
    return json({ error: "Body must be { parentUpdatedAt, data }." }, 400);
  }

  const stored = await env.SYNC_KV.get(SYNC_KEY, "json");
  const serverUpdatedAt = stored?.updatedAt ?? null;
  const parent = body.parentUpdatedAt ?? null;

  // Optimistic concurrency: writing over a version you haven't seen returns
  // the server copy so the client can resolve (newer side wins, then retry).
  if (serverUpdatedAt && parent !== serverUpdatedAt && !body.force) {
    return json({ conflict: true, updatedAt: serverUpdatedAt, data: stored.data }, 409);
  }

  const next = { updatedAt: new Date().toISOString(), data: body.data };
  await env.SYNC_KV.put(SYNC_KEY, JSON.stringify(next));
  return json({ updatedAt: next.updatedAt }, 200);
}

// ── HTTP plumbing ────────────────────────────────────────────────────────────

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

const json = (payload, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (url.pathname === "/api/health" && request.method === "GET") {
      return json({
        status: "ok",
        providers: Object.fromEntries(
          PROVIDER_ORDER.map((name) => [name, { keySet: providerHasKey(env, name), models: MODEL_CASCADE[name] }]),
        ),
        sync: { configured: !!env.SYNC_SECRET, kvBound: !!env.SYNC_KV },
        unavailableModels: [...unavailableModels],
      });
    }

    if (url.pathname === "/api/ai-tutor" && request.method === "POST") {
      // The AI endpoint spends the owner's provider quota, so it is gated by
      // the same passphrase as sync — a leaked URL alone is useless.
      if (!syncAuthorized(request, env)) {
        return json({ error: "Unauthorized — set the sync passphrase in Vault → Cloud connection." }, 401);
      }

      let payload;
      try {
        payload = await request.json();
      } catch {
        return json({ error: "Invalid JSON body." }, 400);
      }

      const userPrompt = buildTutorPrompt(payload);
      const result = await orchestrate(env, TUTOR_SYSTEM_PROMPT, userPrompt);

      if (result.success) {
        return json({
          answer: result.answer,
          model: result.model,
          provider: result.provider,
          fallbacksTried: result.fallbacksTried,
          latencyMs: result.latencyMs,
        });
      }
      return json({ error: result.error, fallbacksTried: result.fallbacksTried }, 502);
    }

    if (url.pathname === "/api/sync") {
      if (!syncAuthorized(request, env)) return json({ error: "Unauthorized." }, 401);
      if (!env.SYNC_KV) return json({ error: "Sync storage not configured." }, 500);
      if (request.method === "GET") return handleSyncGet(env);
      if (request.method === "PUT") return handleSyncPut(request, env);
      return json({ error: "Method not allowed." }, 405);
    }

    return json({ error: "Not found." }, 404);
  },
};
