import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  BarChart3,
  BookOpen,
  Brain,
  ClipboardList,
  Flag,
  Gauge,
  Home,
  Layers,
  LibraryBig,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  X,
} from "lucide-react";
import { ALL_DAYS, dayPlannedHours } from "./data/schedule";
import { chapters, subjects, type ChapterAsset } from "./data/catalog";
import { formatHours, getActiveDay } from "./lib/analytics";
import { useLedgerState } from "./hooks/useLedgerState";
import { useFlashcards } from "./hooks/useFlashcards";
import { askTutor, chapterContext, type AiContext, type AiMessage, type AiMode } from "./lib/ai";
import { hasLocalChanges, pushOnHide, syncConfigured, syncNow, type SyncStatus } from "./lib/sync";
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

type NavGroup = "study" | "track" | "system";

const navItems: Array<{ id: AppSection; label: string; icon: typeof Home; group: NavGroup }> = [
  { id: "home", label: "Home", icon: Home, group: "study" },
  { id: "library", label: "Library", icon: LibraryBig, group: "study" },
  { id: "chapter", label: "Chapter", icon: BookOpen, group: "study" },
  { id: "cards", label: "Cards", icon: Layers, group: "study" },
  { id: "ai", label: "AI Tutor", icon: Brain, group: "study" },
  { id: "ledger", label: "Plan", icon: Gauge, group: "track" },
  { id: "analytics", label: "Analytics", icon: BarChart3, group: "track" },
  { id: "revision", label: "Revision", icon: Flag, group: "track" },
  { id: "errors", label: "Mistakes", icon: Search, group: "track" },
  { id: "mocks", label: "Mocks", icon: ClipboardList, group: "track" },
  { id: "data", label: "Settings", icon: Settings, group: "system" },
];

// The five destinations that earn a slot in the mobile tab bar.
const mobileTabs: AppSection[] = ["home", "library", "ledger", "cards", "ai"];

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

function App() {
  const { actions, burnUp, importError, ledgers, metrics, state, trialBalance } = useLedgerState();
  const flashcards = useFlashcards();
  const [activeSection, setActiveSection] = useState<AppSection>(() => readHashRoute().section);
  const [selectedChapterId, setSelectedChapterId] = useState(initialChapterId);
  const [selectedDayId, setSelectedDayId] = useState(() => getActiveDay(state).id);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiStatus, setAiStatus] = useState("");
  const [aiContext, setAiContext] = useState<AiContext | null>(null);
  const [aiMode, setAiMode] = useState<AiMode>("explain");
  const [aiThreads, setAiThreads] = useState<AiThread[]>(() => loadAiThreads());
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [aiBusy, setAiBusy] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(() => (syncConfigured() ? "syncing" : "off"));

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

  // Cloud sync: pull on open, push edits in the background, push on hide,
  // pull again when the app returns to the foreground.
  useEffect(() => {
    let cancelled = false;

    const runSync = async () => {
      if (!syncConfigured()) {
        setSyncStatus("off");
        return;
      }
      setSyncStatus("syncing");
      const outcome = await syncNow();
      if (cancelled) return;
      if (outcome.reloaded) {
        window.location.reload();
        return;
      }
      setSyncStatus(outcome.status);
    };

    void runSync();

    const interval = window.setInterval(() => {
      if (syncConfigured() && hasLocalChanges()) void runSync();
    }, 45_000);

    const onVisibility = () => {
      if (document.visibilityState === "hidden") pushOnHide();
      else void runSync();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const changeSection = (section: AppSection) => {
    setActiveSection(section);
    setMenuOpen(false);
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
    setMenuOpen(false);
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
    setAiStatus("");
  };

  const selectThread = (threadId: string) => {
    const thread = aiThreads.find((entry) => entry.id === threadId);
    if (!thread) return;
    setActiveThreadId(threadId);
    setAiContext(thread.context);
    setAiMode(thread.mode);
    setAiStatus("");
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
        `${reply.model || "AI"}${reply.provider ? ` via ${reply.provider}` : ""}${
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

  const navButton = (item: (typeof navItems)[number]) => {
    const Icon = item.icon;
    return (
      <button
        className={cx(activeSection === item.id && "active")}
        key={item.id}
        type="button"
        onClick={() => changeSection(item.id)}
      >
        <Icon size={16} strokeWidth={1.8} />
        <span>{item.label}</span>
      </button>
    );
  };

  const syncChip =
    syncStatus !== "off" ? (
      <div className={cx("sync-chip", syncStatus)}>
        <i aria-hidden="true" />
        <span>{syncStatus === "synced" ? "Synced" : syncStatus === "syncing" ? "Syncing…" : "Sync error"}</span>
      </div>
    ) : null;

  return (
    <div className="app-frame">
      <CommandPalette commands={paletteCommands} open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      {/* Desktop sidebar */}
      <aside className="side-rail">
        <div className="brand-block">
          <div className="brand">FR Study OS</div>
          <div className="brand-sub">CA Final · May 2027</div>
        </div>

        <button className="rail-search" type="button" onClick={() => setPaletteOpen(true)}>
          <Search size={14} />
          <span>Search</span>
          <kbd>Ctrl K</kbd>
        </button>

        <nav className="nav-rail" aria-label="Primary">
          {navItems.filter((item) => item.group === "study").map(navButton)}
          <div className="nav-group-label">Track</div>
          {navItems.filter((item) => item.group === "track").map(navButton)}
        </nav>

        <div className="rail-foot">
          <div className="progress-wrap">
            <div className="progress-label">
              <span>45-day pace</span>
              <b>{metrics.progressPct}%</b>
            </div>
            <div className="progress-bar"><span style={{ width: `${Math.min(metrics.progressPct, 100)}%` }} /></div>
          </div>
          <nav className="nav-rail" aria-label="System">
            {navItems.filter((item) => item.group === "system").map(navButton)}
            <button type="button" onClick={actions.toggleTheme}>
              {state.theme === "dark" ? <Sun size={16} strokeWidth={1.8} /> : <Moon size={16} strokeWidth={1.8} />}
              <span>{state.theme === "dark" ? "Light mode" : "Dark mode"}</span>
            </button>
          </nav>
          {syncChip}
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="top-bar">
        <button className="top-bar-brand" type="button" onClick={() => changeSection("home")}>
          FR Study OS
        </button>
        <div className="top-bar-actions">
          {syncChip}
          <button aria-label="Search" className="icon-btn" type="button" onClick={() => setPaletteOpen(true)}>
            <Search size={18} strokeWidth={1.8} />
          </button>
          <button aria-label="Menu" className="icon-btn" type="button" onClick={() => setMenuOpen(true)}>
            <Menu size={18} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {/* Mobile menu sheet */}
      {menuOpen ? (
        <div className="sheet-overlay" role="dialog" aria-modal="true" onClick={() => setMenuOpen(false)}>
          <div className="sheet" onClick={(event) => event.stopPropagation()}>
            <div className="sheet-head">
              <span>Menu</span>
              <button aria-label="Close menu" className="icon-btn" type="button" onClick={() => setMenuOpen(false)}>
                <X size={18} strokeWidth={1.8} />
              </button>
            </div>
            <div className="sheet-grid">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    className={cx(activeSection === item.id && "active")}
                    key={item.id}
                    type="button"
                    onClick={() => changeSection(item.id)}
                  >
                    <Icon size={17} strokeWidth={1.8} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <button type="button" onClick={actions.toggleTheme}>
                {state.theme === "dark" ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
                <span>{state.theme === "dark" ? "Light mode" : "Dark mode"}</span>
              </button>
            </div>
            <div className="sheet-foot">
              <div className="progress-wrap">
                <div className="progress-label">
                  <span>45-day pace</span>
                  <b>{metrics.progressPct}%</b>
                </div>
                <div className="progress-bar"><span style={{ width: `${Math.min(metrics.progressPct, 100)}%` }} /></div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <main className="main-stage">
        {activeSection !== "home" ? (
          <header className="topline">
            <div>
              <h1>{pageTitle(activeSection, selectedChapter)}</h1>
              {activeSection === "chapter" ? <p>{selectedChapter.subtitle}</p> : null}
            </div>
            {activeSection !== "ai" ? (
              <button className="btn ghost" type="button" onClick={() => openAi(chapterContext(selectedChapter))}>
                <Brain size={15} strokeWidth={1.8} />
                Ask AI
              </button>
            ) : null}
          </header>
        ) : null}

        {activeSection === "home" ? (
          <HomeView
            activeDayId={activeDay.id}
            cardsDue={flashcards.stats.dueCount + flashcards.stats.newCount}
            metrics={metrics}
            selectedChapter={selectedChapter}
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

      {/* Mobile bottom tab bar */}
      <nav className="bottom-nav" aria-label="Primary">
        {mobileTabs.map((tabId) => {
          const item = navItems.find((entry) => entry.id === tabId)!;
          const Icon = item.icon;
          return (
            <button
              className={cx(activeSection === item.id && "active")}
              key={item.id}
              type="button"
              onClick={() => changeSection(item.id)}
            >
              <Icon size={20} strokeWidth={1.8} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function pageTitle(section: AppSection, chapter: ChapterAsset) {
  if (section === "library") return "Library";
  if (section === "chapter") return chapter.title;
  if (section === "ledger") return "Plan";
  if (section === "analytics") return "Analytics";
  if (section === "errors") return "Mistakes";
  if (section === "revision") return "Revision";
  if (section === "cards") return "Cards";
  if (section === "mocks") return "Mocks";
  if (section === "ai") return "AI Tutor";
  if (section === "data") return "Settings";
  return "Home";
}

function HomeView({
  activeDayId,
  cardsDue,
  metrics,
  selectedChapter,
  onOpenCards,
  onOpenLibrary,
  onSelectChapter,
  onSelectDay,
}: {
  activeDayId: string;
  cardsDue: number;
  metrics: { progressPct: number; totalActual: number; totalPlanned: number; varianceHours: number; daysRemaining: number };
  selectedChapter: ChapterAsset;
  onOpenCards: () => void;
  onOpenLibrary: () => void;
  onSelectChapter: (chapterId: string) => void;
  onSelectDay: (dayId: string) => void;
}) {
  const todayPlan = ALL_DAYS.find((studyDay) => studyDay.id === activeDayId);
  const today = new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "long" }).format(new Date());

  return (
    <div className="home-stack">
      <section className="today-card">
        <div className="today-copy">
          <span className="overline">{today}{todayPlan ? ` · Day ${todayPlan.dayNumber} of 45` : ""}</span>
          <h2>{todayPlan ? todayPlan.topic : "Plan complete"}</h2>
          <p>
            {todayPlan
              ? `${formatHours(dayPlannedHours(todayPlan))} planned · ${todayPlan.tasks.length} tasks`
              : "All 45 entries are posted. Move to revision and mocks."}
          </p>
        </div>
        <div className="today-actions">
          {todayPlan ? (
            <button className="btn cap" type="button" onClick={() => onSelectDay(todayPlan.id)}>
              Open today
            </button>
          ) : null}
          <button className="btn ghost" type="button" onClick={() => onSelectChapter(selectedChapter.id)}>
            <BookOpen size={15} strokeWidth={1.8} />
            Resume {selectedChapter.title}
          </button>
        </div>
      </section>

      <section className="metric-grid">
        <MetricCard label="Posted" value={`${metrics.progressPct}%`} note={`${formatHours(metrics.totalActual)} of ${formatHours(metrics.totalPlanned)}`} />
        <MetricCard label="Variance" value={`${metrics.varianceHours >= 0 ? "+" : ""}${metrics.varianceHours.toFixed(1)}h`} note="vs the 45-day plan" />
        <MetricCard label="Days left" value={metrics.daysRemaining} note="to target close" />
        <button className="metric-card as-button" type="button" onClick={onOpenCards}>
          <strong>{cardsDue}</strong>
          <span>Cards due</span>
          <p>Reviews + new cards</p>
        </button>
      </section>

      <section className="chapter-strip">
        <div className="sec-head">
          <h2>Chapters</h2>
          <button className="btn ghost small" type="button" onClick={onOpenLibrary}>
            View library
          </button>
        </div>
        <div className="chapter-grid">
          {chapters.slice(0, 3).map((chapter) => (
            <ChapterCard chapter={chapter} key={chapter.id} onSelectChapter={onSelectChapter} />
          ))}
        </div>
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
        <Search size={16} strokeWidth={1.8} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Ind AS, traps, computation areas…" />
      </label>
      {visibleSubjects.map((subject) => (
        <section className="subject-section" key={subject.id}>
          <div className="sec-head">
            <h2>{subject.code} · {subject.name}</h2>
            <span className="folio">{subject.group}</span>
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
            <div className="empty-card">Chapter migration pending.</div>
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
    <button className={cx("chapter-card", active && "active")} type="button" onClick={() => onSelectChapter(chapter.id)}>
      <span className={cx("tag", chapter.tone)}>{chapter.status}</span>
      <h3>{chapter.title}</h3>
      <p>{chapter.subtitle}</p>
      <div className="chapter-card-foot">
        <div className="mini-meter"><span style={{ width: `${chapter.readiness}%` }} /></div>
        <b>{chapter.readiness}%</b>
      </div>
    </button>
  );
}

export default App;
