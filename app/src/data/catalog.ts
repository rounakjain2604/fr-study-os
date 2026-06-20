import type { ChapterDoc } from "./chapterDoc";
import { indAs23Doc } from "./chapters/indAs23";
import { frCh1IntroIndAsDoc } from "./chapters/frCh1IntroIndAs";
import { frCh2FrameworkDoc } from "./chapters/frCh2Framework";
import { frCh3PresentationDoc } from "./chapters/frCh3Presentation";
import { afmCh1FinancialPolicyDoc } from "./chapters/afmCh1FinancialPolicy";
import { afmCh2RiskManagementDoc } from "./chapters/afmCh2RiskManagement";
import { afmCh3CapitalBudgetingDoc } from "./chapters/afmCh3CapitalBudgeting";
import { afmCh4SecurityAnalysisDoc } from "./chapters/afmCh4SecurityAnalysis";
import { afmCh9DerivativesDoc } from "./chapters/afmCh9Derivatives";
export type StudyStatus = "Live" | "Dashboard" | "Planned" | "Source Ready";

export type ChapterAsset = {
  id: string;
  title: string;
  subtitle: string;
  subject: string;
  unit: string;
  status: StudyStatus;
  readiness: number;
  tone: "cap" | "exp" | "gold" | "ink";
  href?: string;
  doc?: ChapterDoc;
  sourceFile?: string;
  tags: string[];
  summary: string;
  sections: Array<{
    id: string;
    title: string;
    summary: string;
    rules: string[];
    traps: string[];
  }>;
  practice: Array<{
    id: string;
    title: string;
    type: string;
    difficulty: string;
    question: string;
    modelAnswer: string;
    topic: string;
  }>;
};

export type SubjectGroup = {
  id: string;
  code: string;
  name: string;
  group: string;
  readiness: number;
  chapters: ChapterAsset[];
};

const frChapters: ChapterAsset[] = [
  {
    id: "fr-ch1-intro",
    title: "Chapter 1",
    subtitle: "Introduction to Indian Accounting Standards",
    subject: "FR",
    unit: "Chapter 1",
    status: "Live",
    readiness: 0,
    tone: "cap",
    doc: frCh1IntroIndAsDoc,
    sourceFile:
      "01_FR_Financial_Reporting/001 - Chapter 1- Introduction to Indian Accounting Standards - 74883bos60524-cp1.txt",
    tags: ["roadmap", "net worth", "convergence", "NBFC", "Schedule III"],
    summary:
      "Why India converged with IFRS, how an Ind AS is born, and the applicability roadmap — corporate phases, net-worth tests, NBFC/bank/insurer rules, and Division II of Schedule III.",
    sections: [
      {
        id: "frch1-roadmap",
        title: "Roadmap & Net Worth",
        summary:
          "Phase I (1 Apr 2016): listed/in-process or unlisted companies with net worth ≥ ₹500 crore plus group companies. Phase II (1 Apr 2017): listed < ₹500 crore and unlisted ₹250–500 crore plus group companies.",
        rules: [
          "Net worth per section 2(57): paid-up capital + profit reserves + securities premium − accumulated losses − deferred/misc expenditure; revaluation reserve excluded.",
          "Cut-off 31 March 2014 (or first audited statements after); once a threshold is met, Ind AS applies from the next FY and forever after.",
          "Holding, subsidiary, JV and associate companies of a covered company are dragged in; fellow subsidiaries are not (ITFG 15.10).",
        ],
        traps: [
          "SME-exchange listing does not count as 'listed' for the roadmap",
          "NBFCs, banks and insurers cannot adopt Ind AS voluntarily",
          "A foreign parent's net worth never triggers Ind AS for Indian subsidiaries",
        ],
      },
      {
        id: "frch1-framework-setting",
        title: "Convergence & Standard-setting",
        summary:
          "India converged with IFRS (carve-ins/outs) rather than adopting it; ASB drafts, ICAI Council approves, NFRA is consulted, MCA notifies under section 133.",
        rules: [
          "IAS-series keep their numbers (IAS 1 → Ind AS 1); IFRS-series add 100 (IFRS 16 → Ind AS 116).",
          "39 Ind AS notified; IFRS 17 and IAS 26 have no Ind AS equivalent.",
          "Bold and plain paragraphs of a standard have equal authority.",
        ],
        traps: ["Ind AS financial statements cannot assert IFRS compliance"],
      },
    ],
    practice: [],
  },
  {
    id: "fr-ch2-framework",
    title: "Chapter 2",
    subtitle: "Conceptual Framework under Ind AS",
    subject: "FR",
    unit: "Chapter 2",
    status: "Live",
    readiness: 0,
    tone: "gold",
    doc: frCh2FrameworkDoc,
    sourceFile:
      "01_FR_Financial_Reporting/002 - Chapter 2- Conceptual Framework for Financial Reporting under In.txt",
    tags: ["qualitative characteristics", "elements", "recognition", "measurement", "capital maintenance"],
    summary:
      "The 2018-aligned Conceptual Framework: objective of GPFR, qualitative characteristics, element definitions, recognition/derecognition, measurement bases, presentation and capital maintenance.",
    sections: [
      {
        id: "frch2-elements",
        title: "Elements & Recognition",
        summary:
          "Asset = present economic resource (a right with potential to produce benefits) controlled from past events; liability = present obligation to transfer a resource from past events; recognition requires relevance + faithful representation.",
        rules: [
          "No probability threshold in the definitions — low-probability rights/obligations can still be assets/liabilities.",
          "Executory contracts are a single asset (favourable terms) or liability (unfavourable).",
          "Derecognise assets on loss of control; liabilities when no present obligation remains.",
        ],
        traps: [
          "Ind AS overrides the Framework whenever they conflict",
          "Prudence forbids deliberate understatement as much as overstatement",
          "Matching is not an objective — no balance-sheet items that fail element definitions",
        ],
      },
      {
        id: "frch2-measurement",
        title: "Measurement & Capital",
        summary:
          "Historical cost (incl. amortised cost) vs current values (fair value, value in use/fulfilment value, current cost); selection driven by relevance and faithful representation; financial vs physical capital maintenance.",
        rules: [
          "Fair value ignores transaction costs; value in use deducts PV of disposal costs.",
          "Equity is never measured directly — it is the residual.",
          "Under physical capital maintenance all price changes are equity adjustments, never profit.",
        ],
        traps: ["General purpose financial statements are not designed to show entity value"],
      },
    ],
    practice: [],
  },
  {
    id: "fr-ch3-presentation",
    title: "Chapter 3",
    subtitle: "Ind AS 1 · 34 · 7 — Presentation",
    subject: "FR",
    unit: "Chapter 3 Units 1–3",
    status: "Live",
    readiness: 0,
    tone: "exp",
    doc: frCh3PresentationDoc,
    sourceFile:
      "01_FR_Financial_Reporting/003-005 - Chapter 3 Units 1-3 (Ind AS 1, 34, 7)",
    tags: ["current/non-current", "OCI", "interim", "effective tax rate", "cash flows"],
    summary:
      "Presentation of financial statements (Ind AS 1), interim reporting on year-to-date discipline (Ind AS 34), and the statement of cash flows with India's fixed interest/dividend rules (Ind AS 7).",
    sections: [
      {
        id: "frch3-indas1",
        title: "Ind AS 1 — Presentation",
        summary:
          "Complete set with equal prominence, eight general features, current/non-current tests built on the operating cycle and rights existing at the reporting date.",
        rules: [
          "A liability is current unless an unconditional right exists at the reporting date to defer settlement 12+ months.",
          "Carve-out: a covenant breach waived after the reporting date but before approval keeps the loan non-current.",
          "Deferred tax is always non-current; no extraordinary items anywhere.",
        ],
        traps: [
          "Refinancing agreed after the reporting date cannot rescue current classification",
          "Inappropriate policies cannot be cured by disclosure",
        ],
      },
      {
        id: "frch3-indas34",
        title: "Ind AS 34 — Interim",
        summary:
          "Condensed statements with year-to-date measurement; the frequency of reporting must not change annual results; tax at the estimated average annual effective rate.",
        rules: [
          "Seasonal revenue is recognised when it occurs — never anticipated or deferred.",
          "Costs are deferred at interim only if deferrable at year-end too.",
          "Interim balance sheet compares to the preceding year-end, not the prior-year quarter.",
        ],
        traps: ["Goodwill impairment recognised in an interim period can never be reversed"],
      },
      {
        id: "frch3-indas7",
        title: "Ind AS 7 — Cash Flows",
        summary:
          "Operating/investing/financing classification, cash equivalents (≤3 months from acquisition), net-basis exceptions, non-cash exclusions and FX reconciliation lines.",
        rules: [
          "Non-financial entities: interest paid → financing; interest/dividends received → investing; dividends paid → financing (no options, unlike IAS 7).",
          "Taxes are operating unless specifically traceable to investing/financing.",
          "Control-changing acquisitions/disposals are investing, net of cash acquired; NCI stake changes without losing control are financing.",
        ],
        traps: ["The 3-month cash-equivalent test runs from acquisition date, not the reporting date"],
      },
    ],
    practice: [],
  },
  {
    id: "fr-ind-as-23",
    title: "Ind AS 23",
    subtitle: "Borrowing Costs",
    subject: "FR",
    unit: "Chapter 6 Unit 3",
    status: "Live",
    readiness: 42,
    tone: "cap",
    href: "content/Ind_AS_23_Borrowing_Costs_Dashboard_polished.html",
    doc: indAs23Doc,
    sourceFile:
      "CA_Final_May_2027_Command_Center/ICAI_Materials_Text/01_FR_Financial_Reporting/012 - Unit 3- Ind AS 23 - Borrowing Costs - 74894bos60524-cp6-u3.txt",
    tags: ["capitalisation", "qualifying asset", "forex", "specific/general borrowing"],
    summary:
      "A decision-led chapter workspace for deciding whether borrowing costs are capitalised or expensed, with calculators, TYK-style cases, and traps.",
    sections: [
      {
        id: "indas23-core",
        title: "Core Capitalisation Principle",
        summary:
          "Borrowing costs directly attributable to acquisition, construction, or production of a qualifying asset are capitalised; other borrowing costs are expensed.",
        rules: [
          "The avoidable-cost test drives most judgement questions.",
          "Capitalisation is mandatory once a qualifying asset and eligible borrowing costs exist.",
          "Capitalised borrowing costs cannot exceed actual borrowing costs incurred.",
        ],
        traps: ["Treating cost of equity as borrowing cost", "Capitalising notional interest on own funds"],
      },
      {
        id: "indas23-period",
        title: "Commence, Suspend, Cease",
        summary:
          "Capitalisation starts only when expenditure, borrowing costs, and necessary activities are all present; it stops when the asset is substantially ready.",
        rules: [
          "Use the latest of the three commencement conditions.",
          "Suspend during extended interruptions in active development.",
          "Cease at readiness, not when the asset starts earning revenue.",
        ],
        traps: ["Continuing capitalisation because only part of a complex is rented", "Missing pre-construction technical work"],
      },
      {
        id: "indas23-computation",
        title: "Specific vs General Borrowings",
        summary:
          "Specific borrowings use actual cost less temporary investment income. General borrowings use weighted-average rate times eligible expenditure.",
        rules: [
          "Specific loans stay out of the general pool until the related asset is complete.",
          "General borrowing rate is a weighted-average borrowing cost rate.",
          "Progress payments and grants reduce the expenditure base.",
        ],
        traps: ["Including specific borrowings too early", "Forgetting the actual-cost ceiling"],
      },
    ],
    practice: [
      {
        id: "indas23-drill-forex",
        title: "Foreign Currency Borrowing Cap",
        type: "Computation Drill",
        difficulty: "Advanced",
        topic: "Forex difference",
        question:
          "A foreign-currency loan saves interest versus functional-currency borrowing, but creates exchange loss. How much exchange difference can be treated as borrowing cost?",
        modelAnswer:
          "Eligible exchange difference is limited to the lower of the exchange loss and the interest saving compared with the functional-currency benchmark. Any excess exchange loss is expensed.",
      },
      {
        id: "indas23-drill-cease",
        title: "Ready but Not Fully Occupied",
        type: "Exam Trap",
        difficulty: "Moderate",
        topic: "Cessation",
        question:
          "A commercial complex is ready for use on 31 May, but only 10% is rented by year-end. Up to what date are borrowing costs capitalised?",
        modelAnswer:
          "Capitalisation ceases on 31 May, when the complex is substantially ready for intended use. Occupancy level after readiness is irrelevant.",
      },
    ],
  },
  {
    id: "fr-ind-as-109-u2",
    title: "Ind AS 109 Unit 2",
    subtitle: "Classification and Measurement",
    subject: "FR",
    unit: "Chapter 11 Unit 2",
    status: "Dashboard",
    readiness: 30,
    tone: "gold",
    href: "content/ind_as_109_unit2_dashboard.html",
    sourceFile:
      "CA_Final_May_2027_Command_Center/ICAI_Materials_Text/01_FR_Financial_Reporting/029 - Unit 2- Classification and Measurement of Financial Assets and Financial Liabilities - 74911bos60524-cp11-u2.txt",
    tags: ["SPPI", "business model", "EIR", "ECL", "liability modification"],
    summary:
      "Financial instrument classification and measurement workspace with a mature AI tutor pattern and practice-card design.",
    sections: [
      {
        id: "indas109-bm",
        title: "Business Model",
        summary: "Classification begins with how financial assets are managed at portfolio level.",
        rules: ["Hold to collect tolerates credit deterioration sales", "Collect-and-sell has both cash collection and sale as integral objectives"],
        traps: ["Judging business model one instrument at a time"],
      },
      {
        id: "indas109-sppi",
        title: "SPPI Test",
        summary: "Cash flows must be solely payments of principal and interest on principal outstanding.",
        rules: ["Equity/commodity/index upside usually fails SPPI", "Debt that fails SPPI goes to FVTPL"],
        traps: ["Letting business model rescue an SPPI failure"],
      },
    ],
    practice: [
      {
        id: "indas109-sppi-equity-index",
        title: "Equity-Linked Return",
        type: "Concept Drill",
        difficulty: "Moderate",
        topic: "SPPI",
        question: "A debt instrument pays principal plus return linked to an equity index. Classify the asset.",
        modelAnswer: "It fails SPPI because the return is exposed to equity price risk, so it is measured at FVTPL.",
      },
    ],
  },
  {
    id: "fr-ind-as-115",
    title: "Ind AS 115",
    subtitle: "Revenue from Contracts with Customers",
    subject: "FR",
    unit: "Chapter 5",
    status: "Dashboard",
    readiness: 28,
    tone: "exp",
    href: "content/ind_as_115_dashboard.html",
    tags: ["5-step model", "variable consideration", "principal-agent", "contract costs"],
    summary: "Revenue recognition dashboard for the five-step model and special areas.",
    sections: [],
    practice: [],
  },
  {
    id: "fr-consolidation",
    title: "Consolidation",
    subtitle: "Ind AS 110 / 111 / 27 / 28",
    subject: "FR",
    unit: "Chapter 13",
    status: "Planned",
    readiness: 0,
    tone: "ink",
    tags: ["subsidiary", "associate", "joint arrangement", "NCI"],
    summary: "Planned migration target for full consolidation workings and mixed problems.",
    sections: [],
    practice: [],
  },
];

// ============================================================================
// AFM (Paper 2) — the 16-day sprint subject. These 15 chapters are scaffolded
// as placeholders so progress, the library and the AI tutor already work.
//
// To turn a chapter "Live", build its doc the way FR chapters do
// (see app/src/data/chapters/*.ts and the ChapterDoc type), then:
//   import { afmCh3Doc } from "./chapters/afmCh3CapitalBudgeting";
//   ...and pass it as the 6th argument to afm(...) below.
// Nothing else needs to change — the workspace renders the doc automatically.
// ============================================================================

// ICAI AFM source texts now live in the repo; cite them so the AI tutor can
// reference the right chapter. `srcFile` is the file name within
// ICAI_Materials_Text/02_AFM_Advanced_Financial_Management/.
const AFM_SOURCE_DIR = "ICAI_Materials_Text/02_AFM_Advanced_Financial_Management";

const afm = (
  chapterNumber: number,
  subtitle: string,
  tone: ChapterAsset["tone"],
  tags: string[],
  summary: string,
  srcFile: string,
  doc?: ChapterDoc,
): ChapterAsset => ({
  id: `afm-ch${chapterNumber}`,
  title: `Chapter ${chapterNumber}`,
  subtitle,
  subject: "AFM",
  unit: `Chapter ${chapterNumber}`,
  status: doc ? "Live" : "Planned",
  readiness: 0,
  tone,
  doc,
  sourceFile: srcFile.includes("/") ? srcFile : `${AFM_SOURCE_DIR}/${srcFile}`,
  tags,
  summary,
  sections: [],
  practice: [],
});

const afmChapters: ChapterAsset[] = [
  afm(1, "Financial Policy & Corporate Strategy", "gold", ["CFO role", "SGR", "hierarchy levels", "theory"],
    "The advanced role of the CFO, the strategic financial decision-making framework, strategy at three hierarchy levels, financial planning (FR+FT+FG), the financial-policy/strategy interface, and the sustainable growth rate.",
    "001 - Chapter 1- Financial Policy and Corporate Strategy - 74828bos60509-cp1.txt",
    afmCh1FinancialPolicyDoc),
  afm(2, "Risk Management", "gold", ["risk types", "VaR", "Z-score", "theory"],
    "The four types of risk, the five categories of financial risk, evaluation of financial risk from three viewpoints, Value at Risk (Z-score × SD), and category-wise risk management.",
    "002 - Chapter 2- Risk Management - 74829bos60509-cp2.txt",
    afmCh2RiskManagementDoc),
  afm(3, "Advanced Capital Budgeting Decisions", "cap", ["NPV", "risk analysis", "EAC", "simulation"],
    "Replacement decisions, capital rationing, inflation adjustment, and risk analysis — sensitivity, scenario, simulation, decision trees and certainty equivalents.",
    "02_AFM_Corrected/003 - Chapter 3- Advanced Capital Budgeting Decisions - 74830bos60509-cp3_mistral.md",
    afmCh3CapitalBudgetingDoc),
  afm(4, "Security Analysis", "exp", ["fundamental", "technical", "EMH"],
    "Fundamental analysis (economy–industry–company), technical analysis, and the Efficient Market Hypothesis.",
    "CA_Final_May_2027_Command_Center/ICAI_Materials_Text/02_AFM_Corrected/004 - Chapter 4- Security Analysis - 74831bos60509-cp4_mistral.md",
    afmCh4SecurityAnalysisDoc),
  afm(5, "Security Valuation", "cap", ["bonds", "YTM", "duration", "DDM", "FCFE"],
    "Valuing debt and equity — bond pricing, YTM, duration and convexity; dividend discount models, FCFE/FCFF and relative-valuation multiples.",
    "005 - Chapter 5- Security Valuation - 74832bos60509-cp5.txt"),
  afm(6, "Portfolio Management", "cap", ["Markowitz", "CAPM", "beta", "Sharpe"],
    "Risk and return, the Markowitz efficient frontier, CAPM and the SML, APT, and performance measures — Sharpe, Treynor and Jensen.",
    "006 - Chapter 6- Portfolio Management - 74833bos60509-cp6.txt"),
  afm(7, "Securitization", "ink", ["SPV", "PTC", "mechanism"],
    "How receivables are pooled and sold through an SPV — the securitization mechanism, instruments (PTC/PCO) and pricing.",
    "007 - Chapter 7- Securitization - 74834bos60509-cp7.txt"),
  afm(8, "Mutual Funds", "ink", ["NAV", "returns", "fund types"],
    "Net asset value, returns and expense ratios, fund classification, and the evaluation of mutual-fund performance.",
    "008 - Chapter 8- Mutual Funds - 74835bos60509-cp8.txt"),
  afm(9, "Derivatives Analysis & Valuation", "cap", ["futures", "options", "Black-Scholes"],
    "Forwards and futures (cost-of-carry, hedging) and options — payoffs, put-call parity, binomial and Black-Scholes-Merton valuation, and strategies.",
    "009 - Chapter 9- Derivatives Analysis and Valuation - 74836bos60509-cp9.txt",
    afmCh9DerivativesDoc),
  afm(10, "Foreign Exchange Exposure & Risk Management", "cap", ["exposure", "hedging", "forex"],
    "Transaction, translation and economic exposure, and the toolkit to hedge it — forwards, money-market, futures, options and leading/lagging.",
    "010 - Chapter 10- Foreign Exchange Exposure and Risk Management - 74837bos60509-cp10.txt"),
  afm(11, "International Financial Management", "exp", ["GDR/ADR", "parity", "capital budgeting"],
    "Raising finance internationally (GDR/ADR), the parity relationships (IRP, PPP, IFE), and international capital budgeting.",
    "011 - Chapter 11- International Financial Management - 74838bos60509-cp11.txt"),
  afm(12, "Interest Rate Risk Management", "exp", ["FRA", "swaps", "caps"],
    "Managing interest-rate risk with FRAs, interest-rate futures, caps/floors/collars, and interest-rate & currency swaps.",
    "012 - Chapter 12- Interest Rate Risk Management - 74839bos60509-cp12.txt"),
  afm(13, "Business Valuation", "cap", ["DCF", "EVA", "relative"],
    "Valuing a business — DCF, relative and asset-based approaches, plus EVA and MVA.",
    "013 - Chapter 13- Business Valuation - 74840bos60509-cp13.txt"),
  afm(14, "Mergers, Acquisitions & Corporate Restructuring", "cap", ["synergy", "swap ratio", "LBO"],
    "Synergy and swap-ratio determination, the P/E impact of a merger, and corporate restructuring — demerger, buy-back, LBO and financial restructuring.",
    "014 - Chapter 14- Mergers, Acquisitions and Corporate Restructuring - 74841bos60509-cp14.txt"),
  afm(15, "Startup Finance", "gold", ["pitch", "VC method", "valuation"],
    "Financing a startup — the pitch, sources of funding, and startup valuation methods (Berkus, scorecard and the VC method).",
    "015 - Chapter 15- Startup Finance - 74842bos60509-cp15.txt"),
];

// AFM first — it is the active sprint subject and the default resume target.
export const chapters: ChapterAsset[] = [...afmChapters, ...frChapters];

const averageReadiness = (list: ChapterAsset[]) =>
  list.length ? Math.round(list.reduce((sum, chapter) => sum + chapter.readiness, 0) / list.length) : 0;

export const subjects: SubjectGroup[] = [
  {
    id: "afm",
    code: "AFM",
    name: "Advanced Financial Management",
    group: "Group I · Sprint focus",
    readiness: averageReadiness(afmChapters),
    chapters: afmChapters,
  },
  {
    id: "fr",
    code: "FR",
    name: "Financial Reporting",
    group: "Group I",
    readiness: averageReadiness(frChapters),
    chapters: frChapters,
  },
  {
    id: "audit",
    code: "Audit",
    name: "Advanced Audit",
    group: "Group I",
    readiness: 0,
    chapters: [],
  },
  {
    id: "dt",
    code: "DT",
    name: "Direct Tax",
    group: "Group II",
    readiness: 0,
    chapters: [],
  },
  {
    id: "idt",
    code: "IDT",
    name: "Indirect Tax",
    group: "Group II",
    readiness: 0,
    chapters: [],
  },
  {
    id: "spom",
    code: "SPOM",
    name: "Self-Paced Online Modules",
    group: "SPOM",
    readiness: 0,
    chapters: [],
  },
];
