import { useMemo, useState, type FormEvent } from "react";
import { Check, Layers, Plus, RotateCcw, Trash2 } from "lucide-react";
import {
  buildQueue,
  deckStats,
  deriveChapterCards,
  gradePreview,
  userCardToFlashcard,
  MISTAKE_DECK_ID,
  type CardGrade,
  type Flashcard,
  type ProgressMap,
  type UserCard,
} from "../lib/flashcards";

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

const GRADE_LABEL: Record<CardGrade, string> = { again: "Again", hard: "Hard", good: "Good", easy: "Easy" };
const GRADES: CardGrade[] = ["again", "hard", "good", "easy"];

export function CardsView({
  userCards,
  progress,
  onAddUserCard,
  onRemoveUserCard,
  onGrade,
  onResetProgress,
}: {
  userCards: UserCard[];
  progress: ProgressMap;
  onAddUserCard: (front: string, back: string) => void;
  onRemoveUserCard: (cardId: string) => void;
  onGrade: (cardId: string, grade: CardGrade) => void;
  onResetProgress: () => void;
}) {
  const [deckFilter, setDeckFilter] = useState<string>("all");
  const [revealed, setRevealed] = useState(false);
  const [reviewedThisSession, setReviewedThisSession] = useState(0);
  const [draft, setDraft] = useState({ front: "", back: "" });

  const chapterCards = useMemo(deriveChapterCards, []);
  const allCards = useMemo(
    () => [...chapterCards, ...userCards.map(userCardToFlashcard)],
    [chapterCards, userCards],
  );

  const decks = useMemo(() => {
    const seen = new Map<string, string>();
    for (const card of allCards) if (!seen.has(card.deckId)) seen.set(card.deckId, card.deckLabel);
    return [...seen.entries()].map(([id, label]) => ({ id, label }));
  }, [allCards]);

  const visibleCards = useMemo(
    () => (deckFilter === "all" ? allCards : allCards.filter((card) => card.deckId === deckFilter)),
    [allCards, deckFilter],
  );

  const stats = useMemo(() => deckStats(visibleCards, progress), [visibleCards, progress]);
  const queue = useMemo(() => buildQueue(visibleCards, progress), [visibleCards, progress]);
  const current: Flashcard | undefined = queue[0];
  const previews = useMemo(() => (current ? gradePreview(progress[current.id]) : null), [current, progress]);

  const grade = (cardGrade: CardGrade) => {
    if (!current) return;
    onGrade(current.id, cardGrade);
    setRevealed(false);
    setReviewedThisSession((count) => count + 1);
  };

  const submitDraft = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.front.trim() || !draft.back.trim()) return;
    onAddUserCard(draft.front, draft.back);
    setDraft({ front: "", back: "" });
  };

  return (
    <div className="cards-stage">
      <section className="ledger-panel wide">
        <div className="cards-topline">
          <div>
            <div className="section-kicker">Spaced repetition</div>
            <h2>
              {stats.dueCount} due · {stats.newCount} new
            </h2>
            <p className="subline">
              {stats.total} cards in view · {stats.learnedCount} scheduled ahead · {reviewedThisSession} reviewed this sitting
            </p>
          </div>
          <button
            className="quiet-action danger"
            type="button"
            onClick={() => window.confirm("Reset all card scheduling? The deck itself is kept.") && onResetProgress()}
          >
            <RotateCcw size={15} />
            <span>Reset scheduling</span>
          </button>
        </div>

        <div className="deck-chips" role="tablist" aria-label="Deck filter">
          <button
            aria-selected={deckFilter === "all"}
            className={cx("deck-chip", deckFilter === "all" && "active")}
            role="tab"
            type="button"
            onClick={() => setDeckFilter("all")}
          >
            All decks
          </button>
          {decks.map((deck) => (
            <button
              aria-selected={deckFilter === deck.id}
              className={cx("deck-chip", deckFilter === deck.id && "active")}
              key={deck.id}
              role="tab"
              type="button"
              onClick={() => setDeckFilter(deck.id)}
            >
              {deck.label}
            </button>
          ))}
        </div>

        {current ? (
          <div className="review-card">
            <div className="review-meta">
              <span className="tag ntr">{current.deckLabel}</span>
              <span className="mono-note">{current.source === "mistake" ? "your card" : current.source}</span>
            </div>
            <div className="review-front">{current.front}</div>
            {revealed ? (
              <>
                <div className="review-back">{current.back}</div>
                <div className="grade-row">
                  {GRADES.map((cardGrade) => (
                    <button
                      className={cx("grade-btn", cardGrade)}
                      key={cardGrade}
                      type="button"
                      onClick={() => grade(cardGrade)}
                    >
                      <b>{GRADE_LABEL[cardGrade]}</b>
                      <span>{previews?.[cardGrade]}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <button className="primary-action reveal-btn" type="button" onClick={() => setRevealed(true)}>
                <Layers size={16} />
                <span>Show answer</span>
              </button>
            )}
            {current.source === "mistake" ? (
              <button
                className="quiet-action danger small-remove"
                type="button"
                onClick={() => onRemoveUserCard(current.id.replace(/^user:/, ""))}
              >
                <Trash2 size={14} />
                <span>Delete this card</span>
              </button>
            ) : null}
          </div>
        ) : (
          <div className="review-card done">
            <Check size={28} />
            <h3>All caught up</h3>
            <p>
              Nothing is due in this deck. New cards appear here as chapters go native, and graded cards return on their
              schedule.
            </p>
          </div>
        )}
      </section>

      <section className="ledger-panel">
        <div className="section-kicker">Add your own card</div>
        <h2>Custom recall</h2>
        <form className="card-form" onSubmit={submitDraft}>
          <label className="field-stack">
            <span>Front — the prompt</span>
            <textarea
              placeholder="e.g. When does capitalisation of borrowing costs cease?"
              value={draft.front}
              onChange={(event) => setDraft((value) => ({ ...value, front: event.target.value }))}
            />
          </label>
          <label className="field-stack">
            <span>Back — the answer you must recall</span>
            <textarea
              placeholder="When the asset is substantially ready for its intended use or sale."
              value={draft.back}
              onChange={(event) => setDraft((value) => ({ ...value, back: event.target.value }))}
            />
          </label>
          <button className="primary-action" disabled={!draft.front.trim() || !draft.back.trim()} type="submit">
            <Plus size={16} />
            <span>Add to mistake deck</span>
          </button>
        </form>

        {userCards.length ? (
          <div className="stack-list user-card-list">
            <div className="section-kicker">Your cards · {userCards.length}</div>
            {userCards.map((card) => (
              <article className="ledger-list-item" key={card.id}>
                <span>{MISTAKE_DECK_ID}</span>
                <h3>{card.front}</h3>
                <p>{card.back}</p>
                <button type="button" onClick={() => onRemoveUserCard(card.id)}>
                  Remove
                </button>
              </article>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
