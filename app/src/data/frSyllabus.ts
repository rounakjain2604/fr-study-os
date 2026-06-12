// Full CA Final Paper 1 (Financial Reporting) syllabus map — ICAI New Scheme.
// Difficulty and first-pass hour estimates are planning aids for the owner to
// tune, not ICAI figures. Chapter/unit numbering follows the study-material
// anchors already used in this project (Ch 5 = Ind AS 115, Ch 6 U3 = Ind AS 23,
// Ch 11 U2 = FI classification, Ch 13 = Consolidation).

export type Difficulty = "low" | "mid" | "high";

export type SyllabusUnit = {
  id: string;
  folio: string; // e.g. "6.3"
  title: string;
  standards?: string; // e.g. "Ind AS 23"
  difficulty: Difficulty;
  hours: number;
  liveChapterId?: string; // links to a workspace in the catalog
};

export type SyllabusChapter = {
  chapter: number;
  title: string;
  units: SyllabusUnit[];
};

const u = (
  folio: string,
  title: string,
  standards: string | undefined,
  difficulty: Difficulty,
  hours: number,
  liveChapterId?: string,
): SyllabusUnit => ({ id: `fr-syl-${folio.replace(/\./g, "-")}`, folio, title, standards, difficulty, hours, liveChapterId });

export const FR_SYLLABUS: SyllabusChapter[] = [
  {
    chapter: 1,
    title: "Introduction to Indian Accounting Standards",
    units: [u("1", "Introduction to Ind AS", undefined, "low", 4, "fr-ch1-intro")],
  },
  {
    chapter: 2,
    title: "Conceptual Framework for Financial Reporting",
    units: [u("2", "Conceptual Framework under Ind AS", undefined, "mid", 6, "fr-ch2-framework")],
  },
  {
    chapter: 3,
    title: "Ind AS on Presentation of Items in the Financial Statements",
    units: [
      u("3.1", "Presentation of Financial Statements", "Ind AS 1", "mid", 8, "fr-ch3-presentation"),
      u("3.2", "Interim Financial Reporting", "Ind AS 34", "low", 4, "fr-ch3-presentation"),
      u("3.3", "Statement of Cash Flows", "Ind AS 7", "mid", 6, "fr-ch3-presentation"),
    ],
  },
  {
    chapter: 4,
    title: "Ind AS on Measurement based on Accounting Policies",
    units: [
      u("4.1", "Accounting Policies, Estimates & Errors", "Ind AS 8", "mid", 5),
      u("4.2", "Events after the Reporting Period", "Ind AS 10", "low", 3),
      u("4.3", "Fair Value Measurement", "Ind AS 113", "mid", 6),
    ],
  },
  {
    chapter: 5,
    title: "Revenue from Contracts with Customers",
    units: [u("5", "Five-step model, variable consideration, contract costs", "Ind AS 115", "high", 18, "fr-ind-as-115")],
  },
  {
    chapter: 6,
    title: "Ind AS on Assets of the Financial Statements",
    units: [
      u("6.1", "Inventories", "Ind AS 2", "low", 4),
      u("6.2", "Property, Plant and Equipment", "Ind AS 16", "mid", 8),
      u("6.3", "Borrowing Costs", "Ind AS 23", "mid", 6, "fr-ind-as-23"),
      u("6.4", "Impairment of Assets", "Ind AS 36", "high", 10),
      u("6.5", "Intangible Assets", "Ind AS 38", "mid", 6),
      u("6.6", "Investment Property", "Ind AS 40", "low", 4),
      u("6.7", "Non-current Assets Held for Sale", "Ind AS 105", "low", 4),
    ],
  },
  {
    chapter: 7,
    title: "Leases",
    units: [u("7", "Lessee & lessor accounting, sale-and-leaseback", "Ind AS 116", "high", 14)],
  },
  {
    chapter: 8,
    title: "Ind AS on Liabilities of the Financial Statements",
    units: [
      u("8.1", "Employee Benefits", "Ind AS 19", "high", 10),
      u("8.2", "Provisions, Contingent Liabilities & Assets", "Ind AS 37", "mid", 6),
    ],
  },
  {
    chapter: 9,
    title: "Ind AS on Items impacting the Financial Statements",
    units: [
      u("9.1", "Income Taxes (current + deferred)", "Ind AS 12", "high", 12),
      u("9.2", "Effects of Changes in Foreign Exchange Rates", "Ind AS 21", "mid", 7),
    ],
  },
  {
    chapter: 10,
    title: "Ind AS on Disclosures in the Financial Statements",
    units: [
      u("10.1", "Related Party Disclosures", "Ind AS 24", "low", 3),
      u("10.2", "Earnings per Share", "Ind AS 33", "mid", 8),
      u("10.3", "Operating Segments", "Ind AS 108", "low", 4),
    ],
  },
  {
    chapter: 11,
    title: "Accounting and Reporting of Financial Instruments",
    units: [
      u("11.1", "Financial Instruments: Scope & Definitions", "Ind AS 32", "mid", 4),
      u("11.2", "Classification & Measurement", "Ind AS 109", "high", 14, "fr-ind-as-109-u2"),
      u("11.3", "Recognition & Derecognition", "Ind AS 109", "high", 8),
      u("11.4", "Derivatives, Embedded Derivatives & Hedging", "Ind AS 109", "high", 8),
      u("11.5", "Disclosures", "Ind AS 107", "low", 3),
    ],
  },
  {
    chapter: 12,
    title: "Business Combinations",
    units: [u("12", "Acquisition method, goodwill, common control", "Ind AS 103", "high", 14)],
  },
  {
    chapter: 13,
    title: "Consolidated and Separate Financial Statements",
    units: [u("13", "Subsidiaries, associates, JVs, NCI, step/disposal", "Ind AS 110 / 111 / 27 / 28 / 112", "high", 22, "fr-consolidation")],
  },
  {
    chapter: 14,
    title: "Share-Based Payment",
    units: [u("14", "Equity-settled, cash-settled, modifications", "Ind AS 102", "high", 10)],
  },
  {
    chapter: 15,
    title: "First-time Adoption of Ind AS",
    units: [u("15", "Opening balance sheet, exemptions & exceptions", "Ind AS 101", "mid", 6)],
  },
  {
    chapter: 16,
    title: "Other Indian Accounting Standards",
    units: [
      u("16.1", "Government Grants", "Ind AS 20", "low", 3),
      u("16.2", "Agriculture", "Ind AS 41", "low", 2),
    ],
  },
  {
    chapter: 17,
    title: "Analysis of Financial Statements",
    units: [u("17", "Ratio-driven analysis & Ind AS impact reading", undefined, "mid", 6)],
  },
  {
    chapter: 18,
    title: "Professional and Ethical Duty of a Chartered Accountant",
    units: [u("18", "Ethics in reporting contexts", undefined, "low", 3)],
  },
  {
    chapter: 19,
    title: "Accounting and Technology",
    units: [u("19", "Technology in the reporting workflow", undefined, "low", 3)],
  },
];

export const DIFFICULTY_ORDER: Record<Difficulty, number> = { high: 0, mid: 1, low: 2 };

export const DIFFICULTY_LABEL: Record<Difficulty, string> = { low: "light", mid: "core", high: "heavy" };

export const frSyllabusTotals = () => {
  const units = FR_SYLLABUS.flatMap((chapter) => chapter.units);
  return {
    chapters: FR_SYLLABUS.length,
    units: units.length,
    hours: units.reduce((sum, unit) => sum + unit.hours, 0),
    byDifficulty: {
      high: units.filter((unit) => unit.difficulty === "high").length,
      mid: units.filter((unit) => unit.difficulty === "mid").length,
      low: units.filter((unit) => unit.difficulty === "low").length,
    },
  };
};
