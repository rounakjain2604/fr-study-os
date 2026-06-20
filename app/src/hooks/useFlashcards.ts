import { useCallback, useEffect, useMemo, useState } from "react";
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

  const userCardMistakeIds = useMemo(
    () => new Set(userCards.map((card) => card.sourceMistakeId).filter((id): id is string => !!id)),
    [userCards],
  );

  const addUserCard = useCallback((front: string, back: string, sourceMistakeId?: string) => {
    if (!front.trim() || !back.trim()) return;
    setUserCards((cards) => [makeUserCard(front, back, sourceMistakeId), ...cards]);
  }, []);

  const removeUserCard = useCallback((cardId: string) => {
    setUserCards((cards) => cards.filter((card) => card.id !== cardId));
    setProgress((current) => {
      const next = { ...current };
      delete next[`user:${cardId}`];
      return next;
    });
  }, []);

  const grade = useCallback((cardId: string, cardGrade: CardGrade) => {
    setProgress((current) => ({ ...current, [cardId]: gradeCard(current[cardId], cardGrade) }));
  }, []);

  const resetProgress = useCallback(() => setProgress({}), []);

  const hasCardForMistake = useCallback((mistakeId: string) => userCardMistakeIds.has(mistakeId), [userCardMistakeIds]);

  return { userCards, progress, stats, addUserCard, removeUserCard, grade, resetProgress, hasCardForMistake };
};
