import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  DIFFICULTY_LABEL,
  DIFFICULTY_ORDER,
  FR_SYLLABUS,
  frSyllabusTotals,
  type Difficulty,
  type SyllabusUnit,
} from "../data/frSyllabus";

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

type SortMode = "syllabus" | "difficulty" | "time";

function DifficultyDots({ level }: { level: Difficulty }) {
  const filled = level === "high" ? 3 : level === "mid" ? 2 : 1;
  return (
    <span className={cx("dots", level)} aria-label={DIFFICULTY_LABEL[level]} title={DIFFICULTY_LABEL[level]}>
      {[0, 1, 2].map((index) => (
        <i className={cx(index < filled && "on")} key={index} />
      ))}
    </span>
  );
}

function UnitRow({ unit, chapterTitle, onSelectChapter }: { unit: SyllabusUnit; chapterTitle?: string; onSelectChapter: (chapterId: string) => void }) {
  const live = !!unit.liveChapterId;
  const Tag = live ? "button" : "div";
  return (
    <Tag
      className={cx("syl-row", live && "live")}
      {...(live ? { type: "button" as const, onClick: () => onSelectChapter(unit.liveChapterId!) } : {})}
    >
      <span className="syl-folio">{unit.folio}</span>
      <span className="syl-title">
        {unit.title}
        {chapterTitle ? <em>{chapterTitle}</em> : null}
        {unit.standards ? <span className="syl-std">{unit.standards}</span> : null}
      </span>
      <DifficultyDots level={unit.difficulty} />
      <span className="syl-hours">{unit.hours}h</span>
      <span className="syl-open">{live ? <ArrowRight size={13} /> : null}</span>
    </Tag>
  );
}

export function SyllabusLedger({ onSelectChapter }: { onSelectChapter: (chapterId: string) => void }) {
  const [sort, setSort] = useState<SortMode>("syllabus");
  const totals = useMemo(frSyllabusTotals, []);

  const flatUnits = useMemo(() => {
    if (sort === "syllabus") return null;
    const units = FR_SYLLABUS.flatMap((chapter) => chapter.units.map((unit) => ({ unit, chapterTitle: chapter.title })));
    units.sort((a, b) =>
      sort === "time"
        ? b.unit.hours - a.unit.hours
        : DIFFICULTY_ORDER[a.unit.difficulty] - DIFFICULTY_ORDER[b.unit.difficulty] || b.unit.hours - a.unit.hours,
    );
    return units;
  }, [sort]);

  return (
    <section className="syllabus-ledger">
      <div className="syl-head">
        <div className="syl-totals">
          <span><b>{totals.chapters}</b> chapters</span>
          <span><b>{totals.units}</b> units</span>
          <span><b>{totals.hours}h</b> est. first pass</span>
          <span className="syl-mix">
            <i className="dot high" /> {totals.byDifficulty.high} heavy
            <i className="dot mid" /> {totals.byDifficulty.mid} core
            <i className="dot low" /> {totals.byDifficulty.low} light
          </span>
        </div>
        <div className="syl-sort" role="tablist" aria-label="Sort syllabus">
          {(["syllabus", "difficulty", "time"] as SortMode[]).map((mode) => (
            <button
              aria-selected={sort === mode}
              className={cx(sort === mode && "active")}
              key={mode}
              role="tab"
              type="button"
              onClick={() => setSort(mode)}
            >
              {mode === "syllabus" ? "order" : mode}
            </button>
          ))}
        </div>
      </div>

      {flatUnits ? (
        <div className="syl-rows">
          {flatUnits.map(({ unit, chapterTitle }) => (
            <UnitRow chapterTitle={chapterTitle} key={unit.id} unit={unit} onSelectChapter={onSelectChapter} />
          ))}
        </div>
      ) : (
        FR_SYLLABUS.map((chapter) => (
          <div className="syl-chapter" key={chapter.chapter}>
            <div className="syl-chapter-head">
              <span className="syl-folio">Ch {chapter.chapter}</span>
              <span className="syl-chapter-title">{chapter.title}</span>
              <span className="syl-hours">{chapter.units.reduce((sum, unit) => sum + unit.hours, 0)}h</span>
            </div>
            <div className="syl-rows">
              {chapter.units.map((unit) => (
                <UnitRow key={unit.id} unit={unit} onSelectChapter={onSelectChapter} />
              ))}
            </div>
          </div>
        ))
      )}

      <p className="syl-note">Hours and weights are personal planning estimates — tune them in <code>src/data/frSyllabus.ts</code>. Rows with an arrow open their live workspace.</p>
    </section>
  );
}
