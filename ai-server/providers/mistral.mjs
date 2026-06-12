// ai-server/providers/mistral.mjs
// Mistral AI client — OpenAI-compatible chat completions endpoint.

import { MODELS, TIMEOUTS } from '../config.mjs';

const API_URL = 'https://api.mistral.ai/v1/chat/completions';

/**
 * Call the Mistral API.
 * @param {string} systemPrompt
 * @param {string} userPrompt
 * @returns {Promise<{text: string, model: string, provider: string}>}
 */
export async function callMistral(systemPrompt, userPrompt, options = {}) {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) throw new Error('MISTRAL_API_KEY is not set.');

  const requestBody = {
    model: options.model || MODELS.mistral,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.3,
    max_tokens: 4096,
  };

  if (options.requireJson) {
    requestBody.response_format = { type: 'json_object' };
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
    signal: AbortSignal.timeout(TIMEOUTS.mistral),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    const err = new Error(`Mistral ${res.status}: ${body.slice(0, 300)}`);
    err.status = res.status;
    throw err;
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || '';
  if (!text) throw new Error('Mistral returned empty response.');

  return { text, model: data.model || options.model || MODELS.mistral, provider: 'mistral' };
}
