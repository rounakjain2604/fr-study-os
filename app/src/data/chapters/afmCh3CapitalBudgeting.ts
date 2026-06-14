// AFM Chapter 3 - Advanced Capital Budgeting Decisions.
//
// Simplified, exam-testable rebuild from the ICAI AFM Chapter 3 syllabus —
// concept + formula + a few representative worked sums per technique, NOT a
// verbatim reproduction of every ICAI illustration. Clean inline HTML/Unicode
// (no markdown/LaTeX), tables use <table class="tbl">.

import type { ChapterDoc } from "../chapterDoc";

export const afmCh3CapitalBudgetingDoc: ChapterDoc = {
  id: "afm-ch3",
  storageKey: "afmch3done",
  kicker: "Advanced Financial Management · Chapter 3 · Exam-focused",
  heroTitle: "Capital budgeting <em>with inflation and risk</em>: the techniques the exam actually asks you to compute.",
  heroStrap:
    "The calculation engine of AFM. Get the inflation rule, then the eight ways to put risk into a project decision — statistical (expected NPV, SD, CV), conventional (RADR, certainty equivalent), and the rest (sensitivity, scenario, simulation, decision tree) — plus the replacement/EAC decision. One tight worked sum each.",
  heroStats: [
    { value: "8", label: "Risk methods" },
    { value: "EAC", label: "Replacement" },
    { value: "7", label: "Worked sums" },
    { value: "CV", label: "Risk ranker" },
    { value: "12", label: "MCQs" },
  ],
  flow: {
    eyebrow: "How to pick a method",
    title: "Match the technique to what the question gives you",
    steps: [
      { title: "Probabilities given", body: "Statistical — Expected NPV, Standard Deviation, Coefficient of Variation." },
      { title: "A risk premium / rf rate", body: "Conventional — Risk-Adjusted Discount Rate or Certainty Equivalent." },
      { title: "‘What if a variable changes’", body: "Sensitivity, Scenario or Simulation analysis." },
      { title: "Sequential decisions", body: "Decision tree — roll expected values back to today." },
    ],
    foot: "Discount rule · risky CFs → RADR; certain CFs → risk-free rate",
  },
  sections: [
    {
      id: "inflation",
      folio: "¶ 1",
      title: "Inflation in Capital Budgeting",
      lede: "The one rule: <strong>be consistent</strong>. Discount <strong>nominal (money) cash flows at the money rate</strong>, or <strong>real cash flows at the real rate</strong> — never mix them.",
      blocks: [
        {
          kind: "formula",
          lines: [
            "Nominal cash flow = Real cash flow × (1 + inflation rate)<sup>t</sup>",
            "Real rate: (1 + money rate) = (1 + real rate)(1 + inflation rate)",
            "⇒ Real rate = [(1 + money rate) ÷ (1 + inflation rate)] − 1",
            "When revenue and cost inflate at different rates, inflate each line separately, then apply tax and depreciation.",
          ],
        },
        {
          kind: "trap",
          body: "<b>The classic error:</b> discounting <i>real</i> cash flows at the <i>money</i> (nominal) rate. That double-counts inflation and understates NPV. Either inflate the cash flows and use the money rate, or strip inflation out and use the real rate — both give the same NPV.",
        },
        {
          kind: "tyk",
          items: [
            {
              ref: "Worked sum",
              title: "Inflation-adjusted NPV",
              question:
                "Outlay ₹40,000. Real (uninflated) net cash flow ₹15,000 a year for 4 years, salvage nil. Money cost of capital 12% (includes a 10% inflation premium); inflation 10%. Find the NPV.",
              solution:
                'Inflate each year\'s real cash flow at 10%, then discount at the 12% money rate:<br><table class="tbl"><thead><tr><th>Year</th><th>Nominal CF (₹)</th><th>PVF @ 12%</th><th>PV (₹)</th></tr></thead><tbody><tr><td>1</td><td>15,000 × 1.10 = 16,500</td><td>0.893</td><td>14,732</td></tr><tr><td>2</td><td>15,000 × 1.10² = 18,150</td><td>0.797</td><td>14,469</td></tr><tr><td>3</td><td>15,000 × 1.10³ = 19,965</td><td>0.712</td><td>14,211</td></tr><tr><td>4</td><td>15,000 × 1.10⁴ = 21,962</td><td>0.636</td><td>13,957</td></tr></tbody></table>Total PV = ₹57,369. <b>NPV = 57,369 − 40,000 = ₹17,369</b>.<br><br>Check via the real-rate route: real rate = 1.12 ÷ 1.10 − 1 = 1.82%; ₹15,000 discounted at 1.82% for 4 years also gives ≈ ₹57,367 − 40,000 = <b>₹17,367</b> — same answer.',
            },
          ],
        },
      ],
    },
    {
      id: "trends",
      folio: "¶ 1.2–1.3",
      title: "Technology & Government-Policy Trends",
      lede: "Short theory, easily a 4-mark note: two forces that can break a project's assumptions mid-life.",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Technology",
              tagTone: "ntr",
              title: "Change in technology",
              body: "New technology can make a project's product or process <b>obsolete</b> before the end of its planned life — shortening the useful life, cutting cash flows, and forcing early replacement. Build reassessment points into the appraisal.",
            },
            {
              tag: "Government policy",
              tagTone: "ntr",
              title: "Change in government policy",
              bullets: [
                "<b>Domestic:</b> shifts in tax rates, subsidies, incentives, environmental and licensing rules change a project's after-tax cash flows.",
                "<b>International:</b> tariffs, import/export curbs, exchange controls, restrictions on profit repatriation and political risk hit cross-border projects.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "risk-factors",
      folio: "¶ 2–3",
      title: "Risk vs Uncertainty & Risk Factors",
      blocks: [
        {
          kind: "split",
          left: {
            tag: "Risk",
            tagTone: "cap",
            title: "Measurable",
            body: "Outcomes are unknown but their <b>probabilities can be estimated</b>, so risk can be quantified and built into the decision.",
          },
          right: {
            tag: "Uncertainty",
            tagTone: "exp",
            title: "Not measurable",
            body: "Outcomes and probabilities are <b>unknown</b>. Capital-budgeting techniques quantify <i>risk</i>; uncertainty can only be judged.",
          },
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Internal factors",
              tagTone: "ntr",
              title: "Within the firm",
              bullets: [
                "<b>Project-specific risk</b> — wrong estimates of cash flows, life or cost for this project.",
                "<b>Company-specific risk</b> — the project's effect on the firm as a whole (e.g. on its overall risk profile).",
              ],
            },
            {
              tag: "External factors",
              tagTone: "ntr",
              title: "Outside the firm",
              bullets: [
                "<b>Industry-specific</b> and <b>market</b> risk",
                "<b>Competition</b> risk",
                "Risk from <b>economic conditions</b>",
                "<b>International</b> risk (forex, political)",
              ],
            },
          ],
        },
        {
          kind: "note",
          body: "<b>Why adjust for risk?</b> A riskier project should clear a higher bar. Risk is incorporated either by raising the discount rate (RADR), shrinking the cash flows (certainty equivalent), or by analysing the spread of outcomes (statistical / scenario methods).",
        },
      ],
    },
    {
      id: "statistical",
      folio: "¶ 4.1",
      title: "Statistical Techniques",
      lede: "Use these when the question gives you <strong>probabilities</strong>. Expected NPV picks the winner; SD and CV measure the risk.",
      blocks: [
        {
          kind: "formula",
          lines: [
            "Expected cash flow:  ENCF = Σ (CFᵢ × Pᵢ)",
            "Expected NPV:  ENPV = Σ [ENCFₜ ÷ (1 + k)ᵗ] − I₀",
            "Variance:  σ² = Σ (CFᵢ − ENCF)² × Pᵢ     Standard Deviation:  σ = √σ²",
            "Coefficient of Variation:  CV = σ ÷ ENCF   (risk per ₹1 of expected return — lower is better)",
          ],
        },
        {
          kind: "cards",
          columns: 3,
          items: [
            { tag: "Expected NPV", tagTone: "cap", title: "Which project", body: "Probability-weighted NPV. Higher ENPV = more attractive — but says nothing about risk on its own." },
            { tag: "SD", tagTone: "ntr", title: "Absolute risk", body: "Spread of cash flows around the expected value. Fine for comparing projects of the <i>same</i> size." },
            { tag: "CV", tagTone: "gold", title: "Relative risk", body: "SD per unit of expected return — the right comparator when projects differ in size. <b>Pick the lower CV.</b>" },
          ],
        },
        {
          kind: "tyk",
          items: [
            {
              ref: "Worked sum 1",
              title: "Expected NPV — choose the project",
              question:
                "Both projects cost ₹10,000 and pay once at the end of year 1; discount rate 10% (PVF 0.909). Pick the project.<br>Project A: ₹8,000 (0.10), ₹10,000 (0.20), ₹12,000 (0.40), ₹14,000 (0.20), ₹16,000 (0.10).<br>Project B: ₹24,000 (0.10), ₹20,000 (0.15), ₹16,000 (0.50), ₹12,000 (0.15), ₹8,000 (0.10).",
              solution:
                "ENCF (A) = 8,000(0.1)+10,000(0.2)+12,000(0.4)+14,000(0.2)+16,000(0.1) = <b>₹12,000</b>.<br>ENCF (B) = 24,000(0.1)+20,000(0.15)+16,000(0.5)+12,000(0.15)+8,000(0.1) = <b>₹16,000</b>.<br><br>ENPV (A) = 0.909 × 12,000 − 10,000 = <b>₹908</b>.<br>ENPV (B) = 0.909 × 16,000 − 10,000 = <b>₹4,544</b>.<br><br>On expected NPV, <b>Project B</b> wins — but check its risk below before committing.",
            },
            {
              ref: "Worked sum 2",
              title: "Standard Deviation & Coefficient of Variation",
              question: "Using the same Projects A and B (ENCF ₹12,000 and ₹16,000), measure and compare their risk.",
              solution:
                'σ²(A) = Σ(CF−12,000)²P = (−4,000)²(0.1)+(−2,000)²(0.2)+0+(2,000)²(0.2)+(4,000)²(0.1) = 48,00,000.<br>σ(A) = √48,00,000 = <b>₹2,190.9</b>;  CV(A) = 2,190.9 ÷ 12,000 = <b>0.183</b>.<br><br>σ²(B) = (8,000)²(0.1)+(4,000)²(0.15)+0+(−4,000)²(0.15)+(−8,000)²(0.1) = 1,76,00,000.<br>σ(B) = √1,76,00,000 = <b>₹4,195.2</b>;  CV(B) = 4,195.2 ÷ 16,000 = <b>0.262</b>.<br><br><b>Verdict:</b> B has the higher expected NPV but also the higher CV (0.262 vs 0.183) — more risk per rupee. A risk-averse decision-maker prefers <b>Project A</b> (lower CV). This risk–return trade-off is the examiner\'s favourite twist.',
            },
          ],
        },
      ],
    },
    {
      id: "conventional",
      folio: "¶ 4.2",
      title: "Conventional Techniques — RADR & Certainty Equivalent",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "RADR",
              tagTone: "cap",
              title: "Risk-Adjusted Discount Rate",
              body: "Load the risk onto the <b>discount rate</b>: r* = risk-free rate + risk premium. Higher risk ⇒ higher rate ⇒ lower PV ⇒ tougher to accept.",
              bullets: [
                "<b>+</b> Simple, intuitive, widely used.",
                "<b>−</b> The premium is largely <b>subjective</b>; it assumes risk <b>rises with time</b> (compounding the premium), which may not hold.",
              ],
            },
            {
              tag: "CE",
              tagTone: "cap",
              title: "Certainty Equivalent",
              body: "Load the risk onto the <b>cash flows</b>: multiply each risky cash flow by a certainty-equivalent coefficient αₜ (0 < α ≤ 1), then discount the now-certain flows at the <b>risk-free rate</b>.",
              bullets: [
                "αₜ = certain cash flow ÷ expected risky cash flow.",
                "<b>+</b> Risk handled flexibly, year by year. <b>−</b> α factors are hard to set objectively.",
              ],
            },
          ],
        },
        {
          kind: "formula",
          lines: [
            "RADR:  NPV = Σ [CFₜ ÷ (1 + r*)ᵗ] − I₀,   where r* = risk-free rate + risk premium",
            "Certainty Equivalent:  NPV = Σ [(αₜ × CFₜ) ÷ (1 + rₓ)ᵗ] − I₀,   where rₓ = risk-free rate",
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "RADR vs CE",
              tagTone: "gold",
              title: "Where the risk adjustment sits",
              table: {
                columns: ["", "RADR", "Certainty Equivalent"],
                rows: [
                  { label: "Adjusts the…", values: ["Discount rate", "Cash flows"] },
                  { label: "Discount at", values: ["Risk-free + premium", "Risk-free rate"] },
                  { label: "Risk over time", values: ["Assumed to increase", "Set freely per year"], strong: true },
                  { label: "Seen as", values: ["Simpler, more popular", "Theoretically superior"] },
                ],
              },
            },
          ],
        },
        {
          kind: "tyk",
          items: [
            {
              ref: "Worked sum",
              title: "Certainty Equivalent NPV",
              question:
                "Outlay ₹50,000. Expected cash flows ₹30,000 each for 3 years with certainty-equivalent coefficients 0.9, 0.8 and 0.7. Risk-free rate 6%. Evaluate.",
              solution:
                'Convert to certain cash flows, then discount at 6%:<br><table class="tbl"><thead><tr><th>Year</th><th>α × CF (₹)</th><th>PVF @ 6%</th><th>PV (₹)</th></tr></thead><tbody><tr><td>1</td><td>0.9 × 30,000 = 27,000</td><td>0.943</td><td>25,472</td></tr><tr><td>2</td><td>0.8 × 30,000 = 24,000</td><td>0.890</td><td>21,360</td></tr><tr><td>3</td><td>0.7 × 30,000 = 21,000</td><td>0.840</td><td>17,632</td></tr></tbody></table>Total PV = ₹64,464. <b>NPV = 64,464 − 50,000 = ₹14,464</b> → positive, so <b>accept</b>. (Note α falls over time, reflecting rising uncertainty in later years.)',
            },
          ],
        },
      ],
    },
    {
      id: "other",
      folio: "¶ 4.3",
      title: "Other Techniques — Sensitivity, Scenario, Simulation, Decision Tree",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Sensitivity",
              tagTone: "cap",
              title: "One variable at a time",
              body: "Flex each input (sales, price, cost, life, rate) to find the <b>% change that drives NPV to zero</b>. The variable with the <b>smallest margin</b> is the most critical.",
              bullets: ["<b>+</b> Pinpoints the variables that matter.", "<b>−</b> Changes one variable at a time; ignores probabilities and correlations."],
            },
            {
              tag: "Scenario",
              tagTone: "cap",
              title: "Variables move together",
              body: "Build consistent <b>best / base / worst</b> cases, changing a whole set of variables at once. Fixes sensitivity analysis's one-at-a-time flaw.",
            },
            {
              tag: "Simulation",
              tagTone: "cap",
              title: "Monte Carlo",
              body: "Draw thousands of random scenarios from input <b>probability distributions</b> to build a full distribution of NPV.",
              bullets: ["<b>+</b> Handles many interacting variables.", "<b>−</b> Complex, costly, and only as good as the assumed distributions."],
            },
            {
              tag: "Decision tree",
              tagTone: "cap",
              title: "Sequential decisions",
              body: "Map decisions and chance outcomes as branches, then <b>roll expected values back</b> from right to left to choose the best path today.",
            },
          ],
        },
        {
          kind: "tyk",
          items: [
            {
              ref: "Worked sum 1",
              title: "Sensitivity — which variable is most critical?",
              question:
                "Outlay ₹1,00,000; annual cash flow ₹30,000 for 5 years; cost of capital 10% (PVAF 3.791). Find the sensitivity of NPV to the annual cash flow and to the initial outlay.",
              solution:
                "Base NPV = 30,000 × 3.791 − 1,00,000 = 1,13,730 − 1,00,000 = <b>₹13,730</b>.<br><br><b>Annual cash flow:</b> NPV = 0 when CF × 3.791 = 1,00,000 ⇒ CF = ₹26,378. Margin = (30,000 − 26,378) ÷ 30,000 = <b>12.1%</b>.<br><b>Initial outlay:</b> NPV = 0 when outlay = ₹1,13,730. Margin = 13,730 ÷ 1,00,000 = <b>13.7%</b>.<br><br>The <b>annual cash flow</b> has the smaller margin (12.1%), so it is the <b>most sensitive / critical</b> variable — watch it most closely.",
            },
            {
              ref: "Worked sum 2",
              title: "Decision tree — expected-value roll-back",
              question:
                "Choose between Project X and Project Y on expected monetary value. X: 0.7 chance of ₹50 lakh, 0.3 chance of −₹10 lakh. Y: 0.5 chance of ₹40 lakh, 0.5 chance of ₹10 lakh.",
              solution:
                "EMV(X) = 0.7 × 50 + 0.3 × (−10) = 35 − 3 = <b>₹32 lakh</b>.<br>EMV(Y) = 0.5 × 40 + 0.5 × 10 = 20 + 5 = <b>₹25 lakh</b>.<br><br>Rolling the expected values back to the decision node, <b>Project X</b> has the higher EMV (₹32 L &gt; ₹25 L) and is chosen — even though it carries a downside branch.",
            },
          ],
        },
      ],
    },
    {
      id: "replacement",
      folio: "¶ 5",
      title: "Replacement Decision & Optimum Cycle (EAC)",
      lede: "When assets have <strong>unequal lives</strong>, compare them on <strong>Equivalent Annual Cost</strong>, not total PV. The optimum replacement cycle is the one with the <strong>lowest EAC</strong>.",
      blocks: [
        {
          kind: "formula",
          lines: [
            "Equivalent Annual Cost (EAC) = PV of net costs over the cycle ÷ PV annuity factor (k, n)",
            "PV of net costs = capital cost + PV of running costs − PV of salvage",
            "Choose the replacement cycle (n) with the lowest EAC.",
          ],
        },
        {
          kind: "tyk",
          items: [
            {
              ref: "Worked sum",
              title: "Optimum replacement cycle",
              question:
                "A machine costs ₹10,000. Running cost is ₹2,000 in year 1 and ₹4,000 in year 2; resale value is ₹6,000 at the end of year 1 and ₹3,000 at the end of year 2. Cost of capital 10%. Replace every 1 year or every 2 years?",
              solution:
                '<table class="tbl"><thead><tr><th></th><th>1-year cycle</th><th>2-year cycle</th></tr></thead><tbody><tr><td>Capital cost</td><td>10,000</td><td>10,000</td></tr><tr><td>PV running costs</td><td>2,000/1.1 = 1,818</td><td>1,818 + 4,000/1.21 = 5,124</td></tr><tr><td>Less PV salvage</td><td>6,000/1.1 = (5,455)</td><td>3,000/1.21 = (2,479)</td></tr><tr><td>PV of net cost</td><td>6,363</td><td>12,645</td></tr><tr><td>÷ PVAF @ 10%</td><td>0.909</td><td>1.736</td></tr><tr><td><b>EAC</b></td><td><b>₹7,000</b></td><td><b>₹7,284</b></td></tr></tbody></table>The 1-year cycle has the lower EAC (₹7,000 &lt; ₹7,284), so the optimum policy is to <b>replace every year</b>.',
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
              question: "To handle inflation correctly you must:",
              options: ["Discount real cash flows at the money rate", "Discount nominal cash flows at the money rate", "Ignore inflation if it is below 10%", "Always use the real rate"],
              answer: 1,
              why: "Be consistent: nominal CFs ↔ money rate, or real CFs ↔ real rate. Mixing them is the classic error.",
            },
            {
              question: "The real discount rate equals:",
              options: ["money rate − inflation rate", "(1 + money rate)(1 + inflation) − 1", "(1 + money rate)/(1 + inflation) − 1", "money rate + inflation rate"],
              answer: 2,
              why: "From (1+money) = (1+real)(1+inflation), the real rate = (1+money)/(1+inflation) − 1.",
            },
            {
              question: "Risk differs from uncertainty in that risk:",
              options: ["Always means loss", "Can be assigned probabilities", "Only affects new projects", "Cannot be quantified"],
              answer: 1,
              why: "Risk has estimable probabilities and can be quantified; uncertainty cannot.",
            },
            {
              question: "Expected NPV is computed using:",
              options: ["The most likely cash flow", "Probability-weighted cash flows", "The worst-case cash flow", "Certainty equivalents"],
              answer: 1,
              why: "ENPV discounts the probability-weighted (expected) cash flows.",
            },
            {
              question: "When two projects differ in size, the better risk comparator is:",
              options: ["Standard deviation", "Variance", "Coefficient of variation", "Expected value"],
              answer: 2,
              why: "CV = SD/expected value standardises risk per unit of return, so it compares unlike-sized projects.",
            },
            {
              question: "A lower coefficient of variation indicates:",
              options: ["More risk per unit of return", "Less risk per unit of return", "Higher expected NPV", "A larger project"],
              answer: 1,
              why: "Lower CV = less risk borne per rupee of expected return — generally preferred.",
            },
            {
              question: "Under the Risk-Adjusted Discount Rate method, a riskier project is given a:",
              options: ["Lower discount rate", "Higher discount rate", "Risk-free rate", "Zero rate"],
              answer: 1,
              why: "r* = risk-free + premium; more risk → higher rate → lower PV.",
            },
            {
              question: "In the certainty-equivalent method, the certain cash flows are discounted at the:",
              options: ["Risk-adjusted rate", "Cost of equity", "Risk-free rate", "Internal rate of return"],
              answer: 2,
              why: "Risk is already removed via the α coefficients, so you discount at the risk-free rate.",
            },
            {
              question: "Sensitivity analysis is criticised because it:",
              options: ["Needs probabilities", "Changes only one variable at a time", "Cannot find NPV", "Requires simulation software"],
              answer: 1,
              why: "It flexes one variable at a time and ignores probabilities and correlations — scenario analysis addresses this.",
            },
            {
              question: "Monte Carlo simulation produces:",
              options: ["A single NPV", "A probability distribution of NPV", "The IRR", "A payback period"],
              answer: 1,
              why: "It generates many random outcomes to build a distribution of NPV.",
            },
            {
              question: "Decision-tree analysis evaluates a project by:",
              options: ["Rolling expected values back from right to left", "Discounting at the risk-free rate", "Computing the coefficient of variation", "Ignoring probabilities"],
              answer: 0,
              why: "You fold back (roll back) expected values from the final branches to the decision node.",
            },
            {
              question: "Assets with unequal lives are best compared using:",
              options: ["Total NPV", "Payback", "Equivalent Annual Cost", "Accounting rate of return"],
              answer: 2,
              why: "EAC annualises each option's PV of cost so unequal-life assets are comparable; lowest EAC wins.",
            },
          ],
        },
      ],
    },
  ],
  footer:
    "AFM Chapter 3 · Advanced Capital Budgeting Decisions — simplified, exam-focused build from the ICAI syllabus. Worked sums are representative; confirm exact figures against your ICAI illustrations.",
};
