// AFM Chapter 2 — Risk Management.
//
// Authored from the ICAI CA Final AFM (Paper 2) Study Material, Chapter 2
// (ICAI_Materials_Text/02_AFM_Advanced_Financial_Management/002 - Chapter 2 ...).
// Section numbering (¶1–¶4) follows the ICAI chapter; VaR worked sums are the
// ICAI example and the chapter's practical question.

import type { ChapterDoc } from "../chapterDoc";

export const afmCh2RiskManagementDoc: ChapterDoc = {
  id: "afm-ch2",
  storageKey: "afmch2done",
  kicker: "Advanced Financial Management · Chapter 2 · ICAI Study Material",
  heroTitle: "Risk management: <em>name the risks, evaluate the financial ones, and put a rupee figure on the downside with VaR.</em>",
  heroStrap:
    "Four ICAI blocks: the types of risk an organisation faces, the evaluation of financial risk from three viewpoints, Value at Risk (the only computational piece — Z-score × standard deviation), and the appropriate methods to identify and manage each financial risk. Definitions and lists are examinable verbatim.",
  heroStats: [
    { value: "4", label: "Risk types" },
    { value: "5", label: "Financial sub-risks" },
    { value: "VaR", label: "Key tool" },
    { value: "2.33", label: "Z at 99%" },
    { value: "8", label: "MCQs" },
  ],
  flow: {
    eyebrow: "Chapter spine",
    title: "From naming a risk to putting a number on it",
    steps: [
      { title: "Identify types", body: "Strategic, compliance, operational and financial risk." },
      { title: "Split financial risk", body: "Counter-party, political, interest-rate, currency, liquidity." },
      { title: "Evaluate & measure", body: "Three viewpoints on financial risk; Value at Risk for the downside." },
      { title: "Manage", body: "Category-specific identification and management techniques." },
    ],
    foot: "VaR = Standard Deviation (₹) × Z-score · t-day = × √t",
  },
  sections: [
    {
      id: "types",
      folio: "¶ 1",
      title: "Types of Risk Faced by an Organisation",
      lede: "ICAI groups the important risks into four. Learn each with its example — the exam often asks you to <strong>name and illustrate</strong> a risk type.",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "1.1 Strategic",
              tagTone: "ntr",
              title: "Strategic risk",
              body: "The risk that a company's <b>strategy becomes less effective</b> and it struggles to meet its goals — from technology change, a new competitor, shifting demand or rising input costs.",
              note: "Examples: <b>Kodak</b> (built a digital camera in 1975 but treated it as a threat and failed to develop it) and <b>Nokia</b> (missed touch-screens, letting Samsung lead). Counter-example: <b>Xerox</b> embraced laser printing and survived.",
            },
            {
              tag: "1.2 Compliance",
              tagTone: "ntr",
              title: "Compliance risk",
              body: "The risk from failing to comply with the rules — Companies Act 2013, SEBI guidelines, etc. Non-compliance brings <b>fines and imprisonment</b>. It bites hardest when entering a <b>new business line or geography</b> with different laws (e.g. a cement firm moving into sugar in another state).",
            },
            {
              tag: "1.3 Operational",
              tagTone: "ntr",
              title: "Operational risk",
              body: "An <b>internal</b> risk — failure to cope with day-to-day operations. It relates to both <b>people</b> and <b>process</b>: e.g. a clerk paying ₹1,00,000 instead of ₹10,000. Managed by a checker, or an electronic system that flags unusual amounts.",
            },
            {
              tag: "1.4 Financial",
              tagTone: "cap",
              title: "Financial risk",
              body: "Loss from <b>unexpected changes in financial conditions</b> — prices, exchange rate, credit rating and interest rate. Political risk, though not financial in the direct sense, is included because it can cause country risk and ultimately financial loss. Broken into five categories below.",
            },
          ],
        },
      ],
    },
    {
      id: "financial-sub",
      folio: "¶ 1.4",
      title: "The Five Categories of Financial Risk",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "1.4.1",
              tagTone: "exp",
              title: "Counter-party risk",
              body: "Non-honouring of obligations by the counter-party — failure to deliver goods for payment already made (or vice-versa), or to repay borrowings and interest. <b>Covers credit risk</b> (default by the counter-party).",
            },
            {
              tag: "1.4.2",
              tagTone: "exp",
              title: "Political risk",
              body: "Faced mainly by overseas investors when the host government acts adversely:",
              bullets: [
                "Confiscation / destruction of overseas property",
                "Rationing of remittance to the home country",
                "Restriction on converting local into foreign currency",
                "Restriction on borrowings; invalidation of patents; price control of products",
              ],
            },
            {
              tag: "1.4.3",
              tagTone: "exp",
              title: "Interest-rate risk",
              body: "Loss from changing interest rates altering assets and liabilities. Most important for <b>banks</b> (interest-sensitive balance sheets; earnings = spread between borrowing and lending rates). Both <b>fixed</b> and <b>floating</b> rates carry inherent risk.",
            },
            {
              tag: "1.4.4",
              tagTone: "exp",
              title: "Currency risk",
              body: "Affects firms dealing in foreign exchange; cash flows move with exchange rates — adversely or favourably. If the rupee depreciates vs US$, an <b>exporter (Infosys)</b> gains while an <b>importer (IOC)</b> with US$ payables loses.",
            },
            {
              tag: "1.4.5",
              tagTone: "exp",
              title: "Liquidity risk",
              body: "Inability of the organisation to <b>meet its liabilities when due</b> — from inadequate cash generation or a mismatch in cash-flow timing. Prevalent in banking (maturity mismatch and fresh-deposit patterns).",
            },
          ],
        },
      ],
    },
    {
      id: "evaluation",
      folio: "¶ 2",
      title: "Evaluation of Financial Risk",
      lede: "Financial risk looks different depending on who is looking. ICAI gives <strong>three viewpoints</strong>.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "(a) Stakeholder",
              tagTone: "ntr",
              title: "Gearing is the risk",
              body: "Equity shareholders see <b>financial gearing</b> (the proportion of debt in the capital structure) as risk — on winding-up they are paid last. For a <b>lender</b> too, high gearing raises the chance of default on interest and principal.",
            },
            {
              tag: "(b) Company",
              tagTone: "ntr",
              title: "Over-borrow or over-lend",
              body: "If the company <b>borrows excessively</b> or <b>lends to someone who defaults</b>, it can be forced into <b>liquidation</b>.",
            },
            {
              tag: "(c) Government",
              tagTone: "ntr",
              title: "Systemic distrust",
              body: "Failure or downgrading of a bank/financial institution (e.g. <b>Lehman Brothers</b>) spreads distrust through society; includes <b>wilful defaulters</b> and can extend to a <b>sovereign debt crisis</b>.",
            },
          ],
        },
      ],
    },
    {
      id: "var",
      folio: "¶ 3",
      title: "Value at Risk (VaR)",
      lede: "VaR is a measure of the risk of an investment: given normal market conditions over a set period, <strong>how much might it lose?</strong> It answers two questions — <strong>what is the worst-case scenario, and what will the loss be?</strong> First applied at the NYSE in 1922; the world's most widely used measure of financial risk since the 1990s.",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "3.1 Features",
              tagTone: "cap",
              title: "Six features of VaR",
              bullets: [
                "<b>Components</b> — time period, confidence level (generally 95% / 99%), and loss in % or amount",
                "<b>Statistical method</b> — a tool based on <b>standard deviation</b>",
                "<b>Time horizon</b> — applied over a day, week, month, etc.",
                "<b>Probability</b> — assuming normal distribution, the maximum loss can be predicted",
                "<b>Risk control</b> — risk is controlled by setting limits for maximum loss",
                "<b>Z-score</b> — standard deviations away from the mean; <b>Z × SD = VaR</b>",
              ],
            },
            {
              tag: "3.2 Application",
              tagTone: "cap",
              title: "Where VaR is used",
              bullets: [
                "Measure the maximum possible loss on a portfolio / trading position",
                "Benchmark for performance measurement of an operation or trade",
                "Fix limits for individuals in the <b>front office</b> of a treasury",
                "Help management decide trading strategies",
                "A tool for <b>Asset-Liability Management</b>, especially in banks",
              ],
            },
          ],
        },
        {
          kind: "formula",
          lines: [
            "Volatility in ₹ = Standard deviation (%) × Position value",
            "<b>1-period VaR = Volatility (₹) × Z-score</b>   (Z = 2.33 at 99%, 1.65 at 95%)",
            "<b>t-period VaR = 1-period VaR × √t</b>   (time scaling)",
          ],
        },
        {
          kind: "tyk",
          items: [
            {
              ref: "ICAI example",
              title: "Single-stock VaR — 1 day and 10 days at 99%",
              question:
                "You hold ₹2 crore of shares of X Ltd. whose daily price standard deviation is 2%. Assuming 252 trading days and normally-distributed prices, find the maximum loss over 1 trading day and over 10 trading days at a 99% confidence level.",
              solution:
                "At 99% confidence the Z-score (from the cumulative normal table) = <b>2.33</b>.<br/>Volatility in rupees = 2% × ₹2 crore = <b>₹4 lakh</b>.<br/><br/><b>1-day VaR</b> = ₹4 lakh × 2.33 = <b>₹9.32 lakh</b>.<br/><b>10-day VaR</b> = √10 × ₹9.32 lakh = <b>₹29.47 lakh</b>.",
            },
            {
              ref: "ICAI practical",
              title: "Two-asset portfolio VaR with correlation",
              question:
                "A portfolio holds ₹2,00,00,000 in share XYZ and ₹2,00,00,000 in share ABC. The daily standard deviation of each is 1% and their correlation is 0.3. Find the 10-day 99% VaR for the portfolio.",
              solution:
                "Daily SD of each holding = 1% × ₹200 lakh = <b>₹2 lakh</b>.<br/>Portfolio daily variance V = 2² + 2² + 2 × 0.3 × 2 × 2 = <b>10.4</b>, so daily SD = √10.4 = <b>₹3.22 lakh</b>.<br/>10-day SD = ₹3.22 lakh × √10 = <b>₹10.18 lakh</b>.<br/>At 99%, Z = 2.33, so <b>10-day 99% VaR = 2.33 × ₹10.18 lakh = ₹23.72 lakh</b>.<br/><br/>Note how correlation of 0.3 (not 1.0) makes the portfolio SD (₹3.22 lakh) less than the simple sum of the two ₹2 lakh SDs — diversification at work.",
            },
          ],
        },
      ],
    },
    {
      id: "manage",
      folio: "¶ 4",
      title: "Identifying & Managing Each Financial Risk",
      lede: "ICAI treats management <strong>by category</strong>. Counter-party and political risk are managed here; interest-rate and currency risk are identified here but <strong>managed in later chapters</strong>.",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "4.1 Counter-party",
              tagTone: "cap",
              title: "Manage counter-party risk",
              bullets: [
                "Carry out <b>due diligence</b> before dealing with any third party",
                "Do <b>not over-commit</b> to a single entity / connected group",
                "Know your <b>exposure limits</b>; review credit-approval limits and procedures regularly",
                "Take <b>rapid action</b> on any likelihood of default",
                "Use <b>performance guarantees, insurance</b> or other instruments",
              ],
              note: "Hints of counter-party risk: failure to obtain resources to complete a transaction, regulatory restrictions, hostile foreign-government action, being let down by a third party, or insolvency.",
            },
            {
              tag: "4.2 Political",
              tagTone: "cap",
              title: "Manage political (country) risk",
              body: "<b>Assess country risk</b> via political rankings in business magazines, macro-economic conditions, the popularity/stability of the government, and advice from home-country embassies.",
              bullets: [
                "<b>Local sourcing</b> of raw materials and labour",
                "Entering into <b>joint ventures</b>",
                "<b>Local financing</b>",
                "<b>Prior negotiations</b> with the host government",
              ],
            },
          ],
        },
        {
          kind: "note",
          body: "<b>Interest-rate risk</b> is identified from monetary policy, government action (e.g. demonetisation), economic growth, industrial data, foreign investment and stock-market changes. <b>Currency risk</b> is identified from government action (e.g. Brexit), nominal interest rates (IRP), inflation (PPP), natural calamities, war/coup, and a change of government. <b>The management of both is covered in detail in later chapters</b> (Interest-Rate Risk Management; Foreign-Exchange Exposure & Risk Management).",
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
              question: "Kodak failing to commercialise the digital camera it invented is an example of:",
              options: ["Operational risk", "Strategic risk", "Compliance risk", "Liquidity risk"],
              answer: 1,
              why: "A strategy becoming ineffective against technological change is strategic risk.",
            },
            {
              question: "A clerk paying ₹1,00,000 instead of ₹10,000 illustrates:",
              options: ["Strategic risk", "Operational (people & process) risk", "Political risk", "Currency risk"],
              answer: 1,
              why: "ICAI's own example of operational risk — both a people and a process risk.",
            },
            {
              question: "Per ICAI, the five categories of FINANCIAL risk are counter-party, political, interest-rate, currency and:",
              options: ["Market risk", "Liquidity risk", "Operational risk", "Strategic risk"],
              answer: 1,
              why: "ICAI's five sub-categories of financial risk end with liquidity risk (not a separate ‘market risk’ umbrella).",
            },
            {
              question: "If the rupee depreciates against the US$, who gains?",
              options: ["An importer with US$ payables", "An exporter with US$ receivables", "Both equally", "Neither"],
              answer: 1,
              why: "ICAI's example: the exporter (Infosys) gains; the importer (IOC) with US$ payables loses.",
            },
            {
              question: "From the GOVERNMENT's viewpoint, financial risk is evaluated as:",
              options: [
                "The firm's gearing ratio",
                "Bank/FI failure or downgrade spreading distrust (e.g. Lehman), wilful defaulters, sovereign crises",
                "Excessive lending by one company",
                "Currency volatility only",
              ],
              answer: 1,
              why: "ICAI's government viewpoint centres on systemic distrust from failing institutions and sovereign risk.",
            },
            {
              question: "The Z-score used for a 99% confidence level (per the ICAI VaR example) is:",
              options: ["1.65", "1.96", "2.33", "3.00"],
              answer: 2,
              why: "ICAI uses Z = 2.33 at 99%; multiplying it by the rupee standard deviation gives VaR.",
            },
            {
              question: "To convert a 1-day VaR into a 10-day VaR you multiply by:",
              options: ["10", "√10", "10²", "1/10"],
              answer: 1,
              why: "VaR scales with the square root of time: 10-day VaR = 1-day VaR × √10.",
            },
            {
              question: "Which is NOT a listed application of VaR?",
              options: [
                "Fixing limits for front-office treasury dealers",
                "Asset-Liability Management in banks",
                "Performance benchmarking of a trade",
                "Computing a company's income-tax liability",
              ],
              answer: 3,
              why: "ICAI's applications cover max-loss measurement, performance benchmarking, dealer limits, trading strategy and ALM — not tax computation.",
            },
          ],
        },
      ],
    },
  ],
  footer:
    "AFM Chapter 2 · Risk Management — built from the ICAI Study Material (Chapter 2). The VaR worked sums are the ICAI example and the chapter's practical question; verify any figure against your book.",
};
