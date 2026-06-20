# Authoring AFM Chapter Workspaces — Guide for Codex

**Read this fully before writing any chapter.** You are building the study
material the user will actually study from. The goal is a **simplified,
exam-testable** workspace that **saves the student time** — NOT a reproduction
of the ICAI chapter.

> ⛔️ **Do NOT paste or lightly re-flow the ICAI / Mistral-OCR text.** Two earlier
> attempts dumped the whole chapter verbatim (one ran ~2,900 lines / 277 KB) and
> were thrown away. Verbatim = rejected. **Author from understanding, tightly.**

---

## 0. The brief: tight, exam-focused, curated

For each chapter, your `ChapterDoc` should let a student revise the examinable
core **fast**. Cover every *topic*, but be ruthless about volume:

- **Concepts & definitions** — crisp, in your own words. Keep the exact ICAI
  wording only for definitions/lists that are examined verbatim. One or two
  sentences each, not paragraphs.
- **Every formula** — stated once in a `formula` block, each symbol defined.
- **Worked sums — curated, not exhaustive.** Pick **one tight, representative
  worked sum per calculation type** (e.g. one expected-NPV, one SD/CV, one
  certainty-equivalent…). **Do NOT reproduce all of ICAI's illustrations** — if
  the chapter has 13 illustrations covering 6 techniques, you write ~6 clean
  worked sums, not 13. Each shows: formula → substitution → **bold final
  answer**, with a clean `<table class="tbl">` for any working.
- **The key contrasts and traps** — comparison tables (RADR vs CE, fundamental
  vs technical…) and the common exam traps.
- **A quiz** of 10–12 MCQs on the testable points.

**Aim for roughly 250–500 lines per chapter** (Ch 1–4 are good references at
~250–450 lines). If you're past ~600, you're dumping — cut it back. Simpler and
shorter is better, as long as every *topic* and *formula* is present.

**Don't invent facts**, but **do** simplify, paraphrase and omit ICAI's padding
(history, repeated prose, redundant illustrations). The student wants the
testable essence, not the textbook.

---

## 0.5 Author it — do NOT paste the raw extraction (read this twice)

"Complete" means **fully reproduced AND readable**. It does **NOT** mean copying
the raw text-extraction of the PDF into `question`/`solution` strings. A raw
dump fails the assignment even if every illustration is technically present,
because the student cannot read it. The first attempt at Chapter 3 did exactly
this and was rejected — learn from it:

**Banned (these are bugs, not content):**

- ❌ **Pasting the PDF extraction verbatim.** Re-type every illustration and
  solution as clean, readable text/HTML. Read the source, understand the maths,
  then write it properly.
- ❌ **Whitespace-aligned "tables" inside a string** (columns separated by runs
  of spaces and `<br>`). **HTML collapses whitespace**, so these render as an
  unreadable wall of numbers. **Every table MUST use the `table` block** on a
  `ConceptCard` (see §5 "Tables"). No exceptions.
- ❌ **Broken/collapsed formula layout** from the PDF, e.g.
  `16,500 18,150 19,965 21,962 + 2 + 3 + 4 - 40,000 (1.12)`. Rebuild each
  formula cleanly in a `formula` block using Unicode, e.g.
  `NPV = Σ [CFₜ ÷ (1+k)ᵗ] − I₀`, then show the substitution step-by-step.
- ❌ **Mojibake / extraction artefacts**: glyphs like `൫ ൯`, `σ2` (write **σ²**),
  `Σt=1`, `I oNPV`, `RateReal`, stray superscript digits inline. None of these
  may appear. Folios use the pilcrow **`¶`** (e.g. `"¶ 1"`), never `₹`.
- ❌ **Truncated titles** ending in `...`. Write a real, short descriptive title
  for every `tyk` item (e.g. "Inflation-adjusted NPV — two approaches").
- ❌ **Theory bleeding into a `solution`.** A `tyk` `solution` contains the
  worked answer only. Section theory belongs in `cards`/`note`/`formula` blocks
  in the relevant section, not appended to an illustration's solution.

**Required quality bar for every numerical illustration:**

1. A clear `title` and the full `question` (clean text; data tables as a `table`
   block or a tidy inline list — not space-aligned columns).
2. A `solution` that a student can follow line by line: formula stated → values
   substituted → intermediate figures → **final answer in bold**. Use a `table`
   block for any working that is naturally tabular (cash-flow schedules, PV
   tables, variance tables).
3. Figures must tie out to ICAI exactly (same rounding, same PV factors).

Keep each worked sum tight — a clean table plus a few lines of working, not a
page. And remember §0: include **one representative sum per technique**, not
every ICAI illustration.

---

## 1. What already exists (study these first)

Two AFM chapters are done and are your **reference implementations**:

- [`afmCh1FinancialPolicy.ts`](./afmCh1FinancialPolicy.ts) — a pure-theory chapter.
- [`afmCh2RiskManagement.ts`](./afmCh2RiskManagement.ts) — theory + one computation
  (VaR) with the ICAI worked example **and** the ICAI practical question.

The FR chapters are also good templates, especially for dense material:
[`frCh2Framework.ts`](./frCh2Framework.ts) (dense theory) and
[`indAs23.ts`](./indAs23.ts) (the richest example — flips, a drill, a quiz, TYK
worked problems, and interactive calculators).

The block model and all types are defined in
[`../chapterDoc.ts`](../chapterDoc.ts). **Trust the types** — `tsc` runs on build
and will reject anything malformed.

---

## 2. Source material & file locations

ICAI AFM source texts live in the repo (do not commit changes to them):

```
ICAI_Materials_Text/02_AFM_Advanced_Financial_Management/
  001 - Chapter 1- Financial Policy and Corporate Strategy - ...txt
  002 - Chapter 2- Risk Management - ...txt
  003 - Chapter 3- Advanced Capital Budgeting Decisions - ...txt
  ... through ...
  015 - Chapter 15- Startup Finance - ...txt
  016 - Appendix - ...txt          (tables/PV factors etc. — use where relevant)
```

**Always read the matching source file end-to-end before writing**, and keep it
open while authoring so nothing is skipped. The chapter number → file is already
wired in [`../catalog.ts`](../catalog.ts) via the `afm(...)` `srcFile` argument.

> Note on the AI tutor: `sourceFile` is only a **citation string** sent to the
> tutor — the tutor does not read the file. So the *content* a student sees and
> the *grounding* the tutor gets both come from **your `ChapterDoc`**, not from
> the file. One more reason completeness matters.

---

## 3. The workflow for one chapter (e.g. Chapter 3)

1. **Read** `003 - Chapter 3- Advanced Capital Budgeting Decisions - ...txt`
   completely. Note every heading, formula, illustration, table, and end-of-chapter
   question.
2. **Create** `app/src/data/chapters/afmCh3CapitalBudgeting.ts` exporting a
   `ChapterDoc` named `afmCh3CapitalBudgetingDoc`.
   - `id: "afm-ch3"`, `storageKey: "afmch3done"` (pattern: `afmch{N}done`).
   - Map ICAI sections to `sections[]`; reproduce **all** content using the
     blocks in §5; put every illustration/practical in `tyk` blocks with full
     solutions.
3. **Wire it in** [`../catalog.ts`](../catalog.ts): add the import at the top and
   pass the doc as the **last argument** to the existing `afm(3, ...)` call:
   ```ts
   import { afmCh3CapitalBudgetingDoc } from "./chapters/afmCh3CapitalBudgeting";
   // ...
   afm(3, "Advanced Capital Budgeting Decisions", "cap", ["NPV", ...],
     "…summary…",
     "003 - Chapter 3- Advanced Capital Budgeting Decisions - 74830bos60509-cp3.txt",
     afmCh3CapitalBudgetingDoc),   // ← add this 7th arg
   ```
   Adding the doc flips the chapter from `Planned` to `Live` automatically; the
   workspace, the AI context and the flashcard deck all pick it up. **Nothing
   else needs editing.**
4. **Verify** (§9), then commit + deploy (§10).

Do chapters in syllabus order (3 → 15) unless told otherwise.

---

## 4. `ChapterDoc` anatomy

```ts
export const afmChNDoc: ChapterDoc = {
  id: "afm-chN",
  storageKey: "afmchNdone",        // unique localStorage key for section mastery
  kicker: "Advanced Financial Management · Chapter N · ICAI Study Material",
  heroTitle: "<plain or limited-HTML headline, use <em> for emphasis>",
  heroStrap: "1–3 sentence orientation: what the chapter covers + how to use it.",
  heroStats: [                     // 3–5 quick stats shown in the hero
    { value: "7", label: "ICAI sections" },
    { value: "12", label: "Illustrations" },
    { value: "Σ", label: "Key formula" },
    { value: "10", label: "MCQs" },
  ],
  flow: {                          // the right-hand "decision flow" panel
    eyebrow: "Chapter spine",
    title: "one-line through-line of the chapter",
    steps: [                       // 3–4 steps
      { title: "Step name", body: "one sentence" },
    ],
    foot: "a key takeaway / formula footer",
  },
  sections: [ /* see §5 — one per ICAI section, in order */ ],
  footer: "Chapter N · <name> — built from the ICAI Study Material (Chapter N).",
};
```

Each **section**:

```ts
{
  id: "unique-stable-id",          // unique within the doc; used for nav + progress
  folio: "¶ 3",                    // small label: "¶ 3", "Unit 2", "MCQ", etc.
  title: "Section title",
  lede: "optional intro line (limited HTML)",
  blocks: [ /* §5 */ ],
}
```

`id` must be **unique and stable** (section mastery is stored against it).

---

## 5. Block reference — pick the right block for each kind of content

All "rich text" fields accept a **limited inline-HTML subset**: `<b> <strong>
<i> <em> <br> <span> <sup> <sub>`. No block-level HTML, no scripts. For maths use
**Unicode** (× ÷ √ ² ³ ₹ ≤ ≥ ≈ Σ π σ →) — there is **no LaTeX/MathJax**.

| Block | Shape | Use it for |
|---|---|---|
| `cards` | `{ kind:"cards", columns:2\|3, items: ConceptCard[] }` | The workhorse. Concept blocks, classifications, comparisons. `columns` is only `2` or `3`. |
| `split` | `{ kind:"split", left:{tag,tagTone,title,body}, right:{…} }` | Two-way contrasts (A vs B, advantages vs limitations). |
| `note` | `{ kind:"note", body }` | An important note / clarification (neutral callout). |
| `trap` | `{ kind:"trap", body }` | An exam trap / common mistake (warning callout). |
| `formula` | `{ kind:"formula", lines: string[] }` | Formulas. One line per array entry; define every symbol on its own line. |
| `flips` | `{ kind:"flips", title?, items:[{label,question,answer}] }` | Self-test flashcards (tap to reveal). Great for definitions/quick recall. **Feeds the recall-card deck.** |
| `timeline` | `{ kind:"timeline", nodes:[{phase,title,body}] }` | Ordered processes / steps / phases. |
| `bullets` | `{ kind:"bullets", items: string[] }` | A plain list (renders as one card). |
| `tyk` | `{ kind:"tyk", items:[{ref,title,question,solution}] }` | **Curated worked sums — one per technique** (see §0). Accordion: `ref` = "Worked sum", `title` = short label, `question` = the problem, `solution` = **tight step-by-step working with the final answer in bold** (use `<table class="tbl">` for tabular working). |
| `quiz` | `{ kind:"quiz", items:[{question,options[],answer,why}] }` | MCQ bank. `answer` is the **0-based index** of the correct option. `why` explains it. **Feeds the recall-card deck.** |
| `drill` | `{ kind:"drill", yesLabel?, noLabel?, items:[{prompt,capitalise:boolean,why}] }` | A rapid binary-decision drill. The field is named `capitalise` for historical reasons — it just means **"is the `yesLabel` choice the correct one?"**. Set `yesLabel`/`noLabel` to your two choices. |
| `calculator` | `{ kind:"calculator", calc: "forex"\|"capRate"\|"commencement" }` | **Avoid for AFM.** Only those three Ind AS 23 calculators exist. Put computations in `tyk`/`formula` instead (see §6). |

### Tables
There is **no standalone table block.** To show a table, put it on a
`ConceptCard` inside a `cards` block:

```ts
{ kind: "cards", columns: 2, items: [{
  tag: "Comparison", tagTone: "gold", title: "…",
  table: {
    columns: ["Basis", "Method A", "Method B"],
    rows: [
      { label: "Risk", values: ["Low", "High"], strong: true },
      { label: "Return", values: ["…", "…"], tone: "cap" }, // tone optional
    ],
  },
}]}
```

### `ConceptCard` fields
`{ tag?, tagTone?, title, body?, bullets?: string[], note?, trap?, table? }` —
mix freely. `tagTone` (and `split`/`row` `tone`) ∈ `"cap" | "exp" | "ntr" |
"gold" | "danger"` (cap = green/positive, exp = amber, gold = highlight, ntr =
neutral, danger = red).

---

## 6. Computation-heavy chapters (3, 5, 6, 9, 10, 11, 12, 13, 14)

AFM is mostly numerical. Reproduce the maths in full:

- Put **each ICAI illustration and each practical question** in a `tyk` item.
  The `solution` must show **every step** (formula → substitution → intermediate
  figures → **bold final answer**), exactly tracing the ICAI solution. Use a
  table inside the prose where ICAI uses one (you can embed simple tables as text
  with `<br>` and aligned figures, or use a `cards`+`table` block before/after
  the `tyk`).
- State each **formula** once in a `formula` block, then apply it in the `tyk`s.
- Where ICAI gives **PV/annuity factors or rate tables** (see the Appendix file),
  reproduce the exact factors used so the student can follow the arithmetic.
- Do **not** round differently from ICAI; match their figures so answers tie out.
- Only build a new interactive `calculator` if explicitly asked — it requires
  adding a `CalculatorId`, a React component, and a `calculators` map entry in
  `../../components/ChapterDashboard.tsx`. Default to `tyk` + `formula`.

---

## 7. Flashcards come for free
The recall-card deck auto-derives from `flips`, `quiz` and `drill` blocks across
all live chapters. So adding good flips/quizzes/drills to a chapter also grows
the user's spaced-repetition deck — include them generously.

---

## 8. Constraints & gotchas (will save you a failed build)

- `columns` on `cards` is **only `2` or `3`** — `1` is a TYPE ERROR that fails the
  build. For a single full-width card (e.g. a wide comparison table) use
  `columns: 2` with one item; CSS makes a lone card span the whole row.
- `quiz.answer` is a **0-based index**.
- `drill.capitalise` = "the `yesLabel` option is correct" (boolean).
- Rich text = the inline-HTML subset above only; maths via Unicode.
- Every `section.id` unique within a doc; `doc.id === "afm-ch{N}"`;
  `storageKey === "afmch{N}done"`.
- Keep the `kicker` ending in "· ICAI Study Material".
- Don't edit the ICAI source `.txt` files. Don't touch `sourceFile`/order in
  `catalog.ts` other than adding your doc as the last `afm(...)` argument.
- TypeScript is strict; run the build (§9) — it is the source of truth.

---

## 9. Verify before you call it done

From `app/`:

```bash
npm run lint      # must pass clean
npm run build     # tsc + vite; must succeed
npm run dev       # open http://localhost:5173 → Library → AFM → your chapter
```

Manual check in the browser:
- The chapter opens as a full workspace with a hero + section nav + all sections.
- **Tick off against the ICAI file**: every illustration, table, formula and
  end-of-chapter question is present and correct.
- Open every `tyk` — solutions are complete and figures tie to ICAI.
- The `quiz` runs and answers/explanations are right.
- No console errors.

---

## 10. Ship it

```bash
cd app
npm run deploy            # builds and force-pushes dist/ to the gh-pages branch
```

Bump the service-worker cache version in
[`../../../public/sw.js`](../../public/sw.js) (`CACHE_NAME = "trinsic-vN"` →
`vN+1`) **every deploy**, or installed devices won't pick up the new content.
Then commit the source on `main` and push.

---

## 11. Definition of done (per chapter)

- [ ] Read the full ICAI source file.
- [ ] Every ICAI section represented, in order.
- [ ] Every definition/classification reproduced (verbatim where ICAI is exact).
- [ ] Every formula in a `formula` block with symbols defined.
- [ ] **One representative worked sum per technique** as a `tyk` (NOT every ICAI illustration).
- [ ] Every end-of-chapter TYK question included with its answer.
- [ ] Every ICAI table reproduced.
- [ ] Notes, exceptions and exam traps captured.
- [ ] A quiz of 8–15 MCQs.
- [ ] Doc wired into `catalog.ts`; `lint` + `build` pass; verified in the browser.
- [ ] SW cache bumped; deployed.

Build the chapter as if the student will never see anything else — because they
won't.
```
