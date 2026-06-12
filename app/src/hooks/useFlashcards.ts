import { useEffect, useMemo, useState } from "react";
import {
  deckStats,
  deriveChapterCards,
  gradeCard,
  loadCardProgress,
  loadUserCards,
  makeUserCard,
  saveCardProgress,
  saveUserCards,
  userCardToFlashcard,
  type CardGrade,
  type ProgressMap,
  type UserCard,
} from "../lib/flashcards";

export const useFlashcards = () => {
  const [userCards, setUserCards] = useState<UserCard[]>(() => loadUserCards());
  const [progress, setProgress] = useState<ProgressMap>(() => loadCardProgress());

  useEffect(() => {
    saveUserCards(userCards);
  }, [userCards]);

  useEffect(() => {
    saveCardProgress(progress);
  }, [progress]);

  const chapterCards = useMemo(deriveChapterCards, []);
  const allCards = useMemo(() => [...chapterCards, ...userCards.map(userCardToFlashcard)], [chapterCards, userCards]);
  const stats = useMemo(() => deckStats(allCards, progress), [allCards, progress]);

  const addUserCard = (front: string, back: string, sourceMistakeId?: string) => {
    if (!front.trim() || !back.trim()) return;
    setUserCards((cards) => [makeUserCard(front, back, sourceMistakeId), ...cards]);
  };

  const removeUserCard = (cardId: string) => {
    setUserCards((cards) => cards.filter((card) => card.id !== cardId));
    setProgress((current) => {
      const next = { ...current };
      delete next[`user:${cardId}`];
      return next;
    });
  };

  const grade = (cardId: string, cardGrade: CardGrade) => {
    setProgress((current) => ({ ...current, [cardId]: gradeCard(current[cardId], cardGrade) }));
  };

  const resetProgress = () => setProgress({});

  const hasCardForMistake = (mistakeId: string) => userCards.some((card) => card.sourceMistakeId === mistakeId);

  return { userCards, progress, stats, addUserCard, removeUserCard, grade, resetProgress, hasCardForMistake };
};
