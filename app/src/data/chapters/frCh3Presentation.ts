// FR Chapter 3 — Ind AS on Presentation of Items in the Financial Statements:
// Unit 1 Ind AS 1, Unit 2 Ind AS 34, Unit 3 Ind AS 7. Authored from the ICAI
// Study Material texts (74885/74886/74887bos60524-cp3). Illustration numbers
// refer to those units.

import type { ChapterDoc } from "../chapterDoc";

export const frCh3PresentationDoc: ChapterDoc = {
  id: "fr-ch3-presentation",
  storageKey: "frch3done",
  kicker: "Financial Reporting · Chapter 3 · Ind AS 1 / 34 / 7",
  heroTitle: "Three standards, one job: <em>how the financial statements themselves are built</em> — annually, at interim dates, and for cash.",
  heroStrap:
    "Ind AS 1 sets the complete set, the general features, and the current/non-current judgement calls; Ind AS 34 condenses them for interim periods on a year-to-date discipline; Ind AS 7 explains every rupee of cash across operating, investing and financing. The classification drills below are where the marks live.",
  heroStats: [
    { value: "3", label: "Standards" },
    { value: "11", label: "Sections" },
    { value: "20+", label: "ICAI Illustrations" },
    { value: "14", label: "Drill Scenarios" },
    { value: "12", label: "MCQs" },
  ],
  flow: {
    eyebrow: "Decision Flow",
    title: "From trial balance to a complete set",
    steps: [
      { title: "Present fairly.", body: "True and fair view, going concern, accrual, materiality, no offsetting — Ind AS 1." },
      { title: "Classify everything.", body: "Current vs non-current by operating cycle, 12 months, trading and rights at the reporting date." },
      { title: "Condense at interim.", body: "Ind AS 34: same policies, year-to-date measurement, annual effective tax rate." },
      { title: "Explain the cash.", body: "Ind AS 7: operating, investing, financing — with India's fixed interest/dividend rules." },
    ],
    foot: "Ind AS 1 · Ind AS 34 · Ind AS 7",
  },
  sections: [
    {
      id: "map",
      folio: "¶ 0",
      title: "The Map",
      lede: "One chapter, three standards. Hold what each one owns before diving into any of them.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Unit 1",
              tagTone: "cap",
              title: "Ind AS 1 — Presentation",
              body: "The complete set of financial statements, eight general features, current/non-current classification, P&amp;L + OCI structure, statement of changes in equity, and notes. Applies to all entities; for condensed interim statements only paras 15–35 apply.",
            },
            {
              tag: "Unit 2",
              tagTone: "gold",
              title: "Ind AS 34 — Interim",
              body: "Doesn't mandate WHO reports or how often — only the minimum content and the recognition/measurement discipline once an entity reports (SEBI makes listed companies report quarterly). Core idea: the frequency of reporting must not change annual results.",
            },
            {
              tag: "Unit 3",
              tagTone: "exp",
              title: "Ind AS 7 — Cash Flows",
              body: "Classifies every cash flow as operating, investing or financing; defines cash &amp; cash equivalents; fixes the treatment of interest, dividends and taxes; excludes non-cash transactions.",
            },
          ],
        },
      ],
    },
    {
      id: "indas1-set",
      folio: "1.1–1.6",
      title: "Ind AS 1 — The Complete Set & Key Definitions",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Complete set",
              tagTone: "cap",
              title: "Five statements + comparatives",
              bullets: [
                "Balance sheet as at period end",
                "Statement of profit and loss — a <b>single statement</b> with P&amp;L section first, OCI section directly after",
                "Statement of changes in equity",
                "Statement of cash flows",
                "Notes: material accounting policy information + explanatory information",
                "Comparatives for the preceding period; a <b>third balance sheet</b> (opening, preceding period) when a retrospective policy change/restatement/reclassification materially affects it — no related notes needed for it",
              ],
              note: "All statements get <b>equal prominence</b>. Management reviews, ESG reports etc. presented outside the financial statements are outside Ind AS.",
            },
            {
              tag: "Definitions",
              tagTone: "ntr",
              title: "Material — and 'obscured'",
              body: "Information is material if omitting, misstating <b>or obscuring</b> it could reasonably influence primary users' decisions. Obscuring = vague language, scattering across the statements, inappropriate aggregation OR disaggregation, hiding material with immaterial.",
              bullets: [
                "<b>Total comprehensive income</b> = profit or loss + OCI = all equity changes except owner transactions",
                "<b>Reclassification adjustments</b>: amounts moved from OCI to P&amp;L in the current period",
                "<b>Impracticable</b>: cannot apply after every reasonable effort",
              ],
            },
          ],
        },
        {
          kind: "flips",
          title: "OCI components — reclassifiable or not?",
          items: [
            { label: "OCI-1", question: "Revaluation surplus changes (Ind AS 16/38)?", answer: "<b>Never reclassified</b> to P&L — may be transferred within equity to retained earnings as the asset is used or derecognised." },
            { label: "OCI-2", question: "Remeasurements of defined benefit plans (Ind AS 19)?", answer: "<b>Never reclassified</b> to P&L." },
            { label: "OCI-3", question: "Foreign-operation translation differences (Ind AS 21)?", answer: "<b>Reclassified</b> to P&L on disposal of the foreign operation." },
            { label: "OCI-4", question: "FVOCI-designated equity instruments (Ind AS 109 ¶5.7.5)?", answer: "<b>Never reclassified</b> — gains stay in equity even on sale." },
            { label: "OCI-5", question: "FVOCI debt instruments (Ind AS 109 ¶4.1.2A)?", answer: "<b>Reclassified</b> to P&L on derecognition." },
            { label: "OCI-6", question: "Effective portion of cash flow hedges?", answer: "<b>Reclassified</b> when the hedged cash flows hit P&L — unless basis-adjusted directly into an asset/liability's carrying amount (then no reclassification adjustment arises)." },
            { label: "OCI-7", question: "Own credit risk on liabilities designated at FVTPL?", answer: "<b>Not reclassified</b> to P&L." },
          ],
        },
      ],
    },
    {
      id: "indas1-features",
      folio: "1.7",
      title: "Ind AS 1 — General Features",
      lede: "Eight features. The exam's favourites: the explicit-and-unreserved compliance statement, the rare-departure conditions, going concern's 12-month minimum, and offsetting.",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "True & fair",
              tagTone: "cap",
              title: "Compliance — stated, not implied",
              bullets: [
                "Ind AS compliance ⇒ make an <b>explicit and unreserved statement</b> in the notes; never claim it unless ALL Ind AS are met",
                "An auditor's qualification doesn't stop management's bona fide compliance statement (Illustration 1 — preparation is management's responsibility)",
                "<b>Inappropriate policies are NOT cured</b> by disclosure, notes or explanatory material",
                "Departure from an Ind AS only in <b>extremely rare</b> cases where compliance would be so misleading it conflicts with the Framework's objective — and only if regulation doesn't prohibit it; disclose the title, nature, reason, treatment, and the financial effect for each period. If regulation prohibits departure: disclose the adjustments that would have been needed",
              ],
            },
            {
              tag: "Going concern",
              tagTone: "cap",
              title: "Assess at least 12 months out",
              body: "Assess ability to continue for <b>at least 12 months from the reporting date</b> — but it's a minimum: intending to cease in 18 months still kills the going-concern basis. Disclose material uncertainties; if not a going concern, disclose the basis used and why. Post-year-end evidence that the entity is no longer a going concern → don't prepare on that basis (Ind AS 10 fundamental change). Doubt indicators: net liability position, maturing borrowings without renewal prospects, creditor withdrawal, negative operating cash flows, arrears of dividends, loss of key market/management, etc. (Illustration 2 shows the disclosure drafting.)",
            },
            {
              tag: "Materiality & offsetting",
              tagTone: "ntr",
              title: "Aggregate similar, never net dissimilar",
              bullets: [
                "Present each <b>material class</b> separately; immaterial line items aggregate (maybe separately in notes); a specific Ind AS disclosure can be skipped if immaterial (unless law requires)",
                "<b>No offsetting</b> of assets/liabilities or income/expenses unless an Ind AS requires/permits. Valuation allowances (obsolescence, doubtful debts) are NOT offsetting",
                "Net presentation OK where it reflects substance: disposal gains net of carrying amount and selling costs; provision expense net of contractual third-party reimbursement; FX gains/losses and trading instruments net (unless material)",
                "Agent's commission stays <b>gross</b> — sub-agent commission is an expense, not a deduction (Illustration 3)",
              ],
            },
            {
              tag: "Frequency & comparatives",
              tagTone: "ntr",
              title: "At least annually, at least two of everything",
              bullets: [
                "Report at least annually; a longer/shorter period needs the reason + a non-comparability caution (Example 6: 14-month period on alignment with parent)",
                "Minimum: 2 balance sheets, 2 P&amp;L, 2 cash flow statements, 2 SOCE + notes",
                "Reclassifying comparatives: disclose nature, amount, reason; if impracticable — why not, and what would have changed",
                "Consistency: keep presentation period to period unless a significant operations change or an Ind AS requires otherwise",
                "Restating comparatives for finalised provisional business-combination accounting does NOT trigger a third balance sheet if opening position was unaffected (Illustration 4)",
              ],
            },
          ],
        },
        {
          kind: "note",
          body: "<b>Accrual</b> is the eighth feature: everything except cash flow information is prepared on the accrual basis, recognising elements per the Framework's definitions and criteria.",
        },
      ],
    },
    {
      id: "indas1-classify",
      folio: "1.8.2",
      title: "Ind AS 1 — Current / Non-current",
      lede: "The highest-yield area of the chapter. One operating cycle, four tests each side, and the refinancing/breach rules with India's famous carve-out.",
      blocks: [
        {
          kind: "split",
          left: {
            tag: "Current asset",
            tagTone: "cap",
            title: "Any ONE of four",
            body: "(a) realised/sold/consumed in the <b>normal operating cycle</b>; (b) held primarily for <b>trading</b>; (c) realised within <b>12 months</b> of the reporting period; (d) <b>cash or cash equivalent</b> not restricted for 12+ months. Everything else is non-current. Operating cycle = acquisition of assets for processing → realisation in cash; if not identifiable, assume 12 months.",
          },
          right: {
            tag: "Current liability",
            tagTone: "exp",
            title: "Any ONE of four",
            body: "(a) settled in the normal operating cycle (trade payables stay current even beyond 12 months); (b) held for trading; (c) due within <b>12 months</b>; (d) <b>no unconditional right at the reporting date to defer settlement</b> for at least 12 months. A counterparty's option to settle in equity shares is irrelevant to classification.",
          },
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Refinancing & breach",
              tagTone: "gold",
              title: "Rights at the reporting date decide",
              bullets: [
                "Refinance agreed <b>on/before</b> the reporting date under an existing facility at the entity's discretion → <b>non-current</b>; agreed only after → <b>current</b> (Illustration 13)",
                "New facility from a <b>different bank</b> ≠ refinancing — current",
                "Mere <i>potential</i> to refinance without an arrangement → current",
                "Covenant breach making the loan payable on demand: <b>CARVE-OUT</b> — non-current if the lender agrees <b>after the reporting period but before approval of the financial statements</b> not to demand payment (IAS 1 would force current). Grace period from the lender by the reporting date must run <b>≥ 12 months</b> to rescue classification (Illustration 14: 3-month grace → current; expected future breach with extended compliance date → still non-current)",
              ],
            },
            {
              tag: "Judgement calls",
              tagTone: "ntr",
              title: "The classification zoo",
              bullets: [
                "Deferred tax assets/liabilities — <b>always non-current</b>, never current",
                "Presentation is current/non-current unless liquidity order is more relevant (financial institutions); mixed basis allowed for diverse operations",
                "Different businesses → different operating cycles; classify each item by its own cycle (Illustration 10)",
                "Whisky maturing 24 months: raw material, WIP, finished goods all <b>current</b> — realised in the cycle (Example 10)",
                "Income received in advance for a 2-year tooling service → <b>current</b>: part of the working capital cycle (Illustration 12)",
                "Electricity deposit: recoverable on demand but practically held while the entity exists → <b>non-current</b>; EMD/GST-dispute deposits → by 12-month expectation (Illustration 11)",
                "Loan repayable on demand to a subsidiary: lender classifies by substance/intent (often non-current); <b>borrower is always current</b> — no right to defer (Illustration 15)",
              ],
            },
          ],
        },
        {
          kind: "drill",
          yesLabel: "Current ✓",
          noLabel: "Non-current ✗",
          items: [
            {
              prompt: "Trade receivables expected to be realised in 15 months; the entity's operating cycle is 16 months.",
              capitalise: true,
              why: "Realised within the normal operating cycle → current, even though beyond 12 months (Illustrations 6–7).",
            },
            {
              prompt: "Receivable of ₹3,00,000 from selling a replaced production machine, due 15 months after the reporting date.",
              capitalise: false,
              why: "Not part of the operating cycle (not goods/services revenue), not trading, beyond 12 months → non-current (Example 12).",
            },
            {
              prompt: "₹5,00,000 instalment of a 3-year bond investment, repayable 1 April next year (reporting date 31 March).",
              capitalise: true,
              why: "The current portion of a non-current financial asset plus accrued interest are current — due within 12 months (Example 13, Illustration 8 mirrors it for bonds issued).",
            },
            {
              prompt: "Trade payables paid in 12.5 months; operating cycle is 14 months.",
              capitalise: true,
              why: "Operating items are current when settled within the operating cycle — even past 12 months (Illustration 9).",
            },
            {
              prompt: "9-month loan that was unconditionally rolled into a 5-year facility BEFORE the reporting date.",
              capitalise: false,
              why: "Unconditional right to defer settlement beyond 12 months exists at the reporting date → non-current (Illustration 13a).",
            },
            {
              prompt: "Same loan, but the 5-year roll-over was agreed two weeks AFTER the reporting date.",
              capitalise: true,
              why: "Rights are tested at the reporting date; a post-period refinancing doesn't change classification → current (Illustration 13b).",
            },
            {
              prompt: "Long-term loan whose covenant was breached during the year; the lender waived repayment one month after year-end, before the accounts were approved.",
              capitalise: false,
              why: "India's Ind AS 1 carve-out: post-reporting-date, pre-approval waiver → non-current. Under IAS 1 this would be current.",
            },
            {
              prompt: "Long-term loan in breach at year-end; lender granted a 3-month grace period before year-end to fix the breach.",
              capitalise: true,
              why: "A grace period rescues classification only if it ends at least 12 months after the reporting period — 3 months doesn't (Illustration 14a).",
            },
            {
              prompt: "Loan from parent, repayable on demand — classification in the BORROWER's books.",
              capitalise: true,
              why: "The borrower has no right to defer settlement beyond 12 months, whatever both parties intend → current (Illustration 15).",
            },
            {
              prompt: "Deferred tax liability expected to reverse within 9 months.",
              capitalise: false,
              why: "Deferred tax assets and liabilities are never classified as current — explicit Ind AS 1 prohibition.",
            },
            {
              prompt: "Bank overdraft repayable on demand, integral to cash management — in the balance sheet.",
              capitalise: true,
              why: "Current borrowing (financial liability) in the balance sheet. It may join cash equivalents only inside the Ind AS 7 cash flow statement.",
            },
            {
              prompt: "Inventories of a real-estate developer with a 3–4 year construction cycle.",
              capitalise: true,
              why: "Realised within that business's own operating cycle → current; each business line uses its own cycle (Illustration 10).",
            },
            {
              prompt: "Income received in advance for a 2-year tool-development service contract.",
              capitalise: true,
              why: "Part of working capital used in the normal operating cycle → current even though settled beyond 12 months (Illustration 12).",
            },
            {
              prompt: "Electricity deposit, refundable on demand whenever the connection is surrendered.",
              capitalise: false,
              why: "Commercial reality: the connection is needed for as long as the entity operates, so realisation within 12 months isn't expected → non-current (Illustration 11).",
            },
          ],
        },
      ],
    },
    {
      id: "indas1-structure",
      folio: "1.8.3–1.10",
      title: "Ind AS 1 — P&L, SOCE, Notes & the Carve-out",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "P&L section",
              tagTone: "ntr",
              title: "One statement, two sections",
              bullets: [
                "Show: profit or loss, total OCI, and <b>total comprehensive income</b>; in CFS, allocate each between owners of the parent and NCI",
                "Mandatory P&amp;L lines include: revenue (EIR interest revenue separately), derecognition gains/losses on amortised-cost assets, finance costs, Ind AS 109 impairment, equity-method share of profit, reclassification gains (amortised cost→FVTPL; FVOCI→FVTPL), tax, and a single amount for discontinued operations",
                "Expenses analysed by <b>nature</b> (Schedule III format) — Ind AS 1 in India does not offer the function-of-expense choice",
                "<b>No extraordinary items</b> — ever, in the statements or notes",
                "Extra subtotals allowed if Ind AS-measured, clear, consistent, and not more prominent than required totals",
                "OCI items grouped reclassifiable vs non-reclassifiable; tax on each OCI item disclosed (items may be shown net or gross of tax)",
              ],
            },
            {
              tag: "SOCE & notes",
              tagTone: "ntr",
              title: "Equity bridge + the notes discipline",
              bullets: [
                "SOCE: total comprehensive income (owners vs NCI), effects of Ind AS 8 retrospective adjustments per component, and an opening↔closing reconciliation per component (P&amp;L, each OCI item, owner transactions incl. control-retaining stake changes)",
                "Dividends recognised + per-share amount: SOCE or notes",
                "Notes: basis of preparation, <b>material</b> accounting policy information (entity-specific beats boilerplate), info required elsewhere, cross-referenced systematically",
                "Disclose judgements with the most significant effect AND assumptions about the future with significant risk of material adjustment within the next year (estimation uncertainty)",
                "Capital management objectives/policies/processes (gearing-ratio style disclosures); puttable instruments classified as equity; dividends proposed before approval but not recognised; share capital details (authorised, issued, par, reconciliation, rights)",
              ],
            },
          ],
        },
        {
          kind: "split",
          left: {
            tag: "Carve-out",
            tagTone: "gold",
            title: "Ind AS 1 vs IAS 1",
            body: "<b>Loan-covenant breach</b>: IAS 1 → current even if the breach is waived after the reporting date. <b>Ind AS 1</b> → non-current if the lender agrees after the reporting period but before approval not to demand payment. Reason: Indian loan agreements carry many procedural covenants; post-date rectification reflects the true long-term nature of the liability.",
          },
          right: {
            tag: "vs AS 1",
            tagTone: "ntr",
            title: "What AS never had",
            body: "AS 1 was only about policy disclosure. Ind AS 1 adds: explicit compliance statement, the true-and-fair override (departure) regime, SOCE as a statement, comparatives architecture (incl. third balance sheet), reclassification disclosures, estimation-uncertainty and capital disclosures, and a ban on curing wrong policies by disclosure.",
          },
        },
      ],
    },
    {
      id: "indas34-content",
      folio: "2.1–2.6",
      title: "Ind AS 34 — Contents & Periods",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Scope & content",
              tagTone: "cap",
              title: "Condensed, not careless",
              bullets: [
                "Ind AS 34 doesn't mandate who reports or how often — it applies when an entity is <b>required or elects</b> to publish an Ind AS interim report",
                "Minimum: condensed balance sheet, condensed P&amp;L, condensed SOCE, condensed cash flows + selected notes; a complete Ind AS 1 set is always allowed",
                "Condensed = at least the headings and subtotals of the last annual statements + extra lines if omission would mislead; <b>basic and diluted EPS</b> on the face",
                "Explain <b>significant events and transactions</b> since the last annual report (write-downs, impairments, litigation, defaults, related parties, fair-value level transfers…) — don't repeat insignificant annual-report notes",
                "Other-disclosure list (policies statement, seasonality, unusual items, estimate changes, securities, dividends, segments, post-interim events, business combinations, fair-value disclosures, revenue disaggregation) — in the notes or <b>cross-referenced</b> to an equally available statement, else the report is incomplete",
                "Each report stands alone for Ind AS compliance; parent's separate statements neither required nor prohibited alongside CFS",
              ],
            },
            {
              tag: "Periods",
              tagTone: "ntr",
              title: "Quarterly reporter at 30 Sep (Mar year-end)",
              table: {
                columns: ["Statement", "Current", "Comparative"],
                rows: [
                  { label: "Balance sheet", values: ["30 Sep 20X2", "31 Mar 20X2 (year-end!)"] },
                  { label: "P&amp;L — quarter", values: ["3m to 30 Sep 20X2", "3m to 30 Sep 20X1"] },
                  { label: "P&amp;L — YTD", values: ["6m to 30 Sep 20X2", "6m to 30 Sep 20X1"] },
                  { label: "SOCE — YTD only", values: ["6m to 30 Sep 20X2", "6m to 30 Sep 20X1"] },
                  { label: "Cash flows — YTD only", values: ["6m to 30 Sep 20X2", "6m to 30 Sep 20X1"] },
                ],
              },
              note: "Balance sheet compares to the <b>preceding year-end</b>, not the prior-year interim date. SOCE and cash flows are cumulative only — no quarter-standalone version. Highly seasonal entities are encouraged to add trailing-12-month information.",
            },
          ],
        },
        {
          kind: "trap",
          body: "<b>Materiality at interim is judged against interim-period data</b>, not annual data — so an item immaterial annually can demand disclosure in a quarter. And if a final-quarter estimate changes significantly but no Q4 report is published, the annual statements must disclose that change's nature and amount.",
        },
      ],
    },
    {
      id: "indas34-measure",
      folio: "2.7–2.9",
      title: "Ind AS 34 — Recognition & Measurement",
      lede: "Master rule: <strong>same policies as annual, measured year-to-date</strong> — the frequency of reporting must never change the annual result. A discrete period for recognition, an integral year for measurement of annual-based items.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Tax",
              tagTone: "gold",
              title: "Estimated average annual effective rate",
              body: "Interim tax = interim pre-tax income × the <b>estimated weighted-average annual effective tax rate</b>, re-estimated each quarter year-to-date. Separate rates per jurisdiction and per category (capital gains taxed at their own rate). A first-quarter profit attracts tax even if the full year nets to zero — credits appear in loss quarters.",
            },
            {
              tag: "Revenue",
              tagTone: "exp",
              title: "Seasonal — never smoothed",
              body: "Seasonal, cyclical or occasional revenue (dividends, royalties, government grants, festival-quarter sales) is recognised <b>when it occurs</b> — no anticipating, no deferring (Illustration 3: deferring ₹16 cr of Q1 expenses to the high-sales Q3 is flatly wrong).",
            },
            {
              tag: "Costs",
              tagTone: "exp",
              title: "Uneven costs — only if deferrable at year-end",
              body: "Anticipate or defer a cost at an interim date <b>only if</b> that treatment would also be appropriate at year-end. No provisions for planned year-end overhauls (no present obligation yet), no deferring advertising, no smoothing.",
            },
          ],
        },
        {
          kind: "flips",
          title: "The classic interim judgement calls",
          items: [
            { label: "34-1", question: "Year-end bonus — accrue at interim?", answer: "Only if it is a <b>legal or constructive obligation</b> (past practice with no realistic alternative) AND reliably estimable — then accrue year-to-date (e.g. 10% of YTD operating profit)." },
            { label: "34-2", question: "Employer payroll taxes with an annual earnings cap, paid mostly early in the year?", answer: "Spread using the <b>estimated average annual effective contribution rate</b> — don't dump them in the quarters when paid." },
            { label: "34-3", question: "Goodwill impaired in Q2; conditions recover by Q4?", answer: "<b>No reversal.</b> Ind AS 34 (with Ind AS 36) prohibits reversing a goodwill impairment recognised in an earlier interim period." },
            { label: "34-4", question: "Inventory NRV write-down in Q2 expected to recover by year-end?", answer: "Recognise the loss in Q2. Reverse in a later interim period only if a reversal would also be appropriate at year-end (TYK Q4: it had not reversed — loss stays in Q2)." },
            { label: "34-5", question: "Fixed-overhead volume variances at interim?", answer: "Recognise unallocated overheads in the quarter as incurred (₹5/MT rate logic of Illustration 4) — deferral would misstate interim inventory; year-to-date trueing-up keeps the annual result intact." },
            { label: "34-6", question: "Tax year ≠ accounting year?", answer: "Apply each tax year's effective rate to the interim periods falling in it — e.g. 25% for the March-ending tax year's last quarter, 30% for the next three (TYK Q5)." },
            { label: "34-7", question: "Change in accounting policy mid-year?", answer: "Restate prior interim periods of the current year (and comparable prior-year interims) per Ind AS 8 — retrospectively, or prospectively from no later than the start of the financial year if cumulative effects are impracticable." },
          ],
        },
        {
          kind: "tyk",
          items: [
            {
              ref: "Ill. 1",
              title: "Slab rates with later losses",
              question:
                "Company A reports ₹60,000 pre-tax profit in Q1 and expects losses of ₹15,000 in each of Q2–Q4. Tax: 20% on the first ₹20,000 of annual earnings, 40% above. Tax per quarter?",
              solution:
                "Expected annual income = 60,000 − 45,000 = <b>₹15,000</b>; expected tax = 15,000 × 20% = ₹3,000; average annual effective rate = <b>20%</b>. So Q1 charge = 60,000 × 20% = <b>₹12,000</b>; Q2–Q4 each show a credit of ₹3,000 (15,000 × 20%). Total for the year: ₹3,000.",
            },
            {
              ref: "Ill. 2",
              title: "Carried-forward loss with no DTA",
              question:
                "ABC Ltd (quarterly reporter) has ₹600 lakh of carried-forward tax losses (no DTA recognised) and earns ₹900 lakh in each quarter. Tax rate 40%. Quarterly tax expense?",
              solution:
                "Estimated annual tax = (3,600 − 600) × 40% = ₹1,200 lakh on income of ₹3,600 lakh → average annual effective rate = <b>33.33%</b>. Each quarter: 900 × 33.33% = <b>₹300 lakh</b>.",
            },
            {
              ref: "Ill. 5",
              title: "Restating a misadjusted quarter",
              question:
                "A Q3 net profit of ₹20,00,000 was computed after: deferring 50% of ₹1,00,000 bad debts to Q4; charging ₹4,50,000 extra depreciation from a method change; deferring 50% of a ₹28,000 exceptional loss; and deferring ₹5,00,000 of uniform administrative expenses to Q4 'because Q4 has more sales'. Correct Q3 profit?",
              solution:
                "Bad debts: charge fully in Q3 → −50,000. Depreciation change: already correct. Exceptional loss: charge fully → −14,000. Administrative expenses: uniform costs cannot be deferred → −5,00,000. Correct Q3 profit = 20,00,000 − 50,000 − 14,000 − 5,00,000 = <b>₹14,36,000</b>.",
            },
            {
              ref: "TYK 2",
              title: "Separate rate for capital gains",
              question:
                "Narayan Ltd: estimated annual income ₹33,00,000 including ₹8,00,000 capital gains (arising in Q3). Quarterly incomes: 7L, 8L, 12L (incl. the 8L gains), 6L. Rates: capital gains 12%; other income 30% on first ₹5,00,000, 40% above. Tax per quarter?",
              solution:
                "Other income = ₹25,00,000 → tax = 1,50,000 + 8,00,000 = ₹9,50,000 → weighted-average rate = <b>38%</b>. Q1: 7L × 38% = ₹2,66,000. Q2: 8L × 38% = ₹3,04,000. Q3: 4L × 38% + 8L × 12% = 1,52,000 + 96,000 = ₹2,48,000. Q4: 6L × 38% = ₹2,28,000. Year total ₹10,46,000.",
            },
          ],
        },
      ],
    },
    {
      id: "indas7-cce",
      folio: "3.6–3.8",
      title: "Ind AS 7 — Cash, Equivalents & the Three Buckets",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "C&CE",
              tagTone: "cap",
              title: "Cash + short-term, highly liquid",
              bullets: [
                "Cash = cash on hand + demand deposits; equivalents = short-term, highly liquid, readily convertible to <b>known amounts</b>, insignificant value risk — normally <b>≤ 3 months from acquisition</b>",
                "Held to meet short-term commitments, not for investment; equity investments excluded unless in-substance equivalents (e.g. preference shares acquired close to redemption — Illustration 1)",
                "A 2-year FD maturing in 3 months is <b>not</b> an equivalent — the test runs from acquisition date",
                "<b>Bank overdrafts repayable on demand</b>, integral to cash management (balance swings positive↔overdrawn) → part of C&amp;CE for the cash flow statement (still 'borrowings' in the balance sheet)",
                "Movements between cash items (buying a T-bill with cash) are cash management, not cash flows",
              ],
            },
            {
              tag: "Three activities",
              tagTone: "ntr",
              title: "Operating · Investing · Financing",
              bullets: [
                "<b>Operating</b> — principal revenue-producing activities (default bucket): customer receipts, supplier/employee payments, insurance premiums/claims, trading-portfolio contracts; assets built <b>for rental then sale</b>: payments, rents and sale proceeds all operating",
                "<b>Investing</b> — only expenditures producing a <b>recognised asset</b>: PPE/intangibles (incl. capitalised development), equity/debt of others, loans to third parties, derivatives (unless trading/financing); sale-of-plant gains sit here even though they pass through P&amp;L",
                "<b>Financing</b> — equity issues, buybacks, borrowings raised/repaid, <b>lease liability principal</b>",
                "For a <b>bank/financial institution</b>: deposits, customer loans and interest received/paid are all operating (Illustration 3)",
                "Hedge cash flows follow the hedged position",
              ],
            },
          ],
        },
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "India rule",
              tagTone: "gold",
              title: "Interest & dividends — no options",
              table: {
                columns: ["Item", "Financial entity", "Others"],
                rows: [
                  { label: "Interest paid", values: ["Operating", "<b>Financing</b>"] },
                  { label: "Interest received", values: ["Operating", "<b>Investing</b>"] },
                  { label: "Dividend received", values: ["Operating", "<b>Investing</b>"] },
                  { label: "Dividend paid", values: ["Financing", "<b>Financing</b>"], strong: true },
                ],
              },
              note: "IAS 7 offers choices; <b>Ind AS 7 fixed them</b> — a classic carve-out MCQ. Always disclosed separately.",
            },
            {
              tag: "Taxes",
              tagTone: "ntr",
              title: "Operating unless traceable",
              body: "Income-tax cash flows are <b>operating</b> unless specifically identifiable with investing/financing (Illustration 8: ₹30,000 advance tax on long-term capital gains → investing; the remaining ₹5,00,000 → operating). Disclose total taxes paid when split.",
            },
            {
              tag: "Net basis",
              tagTone: "ntr",
              title: "Gross is default",
              body: "Net presentation only for: (i) collections on behalf of customers (demand deposits, rents collected for owners); (ii) quick-turnover, large, short-maturity items (credit-card principal, ≤3-month borrowings); plus a financial institution's fixed-maturity deposits, interbank placements and customer advances.",
            },
          ],
        },
      ],
    },
    {
      id: "indas7-special",
      folio: "3.9–3.19",
      title: "Ind AS 7 — Methods & Special Situations",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Two methods",
              tagTone: "ntr",
              title: "Direct vs indirect (operating only)",
              body: "<b>Direct</b>: gross receipts from customers minus gross payments to suppliers/employees — encouraged, better for forecasting. <b>Indirect</b>: start from profit/loss, strip non-cash items (depreciation, provisions, deferred tax, unrealised FX, undistributed associate profits), strip investing/financing items, adjust working-capital changes. Both must land on the same number (Illustration 6: ₹70,000 either way).",
            },
            {
              tag: "Group events",
              tagTone: "ntr",
              title: "Subsidiaries: control vs stake changes",
              bullets: [
                "Obtaining/losing <b>control</b> of subsidiaries/businesses → <b>investing</b>, shown separately, consideration <b>net of C&amp;CE acquired/disposed</b>; effects of gains and losses of control are not netted with each other",
                "Stake changes <b>without losing control</b> (buying out / selling NCI) → equity transactions → <b>financing</b>",
                "Equity/cost-method investees: report only the cash flows between investor and investee (dividends, advances)",
              ],
            },
            {
              tag: "Non-cash + FX",
              tagTone: "exp",
              title: "Excluded, reconciled, disclosed",
              bullets: [
                "Non-cash investing/financing (asset bought by assuming liabilities or lease, acquisition via equity issue, debt→equity conversion) — <b>excluded</b> from the statement, disclosed elsewhere (Illustration 9: pay ₹2,00,000 cash for a ₹10,00,000 asset assuming ₹8,00,000 liabilities → only ₹2,00,000 is an investing outflow)",
                "Foreign currency flows at the <b>transaction-date rate</b> (weighted average allowed); never the closing rate for a foreign subsidiary's flows",
                "Unrealised FX gains/losses are not cash flows — shown as a separate reconciling line for C&amp;CE held in foreign currency (Illustration 10)",
              ],
            },
            {
              tag: "Disclosures",
              tagTone: "ntr",
              title: "The mandatory tail",
              bullets: [
                "Components of C&amp;CE + reconciliation to balance-sheet line items (overdrafts and unrealised FX create the differences)",
                "<b>Changes in liabilities arising from financing activities</b> — cash and non-cash (control changes, FX, fair values): the 'net debt reconciliation'",
                "Restricted C&amp;CE not available to the group (exchange controls), with management commentary; undrawn facilities and segment cash flows encouraged",
              ],
            },
          ],
        },
        {
          kind: "tyk",
          items: [
            {
              ref: "Ill. 5",
              title: "Factoring in the cash flow statement",
              question: "An entity receives money from a factor under a factoring arrangement. How is it presented in the statement of cash flows?",
              solution:
                "<b>With recourse</b>: receivables stay recognised; the money is a borrowing → <b>financing inflow</b>; later collection by the factor settles liability against receivables as a <b>non-cash</b> event — so no operating inflow ever appears for those sales. <b>Without recourse</b>: receivables are derecognised; the cash is an <b>operating inflow</b> (cash for receivables that arose from operations).",
            },
            {
              ref: "Ill. 7",
              title: "Deep-discount bond on maturity",
              question: "A firm pays ₹5,00,000 for a 5-year bond with face value ₹10,00,000 (EIR 15%), accruing interest income annually. Cash flow treatment during the term and on maturity?",
              solution:
                "During the term: interest income accrues in P&L but there is <b>no cash flow</b>. On maturity, the ₹10,00,000 receipt is an <b>investing</b> inflow, disclosed split between recovery of the investment and the accumulated interest element.",
            },
            {
              ref: "Ill. 15",
              title: "Bank transactions — bucket by bucket",
              question: "For a private-sector bank: interest received on loans, deposits accepted/repaid, loans given/repaid, furniture purchased, banking software implemented, shares of a 100% foreign subsidiary purchased, ESOPs issued?",
              solution:
                "Interest received/paid, deposits accepted/repaid, customer loans given/recovered, commission — all <b>operating</b> (financial institution). Furniture and software — <b>investing</b>. Subsidiary shares — <b>investing</b>. ESOP issue — <b>no cash flow</b>, excluded (Illustration 3).",
            },
          ],
        },
      ],
    },
    {
      id: "quiz",
      folio: "MCQ",
      title: "Quiz Bank",
      blocks: [
        {
          kind: "quiz",
          items: [
            {
              question: "A third balance sheet (as at the beginning of the preceding period) is required when:",
              options: [
                "Any comparative is restated for any reason",
                "A retrospective policy change/restatement/reclassification materially affects that opening balance sheet",
                "The entity changes its reporting date",
                "An auditor qualifies the report",
              ],
              answer: 1,
              why: "Only a material effect on the opening position of the preceding period triggers it — and no related notes are required for it.",
            },
            {
              question: "An entity intends to cease trading 18 months after the reporting date. Going-concern basis?",
              options: ["Yes — beyond the 12-month window", "Yes — until liquidation starts", "No — 12 months is only a minimum lookout", "Only with auditor consent"],
              answer: 2,
              why: "The 12-month assessment horizon is a minimum; a known intention to cease at 18 months defeats the going-concern basis.",
            },
            {
              question: "Measuring receivables net of doubtful-debt allowance is:",
              options: ["Prohibited offsetting", "Permitted — it is not offsetting", "Allowed only if immaterial", "Allowed only for financial institutions"],
              answer: 1,
              why: "Valuation allowances are measurement, not offsetting of separate assets and liabilities.",
            },
            {
              question: "A covenant breach makes a long-term loan payable on demand at year-end. The lender waives repayment after year-end but before the accounts are approved. Under Ind AS 1 the loan is:",
              options: ["Current", "Non-current", "Contingent liability", "Reclassified per Ind AS 10 as adjusting"],
              answer: 1,
              why: "India's carve-out from IAS 1: the post-reporting-date, pre-approval waiver keeps it non-current. IAS 1 would say current.",
            },
            {
              question: "Deferred tax assets in a classified balance sheet are presented as:",
              options: ["Current if reversing within 12 months", "Always non-current", "Split current/non-current", "Part of current tax"],
              answer: 1,
              why: "Ind AS 1 prohibits classifying deferred tax balances as current — always non-current.",
            },
            {
              question: "Extraordinary items under Ind AS 1:",
              options: ["Shown after profit from ordinary activities", "Shown only in the notes", "Prohibited entirely", "Shown within OCI"],
              answer: 2,
              why: "Neither on the face nor in the notes may any item be presented as extraordinary.",
            },
            {
              question: "In a quarterly interim report, the comparative balance sheet is as at:",
              options: ["The same quarter-end last year", "The immediately preceding quarter-end", "The end of the immediately preceding financial year", "The beginning of the current year and last year"],
              answer: 2,
              why: "The balance sheet compares to the preceding year-end; P&L compares to comparable interim periods; SOCE and cash flows are year-to-date only.",
            },
            {
              question: "An entity earns ₹1,50,000 in Q1 and expects ₹50,000 losses in Q2–Q4 (effective rate 30%). Q1 tax expense is:",
              options: ["Nil — annual income is zero", "₹45,000", "₹11,250", "₹15,000"],
              answer: 1,
              why: "The average annual effective rate (30%) applies to each interim period's result: Q1 charge ₹45,000, then ₹15,000 credits in each loss quarter (TYK Q3).",
            },
            {
              question: "Goodwill impairment recognised in Q1 can be reversed in Q3 of the same year if conditions improve:",
              options: ["True — year-to-date measurement", "False — prohibited", "Only with auditor approval", "Only if disclosed"],
              answer: 1,
              why: "Ind AS 34 (Appendix A, with Ind AS 36) prohibits reversing goodwill impairment recognised in an earlier interim period.",
            },
            {
              question: "For a non-financial company under Ind AS 7, interest paid is classified as:",
              options: ["Operating, or financing at the entity's option", "Always operating", "Financing", "Investing"],
              answer: 2,
              why: "Ind AS 7 removed IAS 7's options: non-financial entities — interest paid is financing; interest/dividends received investing; dividends paid financing.",
            },
            {
              question: "A 3-year fixed deposit with 2 months left to maturity at the reporting date is:",
              options: ["A cash equivalent", "Not a cash equivalent", "Cash", "A financing item"],
              answer: 1,
              why: "The ≤3-month test runs from the date of ACQUISITION, not from the reporting date.",
            },
            {
              question: "Acquiring a machine of ₹10,00,000 by assuming ₹8,00,000 of the seller's liabilities and paying the rest in cash shows in the cash flow statement as:",
              options: ["₹10,00,000 investing outflow", "₹2,00,000 investing outflow", "₹8,00,000 financing inflow and ₹10,00,000 investing outflow", "Nothing — fully non-cash"],
              answer: 1,
              why: "Only the cash leg (₹2,00,000) enters the statement; the assumed liabilities are a non-cash transaction disclosed in the notes (Illustration 9).",
            },
          ],
        },
      ],
    },
  ],
  footer:
    "FR Chapter 3 · Ind AS 1, Ind AS 34 & Ind AS 7 — built from the ICAI Study Material units (74885/74886/74887bos60524). Illustration references follow each unit.",
};
