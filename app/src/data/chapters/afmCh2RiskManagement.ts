// AFM Chapter 2 — Risk Management.
//
// NOTE: authored from the established ICAI CA Final AFM (Paper 2) syllabus for
// Chapter 2 as a first-reading study aid (no AFM source text exists in this repo).
// Verify definitions/figures against your ICAI study material.

import type { ChapterDoc } from "../chapterDoc";

export const afmCh2RiskManagementDoc: ChapterDoc = {
  id: "afm-ch2",
  storageKey: "afmch2done",
  kicker: "Advanced Financial Management · Chapter 2 · AFM Sprint Day 1",
  heroTitle: "Risk is what you can measure: <em>name it, size it, and decide whether to avoid, reduce, keep or transfer it.</em>",
  heroStrap:
    "A theory chapter with one quantitative star — Value at Risk. Learn the risk-vs-uncertainty distinction, the family tree of risk types, the five-step management process, the four response strategies, and how VaR puts a single rupee figure on downside. Definitions are examinable verbatim.",
  heroStats: [
    { value: "4", label: "Risk families" },
    { value: "5", label: "Process steps" },
    { value: "4", label: "Response strategies" },
    { value: "VaR", label: "Key tool" },
    { value: "8", label: "MCQs" },
  ],
  flow: {
    eyebrow: "The management loop",
    title: "From spotting a risk to keeping it in check",
    steps: [
      { title: "Identify", body: "List the risks the firm is exposed to, internal and external." },
      { title: "Assess", body: "Size each by likelihood × impact — quantitatively where possible." },
      { title: "Respond", body: "Avoid, reduce, retain or transfer each risk." },
      { title: "Monitor", body: "Track residual risk and review as conditions change." },
    ],
    foot: "Goal · not zero risk, but risk taken knowingly and priced",
  },
  sections: [
    {
      id: "intro",
      folio: "¶ 1",
      title: "Risk vs Uncertainty",
      lede: "Risk and uncertainty are not the same. The distinction decides whether you can model an exposure at all.",
      blocks: [
        {
          kind: "split",
          left: {
            tag: "Risk",
            tagTone: "cap",
            title: "Measurable",
            body: "Outcomes are unknown but their <b>probability distribution can be estimated</b> from data or experience. Because it can be quantified, it can be priced, hedged and managed (e.g. a portfolio's return volatility).",
          },
          right: {
            tag: "Uncertainty",
            tagTone: "exp",
            title: "Not measurable",
            body: "Outcomes — and their probabilities — are <b>unknown</b>; no reliable distribution can be assigned (e.g. a once-off geopolitical shock). It can only be judged, not computed.",
          },
        },
        {
          kind: "note",
          body: "Risk has both a <b>downside</b> (loss) and, for many financial exposures, an <b>upside</b> — variability in either direction. Risk management is about taking risk <i>deliberately and in proportion</i>, not eliminating it.",
        },
      ],
    },
    {
      id: "sources",
      folio: "¶ 2",
      title: "Sources / Causes of Risk",
      blocks: [
        {
          kind: "bullets",
          items: [
            "<b>Decision / indecision</b> — wrong choices, or failure to act in time.",
            "<b>Business cycles & seasonality</b> — demand and prices swing with the economy.",
            "<b>Economic & fiscal changes</b> — inflation, interest-rate and tax-policy shifts.",
            "<b>Market preferences</b> — changing customer tastes erode demand.",
            "<b>Political & regulatory change</b> — regulation, deregulation, policy reversals.",
            "<b>Technology</b> — disruption makes products or processes obsolete.",
            "<b>Competition</b> — new entrants and price wars compress margins.",
            "<b>Natural calamities / disasters</b> — external shocks to operations and assets.",
          ],
        },
      ],
    },
    {
      id: "types",
      folio: "¶ 3",
      title: "Types of Risk",
      lede: "Group risks into four families. Financial risk is the one AFM drills hardest, so it gets its own breakdown.",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Strategic",
              tagTone: "ntr",
              title: "Strategic risk",
              body: "Loss from wrong business decisions, poor implementation, or adverse industry/competitive shifts — e.g. entering the wrong market or missing a technology change.",
            },
            {
              tag: "Compliance",
              tagTone: "ntr",
              title: "Compliance / regulatory risk",
              body: "Loss from breaching laws, regulations or prescribed codes — penalties, licence loss, reputational damage.",
            },
            {
              tag: "Operational",
              tagTone: "ntr",
              title: "Operational risk",
              body: "Loss from failed <b>internal processes, people and systems</b>, or from <b>external events</b> — fraud, system failure, human error, supply disruption.",
            },
            {
              tag: "Financial",
              tagTone: "cap",
              title: "Financial risk",
              body: "Loss arising from the firm's <b>financing and market exposures</b> — driven by capital structure (gearing) and by movements in markets, credit and liquidity. Broken down below.",
            },
          ],
        },
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Financial · 1",
              tagTone: "exp",
              title: "Market risk",
              body: "Loss from market-price movements: <b>interest-rate risk</b>, <b>currency / forex risk</b>, and <b>equity & commodity price risk</b>. The systematic exposures hedged with derivatives.",
            },
            {
              tag: "Financial · 2",
              tagTone: "exp",
              title: "Credit / default risk",
              body: "Loss if a borrower or <b>counterparty</b> fails to meet its obligations. Counterparty risk is the failure of the other side of a contract to perform.",
            },
            {
              tag: "Financial · 3",
              tagTone: "exp",
              title: "Liquidity risk",
              body: "<b>Funding</b> liquidity — inability to meet obligations as they fall due; <b>market</b> liquidity — inability to sell an asset quickly without a big price concession.",
            },
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Other · counterparty",
              tagTone: "ntr",
              title: "Counterparty risk",
              body: "The risk that the other party to a transaction does not honour its terms. Causes include wrong credit assessment, deteriorating macro conditions, or an unexpected adverse event affecting the counterparty.",
            },
            {
              tag: "Other · country",
              tagTone: "ntr",
              title: "Country / political risk",
              body: "Loss from operating across borders — expropriation, capital controls, currency inconvertibility, political instability or sovereign default.",
            },
          ],
        },
      ],
    },
    {
      id: "process",
      folio: "¶ 4",
      title: "The Risk-Management Process & Strategies",
      lede: "A repeatable loop, then four ways to respond. Most exam answers hang on naming the steps and matching a response to a scenario.",
      blocks: [
        {
          kind: "timeline",
          nodes: [
            { phase: "1", title: "Identification", body: "Spot and list every material risk — internal and external." },
            { phase: "2", title: "Assessment / quantification", body: "Size each by likelihood and impact; quantify where data allows (e.g. VaR)." },
            { phase: "3", title: "Evaluation / prioritisation", body: "Rank risks against the firm's appetite to decide what needs action." },
            { phase: "4", title: "Response / treatment", body: "Apply the chosen strategy — avoid, reduce, retain or transfer." },
            { phase: "5", title: "Monitoring & review", body: "Track residual risk and revisit as conditions change." },
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Strategy 1",
              tagTone: "exp",
              title: "Avoidance",
              body: "Eliminate the exposure entirely — don't enter the market, don't take the position. Zero risk, but also zero return from that activity.",
            },
            {
              tag: "Strategy 2",
              tagTone: "cap",
              title: "Reduction / mitigation",
              body: "Lower the likelihood or impact — internal controls, process redesign, and <b>diversification</b> to cut unsystematic risk.",
            },
            {
              tag: "Strategy 3",
              tagTone: "gold",
              title: "Retention / absorption",
              body: "Knowingly accept and bear the risk (self-insurance) — sensible when the cost of transfer exceeds the expected loss, or the risk is small.",
            },
            {
              tag: "Strategy 4",
              tagTone: "cap",
              title: "Transfer / sharing",
              body: "Shift the risk to a third party — <b>insurance</b>, <b>hedging</b> with derivatives (forwards, futures, options, swaps), or outsourcing the risky activity.",
            },
          ],
        },
        {
          kind: "trap",
          body: "<b>Diversification ≠ hedging.</b> Diversification (reduction) spreads exposure to cut <i>unsystematic</i> risk but cannot remove <i>systematic</i> (market) risk; hedging (transfer) uses an offsetting position to neutralise a specific exposure. Don't swap the terms.",
        },
      ],
    },
    {
      id: "var",
      folio: "¶ 5",
      title: "Value at Risk (VaR)",
      lede: "VaR puts a single money figure on downside: the <strong>maximum loss</strong> expected over a set <strong>horizon</strong> at a given <strong>confidence level</strong>, under normal market conditions.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Parameter 1",
              tagTone: "cap",
              title: "Time horizon",
              body: "The period over which loss is measured — e.g. 1 day, 10 days. Longer horizons give larger VaR.",
            },
            {
              tag: "Parameter 2",
              tagTone: "cap",
              title: "Confidence level",
              body: "The probability the loss will NOT be exceeded — commonly <b>95%</b> or <b>99%</b>. Higher confidence ⇒ larger VaR.",
            },
            {
              tag: "Parameter 3",
              tagTone: "cap",
              title: "Loss amount",
              body: "The estimated worst loss, stated in <b>money</b> or as a <b>% of value</b>.",
            },
          ],
        },
        {
          kind: "split",
          left: {
            tag: "Features",
            tagTone: "ntr",
            title: "What VaR is",
            body: "A single, comparable risk number across assets and portfolios; built on three common parameters; gives a probabilistic loss estimate; expressed in money or percentage; usable for any portfolio of market-traded instruments.",
          },
          right: {
            tag: "Applications",
            tagTone: "ntr",
            title: "What it is used for",
            body: "Risk management, <b>setting risk limits</b> for desks/traders, financial control and reporting, and computing <b>regulatory capital</b> for banks. Lets management compare unlike exposures on one scale.",
          },
        },
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Method 1",
              tagTone: "ntr",
              title: "Historical simulation",
              body: "Re-price the portfolio over a window of actual past returns and read the loss at the chosen percentile. Simple, assumption-light, but assumes the past repeats.",
            },
            {
              tag: "Method 2",
              tagTone: "ntr",
              title: "Variance–covariance (parametric)",
              body: "Assume returns are <b>normally distributed</b>; VaR = portfolio value × z-score × σ. Fast, but poor for non-linear payoffs (options) and fat tails.",
            },
            {
              tag: "Method 3",
              tagTone: "ntr",
              title: "Monte Carlo simulation",
              body: "Generate thousands of random scenarios from assumed distributions, re-price, and read the percentile loss. Flexible and handles non-linearity — but computationally heavy.",
            },
          ],
        },
        {
          kind: "flips",
          title: "Read a VaR statement",
          items: [
            { label: "Q1", question: "What does “1-day 99% VaR of ₹10 lakh” mean?", answer: "Under normal conditions there is a <b>99% chance</b> the portfolio will <b>not lose more than ₹10 lakh</b> in one day — equivalently, a <b>1% chance</b> the one-day loss exceeds ₹10 lakh. It does <i>not</i> say how bad that 1% tail can get." },
            { label: "Q2", question: "Does VaR tell you the worst possible loss?", answer: "No. VaR is the threshold at the confidence level, not the maximum. Beyond it, losses can be far larger — a key limitation; that tail is what <b>Expected Shortfall (CVaR)</b> addresses." },
            { label: "Q3", question: "Raise confidence from 95% to 99% — what happens to VaR?", answer: "VaR <b>increases</b>. You are demanding a higher assurance of not being exceeded, so the loss threshold moves further into the tail." },
          ],
        },
        {
          kind: "tyk",
          items: [
            {
              ref: "Scenario",
              title: "Classify the risks in a treasury desk",
              question:
                "A treasury desk (i) holds foreign-currency receivables, (ii) lends surplus cash to a corporate, (iii) runs trading systems prone to outages, and (iv) must comply with RBI exposure norms. Classify each exposure and suggest one response strategy.",
              solution:
                "(i) FC receivables → <b>market risk (currency)</b>; respond by <b>transfer</b> — hedge with a forward/option. (ii) Lending → <b>credit / counterparty risk</b>; <b>reduce</b> via limits and collateral, or <b>transfer</b> via guarantee/credit insurance. (iii) System outages → <b>operational risk</b>; <b>reduce</b> with controls, redundancy and a DR plan. (iv) RBI norms → <b>compliance / regulatory risk</b>; <b>avoid/reduce</b> by staying within limits and monitoring. Aggregate market exposure can be sized with <b>VaR</b> to set desk limits.",
            },
            {
              ref: "Concept",
              title: "Strengths and limitations of VaR",
              question: "Explain Value at Risk and critically evaluate its usefulness as a risk measure.",
              solution:
                "VaR estimates the maximum loss over a horizon at a confidence level under normal conditions, defined by horizon, confidence and loss amount, and computed via historical, variance–covariance or Monte Carlo methods. <b>Strengths:</b> one comparable figure across diverse exposures; intuitive; supports limits, capital and reporting. <b>Limitations:</b> it is silent on the size of losses <i>beyond</i> the threshold (tail risk); the parametric form assumes normality and understates fat tails; it can be unstable with the chosen window; and it captures only <i>normal</i> conditions, not crises. Hence VaR is paired with <b>stress testing</b> and <b>Expected Shortfall</b>.",
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
              question: "The key distinction between risk and uncertainty is that risk:",
              options: ["Always means a loss", "Can be measured / assigned probabilities", "Only affects financial assets", "Cannot be managed"],
              answer: 1,
              why: "Risk has an estimable probability distribution; uncertainty does not.",
            },
            {
              question: "Loss from failed internal processes, people and systems is classified as:",
              options: ["Strategic risk", "Operational risk", "Compliance risk", "Liquidity risk"],
              answer: 1,
              why: "That is the textbook definition of operational risk (plus external events).",
            },
            {
              question: "Currency risk and interest-rate risk are sub-types of:",
              options: ["Operational risk", "Market risk", "Compliance risk", "Strategic risk"],
              answer: 1,
              why: "Both arise from movements in market prices — they sit under market risk.",
            },
            {
              question: "Buying insurance against a risk is an example of risk:",
              options: ["Avoidance", "Reduction", "Retention", "Transfer"],
              answer: 3,
              why: "Insurance shifts the financial consequence to a third party — transfer.",
            },
            {
              question: "Self-insuring a small, frequent risk is best described as:",
              options: ["Avoidance", "Retention / absorption", "Transfer", "Hedging"],
              answer: 1,
              why: "Knowingly bearing the risk yourself is retention/absorption.",
            },
            {
              question: "“1-day 95% VaR of ₹2 crore” means there is a:",
              options: ["95% chance of losing ₹2 crore", "5% chance the daily loss exceeds ₹2 crore", "Guaranteed loss of ₹2 crore", "5% chance of a ₹2 crore gain"],
              answer: 1,
              why: "VaR is the loss not exceeded at the confidence level; the complement (5%) is the chance of exceeding it.",
            },
            {
              question: "Which VaR method assumes returns are normally distributed?",
              options: ["Historical simulation", "Variance–covariance (parametric)", "Monte Carlo simulation", "Stress testing"],
              answer: 1,
              why: "The parametric/variance–covariance method relies on the normality assumption.",
            },
            {
              question: "A key limitation of VaR is that it:",
              options: [
                "Cannot be expressed in money terms",
                "Says nothing about the size of losses beyond the threshold",
                "Only works for a single asset",
                "Requires no assumptions",
              ],
              answer: 1,
              why: "VaR ignores the magnitude of tail losses beyond the cut-off — addressed by Expected Shortfall.",
            },
          ],
        },
      ],
    },
  ],
  footer:
    "AFM Chapter 2 · Risk Management — authored from the ICAI CA Final AFM syllabus as a first-reading aid. Confirm definitions and figures against your ICAI study material.",
};
