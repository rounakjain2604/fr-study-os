// AFM Chapter 1 — Financial Policy and Corporate Strategy.
//
// NOTE: there is no AFM ICAI source text in this repo (only FR material lives in
// 01_FR_Financial_Reporting/). This workspace is authored from the established
// ICAI CA Final AFM (Paper 2) syllabus for Chapter 1 — a first-reading study aid,
// not an extract of an uploaded module. Verify figures against your ICAI book.

import type { ChapterDoc } from "../chapterDoc";

export const afmCh1FinancialPolicyDoc: ChapterDoc = {
  id: "afm-ch1",
  storageKey: "afmch1done",
  kicker: "Advanced Financial Management · Chapter 1 · AFM Sprint Day 1",
  heroTitle: "Where money meets strategy: <em>how financial policy funds, shapes and limits what the business can become.</em>",
  heroStrap:
    "A theory-first chapter. Master four blocks — strategic financial management and its functions, financial planning, the interface of financial policy with corporate strategy, and the one number the exam loves: the sustainable growth rate. Learn the definitions verbatim, then drill the SGR maths.",
  heroStats: [
    { value: "3", label: "Core decisions" },
    { value: "3", label: "Strategy levels" },
    { value: "PRAT", label: "SGR model" },
    { value: "1", label: "Worked sum" },
    { value: "8", label: "MCQs" },
  ],
  flow: {
    eyebrow: "The money cycle",
    title: "Every strategic move passes through four financial decisions",
    steps: [
      { title: "Invest", body: "Capital budgeting — commit funds to projects that earn above the cost of capital." },
      { title: "Finance", body: "Choose the debt–equity mix that funds the strategy at the lowest risk-adjusted cost." },
      { title: "Distribute", body: "Dividend vs retention — return cash or reinvest to grow." },
      { title: "Control", body: "Monitor results, feed them back into the next round of decisions." },
    ],
    foot: "Objective throughout · maximise shareholder wealth",
  },
  sections: [
    {
      id: "sfm",
      folio: "¶ 1",
      title: "Strategic Financial Management",
      lede: "Financial management becomes <strong>strategic</strong> when financial decisions are taken to serve the firm's long-term goals, not just this year's profit. The lodestar is <strong>maximisation of shareholder wealth</strong>, not profit.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Investment",
              tagTone: "cap",
              title: "Where to commit capital",
              body: "Capital-budgeting and asset-allocation decisions — long-term (projects, expansion, M&A) and short-term (working capital). Accept only what earns above the cost of capital.",
            },
            {
              tag: "Financing",
              tagTone: "cap",
              title: "How to raise it",
              body: "The mix of debt and equity (capital structure) and the specific sources. Target the lowest weighted-average cost of capital for an acceptable level of financial risk.",
            },
            {
              tag: "Dividend",
              tagTone: "cap",
              title: "Distribute or retain",
              body: "How much profit to pay out versus plough back. The retention decision directly funds future growth — and ties straight into the sustainable growth rate.",
            },
          ],
        },
        {
          kind: "split",
          left: {
            tag: "Goal — weak",
            tagTone: "exp",
            title: "Profit maximisation",
            body: "Ignores <b>timing</b> of returns, ignores <b>risk</b>, and is vague (whose profit, short or long run?). Can be gamed by deferring maintenance or cutting R&D.",
          },
          right: {
            tag: "Goal — sound",
            tagTone: "cap",
            title: "Shareholder wealth maximisation",
            body: "Maximise the market value of equity = PV of expected future cash flows discounted at the risk-adjusted rate. Captures <b>cash flow, timing and risk</b> together.",
          },
        },
        {
          kind: "note",
          body: "<b>Strategy</b> is a course of action, including the specification of resources, required to achieve an objective. <b>Strategic financial management</b> is the application of financial techniques to those strategic decisions so the firm's objectives are met.",
        },
      ],
    },
    {
      id: "functions",
      folio: "¶ 2",
      title: "Functions of Strategic Financial Management",
      blocks: [
        {
          kind: "bullets",
          items: [
            "<b>Continual search for the best investment opportunities</b> — scanning the environment for projects that create value.",
            "<b>Selection of the best, most profitable opportunities</b> — appraising and ranking them under capital constraints.",
            "<b>Determination of the optimal mix of funds</b> — the capital structure that minimises the cost of capital for the chosen risk level.",
            "<b>Establishment of a system of internal controls</b> — to govern the deployment and use of funds.",
            "<b>Analysis of results</b> for feedback into future decision-making — closing the loop.",
          ],
        },
        {
          kind: "trap",
          body: "<b>Exam framing:</b> the three <i>decisions</i> (investment, financing, dividend) answer <i>what</i> to decide; the five <i>functions</i> answer <i>how</i> the finance team operates. Don't conflate the two lists.",
        },
      ],
    },
    {
      id: "planning",
      folio: "¶ 3",
      title: "Financial Planning",
      lede: "Financial planning is the process of framing objectives, policies, procedures, programmes and budgets for the firm's financial activities — so the right funds are available at the right time and used well.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Objective 1",
              tagTone: "ntr",
              title: "Determine capital requirements",
              body: "Both <b>fixed</b> and <b>working</b> capital; both <b>long-term</b> and <b>short-term</b> needs — sized to the strategy.",
            },
            {
              tag: "Objective 2",
              tagTone: "ntr",
              title: "Determine capital structure",
              body: "The proportion of debt to equity — set the gearing the firm can service at an acceptable financial risk.",
            },
            {
              tag: "Objective 3",
              tagTone: "ntr",
              title: "Frame financial policies",
              body: "Policies for cash control, lending, borrowing and investment of surplus — the rules of day-to-day money management.",
            },
          ],
        },
        {
          kind: "timeline",
          nodes: [
            { phase: "1", title: "Project the financials", body: "Prepare projected statements to see the financial impact of the plan." },
            { phase: "2", title: "Determine funds needed", body: "Estimate funds required for assets, growth and operations over the horizon." },
            { phase: "3", title: "Forecast availability", body: "Forecast funds generated internally and those to be raised externally." },
            { phase: "4", title: "Install controls", body: "Establish and maintain systems to control the allocation and use of funds." },
            { phase: "5", title: "Procedures & feedback", body: "Develop procedures and a performance-linked review so the plan adapts." },
          ],
        },
        {
          kind: "note",
          body: "<b>Why it matters:</b> adequate funds when needed, a balance between inflows and outflows, support for growth/expansion, reduced uncertainty about market swings, and a lower overall cost of finance.",
        },
      ],
    },
    {
      id: "interface",
      folio: "¶ 4",
      title: "Interface of Financial Policy & Strategic Management",
      lede: "Strategy needs funds; <strong>financial policy</strong> governs how those funds are procured, used and distributed. The two must move together — the way you finance a strategy shapes how much risk and flexibility you carry into it.",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Most important dimension",
              tagTone: "cap",
              title: "Sources of finance & capital structure",
              body: "The single biggest link. The debt–equity choice fixes financial risk, the cost of capital, and the firm's strategic flexibility. <b>Aggressive</b> (debt-heavy) financing magnifies returns and risk; <b>conservative</b> financing preserves flexibility at a higher cost.",
            },
            {
              tag: "Deployment",
              tagTone: "cap",
              title: "Investment & cash policy",
              body: "Long-term funds are committed only after capital-budgeting appraisal, with the financing mix in view. Cash-management policy trades off <b>liquidity vs profitability</b>; dividend policy balances signalling and reinvestment.",
            },
          ],
        },
        {
          kind: "split",
          left: {
            tag: "Strategy levels",
            tagTone: "ntr",
            title: "Where strategy is set",
            body: "<b>Corporate</b> — which businesses to be in. <b>Business / SBU</b> — how to compete within a business. <b>Functional / operational</b> — marketing, finance, production, HR plans that execute the above.",
          },
          right: {
            tag: "Finance's role",
            tagTone: "ntr",
            title: "At every level",
            body: "Corporate strategy needs capital allocation across businesses; business strategy needs project finance and pricing of risk; functional plans need budgets. Financial policy threads through all three.",
          },
        },
        {
          kind: "note",
          body: "Execution is often tracked with tools like the <b>balanced scorecard</b>, linking financial targets to customer, internal-process and learning measures — but in AFM the exam-weight sits on the <i>financing and capital-structure</i> interface above.",
        },
      ],
    },
    {
      id: "sgr",
      folio: "¶ 5",
      title: "Balancing Financial Goals vis-à-vis Sustainable Growth",
      lede: "The <strong>sustainable growth rate (SGR)</strong> is the maximum rate a firm can grow sales and assets <strong>without issuing new equity</strong> and <strong>without changing</strong> its operating efficiency, payout or leverage. Grow faster and you must raise external finance; grow slower and you build surplus cash.",
      blocks: [
        {
          kind: "formula",
          lines: [
            "<b>SGR = ROE × b</b>",
            "where b = retention ratio = 1 − dividend-payout ratio",
            "Expanded (PRAT model): <b>SGR = P × R × A × T</b>",
            "P = Net profit margin (PAT ÷ Sales) · R = Retention ratio · A = Asset turnover (Sales ÷ Assets) · T = Financial leverage (Assets ÷ Equity)",
            "P × A × T = ROE, so PRAT collapses back to ROE × b",
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "The four levers",
              tagTone: "cap",
              title: "What lifts sustainable growth",
              bullets: [
                "<b>Higher profit margin (P)</b> — more profit retained per rupee of sales",
                "<b>Higher retention (R)</b> — pay out less, plough back more",
                "<b>Higher asset turnover (A)</b> — sweat assets harder for sales",
                "<b>Higher leverage (T)</b> — more debt per rupee of equity (raises risk too)",
              ],
            },
            {
              tag: "Higgins' insight",
              tagTone: "gold",
              title: "Growth must be financed",
              body: "If actual growth &gt; SGR, the firm faces a <b>financing gap</b> — it must raise equity, take on more debt, lift margins or cut payout. If actual growth &lt; SGR, it accumulates cash and may return it or reinvest. SGR aligns the <b>growth goal</b> with the <b>financial policy</b> that can fund it.",
            },
          ],
        },
        {
          kind: "tyk",
          items: [
            {
              ref: "Worked sum",
              title: "Compute the sustainable growth rate",
              question:
                "A company earns a net profit margin of 8% on sales of ₹50 crore, holds total assets of ₹40 crore financed by ₹25 crore of equity, and pays out 30% of profits as dividend. Find its sustainable growth rate using the PRAT model.",
              solution:
                "<b>P</b> = 8% = 0.08.<br/><b>R</b> = retention = 1 − 0.30 = 0.70.<br/><b>A</b> = Sales ÷ Assets = 50 ÷ 40 = 1.25.<br/><b>T</b> = Assets ÷ Equity = 40 ÷ 25 = 1.60.<br/><br/>SGR = P × R × A × T = 0.08 × 0.70 × 1.25 × 1.60 = <b>0.112 = 11.2%</b>.<br/><br/>Cross-check: ROE = PAT ÷ Equity. PAT = 0.08 × 50 = ₹4 cr, so ROE = 4 ÷ 25 = 16%. SGR = ROE × b = 16% × 0.70 = <b>11.2%</b> ✓. The firm can grow ~11.2% a year on its current policy; faster growth needs external finance.",
            },
            {
              ref: "Concept",
              title: "Financial policy ↔ corporate strategy",
              question:
                "“Financial policy and corporate strategy are two sides of the same coin.” Explain the interface and the role of capital structure.",
              solution:
                "Corporate strategy sets the direction (which businesses, how to compete, how fast to grow); it cannot be executed without funds. <b>Financial policy</b> decides how funds are <b>procured</b> (sources, capital structure), <b>deployed</b> (capital budgeting, working-capital and cash policy) and <b>distributed</b> (dividend policy). The <b>most important dimension</b> of the interface is the <b>sources of finance and capital structure</b>: the debt–equity mix fixes financial risk, the cost of capital and strategic flexibility. A strategy of rapid growth, for instance, raises the sustainable-growth financing gap and must be matched by a financing policy (retain more, lever up, or issue equity). Hence the two must be formulated together, not in sequence.",
            },
          ],
        },
        {
          kind: "trap",
          body: "<b>Watch the leverage lever:</b> raising T lifts SGR on paper but adds financial risk and interest burden — the exam rewards noting that sustainable growth assumes <i>unchanged</i> policy, so funding growth purely by piling on debt is not 'sustainable'.",
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
              question: "The overriding objective of strategic financial management is:",
              options: ["Profit maximisation", "Sales maximisation", "Shareholder wealth maximisation", "Minimising the tax bill"],
              answer: 2,
              why: "Wealth maximisation captures cash flow, timing and risk together; profit maximisation ignores timing and risk.",
            },
            {
              question: "Which is NOT one of the three core financial decisions?",
              options: ["Investment decision", "Financing decision", "Dividend decision", "Recruitment decision"],
              answer: 3,
              why: "The three core decisions are investment, financing and dividend.",
            },
            {
              question: "In the PRAT model, ‘T’ stands for:",
              options: ["Tax rate", "Asset turnover", "Financial leverage (Assets ÷ Equity)", "Retention ratio"],
              answer: 2,
              why: "P = profit margin, R = retention, A = asset turnover, T = leverage = Assets ÷ Equity.",
            },
            {
              question: "Sustainable growth rate equals:",
              options: ["ROE × payout ratio", "ROE × retention ratio", "ROCE × retention ratio", "Net margin × payout ratio"],
              answer: 1,
              why: "SGR = ROE × b, where b is the retention ratio (1 − payout).",
            },
            {
              question: "If a firm's actual growth exceeds its sustainable growth rate, it will generally need to:",
              options: ["Return cash to shareholders", "Raise external finance or cut payout", "Reduce its asset turnover", "Do nothing — growth funds itself"],
              answer: 1,
              why: "Faster-than-sustainable growth opens a financing gap that must be closed with external funds, higher retention or better margins.",
            },
            {
              question: "The single most important dimension of the financial-policy / strategy interface is:",
              options: ["Dividend declaration dates", "Sources of finance and capital structure", "The audit timetable", "Petty-cash controls"],
              answer: 1,
              why: "The debt–equity mix drives financial risk, cost of capital and strategic flexibility.",
            },
            {
              question: "‘Determining the optimal mix of funds’ is best described as a:",
              options: ["Function of strategic financial management", "Step of the audit", "Type of dividend policy", "Working-capital ratio"],
              answer: 0,
              why: "It is one of the listed functions of strategic financial management.",
            },
            {
              question: "Deciding which businesses the company should operate in is a strategy set at the:",
              options: ["Functional level", "Business / SBU level", "Corporate level", "Operational level"],
              answer: 2,
              why: "Corporate-level strategy chooses the portfolio of businesses; SBU level decides how to compete within one.",
            },
          ],
        },
      ],
    },
  ],
  footer:
    "AFM Chapter 1 · Financial Policy and Corporate Strategy — authored from the ICAI CA Final AFM syllabus as a first-reading aid. Confirm definitions and figures against your ICAI study material.",
};
