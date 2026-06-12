// Persistent AI tutor conversations, stored locally beside the ledger state.

import type { AiContext, AiMessage, AiMode } from "./ai";

export const AI_THREADS_KEY = "fr45-ai-threads-v1";

const MAX_THREADS = 30;
const MAX_MESSAGES_PER_THREAD = 80;

export type AiThread = {
  id: string;
  title: string;
  mode: AiMode;
  context: AiContext | null;
  messages: AiMessage[];
  createdAt: string;
  updatedAt: string;
};

const uid = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`);

export const threadTitleFrom = (question: string) => {
  const compact = question.replace(/\s+/g, " ").trim();
  return compact.length > 64 ? `${compact.slice(0, 64)}…` : compact || "New conversation";
};

export const createThread = (question: string, mode: AiMode, context: AiContext | null): AiThread => {
  const now = new Date().toISOString();
  return {
    id: uid(),
    title: threadTitleFrom(question),
    mode,
    context,
    messages: [],
    createdAt: now,
    updatedAt: now,
  };
};

const isMessage = (value: unknown): value is AiMessage =>
  typeof value === "object" &&
  value !== null &&
  ["user", "assistant", "system"].includes((value as AiMessage).role) &&
  typeof (value as AiMessage).content === "string";

export const loadAiThreads = (): AiThread[] => {
  try {
    const raw = localStorage.getItem(AI_THREADS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((entry): entry is AiThread => {
        if (typeof entry !== "object" || entry === null) return false;
        const thread = entry as AiThread;
        return typeof thread.id === "string" && typeof thread.title === "string" && Array.isArray(thread.messages);
      })
      .map((thread) => ({
        ...thread,
        mode: thread.mode || "explain",
        context: thread.context ?? null,
        messages: thread.messages.filter(isMessage),
      }))
      .slice(0, MAX_THREADS);
  } catch {
    return [];
  }
};

export const saveAiThreads = (threads: AiThread[]) => {
  try {
    const bounded = threads.slice(0, MAX_THREADS).map((thread) => ({
      ...thread,
      messages: thread.messages.slice(-MAX_MESSAGES_PER_THREAD),
    }));
    localStorage.setItem(AI_THREADS_KEY, JSON.stringify(bounded));
  } catch {
    // storage full or unavailable — conversation stays in memory for the session
  }
};
