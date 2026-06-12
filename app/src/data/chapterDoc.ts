// Block-based chapter content model.
// Rich text fields hold a limited subset of inline HTML (b, i, em, strong, br, span)
// authored in local data files only — never from user or network input.

export type Tone = "cap" | "exp" | "ntr" | "gold" | "danger";

export type RichText = string;

export type ConceptCard = {
  tag?: string;
  tagTone?: Tone;
  title: RichText;
  body?: RichText;
  bullets?: RichText[];
  note?: RichText;
  trap?: RichText;
  table?: ChapterTable;
};

export type ChapterTable = {
  columns?: string[];
  rows: Array<{ label: RichText; values: RichText[]; tone?: Tone; strong?: boolean }>;
};

export type CalculatorId = "forex" | "capRate" | "commencement";

export type ChapterBlock =
  | { kind: "cards"; columns: 2 | 3; items: ConceptCard[] }
  | {
      kind: "split";
      left: { tag: string; tagTone: Tone; title: RichText; body: RichText };
      right: { tag: string; tagTone: Tone; title: RichText; body: RichText };
    }
  | { kind: "note"; body: RichText }
  | { kind: "trap"; body: RichText }
  | { kind: "formula"; lines: RichText[] }
  | { kind: "flips"; title?: string; items: Array<{ label: string; question: RichText; answer: RichText }> }
  | { kind: "timeline"; nodes: Array<{ phase: string; title: string; body: RichText }> }
  | { kind: "bullets"; items: RichText[] }
  | { kind: "calculator"; calc: CalculatorId }
  // yesLabel/noLabel default to the Ind AS 23 capitalise/expense wording.
  | { kind: "drill"; yesLabel?: string; noLabel?: string; items: Array<{ prompt: string; capitalise: boolean; why: string }> }
  | { kind: "tyk"; items: Array<{ ref: string; title: string; question: RichText; solution: RichText }> }
  | { kind: "quiz"; items: Array<{ question: string; options: string[]; answer: number; why: string }> };

export type ChapterSection = {
  id: string;
  folio: string;
  title: string;
  lede?: RichText;
  blocks: ChapterBlock[];
};

export type ChapterDoc = {
  id: string;
  storageKey: string;
  kicker: string;
  heroTitle: RichText;
  heroStrap: RichText;
  heroStats: Array<{ value: string; label: string }>;
  flow: { eyebrow: string; title: string; steps: Array<{ title: string; body: string }>; foot: string };
  sections: ChapterSection[];
  footer: RichText;
};

const TAG_RE = /<[^>]+>/g;

export const richToPlain = (value: RichText | undefined) =>
  (value ?? "").replace(TAG_RE, " ").replace(/\s+/g, " ").trim();

// Plain-text digest of a section, used to bound the AI tutor context.
export function sectionPlainText(section: ChapterSection, maxLength = 2400): string {
  const parts: string[] = [];
  if (section.lede) parts.push(richToPlain(section.lede));

  for (const block of section.blocks) {
    if (block.kind === "cards") {
      for (const card of block.items) {
        parts.push(
          [richToPlain(card.title), richToPlain(card.body), ...(card.bullets ?? []).map(richToPlain)]
            .filter(Boolean)
            .join(" — "),
        );
      }
    } else if (block.kind === "split") {
      parts.push(`${richToPlain(block.left.title)}: ${richToPlain(block.left.body)}`);
      parts.push(`${richToPlain(block.right.title)}: ${richToPlain(block.right.body)}`);
    } else if (block.kind === "note" || block.kind === "trap") {
      parts.push(richToPlain(block.body));
    } else if (block.kind === "formula") {
      parts.push(block.lines.map(richToPlain).join(" "));
    } else if (block.kind === "flips") {
      for (const flip of block.items) parts.push(`${richToPlain(flip.question)} → ${richToPlain(flip.answer)}`);
    } else if (block.kind === "timeline") {
      for (const node of block.nodes) parts.push(`${node.phase} ${node.title}: ${richToPlain(node.body)}`);
    } else if (block.kind === "bullets") {
      parts.push(...block.items.map(richToPlain));
    }
  }

  return parts.filter(Boolean).join("\n").slice(0, maxLength);
}
