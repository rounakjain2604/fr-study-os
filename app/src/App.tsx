import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  BarChart3,
  BookOpen,
  Brain,
  ClipboardList,
  Download,
  Flag,
  Gauge,
  Home,
  Layers,
  LibraryBig,
  Moon,
  Search,
  Sparkles,
  Sun,
} from "lucide-react";
import { ALL_DAYS, dayPlannedHours } from "./data/schedule";
import { chapters, subjects, workflowCards, type ChapterAsset } from "./data/catalog";
import { formatHours, getActiveDay } from "./lib/analytics";
import { useLedgerState } from "./hooks/useLedgerState";
import { useFlashcards } from "./hooks/useFlashcards";
import { askTutor, chapterContext, type AiContext, type AiMessage, type AiMode } from "./lib/ai";
import { createThread, loadAiThreads, saveAiThreads, type AiThread } from "./lib/aiThreads";
import { AiView } from "./components/AiView";
import { CardsView } from "./components/CardsView";
import { ChapterView } from "./components/ChapterView";
import { CommandPalette } from "./components/CommandPalette";
import { buildPaletteCommands } from "./lib/paletteCommands";
import { SyllabusLedger } from "./components/SyllabusLedger";
import {
  AnalyticsView,
  DataView,
  DayBookGrid,
  ErrorsView,
  MocksView,
  PhaseSections,
  RevisionView,
  TodayEntry,
} from "./components/LedgerViews";

type AppSection =
  | "home"
  | "library"
  | "chapter"
  | "ledger"
  | "analytics"
  | "errors"
  | "revision"
  | "cards"
  | "mocks"
  | "data"
  | "ai";

const sectionIds: AppSection[] = [
  "home",
  "library",
  "chapter",
  "ledger",
  "analytics",
  "errors",
  "revision",
  "cards",
  "mocks",
  "data",
  "ai",
];

const navItems: Array<{ id: AppSection; label: string; icon: typeof Home }> = [
  { id: "home", label: "Home", icon: Home },
  { id: "library", label: "Library", icon: LibraryBig },
  { id: "chapter", label: "Chapter", icon: BookOpen },
  { id: "ledger", label: "Ledger", icon: Gauge },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "errors", label: "Errors", icon: Search },
  { id: "revision", label: "Revision", icon: Flag },
  { id: "cards", label: "Cards", icon: Layers },
  { id: "mocks", label: "Mocks", icon: ClipboardList },
  { id: "data", label: "Vault", icon: Download },
  { id: "ai", label: "AI Tutor", icon: Brain },
];

const LAST_CHAPTER_KEY = "fr45-last-chapter";

// Hash routes: "#/<section>" plus the deep-linkable "#/chapter/<chapterId>".
const readHashRoute = (): { section: AppSection; chapterId?: string } => {
  const hash = window.location.hash.replace("#/", "");
  if (hash.startsWith("chapter/")) {
    const chapterId = hash.slice("chapter/".length);
    if (chapters.some((chapter) => chapter.id === chapterId)) return { section: "chapter", chapterId };
    return { section: "chapter" };
  }
  if (sectionIds.includes(hash as AppSection)) return { section: hash as AppSection };
  return { section: "home" };
};

const initialChapterId = () => {
  const fromHash = readHashRoute().chapterId;
  if (fromHash) return fromHash;
  try {
    const stored = localStorage.getItem(LAST_CHAPTER_KEY);
    if (stored && chapters.some((chapter) => chapter.id === stored)) return stored;
  } catch {
    // storage unavailable
  }
  return "fr-ind-as-23";
};

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

const idleAiStatus = "Local AI server · port 3721";

function App() {
  const { actions, burnUp, importError, ledgers, metrics, state, trialBalance } = useLedgerState();
  const flashcards = useFlashcards();
  const [activeSection, setActiveSection] = useState<AppSection>(() => readHashRoute().section);
  const [selectedChapterId, setSelectedChapterId] = useState(initialChapterId);
  const [selectedDayId, setSelectedDayId] = useState(() => getActiveDay(state).id);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiStatus, setAiStatus] = useState(idleAiStatus);
  const [aiContext, setAiContext] = useState<AiContext | null>(null);
  const [aiMode, setAiMode] = useState<AiMode>("explain");
  const [aiThreads, setAiThreads] = useState<AiThread[]>(() => loadAiThreads());
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [aiBusy, setAiBusy] = useState(false);

  const activeDay = useMemo(() => getActiveDay(state), [state]);
  const selectedDay = ALL_DAYS.find((studyDay) => studyDay.id === selectedDayId) ?? activeDay;
  const selectedLedger = ledgers.find((entry) => entry.dayId === selectedDay.id) ?? ledgers[0];
  const selectedChapter = chapters.find((chapter) => chapter.id === selectedChapterId) ?? chapters[0];
  const activeThread = aiThreads.find((thread) => thread.id === activeThreadId) ?? null;
  const aiMessages = activeThread?.messages ?? [];

  useEffect(() => {
    const onHashChange = () => {
      const route = readHashRoute();
      setActiveSection(route.section);
      if (route.chapterId) setSelectedChapterId(route.chapterId);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    setSelectedDayId(activeDay.id);
  }, [activeDay.id]);

  useEffect(() => {
    saveAiThreads(aiThreads);
  }, [aiThreads]);

  useEffect(() => {
    try {
      localStorage.setItem(LAST_CHAPTER_KEY, selectedChapterId);
    } catch {
      // storage unavailable
    }
  }, [selectedChapterId]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const changeSection = (section: AppSection) => {
    setActiveSection(section);
    window.location.hash = section === "chapter" ? `/chapter/${selectedChapterId}` : `/${section}`;
    // Instant, not smooth: a long smooth scroll fights the chapter view's
    // IntersectionObserver and re-renders the heavy doc tree every frame.
    window.scrollTo({ top: 0 });
  };

  const selectDay = (dayId: string) => {
    setSelectedDayId(dayId);
    changeSection("ledger");
    window.requestAnimationFrame(() =>
      document.getElementById("today-entry")?.scrollIntoView({ block: "start", behavior: "smooth" }),
    );
  };

  const selectChapter = (chapterId: string) => {
    setSelectedChapterId(chapterId);
    setActiveSection("chapter");
    window.location.hash = `/chapter/${chapterId}`;
    window.scrollTo({ top: 0 });
  };

  const openAi = (context?: AiContext) => {
    if (context) setAiContext(context);
    changeSection("ai");
  };

  const startNewChat = () => {
    setActiveThreadId(null);
    setAiInput("");
    setAiStatus(idleAiStatus);
  };

  const selectThread = (threadId: string) => {
    const thread = aiThreads.find((entry) => entry.id === threadId);
    if (!thread) return;
    setActiveThreadId(threadId);
    setAiContext(thread.context);
    setAiMode(thread.mode);
    setAiStatus(idleAiStatus);
  };

  const deleteThread = (threadId: string) => {
    setAiThreads((threads) => threads.filter((thread) => thread.id !== threadId));
    if (activeThreadId === threadId) startNewChat();
  };

  const appendToThread = (threadId: string, message: AiMessage, patch?: Partial<AiThread>) => {
    setAiThreads((threads) =>
      threads.map((thread) =>
        thread.id === threadId
          ? { ...thread, ...patch, messages: [...thread.messages, message], updatedAt: new Date().toISOString() }
          : thread,
      ),
    );
  };

  const askAi = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userQuestion = aiInput.trim();
    if (!userQuestion || aiBusy) return;

    let threadId = activeThreadId;
    if (!threadId || !aiThreads.some((thread) => thread.id === threadId)) {
      const thread = createThread(userQuestion, aiMode, aiContext);
      threadId = thread.id;
      setAiThreads((threads) => [thread, ...threads]);
      setActiveThreadId(threadId);
    }

    const nextHistory: AiMessage[] = [...aiMessages, { role: "user", content: userQuestion }];
    appendToThread(threadId, { role: "user", content: userQuestion }, { mode: aiMode, context: aiContext });
    setAiInput("");
    setAiBusy(true);
    setAiStatus("Thinking…");

    try {
      const reply = await askTutor({
        mode: aiMode,
        userQuestion,
        context: aiContext,
        history: nextHistory
          .filter((message) => message.role !== "system")
          .slice(-8)
          .map((message) => ({ role: message.role, content: message.content })),
      });
      appendToThread(threadId, { role: "assistant", content: reply.answer });
      setAiStatus(
        `Answered by ${reply.model || "AI"}${reply.provider ? ` via ${reply.provider}` : ""}${
          reply.latencyMs ? ` · ${(reply.latencyMs / 1000).toFixed(1)}s` : ""
        }`,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "AI tutor unavailable.";
      appendToThread(threadId, { role: "system", kind: "error", content: message });
      setAiStatus("Last request failed — fix the issue and ask again.");
    } finally {
      setAiBusy(false);
    }
  };

  const paletteCommands = useMemo(
    () =>
      buildPaletteCommands({
        sections: navItems.map((item) => ({ id: item.id, label: item.label })),
        onNavigate: (sectionId) => changeSection(sectionId as AppSection),
        onSelectChapter: selectChapter,
        onSelectDay: selectDay,
      }),
    // changeSection/selectChapter/selectDay read current state through refs to
    // setState, so rebuilding only when the selected chapter changes is enough.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedChapterId],
  );

  return (
    <div className="app-frame">
      <CommandPalette commands={paletteCommands} open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <aside className="side-rail">
        <div className="brand-block">
          <div className="brand">FR<br />Study <em>OS</em></div>
          <div className="brand-sub">CA Final · May 2027</div>
        </div>

        <button className="rail-search" type="button" onClick={() => setPaletteOpen(true)}>
          <Search size={14} />
          <span>Jump anywhere</span>
          <kbd>Ctrl K</kbd>
        </button>

        <div className="progress-wrap">
          <div className="progress-label">
            <span>45-day pace</span>
            <b>{metrics.progressPct}%</b>
          </div>
          <div className="progress-bar"><span style={{ width: `${Math.min(metrics.progressPct, 100)}%` }} /></div>
        </div>

        <nav className="nav-rail" aria-label="Primary">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={cx(activeSection === item.id && "active", item.id === "ai" && "ai-nav")}
                key={item.id}
                type="button"
                onClick={() => changeSection(item.id)}
              >
                <Icon size={15} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button className="theme-btn" type="button" onClick={actions.toggleTheme}>
          {state.theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          <span>{state.theme === "dark" ? "Light" : "Dark"} mode</span>
        </button>
      </aside>

      <main className="main-stage">
        <header className="topline">
          <div>
            <div className="kicker">Personal Study Environment</div>
            <h1>{pageTitle(activeSection, selectedChapter)}</h1>
            <p>{pageSubtitle(activeSection, selectedChapter)}</p>
          </div>
          <div className="top-actions">
            <button className="btn ghost" type="button" onClick={() => openAi(chapterContext(selectedChapter))}>
              <Brain size={16} />
              Ask AI
            </button>
            <button className="btn cap" type="button" onClick={() => changeSection("chapter")}>
              <BookOpen size={16} />
              Resume
            </button>
          </div>
        </header>

        {activeSection === "home" ? (
          <HomeView
            activeDayId={activeDay.id}
            cardsDue={flashcards.stats.dueCount + flashcards.stats.newCount}
            metrics={metrics}
            selectedChapter={selectedChapter}
            onOpenAi={openAi}
            onOpenCards={() => changeSection("cards")}
            onOpenLibrary={() => changeSection("library")}
            onSelectChapter={selectChapter}
            onSelectDay={selectDay}
          />
        ) : null}

        {activeSection === "library" ? <LibraryView selectedChapterId={selectedChapter.id} onSelectChapter={selectChapter} /> : null}

        {activeSection === "chapter" ? <ChapterView chapter={selectedChapter} onOpenAi={openAi} /> : null}

        {activeSection === "ledger" ? (
          <>
            <DayBookGrid ledgers={ledgers} selectedDayId={selectedDay.id} onSelectDay={selectDay} />
            <div id="today-entry">
              <TodayEntry actions={actions} ledger={selectedLedger} selectedDay={selectedDay} state={state} />
            </div>
            <PhaseSections ledgers={ledgers} state={state} onSelectDay={selectDay} />
          </>
        ) : null}

        {activeSection === "analytics" ? (
          <AnalyticsView burnUp={burnUp} ledgers={ledgers} metrics={metrics} trialBalance={trialBalance} />
        ) : null}

        {activeSection === "errors" ? (
          <ErrorsView
            actions={actions}
            hasCardForMistake={flashcards.hasCardForMistake}
            state={state}
            onMakeCard={(mistake, topic) =>
              flashcards.addUserCard(`${topic} — what must you fix here?`, mistake.text, mistake.id)
            }
          />
        ) : null}

        {activeSection === "revision" ? (
          <RevisionView actions={actions} ledgers={ledgers} state={state} onSelectDay={selectDay} />
        ) : null}

        {activeSection === "cards" ? (
          <CardsView
            progress={flashcards.progress}
            userCards={flashcards.userCards}
            onAddUserCard={flashcards.addUserCard}
            onGrade={flashcards.grade}
            onRemoveUserCard={flashcards.removeUserCard}
            onResetProgress={flashcards.resetProgress}
          />
        ) : null}

        {activeSection === "mocks" ? <MocksView actions={actions} attempts={state.mockAttempts} /> : null}

        {activeSection === "data" ? <DataView actions={actions} importError={importError} state={state} /> : null}

        {activeSection === "ai" ? (
          <AiView
            activeThreadId={activeThreadId}
            busy={aiBusy}
            context={aiContext}
            input={aiInput}
            messages={aiMessages}
            mode={aiMode}
            status={aiStatus}
            threads={aiThreads}
            onAsk={askAi}
            onChangeInput={setAiInput}
            onChangeMode={setAiMode}
            onClearContext={() => setAiContext(null)}
            onDeleteThread={deleteThread}
            onNewChat={startNewChat}
            onSelectThread={selectThread}
          />
        ) : null}
      </main>
    </div>
  );
}

function pageTitle(section: AppSection, chapter: ChapterAsset) {
  if (section === "home") return "Control Room";
  if (section === "library") return "Subject Library";
  if (section === "chapter") return chapter.title;
  if (section === "ledger") return "45-Day Ledger";
  if (section === "analytics") return "Ledger Analytics";
  if (section === "errors") return "Mistake Ledger";
  if (section === "revision") return "Revision Queue";
  if (section === "cards") return "Recall Cards";
  if (section === "mocks") return "Mock Tracker";
  if (section === "ai") return "AI Tutor";
  return "Data Vault";
}

function pageSubtitle(section: AppSection, chapter: ChapterAsset) {
  if (section === "chapter") return chapter.subtitle;
  if (section === "home") return "Open the day from one calm cockpit, then go where the work actually is.";
  if (section === "library") return "Every chapter should eventually be visible, searchable, and askable.";
  if (section === "cards") return "Chapter drills and your own mistakes come back exactly when forgetting starts.";
  if (section === "ai") return "Your question, your words. Chapter context rides along only when you attach it.";
  return "Progress, weak areas, mock work, and backup live beside the chapter workspaces.";
}

function HomeView({
  activeDayId,
  cardsDue,
  metrics,
  selectedChapter,
  onOpenAi,
  onOpenCards,
  onOpenLibrary,
  onSelectChapter,
  onSelectDay,
}: {
  activeDayId: string;
  cardsDue: number;
  metrics: { progressPct: number; totalActual: number; totalPlanned: number; varianceHours: number; daysRemaining: number };
  selectedChapter: ChapterAsset;
  onOpenAi: (context?: AiContext) => void;
  onOpenCards: () => void;
  onOpenLibrary: () => void;
  onSelectChapter: (chapterId: string) => void;
  onSelectDay: (dayId: string) => void;
}) {
  const todayPlan = ALL_DAYS.find((studyDay) => studyDay.id === activeDayId);

  return (
    <div className="home-stack">
      <section className="hero">
        <div>
          <div className="kicker">Today's command</div>
          <h2>
            Study inside one room. Track the day, open any chapter, and ask AI from the exact context.
          </h2>
          <p>
            The Ind AS 23 visual system drives the whole PWA: quiet paper, crisp ledgers, compact controls, and chapter-first navigation.
          </p>
          <div className="hero-actions">
            <button className="btn cap" type="button" onClick={() => onSelectChapter(selectedChapter.id)}>
              <BookOpen size={16} />
              Resume {selectedChapter.title}
            </button>
            <button className="btn ghost" type="button" onClick={onOpenLibrary}>
              <LibraryBig size={16} />
              Open Library
            </button>
            <button className="btn ghost" type="button" onClick={() => onOpenAi(chapterContext(selectedChapter))}>
              <Sparkles size={16} />
              Ask AI
            </button>
          </div>
        </div>
        <div className="hero-panel">
          <div>
            <span>Today on the plan</span>
            <strong>{todayPlan ? todayPlan.topic : "Plan complete"}</strong>
            <p>
              {todayPlan
                ? `D${todayPlan.dayNumber} · ${formatHours(dayPlannedHours(todayPlan))} planned · ${todayPlan.tasks.length} tasks`
                : "All 45 entries are posted. Move to revision and mocks."}
            </p>
          </div>
          {todayPlan ? (
            <button className="btn cap small" type="button" onClick={() => onSelectDay(todayPlan.id)}>
              <Gauge size={14} />
              Open today's entry
            </button>
          ) : null}
        </div>
      </section>

      <section className="metric-grid">
        <MetricCard label="Ledger posted" value={`${metrics.progressPct}%`} note={`${formatHours(metrics.totalActual)} of ${formatHours(metrics.totalPlanned)}`} />
        <MetricCard label="Variance" value={`${metrics.varianceHours >= 0 ? "+" : ""}${metrics.varianceHours.toFixed(1)}h`} note="Against the 45-day plan" />
        <MetricCard label="Days left" value={metrics.daysRemaining} note="To current target close" />
        <button className="metric-card as-button" type="button" onClick={onOpenCards}>
          <strong>{cardsDue}</strong>
          <span>Cards waiting</span>
          <p>Due reviews + new cards</p>
        </button>
      </section>

      <section className="chapter-strip">
        <div className="sec-head">
          <span className="folio">Live</span>
          <h2>Chapter boards</h2>
        </div>
        <div className="chapter-grid">
          {chapters.slice(0, 3).map((chapter) => (
            <ChapterCard chapter={chapter} key={chapter.id} onSelectChapter={onSelectChapter} />
          ))}
        </div>
      </section>

      <section className="workflow-grid">
        {workflowCards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="workflow-card" key={card.title}>
              <span className="tag cap"><Icon size={13} /> {card.label}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}

function LibraryView({
  selectedChapterId,
  onSelectChapter,
}: {
  selectedChapterId: string;
  onSelectChapter: (chapterId: string) => void;
}) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const visibleSubjects = subjects
    .map((subject) => ({
      ...subject,
      chapters: subject.chapters.filter((chapter) =>
        !normalized
          ? true
          : [chapter.title, chapter.subtitle, chapter.tags.join(" "), chapter.summary].join(" ").toLowerCase().includes(normalized),
      ),
    }))
    .filter((subject) => subject.chapters.length || !normalized);

  return (
    <div className="library-stack">
      <label className="search-box">
        <Search size={17} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Ind AS, traps, computation areas..." />
      </label>
      {visibleSubjects.map((subject) => (
        <section className="subject-section" key={subject.id}>
          <div className="sec-head">
            <span className="folio">{subject.group}</span>
            <h2>{subject.code} · {subject.name}</h2>
          </div>
          {subject.chapters.length ? (
            <div className="chapter-grid">
              {subject.chapters.map((chapter) => (
                <ChapterCard
                  active={selectedChapterId === chapter.id}
                  chapter={chapter}
                  key={chapter.id}
                  onSelectChapter={onSelectChapter}
                />
              ))}
            </div>
          ) : (
            <div className="empty-card">Chapter migration pending. Source material is still visible in the broader workspace.</div>
          )}
          {subject.id === "fr" && !normalized ? <SyllabusLedger onSelectChapter={onSelectChapter} /> : null}
        </section>
      ))}
    </div>
  );
}

function MetricCard({ label, note, value }: { label: string; note: string; value: string | number }) {
  return (
    <article className="metric-card">
      <strong>{value}</strong>
      <span>{label}</span>
      <p>{note}</p>
    </article>
  );
}

function ChapterCard({
  active,
  chapter,
  onSelectChapter,
}: {
  active?: boolean;
  chapter: ChapterAsset;
  onSelectChapter: (chapterId: string) => void;
}) {
  return (
    <article className={cx("chapter-card", active && "active")}>
      <span className={cx("tag", chapter.tone)}>{chapter.status}</span>
      <h3>{chapter.title}</h3>
      <p>{chapter.subtitle}</p>
      <div className="chip-row">{chapter.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
      <div className="chapter-card-foot">
        <div className="mini-meter"><span style={{ width: `${chapter.readiness}%` }} /></div>
        <b>{chapter.readiness}%</b>
        <button className="btn ghost small" type="button" onClick={() => onSelectChapter(chapter.id)}>Open</button>
      </div>
    </article>
  );
}

export default App;
