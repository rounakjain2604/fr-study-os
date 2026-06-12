import type { LucideIcon } from "lucide-react";
import { BookOpen, CalendarDays, Compass, LibraryBig } from "lucide-react";
import { chapters } from "../data/catalog";
import { FR_SYLLABUS } from "../data/frSyllabus";
import { ALL_DAYS } from "../data/schedule";

export type PaletteCommand = {
  id: string;
  group: "Go to" | "Chapters" | "Syllabus" | "Study days";
  icon: LucideIcon;
  label: string;
  hint?: string;
  keywords: string;
  run: () => void;
};

export const buildPaletteCommands = ({
  sections,
  onNavigate,
  onSelectChapter,
  onSelectDay,
}: {
  sections: Array<{ id: string; label: string }>;
  onNavigate: (sectionId: string) => void;
  onSelectChapter: (chapterId: string) => void;
  onSelectDay: (dayId: string) => void;
}): PaletteCommand[] => {
  const commands: PaletteCommand[] = sections.map((section) => ({
    id: `go-${section.id}`,
    group: "Go to",
    icon: Compass,
    label: section.label,
    keywords: `${section.label} ${section.id}`.toLowerCase(),
    run: () => onNavigate(section.id),
  }));

  for (const chapter of chapters) {
    commands.push({
      id: `chapter-${chapter.id}`,
      group: "Chapters",
      icon: BookOpen,
      label: `${chapter.title} · ${chapter.subtitle}`,
      hint: chapter.status,
      keywords: `${chapter.title} ${chapter.subtitle} ${chapter.tags.join(" ")} ${chapter.unit}`.toLowerCase(),
      run: () => onSelectChapter(chapter.id),
    });
  }

  for (const sylChapter of FR_SYLLABUS) {
    for (const unit of sylChapter.units) {
      commands.push({
        id: `syl-${unit.id}`,
        group: "Syllabus",
        icon: LibraryBig,
        label: `${unit.folio} ${unit.title}`,
        hint: unit.standards ?? `${unit.hours}h`,
        keywords: `${unit.title} ${unit.standards ?? ""} ${sylChapter.title}`.toLowerCase(),
        run: () => (unit.liveChapterId ? onSelectChapter(unit.liveChapterId) : onNavigate("library")),
      });
    }
  }

  for (const studyDay of ALL_DAYS) {
    commands.push({
      id: `day-${studyDay.id}`,
      group: "Study days",
      icon: CalendarDays,
      label: `D${studyDay.dayNumber} · ${studyDay.topic}`,
      hint: studyDay.displayDate,
      keywords: `d${studyDay.dayNumber} ${studyDay.topic} ${studyDay.displayDate}`.toLowerCase(),
      run: () => onSelectDay(studyDay.id),
    });
  }

  return commands;
};
