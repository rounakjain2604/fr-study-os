import { memo, useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent, type ComponentType, type MutableRefObject } from "react";
import { Brain, Check, ChevronRight } from "lucide-react";
import type { CalculatorId, ChapterBlock, ChapterDoc, ChapterSection, ChapterTable, ConceptCard } from "../data/chapterDoc";
import { sectionPlainText } from "../data/chapterDoc";

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

const inr = (value: number) => `₹ ${Math.round(value).toLocaleString("en-IN")}`;

// All rich text rendered here comes from static local chapter data files.
function Rich({ className, html, as: Tag = "div" }: { className?: string; html: string; as?: "div" | "span" | "p" | "h3" | "li" }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export type SectionAiRequest = {
  sectionId: string;
  sectionTitle: string;
  summary: string;
};

// ── section progress (shares the legacy dashboard storage key) ──────────────

function useSectionProgress(storageKey: string, sectionIds: string[]) {
  const [done, setDone] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(window.localStorage.getItem(storageKey) || "{}") as Record<string, boolean>;
    } catch {
      return {};
    }
  });

  const toggle = useCallback(
    (sectionId: string) => {
      setDone((current) => {
        const next = { ...current, [sectionId]: !current[sectionId] };
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {
          // storage unavailable — progress stays in-memory
        }
        return next;
      });
    },
    [storageKey],
  );

  const { doneCount, pct } = useMemo(() => {
    const count = sectionIds.filter((id) => done[id]).length;
    return {
      doneCount: count,
      pct: sectionIds.length ? Math.round((count / sectionIds.length) * 100) : 0,
    };
  }, [done, sectionIds]);

  return { done, toggle, pct, doneCount };
}

// ── calculators ──────────────────────────────────────────────────────────────

function ResultLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="result-line">
      <Rich as="span" html={label} />
      <span className="num">{value}</span>
    </div>
  );
}

function ForexCalculator() {
  const [inputs, setInputs] = useState({ principal: "20000", rate: "5", opening: "45", closing: "48", localRate: "11" });
  const set = (key: keyof typeof inputs) => (event: ChangeEvent<HTMLInputElement>) =>
    setInputs((current) => ({ ...current, [key]: event.target.value }));

  const principal = Number(inputs.principal) || 0;
  const rate = (Number(inputs.rate) || 0) / 100;
  const opening = Number(inputs.opening) || 0;
  const closing = Number(inputs.closing) || 0;
  const localRate = (Number(inputs.localRate) || 0) / 100;

  const actualInterest = principal * rate * closing;
  const benchmark = principal * opening * localRate;
  const loss = principal * (closing - opening);
  const headroom = Math.max(0, benchmark - actualInterest);
  const eligible = loss > 0 ? Math.min(loss, headroom) : 0;
  const capitalise = actualInterest + eligible;
  const expense = Math.max(0, loss - eligible);

  return (
    <div className="calc">
      <h3>Forex eligibility calculator</h3>
      <p className="calc-sub">Pre-loaded with Illustration 6 — change anything.</p>
      <div className="calc-grid five">
        <label>FC principal<input inputMode="decimal" type="number" value={inputs.principal} onChange={set("principal")} /></label>
        <label>FC interest rate %<input inputMode="decimal" step="0.1" type="number" value={inputs.rate} onChange={set("rate")} /></label>
        <label>Opening rate ₹/FC<input inputMode="decimal" step="0.01" type="number" value={inputs.opening} onChange={set("opening")} /></label>
        <label>Closing rate ₹/FC<input inputMode="decimal" step="0.01" type="number" value={inputs.closing} onChange={set("closing")} /></label>
        <label>Functional ccy rate %<input inputMode="decimal" step="0.1" type="number" value={inputs.localRate} onChange={set("localRate")} /></label>
      </div>
      <ResultLine label="Actual FC interest (P × r × closing rate)" value={inr(actualInterest)} />
      <ResultLine label="Functional-currency benchmark (P × opening × local r)" value={inr(benchmark)} />
      <ResultLine label={`Exchange ${loss >= 0 ? "loss" : "gain"} on principal`} value={inr(Math.abs(loss))} />
      <ResultLine label="Headroom (benchmark − actual interest)" value={inr(headroom)} />
      <ResultLine label="Eligible exchange difference = min(loss, headroom)" value={inr(eligible)} />
      <div className="result-final"><span className="lab">Capitalise as borrowing cost</span><span className="num">{inr(capitalise)}</span></div>
      {expense > 0 ? (
        <div className="result-exp"><span className="lab">Expense to P&L (excess FX loss)</span><span className="num">{inr(expense)}</span></div>
      ) : null}
    </div>
  );
}

function CapRateCalculator() {
  const [inputs, setInputs] = useState({
    loanA: "1000000", rateA: "18", loanB: "3000000", rateB: "16",
    spend1: "500000", months1: "12", spend2: "2500000", months2: "3",
  });
  const set = (key: keyof typeof inputs) => (event: ChangeEvent<HTMLInputElement>) =>
    setInputs((current) => ({ ...current, [key]: event.target.value }));

  const loanA = Number(inputs.loanA) || 0;
  const rateA = (Number(inputs.rateA) || 0) / 100;
  const loanB = Number(inputs.loanB) || 0;
  const rateB = (Number(inputs.rateB) || 0) / 100;
  const spend1 = Number(inputs.spend1) || 0;
  const months1 = Math.min(12, Math.max(0, Number(inputs.months1) || 0));
  const spend2 = Number(inputs.spend2) || 0;
  const months2 = Math.min(12, Math.max(0, Number(inputs.months2) || 0));

  const totalBorrowings = loanA + loanB;
  const totalInterest = loanA * rateA + loanB * rateB;
  const rate = totalBorrowings ? totalInterest / totalBorrowings : 0;
  const cap1 = spend1 * rate * (months1 / 12);
  const cap2 = spend2 * rate * (months2 / 12);
  const raw = cap1 + cap2;
  const capped = Math.min(raw, totalInterest);

  return (
    <div className="calc">
      <h3>Capitalisation-rate calculator</h3>
      <p className="calc-sub">Two general borrowings + two expenditure tranches (months = period outstanding to year-end). Pre-loaded with Illustration 9.</p>
      <div className="calc-grid four">
        <label>Loan A amount<input inputMode="decimal" type="number" value={inputs.loanA} onChange={set("loanA")} /></label>
        <label>Loan A rate %<input inputMode="decimal" step="0.1" type="number" value={inputs.rateA} onChange={set("rateA")} /></label>
        <label>Loan B amount<input inputMode="decimal" type="number" value={inputs.loanB} onChange={set("loanB")} /></label>
        <label>Loan B rate %<input inputMode="decimal" step="0.1" type="number" value={inputs.rateB} onChange={set("rateB")} /></label>
        <label>Spend 1 amount<input inputMode="decimal" type="number" value={inputs.spend1} onChange={set("spend1")} /></label>
        <label>Spend 1 months<input inputMode="decimal" max="12" min="0" type="number" value={inputs.months1} onChange={set("months1")} /></label>
        <label>Spend 2 amount<input inputMode="decimal" type="number" value={inputs.spend2} onChange={set("spend2")} /></label>
        <label>Spend 2 months<input inputMode="decimal" max="12" min="0" type="number" value={inputs.months2} onChange={set("months2")} /></label>
      </div>
      <ResultLine label="Actual interest on general pool (the ceiling)" value={inr(totalInterest)} />
      <ResultLine label="Capitalisation rate (weighted average)" value={`${(rate * 100).toFixed(3)}%`} />
      <ResultLine label={`Spend 1: ${inr(spend1)} × rate × ${months1}/12`} value={inr(cap1)} />
      <ResultLine label={`Spend 2: ${inr(spend2)} × rate × ${months2}/12`} value={inr(cap2)} />
      <div className="result-final">
        <span className="lab">Borrowing cost capitalised{raw > totalInterest ? " (capped at actual)" : ""}</span>
        <span className="num">{inr(capped)}</span>
      </div>
    </div>
  );
}

function CommencementCalculator() {
  const [dates, setDates] = useState({ expenditure: "2001-06-19", borrowing: "2001-05-15", activities: "2001-06-02" });
  const set = (key: keyof typeof dates) => (event: ChangeEvent<HTMLInputElement>) =>
    setDates((current) => ({ ...current, [key]: event.target.value }));

  const entries: Array<[string, string]> = [
    ["Expenditure incurred", dates.expenditure],
    ["Borrowing costs incurred", dates.borrowing],
    ["Necessary activities undertaken", dates.activities],
  ];
  const allSet = entries.every(([, value]) => value);
  const latest = allSet
    ? entries.reduce((winner, entry) => (entry[1] > winner[1] ? entry : winner))
    : null;
  const formatted = latest
    ? new Date(`${latest[1]}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "";

  return (
    <div className="calc">
      <h3>Commencement-date checker</h3>
      <p className="calc-sub">Pre-loaded with Illustration 10. The answer is always the latest date.</p>
      <div className="calc-grid one">
        <label>(a) Expenditure incurred from<input type="date" value={dates.expenditure} onChange={set("expenditure")} /></label>
        <label>(b) Borrowing costs incurred from<input type="date" value={dates.borrowing} onChange={set("borrowing")} /></label>
        <label>(c) Necessary activities undertaken from<input type="date" value={dates.activities} onChange={set("activities")} /></label>
      </div>
      {latest ? (
        <div className="result-final">
          <span className="lab">Commencement date — condition met last: {latest[0].toLowerCase()}</span>
          <span className="num">{formatted}</span>
        </div>
      ) : null}
    </div>
  );
}

const calculators: Record<CalculatorId, ComponentType> = {
  forex: ForexCalculator,
  capRate: CapRateCalculator,
  commencement: CommencementCalculator,
};

// ── interactive study blocks ─────────────────────────────────────────────────

function FlipCard({ label, question, answer }: { label: string; question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button className={cx("flip", open && "open")} type="button" onClick={() => setOpen((value) => !value)}>
      <span className="flip-q"><span className="fno">{label}</span><Rich as="span" html={question} /></span>
      {open ? <Rich className="flip-a" html={answer} /> : <span className="flip-hint">tap to reveal</span>}
    </button>
  );
}

function DrillBlock({
  items,
  yesLabel = "Capitalise ✓",
  noLabel = "Don't capitalise ✗",
}: {
  items: Array<{ prompt: string; capitalise: boolean; why: string }>;
  yesLabel?: string;
  noLabel?: string;
}) {
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean; why: string } | null>(null);

  const current = items[index];
  const isLast = index >= items.length - 1;

  const answer = (choice: boolean) => {
    if (feedback) return;
    const correct = choice === current.capitalise;
    setScore((value) => value + (correct ? 1 : 0));
    setAnswered((value) => value + 1);
    setFeedback({ correct, why: current.why });
  };

  const restart = () => {
    setIndex(0);
    setAnswered(0);
    setScore(0);
    setFeedback(null);
  };

  return (
    <div className="drill-box">
      <div className="kicker">Scenario {index + 1} / {items.length}</div>
      <div className="drill-q">{current.prompt}</div>
      <div className="drill-btns">
        <button className="btn bcap" disabled={!!feedback} type="button" onClick={() => answer(true)}>{yesLabel}</button>
        <button className="btn bexp" disabled={!!feedback} type="button" onClick={() => answer(false)}>{noLabel}</button>
      </div>
      <div aria-live="polite" className="drill-fb">
        {feedback ? (
          <>
            <span className={feedback.correct ? "ok" : "no"}>{feedback.correct ? "Correct." : "Not quite."}</span> {feedback.why}
            {isLast ? (
              <p className="drill-final">
                Drill complete — {score}/{items.length}. {score === items.length ? "Flawless. The judgement calls are yours." : `Re-run it until ${items.length}/${items.length} feels boring.`}
              </p>
            ) : null}
          </>
        ) : null}
      </div>
      <div className="drill-score">Score {score} / {answered}</div>
      {feedback && !isLast ? (
        <button className="btn ghost" type="button" onClick={() => { setIndex((value) => value + 1); setFeedback(null); }}>
          Next scenario →
        </button>
      ) : null}
      {feedback && isLast ? (
        <button className="btn ghost" type="button" onClick={restart}>Restart drill ↺</button>
      ) : null}
    </div>
  );
}

function TykBlock({ items, onAskAi }: {
  items: Array<{ ref: string; title: string; question: string; solution: string }>;
  onAskAi?: (item: { ref: string; title: string; question: string; solution: string }) => void;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  return (
    <div className="tyk-list">
      {items.map((item) => (
        <article className={cx("acc", open[item.ref] && "open")} key={item.ref}>
          <button className="acc-h" type="button" onClick={() => setOpen((current) => ({ ...current, [item.ref]: !current[item.ref] }))}>
            <span className="qn">{item.ref}</span>
            <span className="qt">{item.title}</span>
            <ChevronRight className="chev" size={15} />
          </button>
          {open[item.ref] ? (
            <div className="acc-b">
              <Rich as="p" html={item.question} />
              <div className="soln">
                <div className="soln-tag">ICAI solution</div>
                <Rich html={item.solution} />
              </div>
              {onAskAi ? (
                <button className="btn ghost small" type="button" onClick={() => onAskAi(item)}>
                  <Brain size={14} /> Ask AI about this question
                </button>
              ) : null}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function QuizBlock({ items }: { items: Array<{ question: string; options: string[]; answer: number; why: string }> }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  if (index >= items.length) {
    const pct = Math.round((score / items.length) * 100);
    return (
      <div className="quiz-shell quiz-done">
        <div className="big">{score} / {items.length}</div>
        <p>
          {pct >= 90
            ? "Exam-ready on concepts. Now hammer the TYK practicals on paper."
            : pct >= 70
              ? "Solid base — revisit the sections behind your misses, then re-run."
              : "Go back through the map section-by-section, then retake. Mastery is repetition."}
        </p>
        <button className="btn bcap" type="button" onClick={() => { setIndex(0); setScore(0); setPicked(null); }}>
          Retake quiz ↺
        </button>
      </div>
    );
  }

  const current = items[index];
  const locked = picked !== null;

  const pick = (option: number) => {
    if (locked) return;
    setPicked(option);
    if (option === current.answer) setScore((value) => value + 1);
  };

  return (
    <div className="quiz-shell">
      <div className="q-meta"><span>Question {index + 1} of {items.length}</span><span>Score {score}</span></div>
      <div className="q-text">{current.question}</div>
      <div className="q-opts">
        {current.options.map((option, optionIndex) => (
          <button
            className={cx(
              "q-opt",
              locked && optionIndex === current.answer && "correct",
              locked && optionIndex === picked && picked !== current.answer && "wrong",
              locked && optionIndex !== current.answer && optionIndex !== picked && "dim",
            )}
            disabled={locked}
            key={option}
            type="button"
            onClick={() => pick(optionIndex)}
          >
            <span className="ol">{"ABCD"[optionIndex]}</span>
            <span>{option}</span>
          </button>
        ))}
      </div>
      {locked ? <div className="q-expl"><b>Why:</b> {current.why}</div> : null}
      <div className="q-foot">
        <span className="q-score">{locked ? (picked === current.answer ? "Correct ✓" : "Noted — read the why.") : "Answer to continue"}</span>
        {locked ? (
          <button className="btn ghost" type="button" onClick={() => { setIndex((value) => value + 1); setPicked(null); }}>
            Next →
          </button>
        ) : null}
      </div>
    </div>
  );
}

// ── static blocks ────────────────────────────────────────────────────────────

function TableBlock({ table }: { table: ChapterTable }) {
  return (
    <table className="tbl">
      {table.columns ? (
        <thead>
          <tr>{table.columns.map((column, columnIndex) => <th key={`${column}-${columnIndex}`}>{column}</th>)}</tr>
        </thead>
      ) : null}
      <tbody>
        {table.rows.map((row, rowIndex) => (
          <tr className={cx(row.strong && "strong", row.tone && `tone-${row.tone}`)} key={rowIndex}>
            <td>
              {row.tone ? <span className={`tag ${row.tone}`}>{row.tone === "cap" ? "Capitalise" : "Expense"}</span> : null}{" "}
              <Rich as="span" html={row.label} />
            </td>
            {row.values.map((value, valueIndex) => (
              <td className="num" key={valueIndex}><Rich as="span" html={value} /></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CardBlock({ card }: { card: ConceptCard }) {
  return (
    <article className="concept-card">
      {card.tag ? <span className={cx("tag", card.tagTone ?? "ntr")}>{card.tag}</span> : null}
      <Rich as="h3" html={card.title} />
      {card.body ? <Rich as="p" className="card-body" html={card.body} /> : null}
      {card.bullets?.length ? (
        <ul className="tight">
          {card.bullets.map((bullet, bulletIndex) => <Rich as="li" html={bullet} key={bulletIndex} />)}
        </ul>
      ) : null}
      {card.table ? <TableBlock table={card.table} /> : null}
      {card.note ? <Rich className="note" html={card.note} /> : null}
      {card.trap ? <Rich className="trap" html={card.trap} /> : null}
    </article>
  );
}

function BlockRenderer({ block, onAskAiTyk }: { block: ChapterBlock; onAskAiTyk?: (item: { ref: string; title: string; question: string; solution: string }) => void }) {
  switch (block.kind) {
    case "cards":
      return (
        <div className={cx("block-grid", block.columns === 3 ? "cols-3" : "cols-2")}>
          {block.items.map((card, cardIndex) => <CardBlock card={card} key={cardIndex} />)}
        </div>
      );
    case "split":
      return (
        <div className="split">
          {[block.left, block.right].map((half, halfIndex) => (
            <div className={cx("half", halfIndex === 0 ? "capside" : "expside")} key={halfIndex}>
              <span className={cx("tag", half.tagTone)}>{half.tag}</span>
              <Rich className="big" html={half.title} />
              <Rich as="p" html={half.body} />
            </div>
          ))}
        </div>
      );
    case "note":
      return <Rich className="note" html={block.body} />;
    case "trap":
      return <Rich className="trap" html={block.body} />;
    case "formula":
      return (
        <div className="formula">
          {block.lines.map((line, lineIndex) => <Rich html={line} key={lineIndex} />)}
        </div>
      );
    case "flips":
      return (
        <div className="flip-wrap">
          {block.title ? <h3 className="flips-title">{block.title}</h3> : null}
          <div className="flips">
            {block.items.map((flip) => <FlipCard answer={flip.answer} key={flip.label + flip.question.slice(0, 24)} label={flip.label} question={flip.question} />)}
          </div>
        </div>
      );
    case "timeline":
      return (
        <div className="tline">
          {block.nodes.map((node) => (
            <div className="tl-node" key={node.phase}>
              <div className="ph">{node.phase}</div>
              <h4>{node.title}</h4>
              <Rich as="p" html={node.body} />
            </div>
          ))}
        </div>
      );
    case "bullets":
      return (
        <article className="concept-card">
          <ul className="tight">
            {block.items.map((item, itemIndex) => <Rich as="li" html={item} key={itemIndex} />)}
          </ul>
        </article>
      );
    case "calculator": {
      const Calculator = calculators[block.calc];
      return <Calculator />;
    }
    case "drill":
      return <DrillBlock items={block.items} noLabel={block.noLabel} yesLabel={block.yesLabel} />;
    case "tyk":
      return <TykBlock items={block.items} onAskAi={onAskAiTyk} />;
    case "quiz":
      return <QuizBlock items={block.items} />;
    default:
      return null;
  }
}

// ── chapter dashboard shell ──────────────────────────────────────────────────

type TykItem = { ref: string; title: string; question: string; solution: string };

// Memoised so scroll-driven active-section updates only re-render the nav bar,
// never the heavy block tree (flips, tables, calculators, quiz, TYK).
const DocSection = memo(function DocSection({
  section,
  isDone,
  refs,
  onToggleDone,
  onAskSection,
  onAskPractice,
}: {
  section: ChapterSection;
  isDone: boolean;
  refs: MutableRefObject<Record<string, HTMLElement | null>>;
  onToggleDone: (sectionId: string) => void;
  onAskSection: (section: ChapterSection) => void;
  onAskPractice: (item: TykItem) => void;
}) {
  return (
    <section
      className="doc-section"
      id={section.id}
      ref={(element) => {
        refs.current[section.id] = element;
      }}
    >
      <div className="sec-head">
        <span className="folio">{section.folio}</span>
        <h2>{section.title}</h2>
        <div className="sec-actions">
          <button className="btn ghost small" type="button" onClick={() => onAskSection(section)}>
            <Brain size={14} /> Ask AI
          </button>
          <button className={cx("done-btn", isDone && "on")} type="button" onClick={() => onToggleDone(section.id)}>
            {isDone ? "done ✓" : "mark done"}
          </button>
        </div>
      </div>
      {section.lede ? <Rich as="p" className="lede" html={section.lede} /> : null}
      <div className="doc-blocks">
        {section.blocks.map((block, blockIndex) => (
          <BlockRenderer block={block} key={blockIndex} onAskAiTyk={onAskPractice} />
        ))}
      </div>
    </section>
  );
});

export function ChapterDashboard({
  doc,
  onAskSection,
  onAskPractice,
}: {
  doc: ChapterDoc;
  onAskSection: (request: SectionAiRequest) => void;
  onAskPractice: (item: { ref: string; title: string; question: string; solution: string }) => void;
}) {
  const sectionIds = useMemo(() => doc.sections.map((section) => section.id), [doc]);
  const { done, toggle, pct, doneCount } = useSectionProgress(doc.storageKey, sectionIds);
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const id of sectionIds) {
      const element = sectionRefs.current[id];
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [sectionIds]);

  const scrollTo = (sectionId: string) => {
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const askSection = useCallback(
    (section: ChapterSection) =>
      onAskSection({ sectionId: section.id, sectionTitle: section.title, summary: sectionPlainText(section) }),
    [onAskSection],
  );

  return (
    <div className="chapter-doc">
      <div className="doc-hero">
        <div className="doc-hero-copy">
          <div className="kicker">{doc.kicker}</div>
          <Rich as="div" className="doc-hero-title" html={doc.heroTitle} />
          <Rich as="p" className="doc-strap" html={doc.heroStrap} />
          <div className="hero-stats">
            {doc.heroStats.map((stat) => (
              <div className="hstat" key={stat.label}>
                <div className="n">{stat.value}</div>
                <div className="l">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="doc-hero-panel">
          <div>
            <div className="panel-eyebrow">{doc.flow.eyebrow}</div>
            <div className="panel-title">{doc.flow.title}</div>
            <div className="flow-steps">
              {doc.flow.steps.map((step, stepIndex) => (
                <div className="flow-step" key={step.title}>
                  <span className="dot">{String(stepIndex + 1).padStart(2, "0")}</span>
                  <div>
                    <b>{step.title}</b>
                    <span>{step.body}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="panel-foot">{doc.flow.foot}</div>
        </div>
      </div>

      <div className="doc-nav-bar">
        <div className="doc-mastery">
          <span className="kicker">Mastery</span>
          <div className="mini-meter"><span style={{ width: `${pct}%` }} /></div>
          <b>{pct}%</b>
          <em>{doneCount}/{sectionIds.length} sections</em>
        </div>
        <div className="doc-nav">
          {doc.sections.map((section) => (
            <button
              className={cx(activeSection === section.id && "active", done[section.id] && "done")}
              key={section.id}
              type="button"
              onClick={() => scrollTo(section.id)}
            >
              <span className="fol">{section.folio}</span>
              {section.title}
              {done[section.id] ? <Check size={11} /> : null}
            </button>
          ))}
        </div>
      </div>

      {doc.sections.map((section) => (
        <DocSection
          isDone={!!done[section.id]}
          key={section.id}
          refs={sectionRefs}
          section={section}
          onAskPractice={onAskPractice}
          onAskSection={askSection}
          onToggleDone={toggle}
        />
      ))}

      <footer className="doc-footer">
        <Rich as="span" html={doc.footer} />
      </footer>
    </div>
  );
}
