// ai-server/providers/gemini.mjs
// Google Gemini API client — REST generateContent endpoint.

import { MODELS, TIMEOUTS } from '../config.mjs';

/**
 * Call the Gemini API.
 * @param {string} systemPrompt
 * @param {string} userPrompt
 * @returns {Promise<{text: string, model: string, provider: string}>}
 */
export async function callGemini(systemPrompt, userPrompt, options = {}) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set.');

  const model = options.model || MODELS.gemini;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const generationConfig = {
    maxOutputTokens: 4096,
    temperature: 0.3,
  };

  if (options.requireJson) {
    generationConfig.responseMimeType = 'application/json';
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        { parts: [{ text: userPrompt }] },
      ],
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      generationConfig,
    }),
    signal: AbortSignal.timeout(TIMEOUTS.gemini),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    const err = new Error(`Gemini ${res.status}: ${body.slice(0, 300)}`);
    err.status = res.status;
    throw err;
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  if (!text) throw new Error('Gemini returned empty response.');

  return { text, model, provider: 'gemini' };
}
