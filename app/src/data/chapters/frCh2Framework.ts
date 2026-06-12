// FR Chapter 2 — Conceptual Framework for Financial Reporting under Ind AS.
// Authored from the ICAI Study Material text in
// 01_FR_Financial_Reporting/002 - Chapter 2. Illustration/Example numbers
// refer to that chapter.

import type { ChapterDoc } from "../chapterDoc";

export const frCh2FrameworkDoc: ChapterDoc = {
  id: "fr-ch2-framework",
  storageKey: "frch2done",
  kicker: "Financial Reporting · Chapter 2 · ICAI Study Material",
  heroTitle: "The framework behind every standard: <em>who reporting is for, what the elements are, and when they enter the books.</em>",
  heroStrap:
    "Nine units, one architecture: objective → qualitative characteristics → reporting entity → elements → recognition → measurement → presentation → capital maintenance. The exam tests definitions verbatim and their friction with individual Ind AS — both are drilled below.",
  heroStats: [
    { value: "9", label: "Units" },
    { value: "4", label: "ICAI Illustrations" },
    { value: "5", label: "Elements" },
    { value: "4", label: "Measurement Bases" },
    { value: "10", label: "MCQs" },
  ],
  flow: {
    eyebrow: "Decision Flow",
    title: "From phenomenon to financial statement",
    steps: [
      { title: "Is it an element?", body: "Asset, liability, equity, income or expense — by the 2018 definitions." },
      { title: "Recognise it?", body: "Only if recognition gives relevant + faithfully represented information." },
      { title: "Measure it how?", body: "Historical cost or a current value — chosen by relevance and faithful representation." },
      { title: "Present & disclose.", body: "Classify, aggregate, don't offset; P&L is the primary performance statement." },
    ],
    foot: "Not a standard · Ind AS overrides the Framework",
  },
  sections: [
    {
      id: "map",
      folio: "¶ 0",
      title: "The Map & Status of the Framework",
      lede: "First fix the status: the Conceptual Framework is <strong>not a standard</strong> and overrides nothing. ICAI issued it (2018-aligned) to mirror the IASB's revised Conceptual Framework.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Purpose 1",
              tagTone: "cap",
              title: "Standard setting",
              body: "Assists ICAI in formulating Ind AS on consistent concepts. If a standard departs from the Framework, the departure is explained in that standard's Appendix.",
            },
            {
              tag: "Purpose 2",
              tagTone: "cap",
              title: "Consistent policies",
              body: "Helps preparers develop accounting policies where <b>no Ind AS applies</b> to a transaction, or where a standard <b>allows a choice</b> (the Ind AS 8 hierarchy points here).",
            },
            {
              tag: "Purpose 3",
              tagTone: "cap",
              title: "Interpretation",
              body: "Assists all parties to understand and interpret Ind AS. Ind AS 1, Ind AS 8 and Ind AS 103 expressly require preparers to use the Framework's guidance.",
            },
          ],
        },
        {
          kind: "trap",
          body: "<b>Hierarchy trap:</b> when the Framework and an Ind AS conflict, the <b>Ind AS prevails</b> — always. (See Illustration 2: Ind AS 38's probability + reliable-cost recognition criteria are narrower than the Framework's, and they win.)",
        },
      ],
    },
    {
      id: "objective",
      folio: "Unit 2",
      title: "Objective of General Purpose Financial Reporting",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Objective",
              tagTone: "cap",
              title: "Useful to capital providers",
              body: "Provide financial information about the reporting entity that is useful to <b>existing and potential investors, lenders and other creditors</b> in deciding whether to provide resources.",
              bullets: [
                "Buy / sell / hold equity and debt instruments",
                "Provide or settle loans and other credit",
                "Vote on, or influence, management's actions",
              ],
              note: "Users assess (i) prospects for future net cash inflows and (ii) <b>management's stewardship</b> of the entity's resources.",
            },
            {
              tag: "Limitations",
              tagTone: "exp",
              title: "What GPFR does NOT do",
              bullets: [
                "Cannot provide <b>all</b> the information users need — they also look at economic conditions, politics, industry outlook",
                "Is <b>not designed to show the value</b> of the reporting entity — it only helps users estimate it",
                "Is <b>not primarily directed at regulators</b> or the general public — primary users are investors, lenders, other creditors",
              ],
            },
          ],
        },
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Info set 1",
              tagTone: "ntr",
              title: "Resources & claims",
              body: "Nature and amounts of economic resources and claims → liquidity and solvency, financing needs, likelihood of obtaining finance, and how future cash flows will be distributed among claimants.",
            },
            {
              tag: "Info set 2",
              tagTone: "ntr",
              title: "Changes — accrual first",
              body: "<b>Accrual accounting</b> depicts effects in the period they occur, even if cash moves later — better for assessing past and future ability to generate cash than receipts/payments alone.",
            },
            {
              tag: "Info set 3",
              tagTone: "ntr",
              title: "Cash flows & other changes",
              body: "Past cash flows show how the entity obtains and spends cash (operations, financing, investing, liquidity). Changes NOT from performance — like issuing debt or equity — must be shown separately for a complete picture.",
            },
          ],
        },
      ],
    },
    {
      id: "qc",
      folio: "Unit 3",
      title: "Qualitative Characteristics",
      lede: "Two <strong>fundamental</strong> characteristics make information useful; four <strong>enhancing</strong> ones make it more useful; one pervasive constraint (cost) bounds it all.",
      blocks: [
        {
          kind: "split",
          left: {
            tag: "Fundamental",
            tagTone: "cap",
            title: "Relevance",
            body: "Capable of making a difference to decisions — through <b>predictive value</b>, <b>confirmatory value</b>, or both (they are interrelated: this year's revenue predicts next year's AND confirms last year's prediction). Includes <b>materiality</b> — an <i>entity-specific</i> aspect based on nature or magnitude; no uniform quantitative threshold can be set.",
          },
          right: {
            tag: "Fundamental",
            tagTone: "cap",
            title: "Faithful representation",
            body: "Represent the <b>substance</b> of what it purports to represent (substance over legal form). A perfectly faithful depiction is <b>complete</b> (all descriptions and explanations), <b>neutral</b> (unbiased — supported by <b>prudence</b>), and <b>free from error</b> (no errors in process — estimates can still be faithful if clearly described).",
          },
        },
        {
          kind: "trap",
          body: "<b>Prudence trap:</b> prudence means caution under uncertainty so assets/income are not overstated and liabilities/expenses are not understated — but it <b>equally forbids deliberate understatement of assets/income or overstatement of liabilities/expenses</b>. Prudence supports neutrality; it is not a licence for hidden reserves.",
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Enhancing ×4",
              tagTone: "ntr",
              title: "Comparability · Verifiability · Timeliness · Understandability",
              bullets: [
                "<b>Comparability</b> — across entities and periods. Comparability is the goal, <i>consistency</i> (same methods) helps achieve it; <i>uniformity</i> (everything looks alike) is neither",
                "<b>Verifiability</b> — knowledgeable independent observers reach consensus; <i>direct</i> (count the cash) or <i>indirect</i> (recheck inputs and recompute, e.g. FIFO inventory)",
                "<b>Timeliness</b> — available in time to influence decisions; older = generally less useful (trend analysis is the exception)",
                "<b>Understandability</b> — clear, concise classification and presentation; complex items can't be omitted just to look simple — reports assume diligent users with reasonable business knowledge",
              ],
              note: "Enhancers should be maximised but can never make irrelevant or unfaithful information useful. One may be diminished for another (e.g. a new Ind AS temporarily reduces comparability for better relevance).",
            },
            {
              tag: "Constraint",
              tagTone: "exp",
              title: "Cost",
              body: "Reporting imposes costs on preparers and users; benefits must justify them. ICAI weighs costs and benefits for financial reporting <b>generally</b>, not entity by entity — assessments are inherently subjective.",
            },
          ],
        },
        {
          kind: "note",
          body: "<b>Application order:</b> identify the phenomenon → identify the most relevant information about it → ask whether it is available and can be faithfully represented. If yes, stop; if not, repeat with the next most relevant type. Trade-offs are allowed — sometimes a slightly less relevant measure with lower measurement uncertainty is the more useful one.",
        },
      ],
    },
    {
      id: "reporting-entity",
      folio: "Unit 4",
      title: "Financial Statements & the Reporting Entity",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Objective & scope",
              tagTone: "ntr",
              title: "What the statements provide",
              body: "Information about assets, liabilities, equity, income and expenses useful for assessing cash-flow prospects and stewardship — in the balance sheet, the statement of profit and loss, and other statements and notes (incl. unrecognised items, cash flows, equity contributions/distributions, and the methods and judgements behind the numbers).",
            },
            {
              tag: "Reporting period",
              tagTone: "ntr",
              title: "Period, comparatives, forward-looking",
              body: "Prepared for a reporting period with comparatives for <b>at least one preceding period</b>. Forward-looking information enters only if it relates to existing items and is useful (e.g. cash-flow estimates behind a measure) — not management strategy commentary. Post-period events appear if needed to meet the objective.",
            },
            {
              tag: "Two assumptions",
              tagTone: "cap",
              title: "Perspective & going concern",
              body: "Statements take the perspective of the <b>entity as a whole</b>, not any investor group. They assume the entity is a <b>going concern</b>; if liquidation is intended or unavoidable, a different basis is used — and described.",
            },
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Reporting entity",
              tagTone: "ntr",
              title: "Not necessarily a legal entity",
              body: "An entity that is required, or chooses, to prepare financial statements — a single entity, a portion of one, or more than one entity.",
              bullets: [
                "Parent + subsidiaries → <b>consolidated</b> statements",
                "Parent alone → <b>standalone/separate</b> statements",
                "Entities not linked by parent–subsidiary → <b>combined</b> statements",
                "Boundary (when not a legal entity): driven by users' information needs — complete, neutral, and described",
              ],
            },
            {
              tag: "CFS vs SFS",
              tagTone: "gold",
              title: "Consolidated ≠ substitutable",
              body: "Consolidated statements show parent + subsidiaries as one entity (useful because parent's cash inflows include distributions from subsidiaries). Unconsolidated statements serve claims against the parent alone and legal distributable-reserve tests — but they <b>cannot substitute</b> for consolidated statements when those are required.",
            },
          ],
        },
      ],
    },
    {
      id: "elements",
      folio: "Unit 5",
      title: "The Elements — 2018 Definitions",
      lede: "These definitions are quoted verbatim in exams. Learn them as cards, then stress-test with the flips.",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Asset",
              tagTone: "cap",
              title: "Present economic resource controlled by the entity as a result of past events",
              body: "An <b>economic resource</b> is a right that has the <b>potential</b> to produce economic benefits. Three legs: <b>right · potential · control</b>.",
              bullets: [
                "<b>Right</b> — from another party's obligation (receive cash/goods, favourable exchanges, insurance claims) or independent of one (use PPE, use know-how). Rights free to all (public roads, public-domain know-how) are not assets; an entity cannot have rights against itself (treasury shares are not assets)",
                "<b>Potential</b> — need not be certain or even <i>likely</i>: low probability still meets the definition (bankrupt customer's receivable is still a right); expenditure is evidence, not proof, of an asset",
                "<b>Control</b> — present ability to direct use AND obtain the benefits; one party's control excludes everyone else's; an agent's custody of the principal's resource is not the agent's asset",
              ],
            },
            {
              tag: "Liability",
              tagTone: "exp",
              title: "Present obligation to transfer an economic resource as a result of past events",
              body: "Three criteria, all required:",
              bullets: [
                "<b>Obligation</b> — a duty the entity has <b>no practical ability to avoid</b>, owed to another party (identity need not be known); includes constructive obligations from customary practice or published policies",
                "<b>Transfer of an economic resource</b> — only <i>potential</i> required; low probability still qualifies (pay cash, deliver goods, unfavourable exchanges, contingent transfers)",
                "<b>Present obligation from past events</b> — the entity has already obtained benefits or taken an action, AND as a consequence will or may have to transfer a resource it otherwise wouldn't",
              ],
              note: "Going concern logic: a transfer avoidable only by liquidating counts as unavoidable. But mere intention or high likelihood of transfer is NOT enough to create an obligation.",
            },
            {
              tag: "Equity",
              tagTone: "ntr",
              title: "Residual interest in assets after deducting all liabilities",
              body: "Claims that don't meet the liability definition. Legal or regulatory requirements may affect components (e.g. distributable reserves) — separate classification of such components can be useful.",
            },
            {
              tag: "Income / Expenses",
              tagTone: "ntr",
              title: "Changes in assets/liabilities that change equity",
              body: "<b>Income</b>: increases in assets or decreases in liabilities that increase equity — <i>except</i> contributions from holders of equity claims. <b>Expenses</b>: the mirror image, excluding distributions to equity holders.",
            },
          ],
        },
        {
          kind: "flips",
          title: "Common-to-both concepts",
          items: [
            { label: "UoA", question: "What is the 'unit of account'?", answer: "The right(s)/obligation(s) to which recognition criteria and measurement concepts are applied. It may differ for recognition vs measurement (recognise contracts individually, measure as a portfolio). Interdependent, inseparable rights+obligations form a single unit." },
            { label: "Exec", question: "What is an executory contract — and is it an asset or a liability?", answer: "A contract <b>equally unperformed</b> by both sides. It creates a combined, inseparable right and obligation to exchange resources: a single <b>asset if terms are currently favourable</b>, a single <b>liability if unfavourable</b> (e.g. salary becomes an obligation only as services are received — Example 7)." },
            { label: "Subst", question: "How are contractual terms with 'no substance' treated?", answer: "Disregarded. A term has no substance if it has no discernible economic effect — e.g. terms binding neither party, or options the holder can never practically exercise. Groups of contracts designed as one commercial effect may be one unit of account." },
            { label: "Bundle", question: "Land ownership = many rights. One asset or many?", answer: "Conceptually the economic resource is the <b>set of rights</b>, not the physical object — but describing them as 'Land' is usually the most concise faithful representation (Example 4)." },
          ],
        },
      ],
    },
    {
      id: "recognition",
      folio: "Unit 6",
      title: "Recognition & Derecognition",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Recognition",
              tagTone: "cap",
              title: "Capture into the statements",
              body: "Recognition captures an item meeting an element definition into the balance sheet or P&L; the amount carried is the <b>carrying amount</b>. The statements are linked — recognising one item requires recognising/derecognising another (the journal-entry logic), and may simultaneously create income AND expense (sell goods for cash: income from cash, expense from goods).",
              trap: "<b>Matching is NOT an objective</b> of the Framework — items that fail the element definitions can never sit on the balance sheet just to smooth costs against income.",
            },
            {
              tag: "Criteria",
              tagTone: "cap",
              title: "Recognise only if useful",
              body: "An element is recognised only if recognition gives users <b>relevant information</b> and a <b>faithful representation</b>. There is <b>no bright-line probability test and no reliable-measurement test</b> in the 2018 Framework — judgement, standard by standard.",
              bullets: [
                "Relevance may fail when: <b>existence is uncertain</b> (disputed right/obligation awaiting a court ruling) or <b>probability of inflow/outflow is low</b> — though neither automatically blocks recognition",
                "Faithful representation may fail from very high <b>measurement uncertainty</b> (exceptionally wide outcomes, extreme sensitivity, subjective allocations) — sometimes a slightly less relevant but less uncertain measure wins",
                "Unrecognised items still demand <b>note disclosure</b> visible enough to compensate",
              ],
            },
          ],
        },
        {
          kind: "split",
          left: {
            tag: "Derecognise asset",
            tagTone: "exp",
            title: "When control is lost",
            body: "Remove all or part of a recognised asset when the entity <b>loses control</b> of all or part of it. Derecognise the <b>transferred component</b> with resulting income/expense; keep the <b>retained component</b> as its own unit of account.",
          },
          right: {
            tag: "Derecognise liability",
            tagTone: "exp",
            title: "When the obligation ends",
            body: "Remove a liability when the entity <b>no longer has a present obligation</b> for all or part of it — settled, transferred or replaced. Until then, the obligation stays on the books.",
          },
        },
        {
          kind: "trap",
          body: "<b>Apparent transfers:</b> if the entity keeps exposure to significant positive or negative variations from the asset, it may still control it; transfers to an agent change nothing. The Framework deliberately commits to <b>neither</b> a pure control approach nor a pure risks-and-rewards approach for every case — see the factoring TYK below.",
        },
        {
          kind: "tyk",
          items: [
            {
              ref: "Ill. 1",
              title: "Factoring with recourse — derecognise the receivables?",
              question:
                "Natasha Ltd. carries trade receivables of ₹280 crores and factors them to Samantha Ltd. for an immediate ₹250 crores. Any shortfall against ₹250 crores is reimbursed by Natasha; collections above ₹250 crores (less interest) come back to Natasha. Directors want to derecognise. Advise per Ind AS 109 and evaluate against the Conceptual Framework.",
              solution:
                "Under Ind AS 109, a financial asset is derecognised when contractual rights to cash flows expire or when the asset (or substantially all risks and rewards) is transferred. Here the rights have not expired, Natasha <b>retains the credit risk</b> (it makes good shortfalls) and <b>retains the rewards</b> (excess collections return to it). In substance, risks and rewards remain — so the receivables <b>stay on Natasha's balance sheet</b> and the ₹250 crores received is a <b>financial liability</b>.<br/><br/>Framework angle: derecognition reflects loss of control, but retained exposure to significant variations indicates continuing control. Because faithfully representing both the retained position and the change is hard in part-disposals, the Framework endorses <b>neither pure control nor pure risk-and-reward</b> for all cases — Ind AS 109's treatment is consistent with it.",
            },
            {
              ref: "Ill. 2",
              title: "Framework vs Ind AS 38 recognition criteria",
              question:
                "Explain the Conceptual Framework's asset-recognition criteria and discuss whether Ind AS 38's criteria for intangible assets are inconsistent with them.",
              solution:
                "Framework: recognise an asset (present economic resource controlled from past events) when recognition gives <b>relevant information and a faithful representation</b>, subject to cost-benefit. There is <b>no probability threshold</b>. Ind AS 38 is narrower: probable future economic benefits + reliably measurable cost (probability deemed satisfied in business combinations). The criteria differ, but Ind AS 38's specificity still delivers relevant, faithful information — viewed through that prism they are consistent. And where they differ, <b>Ind AS prevails</b>.",
            },
            {
              ref: "Ill. 3",
              title: "Does Ind AS show the 'value' of an entity?",
              question:
                "Directors of Hind Ltd. claim Ind AS implements a fair value model yet fails to reflect the financial value of the entity. Discuss.",
              solution:
                "Ind AS is a <b>mixed measurement system</b>, not a full fair-value model — the basis follows the business model (Ind AS 109), with fair value used selectively (Ind AS 16 revaluation via OCI, Ind AS 40 disclosure-only, Ind AS 38 only with an active market, Ind AS 113 defining the exit price). And general purpose financial statements are <b>not intended to show entity value</b> — internally generated intangibles are unrecognised; the objective is decision-useful information. Net assets appear at fair value only on acquisition/consolidation.",
            },
            {
              ref: "Ill. 4",
              title: "Held-for-sale classification vs the Framework",
              question:
                "Everest Ltd. classified subsidiary Kanchenjunga Ltd. as held-for-sale/discontinued for two successive year-ends. The shareholders authorised a sale on 1 Nov 20X1; management announced intent but never actively marketed it, and later transferred additional activities to the subsidiary. Only draft agreements with bankers existed. Appropriate?",
              solution:
                "Ind AS 105 requires availability for <b>immediate sale in present condition</b> and a <b>highly probable</b> sale: committed management plan, active programme to locate a buyer, active marketing at a reasonable price, completion expected within one year, withdrawal unlikely. None of this is demonstrated — and adding activities shows it wasn't available for immediate sale. So <b>not</b> held-for-sale; report as continuing operations in both years.<br/><br/>Framework tension: separate discontinued-operations information helps users assess future cash flows, so a firm decision to sell arguably merits separate presentation — but Ind AS 105 was deliberately built strict, and the standard prevails.",
            },
          ],
        },
      ],
    },
    {
      id: "measurement",
      folio: "Unit 7",
      title: "Measurement Bases",
      lede: "One entry-value pair (historical cost, current cost) and one exit-value pair (fair value, value in use / fulfilment value). Know what each basis says and when it's relevant.",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Historical cost",
              tagTone: "ntr",
              title: "Entry value at transaction date",
              body: "Assets: consideration paid <b>+ transaction costs</b>. Liabilities: consideration received <b>− transaction costs</b>. Updated for depreciation/amortisation, collections/fulfilment, <b>impairment</b> / onerous liabilities, and interest accrual (amortised cost is historical cost applied to financial items — cash flows discounted at the original rate).",
              note: "Off-market events (interest-free parent loan, free government grant, donated asset, imposed penalty) may force a <b>deemed cost</b> = current value at initial recognition (Example 9: parent's interest-free loan to subsidiary — measure at fair value; difference is an equity contribution).",
            },
            {
              tag: "Current value",
              tagTone: "ntr",
              title: "Updated to measurement-date conditions",
              bullets: [
                "<b>Fair value</b> — exit price in an orderly transaction between <b>market participants</b>; observable or from techniques; transaction costs ignored both ways",
                "<b>Value in use / fulfilment value</b> — present value of cash flows from use+disposal / for fulfilment, on <b>entity-specific</b> assumptions; includes PV of disposal/fulfilment costs but not entry transaction costs; never directly observable",
                "<b>Current cost</b> — an <b>entry</b> value like historical cost, but at today's prices: what acquiring the equivalent asset would cost now (+ transaction costs that would be incurred)",
              ],
            },
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Selection — relevance",
              tagTone: "cap",
              title: "Characteristics + how cash flows arise",
              bullets: [
                "Value sensitive to market factors → historical cost may mislead (amortised cost can never depict a <b>derivative</b>); changes get dumped into disposal-period income, hurting predictive value",
                "Fair value adds little when assets are held solely for use or for collecting contractual cash flows",
                "Resources producing cash flows <b>indirectly in combination</b> (PPE, inventory) → historical/current cost shows margins; assets sold independently → current value; collect-contractual-cash-flow businesses → amortised cost (unless cash flows aren't principal+interest)",
              ],
            },
            {
              tag: "Selection — faithful rep.",
              tagTone: "cap",
              title: "Consistency + certainty",
              bullets: [
                "Linked assets and liabilities on different bases → <b>accounting mismatch</b> — same basis may serve better",
                "High <b>measurement uncertainty</b> may justify a different basis; it is distinct from <i>outcome</i> uncertainty and <i>existence</i> uncertainty (an active-market fair value has zero measurement uncertainty even with uncertain outcomes)",
                "Enhancers: comparability favours sticking to one basis; understandability suffers as bases multiply; verifiability favours corroborable measures. Timeliness — no specific implication",
              ],
            },
          ],
        },
        {
          kind: "note",
          body: "<b>More than one basis (¶7.5):</b> usually one basis in the statements + another in the notes. Exceptionally, a current value sits in the balance sheet while P&L uses a different basis — e.g. <b>FVOCI debt</b>: P&L shows amortised-cost interest, OCI absorbs the remaining fair-value change; accumulated OCI = balance-sheet carrying amount − amortised-cost carrying amount (Example 10).",
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Initial measurement",
              tagTone: "ntr",
              title: "At-market vs off-market",
              body: "On market terms, cost ≈ fair value at initial recognition, so either basis starts the same. Exchanges of assets: if the new asset is measured at fair value, the difference against the carrying amount given up is P&L; if measured at cost, no day-one gain (Example: carry 100, acquire at FV 120 → income 20 only under the FV basis).",
            },
            {
              tag: "Equity",
              tagTone: "ntr",
              title: "Never measured directly",
              body: "Total equity = recognised assets − recognised liabilities; it will <b>not</b> equal market capitalisation, the going-concern sale value, or the break-up value. Individual classes/components may be measured directly, but at least one cannot. Total equity can even be negative.",
            },
          ],
        },
      ],
    },
    {
      id: "presentation",
      folio: "Unit 8",
      title: "Presentation & Disclosure",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Communication",
              tagTone: "ntr",
              title: "Principles",
              body: "Balance flexibility-for-relevance against comparability. <b>Entity-specific information beats boilerplate</b>; duplication across the statements is usually unnecessary noise.",
            },
            {
              tag: "Classification",
              tagTone: "ntr",
              title: "Sort by shared characteristics",
              body: "By nature, function/role, and measurement. Splitting components (current/non-current) is fine when useful. Classifying dissimilar items together obscures information. Equity components under legal restraints (distributable reserves) may need separate display.",
            },
            {
              tag: "Offsetting",
              tagTone: "exp",
              title: "Generally NOT appropriate",
              body: "Offsetting groups a recognised asset and liability into one net number — that classifies <b>dissimilar items together</b>. It is different from treating one set of rights and obligations as a single unit of account.",
            },
          ],
        },
        {
          kind: "split",
          left: {
            tag: "P&L",
            tagTone: "cap",
            title: "The primary performance source",
            body: "In principle <b>all</b> income and expenses belong in the profit or loss section — it is the primary source of information about performance for the period.",
          },
          right: {
            tag: "OCI",
            tagTone: "exp",
            title: "The exception, by standard-setter decision",
            body: "Only in <b>exceptional circumstances</b>, for income/expenses from current-value remeasurements, may ICAI route items through OCI — and in principle they <b>reclassify to P&L</b> in a future period when that gives more relevant information; where no clear basis for timing/amount exists, ICAI may bar reclassification.",
          },
        },
        {
          kind: "note",
          body: "<b>Aggregation:</b> adding together items sharing characteristics in the same classification. It summarises — and conceals. The balance sheet and P&L carry the summaries; the notes carry the detail. Avoid both excessive detail and excessive aggregation.",
        },
      ],
    },
    {
      id: "capital",
      folio: "Unit 9",
      title: "Capital & Capital Maintenance",
      lede: "Profit is whatever is left <strong>after capital is maintained</strong>. Choose the concept of capital by what users care about: invested money or operating capability.",
      blocks: [
        {
          kind: "split",
          left: {
            tag: "Financial capital",
            tagTone: "cap",
            title: "Money / purchasing power",
            body: "Capital = net assets or equity. Profit = closing net assets &gt; opening net assets (excluding owner flows), measured in <b>nominal monetary units</b> or in <b>constant purchasing power</b>. Under nominal money, <b>holding gains are conceptually profits</b> (recognised on disposal); under purchasing power, only price increases above general inflation are profit — the rest is a capital maintenance adjustment in equity.",
          },
          right: {
            tag: "Physical capital",
            tagTone: "exp",
            title: "Operating capability",
            body: "Capital = productive capacity (e.g. units of output). Profit is earned only if physical productive capacity at the end exceeds the start (excluding owner flows). <b>All</b> price changes on assets and liabilities are capital maintenance adjustments in equity — never profit. Requires the <b>current cost</b> basis.",
          },
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Examples 11–13",
              tagTone: "gold",
              title: "One trader, three profits",
              body: "Trader starts 1.1.20X1 with ₹12,000 = 6,000 units @ ₹2; sells all @ ₹3; withdraws ₹6,000. General price index 100→120; specific price of the product ₹2.50 (index 125). Closing cash ₹12,000.",
              table: {
                columns: ["Capital maintenance basis", "Capital to maintain (₹)", "Closing capital (₹)", "Retained profit (₹)"],
                rows: [
                  { label: "Financial — nominal (historical) cost", values: ["12,000", "12,000", "<b>Nil</b>"] },
                  { label: "Financial — constant purchasing power (×120/100)", values: ["14,400", "12,000", "<b>(2,400)</b>"] },
                  { label: "Physical — current cost (6,000 × ₹2.50; closing at current cost ₹9,000)", values: ["15,000", "9,000", "<b>(6,000)</b>"], tone: "exp" },
                ],
              },
              note: "Negative retained profit = capital NOT maintained: under purchasing power he should have limited drawings to ₹3,600; under physical maintenance, to nil. The only difference between the concepts is the <b>treatment of price changes</b>.",
            },
          ],
        },
        {
          kind: "tyk",
          items: [
            {
              ref: "TYK Q1",
              title: "Defending the mixed measurement approach",
              question:
                "A majority shareholder writes that the 'mixed measurement approach' sounds inconsistent and that everything should be measured uniformly. Prepare notes for the directors with reference to the Conceptual Framework.",
              solution:
                "Mixed measurement = choosing the basis (historical cost or a current value) per item, reflecting the entity's sector and <b>business model</b>. A one-size-fits-all basis may not give relevant information; a particular basis can be more understandable, more verifiable and cheaper. The Framework expressly supports mixed measurement — standards pick the basis giving the most relevant, faithfully representative information. Where a standard allows choice, directors judge which basis serves primary users best, also weighing <b>measurement uncertainty</b> (a highly uncertain estimate can lose relevance). Calling it 'inconsistent' is a poor argument; relevance outweighs notional uniformity.",
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
              question: "When a requirement in an Ind AS conflicts with the Conceptual Framework:",
              options: ["The Framework prevails", "The Ind AS prevails", "The preparer chooses", "NFRA decides case by case"],
              answer: 1,
              why: "The Framework is not a standard and overrides nothing; departures are explained in the standard's Appendix.",
            },
            {
              question: "The primary users of general purpose financial reports are:",
              options: ["Regulators and tax authorities", "Management", "Existing and potential investors, lenders and other creditors", "Employees and society at large"],
              answer: 2,
              why: "GPFR is not primarily directed at regulators or the public — only at capital providers.",
            },
            {
              question: "Materiality is best described as:",
              options: ["A uniform quantitative threshold set by ICAI", "An entity-specific aspect of relevance", "An enhancing qualitative characteristic", "A component of faithful representation"],
              answer: 1,
              why: "It is entity-specific, based on nature or magnitude — no uniform threshold can be prescribed.",
            },
            {
              question: "Prudence, as used in the 2018 Framework, supports:",
              options: ["Deliberate understatement of assets", "Creation of hidden reserves", "Neutrality", "Faster recognition of income"],
              answer: 2,
              why: "Prudence is caution under uncertainty supporting neutrality — it forbids overstatement AND understatement either way.",
            },
            {
              question: "Verifying inventory by rechecking quantities, costs and the FIFO computation is:",
              options: ["Direct verification", "Indirect verification", "Confirmation", "Substantive analytical procedure"],
              answer: 1,
              why: "Checking inputs to a model and recalculating outputs is indirect verification; counting cash is direct.",
            },
            {
              question: "An economic resource is:",
              options: ["A physical object owned by the entity", "A right with the potential to produce economic benefits", "A probable future economic benefit", "Cash or claims to cash"],
              answer: 1,
              why: "The 2018 definition — the resource is the present right, not the object and not the future benefits themselves.",
            },
            {
              question: "Which is TRUE of the liability definition?",
              options: [
                "Transfer must be probable",
                "The counterparty must be identifiable",
                "An obligation the entity has no practical ability to avoid suffices, even with low transfer probability",
                "Constructive obligations are excluded",
              ],
              answer: 2,
              why: "No probability threshold; identity of the counterparty need not be known; constructive obligations are squarely included.",
            },
            {
              question: "An executory contract is recognised as:",
              options: [
                "Separate asset and liability for each leg",
                "A single asset if terms are currently favourable, a single liability if unfavourable",
                "Always off balance sheet",
                "Income over the contract period",
              ],
              answer: 1,
              why: "The combined right and obligation are inseparable — one unit of account whose direction depends on current terms.",
            },
            {
              question: "Which basis ignores transaction costs entirely (both on entry and on exit)?",
              options: ["Historical cost", "Fair value", "Value in use", "Current cost"],
              answer: 1,
              why: "Fair value is a market exit price — costs to buy or sell are not part of it. Value in use deducts PV of disposal costs; cost bases include entry costs.",
            },
            {
              question: "Under physical capital maintenance, an increase in the price of assets held is treated as:",
              options: ["Profit when realised", "Profit immediately", "A capital maintenance adjustment in equity", "OCI to be reclassified"],
              answer: 2,
              why: "All price changes are remeasurements of productive capacity — equity adjustments, never profit.",
            },
          ],
        },
      ],
    },
  ],
  footer:
    "FR Chapter 2 · Conceptual Framework for Financial Reporting under Ind AS — built from the ICAI Study Material. Illustration and example numbers follow the chapter.",
};
