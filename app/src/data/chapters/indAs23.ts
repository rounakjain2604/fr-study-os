// Ind AS 23 — Borrowing Costs, ported from the polished standalone dashboard
// (reference/legacy-dashboards/Ind_AS_23_Borrowing_Costs_Dashboard_polished.html)
// into first-class structured data. Figures are reproduced as printed in the
// ICAI Study Material, Chapter 6 Unit 3.

import type { ChapterDoc } from "../chapterDoc";

export const indAs23Doc: ChapterDoc = {
  id: "fr-ind-as-23",
  // Same key the standalone dashboard used, so existing mastery progress carries over.
  storageKey: "indas23done",
  kicker: "Financial Reporting · Chapter 6, Unit 3 · ICAI Study Material",
  heroTitle: "Every rupee of interest is either <em>capitalised</em> or <em>expensed</em>. This standard decides which.",
  heroStrap:
    "One core principle, two routes (specific vs general borrowings), three commencement conditions, one ceiling. Work through each section, mark it done, then drill the practicals and MCQs until the score says you're exam-ready.",
  heroStats: [
    { value: "14", label: "Sections" },
    { value: "11", label: "Illustrations" },
    { value: "8", label: "ICAI Practicals" },
    { value: "20", label: "MCQs" },
    { value: "3", label: "Live Calculators" },
  ],
  flow: {
    eyebrow: "Decision Flow",
    title: "From cost incurred to exam answer",
    steps: [
      { title: "Qualifying asset?", body: "Substantial time to be ready for use or sale." },
      { title: "Attributable borrowing?", body: "Specific loan, general pool, lease interest, eligible FX." },
      { title: "Period open?", body: "Commence, suspend, and cease at the right dates." },
      { title: "Apply ceiling.", body: "Never capitalise beyond actual borrowing costs incurred." },
    ],
    foot: "Specific · General · Forex · Disclosure",
  },
  sections: [
    {
      id: "map",
      folio: "¶ 0",
      title: "The Map",
      lede: "Hold this skeleton in your head. Every question in this chapter lands on exactly one of these six nodes.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Node 1",
              tagTone: "cap",
              title: "Core principle",
              body: "Directly attributable to a qualifying asset → capitalise. Everything else → expense when incurred.",
            },
            {
              tag: "Node 2",
              tagTone: "ntr",
              title: "Scope exclusions",
              body: "Cost of equity is never in. QAs at fair value &amp; mass-produced repetitive inventories are optionally exempt.",
            },
            {
              tag: "Node 3",
              tagTone: "ntr",
              title: "What counts as BC &amp; QA",
              body: "EIR interest, lease interest (Ind AS 116), eligible forex differences. QA = substantial time to get ready.",
            },
            {
              tag: "Node 4",
              tagTone: "cap",
              title: "How much",
              body: "Specific: actual cost less temporary investment income. General: capitalisation rate × expenditure. Ceiling: actual costs incurred.",
            },
            {
              tag: "Node 5",
              tagTone: "cap",
              title: "When",
              body: "Commence on the latest of three conditions. Suspend on extended interruption. Cease when substantially complete.",
            },
            {
              tag: "Node 6",
              tagTone: "ntr",
              title: "Disclose",
              body: "Amount capitalised in the period + the capitalisation rate used. Just two items.",
            },
          ],
        },
      ],
    },
    {
      id: "core",
      folio: "¶ 3.1",
      title: "Core Principle",
      blocks: [
        {
          kind: "split",
          left: {
            tag: "Capitalise",
            tagTone: "cap",
            title: "Directly attributable costs",
            body: "Borrowing costs directly attributable to the <b>acquisition, construction or production of a qualifying asset</b> are included in the cost of that asset — capitalisation is <b>mandatory</b>, not a choice, once conditions are met: (i) probable future economic benefits, and (ii) costs can be measured reliably.",
          },
          right: {
            tag: "Expense",
            tagTone: "exp",
            title: "All other borrowing costs",
            body: "Recognised as an <b>expense in the period in which they are incurred</b>. There is no third route — no deferral, no reserve, no equity adjustment.",
          },
        },
        {
          kind: "note",
          body: "<b>Litmus test the standard uses:</b> eligible borrowing costs are those that <b>would have been avoided</b> had the expenditure on the qualifying asset not been made. Every tricky question resolves against this test.",
        },
      ],
    },
    {
      id: "scope",
      folio: "¶ 3.2",
      title: "Scope & Exclusions",
      lede: "Two different kinds of “out of scope” — and the exam loves to blur them. One is an absolute exclusion; the other two are <strong>optional exemptions</strong> from the capitalisation requirement.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Absolute exclusion",
              tagTone: "exp",
              title: "Cost of equity",
              body: "Actual or imputed cost of equity — including preference capital <b>not classified as a liability</b> — is never a borrowing cost. So: equity dividends, equity issue costs, dividend on equity-classified preference shares — all out. <span class=\"dim-ref\">(Example 1)</span>",
            },
            {
              tag: "Not required",
              tagTone: "ntr",
              title: "QA measured at fair value",
              body: "e.g. a biological asset under Ind AS 41. Capitalisation wouldn't change the balance sheet; it would merely reshuffle finance cost vs fair-value movement within P&amp;L.",
            },
            {
              tag: "Not required",
              tagTone: "ntr",
              title: "Repetitive mass inventories",
              body: "Inventories manufactured in <b>large quantities on a repetitive basis</b>. Rationale: allocating and monitoring borrowing costs across such inventories is impractical.",
            },
          ],
        },
        {
          kind: "trap",
          body: "<b>Trap:</b> “exemption” ≠ “prohibition”. Cheese with a long production cycle is mass-produced, so capitalisation is <b>not required</b> — but it is <b>permitted</b> because the cycle takes a substantial period (Illustration 1). Read the question stem: “required to” vs “can”.",
        },
      ],
    },
    {
      id: "defs",
      folio: "¶ 3.3",
      title: "Key Definitions",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              title: "Borrowing costs <span class=\"pno\">interest + other costs on borrowing of funds</span>",
              bullets: [
                "<strong>Interest expense</strong> calculated using the <strong>effective interest rate method</strong> per Ind AS 109",
                "<strong>Interest on lease liabilities</strong> recognised per Ind AS 116",
                "<strong>Exchange differences</strong> on foreign-currency borrowings, only <strong>to the extent regarded as an adjustment to interest costs</strong>",
              ],
              trap: "<b>Not</b> dividends on equity, <b>not</b> notional interest on the entity's own cash. Ind AS 23 caps capitalisation at <b>actual</b> borrowing costs incurred.",
            },
            {
              title: "Qualifying asset <span class=\"pno\">necessarily takes substantial time to get ready for intended use or sale</span>",
              bullets: [
                "<strong>Can be:</strong> inventories, manufacturing plants, power generation facilities, intangible assets, investment properties, bearer plants",
                "<strong>Never:</strong> financial assets; inventories produced over a short period; assets <strong>ready for intended use or sale when acquired</strong>",
                "<strong>“Substantial period”:</strong> Ind AS 23 deliberately gives no bright line — facts and circumstances; 12 months or more is <em>likely</em> substantial",
              ],
            },
          ],
        },
        {
          kind: "flips",
          title: "The five definition illustrations — judgement calls",
          items: [
            {
              label: "ILL 2",
              question: "Computer software under development taking substantial time — qualifying asset? Does management intention matter?",
              answer: "<b>Yes and yes.</b> An intangible taking substantial time to get ready is a QA. Management assesses at acquisition whether the asset is “ready for intended use” — if an acquired asset can only be used with a larger group of assets, or was acquired for constructing one specific QA, assess on a <b>combined basis</b>.",
            },
            {
              label: "ILL 3",
              question: "3G licence — could be sold to a third party, but management will use it to build a network. Capitalise borrowing costs on it?",
              answer: "<b>Yes.</b> The licence is the first step of the wider network investment project — part of a qualifying asset. The fact it <i>could</i> be sold or licensed out is <b>irrelevant</b>; intended use governs.",
            },
            {
              label: "ILL 4",
              question: "Real estate co. buys (a) a permit for one building, (b) equipment usable across many projects. Capitalise on each?",
              answer: "<b>Permit — yes:</b> specific to one building, first step of the wider project, part of the QA's cost. <b>Equipment — no:</b> usable for other projects, hence ready for its intended use on acquisition — not a QA.",
            },
            {
              label: "ILL 5",
              question: "Interest on a finance lease of a crane / dockyard used to build a ship — capitalise?",
              answer: "<b>Yes.</b> Lease interest is capitalised if the leased asset is a QA <i>or is used solely to construct one</i>. The ship is the QA; lease interest on the crane is capitalised — but only <b>up to the point construction of the ship is complete</b>.",
            },
          ],
        },
      ],
    },
    {
      id: "forex",
      folio: "¶ 3.4",
      title: "Exchange Differences",
      lede: "The most-tested computation. The logic: you borrowed in a foreign currency to save interest. The exchange loss is treated as borrowing cost <strong>only up to the interest you “saved”</strong> versus borrowing in your functional currency.",
      blocks: [
        {
          kind: "formula",
          lines: [
            "Eligible exchange difference = <span class=\"hl\">min</span> [ Exchange loss , (Functional-currency interest <span class=\"dim\">that would have been incurred</span> − Actual FC interest) ]",
            "<span class=\"dim\">Total capitalisable BC can never exceed the functional-currency benchmark.</span>",
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              title: "Worked anchor — Illustration 6",
              body: "Loan USD 20,000 @ 5%, taken 1-Apr-20X1 at ₹45/$; closing ₹48/$. INR alternative: 11%.",
              table: {
                rows: [
                  { label: "(a) Actual interest: 20,000 × 5% × ₹48", values: ["₹ 48,000"] },
                  { label: "(b) INR benchmark: 20,000 × ₹45 × 11%", values: ["₹ 99,000"] },
                  { label: "(c) Headroom (b − a)", values: ["₹ 51,000"] },
                  { label: "Exchange loss: 20,000 × (48 − 45)", values: ["₹ 60,000"] },
                  { label: "<b>Eligible exchange diff = min(60,000, 51,000)</b>", values: ["<b>₹ 51,000</b>"], strong: true },
                  { label: "Capitalise 48,000 + 51,000", values: ["<b>₹ 99,000</b>"], tone: "cap" },
                  { label: "Expense balance loss", values: ["<b>₹ 9,000</b>"], tone: "exp" },
                ],
              },
            },
            {
              title: "The reversal rule — Example 2 &amp; 3 logic <span class=\"pno\">subsequent gains claw back prior loss adjustments</span>",
              body: "Where an <b>unrealised exchange loss</b> was treated as an adjustment to interest, and a <b>later realised or unrealised gain</b> arises on the <i>same borrowing</i>, the gain is recognised as an adjustment to interest — but only <b>to the extent of the loss previously recognised</b>.",
              bullets: [
                "Example 2: $1,000 @ 4% at ₹40→₹50; INR rate 12%. Interest ₹2,000; benchmark ₹4,800; eligible loss capped at <b>₹2,800</b>; total BC = ₹4,800. If closing were ₹41: total FC cost ₹2,640 &lt; ₹4,800, so the <b>entire</b> ₹1,000 loss is eligible.",
                "Example 3 (₹50→₹48): gain ₹2,000 adjusts interest, being &lt; prior ₹2,800 loss. (₹50→₹44): gain ₹6,000, but adjustment limited to <b>₹2,800</b>. On part repayment ($600 repaid): adjustment on the $400 balance limited to its share of prior loss, ₹1,120 (= 2,800 × 400/1,000).",
              ],
            },
          ],
        },
        { kind: "calculator", calc: "forex" },
      ],
    },
    {
      id: "recog",
      folio: "¶ 3.5",
      title: "Specific vs General Borrowings",
      blocks: [
        {
          kind: "split",
          left: {
            tag: "Specific",
            tagTone: "cap",
            title: "Borrowed for that asset",
            body: "Capitalise <b>actual borrowing costs incurred</b> during the period <b>less investment income</b> on the temporary investment of those borrowings. Direct identification, no rate needed.",
          },
          right: {
            tag: "General",
            tagTone: "ntr",
            title: "Pool of everything else",
            body: "Capitalise <b>capitalisation rate × expenditure on the QA</b>. The rate is the <b>weighted average</b> cost of all general borrowings outstanding in the period — <b>excluding</b> specific borrowings until their asset is substantially complete.",
          },
        },
        {
          kind: "formula",
          lines: [
            "Capitalisation rate = <span class=\"hl\">Σ (weighted-avg borrowing costs on general borrowings)</span> ÷ <span class=\"hl\">Σ (total general borrowings outstanding)</span>",
            "BC capitalised = Expenditure on QA × rate × time outstanding &nbsp;&nbsp;<span class=\"dim\">|&nbsp; Ceiling: actual BC incurred in the period</span>",
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              title: "Illustration 7 — specific borrowing",
              body: "₹30,00,000 @ 9% borrowed 1-Apr-20X1 for two buildings; idle funds parked @ 7% for 6 months (drawn ₹5L + ₹10L on 1-Apr; balance on 1-Oct).",
              table: {
                columns: ["", "Factory", "Office"],
                rows: [
                  { label: "Borrowing cost @ 9%", values: ["90,000", "1,80,000"] },
                  { label: "Less: investment income @ 7% × 6/12", values: ["(17,500)", "(35,000)"] },
                  { label: "<b>BC capitalised</b>", values: ["<b>72,500</b>", "<b>1,45,000</b>"], strong: true },
                  { label: "<b>Total asset cost</b>", values: ["<b>10,72,500</b>", "<b>21,45,000</b>"], strong: true },
                ],
              },
            },
            {
              title: "Illustration 9 — general pool rate",
              body: "18% bank loan ₹1,000k + 16% term loan ₹3,000k all year. 14% debentures ₹2,000k issued for an office building whose work hasn't started — <b>specific, so excluded</b>. Plant expenditure: ₹5,00,000 on 1-Apr; ₹25,00,000 on 1-Jan.",
              table: {
                rows: [
                  { label: "Rate = (18%×1,000 + 16%×3,000) ÷ 4,000", values: ["<b>16.5%</b>"], strong: true },
                  { label: "5,00,000 × 16.5%", values: ["82,500"] },
                  { label: "25,00,000 × 16.5% × 3/12", values: ["1,03,125"] },
                  { label: "<b>BC capitalised</b>", values: ["<b>1,85,625</b>"], strong: true },
                ],
              },
            },
          ],
        },
        { kind: "calculator", calc: "capRate" },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              title: "Illustration 8 — when specific turns general",
              body: "An 8% loan funded Building A, completed 31-Mar-20X3, but stays outstanding till 20X7. From completion, it <b>joins the general pool</b>: had cash not been spent on other QAs, it could have repaid this loan — so its cost is now “avoidable”, i.e. directly attributable to the new Building B.",
            },
            {
              title: "The expenditure base <span class=\"pno\">¶ 3.5.3 – 3.5.4</span>",
              bullets: [
                "Counts only expenditures via <strong>cash paid, transfers of other assets, or assumption of interest-bearing liabilities</strong>",
                "<strong>Reduced by</strong> progress payments received and government grants (Ind AS 20)",
                "<strong>Average carrying amount</strong> during the period (incl. BC already capitalised) is a reasonable approximation of the base",
                "If carrying amount / expected cost exceeds recoverable amount or NRV → <strong>write down per other standards</strong> (and write back where those standards permit)",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "period",
      folio: "¶ 3.6",
      title: "Period of Capitalisation",
      blocks: [
        {
          kind: "timeline",
          nodes: [
            {
              phase: "Commence — ¶ 3.6.1",
              title: "Latest of three",
              body: "Begin on the date the entity <b>first meets all three</b>: (a) incurs expenditure for the asset, (b) incurs borrowing costs, (c) undertakes activities necessary to prepare the asset. Activities include technical &amp; administrative work pre-construction (e.g. permits) — but <b>not</b> merely holding an asset with no development.",
            },
            {
              phase: "Suspend — ¶ 3.6.2",
              title: "Extended interruption",
              body: "Suspend during <b>extended periods</b> when active development is interrupted — those are costs of holding a part-finished asset. Do <b>not</b> suspend for temporary delays that are a <b>necessary part of the process</b>: seasonal high water on a bridge, inventory undergoing slow maturation.",
            },
            {
              phase: "Cease — ¶ 3.6.3",
              title: "Substantially complete",
              body: "Stop when <b>substantially all activities</b> needed for intended use or sale are done — normally physical completion, even if routine admin or minor modifications (e.g. buyer's decoration) remain. Completed-in-parts: cease per part if each is usable alone (business park); whole-asset rule if sequential (steel mill).",
            },
          ],
        },
        { kind: "calculator", calc: "commencement" },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              title: "Cessation judgement calls",
              bullets: [
                "<strong>Example 5 (H Ltd):</strong> commercial complex ready 31-May-20X1; only 10% rented by year-end. Capitalise <strong>only up to 31-May</strong> — occupancy is irrelevant; readiness governs.",
                "<strong>Example 4(a):</strong> construction halted Oct–Jan, equipment shifted to another site → <strong>suspend</strong>.",
                "<strong>Example 4(b):</strong> 20-day technical delay near completion → <strong>continue</strong> capitalising.",
                "<strong>Land:</strong> BC capitalised while land is <strong>under development</strong>; not while it is merely held for building with no activity.",
              ],
            },
            {
              title: "Illustration 10 — worked commencement",
              body: "Interest from 15-May, site planning from 2-Jun, expenditure from 19-Jun, construction 18-Jul → commencement <b>19-Jun-20X1</b>. Physical construction start is irrelevant once planning counts as “activities”.",
            },
          ],
        },
      ],
    },
    {
      id: "disc",
      folio: "¶ 3.7",
      title: "Disclosure",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              title: "Only two disclosures",
              bullets: [
                "(a) the <strong>amount of borrowing costs capitalised</strong> during the period",
                "(b) the <strong>capitalisation rate</strong> used to determine the amount eligible for capitalisation",
              ],
              note: "<b>Memory hook:</b> “How much, and at what rate.” Note — disclosure of the rate is an Ind AS 23 requirement that <b>AS 16 does not have</b> (difference no. 9).",
            },
            {
              title: "Live example — Larsen &amp; Toubro, FY 2021-22",
              body: "Additions to buildings / CWIP included <b>₹8.83 crore</b> of borrowing cost capitalised under Ind AS 23 (previous year ₹27.75 crore), and the capitalisation rate used was <b>6.23%</b> (previous year 5.71%). L&amp;T's policy: borrowing costs net of investment income on temporary investment of related borrowings are capitalised till the asset is ready; all other borrowing costs go to P&amp;L.",
            },
          ],
        },
      ],
    },
    {
      id: "special",
      folio: "¶ 3.8",
      title: "Special Situations",
      blocks: [
        {
          kind: "flips",
          items: [
            {
              label: "3.8.1",
              question: "Dividends on redeemable preference shares, redeemable at the holder's option — borrowing cost?",
              answer: "<b>Yes.</b> Such shares are financial <b>liabilities</b> under Ind AS 32, so the dividend is in substance interest — it meets the borrowing-cost definition and is capitalised following the <b>specific borrowing</b> principles (Example 6). Contrast: dividend on equity-classified preference capital is excluded from scope.",
            },
            {
              label: "3.8.2",
              question: "Parent borrows, subsidiary builds the qualifying asset. Who capitalises what?",
              answer: "<b>Group FS:</b> capitalise if the amount fairly reflects the group's interest cost on third-party borrowings that could have been avoided. <b>Subsidiary's own FS:</b> nothing — it has no borrowings. But if it takes an <b>intra-group loan</b>, it capitalises the actual costs it incurs on that loan (Illustration 11).",
            },
            {
              label: "3.8.3",
              question: "Whisky matures at 3 years but keeps improving. Keep capitalising borrowing costs after year 3?",
              answer: "<b>Yes, conditionally.</b> If holding-to-mature is consistent with the business model and the item demonstrably keeps increasing in value <b>solely because of age</b> (not market movements or inflation), continue. If that can't be demonstrated, the stock is held-for-sale — stop capitalising (Example 7).",
            },
            {
              label: "¶ 3.5",
              question: "Hyperinflationary economy (Ind AS 29 applies) — full borrowing cost capitalised?",
              answer: "<b>No.</b> The part of borrowing costs that <b>compensates for inflation</b> during the period is recognised as an <b>expense</b>, not capitalised.",
            },
            {
              label: "TYK 7",
              question: "Bonds issued at a discount fund a QA ready at end of year 2 of 4. How much discount/interest is capitalised?",
              answer: "Borrowing cost = <b>EIR interest</b> on the carrying amount (transaction price ₹1,80,000 for the ₹2,00,000 bond at 10% discount). Capitalise years 1–2 only: ₹24,102 + ₹24,651 = <b>₹48,753</b>; years 3–4 EIR interest is expensed.",
            },
            {
              label: "¶ 3.5.1.1",
              question: "Entity uses its own cash to build a plant. Capitalise the interest the cash “could have earned”?",
              answer: "<b>Never.</b> Notional borrowing costs cannot be capitalised; Ind AS 23 limits capitalisation to <b>actual</b> borrowing costs incurred, and does not address actual or imputed cost of equity.",
            },
          ],
        },
      ],
    },
    {
      id: "vs",
      folio: "¶ 3.10",
      title: "Ind AS 23 vs AS 16",
      lede: "Ten differences in the study material. Tap each to test recall — these are direct theory marks.",
      blocks: [
        {
          kind: "flips",
          items: [
            { label: "№ 1", question: "QA measured at fair value", answer: "Ind AS 23: not required to apply the standard to BC on QAs measured at fair value (e.g. biological assets). AS 16: no such scope exclusion." },
            { label: "№ 2", question: "Repetitive inventories", answer: "Ind AS 23: not required for inventories manufactured in large quantities on a repetitive basis. AS 16: no such exclusion — applies to all inventories requiring substantial time to reach saleable condition." },
            { label: "№ 3", question: "Components of borrowing cost", answer: "Ind AS 23: interest computed by the effective interest rate method (Ind AS 109) — commitment charges and amortisation of discounts/premiums/ancillary costs are subsumed in EIR. AS 16 separately lists interest &amp; commitment charges, amortisation of discounts/premiums, and amortisation of ancillary borrowing costs." },
            { label: "№ 4", question: "Interest on leases", answer: "Ind AS 23: interest on lease liabilities recognised per Ind AS 116. AS 16: finance charges on assets under finance leases." },
            { label: "№ 5", question: "Unrealised exchange loss &amp; later gain", answer: "Ind AS 23: a later realised/unrealised gain on the same borrowing is recognised as an adjustment to interest, to the extent of the loss previously so recognised. AS 16: does not explicitly deal with this." },
            { label: "№ 6", question: "“Substantial period of time”", answer: "Ind AS 23: no explanation included. AS 16: explains it as twelve months." },
            { label: "№ 7", question: "Hyperinflationary economies", answer: "Ind AS 23: when Ind AS 29 applies, the inflation-compensating part of BC is expensed. AS 16: no clarification (India has no hyperinflation standard)." },
            { label: "№ 8", question: "Parent &amp; subsidiary borrowings in the weighted average", answer: "Ind AS 23: in some circumstances include all borrowings of parent + subsidiaries in the weighted average; in others, each subsidiary uses its own. AS 16: no such provision." },
            { label: "№ 9", question: "Disclosure of capitalisation rate", answer: "Ind AS 23: requires disclosure of the rate used. AS 16: no such requirement." },
            { label: "№ 10", question: "Foreign-currency comparison base", answer: "Ind AS 23: difference computed with reference to the functional currency. AS 16 read with AS 11: local currency vs foreign currency." },
          ],
        },
      ],
    },
    {
      id: "drill",
      folio: "⚡",
      title: "Rapid Drill — Capitalise or Not?",
      lede: "Every scenario below is lifted from the chapter's illustrations and examples. Answer on instinct, then read the reasoning. Target: a clean 14/14.",
      blocks: [
        {
          kind: "drill",
          items: [
            { prompt: "Dairy company: cheese takes a substantially long production cycle. Borrowing cost on financing the cheese inventory?", capitalise: true, why: "Permitted (Illustration 1). The repetitive-inventory exemption means capitalisation is not required — but it is allowed since the cycle is substantial." },
            { prompt: "Dividend paid on equity shares of the entity.", capitalise: false, why: "Cost of equity is outside the scope of Ind AS 23 entirely (Example 1)." },
            { prompt: "Interest the entity's own cash “could have earned” while funding construction.", capitalise: false, why: "Notional borrowing cost can never be capitalised — only actual costs incurred." },
            { prompt: "3G licence acquired specifically to build a wireless network; it could alternatively be sold.", capitalise: true, why: "Illustration 3 — first step of the wider network project; saleability is irrelevant." },
            { prompt: "Construction equipment bought for use across many building projects.", capitalise: false, why: "Illustration 4 — ready for intended use on acquisition; not a qualifying asset." },
            { prompt: "Permit acquired for the construction of one specific building.", capitalise: true, why: "Illustration 4 — specific to one building; part of the QA's cost." },
            { prompt: "Interest on a finance lease of a dockyard used solely to build a ship (during construction).", capitalise: true, why: "Illustration 5 — capitalise until the ship's construction is complete." },
            { prompt: "Borrowing costs while land bought for building is held with no development activity.", capitalise: false, why: "Holding without development is not a “necessary activity” — no capitalisation." },
            { prompt: "Borrowing costs during high-water season that routinely delays bridge construction in that region.", capitalise: true, why: "A necessary, expected part of the process — capitalisation continues (¶3.6.2)." },
            { prompt: "Borrowing costs from Oct to Jan while construction is halted and machinery is moved to another site.", capitalise: false, why: "Extended interruption of active development — suspend (Example 4a)." },
            { prompt: "Borrowing costs after 31-May when the complex was ready, because only 10% is rented by year-end.", capitalise: false, why: "Example 5 — cease at readiness (31-May); occupancy level is irrelevant." },
            { prompt: "Dividend on redeemable preference shares classified as a financial liability, funding a QA.", capitalise: true, why: "Example 6 — in-substance interest; capitalise per specific-borrowing principles." },
            { prompt: "Interest on an intra-group loan, in the borrowing subsidiary's own separate financial statements (QA built by it).", capitalise: true, why: "Illustration 11 — capitalise the actual costs it incurs." },
            { prompt: "Part of borrowing cost that compensates for inflation, where Ind AS 29 applies.", capitalise: false, why: "Expensed as required by Ind AS 29 — not capitalised." },
          ],
        },
      ],
    },
    {
      id: "tyk",
      folio: "TYK",
      title: "ICAI Practicals — full solutions",
      lede: "All 8 Test-Your-Knowledge questions, verbatim figures. <strong>Attempt on paper first</strong>, then open the solution — this is where the writing practice comes from.",
      blocks: [
        {
          kind: "tyk",
          items: [
            {
              ref: "Q1",
              title: "Commencement — ships on order",
              question: "Marine Transport Ltd ordered 3 ships on 1-Apr-20X0, paying 25% down from long-term bank borrowings. Delivery commences FY 20X7. On 1-Mar-20X2 the builder informs that production of one ship has commenced; no progress on the other two. Can borrowing costs be capitalised for FY 20X1 or FY 20X2?",
              solution: "<p>A ship is a qualifying asset (substantial construction period). Commencement requires all three conditions (para 17): expenditure incurred, borrowing costs incurred, and necessary activities undertaken.</p><p>Conditions (a) and (b) are met on 1-Apr-20X0 (down payment from borrowings). Condition (c) is met only on <b>1-Mar-20X2</b>, and only for <b>one ship</b>.</p><p><b>FY 31-Mar-20X1:</b> no capitalisation. <b>FY 31-Mar-20X2:</b> capitalise borrowing costs for the one ship from 1-Mar-20X2 to 31-Mar-20X2 only; all other borrowing costs are expensed.</p>",
            },
            {
              ref: "Q2",
              title: "General borrowings — treasury pool",
              question: "X Ltd's treasury funds everything centrally. QA expenditure: ₹2,50,000 on 1-Jul-20X1 and ₹3,00,000 on 1-Dec-20X1. Borrowings: long-term loan @10% avg ₹10,00,000 (interest ₹1,00,000) and working-capital loan avg ₹5,00,000 (interest ₹65,000). Compute BC to capitalise.",
              solution: "<p>Capitalisation rate = total borrowing costs ÷ weighted-average total borrowings = 1,65,000 ÷ 15,00,000 = <b>11%</b>.</p><table class=\"tbl\"><tbody><tr><td>₹2,50,000 × 11% × 9/12</td><td class=\"num\">20,625</td></tr><tr><td>₹3,00,000 × 11% × 4/12</td><td class=\"num\">11,000</td></tr><tr><td><b>Capitalised for FY 20X1-X2</b></td><td class=\"num\"><b>31,625</b></td></tr></tbody></table>",
            },
            {
              ref: "Q3",
              title: "Capitalisation rate with changing balances",
              question: "Head office built 1-Sep to 31-Dec-20X1. Spend: ₹1,00,000 (Sep) and ₹2,50,000 each in Oct–Dec, at month-starts. No specific loan. General borrowings during construction: 10% debentures FV ₹20 lakh; overdraft ₹5,00,000 (rising to ₹7,50,000 in Dec); OD interest 15% till 1-Oct, then 16%. Find the capitalisation rate.",
              solution: "<table class=\"tbl\"><tbody><tr><td>Debenture interest, Sep–Dec (20,00,000 × 10% × 4/12)</td><td class=\"num\">66,667</td></tr><tr><td>OD ₹5,00,000 @15%, Sep</td><td class=\"num\">6,250</td></tr><tr><td>OD ₹5,00,000 @16%, Oct–Nov</td><td class=\"num\">13,333</td></tr><tr><td>OD ₹7,50,000 @16%, Dec</td><td class=\"num\">10,000</td></tr><tr><td><b>Total finance cost, Sep–Dec</b></td><td class=\"num\"><b>96,250</b></td></tr></tbody></table><p>Weighted-average borrowings = [(20,00,000×4)+(5,00,000×3)+(7,50,000×1)] ÷ 4 = <b>₹25,62,500</b>.</p><p>Capitalisation rate = 96,250 ÷ 25,62,500 = <b>3.756%</b> (for the four-month construction period).</p>",
            },
            {
              ref: "Q4",
              title: "Specific + general mix, with journal entry",
              question: "K Ltd builds at est. ₹7 lakh from 1-Apr-20X1; specific loan ₹2 lakh @9%. Other loans: ₹7,00,000 @12% and ₹9,00,000 @11%. Spend: Apr ₹1,50,000; Aug ₹2,00,000; Oct ₹3,50,000; Jan ₹1,00,000. Complete 31-Jan-20X2. Interest to capitalise + journal entry.",
              solution: "<p>(i) General-pool rate = (84,000 + 99,000) ÷ 16,00,000 = <b>11.4375%</b>.</p><p>(ii) Allocate spend first to the ₹2,00,000 specific loan, then general (10 months Apr–Jan; later spends weighted to 31-Jan):</p><table class=\"tbl\"><tbody><tr><td>1-Apr: 1,50,000 (specific) × 9% × 10/12</td><td class=\"num\">11,250</td></tr><tr><td>1-Aug: 50,000 (specific) × 9% × 10/12*</td><td class=\"num\">3,750</td></tr><tr><td>1-Aug: 1,50,000 (general) × 11.4375% × 6/12</td><td class=\"num\">8,578</td></tr><tr><td>1-Oct: 3,50,000 (general) × 11.4375% × 4/12</td><td class=\"num\">13,344</td></tr><tr><td>1-Jan: 1,00,000 (general) × 11.4375% × 1/12</td><td class=\"num\">953</td></tr><tr><td><b>Interest capitalised</b></td><td class=\"num\"><b>37,875</b></td></tr></tbody></table><p class=\"fine\">*As per the ICAI solution the specific tranche is computed for 10 months. Total cost of building = 8,00,000 + 37,875 = <b>₹8,37,875</b>.</p><p><b>Journal (31-1-20X2):</b> Building A/c Dr ₹8,37,875 → To Bank A/c ₹8,00,000, To Interest Payable (borrowing cost) ₹37,875. <i>(Alternatively, if interest is paid on capitalisation date: To Bank ₹8,37,875.)</i></p>",
            },
            {
              ref: "Q5",
              title: "Specific exhausted, spillover to general",
              question: "Building contracted ₹22,00,000 on 1-Apr-20X1, complete end-Mar-20X2. Payments (₹'000): 200 (1-Apr), 600 (30-Jun), 1,200 (31-Dec), 200 (31-Mar). Borrowings: 10% 4-yr note ₹7,00,000 specific (interest ₹65,000; investment income ₹20,000); 12.5% note ₹10,00,000; 10% note ₹15,00,000. BC to capitalise?",
              solution: "<p>Specific ₹7,00,000 absorbs the 1-Apr payment (200) and 500 of the 30-Jun payment; the excess goes to general borrowings:</p><table class=\"tbl\"><thead><tr><th>Date</th><th>To general</th><th>Weighted</th></tr></thead><tbody><tr><td>1-Apr</td><td class=\"num\">0</td><td class=\"num\">0</td></tr><tr><td>30-Jun</td><td class=\"num\">100</td><td class=\"num\">100×9/12 = 75</td></tr><tr><td>31-Dec</td><td class=\"num\">1,200</td><td class=\"num\">1,200×3/12 = 300</td></tr><tr><td>31-Mar</td><td class=\"num\">200</td><td class=\"num\">0</td></tr><tr><td><b>Total</b></td><td class=\"num\">—</td><td class=\"num\"><b>375 (₹'000)</b></td></tr></tbody></table><p>Capitalisation rate = (10,00,000×12.5% + 15,00,000×10%) ÷ 25,00,000 = <b>11%</b>.</p><table class=\"tbl\"><tbody><tr><td>On specific loan</td><td class=\"num\">65,000</td></tr><tr><td>On general: 3,75,000 × 11%</td><td class=\"num\">41,250</td></tr><tr><td>Less: investment income on specific borrowings</td><td class=\"num\">(20,000)</td></tr><tr><td><b>Capitalised</b></td><td class=\"num\"><b>86,250</b></td></tr></tbody></table>",
            },
            {
              ref: "Q6",
              title: "Group — four sets of financial statements",
              question: "Group: P (parent, management only), A Real Estate (borrowings ₹10,00,000 @7%; QA spend ₹15,40,000, built by B with 10% margin), B Construction (no borrowings; ₹10,00,000 QA spend from own cash), C Finance (raised ₹20,00,000 @7% externally, lent to P @8%; P used it to acquire a subsidiary). BC eligible for capitalisation in each entity's FS?",
              solution: "<p><b>Finance Co:</b> no QA expenditure — nil. <b>Construction Co:</b> no interest expense — nil. <b>Real Estate Co:</b> interest ₹70,000; QA expenditure (15,40,000) exceeds borrowings, so the <b>entire ₹70,000</b> is capitalised.</p><p><b>Consolidated (P):</b> general borrowings = 10,00,000 + 20,00,000 = ₹30,00,000 (the loan used to buy a subsidiary is <i>not excluded</i> from the pool). Group interest = 30,00,000 × 7% = ₹2,10,000.</p><p>QA expenditure, eliminating B's 10% margin: 15,40,000 ÷ 1.1 = 14,00,000; plus B's 10,00,000 = <b>₹24,00,000</b>. At 7%: eligible = <b>₹1,68,000</b> — capitalise only this, being lower than interest incurred.</p>",
            },
            {
              ref: "Q7",
              title: "Bonds issued at discount — EIR",
              question: "Y Ltd issues 10% bonds (annual interest, 4-yr maturity), FV ₹2,00,000 at 10% discount, to finance a QA ready at end of year 2. EIR 13.39%. BC to capitalise?",
              solution: "<p>Recognise the borrowing at the transaction price ₹1,80,000. Capitalise EIR interest for years 1–2 only (cessation at readiness); years 3–4 expensed.</p><table class=\"tbl\"><thead><tr><th>Yr</th><th>Opening</th><th>EIR 13.39%</th><th>Paid</th><th>Closing</th></tr></thead><tbody><tr><td>1</td><td class=\"num\">1,80,000</td><td class=\"num\">24,102</td><td class=\"num\">20,000</td><td class=\"num\">1,84,102</td></tr><tr><td>2</td><td class=\"num\">1,84,102</td><td class=\"num\">24,651</td><td class=\"num\">20,000</td><td class=\"num\">1,88,753</td></tr></tbody></table><p><b>Capitalise ₹48,753</b> to the qualifying asset.</p>",
            },
            {
              ref: "Q8",
              title: "Apportioning a mixed-use term loan",
              question: "Nikka Ltd: term loan ₹620 lakh on 1-Apr-20X1 for factory modernisation. P&M installation ₹510 lakh (complete 30-Apr-20X2); ₹54 lakh advanced for additional assets (also installed 30-Apr-20X2); ₹56 lakh used for working capital. Interest paid FY 20X1-X2: ₹68.20 lakh. Management treats 12 months as substantial. Treatment? What if complete by 28-Feb-20X2?",
              solution: "<p><b>(i) Completion 30-Apr-20X2</b> (substantial period met):</p><table class=\"tbl\"><thead><tr><th>Use</th><th>Capitalise</th><th>P&amp;L</th></tr></thead><tbody><tr><td>P&amp;M (68.20 × 510/620)</td><td class=\"num\">56.10</td><td class=\"num\">—</td></tr><tr><td>Advances for additional assets (× 54/620)</td><td class=\"num\">5.94</td><td class=\"num\">—</td></tr><tr><td>Working capital (× 56/620) — not a QA</td><td class=\"num\">—</td><td class=\"num\">6.16</td></tr><tr><td><b>Total (₹ lakh)</b></td><td class=\"num\"><b>62.04</b></td><td class=\"num\"><b>6.16</b></td></tr></tbody></table><p><b>(ii) Completion 28-Feb-20X2:</b> under 12 months — unless management specifically considers the period substantial, the assets are not qualifying assets and the <b>entire ₹68.20 lakh is expensed</b> to P&amp;L.</p>",
            },
          ],
        },
      ],
    },
    {
      id: "quiz",
      folio: "MCQ",
      title: "Quiz Bank — 20 questions",
      blocks: [
        {
          kind: "quiz",
          items: [
            { question: "Borrowing costs not directly attributable to a qualifying asset are:", options: ["Deferred and amortised over 5 years", "Recognised as an expense when incurred", "Adjusted against reserves", "Capitalised at management's option"], answer: 1, why: "Core principle: only directly attributable costs are capitalised; everything else is expensed in the period incurred." },
            { question: "Which is outside the scope of Ind AS 23 altogether?", options: ["Interest on lease liabilities", "Exchange differences adjusting interest", "Actual or imputed cost of equity, incl. equity-classified preference capital", "EIR interest on debentures"], answer: 2, why: "The standard does not apply to cost of equity. The other three are components of borrowing costs." },
            { question: "Capitalisation is NOT REQUIRED (optional exemption) for borrowing costs on:", options: ["All inventories", "Qualifying assets measured at fair value", "Intangible assets", "Bearer plants"], answer: 1, why: "Optional exemptions: QAs at fair value (e.g. Ind AS 41 biological assets) and inventories mass-produced repetitively." },
            { question: "Interest expense within borrowing costs is calculated using:", options: ["Nominal coupon rate", "Straight-line amortisation of discount", "Effective interest rate method per Ind AS 109", "Market rate at reporting date"], answer: 2, why: "Ind AS 23 points to EIR per Ind AS 109; commitment charges and discount/premium amortisation are subsumed in EIR." },
            { question: "Which can never be a qualifying asset?", options: ["Inventories with a long production cycle", "A financial asset", "An investment property under construction", "A bearer plant"], answer: 1, why: "Financial assets, short-cycle inventories, and assets ready when acquired are never QAs." },
            { question: "On “substantial period of time”, Ind AS 23:", options: ["Defines it as 12 months", "Defines it as 6 months", "Gives no guidance — facts and circumstances; 12+ months likely substantial", "Leaves it to the auditor"], answer: 2, why: "No bright line in Ind AS 23. AS 16 (not Ind AS 23) explains it as twelve months." },
            { question: "For specific borrowings, the amount capitalised is:", options: ["Actual borrowing costs incurred", "Actual costs less investment income on temporary investment of those borrowings", "Capitalisation rate × expenditure", "Actual costs plus investment income"], answer: 1, why: "Deduct income earned on temporarily parked specific funds (Illustration 7)." },
            { question: "The capitalisation rate for general borrowings excludes:", options: ["Bank overdrafts", "Working-capital loans", "Specific borrowings, until their asset is substantially complete", "Debentures"], answer: 2, why: "Specific borrowings stay out of the pool until the related QA is substantially ready (Illustration 9)." },
            { question: "Borrowing costs capitalised in a period can never exceed:", options: ["10% of asset cost", "Borrowing costs incurred in that period", "The expenditure on the asset", "The prior year's capitalisation"], answer: 1, why: "The absolute ceiling is actual BC incurred during the period (applied in TYK 6)." },
            { question: "A specific loan remains outstanding after its asset is complete. It:", options: ["Stays specific forever", "Is derecognised", "Becomes part of general borrowings while outstanding", "Must be repaid immediately"], answer: 2, why: "Illustration 8 — once the asset is done, the loan's cost is avoidable for other QAs, so it joins the general pool." },
            { question: "Capitalisation commences when:", options: ["Any one of the three conditions is met", "Expenditure is incurred", "Physical construction starts", "All three conditions are first met — i.e. on the latest date"], answer: 3, why: "Expenditure + borrowing costs + necessary activities, cumulatively (Illustration 10: 19-Jun, not 18-Jul)." },
            { question: "Activities “necessary to prepare the asset” include:", options: ["Holding land with no development", "Technical and administrative work such as obtaining permits before construction", "Only physical construction", "Marketing the completed asset"], answer: 1, why: "Pre-construction technical/admin work counts; passive holding does not." },
            { question: "Construction of a bridge is delayed by high water levels common in the region during the season. Capitalisation:", options: ["Is suspended", "Continues", "Ceases permanently", "Is reversed"], answer: 1, why: "A temporary delay that is a necessary part of the process — capitalisation continues." },
            { question: "H Ltd's complex was ready 31-May but only 10% rented by 31-Mar. Capitalise borrowing costs up to:", options: ["31-Mar (year end)", "30-Jun (expected let-out)", "31-May (readiness)", "Until fully rented"], answer: 2, why: "Cessation follows readiness for intended use, not occupancy (Example 5)." },
            { question: "A business park's buildings are each usable individually while others are still being built. Capitalisation:", options: ["Continues for all until the last building is done", "Ceases per completed part", "Never commences", "Is suspended"], answer: 1, why: "Cease per part when each usable part is substantially complete; contrast a sequential steel mill (whole-asset)." },
            { question: "Ind AS 23 requires disclosure of:", options: ["Amount capitalised only", "Amount capitalised and the capitalisation rate used", "Rate only", "Lender-wise borrowing details"], answer: 1, why: "Two items: amount + rate. Rate disclosure is absent in AS 16 (difference 9)." },
            { question: "Dividend on redeemable preference shares classified as a financial liability under Ind AS 32:", options: ["Never a borrowing cost", "Is in-substance interest — can meet the borrowing-cost definition and be capitalised", "Always charged to reserves", "Outside Ind AS scope"], answer: 1, why: "Example 6 — capitalise per specific-borrowing principles." },
            { question: "Parent borrows; subsidiary (no borrowings of its own) constructs the QA. In the subsidiary's OWN financial statements:", options: ["Capitalise the parent's interest", "Capitalise notional interest", "Capitalise nothing — it has incurred no borrowing costs", "Capitalise the group's weighted-average cost"], answer: 2, why: "Capitalisation may be right in group FS; the developing entity capitalises nothing itself unless it has (intra-group) borrowings." },
            { question: "Under Ind AS 23, eligible forex differences on a foreign-currency loan are limited to:", options: ["The full exchange loss always", "The difference between functional-currency borrowing cost and the actual foreign-currency cost", "5% of the loan", "Interest at the foreign rate only"], answer: 1, why: "min(exchange loss, benchmark − actual interest); the excess is expensed (Illustration 6: 51,000 of 60,000)." },
            { question: "The expenditure base for applying the capitalisation rate is reduced by:", options: ["Depreciation", "Progress payments and government grants received for the asset", "Trade payables", "Future committed costs"], answer: 1, why: "Para 3.5.3 — only cash/asset-transfer/interest-bearing-liability expenditures count, net of progress payments and grants." },
          ],
        },
      ],
    },
    {
      id: "traps",
      folio: "⚠",
      title: "Exam Trap Sheet",
      lede: "Read this the night before the paper. Each line is a place candidates routinely bleed marks.",
      blocks: [
        {
          kind: "bullets",
          items: [
            "<strong>Investment income is deducted only for specific borrowings.</strong> The general-borrowing computation is rate × expenditure — no income offset appears in it.",
            "<strong>The ceiling:</strong> capitalised BC in a period can never exceed actual BC incurred in that period (see TYK 6 — eligible ₹1,68,000 vs incurred ₹2,10,000; capitalise only ₹1,68,000 as it is lower).",
            "<strong>Exclude specific borrowings from the capitalisation-rate pool</strong> until their asset is substantially complete (Illustration 9's debentures) — and pull them <em>into</em> the pool once the asset is done but the loan is still outstanding (Illustration 8).",
            "<strong>Commencement = latest of the three conditions</strong>, and “activities” start with technical/admin work (planning, permits) — not physical construction (Illustration 10: 19-Jun, not 18-Jul).",
            "<strong>Mere holding ≠ activity.</strong> Land held for building with no development → no capitalisation; land under development → capitalise.",
            "<strong>Suspension vs necessary delay:</strong> equipment shifted away for months → suspend; routine seasonal high water or maturing inventory → continue.",
            "<strong>Cessation looks at readiness, not usage.</strong> H Ltd: complex ready 31-May, only 10% let out — capitalisation still stops 31-May.",
            "<strong>Forex cap:</strong> eligible exchange loss = headroom up to functional-currency benchmark interest; the excess is an FX loss in P&amp;L, not borrowing cost. Subsequent gains reverse only up to prior loss adjustments.",
            "<strong>Forex benchmark under Ind AS 23 is the functional currency</strong> (AS 16 / AS 11 compared local vs foreign currency).",
            "<strong>Substantial period:</strong> Ind AS 23 gives no definition (12 months is only a likely indicator); AS 16 explains it as twelve months. If a renovation completes within 12 months and management doesn't consider the period substantial, <strong>everything is expensed</strong> (TYK 8 alternate: full ₹68.20 lakh to P&amp;L).",
            "<strong>Working-capital portion of a “project” loan is not for a QA</strong> — apportion and expense it (TYK 8: 56/620 share = ₹6.16 lakh expensed).",
            "<strong>Notional interest on own funds — never.</strong> Cost of equity (incl. equity-classified preference dividend) — never. Liability-classified preference dividend — yes, as specific borrowing cost.",
            "<strong>Consolidation:</strong> eliminate intra-group profit margin from the QA expenditure base before applying the rate (TYK 6: 15,40,000 ÷ 1.1).",
            "<strong>Discounted bonds:</strong> capitalise EIR interest, not coupon, and only for the construction period (TYK 7: ₹48,753 over years 1–2).",
            "<strong>Repetitive inventories exemption is optional</strong> — capitalisation is permitted where the cycle is substantial (cheese, whisky), required nowhere, prohibited nowhere within that class.",
          ],
        },
      ],
    },
  ],
  footer:
    "Source: ICAI Study Material — Financial Reporting, Chapter 6 Unit 3, Ind AS 23 “Borrowing Costs” (incl. all illustrations, examples &amp; TYK Q1–Q8). Figures reproduced as printed. Built as a personal revision aid; not a substitute for the bare text of the standard. Progress saves in this browser where storage is available.",
};
