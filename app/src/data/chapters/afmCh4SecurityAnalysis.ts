// AFM Chapter 4 - Security Analysis.
//
// Simplified, exam-testable rebuild from the ICAI AFM Chapter 4 syllabus —
// concept-first, not a verbatim reproduction. Clean inline HTML / Unicode maths.

import type { ChapterDoc } from "../chapterDoc";

export const afmCh4SecurityAnalysisDoc: ChapterDoc = {
  id: "afm-ch4",
  storageKey: "afmch4done",
  kicker: "Advanced Financial Management · Chapter 4 · Exam-focused",
  heroTitle: "Security analysis: <em>is the price right?</em> Fundamental value, technical signals, and whether markets can be beaten.",
  heroStrap:
    "Mostly theory with one valuation formula. Three blocks: fundamental analysis top-down (Economy → Industry → Company), technical analysis (the charts and theories), and the Efficient Market Hypothesis (the three forms and what they imply). Learn the definitions, lists and the fundamental-vs-technical contrast verbatim.",
  heroStats: [
    { value: "EIC", label: "Fundamental" },
    { value: "3", label: "Tech theories" },
    { value: "3", label: "EMH forms" },
    { value: "DGM", label: "Valuation" },
    { value: "10", label: "MCQs" },
  ],
  flow: {
    eyebrow: "Two schools, one question",
    title: "Find mispricing — or accept you can't",
    steps: [
      { title: "Fundamental", body: "Estimate intrinsic value top-down (Economy → Industry → Company); buy if price < value." },
      { title: "Technical", body: "Ignore value; read price and volume patterns to time entries and exits." },
      { title: "EMH", body: "If markets are efficient, prices already reflect information — neither approach earns abnormal returns." },
    ],
    foot: "Intrinsic value vs market price · the analyst's whole job",
  },
  sections: [
    {
      id: "fundamental",
      folio: "¶ 1",
      title: "Fundamental Analysis & the E-I-C Framework",
      lede: "Fundamental analysis estimates a security's <strong>intrinsic value</strong> from underlying factors and compares it to the market price. The classic approach is <strong>top-down: Economy → Industry → Company</strong>.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            { tag: "E", tagTone: "cap", title: "Economy analysis", body: "The macro backdrop sets the ceiling — GDP growth, inflation, interest rates, fiscal & monetary policy, the business cycle, exchange rates and infrastructure." },
            { tag: "I", tagTone: "cap", title: "Industry analysis", body: "Where the industry sits in its <b>life cycle</b> (pioneering → expansion → stagnation → decay), demand, competition, regulation and cost structure." },
            { tag: "C", tagTone: "cap", title: "Company analysis", body: "The firm itself — management, products, and the <b>financial statements / ratios</b> (profitability, leverage, liquidity, efficiency) — to estimate earnings and value." },
          ],
        },
        {
          kind: "formula",
          lines: [
            "Constant-growth Dividend Growth Model (Gordon):  P₀ = D₁ ÷ (kₑ − g)",
            "D₁ = D₀ (1 + g)  ·  kₑ = required return  ·  g = constant growth rate",
            "Justified P/E multiple = Payout ratio ÷ (kₑ − g)   →   Value = Justified P/E × EPS",
          ],
        },
        {
          kind: "tyk",
          items: [
            {
              ref: "Worked sum",
              title: "Value a share with the dividend growth model",
              question:
                "A company just paid a dividend of ₹4 (D₀). Dividends are expected to grow at 8% forever. The required return is 14%. What is the share worth, and what does it imply if the market price is ₹60?",
              solution:
                "D₁ = 4 × 1.08 = ₹4.32.<br>P₀ = D₁ ÷ (kₑ − g) = 4.32 ÷ (0.14 − 0.08) = 4.32 ÷ 0.06 = <b>₹72</b>.<br><br>Intrinsic value (₹72) &gt; market price (₹60), so the share is <b>under-valued</b> — a fundamental analyst would buy.",
            },
          ],
        },
      ],
    },
    {
      id: "industry-company",
      folio: "¶ 1.2–1.4",
      title: "Economic, Industry & Company Detail",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Industry life cycle",
              tagTone: "gold",
              title: "Four stages",
              bullets: [
                "<b>Pioneering</b> — rapid growth, high risk, many entrants.",
                "<b>Expansion / growth</b> — survivors consolidate, margins and stability improve — often the best risk-adjusted entry.",
                "<b>Stagnation / maturity</b> — growth slows to the economy's pace.",
                "<b>Decay / decline</b> — demand falls; exit.",
              ],
            },
            {
              tag: "Company tools",
              tagTone: "ntr",
              title: "How the company is judged",
              body: "Qualitative factors (management quality, business model, competitive moat) plus a <b>ratio analysis</b> of the financial statements — profitability, leverage/solvency, liquidity and activity ratios — feeding an earnings and value estimate.",
            },
          ],
        },
        {
          kind: "note",
          body: "<b>Economic-analysis techniques</b> include anticipatory surveys, the barometer/indicator approach (leading, coincident, lagging indicators), and econometric model building. <b>Industry-analysis techniques</b> read the life-cycle stage and structural factors. The exam usually wants the <i>lists</i>, not a model.",
        },
      ],
    },
    {
      id: "technical",
      folio: "¶ 2",
      title: "Technical Analysis",
      lede: "Technical analysis ignores intrinsic value and studies <strong>past price and volume</strong> to predict future prices, on the belief that history and crowd psychology repeat.",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Assumptions",
              tagTone: "ntr",
              title: "What technicals believe",
              bullets: [
                "Market price is set by demand and supply.",
                "Prices move in <b>trends</b> that persist for a while.",
                "Trends change when demand/supply shifts.",
                "Shifts are <b>detectable in charts</b> — and patterns repeat.",
              ],
            },
            {
              tag: "Tools",
              tagTone: "ntr",
              title: "What technicals use",
              bullets: [
                "<b>Charts</b> — line, bar, candlestick, point-and-figure.",
                "<b>Support & resistance</b> levels.",
                "<b>Price patterns</b> — head-and-shoulders, double top/bottom, triangles, flags.",
                "<b>Indicators</b> — moving averages, breadth, momentum/oscillators.",
              ],
            },
          ],
        },
        {
          kind: "cards",
          columns: 3,
          items: [
            { tag: "Theory 1", tagTone: "cap", title: "Dow Theory", body: "Prices move in three trends — <b>primary</b> (long), <b>secondary</b> (intermediate corrections) and <b>minor</b> (daily). A primary trend is confirmed when industrial and transport averages move together." },
            { tag: "Theory 2", tagTone: "cap", title: "Elliott Wave", body: "Markets move in repetitive <b>wave</b> cycles — a 5-wave move in the direction of the trend, then a 3-wave correction — driven by investor psychology." },
            { tag: "Theory 3", tagTone: "exp", title: "Random Walk", body: "Price changes are <b>independent and random</b>; past prices can't predict future prices. This directly <b>contradicts</b> technical analysis and underpins the EMH." },
          ],
        },
        {
          kind: "trap",
          body: "<b>Support and resistance:</b> a <i>support</i> level is a price floor where buying tends to emerge; a <i>resistance</i> level is a ceiling where selling emerges. A decisive break <b>above resistance</b> is bullish; a break <b>below support</b> is bearish — and old resistance often becomes new support.",
        },
      ],
    },
    {
      id: "fa-vs-ta",
      folio: "¶ 3",
      title: "Fundamental vs Technical Analysis",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Contrast",
              tagTone: "gold",
              title: "Two ways to pick securities",
              table: {
                columns: ["", "Fundamental", "Technical"],
                rows: [
                  { label: "Studies", values: ["Intrinsic value from fundamentals", "Past price & volume"] },
                  { label: "Question", values: ["What is it worth?", "Where is the price going?"] },
                  { label: "Horizon", values: ["Long-term", "Short-term / timing"] },
                  { label: "Tools", values: ["E-I-C, ratios, valuation models", "Charts, patterns, indicators"], strong: true },
                  { label: "Assumes", values: ["Price reverts to value", "Trends and patterns repeat"] },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      id: "emh",
      folio: "¶ 4",
      title: "Efficient Market Hypothesis",
      lede: "The EMH says security prices <strong>fully reflect available information</strong>, so consistently earning abnormal returns is impossible. It comes in three forms by the information set impounded.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Weak form",
              tagTone: "cap",
              title: "Past prices",
              body: "Prices reflect all <b>past market data</b> (prices, volumes). Implication: <b>technical analysis cannot</b> earn abnormal returns. (Consistent with the random walk.)",
            },
            {
              tag: "Semi-strong",
              tagTone: "cap",
              title: "All public info",
              body: "Prices reflect all <b>publicly available information</b> (accounts, news, announcements) — and adjust to it quickly. Implication: <b>fundamental analysis of public data cannot</b> earn abnormal returns.",
            },
            {
              tag: "Strong form",
              tagTone: "exp",
              title: "All info, even private",
              body: "Prices reflect <b>all information, public and private</b>. Implication: <b>not even insiders</b> can earn abnormal returns. The hardest form to defend empirically.",
            },
          ],
        },
        {
          kind: "note",
          body: "<b>Misconceptions:</b> efficiency does <i>not</i> mean prices are always ‘correct’ or that they never move — only that they reflect available information and react fast to new information, so mispricings can't be <i>systematically</i> exploited.",
        },
        {
          kind: "trap",
          body: "<b>Challenges (behavioural finance):</b> anomalies like the small-firm effect, January effect, P/E effect, over- and under-reaction, and bubbles suggest investor psychology causes departures from efficiency — the main exam critique of the EMH.",
        },
        {
          kind: "flips",
          title: "Pin the implications",
          items: [
            { label: "Q1", question: "Which EMH form kills technical analysis?", answer: "The <b>weak form</b> — prices already embed all past price/volume data, so chart-based timing can't beat the market." },
            { label: "Q2", question: "Which form kills fundamental analysis of public data?", answer: "The <b>semi-strong form</b> — all public information is already in the price and impounds quickly." },
            { label: "Q3", question: "Under the strong form, can insiders profit?", answer: "No — the strong form says even <b>private/insider</b> information is reflected in price. (Empirically the weakest claim.)" },
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
              question: "The top-down sequence of fundamental analysis is:",
              options: ["Company → Industry → Economy", "Economy → Industry → Company", "Industry → Company → Economy", "Economy → Company → Industry"],
              answer: 1,
              why: "Fundamental analysis works top-down: Economy, then Industry, then Company (E-I-C).",
            },
            {
              question: "Under the constant-growth model, P₀ equals:",
              options: ["D₀ ÷ (kₑ − g)", "D₁ ÷ (kₑ − g)", "D₁ ÷ (kₑ + g)", "D₁ × (kₑ − g)"],
              answer: 1,
              why: "P₀ = D₁ ÷ (kₑ − g), where D₁ = D₀(1 + g).",
            },
            {
              question: "If intrinsic value exceeds market price, the share is:",
              options: ["Over-valued — sell", "Under-valued — buy", "Correctly priced", "A random walk"],
              answer: 1,
              why: "Value > price means under-valued; a fundamental analyst buys.",
            },
            {
              question: "Which is the usual order of the industry life cycle?",
              options: ["Expansion → Pioneering → Decay → Stagnation", "Pioneering → Expansion → Stagnation → Decay", "Stagnation → Pioneering → Expansion → Decay", "Pioneering → Stagnation → Expansion → Decay"],
              answer: 1,
              why: "Pioneering, expansion/growth, stagnation/maturity, then decay/decline.",
            },
            {
              question: "Technical analysis is based on the study of:",
              options: ["Financial statements", "Past prices and volumes", "Macro-economic models", "Dividend forecasts"],
              answer: 1,
              why: "Technical analysis reads historical price and volume data, not fundamentals.",
            },
            {
              question: "Dow Theory's three trends are primary, secondary and:",
              options: ["Random", "Minor", "Cyclical", "Seasonal"],
              answer: 1,
              why: "Primary (long), secondary (corrections) and minor (daily) trends.",
            },
            {
              question: "The Random Walk theory implies that:",
              options: ["Charts predict prices", "Past prices cannot predict future prices", "Markets are inefficient", "Fundamentals are irrelevant"],
              answer: 1,
              why: "Price changes are independent and random, so past prices have no predictive power — undercutting technical analysis.",
            },
            {
              question: "The weak form of the EMH implies that abnormal returns cannot be earned using:",
              options: ["Insider information", "Technical analysis", "Public announcements", "Any information at all"],
              answer: 1,
              why: "The weak form impounds past price/volume data, so technical analysis fails.",
            },
            {
              question: "Semi-strong efficiency means prices reflect:",
              options: ["Only past prices", "All publicly available information", "All information including private", "Only insider tips"],
              answer: 1,
              why: "Semi-strong form impounds all public information, defeating fundamental analysis of public data.",
            },
            {
              question: "Anomalies such as the January effect are most often cited as evidence:",
              options: ["For strong-form efficiency", "Against market efficiency (behavioural finance)", "That technical analysis always works", "That dividends don't matter"],
              answer: 1,
              why: "Calendar/size/value anomalies are the behavioural-finance challenge to the EMH.",
            },
          ],
        },
      ],
    },
  ],
  footer:
    "AFM Chapter 4 · Security Analysis — simplified, exam-focused build from the ICAI syllabus. Confirm any figure against your ICAI material.",
};
