// Spaced-repetition flashcards derived from chapter docs plus user-made cards.
// Deck content comes from the same local data files that render the chapter
// workspaces, so every future native chapter feeds the deck automatically.

import { chapters } from "../data/catalog";
import { richToPlain } from "../data/chapterDoc";
import { addDays, todayIso } from "./analytics";

export const USER_CARDS_KEY = "fr45-user-cards-v1";
export const CARD_PROGRESS_KEY = "fr45-card-progress-v1";

export type CardSource = "flip" | "quiz" | "drill" | "mistake";

export type Flashcard = {
  id: string;
  deckId: string;
  deckLabel: string;
  source: CardSource;
  front: string;
  back: string;
};

export type UserCard = {
  id: string;
  front: string;
  back: string;
  sourceMistakeId?: string;
  createdAt: string;
};

export type CardGrade = "again" | "hard" | "good" | "easy";

export type CardProgress = {
  reps: number;
  lapses: number;
  ease: number;
  intervalDays: number;
  dueIso: string;
  lastGradedIso: string;
};

export type ProgressMap = Record<string, CardProgress>;

const uid = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`);

// ── deck derivation ──────────────────────────────────────────────────────────

export const deriveChapterCards = (): Flashcard[] => {
  const cards: Flashcard[] = [];

  for (const chapter of chapters) {
    if (!chapter.doc) continue;
    const deckId = chapter.id;
    const deckLabel = `${chapter.title} · ${chapter.subtitle}`;

    for (const section of chapter.doc.sections) {
      section.blocks.forEach((block, blockIndex) => {
        if (block.kind === "flips") {
          block.items.forEach((flip, flipIndex) => {
            cards.push({
              id: `${deckId}:${section.id}:b${blockIndex}:flip${flipIndex}`,
              deckId,
              deckLabel,
              source: "flip",
              front: richToPlain(flip.question),
              back: richToPlain(flip.answer),
            });
          });
        } else if (block.kind === "quiz") {
          block.items.forEach((quiz, quizIndex) => {
            cards.push({
              id: `${deckId}:${section.id}:b${blockIndex}:quiz${quizIndex}`,
              deckId,
              deckLabel,
              source: "quiz",
              front: quiz.question,
              back: `${quiz.options[quiz.answer]} — ${quiz.why}`,
            });
          });
        } else if (block.kind === "drill") {
          block.items.forEach((drill, drillIndex) => {
            cards.push({
              id: `${deckId}:${section.id}:b${blockIndex}:drill${drillIndex}`,
              deckId,
              deckLabel,
              source: "drill",
              front: `${drill.prompt}\n\nCapitalise or expense?`,
              back: `${drill.capitalise ? "Capitalise." : "Don't capitalise — expense it."} ${drill.why}`,
            });
          });
        }
      });
    }
  }

  return cards;
};

export const MISTAKE_DECK_ID = "mistakes";

export const userCardToFlashcard = (card: UserCard): Flashcard => ({
  id: `user:${card.id}`,
  deckId: MISTAKE_DECK_ID,
  deckLabel: "Mistake cards",
  source: "mistake",
  front: card.front,
  back: card.back,
});

// ── user cards storage ───────────────────────────────────────────────────────

export const loadUserCards = (): UserCard[] => {
  try {
    const raw = localStorage.getItem(USER_CARDS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry): entry is UserCard =>
        typeof entry === "object" &&
        entry !== null &&
        typeof (entry as UserCard).id === "string" &&
        typeof (entry as UserCard).front === "string" &&
        typeof (entry as UserCard).back === "string",
    );
  } catch {
    return [];
  }
};

export const saveUserCards = (cards: UserCard[]) => {
  try {
    localStorage.setItem(USER_CARDS_KEY, JSON.stringify(cards));
  } catch {
    // storage unavailable — cards stay in memory
  }
};

export const makeUserCard = (front: string, back: string, sourceMistakeId?: string): UserCard => ({
  id: uid(),
  front: front.trim(),
  back: back.trim(),
  sourceMistakeId,
  createdAt: new Date().toISOString(),
});

// ── progress storage ─────────────────────────────────────────────────────────

export const loadCardProgress = (): ProgressMap => {
  try {
    const raw = localStorage.getItem(CARD_PROGRESS_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return {};
    return parsed as ProgressMap;
  } catch {
    return {};
  }
};

export const saveCardProgress = (progress: ProgressMap) => {
  try {
    localStorage.setItem(CARD_PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // storage unavailable — progress stays in memory
  }
};

// ── scheduler (SM-2 lite) ────────────────────────────────────────────────────

const clampEase = (ease: number) => Math.min(3, Math.max(1.3, ease));

export const gradeCard = (current: CardProgress | undefined, grade: CardGrade, currentIso = todayIso()): CardProgress => {
  const base: CardProgress = current ?? {
    reps: 0,
    lapses: 0,
    ease: 2.5,
    intervalDays: 0,
    dueIso: currentIso,
    lastGradedIso: currentIso,
  };

  let { ease, intervalDays, lapses } = base;
  const reps = base.reps + 1;

  if (grade === "again") {
    lapses += 1;
    ease = clampEase(ease - 0.2);
    intervalDays = 0;
  } else if (grade === "hard") {
    ease = clampEase(ease - 0.15);
    intervalDays = Math.max(1, Math.round(intervalDays * 1.2)) || 1;
  } else if (grade === "good") {
    intervalDays = intervalDays < 1 ? 1 : Math.round(intervalDays * ease);
  } else {
    ease = clampEase(ease + 0.15);
    intervalDays = intervalDays < 1 ? 3 : Math.round(intervalDays * ease * 1.3);
  }

  intervalDays = Math.min(intervalDays, 365);

  return {
    reps,
    lapses,
    ease,
    intervalDays,
    dueIso: addDays(currentIso, intervalDays),
    lastGradedIso: currentIso,
  };
};

// Preview of the interval each grade would produce, for button hints.
export const gradePreview = (current: CardProgress | undefined, currentIso = todayIso()): Record<CardGrade, string> => {
  const describe = (grade: CardGrade) => {
    const next = gradeCard(current, grade, currentIso);
    if (next.intervalDays <= 0) return "today";
    if (next.intervalDays === 1) return "1d";
    return `${next.intervalDays}d`;
  };

  return { again: describe("again"), hard: describe("hard"), good: describe("good"), easy: describe("easy") };
};

// ── queue building ───────────────────────────────────────────────────────────

export type DeckStats = {
  total: number;
  newCount: number;
  dueCount: number;
  learnedCount: number;
};

export const isDue = (progress: CardProgress | undefined, currentIso = todayIso()) =>
  !!progress && progress.dueIso <= currentIso;

export const buildQueue = (cards: Flashcard[], progress: ProgressMap, currentIso = todayIso()): Flashcard[] => {
  const due = cards.filter((card) => isDue(progress[card.id], currentIso));
  const fresh = cards.filter((card) => !progress[card.id]);
  // Due reviews first (oldest due date first), then new cards in deck order.
  due.sort((left, right) => (progress[left.id]?.dueIso ?? "").localeCompare(progress[right.id]?.dueIso ?? ""));
  return [...due, ...fresh];
};

export const deckStats = (cards: Flashcard[], progress: ProgressMap, currentIso = todayIso()): DeckStats => {
  let newCount = 0;
  let dueCount = 0;
  let learnedCount = 0;

  for (const card of cards) {
    const entry = progress[card.id];
    if (!entry) newCount += 1;
    else if (entry.dueIso <= currentIso) dueCount += 1;
    else learnedCount += 1;
  }

  return { total: cards.length, newCount, dueCount, learnedCount };
};
