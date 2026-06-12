// FR Chapter 1 — Introduction to Indian Accounting Standards.
// Authored from the ICAI Study Material text in
// 01_FR_Financial_Reporting/001 - Chapter 1 (74883bos60524-cp1).
// Illustration numbers refer to that chapter.

import type { ChapterDoc } from "../chapterDoc";

export const frCh1IntroIndAsDoc: ChapterDoc = {
  id: "fr-ch1-intro",
  storageKey: "frch1done",
  kicker: "Financial Reporting · Chapter 1 · ICAI Study Material",
  heroTitle: "Before any standard is applied, one question decides everything: <em>does Ind AS apply to this company at all?</em>",
  heroStrap:
    "This chapter is the rulebook of the rulebook — why India converged with IFRS instead of adopting it, how an Ind AS gets born, and the roadmap + net-worth tests that exam questions love. Master the applicability drills and the Schedule III guidance points.",
  heroStats: [
    { value: "10", label: "Sections" },
    { value: "8", label: "ICAI Illustrations" },
    { value: "39", label: "Ind AS Notified" },
    { value: "13", label: "Drill Scenarios" },
    { value: "10", label: "MCQs" },
  ],
  flow: {
    eyebrow: "Decision Flow",
    title: "From company facts to the right framework",
    steps: [
      { title: "What kind of entity?", body: "Company, NBFC, bank/insurer, or mutual fund scheme — each has its own roadmap." },
      { title: "Listed or net worth?", body: "Listed (incl. in-process) or net worth ≥ ₹250/500 crore triggers a phase." },
      { title: "Group drag-in?", body: "Holding, subsidiary, JV, associate of a covered company is covered too." },
      { title: "Once in, always in.", body: "Ind AS continues even if the criteria later stop being met." },
    ],
    foot: "Convergence · Roadmap · Net worth · Schedule III",
  },
  sections: [
    {
      id: "map",
      folio: "¶ 0",
      title: "The Map",
      lede: "Six nodes carry this whole chapter. Every theory and applicability question lands on one of them.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Node 1",
              tagTone: "ntr",
              title: "The AS era &amp; its limits",
              body: "ASB of ICAI (set up 1977) issued AS — but complex instruments, derivatives, restructurings, new-age revenue and thin disclosures outgrew them.",
            },
            {
              tag: "Node 2",
              tagTone: "ntr",
              title: "Global standards",
              body: "IASC (1973) → IASB (1 Jul 2000) → IFRS. After EU adoption in 2005, IFRS and US GAAP became the two global frameworks.",
            },
            {
              tag: "Node 3",
              tagTone: "cap",
              title: "Convergence ≠ adoption",
              body: "India <b>converged</b> (IFRS with carve-ins/outs); it did not <b>adopt</b>. Ind AS financial statements cannot assert IFRS compliance.",
            },
            {
              tag: "Node 4",
              tagTone: "ntr",
              title: "How an Ind AS is born",
              body: "ASB draft → outside bodies → exposure draft → ICAI Council → NFRA → MCA notifies under section 133, Companies Act 2013.",
            },
            {
              tag: "Node 5",
              tagTone: "cap",
              title: "The roadmap",
              body: "Phased mandatory transition by listing status and net worth — companies (2016/2017), NBFCs (2018/2019); banks &amp; insurers deferred.",
            },
            {
              tag: "Node 6",
              tagTone: "ntr",
              title: "Schedule III · Division II",
              body: "The Ind AS format of financial statements, plus the ICAI Guidance Note that settles practical presentation calls.",
            },
          ],
        },
      ],
    },
    {
      id: "why-global",
      folio: "¶ 1–6",
      title: "From AS to Global Standards",
      lede: "Hold the storyline: AS served well, complexity outgrew them, the world built IFRS, and India committed at the <strong>G20 summit in 2009</strong> to converge.",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Indian scenario",
              tagTone: "ntr",
              title: "Before Ind AS",
              body: "The ASB of ICAI has formulated standards since <b>1977</b>. As on February 2002, <b>27 AS</b> were issued — still applicable to non-Ind AS companies, SMCs and non-corporate entities (Levels I–IV).",
              note: "ASB recommends; <b>NFRA</b> is consulted; <b>MCA notifies</b> standards for companies. NFRA replaced NACAS of the 1956 Act era. ICAI itself issues AS for non-corporate entities.",
            },
            {
              tag: "Limitations",
              tagTone: "exp",
              title: "What AS couldn't handle",
              bullets: [
                "Complex capital: optionally/compulsorily convertible shares and debentures",
                "Derivatives — embedded in FC bonds, equity, commodities",
                "Group restructuring: acquisitions, mergers, demergers, slump sale",
                "Complex revenue models of the digital economy",
                "Innovative stock-based C-suite compensation",
                "Current/deferred tax complexity; shareholder returns in kind",
                "Thin disclosures on revenue, related parties, segments, business combinations",
              ],
            },
            {
              tag: "Emergence",
              tagTone: "ntr",
              title: "IASC → IASB → IFRS",
              bullets: [
                "<b>1973</b>: IASC formed by 9-country professional bodies; issued <b>IAS</b>, numbered from 1 (41 issued till 2000)",
                "<b>1 Jul 2000</b>: <b>IASB</b> formed under the IFRS Foundation; new series — <b>IFRS 1, 2…</b>",
                "<b>May 2000</b>: IOSCO endorsed 30 IASC standards for cross-border listings",
                "<b>2005</b>: all EU listed companies on IFRS — made IFRS a major unified GAAP",
                "<b>2002 Norwalk Agreement</b>: IASB–FASB convergence project",
                "~167 jurisdictions require IFRS for most listed companies; 12 more permit it",
              ],
            },
            {
              tag: "Why India needed it",
              tagTone: "cap",
              title: "Benefits of one global language",
              bullets: [
                "<b>Transparency</b> — international comparability for informed decisions",
                "<b>Accountability</b> — narrows the information gap between capital providers and managers",
                "<b>Efficiency</b> — investors spot risk/opportunity globally; lower cost of capital; one reporting system for multinationals",
              ],
              note: "Same asset could show profit under one national GAAP and loss under another (e.g. cost vs fair value of investments) — that risk pushed India to commit to convergence at the <b>G20 summit, 2009</b>.",
            },
          ],
        },
      ],
    },
    {
      id: "convergence",
      folio: "¶ 7",
      title: "Convergence vs Adoption",
      blocks: [
        {
          kind: "split",
          left: {
            tag: "Adoption",
            tagTone: "exp",
            title: "IFRS exactly as issued",
            body: "The country implements IFRS <b>as issued by the IASB, 100% compliant</b>. First-time application goes through <b>IFRS 1</b>, and only then can financial statements <b>assert compliance with IFRS</b>. Canada, Bahrain, Cambodia adopted.",
          },
          right: {
            tag: "Convergence",
            tagTone: "cap",
            title: "IFRS with carve-outs",
            body: "The national setter works <b>with</b> the IASB but keeps limited exceptions (carve-ins/carve-outs) for local law and business reality, narrowing them over time. <b>India, China, Hong Kong</b> converged.",
          },
        },
        {
          kind: "trap",
          body: "<b>Trap:</b> an entity applying IFRS <b>as amended by a local authority cannot assert IFRS compliance</b>. So Ind AS financial statements are NOT 'IFRS financial statements'. Ind AS is a separate framework created by MCA with carve-outs for Indian nuances.",
        },
      ],
    },
    {
      id: "making",
      folio: "¶ 8–9",
      title: "Making, Numbering & Structure of an Ind AS",
      lede: "Three mechanical facts the exam tests directly: the notification pipeline, the numbering convention, and the anatomy of a standard.",
      blocks: [
        {
          kind: "timeline",
          nodes: [
            {
              phase: "Draft",
              title: "ASB drafts with carve-ins/outs",
              body: "IASB issues/updates an IFRS → ASB prepares the converged draft considering local law, business practice and tax → circulated to ICAI Council and outside bodies (MCA, SEBI, C&AG, CBDT) and discussed with them.",
            },
            {
              phase: "Expose",
              title: "Exposure draft → ICAI Council",
              body: "Exposure draft issued for public comments → comments considered → final draft approved by ASB and the Council of ICAI (modifying in consultation with ASB if needed).",
            },
            {
              phase: "Notify",
              title: "NFRA → MCA gazette",
              body: "Final draft goes to NFRA with ICAI recommendations; after NFRA's inputs, <b>MCA notifies the Ind AS under the Companies Act</b> with its applicability date. Notified standards are authoritative under Indian law.",
            },
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Numbering",
              tagTone: "ntr",
              title: "Same number, +100 for IFRS",
              bullets: [
                "IAS-converged standards keep the number: IAS 1 → <b>Ind AS 1</b>",
                "IFRS-converged standards add 100: IFRS 1 → <b>Ind AS 101</b>",
                "<b>39 Ind AS</b> notified vs 41 IFRS-family standards — <b>IFRS 17</b> (Insurance Contracts) and <b>IAS 26</b> (Retirement Benefit Plans) not notified",
                "Interpretations: 17 included under Ind AS (as Appendices) vs 18 under IFRS — <b>IFRIC 2</b> and <b>SIC 7</b> excluded; <b>Appendix C to Ind AS 103</b> is an India-only extra",
                "Paragraph numbers of IFRS/IAS are retained; skipped paragraphs are left blank with a note",
              ],
            },
            {
              tag: "Structure",
              tagTone: "ntr",
              title: "Anatomy of a standard",
              bullets: [
                "<b>Objective → Scope → Definitions → Content → Disclosure → Transition/effective date → Appendices</b>",
                "Definitions sit in the body for IAS-series, in appendices for the 101-series",
                "Transitional provisions live in Ind AS 101 (for first-time adopters) and in individual standards (for existing Ind AS users)",
                "Appendices: industry guidance, application guidance, defined terms, comparison with IFRS, IFRIC/SIC content",
              ],
              trap: "<b>Bold vs plain text:</b> bold states the principle, plain gives application guidance — but both have <b>equal authority</b>.",
            },
          ],
        },
      ],
    },
    {
      id: "roadmap",
      folio: "¶ 10.1",
      title: "Corporate Roadmap",
      lede: "Companies (Indian Accounting Standards) Rules, 2015 — notified 16 February 2015 under section 133. Two mandatory phases; voluntary adoption allowed from FY 2015-16.",
      blocks: [
        {
          kind: "split",
          left: {
            tag: "Phase I · FY 2016-17",
            tagTone: "cap",
            title: "From 1 April 2016",
            body: "(a) Companies <b>listed or in process of listing</b> (India or abroad) with net worth <b>≥ ₹500 crore</b>; (b) <b>unlisted</b> companies with net worth <b>≥ ₹500 crore</b>; (c) their holding, subsidiary, JV or associate companies. Comparatives for period ending 31 March 2016.",
          },
          right: {
            tag: "Phase II · FY 2017-18",
            tagTone: "cap",
            title: "From 1 April 2017",
            body: "(a) Listed / in-process companies with net worth <b>&lt; ₹500 crore</b>; (b) unlisted companies with net worth <b>≥ ₹250 crore but &lt; ₹500 crore</b>; (c) their holding, subsidiary, JV or associate companies. Comparatives for period ending 31 March 2017.",
          },
        },
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Out of roadmap",
              tagTone: "exp",
              title: "Who stays on AS",
              body: "Unlisted companies with net worth <b>below ₹250 crore</b> continue with AS (voluntary Ind AS allowed). Companies listed only on an <b>SME exchange</b> / Institutional Trading Platform are NOT 'listed' for this roadmap.",
            },
            {
              tag: "Key transition rules",
              tagTone: "ntr",
              title: "Clauses that get tested",
              bullets: [
                "One year of Ind AS <b>comparatives</b> is mandatory — adopting for FY 20X4-X5 makes <b>1 April 20X3</b> the transition date",
                "Apply the standards <b>effective at the end of the first Ind AS reporting period</b>",
                "<b>Once Ind AS, always Ind AS</b> — even if criteria later fail (clause 9)",
                "Applies to <b>both</b> standalone and consolidated financial statements",
              ],
            },
            {
              tag: "Group reach",
              tagTone: "ntr",
              title: "Who gets dragged in",
              bullets: [
                "Holding, subsidiary, JV and associate of a covered company — covered (Illustration 5)",
                "<b>Fellow subsidiaries are NOT dragged in</b> (ITFG 15.10) — they may still furnish Ind AS numbers for the parent's consolidation (Illustration 6)",
                "Overseas subsidiary may use local GAAP standalone; the Indian parent's CFS stays Ind AS",
                "A <b>foreign parent's</b> net worth is irrelevant — each Indian company tests its own (Illustration 7)",
              ],
            },
          ],
        },
        {
          kind: "note",
          body: "<b>Voluntary adoption:</b> permitted for periods beginning on or after 1 April 2015 (with comparatives) or any time after. Once exercised, it is <b>irrevocable</b> — clause 9 applies equally to voluntary adopters.",
        },
      ],
    },
    {
      id: "networth",
      folio: "¶ 10.1.2",
      title: "Net Worth — the Trigger Test",
      lede: "Net worth has the <strong>section 2(57)</strong> meaning, measured on standalone audited numbers. Get the inclusions and the cut-off logic right and these 4–5 marks are free.",
      blocks: [
        {
          kind: "formula",
          lines: [
            "Net worth <span class=\"dim\">[Sec 2(57), Companies Act 2013]</span> =",
            "  Paid-up share capital",
            "  <span class=\"hl\">+ reserves created out of profits</span>  <span class=\"hl\">+ securities premium</span>",
            "  − accumulated losses  − deferred expenditure  − miscellaneous expenditure not written off",
            "<span class=\"dim\">EXCLUDE: revaluation reserve · write-back of depreciation · amalgamation reserves</span>",
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Cut-off logic",
              tagTone: "cap",
              title: "When is net worth measured?",
              bullets: [
                "Standalone audited balance sheet as on <b>31 March 2014</b>, or the first audited statements ending after that date",
                "Threshold met later for the first time → Ind AS from the <b>immediately next financial year</b> (e.g. met at 31 Mar 2017 → apply FY 2017-18)",
                "Threshold once met stays met: net worth falling later changes nothing (Illustration 3: ₹600 cr → ₹400 cr, still Phase I)",
              ],
            },
            {
              tag: "Worked numbers",
              tagTone: "ntr",
              title: "Illustrations 1 & 2 in one table",
              table: {
                columns: ["Item", "Ill. 1 (₹ cr)", "Ill. 2 (₹ cr)"],
                rows: [
                  { label: "Equity share capital", values: ["160", "160"] },
                  { label: "Securities premium", values: ["200", "200"] },
                  { label: "General reserve", values: ["150", "150"] },
                  { label: "P&amp;L account", values: ["75", "(375)"] },
                  { label: "Misc. expenditure not written off", values: ["(80)", "(80)"] },
                  { label: "Revaluation reserve ₹40 cr", values: ["excluded", "excluded"], tone: "exp" },
                  { label: "<b>Net worth — Sec 2(57)</b>", values: ["<b>505</b>", "<b>55</b>"], strong: true },
                ],
              },
              note: "Ill. 1: ≥ ₹500 cr → <b>Phase I</b> (listed or unlisted). Ill. 2: only ₹55 cr — but the company is <b>listed</b>, so it still lands in <b>Phase II</b>; unlisted, it would stay outside until a threshold is breached.",
            },
          ],
        },
      ],
    },
    {
      id: "nbfc",
      folio: "¶ 10.2",
      title: "NBFC Roadmap",
      lede: "Amendment dated 30 March 2016 brought NBFCs in — one year behind the corporate phases, with one famous prohibition.",
      blocks: [
        {
          kind: "split",
          left: {
            tag: "Phase I · FY 2018-19",
            tagTone: "cap",
            title: "From 1 April 2018",
            body: "NBFCs with net worth <b>≥ ₹500 crore</b>, plus their holding, subsidiary, JV or associate companies (unless already covered by the corporate roadmap). Net-worth cut-off: <b>31 March 2016</b> or first audited statements after.",
          },
          right: {
            tag: "Phase II · FY 2019-20",
            tagTone: "cap",
            title: "From 1 April 2019",
            body: "Listed / in-process NBFCs with net worth <b>&lt; ₹500 crore</b>; unlisted NBFCs <b>≥ ₹250 &lt; ₹500 crore</b>; plus their group companies as above. Below ₹250 crore — continue AS.",
          },
        },
        {
          kind: "trap",
          body: "<b>The famous prohibition:</b> NBFCs <b>cannot voluntarily adopt</b> Ind AS — they apply it only when a criterion catches them. ('NBFC' is per sec 45-I(f), RBI Act — includes housing finance, merchant banking, stock brokers, nidhi, chit, AMCs, core investment companies etc.)",
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Mixed groups",
              tagTone: "ntr",
              title: "NBFC ↔ non-finance consolidation",
              body: "Each company follows <b>its own</b> roadmap statutorily. For consolidation, the odd one out supplies <b>data re-stated to the parent's policies</b> until its own framework switches.",
              bullets: [
                "AS-parent NBFC with Ind AS subsidiaries → subsidiaries keep statutory Ind AS books but feed AS data to the parent",
                "Ind AS non-finance parent with AS NBFC subsidiary → NBFC keeps AS books but feeds Ind AS data (Illustration 8)",
              ],
            },
            {
              tag: "Illustration 8",
              tagTone: "gold",
              title: "Dates that differ",
              body: "Company X (non-finance, covered FY 2017-18) is a subsidiary of Company Y, an unlisted NBFC with net worth ₹400 crore. Y applies Ind AS from <b>1 April 2019</b> (NBFC Phase II); X from <b>FY 2017-18</b>. For Y's AS consolidation in 2017-18 and 2018-19, X also prepares AS numbers.",
            },
          ],
        },
      ],
    },
    {
      id: "banks",
      folio: "¶ 10.3–11",
      title: "Banks, Insurers, Mutual Funds & Statutory Hooks",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Banks & insurers",
              tagTone: "exp",
              title: "Deferred — and locked",
              body: "They apply Ind AS only when <b>RBI / IRDAI</b> notify it — not yet notified, so Ind AS does not apply at present, and they <b>cannot voluntarily adopt</b>. They may still <i>furnish</i> Ind AS-compliant information for a parent's consolidation.",
            },
            {
              tag: "Mutual funds",
              tagTone: "cap",
              title: "Ind AS from 1 April 2023",
              body: "SEBI (Mutual Funds) (Amendment) Regulations, 2022 (25 Jan 2022) + circular of 4 Feb 2022: MF scheme financial statements move to Ind AS with prescribed formats, effective <b>1 April 2023</b>.",
            },
            {
              tag: "SEBI hooks",
              tagTone: "ntr",
              title: "Listing-side rules",
              bullets: [
                "Quarterly/annual results under Regulation 33: <b>comparatives must also be Ind AS</b>",
                "Results formats follow <b>Schedule III</b> (banks/insurers follow their own regulators)",
                "ICDR offer documents: all <b>3 years</b> of restated financials per Ind AS (by filing-year matrix)",
              ],
            },
          ],
        },
        {
          kind: "flips",
          title: "Companies Act 2013 — sections that name accounting standards",
          items: [
            { label: "S.133", question: "Who prescribes accounting standards, on whose recommendation?", answer: "The Central Government prescribes standards <b>recommended by ICAI</b>, in consultation with and after examining the recommendations of <b>NFRA</b>. The Ind AS Rules 2015 were notified under this power." },
            { label: "S.129", question: "What must financial statements do?", answer: "Give a <b>true and fair view</b>, comply with the section 133 standards, and follow the form in <b>Schedule III</b>." },
            { label: "S.134(5)(a)", question: "Where do directors confirm standards compliance?", answer: "In the <b>Directors' Responsibility Statement</b> — applicable standards followed, with proper explanation for material departures." },
            { label: "S.143", question: "What does the auditor opine on?", answer: "Whether the financial statements <b>comply with the accounting standards</b>." },
            { label: "S.230/232", question: "Mergers and arrangements — what certificate is needed?", answer: "The Tribunal sanctions a scheme only with an <b>auditor's certificate</b> that its accounting treatment conforms to section 133 standards." },
            { label: "S.66", question: "Capital reduction — what's the standards link?", answer: "No reduction is sanctioned unless the proposed accounting treatment conforms to section 133 standards, certified by the auditor and filed with the Tribunal." },
          ],
        },
      ],
    },
    {
      id: "schedule3",
      folio: "¶ 12–13",
      title: "Division II of Schedule III + Guidance Note",
      lede: "Division II gives the Ind AS financial-statement formats; the ICAI Guidance Note (latest January 2022) settles the practical presentation calls below — flip each one.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Structure",
              tagTone: "ntr",
              title: "Three parts",
              bullets: [
                "<b>Part I</b> — Balance Sheet + Statement of Changes in Equity",
                "<b>Part II</b> — Statement of Profit and Loss",
                "<b>Part III</b> — general instructions for CFS",
              ],
            },
            {
              tag: "Who it's NOT for",
              tagTone: "exp",
              title: "Carve-outs from Division II",
              body: "Banking and insurance companies (their own Acts prescribe formats) and <b>NBFCs — which use Division III</b> of Schedule III.",
            },
            {
              tag: "Since when",
              tagTone: "ntr",
              title: "Key notification dates",
              body: "Schedule III notified 29 Aug 2013; Division II inserted <b>6 April 2016</b>; major disclosure amendments of <b>24 March 2021</b> apply from FY beginning <b>1 April 2021</b>.",
            },
          ],
        },
        {
          kind: "flips",
          title: "Guidance Note — the presentation calls the exam picks",
          items: [
            { label: "GN-1", question: "Land and building — one class or two?", answer: "Present as <b>two separate classes</b> per Schedule III, even though Ind AS 16 para 37 illustrates them as one class for revaluation. Follow the Schedule III split consistently." },
            { label: "GN-2", question: "Capital advances — CWIP or not?", answer: "<b>Not</b> capital work-in-progress. They go under <b>other non-current assets</b>." },
            { label: "GN-3", question: "Bank overdraft repayable on demand — where in the balance sheet?", answer: "<b>Borrowings</b> under financial liabilities. Ind AS 7 lets it into cash &amp; cash equivalents for the <i>cash flow statement</i>, but balance-sheet offsetting needs Ind AS 32 para 42 conditions." },
            { label: "GN-4", question: "What qualifies as a trade receivable?", answer: "Amounts due for <b>goods sold or services rendered</b> in the normal course where the right to consideration is <b>unconditional</b> (only passage of time). Insurance claims, PPE sale dues, reimbursables → <b>other financial assets</b>." },
            { label: "GN-5", question: "Receivable/payable ageing runs from which date?", answer: "From the <b>due date</b> of the invoice; if no due date was agreed (written or oral), from the <b>transaction date</b>. Disputed vs undisputed split is also required — dispute needs positive evidence of disagreement." },
            { label: "GN-6", question: "Current maturities of long-term debt?", answer: "Present under <b>current borrowings</b>; the rest stays non-current. Also disclose the current + non-current split for each category of non-current borrowing." },
            { label: "GN-7", question: "Performance guarantees and counter-guarantees — contingent liabilities?", answer: "<b>No.</b> A guarantee of your <b>own</b> obligation (e.g. counter-guarantee to your banker) is just your own liability — disclosing it as contingent would be misleading. Only guarantees of <b>third-party</b> obligations qualify." },
            { label: "GN-8", question: "Revenue — gross or net of GST?", answer: "Depends on <b>principal vs agent</b>: collecting tax as agent of government → present revenue <b>net</b>; acting as principal liable for the tax → gross up revenue and show the tax as expense." },
            { label: "GN-9", question: "Share application money pending allotment?", answer: "A separate line under <b>other non-current financial assets</b> (or current, by nature) — not investments." },
            { label: "GN-10", question: "'Exceptional items' — defined anywhere?", answer: "Defined neither in Schedule III nor Ind AS. Ind AS 1 indicates candidates: inventory/PPE write-downs and reversals, restructurings, disposals of PPE or investments, discontinued operations, litigation settlements, provision reversals." },
            { label: "GN-11", question: "Investments in LLPs — partnership-firm disclosures?", answer: "<b>No.</b> An LLP is a body corporate, not a partnership firm — show under <b>'other investments'</b> separately." },
          ],
        },
      ],
    },
    {
      id: "drill",
      folio: "⚡",
      title: "Applicability Rapid Drill",
      lede: "One question per scenario: <strong>is Ind AS mandatorily applicable?</strong> Decide, then read the why.",
      blocks: [
        {
          kind: "drill",
          yesLabel: "Ind AS applies ✓",
          noLabel: "Stays on AS ✗",
          items: [
            {
              prompt: "Listed company; net worth ₹505 crore as on 31 March 2014.",
              capitalise: true,
              why: "Phase I — listed with net worth ≥ ₹500 crore: Ind AS from 1 April 2016 (Illustration 1).",
            },
            {
              prompt: "Unlisted company; net worth ₹505 crore as on 31 March 2014.",
              capitalise: true,
              why: "Phase I also covers unlisted companies with net worth ≥ ₹500 crore.",
            },
            {
              prompt: "Listed company whose net worth is only ₹55 crore.",
              capitalise: true,
              why: "Listing alone puts it in Phase II (listed with net worth < ₹500 crore) — from 1 April 2017 (Illustration 2).",
            },
            {
              prompt: "Unlisted company, net worth ₹180 crore, no group link to any covered company.",
              capitalise: false,
              why: "Below ₹250 crore and unlisted — stays on AS. It may still adopt Ind AS voluntarily (irrevocably).",
            },
            {
              prompt: "Company listed only on an SME exchange, with net worth ₹300 crore.",
              capitalise: true,
              why: "Two-step trap: SME-exchange listing does NOT count as 'listed' for the roadmap — but as an effectively unlisted company with net worth ≥ ₹250 crore it is caught by Phase II anyway. Test both legs.",
            },
            {
              prompt: "Company listed only on an SME exchange, with net worth ₹180 crore.",
              capitalise: false,
              why: "Not 'listed' for the roadmap (SME exchange excluded) and below the ₹250 crore unlisted threshold — stays on AS.",
            },
            {
              prompt: "Company whose net worth was ₹600 crore on 31 Mar 2014 but fell to ₹400 crore by 31 Mar 2015.",
              capitalise: true,
              why: "Once the cut-off test is met, later falls are irrelevant — Phase I from 1 April 2016 (Illustration 3).",
            },
            {
              prompt: "Unlisted company with net worth ₹60 crore whose subsidiary has net worth ₹600 crore.",
              capitalise: true,
              why: "Group drag-in: holding company of a Phase I company is covered regardless of its own size (Illustration 5).",
            },
            {
              prompt: "Fellow subsidiary (₹100 crore net worth) of a company that triggered Ind AS for the common parent.",
              capitalise: false,
              why: "ITFG 15.10 — the drag-in does NOT extend to fellow subsidiaries. It only furnishes Ind AS data for the parent's CFS, or adopts voluntarily (Illustration 6).",
            },
            {
              prompt: "Indian company with net worth ₹150 crore whose foreign parent has net worth ₹700 crore.",
              capitalise: false,
              why: "A foreign company isn't covered by the Ind AS Rules, so its net worth can't trigger anything — each Indian company tests its own (Illustration 7).",
            },
            {
              prompt: "Unlisted NBFC with net worth ₹400 crore (as on 31 March 2016).",
              capitalise: true,
              why: "NBFC Phase II — unlisted, ₹250–500 crore: Ind AS from 1 April 2019 (Illustration 8).",
            },
            {
              prompt: "NBFC with net worth ₹200 crore wants to adopt Ind AS voluntarily.",
              capitalise: false,
              why: "Prohibited — NBFCs may apply Ind AS only when a roadmap criterion catches them. No voluntary adoption.",
            },
            {
              prompt: "A scheduled commercial bank wants to early-adopt Ind AS to impress investors.",
              capitalise: false,
              why: "Banks (and insurers) apply Ind AS only when RBI (IRDAI) notifies — not yet notified, and voluntary adoption is not allowed. They may only furnish Ind AS data for a parent's consolidation.",
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
              question: "India's commitment to converge with IFRS was made at:",
              options: ["The Norwalk Agreement, 2002", "The G20 summit, 2009", "The IOSCO assessment, 2000", "The Union Budget, 2014-15"],
              answer: 1,
              why: "India committed at the G20 summit in 2009. The 2014-15 Budget revived the suspended plan; the Rules came on 16 Feb 2015.",
            },
            {
              question: "Ind AS are notified by:",
              options: ["ICAI under the CA Act", "NFRA under section 132", "MCA under section 133, Companies Act 2013", "SEBI under the LODR"],
              answer: 2,
              why: "ASB/ICAI formulate and recommend; NFRA is consulted; the Central Government (MCA) notifies under section 133.",
            },
            {
              question: "The corresponding Ind AS for IFRS 16 Leases is:",
              options: ["Ind AS 16", "Ind AS 17", "Ind AS 116", "Ind AS 106"],
              answer: 2,
              why: "IFRS-series standards add 100: IFRS 16 → Ind AS 116. (Ind AS 16 is PPE, converged from IAS 16.)",
            },
            {
              question: "Which of these is NOT notified as an Ind AS?",
              options: ["Ind AS 114 Regulatory Deferral Accounts", "Ind AS 29 Hyperinflationary Economies", "An equivalent of IFRS 17 Insurance Contracts", "Ind AS 41 Agriculture"],
              answer: 2,
              why: "IFRS 17 and IAS 26 have no notified Ind AS equivalent — 39 Ind AS vs 41 IFRS-family standards.",
            },
            {
              question: "Net worth under section 2(57) excludes:",
              options: ["Securities premium", "Reserves created out of profits", "Revaluation reserve", "Paid-up share capital"],
              answer: 2,
              why: "Revaluation reserves, write-back of depreciation and amalgamation reserves are excluded; securities premium and profit-made reserves are included.",
            },
            {
              question: "A company first crosses ₹250 crore net worth (unlisted) per audited accounts of 31 March 2019. Ind AS applies from FY:",
              options: ["2018-19", "2019-20", "2020-21", "Never, unless listed"],
              answer: 1,
              why: "Meeting a threshold for the first time at a year-end pulls the company in from the immediately next financial year.",
            },
            {
              question: "Once a company adopts Ind AS voluntarily, it:",
              options: ["May revert to AS after 3 years", "May revert if net worth falls below ₹250 crore", "Must follow Ind AS for all subsequent statements", "Must take MCA approval to continue"],
              answer: 2,
              why: "Clause 9: once followed — voluntarily or mandatorily — Ind AS applies forever after, even if criteria cease to be met.",
            },
            {
              question: "Which entity CAN voluntarily adopt Ind AS?",
              options: ["A scheduled commercial bank", "An NBFC with net worth ₹150 crore", "An unlisted company with net worth ₹100 crore", "An insurance company"],
              answer: 2,
              why: "Ordinary companies below the thresholds may volunteer. NBFCs, banks and insurers cannot.",
            },
            {
              question: "Under Division II of Schedule III, current maturities of long-term borrowings are shown:",
              options: ["Under other current liabilities", "Under current borrowings", "Netted against non-current borrowings", "Under other financial liabilities"],
              answer: 1,
              why: "The 2021 amendments require them under 'current borrowings' — with the current/non-current split of each borrowing category also disclosed.",
            },
            {
              question: "NBFCs preparing Ind AS financial statements use which format?",
              options: ["Division I of Schedule III", "Division II of Schedule III", "Division III of Schedule III", "Formats prescribed by RBI circular only"],
              answer: 2,
              why: "Division II is for ordinary Ind AS companies; Division III was inserted for Ind AS NBFCs; banks/insurers follow their own statutes.",
            },
          ],
        },
      ],
    },
  ],
  footer:
    "FR Chapter 1 · Introduction to Indian Accounting Standards — built from the ICAI Study Material (74883bos60524-cp1). Illustration references follow the chapter.",
};
