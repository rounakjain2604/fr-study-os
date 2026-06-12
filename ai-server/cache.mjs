// ai-server/cache.mjs
// Simple in-memory cache with TTL for identical AI requests.

import crypto from 'node:crypto';
import { CACHE_TTL_MS } from './config.mjs';

const store = new Map();

/** Generate a deterministic hash from the request payload. */
function makeKey(payload) {
  const seed = JSON.stringify({
    mode: payload.mode,
    question: payload.question,
    studentAnswer: payload.studentAnswer,
    modelAnswer: payload.modelAnswer,
    topic: payload.topic,
  });
  return crypto.createHash('sha256').update(seed).digest('hex').slice(0, 24);
}

/** Get cached response, or null if expired / missing. */
export function cacheGet(payload) {
  const key = makeKey(payload);
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL_MS) {
    store.delete(key);
    return null;
  }
  return entry.data;
}

/** Store a response in cache. */
export function cacheSet(payload, data) {
  const key = makeKey(payload);
  store.set(key, { data, ts: Date.now() });
}

/** Return cache stats for /api/health. */
export function cacheStats() {
  return { size: store.size, ttlMs: CACHE_TTL_MS };
}
