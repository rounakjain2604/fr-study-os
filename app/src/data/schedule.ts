export type StudyTask = {
  id: string;
  text: string;
  plannedHours: number;
};

export type StudyDay = {
  id: string;
  dayNumber: number;
  isoDate: string;
  displayDate: string;
  weekday: string;
  topic: string;
  chapter: string;
  phaseId: string;
  tasks: StudyTask[];
};

export type StudyPhase = {
  id: string;
  name: string;
  ledgerName: string;
  plannedHours: number;
  days: StudyDay[];
};

const task = (dayId: string, taskIndex: number, text: string, plannedHours: number): StudyTask => ({
  id: `${dayId}-t${taskIndex + 1}`,
  text,
  plannedHours,
});

const day = (
  phaseId: string,
  dayNumber: number,
  isoDate: string,
  displayDate: string,
  weekday: string,
  topic: string,
  chapter: string,
  tasks: Array<[string, number]>,
): StudyDay => {
  const id = `d${dayNumber}`;

  return {
    id,
    dayNumber,
    isoDate,
    displayDate,
    weekday,
    topic,
    chapter,
    phaseId,
    tasks: tasks.map(([text, plannedHours], index) => task(id, index, text, plannedHours)),
  };
};

// ============================================================================
// The 16-Day AFM Sprint — 14 → 29 June 2026 (target close 30 June).
// AFM (Paper 2) is the sole focus for these 16 days: one first-reading pass
// across all 15 ICAI chapters, weighted heavier on weekends (no office).
// Detailed, chapter-wise — no revision/carry-forward padding.
// ============================================================================

export const SCHEDULE: StudyPhase[] = [
  {
    id: "sa",
    name: "Block A · Foundations & Valuation",
    ledgerName: "Foundations & valuation",
    plannedHours: 33,
    days: [
      day("sa", 1, "2026-06-14", "14 Jun", "Sun", "Financial Policy + Risk Management", "Ch 1–2", [
        ["Financial Policy & Corporate Strategy — CFO's role, SFM & functions, hierarchy levels, financial planning, SGR", 2],
        ["Risk Management — risk types, the 5 financial-risk categories, evaluation, Value at Risk", 2],
        ["One-page map of both theory chapters", 1],
        ["10 theory MCQs from the chapter quizzes", 1],
      ]),
      day("sa", 2, "2026-06-15", "15 Jun", "Mon", "Advanced Capital Budgeting — I", "Ch 3", [
        ["Replacement decisions, capital rationing, inflation adjustment", 2.5],
        ["Work 4 base NPV/IRR problems", 2],
        ["Note key formulae (EAC, real vs nominal)", 1],
      ]),
      day("sa", 3, "2026-06-16", "16 Jun", "Tue", "Advanced Capital Budgeting — II", "Ch 3", [
        ["Risk analysis: sensitivity, scenario, simulation, decision trees", 2.5],
        ["Certainty equivalents & risk-adjusted discount rate", 1.5],
        ["Solve 5 module questions", 1.5],
      ]),
      day("sa", 4, "2026-06-17", "17 Jun", "Wed", "Security Analysis", "Ch 4", [
        ["Fundamental analysis: economy → industry → company", 2],
        ["Technical analysis & the Efficient Market Hypothesis", 1.5],
        ["10 concept MCQs + 2 questions", 1.5],
      ]),
      day("sa", 5, "2026-06-18", "18 Jun", "Thu", "Security Valuation — Debt", "Ch 5", [
        ["Bond valuation, YTM, current yield, spot & forward rates", 2.5],
        ["Duration, modified duration, convexity", 1.5],
        ["Solve 5 bond problems", 1.5],
      ]),
      day("sa", 6, "2026-06-19", "19 Jun", "Fri", "Security Valuation — Equity", "Ch 5", [
        ["Dividend discount models (Gordon, multi-stage)", 2],
        ["FCFE / FCFF and relative-valuation multiples", 2],
        ["Solve 5 equity valuation problems", 1.5],
      ]),
    ],
  },
  {
    id: "sb",
    name: "Block B · Markets & Instruments",
    ledgerName: "Markets & instruments",
    plannedHours: 32,
    days: [
      day("sb", 7, "2026-06-20", "20 Jun", "Sat", "Portfolio Management — I", "Ch 6", [
        ["Return & risk of a security and of a portfolio", 2],
        ["Markowitz model, covariance, the efficient frontier", 2.5],
        ["Solve 5 two-/three-security problems", 2],
        ["Summary note on portfolio-risk maths", 1],
      ]),
      day("sb", 8, "2026-06-21", "21 Jun", "Sun", "Portfolio Management — II", "Ch 6", [
        ["CAPM, SML, beta estimation, the characteristic line", 2.5],
        ["Sharpe, Treynor, Jensen; Sharpe Index Model", 2],
        ["Arbitrage Pricing Theory & portfolio rebalancing", 1.5],
        ["Solve 6 questions", 1.5],
      ]),
      day("sb", 9, "2026-06-22", "22 Jun", "Mon", "Securitization + Mutual Funds", "Ch 7–8", [
        ["Securitization: SPV, mechanism, instruments (PTC/PCO), pricing", 2.5],
        ["Mutual Funds: NAV, returns, expense ratio, fund types", 2],
        ["Solve 4 NAV / return problems", 1],
      ]),
      day("sb", 10, "2026-06-23", "23 Jun", "Tue", "Derivatives — Futures & Forwards", "Ch 9", [
        ["Forwards & futures, cost-of-carry pricing, basis", 2.5],
        ["Hedging with index & stock futures, beta management", 2],
        ["Solve 5 futures problems", 1],
      ]),
      day("sb", 11, "2026-06-24", "24 Jun", "Wed", "Derivatives — Options", "Ch 9", [
        ["Option payoffs, intrinsic/time value, put-call parity", 2],
        ["Binomial model & Black-Scholes-Merton valuation", 2.5],
        ["Option strategies; solve 5 questions", 1.5],
      ]),
    ],
  },
  {
    id: "sc",
    name: "Block C · Risk, Global & Corporate",
    ledgerName: "Risk, global & corporate",
    plannedHours: 32,
    days: [
      day("sc", 12, "2026-06-25", "25 Jun", "Thu", "Interest Rate Risk Management", "Ch 12", [
        ["FRAs, interest-rate futures, caps / floors / collars", 2.5],
        ["Interest-rate & currency swaps — valuation", 2],
        ["Solve 5 questions", 1],
      ]),
      day("sc", 13, "2026-06-26", "26 Jun", "Fri", "Forex Exposure & Risk Management", "Ch 10", [
        ["Transaction, translation & economic exposure", 1.5],
        ["Hedging: forward, money-market, futures, options, leading/lagging", 2.5],
        ["Solve 5 forex problems", 1.5],
      ]),
      day("sc", 14, "2026-06-27", "27 Jun", "Sat", "International Financial Mgmt + Forex Qs", "Ch 11", [
        ["Sources of international finance, GDR/ADR; IRP, PPP, IFE parity", 2.5],
        ["International capital budgeting", 1.5],
        ["Forex marathon — 8 mixed problems", 2.5],
        ["Forex + IFM summary chart", 1],
      ]),
      day("sc", 15, "2026-06-28", "28 Jun", "Sun", "Business Valuation + M&A — I", "Ch 13–14", [
        ["Valuation approaches: DCF, relative, asset-based; EVA / MVA", 2.5],
        ["Mergers & Acquisitions: synergy, swap ratio, P/E impact", 2.5],
        ["Solve 5 valuation + swap-ratio problems", 1.5],
        ["Note key valuation formulae", 1],
      ]),
      day("sc", 16, "2026-06-29", "29 Jun", "Mon", "Restructuring + Startup Finance + Close", "Ch 14–15", [
        ["Corporate restructuring: demerger, buy-back, LBO, financial restructuring", 2],
        ["Startup Finance: pitch, sources, valuation (Berkus, scorecard, VC method)", 1.5],
        ["Mixed AFM marathon — 8 questions across chapters", 2],
        ["Sprint review — list the weak chapters to attack on the 30th", 0.5],
      ]),
    ],
  },
];

export const ALL_DAYS = SCHEDULE.flatMap((phase) => phase.days);
export const START_DATE = "2026-06-14";
export const TARGET_DATE = "2026-06-30";
export const TOTAL_DAYS = ALL_DAYS.length;
export const TOTAL_PLANNED_HOURS = ALL_DAYS.reduce(
  (total, studyDay) => total + studyDay.tasks.reduce((sum, item) => sum + item.plannedHours, 0),
  0,
);

export const dayPlannedHours = (studyDay: StudyDay) =>
  studyDay.tasks.reduce((sum, item) => sum + item.plannedHours, 0);

// Sprint identity, surfaced on the Home screen.
export const SPRINT = {
  name: "16-Day AFM Sprint",
  subject: "AFM",
  rangeLabel: "14 – 30 June 2026",
};
