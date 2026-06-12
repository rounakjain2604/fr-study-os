// Shared AI tutor types and client helpers.

import type { ChapterAsset } from "../data/catalog";

export type AiMode = "explain" | "socratic" | "journal" | "exam" | "answer_check";

export type AiMessage = {
  role: "user" | "assistant" | "system";
  content: string;
  kind?: "error" | "info";
};

export type AiContext = {
  subject?: string;
  chapter?: string;
  unit?: string;
  section?: string;
  title?: string;
  question?: string;
  modelAnswer?: string;
  summary?: string;
  selection?: string;
  keyRules?: string[];
  traps?: string[];
  sourceFile?: string;
};

// A hosted AI server (e.g. Render) can be configured at runtime from the
// Vault, so the deployed PWA works away from the home machine.
export const AI_ENDPOINT_KEY = "fr45-ai-endpoint";

export const getCustomAiServer = (): string | null => {
  try {
    const value = localStorage.getItem(AI_ENDPOINT_KEY)?.trim();
    return value || null;
  } catch {
    return null;
  }
};

export const setCustomAiServer = (url: string) => {
  try {
    const trimmed = url.trim().replace(/\/+$/, "");
    if (trimmed) localStorage.setItem(AI_ENDPOINT_KEY, trimmed);
    else localStorage.removeItem(AI_ENDPOINT_KEY);
  } catch {
    // storage unavailable — setting is session-only
  }
};

export const resolveAiEndpoint = (): string | null => {
  const custom = getCustomAiServer();
  if (custom) {
    // Accept either a server base URL or a full endpoint path.
    return custom.endsWith("/api/ai-tutor") ? custom : `${custom}/api/ai-tutor`;
  }

  const local = ["localhost", "127.0.0.1", ""].includes(window.location.hostname);
  if (window.location.protocol === "file:" || (local && window.location.port !== "3721")) {
    return "http://127.0.0.1:3721/api/ai-tutor";
  }
  if (local) return "/api/ai-tutor";

  // Hosted statically (e.g. GitHub Pages) with no configured server.
  return null;
};

export type TutorReply = {
  answer: string;
  model?: string;
  provider?: string;
  latencyMs?: number;
};

export async function askTutor(payload: {
  mode: AiMode;
  userQuestion: string;
  context: AiContext | null;
  history: Array<{ role: string; content: string }>;
}): Promise<TutorReply> {
  const endpoint = resolveAiEndpoint();
  if (!endpoint) {
    throw new Error(
      "No AI server is configured for this device. Open Vault → AI server and paste your hosted server URL (e.g. https://your-app.onrender.com).",
    );
  }

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      getCustomAiServer()
        ? "Could not reach the configured AI server. Check the URL in Vault → AI server (free hosts can take ~1 minute to wake up — try again)."
        : "Could not reach the local AI server. Start it with `cd ai-server && npm start`, then try again.",
    );
  }

  let data: { answer?: string; model?: string; provider?: string; latencyMs?: number; error?: string };
  try {
    data = await response.json();
  } catch {
    throw new Error(`The AI server returned an unreadable response (HTTP ${response.status}).`);
  }

  if (!response.ok) {
    throw new Error(data.error || `AI request failed (HTTP ${response.status}). Check API keys in ai-server/.env.`);
  }

  return {
    answer: data.answer || "No answer returned.",
    model: data.model,
    provider: data.provider,
    latencyMs: data.latencyMs,
  };
}

export function chapterContext(chapter: ChapterAsset): AiContext {
  return {
    subject: chapter.subject,
    chapter: chapter.title,
    unit: chapter.unit,
    title: chapter.title,
    summary: chapter.summary,
    keyRules: chapter.sections.flatMap((section) => section.rules).slice(0, 10),
    traps: chapter.sections.flatMap((section) => section.traps).slice(0, 8),
    sourceFile: chapter.sourceFile,
  };
}

export const contextLabel = (context: AiContext | null) =>
  context
    ? [context.subject, context.chapter, context.unit, context.section].filter(Boolean).join(" · ")
    : "";
