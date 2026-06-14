// AFM Chapter 3 - Advanced Capital Budgeting Decisions.
// Authored from the corrected ICAI markdown source in 02_AFM_Corrected.

import type { ChapterDoc } from "../chapterDoc";

// The Chapter 3 content was transcribed from the corrected Mistral-OCR markdown,
// which still carries GitHub-style tables and LaTeX-ish math. The chapter
// renderer injects raw HTML (no markdown/LaTeX parsing), so rt() converts that
// markup into the clean inline HTML the renderer understands: real <table>s and
// Unicode maths instead of "| --- |" rows and "\frac"/"$...$"/"sqrt" text.

const cleanMath = (s: string) =>
  s
    .replace(/\$([^$]+?)\$/g, "$1") // strip inline $ … $ delimiters
    .replace(/\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "($1)/($2)")
    .replace(/\\sqrt\s*\{([^{}]*)\}/g, "√($1)")
    .replace(/\\times/g, "×")
    .replace(/\\div/g, "÷")
    .replace(/\\cdot/g, "·")
    .replace(/\\sum/g, "Σ")
    .replace(/\\sigma/g, "σ")
    .replace(/\\pi/g, "π")
    .replace(/\\(left|right|big|Big|!|,|;|:)/g, "")
    .replace(/\\\\/g, "<br>")
    .replace(/\bsqrt\s*/g, "√") // bare "sqrt48,00,000" → √48,00,000
    .replace(/\bsigma\b/g, "σ")
    .replace(/\^\{([^{}]*)\}/g, "<sup>$1</sup>")
    .replace(/\^(\d+)/g, "<sup>$1</sup>")
    .replace(/_\{([^{}]*)\}/g, "<sub>$1</sub>")
    .replace(/([\d)])\s+x\s+([\d(])/g, "$1 × $2") // " x " as multiplication
    .replace(/\\/g, ""); // drop any stray backslashes

const isSepRow = (line: string) => /^[\s|:-]+$/.test(line) && line.includes("-");

const mdTableToHtml = (rows: string[]) => {
  const parse = (line: string) =>
    line.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|").map((cell) => cell.trim());
  const data = rows.filter((row) => !isSepRow(row)).map(parse);
  if (!data.length) return "";
  const [head, ...body] = data;
  const thead = `<thead><tr>${head.map((c) => `<th>${c}</th>`).join("")}</tr></thead>`;
  const tbody = `<tbody>${body
    .map((cells) => `<tr>${cells.map((c) => `<td>${c}</td>`).join("")}</tr>`)
    .join("")}</tbody>`;
  return `<table class="tbl">${thead}${tbody}</table>`;
};

const rt = (value: string) => {
  const lines = value.trim().replace(/\n{3,}/g, "\n\n").split("\n");
  const parts: string[] = [];
  let text: string[] = [];
  let table: string[] = [];
  const flushText = () => {
    if (text.length) {
      parts.push(text.join("<br>"));
      text = [];
    }
  };
  const flushTable = () => {
    if (table.length) {
      parts.push(mdTableToHtml(table));
      table = [];
    }
  };
  for (const line of lines) {
    if (/^\s*\|.*\|\s*$/.test(line)) {
      flushText();
      table.push(line);
    } else {
      flushTable();
      text.push(line);
    }
  }
  flushText();
  flushTable();
  return cleanMath(parts.join(""));
};

const textCard = (title: string, body: string) => ({
  kind: "cards" as const,
  columns: 2 as const,
  items: [{ tag: "ICAI text", tagTone: "ntr" as const, title, body }],
});

const illustrationItems = {
  trends: [
      {
        ref: "Illustration 1",
        title: "Determine NPV of the project with the following information: Initial Outlay of project ₹ 40,000...",
        question: rt(String.raw`<b>Illustration 1</b>

Determine NPV of the project with the following information:

Initial Outlay of project ₹ 40,000
Annual revenues (Without inflation) ₹ 30,000
Annual costs excluding depreciation (Without inflation) ₹ 10,000
Useful life 4 years
Salvage value Nil
Tax Rate 50%

Cost of Capital (Including inflation premium of 10%) 12%`),
        solution: rt(String.raw`Annual Cash Flow of project is

(₹  30,000 - ₹  10,000) (1 - 0.50) + ₹  10,000  x  0.50 = ₹  15,000

It would be inconsistent to discount these real cash flows at 12% (nominal rate of return).

There are two alternatives:

(i) Either to restate the cash flow in nominal term and discount at 12% or
(ii) Restate the discount rate in real terms and use this to discount the real cash flows.

<b>NPV using (i) approach</b>

Since inflation rate is 10% a year, real cash flows may be stated in nominal cash flows as follows:

Nominal Cash Flow = (1 + Inflation Rate) Real Cash Flows

|  Year | Real Cash Flows | Nominal Cash flows  |
| --- | --- | --- |
|  1 | 15000 | 15,000 × 1.10 = 16,500  |
|  2 | 15,000 | 15,000 × (1.10)^{2} = 18,150  |
|  3 | 15,000 | 15,000 × (1.10)^{3} = 19,965  |
|  4 | 15,000 | 15,000 × (1.10)^{4} = 21,962  |

NPV using nominal discounting rate 12%

(16,500) / ((1.12)) + (18,150) / ((1.12)^2) + (19,965) / ((1.12)^3) + (21,962) / ((1.12)^4) - 40,000
= ₹  14,732 + ₹  14,469 + ₹  14,211 + ₹  13,957 - ₹  40,000
= ₹  17,369  (Approx)

<b>NPV using (ii) approach</b>

To compute NPV using (ii) approach, we shall need real discount rate, which shall be computed as follows:

Real Discount Rate = (1 + Nominal Discount Rate) / (1 + Inflation Rate) - 1

Real Discount Rate = (1 + 0.12) / (1 + 0.10) - 1 = 0.0182  i.e.  1.8%.

NPV = Sum_t=1^n c f_t - I_o

Where $ t = $ Time Period

c f _t = Annual Cash Flow
I _0 = Initial Outlay

Accordingly NPV of the project

(15,000) / ((1.0182)) + (15,000) / ((1.0182)^2) + (15,000) / ((1.0182)^3) + (15,000) / ((1.0182)^4) - 40,000
= ₹ 14,732 + ₹ 14,469 + ₹ 14,210 + ₹ 13,956 - ₹ 40,000
= ₹ 57,367 - ₹ 40,000 = ₹ 17,367 (Approx)

NPV based on consideration that inflation rate for revenue and cost are different shall be computed as follows:

N.P.V. = Sum_t=1^n [ R_t (1 + i_r) - C_t (1 + i_c)  (1 - T) + D_t T ] / (1 + k)^t - I_0

$R_t arrow$ revenues for the year 't' with no inflation.

$i_r arrow$ annual inflation rate in revenues for 'r th ' year.

$C_t arrow$ costs for year 't' with no inflation.

$i_c arrow$ annual inflation rate of costs for year 'r'.

T → tax rate.

$D_t arrow$ depreciation charge for year 't'.

$I_0 arrow$ initial outlay.

k → cost of capital (with inflation premium).`),
      },
      {
        ref: "Illustration 2",
        title: "XYZ Ltd. requires ₹ 8,00,000 for an unit. Useful life of project - 4 years. Salvage value - Nil...",
        question: rt(String.raw`<b>Illustration 2</b>

XYZ Ltd. requires ₹ 8,00,000 for an unit. Useful life of project - 4 years. Salvage value - Nil. Depreciation Charge ₹ 2,00,000 p.a. Expected revenues &amp; costs (excluding depreciation) ignoring inflation.

|  Year | 1 | 2 | 3 | 4  |
| --- | --- | --- | --- | --- |
|  Revenues | ₹ 6,00,000 | ₹ 7,00,000 | ₹ 8,00,000 | ₹ 8,00,000  |
|  Costs | ₹ 3,00,000 | ₹ 4,00,000 | ₹ 4,00,000 | ₹ 4,00,000  |

Tax Rate 60% cost of capital 10% (including inflation premium).

Calculate NPV of the project if inflation rates for revenues &amp; costs are as follows:

|  Year | Revenues | Costs  |
| --- | --- | --- |
|  1 | 10% | 12%  |

|  2 | 9% | 10%  |
| --- | --- | --- |
|  3 | 8% | 9%  |
|  4 | 7% | 8%  |`),
        solution: rt(String.raw`<b>Computation of Annual Cash Flow</b>

<b>(i) Inflation adjusted Revenues</b>

|  Year | Revenues (₹) | Revenues (Inflation Adjusted) (₹)  |
| --- | --- | --- |
|  1 | 6,00,000 | 6,00,000(1.10) = 6,60,000  |
|  2 | 7,00,000 | 7,00,000(1.10)(1.09) = 8,39,300  |
|  3 | 8,00,000 | 8,00,000(1.10)(1.09)(1.08) = 10,35,936  |
|  4 | 8,00,000 | 8,00,000(1.10)(1.09)(1.08)(1.07) = 11,08,452  |

<b>(ii) Inflation adjusted Costs</b>

|  Year | Revenues (₹) | Revenues (Inflation Adjusted) (₹)  |
| --- | --- | --- |
|  1 | 3,00,000 | 3,00,000(1.12) = 3,36,000  |
|  2 | 4,00,000 | 4,00,000(1.12)(1.10) = 4,92,800  |
|  3 | 4,00,000 | 4,00,000(1.12)(1.10)(1.09) = 5,37,172  |
|  4 | 4,00,000 | 4,00,000(1.12)(1.10)(1.09)(1.08) = 5,80,124  |

<b>(iii) Tax Benefit on Depreciation = ₹ 2,00,000 x 0.60 = ₹ 1,20,000</b>

<b>(iv) Net Profit after Tax</b>

|  Year | Revenues (Inflation Adjusted) (₹)(1) | Costs (Inflation Adjusted) (₹)(2) | Net Profit (₹) (3) = (1) - (2) | Tax (₹) (4) = 60% of (3) | Net after Profit (₹) (3) - (4)  |
| --- | --- | --- | --- | --- | --- |
|  1 | 6,60,000 | 3,36,000 | 3,24,000 | 1,94,400 | 1,29,600  |
|  2 | 8,39,300 | 4,92,800 | 3,46,500 | 2,07,900 | 1,38,600  |
|  3 | 10,35,936 | 5,37,172 | 4,98,764 | 2,99,258 | 1,99,506  |
|  4 | 11,08,452 | 5,80,124 | 5,28,328 | 3,16,997 | 2,11,331  |

<b>(iv) Present Value of Cash Inflows</b>

|  Year | Net after Profit (₹) | Tax Benefit on Depreciation (₹) | Cash Inflow (₹) | PVF@ 10% | PV (₹)  |
| --- | --- | --- | --- | --- | --- |

|  1 | 1,29,600 | 1,20,000 | 2,49,600 | 0.909 | 2,26,886  |
| --- | --- | --- | --- | --- | --- |
|  2 | 1,38,600 | 1,20,000 | 2,58,600 | 0.826 | 2,13,604  |
|  3 | 1,99,506 | 1,20,000 | 3,19,506 | 0.751 | 2,39,949  |
|  4 | 2,11,331 | 1,20,000 | 3,31,331 | 0.683 | 2,26,299  |
|   |   |   |   |   | 9,06,738  |

NPV = ₹ 9,06,738 – ₹ 8,00,000 = ₹ 1,06,738`),
      }
    ],
  statistical: [
      {
        ref: "Illustration 3",
        title: "Possible net cash flows of Projects A and B at the end of first year and their probabilities ar...",
        question: rt(String.raw`Illustration 3

Possible net cash flows of Projects A and B at the end of first year and their probabilities are given below. Discount rate is 10 per cent. For both the projects, initial investment is ₹ 10,000. Calculate the expected net present value for each project. State which project is preferable?

|  Possible Event | Project A |   | Project B  |   |
| --- | --- | --- | --- | --- |
|   |  Cash Flow (₹) | Probability | Cash Flow (₹) | Probability  |
|  A | 8,000 | 0.10 | 24,000 | 0.10  |
|  B | 10,000 | 0.20 | 20,000 | 0.15  |

|  C | 12,000 | 0.40 | 16,000 | 0.50  |
| --- | --- | --- | --- | --- |
|  D | 14,000 | 0.20 | 12,000 | 0.15  |
|  E | 16,000 | 0.10 | 8,000 | 0.10  |`),
        solution: rt(String.raw`Calculation of Expected Value for Project A and Project B

|  Project A |   |   |   | Project B  |   |   |
| --- | --- | --- | --- | --- | --- | --- |
|  Possible Event | Cash Flow (₹) | Probability | Expected Value (₹) | Cash Flow (₹) | Probability | Expected Value (₹)  |
|  A | 8,000 | 0.10 | 800 | 24,000 | 0.10 | 2,400  |
|  B | 10,000 | 0.20 | 2,000 | 20,000 | 0.15 | 3,000  |
|  C | 12,000 | 0.40 | 4,800 | 16,000 | 0.50 | 8,000  |
|  D | 14,000 | 0.20 | 2,800 | 12,000 | 0.15 | 1,800  |
|  E | 16,000 | 0.10 | 1,600 | 8,000 | 0.10 | 800  |
|  ENCF |   |   | 12,000 |  |   | 16,000  |

The Net Present Value for Project A is $(0.909  x   ₹ 12,000 - ₹ 10,000) = ₹ 908$

The Net Present Value for Project B is $(0.909  x   ₹ 16,000 - ₹ 10,000) = ₹ 4,544$.

(b) Expected Net Present Value- Multiple period

Let us understand the calculation of Expected Net Present Value (ENPV) for multiple periods through an illustration as follows:`),
      },
      {
        ref: "Illustration 4",
        title: "Probabilities for net cash flows for 3 years of a project are as follows: Year 1 Year 2 Year 3...",
        question: rt(String.raw`Illustration 4

Probabilities for net cash flows for 3 years of a project are as follows:

|  Year 1 |   | Year 2 |   | Year 3  |   |
| --- | --- | --- | --- | --- | --- |
|  Cash Flow (₹) | Probability | Cash Flow (₹) | Probability | Cash Flow (₹) | Probability  |
|  2,000 | 0.1 | 2,000 | 0.2 | 2,000 | 0.3  |
|  4,000 | 0.2 | 4,000 | 0.3 | 4,000 | 0.4  |
|  6,000 | 0.3 | 6,000 | 0.4 | 6,000 | 0.2  |
|  8,000 | 0.4 | 8,000 | 0.1 | 8,000 | 0.1  |

Calculate the expected net present value of the project using 10 per cent discount rate if the Initial Investment of the project is ₹ 10,000.`),
        solution: rt(String.raw`Calculation of Expected Value

|  Year 1 |   |   | Year 2 |   |   | Year 3  |   |   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  Cash Flow (₹) | Prob. | Expected Value (₹) | Cash Flow (₹) | Prob. | Expected Value (₹) | Cash Flow (₹) | Prob. | Expected Value (₹)  |
|  2,000 | 0.1 | 200 | 2,000 | 0.2 | 400 | 2,000 | 0.3 | 600  |
|  4,000 | 0.2 | 800 | 4,000 | 0.3 | 1200 | 4,000 | 0.4 | 1,600  |
|  6,000 | 0.3 | 1,800 | 6,000 | 0.4 | 2400 | 6,000 | 0.2 | 1,200  |
|  8,000 | 0.4 | 3,200 | 8,000 | 0.1 | 800 | 8,000 | 0.1 | 800  |
|  ENCF |  | 6,000 |  |  | 4,800 |  |  | 4,200  |

The present value of the expected value of cash flow at 10 per cent discount rate has been determined as follows:

Present Value of cash flow = (ENCF_1) / ((1 + k)^3) + (ENCF_2) / ((1 + k)^2) + (ENCF_3) / ((1 + k)^3)
= (6,000) / ((1.1)) + (4,800) / ((1.1)^2) + (4,200) / ((1.1)^3)
= (6,000  x  0.909) + (4,800  x  0.826) + (4,200  x  0.751)
= ₹ 12,573

Expected Net Present value = Present Value of cash flow - Initial Investment

= ₹ 12,573 - ₹ 10,000 = ₹ 2,573.`),
      },
      {
        ref: "Illustration 5",
        title: "Calculate Variance and Standard Deviation of Project A and Project B on the basis of following...",
        question: rt(String.raw`<b>Illustration 5</b>

Calculate Variance and Standard Deviation of Project A and Project B on the basis of following information:

|  Possible Event | Project A |   | Project B  |   |
| --- | --- | --- | --- | --- |
|   |  Cash Flow (₹) | Probability | Cash Flow (₹) | Probability  |
|  A | 8,000 | 0.10 | 24,000 | 0.10  |
|  B | 10,000 | 0.20 | 20,000 | 0.15  |
|  C | 12,000 | 0.40 | 16,000 | 0.50  |
|  D | 14,000 | 0.20 | 12,000 | 0.15  |
|  E | 16,000 | 0.10 | 8,000 | 0.10  |`),
        solution: rt(String.raw`Calculation of Expected Value for Project A and Project B

|  Project A |   |   |   | Project B  |   |   |
| --- | --- | --- | --- | --- | --- | --- |
|  Possible Event | Cash Flow (₹) | Probability | Expected Value (₹) | Cash Flow (₹) | Probability | Expected Value (₹)  |
|  A | 8,000 | 0.10 | 800 | 24,000 | 0.10 | 2,400  |
|  B | 10,000 | 0.20 | 2,000 | 20,000 | 0.15 | 3,000  |
|  C | 12,000 | 0.40 | 4,800 | 16,000 | 0.50 | 8,000  |
|  D | 14,000 | 0.20 | 2,800 | 12,000 | 0.15 | 1,800  |
|  E | 16,000 | 0.10 | 1,600 | 8,000 | 0.10 | 800  |
|  ENCF |  |  | 12,000 |  |  | 16,000  |

<b>Project A:</b>

Variance (σ²) = (8,000 - 12,000)² × (0.1) + (10,000 - 12,000)² × (0.2) + (12,000 - 12000)² × (0.4) + (14,000 - 12,000)² × (0.2) + (16000 - 12,000)² × (0.1)
= 16,00,000 + 8,00,000 + 0 + 8,00,000 + 16,00,000 = 48,00,000

Standard Deviation (σ) = √Variance(σ²) = √48,00,000 = 2,190.90

<b>Project B:</b>

Variance(σ²) = (24,000 - 16,000)² × (0.1) + (20,000 - 16,000)² × (0.15) + (16,000 - 16,000)² × (0.5) + (12,000 - 16,000)² × (0.15) + (8,000 - 16,000)² × (0.1)
= 64,00,000 + 24,00,000 + 0 + 24,00,000 + 64,00,000 = 1,76,00,000

Standard Deviation (σ) = √Variance(σ²) = √1,76,00,000 = 4195.23`),
      },
      {
        ref: "Illustration 6",
        title: "Calculate Coefficient of Variation of Project A and Project B based on the following informatio...",
        question: rt(String.raw`<b>Illustration 6</b>

Calculate Coefficient of Variation of Project A and Project B based on the following information:

|  Possible Event | Project A |   | Project B  |   |
| --- | --- | --- | --- | --- |
|   |  Cash Flow (₹) | Probability | Cash Flow (₹) | Probability  |
|  A | 10000 | 0.10 | 26,000 | 0.10  |
|  B | 12,000 | 0.20 | 22,000 | 0.15  |
|  C | 14,000 | 0.40 | 18,000 | 0.50  |
|  D | 16,000 | 0.20 | 14,000 | 0.15  |
|  E | 18,000 | 0.10 | 10,000 | 0.10  |`),
        solution: rt(String.raw`Calculation of Expected Value for Project A and Project B

|  Project A |   |   |   | Project B  |   |   |
| --- | --- | --- | --- | --- | --- | --- |
|  Possible Event | Cash Flow (₹) | Probability | Expected Value (₹) | Cash Flow (₹) | Probability | Expected Value (₹)  |
|  A | 10,000 | 0.10 | 1,000 | 26,000 | 0.10 | 2,600  |
|  B | 12,000 | 0.20 | 2,400 | 22,000 | 0.15 | 3,300  |
|  C | 14,000 | 0.40 | 5,600 | 18,000 | 0.50 | 9,000  |
|  D | 16,000 | 0.20 | 3,200 | 14,000 | 0.15 | 2,100  |
|  E | 18,000 | 0.10 | 1,800 | 10,000 | 0.10 | 1,000  |
|  ENCF |   |   | 14,000 |  |   | 18,000  |

<b>Project A</b>

Variance $(sigma^2) = (10,000 - 14,000)^2  x  (0.1) + (12,000 - 14,000)^2  x  (0.2) + (14,000 - 14000)^2  x  (0.4)$

+ (16,000 - 14,000)^2  x  (0.2) + (18000 - 14,000)^2  x  (0.1)
= 16,00,000 + 8,00,000 + 0 + 8,00,000 + 16,00,000 = 48,00,000

Standard Deviation  (sigma) = sqrtVariance(sigma^2) = sqrt48,00,000 = 2,190.90

<b>Project B:</b>

Variance(sigma^2) = (26,000 - 18,000)^2  x  (0.1) + (22,000 - 18,000)^2  x  (0.15) + (18,000 - 18,000)^2  x  (0.5)
+ (14,000 - 18,000)^2  x  (0.15) + (10,000 - 18,000)^2  x  (0.1)
= 64,00,000 + 24,00,000 + 0 + 24,00,000 + 64,00,000 = 1,76,00,000

Standard Deviation  (sigma) = sqrtVariance(sigma^2) = sqrt1,76,00,000 = 4195.23

|  Projects | Coefficient of variation | Risk | Expected Value  |
| --- | --- | --- | --- |
|  A | $(2190.90) / (14000) = 0.1565$ | Less | Less  |
|  B | $(4195.23) / (18000) = 0.2331$ | More | More  |

In project A, risk per rupee of cash flow is ₹ 0.16 while in project B, it is ₹ 0.23. Therefore, Project A is better than Project B.`),
      }
    ],
  conventional: [
      {
        ref: "Illustration 7",
        title: "An enterprise is investing ₹ 100 lakhs in a project. The risk-free rate of return is 7%. Risk p...",
        question: rt(String.raw`<b>Illustration 7</b>

An enterprise is investing ₹ 100 lakhs in a project. The risk-free rate of return is 7%. Risk premium expected by the Management is 7%. The life of the project is 5 years. Following are the cash flows that are estimated over the life of the project:

|  Year | Cash flows (₹ in lakhs)  |
| --- | --- |
|  1 | 25  |
|  2 | 60  |
|  3 | 75  |
|  4 | 80  |
|  5 | 65  |

Calculate Net Present Value of the project based on Risk free rate and also on the basis of Risks adjusted discount rate.`),
        solution: rt(String.raw`The Present Value of the Cash Flows for all the years by discounting the cash flow at 7% is calculated as below:

|  Year | Cash flows (₹ in lakhs) | Discounting Factor @ 7% | Present value of Cash Flows (₹ In Lakhs)  |
| --- | --- | --- | --- |
|  1 | 25 | 0.935 | 23.38  |
|  2 | 60 | 0.873 | 52.38  |
|  3 | 75 | 0.816 | 61.20  |
|  4 | 80 | 0.763 | 61.04  |
|  5 | 65 | 0.713 | 46.35  |
|  Total of Present value of Cash flows |   |   | 244.34  |
|  Less: Initial investment |   |   | 100.00  |
|  Net Present Value (NPV) |   |   | 144.34  |

Now, when the risk-free rate is 7% and the risk premium expected by the Management is 7%, then

risk adjusted discount rate is $7% + 7% = 14%$.

Discounting the above cash flows using the Risk Adjusted Discount Rate would be as below:

|  Year | Cash flows (₹ in Lakhs) | Discounting Factor @ 14% | Present Value of Cash Flows (₹ in lakhs)  |
| --- | --- | --- | --- |
|  1 | 25 | 0.877 | 21.93  |
|  2 | 60 | 0.769 | 46.14  |
|  3 | 75 | 0.675 | 50.63  |
|  4 | 80 | 0.592 | 47.36  |
|  5 | 65 | 0.519 | 33.74  |
|  Total of Present value of Cash flows |   |   | 199.79  |
|  Less: Initial investment |   |   | 100.00  |
|  Net present value (NPV) |   |   | 99.79  |

<b>Advantages of Risk-adjusted discount rate</b>

(1) It is easy to understand.
(2) It incorporates risk premium in the discounting factor.

<b>Limitations of Risk-adjusted discount rate</b>

(1) Difficulty in finding risk premium and risk-adjusted discount rate.
(2) Though NPV can be calculated but it is not possible to calculate Standard Deviation of a given project.`),
      },
      {
        ref: "Illustration 8",
        title: "If Investment proposal costs ₹ 45,00,000 and risk free rate is 5%, calculate net present value...",
        question: rt(String.raw`<b>Illustration 8</b>

If Investment proposal costs ₹ 45,00,000 and risk free rate is 5%, calculate net present value under certainty equivalent technique.

|  Year | Expected cash flow (₹) | Certainty Equivalent coefficient  |
| --- | --- | --- |
|  1 | 10,00,000 | 0.90  |
|  2 | 15,00,000 | 0.85  |
|  3 | 20,00,000 | 0.82  |
|  4 | 25,00,000 | 0.78  |`),
        solution: rt(String.raw`NPV = (10,00,000  x  (0.90)) / ((1.05)) + (15,00,000  x  (0.85)) / ((1.05)^2) + (20,00,000  x  (0.82)) / ((1.05)^3) + (25,00,000  x  (0.78)) / ((1.05)^4) - 45,00,000
= ₹ 5,34,570

<b>Advantages of Certainty Equivalent Method</b>

1. The certainty equivalent method is <b>simple and easy</b> to understand and apply.
2. It can <b>easily be calculated for different risk levels</b> applicable to different cash flows. For example, if in a particular year, a higher risk is associated with the cash flow, it can be easily adjusted and the NPV can be recalculated accordingly.

<b>Disadvantages of Certainty Equivalent Method</b>

1. There is <b>no objective</b> or mathematical method to estimate certainty equivalents. Certainty Equivalents are subjective and vary as per each individual's estimate.
2. Certainty equivalents are decided by the management based on their perception of risk. However, the <b>risk perception of the shareholders</b> who are the money lenders for the project is <b>ignored</b>. Hence, it is not used often in corporate decision making.

<b>Risk-adjusted Discount Rate Vs. Certainty-Equivalent</b>

Certainty Equivalent Method is superior to Risk Adjusted Discount Rate Method as it does not assume that risk increases with time at constant rate. Each year's Certainty Equivalent Coefficient is based on level of risk impacting its cash flow. Despite its soundness, it is not preferable like Risk Adjusted Discount Rate Method. It is difficult to specify a series of Certainty Equivalent Coefficients but simple to adjust discount rates.`),
      }
    ],
  other: [
      {
        ref: "Illustration 9",
        title: "X Ltd. is considering its new project with the following details: Sr. No. Particulars Figures -...",
        question: rt(String.raw`<b>Illustration 9</b>

X Ltd. is considering its new project with the following details:

|  Sr. No. | Particulars | Figures  |
| --- | --- | --- |
|  1 | Initial capital cost | ₹ 400 Cr.  |
|  2 | Annual unit sales | 5 Cr.  |
|  3 | Selling price per unit | ₹ 100  |
|  4 | Variable cost per unit | ₹ 50  |
|  5 | Fixed costs per year | ₹ 50 Cr.  |
|  6 | Discount Rate | 6%  |

<b>Required:</b>

1. Calculate the NPV of the project.
2. Compute the impact on the project's NPV considering a 2.5 per cent adverse variance in each variable. Which variable is having maximum effect?

Consider Life of the project as 3 years.`),
        solution: rt(String.raw`1. Calculation of Net Cash Inflow per year

|   | Particulars | Amount (₹)  |
| --- | --- | --- |
|  A | Selling price per unit | 100  |
|  B | Variable cost per unit | 50  |
|  C | Contribution per unit (A - B) | 50  |
|  D | Number of units sold per year | 5 Cr.  |
|  E | Total Contribution (C × D) | ₹ 250 Cr.  |
|  F | Fixed cost per year | ₹ 50 Cr.  |
|  G | Net cash inflow per year (E - F) | ₹ 200 Cr.  |

Calculation of Net Present Value (NPV) of the Project

|  Year | Year Cash Flow (₹ in Cr.) | PV factor @ 6% | Present Value (PV) (₹ in Cr.)  |
| --- | --- | --- | --- |
|  0 | (400.00) | 1.000 | (400.00)  |
|  1 | 200.00 | 0.943 | 188.60  |
|  2 | 200.00 | 0.890 | 178.00  |
|  3 | 200.00 | 0.840 | 168.00  |
|  Net Present Value |   |   | 134.60  |

Here, NPV represent the most likely outcomes and not the actual outcomes. The actual outcome can be lower or higher than the expected outcome.

2. Sensitivity Analysis considering 2.5 % Adverse Variance in each variable

|   | Particulars | Base | Initial capital cost increased to ₹ 410 crore | Selling Price per Unit Reduced to ₹ 97.5 | Variable Cost Per Unit increased to ₹ 51.25 | Fixed Cost Per Unit increased to ₹ 51.25 | Units sold per year reduced to 4.875 crore  |
| --- | --- | --- | --- | --- | --- | --- | --- |
|   |   |  (₹) | (₹) | (₹) | (₹) | (₹) | (₹)  |
|  A | Selling price per unit | 100 | 100 | 97.5 | 100 | 100 | 100  |
|  B | Variable cost per unit | 50 | 50 | 50 | 51.25 | 50 | 50  |
|  C | Contribution per unit (A - B) | 50 | 50 | 47.5 | 48.75 | 50 | 50  |
|   |  | (₹ in Cr.) | (₹ in Cr.) | (₹ in Cr.) | (₹ in Cr.) | (₹ in Cr.) | (₹ in Cr.)  |
|  D | Number of units sold per year (units in Crores) | 5 | 5 | 5 | 5 | 5 | 4.875  |
|  E | Total Contribution (C × D) | 250 | 250 | 237.5 | 243.75 | 250 | 243.75  |
|  F | Fixed cost per year | 50 | 50 | 50 | 50 | 51.25 | 50  |

|  G | Net Cash Inflow per year (E - F) | 200 | 200 | 187.5 | 193.75 | 198.75 | 193.75  |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  H | PV of Net cash Inflow per year (G × 2.673) | 534.60 | 534.60 | 501.19 | 517.89 | 531.26 | 517.89  |
|  I | Initial capital cost | 400 | 410 | 400 | 400 | 400 | 400  |
|  J | NPV (H - I) | 134.60 | 124.60 | 101.19 | 117.89 | 131.26 | 117.89  |
|  K | Percentage Change in NPV | - | -7.43% | -24.82% | -12.41% | -2.48% | -12.41%  |

The above table shows that by changing one variable at a time by 2.5% (adverse) while keeping the others constant, the impact in percentage terms on the NPV of the project can be calculated. Thus, the change in selling price has the maximum effect on the NPV by 24.82%.

<b>Advantages of Sensitivity Analysis:</b>

Following are the main advantages of Sensitivity Analysis:

(1) <b>Critical Issues</b>: This analysis identifies critical factors that impinge on a project's success or failure.

(2) <b>Simplicity</b>: It is a simple technique.

<b>Disadvantage of Sensitivity Analysis</b>

Following are the main disadvantages of Sensitivity Analysis:

(1) <b>Assumption of Independence</b>: This analysis assumes that all variables are independent i.e. they are not related to each other, which is unlikely in real life.

(2) <b>Ignore probability</b>: This analysis does not look to the probability of changes in the variables.`),
      },
      {
        ref: "Illustration 10",
        title: "XYZ Ltd. is considering a project “A” with an initial outlay of ₹ 14,00,000 and the possible th...",
        question: rt(String.raw`<b>Illustration 10</b>

XYZ Ltd. is considering a project “A” with an initial outlay of ₹ 14,00,000 and the possible three cash inflow attached with the project as follows:

|  Particulars | Year 1 | Year 2 | Year 3  |
| --- | --- | --- | --- |
|  Worst case | 450 | 400 | 700  |
|  Most likely | 550 | 450 | 800  |
|  Best case | 650 | 500 | 900  |

Assuming the cost of capital as 9%, determine NPV in each scenario. If XYZ Ltd is certain about the most likely result in first two years but uncertain about the third year's cash flow, analyze what will be the NPV expecting worst scenario in the third year.`),
        solution: rt(String.raw`The possible outcomes will be as follows:

|  Year | PVF @ 9% | Worst Case |   | Most likely |   | Best case  |   |
| --- | --- | --- | --- | --- | --- | --- | --- |
|   |   |  Cash Flow | PV | Cash Flow | PV | Cash Flow | PV  |
|   |  | (₹ '000) | (₹ '000) | (₹ '000) | (₹ '000) | (₹ '000) | (₹ '000)  |
|  0 | 1 | (1,400) | (1,400) | (1,400) | (1,400) | (1,400) | (1,400)  |
|  1 | 0.917 | 450 | 412.65 | 550 | 504.35 | 650 | 596.05  |
|  2 | 0.842 | 400 | 336.80 | 450 | 378.90 | 500 | 421.00  |
|  3 | 0.772 | 700 | 540.40 | 800 | 617.60 | 900 | 694.80  |
|  NPV |   |   | -110.15 |  | 100.85 |  | 311.85  |

If XYZ Ltd. is certain about the most likely result in first two years but uncertain about the third year's cash flow, then, NPV expecting worst case scenario is expected in the third year will be as follows:

= - ₹ 14,00,000 + (₹ 5,50,000) / ((1+0.09)) + (₹ 4,50,000) / ((1+0.09)^2) + (₹ 7,00,000) / ((1+0.09)^3)
= - ₹ 14,00,000 + ₹ 5,04,587 + ₹ 3,78,756 + ₹ 5,40,528 = ₹ 23,871

<b>Scenario Analysis Vs Sensitivity Analysis</b>

- Sensitivity analysis and Scenario analysis both help to understand the impact of the change in input variable on the outcome of the project. However, there are certain basic differences between the two.
- Sensitivity analysis calculates the impact of the change of a single input variable on the outcome of the project viz., NPV or IRR. The sensitivity analysis thus enables to identify that single critical variable which can impact the outcome in a huge way and the range of outcomes of the project given the change in the input variable.
- Scenario analysis, on the other hand, is based on a scenario. The scenario may be recession or a boom wherein depending on the scenario, all input variables change. Scenario Analysis calculates the outcome of the project considering this scenario where the variables have changed simultaneously. Similarly, the outcome of the project would also be considered for the normal and recessionary situation. The variability in the outcome under the three different scenarios would help the management to assess the risk a project carries. Higher deviation in the outcome can be assessed as higher risk and lower to medium deviation can be assessed accordingly.
- Scenario analysis is far more complex than sensitivity analysis because in scenario analysis all inputs are changed simultaneously, considering the situation in hand while in sensitivity analysis, only one input is changed and others are kept constant.`),
      },
      {
        ref: "Illustration 11",
        title: "L &amp; R Limited wishes to develop new virus-cleaner software. The cost of the pilot project w...",
        question: rt(String.raw`<b>Illustration 11</b>

L &amp; R Limited wishes to develop new virus-cleaner software. The cost of the pilot project would be ₹ 2,40,000. Presently, the chances of the product being successfully launched on a commercial scale are rated at 50%. In case it does succeed. L&amp;R can invest a sum of ₹ 20 lacs to market the product. Such an effort can generate perpetually, an annual net after tax cash income of ₹ 4 lacs. Even if the commercial launch fails, they can make an investment of a smaller amount of ₹ 12 lacs with the hope of gaining perpetually a sum of ₹ 1 lac. Evaluate the proposal, adopting decision tree approach. The discount rate is 10%.`),
        solution: rt(String.raw`Decision tree diagram is given below:

<b>Evaluation</b>

At Decision Point C: The choice is between investing ₹ 20 lacs for a perpetual benefit of ₹ 4 lacs and not to invest. The preferred choice is to invest, since the capitalized value of benefit of ₹ 4 lacs (at 10%) adjusted for the investment of ₹ 20 lacs, yields a net benefit of ₹ 20 lacs.

At Decision Point D: The choice is between investing ₹ 12 lacs, for a similar perpetual benefit of ₹ 1 lac. and not to invest. Here the invested amount is greater than capitalized value of benefit at ₹ 10 lacs. There is a negative benefit of ₹ 2 lacs. Therefore, it would not be prudent to invest.

At Outcome Point B: Evaluation of EMV is as under (₹ in lacs).

|  Outcome | Amount (₹) | Probability | Result (₹)  |
| --- | --- | --- | --- |
|  Success | 20.00 | 0.50 | 10.00  |
|  Failure | 0.00 | 0.50 | 00.00  |
|  Net result |  |  | 10.00  |

EMV at B is, therefore, ₹10 lacs.

At A: Decision is to be taken based on preferences between two alternatives. The first is to test, by investing ₹2,40,000 and reap a benefit of ₹ 10 lacs. The second is not to test, and thereby losing the opportunity of a possible gain.

The preferred choice is, therefore, investing a sum of ₹ 2,40,000 and undertaking the test.`),
      }
    ],
  replacement: [
      {
        ref: "Illustration 12",
        title: "A Company named Roby's cube decided to replace the existing Computer system of their organisati...",
        question: rt(String.raw`<b>Illustration 12</b>

A Company named Roby's cube decided to replace the existing Computer system of their organisation. Original cost of old system was ₹ 25,000 and it was installed 5 years ago. Current market value of old system is ₹ 5,000. Depreciation of the old system was charged with life of 10 years with Estimated Salvage value as Nil. Depreciation of the new system will be charged with life over 5 years. Present cost of the new system is ₹ 50,000. Estimated Salvage value of the new system is ₹ 1,000. Estimated cost savings with new system is ₹ 5,000 per year. Increase in sales with new system is assumed at 10% per year based on original total sales of ₹ 10,00,00. Company follows straight line method of depreciation. Cost of capital of the company is 10% whereas tax rate is 30%.`),
        solution: rt(String.raw`Step I. Net cash outflow (assumed at current time) [Present values of cost]:

a. (Book value of old system - market value of old system) × Tax Rate

= Tax payable/savings from sale
= [ ( ₹ 25,000 - 5  x  ₹ 2,500) - ₹ 5,000 ]  x  0.30 = ₹ 7,500  x  0.30
= ₹ 2,250

b. Cost of new system – [Tax payable/savings from sale + Market value of old system] = Net cash outflow

Or,

₵ 50,000 - [ ₹ 2,250 + ₹ 5,000 ] = ₹ 42,750

Step II. Estimated change in cash flows per year if replacement decision is implemented.

Change in cash flow = [(Change in sales ± Change in operating costs)-Change in depreciation)] (1-tax rate) + Change in depreciation

= [ ₹ 1,00,000  x  0.1 + ₹ 5,000 - ( ₹ 49,000/5 - ₹ 25,000/10 ) ] (1-0.30) + ( ₹ 49,000/5 - ₹ 25000/10 )
= ₹ 12,690

Step III. Present value of benefits = Present value of yearly cash flows + Present value of estimated salvage of new system

= ₹ 12,690  x  PVIFA (10%, 5) + ₹ 1,000  x  PVIF (10%, 5)
= ₹ 48,723

Step IV. Net present value = Present value of benefits - Present value of costs

= ₹ 48,723 - ₹ 42,750
= ₹ 5,973

Step V. Decision rule: Since NPV is positive we should accept the proposal to replace the machine.`),
      },
      {
        ref: "Illustration 13",
        title: "X Ltd. is a taxi operator. Each taxi cost to company ₹ 4,00,000 and has a useful life of 3 year...",
        question: rt(String.raw`<b>Illustration 13</b>

X Ltd. is a taxi operator. Each taxi cost to company ₹ 4,00,000 and has a useful life of 3 years. The taxi's operating cost for each of 3 years and salvage value at the end of year is as follows:

|   | Year 1 | Year 2 | Year 3  |
| --- | --- | --- | --- |
|  Operating Cost | ₹ 1,80,000 | ₹ 2,10,000 | ₹ 2,38,000  |
|  Resale Value | ₹ 2,80,000 | ₹ 2,30,000 | ₹ 1,68,000  |

You are required to determine the optimal replacement period of taxi if cost of capital of X Ltd. is 10%.`),
        solution: rt(String.raw`<b>NPV if taxi is kept for 1 Year</b>

= - ₹ 4,00,000 - ₹ 1,80,000 (0.909) + ₹ 2,80,000 (0.909)
= - ₹ 3,09,100

<b>NPV if taxi is kept for 2 Year</b>

= - ₹ 4,00,000 - ₹ 1,80,000  x  0.909 + ₹ 20,000  x  0.826
= - ₹ 5,47,100

<b>NPV if taxi is kept for 3 Year</b>

= - ₹ 4,00,000 - ₹ 1,80,000  x  0.909 - ₹ 2,10,000  x  0.826 - ₹ 70,000  x  0.751
= - ₹ 7,89,650

Since above NPV figures relate to different periods, there are not comparable. to make them comparable we shall use concept of EAC as follows:

<b>EAC of 1 year</b>

(3,09,100) / (0.909) = ₹ 3,40,044

<b>EAC of 2 year</b>

(5,47,100) / (1.735) = ₹ 3,15,331

<b>EAC of 3 year</b>

(7,89,650) / (2.486) = ₹ 3,17,639

Since lowest EAC incur if taxi for 2 year; Hence the optimum replacement cycle to replace taxi in 2 years.`),
      }
    ],
};

const theoreticalTyk = [
      {
        ref: "TYK Theory Q1",
        title: "1. Write short note on Certainty Equivalent Approach.",
        question: rt(String.raw`1. Write short note on Certainty Equivalent Approach.`),
        solution: rt(String.raw`1. This approach recognizes risk in capital budgeting analysis by adjusting estimated cash flows and employs risk free rate to discount the adjusted cash-flows. Under this method, the expected cash flows of the project are converted to equivalent riskless amounts. The greater

the risk of an expected cash flow, the smaller the certainty equivalent values for receipts and longer the CE value for payment. This approach is superior to the risk adjusted discounted approach as it can measure risk more accurately.

This is yet another approach for dealing with risk in capital budgeting to reduce the forecasts of cash flows to some conservative levels. In certainty Equivalent approach we incorporate risk to adjust the cash flows of a proposal so as to reflect the risk element. The certainty Equivalent approach adjusts future cash flows rather than discount rates. This approach explicitly recognizes risk, but the procedure for reducing the forecasts of cash flows is implicit and likely to be inconsistent from one investment to another.`),
      },
      {
        ref: "TYK Theory Q2",
        title: "2. What is the sensitivity analysis in Capital Budgeting?",
        question: rt(String.raw`2. What is the sensitivity analysis in Capital Budgeting?`),
        solution: rt(String.raw`2. Sensitivity analysis is used in Capital budgeting for more precisely measuring the risk. It helps in assessing information as to how sensitive are the estimated parameters of the project such as cash flows, discount rate, and the project life to the estimation errors. Future being always uncertain and estimations are always subject to error, sensitivity analysis takes care of estimation errors by using a number of possible outcomes in evaluating a project. The methodology adopted in sensitivity analysis is to evaluate a project by using a number of estimated cash flows so as to provide to the decision maker an insight into the variability of outcome. Thus, it is a technique of risk analysis which studies the responsiveness of a criterion of merit like NPV or IRR to variation in underlying factors like selling price, quantity sold, returns from an investment etc.

Sensitivity analysis answers questions like,

(i) What happens to the present value (or some other criterion of merit) if flows are, say ₹ 50,000 than the expected ₹ 80,000?
(ii) What will happen to NPV if the economic life of the project is only 3 years rather than expected 5 years?

Therefore, wherever there is an uncertainty, of whatever type, the sensitivity analysis plays a crucial role. However, it should not be viewed as the method to remove the risk or uncertainty, it is only a tool to analyse and measure the risk and uncertainty. In terms of capital budgeting the possible cash flows are based on three assumptions:

(a) Cash flows may be worst (pessimistic)
(b) Cash flows may be most likely.
(c) Cash flows may be most optimistic.

Sensitivity analysis involves three steps

(1) Identification of all those variables having an influence on the project's NPV or IRR.
(2) Definition of the underlying quantitative relationship among the variables.
(3) Analysis of the impact of the changes in each of the variables on the NPV of the`),
      },
      {
        ref: "TYK Theory Q3",
        title: "3. Write a note on project appraisal under inflationary conditions.",
        question: rt(String.raw`3. Write a note on project appraisal under inflationary conditions.`),
        solution: rt(String.raw`project.

The decision maker, in sensitivity analysis always asks himself the question – what if?

3. Project Appraisal normally involves feasibility evaluation from technical, commercial, economic and financial aspects. It is generally an exercise in measurement and analysis of cash flows expected to occur over the life of the project. The project cash outflows usually occur initially and inflows come in the future.

During inflationary conditions, the project cost increases on all heads viz. labour, raw material, fixed assets such as equipments, plant and machinery, building material, remuneration of technicians and managerial personnel etc. Beside this, inflationary conditions erode purchasing power of consumers and affect the demand pattern. Thus, not only cost of production but also the projected statement of profitability and cash flows are affected by the change in demand pattern. Even financial institutions and banks may revise their lending rates resulting in escalation in financing cost during inflationary conditions. Under such circumstances, project appraisal has to be done generally keeping in view the following guidelines which are usually followed by government agencies, banks and financial institutions.

(i) It is always advisable to make provisions for cost escalation on all heads of cost, keeping in view the rate of inflation during likely period of delay in project implementation.

(ii) The various sources of finance should be carefully scrutinized with reference to probable revision in the rate of interest by the lenders and the revision which could be affected in the interest-bearing securities to be issued. All these factors will push up the cost of funds for the organization.

(iii) Adjustments should be made in profitability and cash flow projections to take care of the inflationary pressures affecting future projections.

(iv) It is also advisable to examine the financial viability of the project at the revised rates and assess the same with reference to economic justification of the project. The appropriate measure for this aspect is the economic rate of return for the project which will equate the present value of capital expenditures to net cash flows over the life of the projects. The rate of return should be acceptable which also accommodates the rate of inflation per annum.

(v) In an inflationary situation, projects having early payback periods should be preferred because projects with long payback period are riskier.

Under conditions of inflation, the project cost estimates that are relevant for a future date will suffer escalation. Inflationary conditions will tend to initiate the measurement of future cash flows. Either of the following two approaches may be used while appraising projects under such conditions:

(a) Adjust each year's cash flows to an inflation index, recognizing selling price increases and cost increases annually; or
(b) Adjust the 'Acceptance Rate' (cut-off) suitably retaining cash flow projections at current price levels.

An example of approach (ii) above can be as follows:

Normal Acceptance Rate : 15.0%
Expected Annual Inflation : 5.0%
Adjusted Discount Rate : 15.0 × 1.05 or 15.75%

It must be noted that measurement of inflation has no standard approach nor is easy. This makes the job of appraisal a difficult one under such conditions.`),
      },
      {
        ref: "TYK Theory Q4",
        title: "4. Explain the steps involved in Simulation Analysis.",
        question: rt(String.raw`4. Explain the steps involved in Simulation Analysis.`),
        solution: rt(String.raw`4. Please refer paragraph 4.3.3`),
      }
    ];

const practicalTyk = [
      {
        ref: "TYK Practical Q1",
        title: "1. Skylark Airways is planning to acquire a light commercial aircraft for flying class clients...",
        question: rt(String.raw`1. Skylark Airways is planning to acquire a light commercial aircraft for flying class clients at an investment of ₹ 50,00,000. The expected cash flow after tax for the next three years is as follows: (₹)

|  Year 1 |   | Year 2 |   | Year 3  |   |
| --- | --- | --- | --- | --- | --- |
|  CFAT | Probability | CFAT | Probability | CFAT | Probability  |
|  14,00,000 | 0.1 | 15,00,000 | 0.1 | 18,00,000 | 0.2  |
|  18,00,000 | 0.2 | 20,00,000 | 0.3 | 25,00,000 | 0.5  |
|  25,00,000 | 0.4 | 32,00,000 | 0.4 | 35,00,000 | 0.2  |
|  40,00,000 | 0.3 | 45,00,000 | 0.2 | 48,00,000 | 0.1  |

The Company wishes to take into consideration all possible risk factors relating to airline

operations. The company wants to know:

(i) The expected NPV of this venture assuming independent probability distribution with 6 per cent risk free rate of interest.
(ii) The possible deviation in the expected value.
(iii) How would standard deviation of the present value distribution help in Capital Budgeting decisions?`),
        solution: rt(String.raw`<b>1. (i) Expected NPV</b>

(₹ in lakhs)

|  Year I |   |   | Year II |   |   | Year III  |   |   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  CFAT | P | CF×P | CFAT | P | CF×P | CFAT | P | CF×P  |
|  14 | 0.1 | 1.4 | 15 | 0.1 | 1.5 | 18 | 0.2 | 3.6  |
|  18 | 0.2 | 3.6 | 20 | 0.3 | 6.0 | 25 | 0.5 | 12.5  |
|  25 | 0.4 | 10.0 | 32 | 0.4 | 12.8 | 35 | 0.2 | 7.0  |
|  40 | 0.3 | 12.0 | 45 | 0.2 | 9 | 48 | 0.1 | 4.8  |
|   | x or CF | 27.0 |  | x or CF | 29.3 |  |  | x or CF 27.9  |

|  NPV | PV factor @ 6% | Total PV  |
| --- | --- | --- |
|  27 | 0.943 | 25.461  |
|  29.3 | 0.890 | 26.077  |
|  27.9 | 0.840 | 23.436  |
|   | PV of cash inflow | 74.974  |
|   | Less: Cash outflow | 50.000  |
|   | NPV | 24.974  |

<b>(ii) Possible deviation in the expected value</b>

|  Year I  |   |   |   |   |
| --- | --- | --- | --- | --- |
|  X - X̄ | X - X̄ | (X - X̄)² | P₁ | (X - X̄)² P¹  |
|  14 - 27 | -13 | 169 | 0.1 | 16.9  |
|  18 - 27 | -9 | 81 | 0.2 | 16.2  |

|  25 – 27 | -2 | 4 | 0.4 | 1.6  |
| --- | --- | --- | --- | --- |
|  40 – 27 | 13 | 169 | 0.3 | 50.7  |
|   |  |  |  | 85.4  |

$$sigma_1 = sqrt85.4 = 9.241$$

|  Year II  |   |   |   |   |
| --- | --- | --- | --- | --- |
|  X - X̄ | X - X̄ | (X - X̄)² | P₂ | (X - X̄)² × P₂  |
|  15-29.3 | -14.3 | 204.49 | 0.1 | 20.449  |
|  20-29.3 | -9.3 | 86.49 | 0.3 | 25.947  |
|  32-29.3 | 2.7 | 7.29 | 0.4 | 2.916  |
|  45-29.3 | 15.7 | 246.49 | 0.2 | 49.298  |
|   |  |  |  | 98.61  |

$$sigma_2 = sqrt98.61 = 9.930$$

|  Year III  |   |   |   |   |
| --- | --- | --- | --- | --- |
|  X - X̄ | X - X̄ | (X - X̄)² | P₃ | (X - X̄)² × P₃  |
|  18-27.9 | -9.9 | 98.01 | 0.2 | 19.602  |
|  25-27.9 | -2.9 | 8.41 | 0.5 | 4.205  |
|  35-27.9 | 7.1 | 50.41 | 0.2 | 10.082  |
|  48-27.9 | 20.1 | 404.01 | 0.1 | 40.401  |
|   |  |  |  | 74.29  |

$$sigma_3 = sqrt74.29 = 8.619$$

Standard deviation about the expected value:

$$sigma = sqrt(85.4) / ((1.06)^2) + (98.61) / ((1.06)^4) + (74.29) / ((1.06)^6) = 14.3696$$

(iii) Standard deviation is a statistical measure of dispersion; it measures the deviation from a central number i.e. the mean.

In the context of capital budgeting decisions especially where we take up two or more projects giving somewhat similar mean cash flows, by calculating standard deviation in such cases, we can measure in each case the extent of variation. It can then be used to identify which of the projects is least risky in terms of variability of cash flows.

A project, which has a lower coefficient of variation will be preferred if sizes are heterogeneous.

Besides this, if we assume that probability distribution is approximately normal we are able to calculate the probability of a capital budgeting project generating a net present value less than or more than a specified amount.`),
      },
      {
        ref: "TYK Practical Q2",
        title: "2. Cyber Company is considering two mutually exclusive projects. Investment outlay of both the...",
        question: rt(String.raw`2. Cyber Company is considering two mutually exclusive projects. Investment outlay of both the projects is ₹ 5,00,000 and each is expected to have a life of 5 years. Under three possible situations their annual cash flows and probabilities are as under:

|   |  | Cash Flow (₹)  |   |
| --- | --- | --- | --- |
|  Situation | Probabilities | Project A | ProjectB  |
|  Good | 0.3 | 6,00,000 | 5,00,000  |
|  Normal | 0.4 | 4,00,000 | 4,00,000  |
|  Worse | 0.3 | 2,00,000 | 3,00,000  |

The cost of capital is 7 per cent, which project should be accepted? Explain with workings.`),
        solution: rt(String.raw`<b>2. Project A</b>

Expected Net Cash flow (ENCF)

0.3 (6,00,000) + 0.4 (4,00,000) + 0.3 (2,00,000) = 4,00,000

sigma^2 = 0.3 (6,00,000 - 4,00,000)^2 + 0.4 (4,00,000 - 4,00,000)^2 + 0.3 (2,00,000 - 4,00,000)^2

sigma = sqrt24,00,00,00,000

sigma = 1,54,919.33

Present Value of Expected Cash Inflows = 4,00,000 × 4.100 = 16,40,000

NPV = 16,40,000 - 5,00,000 = 11,40,000

<b>Project B</b>

ENCF = 0.3 (5,00,000) + 0.4 (4,00,000) + 0.3 (3,00,000) = 4,00,000

sigma^2 = 0.3 (5,00,000 - 4,00,000)^2 + 0.4 (4,00,000 - 4,00,000)^2 + 0.3 (3,00,000 - 4,00,000)^2

sigma = sqrt6,00,00,00,000

sigma = 77,459.66

Present Value of Expected Cash Inflows = 4,00,000 × 4.100 = 16,40,000

NPV = 16,40,000 - 5,00,000 = 11,40,000

<b>Recommendation</b>: NPV in both projects being the same, the project should be decided on the basis of standard deviation and hence project 'B' should be accepted having lower standard deviation, means less risky.`),
      },
      {
        ref: "TYK Practical Q3",
        title: "3. A company is considering Projects X and Y with following information: Project Expected NPV (...",
        question: rt(String.raw`3. A company is considering Projects X and Y with following information:

|  Project | Expected NPV (₹) | Standard deviation  |
| --- | --- | --- |
|  X | 1,22,000 | 90,000  |
|  Y | 2,25,000 | 1,20,000  |

(i) Which project will you recommend based on the above data?
(ii) Explain whether your opinion will change, if you use coefficient of variation as a measure of risk.
(iii) Which measure is more appropriate in this situation and why?`),
        solution: rt(String.raw`<b>3. (i) On the basis of standard deviation project X be chosen because it is less risky than Project Y having higher standard deviation.</b>

CV_x = (SD) / (ENPV) = (90,000) / (1,22,000) = 0.738

CV_y = (1,20,000) / (2,25,000) = 0.533

On the basis of Co-efficient of Variation (C.V.) Project X appears to be riskier and hence Y should be accepted.

(iii) However, the NPV method in such conflicting situation is best because the NPV method is in compatibility of the objective of wealth maximisation in terms of time value.`),
      },
      {
        ref: "TYK Practical Q4",
        title: "4. KLM Ltd., is considering taking up one of the two projects-Project-K and Project-So Both the...",
        question: rt(String.raw`4. KLM Ltd., is considering taking up one of the two projects-Project-K and Project-So Both the projects having same life require equal investment of ₹ 80 lakhs each. Both are estimated to have almost the same yield. As the company is new to this type of business, the cash flow arising from the projects cannot be estimated with certainty. An attempt was therefore, made to use probability to analyse the pattern of cash flow from other projects during the first year of operations. This pattern is likely to continue during the life of these projects. The results of the analysis are as follows:

|  Project K |   | Project S  |   |
| --- | --- | --- | --- |
|  Cash Flow (in ₹) | Probability | Cash Flow (in ₹) | Probability  |
|  11 | 0.10 | 09 | 0.10  |
|  13 | 0.20 | 13 | 0.25  |

|  15 | 0.40 | 17 | 0.30  |
| --- | --- | --- | --- |
|  17 | 0.20 | 21 | 0.25  |
|  19 | 0.10 | 25 | 0.10  |

<b>Required:</b>

(i) Calculate variance, standard deviation and co-efficient of variance for both the projects.
(ii) Which of the two projects is riskier?`),
        solution: rt(String.raw`<b>4. Calculation of Variance and Standard Deviation</b>

<b>Project K</b>

Expected Net Cash Flow

= (0.10  x  11) + (0.20  x  13) + (0.40  x  15) + (0.20  x  17) + (0.10  x  19)
= 1.1 + 2.6 + 6 + 3.4 + 1.9 = 15

sigma^2 = 0.10(11 - 15)^2 + 0.20(13 - 15)^2 + 0.40(15 - 15)^2 + 0.20(17 - 15)^2 + 0.10(19 - 15)^2
= 1.6 + 0.8 + 0 + 0.8 + 1.6 = 4.8

sigma = sqrt4.8 = 2.19

<b>Project S</b>

Expected Net Cash Flow

= (0.10  x  9) + (0.25  x  13) + (0.30  x  17) + (0.25  x  21) + (0.10  x  25)
= 0.9 + 3.25 + 5.1 + 5.25 + 2.5 = 17

sigma^2 = 0.1(9 - 17)^2 + 0.25(13 - 17)^2 + 0.30(17 - 17)^2 + 0.25(21 - 17)^2 + 0.10(25 - 17)^2
= 6.4 + 4 + 0 + 4 + 6.4 = 20.8

sigma = sqrt20.8 = 4.56

<b>Calculation of Coefficient of Variation</b>

Coefficient of Variation = (Standard Deviation) / (Mean)

Project K = (2.19) / (15) = 0.146

Project S = (4.56) / (17) = 0.268

Project S is riskier as it has higher Coefficient of Variation.`),
      },
      {
        ref: "TYK Practical Q5",
        title: "5. Project X and Project Y are under the evaluation of XY Co. The estimated cash flows and thei...",
        question: rt(String.raw`5. Project X and Project Y are under the evaluation of XY Co. The estimated cash flows and their probabilities are as below:

Project X : Investment (year 0) ₹ 70 lakhs

|  Probability weights | 0.30 | 0.40 | 0.30  |
| --- | --- | --- | --- |
|  Years | ₹ lakhs | ₹ lakhs | ₹ lakhs  |
|  1 | 30 | 50 | 65  |
|  2 | 30 | 40 | 55  |
|  3 | 30 | 40 | 45  |

Project Y: Investment (year 0) ₹ 80 lakhs.

|  Probability weighted | Annual cash flows through life  |
| --- | --- |
|   | ₹ lakhs  |
|  0.20 | 40  |
|  0.50 | 45  |
|  0.30 | 50  |

(a) Which project is better based on NPV, criterion with a discount rate of 10%?
(b) Compute the standard deviation of the present value distribution and analyse the inherent risk of the projects.`),
        solution: rt(String.raw`<b>5. (a) Calculation of NPV of XY Co.:</b>

|  Project X |   | Cash flow | PVF | PV  |
| --- | --- | --- | --- | --- |
|  Year |  |  |  |   |
|  1 | (30 × 0.3) + (50 × 0.4) + (65 × 0.3) | 48.5 | 0.909 | 44.09  |

|  2 | (30 × 0.3) + (40 × 0.4) + (55 × 0.3) | 41.5 | 0.826 | 34.28  |
| --- | --- | --- | --- | --- |
|  3 | (30 × 0.3) + (40 × 0.4) + (45 × 0.3) | 38.5 | 0.751 | 28.91  |
|   |  |  |  | 107.28  |
|   | NPV: (107.28 – 70.00) = |  |  | (+) 37.28  |

Project Y (For 1-3 Years)

|  1-3 | (40 × 0.2) + (45 × 0.5) + (50 × 0.3) | 45.5 | 2.487 | 113.16  |
| --- | --- | --- | --- | --- |
|   | NPV (113.16 – 80.00) |  |  | (+) 33.16  |

(b) Calculation of Standard deviation $sigma$

As per Hiller’s model

M = Sum_i=0^n (1+r)^-1 Mi

sigma^2 = Sum_i=0^n (1+r)^-2i sigma_i^2

Hence

Project X

Year

1. $sqrt(30 - 48.5)^2 0.30 + (50 - 48.5)^2 0.40 + (65 - 48.5)^2 0.30 = sqrt185.25 = 13.61$

2. $sqrt(30 - 41.5)^2 0.30 + (40 - 41.5)^2 0.40 + (55 - 41.5)^2 0.30 = sqrt95.25 = 9.76$

3. $sqrt(30 - 38.5)^2 0.30 + (40 - 38.5)^2 0.40 + (45 - 38.5)^2 0.30 = sqrt35.25 = 5.94$

Standard Deviation about the expected value

&amp;= sqrt(185.25) / ((1 + 0.10)^2) + (95.25) / ((1 + 0.10)^4) + (35.25) / ((1 + 0.10)^6)
&amp;= sqrt(185.25) / (1.21) + (95.25) / (1.4641) + (35.25) / (1.7716) = sqrt153.10 + 65.06 + 19.90
&amp;= sqrt238.06 = 15.43

Project Y (For 1-3 Years)

sqrt(40 - 45.5)^2  x  0.20 + (45 - 45.5)^2  x  0.50 + (50 - 45.5)^2  x  0.30 = sqrt12.25 = 3.50

Standard Deviation about the expected value

= sqrt(12.25) / ((1 + 0.10)^2) + (12.25) / ((1 + 0.10)^4) + (12.25) / ((1 + 0.10)^6)
= sqrt(12.25) / (1.21) + (12.25) / (1.4641) + (12.25) / (1.7716) = sqrt10.12 + 8.37 + 6.91
= sqrt25.4 = 5.03

*Analysis:* Project Y is less risky as its Standard Deviation is less than Project X.`),
      },
      {
        ref: "TYK Practical Q6",
        title: "6. Shivam Ltd. is considering two mutually exclusive projects A and B. Project A costs ₹ 36,000...",
        question: rt(String.raw`6. Shivam Ltd. is considering two mutually exclusive projects A and B. Project A costs ₹ 36,000 and project B ₹ 30,000. You have been given below the net present value probability distribution for each project.

|  Project A |   | Project B  |   |
| --- | --- | --- | --- |
|  NPV estimates (₹) | Probability | NPV estimates (₹) | Probability  |
|  15,000 | 0.2 | 15,000 | 0.1  |
|  12,000 | 0.3 | 12,000 | 0.4  |
|  6,000 | 0.3 | 6,000 | 0.4  |
|  3,000 | 0.2 | 3,000 | 0.1  |

(i) Compute the expected net present values of projects A and B.
(ii) Compute the risk attached to each project i.e. standard deviation of each probability distribution.
(iii) Compute the profitability index of each project.
(iv) Which project do you recommend? State with reasons.`),
        solution: rt(String.raw`6. (i) Statement showing computation of expected net present value of Projects A and B:

|  Project A |   |   | Project B  |   |   |
| --- | --- | --- | --- | --- | --- |
|  NPV Estimate (₹) | Probability | Expected Value | NPV Estimate | Probability | Expected Value  |
|  15,000 | 0.2 | 3,000 | 15,000 | 0.1 | 1,500  |
|  12,000 | 0.3 | 3,600 | 12,000 | 0.4 | 4,800  |
|  6,000 | 0.3 | 1,800 | 6,000 | 0.4 | 2,400  |
|  3,000 | 0.2 | 600 | 3,000 | 0.1 | 300  |
|   | 1.0 | EV = 9,000 |  | 1.0 | EV = 9,000  |

(ii) Computation of Standard deviation of each project

Project A

|  P | X | (X - EV) | P (X - EV)^{2}  |
| --- | --- | --- | --- |
|  0.2 | 15,000 | 6,000 | 72,00,000  |
|  0.3 | 12,000 | 3,000 | 27,00,000  |
|  0.3 | 6,000 | - 3,000 | 27,00,000  |
|  0.2 | 3,000 | - 6,000 | 72,00,000  |
|   |  |  | Variance = 1,98,00,000  |

Standard Deviation of Project A = $sqrt1,98,00,000 = ₹ 4,450$

Project B

|  P | X | (X - EV) | P (X - EV)^{2}  |
| --- | --- | --- | --- |
|  0.1 | 15,000 | 6,000 | 36,00,000  |

|  0.4 | 12,000 | 3,000 | 36,00,000  |
| --- | --- | --- | --- |
|  0.4 | 6,000 | - 3,000 | 36,00,000  |
|  0.1 | 3,000 | - 6,000 | 36,00,000  |
|   |  |  | Variance = 1,44,00,000  |

Standard Deviation of Project A = $sqrt1,44,00,000 = ¶ 3,795$

<b>(iii) Computation of profitability of each project</b>

Profitability index = Discount cash inflow / Initial outlay

In case of Project A: PI = $(9,000 + 36,000) / (36,000) = (45,000) / (36,000) = 1.25$

In case of Project B: PI = $(9,000 + 30,000) / (30,000) = (39,000) / (30,000) = 1.30$

<b>(iv) Measurement of risk is made by the possible variation of outcomes around the expected value and the decision will be taken in view of the variation in the expected value where two projects have the same expected value, the decision will be the project which has smaller variation in expected value. In the selection of one of the two projects A and B, Project B is preferable because the possible profit which may occur is subject to less variation (or dispersion). Much higher risk is lying with project A.</b>`),
      },
      {
        ref: "TYK Practical Q7",
        title: "7. Following are the estimates of the net cash flows and probability of a new project of M/s X...",
        question: rt(String.raw`7. Following are the estimates of the net cash flows and probability of a new project of M/s X Ltd.:

|   | Year | P = 0.3 | P = 0.5 | P = 0.2  |
| --- | --- | --- | --- | --- |
|  Initial investment | 0 | 4,00,000 | 4,00,000 | 4,00,000  |
|  Estimated net after tax cash inflows per year | 1 to 5 | 1,00,000 | 1,10,000 | 1,20,000  |
|  Estimated salvage value (after tax) | 5 | 20,000 | 50,000 | 60,000  |

Required rate of return from the project is 10%. Find:

(i) The expected NPV of the project.
(ii) The best case and the worst case NPVs.
(iii) The probability of occurrence of the worst case if the cash flows are perfectly dependent overtime and independent overtime.
(iv) Standard deviation and coefficient of variation assuming that there are only three streams of cash flow, which are represented by each column of the table with the given probabilities.
(v) Coefficient of variation of X Ltd. on its average project which is in the range of 0.95 to 1.0. If the coefficient of variation of the project is found to be less risky than average, 100 basis points are deducted from the Company's cost of Capital

Should the project be accepted by X Ltd?`),
        solution: rt(String.raw`<b>7. (a)(i) Expected cash flows:-</b>

|  Year |  |  | Net cash flows | P.V. | PV. @ 10%  |
| --- | --- | --- | --- | --- | --- |
|  0 | (4,00,000 x 1) | = | (-)4,00,000 | 1.000 | (-)4,00,000  |
|  1 to 4 | (1,00,000x0.3+1,10,000x0.5 + 1,20,000 x 0.2) | = | 1,09,000 | 3.170 | 3,45,530  |
|  5 | [1,09,000 + (20,000 x 0.3 + 50,000 x 0.5 + 60,000 x 0.2)] | = | 1,52,000 | 0.621 | 94,392  |
|   |  |  | NPV= |  | 39,922  |

<b>(ii) ENPV of the worst case</b>

1,00,000 x 3.790 = ¶ 3,79,000 (Students may have 3.791 also the values will change accordingly)

20,000 x 0.621 = ¶ 12,420/-

ENPV = (-) 4,00,000 + 3,79,000 + 12,420 = (-) ¶ 8,580/-

ENPV of the best case

ENPV = (-) 4,00,000 + 1,20,000 x 3.790 + 60,000 x 0.621 = ¶ 92,060/-.

(iii) (a) Required probability = 0.3
(b) Required probability = $(0.3)^5 = 0.00243$

(iv) The base case NPV = (-) 4,00,000 + (1,10,000 x 3.79) + (50,000 x 0.621)

= ₹ 47,950/-

ENPV = 0.30  x  (-) 8580 + 0.5  x  47950 + 92060  x  0.20 = ₹ 39,813/-

Therefore,

sigma_ENPV = sqrt0.3(-8580 - 39,813)^2 + 0.5(47950 - 39813)^2 + 0.2(92,060 - 39,813)^2 = ₹ 35,800/-

Therefore, CV = 35,800/39,813 = 0.90

(v) Risk adjusted out of cost of capital of X Ltd. = 10% - 1% = 9%.

NPV

|  Year | Expected net cash flow | PV @ 9% |   |
| --- | --- | --- | --- |
|  0 | (-) 4,00,000 | 1.000 | (-) 4,00,000  |
|  1 to 4 | 1,09,000 | 3.240 | 3,53,160  |
|  5 | 1,52,000 | 0.650 | 98,800  |
|   |  | ENPV = | 51,960  |

Therefore, the project should be accepted.`),
      },
      {
        ref: "TYK Practical Q8",
        title: "8. XY Ltd. has under its consideration a project with an initial investment of ₹ 1,00,000. Thre...",
        question: rt(String.raw`8. XY Ltd. has under its consideration a project with an initial investment of ₹ 1,00,000. Three probable cash inflow scenarios with their probabilities of occurrence have been estimated as below:

|  Annual cash inflow (₹) | 20,000 | 30,000 | 40,000  |
| --- | --- | --- | --- |
|  Probability | 0.1 | 0.7 | 0.2  |

The project life is 5 years and the desired rate of return is 20%. The estimated terminal values for the project assets under the three probability alternatives, respectively, are ₹ 0, 20,000 and 30,000.

You are required to:

(i) Find the probable NPV;
(ii) Find the worst-case NPV and the best-case NPV; and
(iii) State the probability occurrence of the worst case, if the cash flows are perfectly positively correlated over time.`),
        solution: rt(String.raw`8. The expected cash flows of the project are as follows:

|  Year | Pr = 0.1 | Pr = 0.7 | Pr = 0.2 | Total  |
| --- | --- | --- | --- | --- |
|   | ₹ | ₹ | ₹ | ₹  |
|  0 | -10,000 | -70,000 | -20,000 | -1,00,000  |
|  1 | 2,000 | 21,000 | 8,000 | 31,000  |
|  2 | 2,000 | 21,000 | 8,000 | 31,000  |
|  3 | 2,000 | 21,000 | 8,000 | 31,000  |
|  4 | 2,000 | 21,000 | 8,000 | 31,000  |
|  5 | 2,000 | 21,000 | 8,000 | 31,000  |
|  5 | 0 | 14,000 | 6,000 | 20,000  |

(i) NPV based on expected cash flows would be as follows:

= - ₹ 1,00,000 + (₹ 31,000) / ((1 + 0.20)^1) + (₹ 31,000) / ((1 + 0.20)^2) + (₹ 31,000) / ((1 + 0.20)^3) + (₹ 31,000) / ((1 + 0.20)^4) + (₹ 31,000) / ((1 + 0.20)^5) + (₹ 20,000) / ((1 + 0.20)^5)
= - ₹ 1,00,000 + ₹ 25,833.33 + ₹ 21,527.78 + ₹ 17,939.81 + ₹ 14,949.85 + ₹ 12,458.20 +

₹ 8,037.55
NPV = ₹ 746.52

(ii) For the worst case, the cash flows from the cash flow column farthest on the left are used to calculate NPV

= - ₹ 100,000 + (₹ 20,000) / ((1 + 0.20)^1) + (₹ 20,000) / ((1 + 0.20)^2) + (₹ 20,000) / ((1 + 0.20)^3) + (₹ 20,000) / ((1 + 0.20)^4) + (₹ 20,000) / ((1 + 0.20)^5)
= - ₹ 100,000 + ₹ 16,666.67 + ₹ 13,888.89 + ₹ 11,574.07 + ₹ 9,645.06 + ₹ 8037.76
NPV = - ₹ 40,187.76

For the best case, the cash flows from the cash flow column farthest on the right are used to calculated NPV

= - ₹ 100,000 + (₹ 40,000) / ((1 + 0.20)^1) + (₹ 40,000) / ((1 + 0.20)^2) + (₹ 40,000) / ((1 + 0.20)^3) + (₹ 40,000) / ((1 + 0.20)^4) + (₹ 40,000) / ((1 + 0.20)^5) + (₹ 30,000) / ((1 + 0.20)^5)
= - ₹ 1,00,000 + ₹ 33,333.33 + ₹ 27,777.78 + ₹ 23,148.15 + ₹ 19,290.12 + ₹ 16,075.10 + ₹ 12,056.33
NPV = ₹ 31,680.81

(iii) If the cash flows are perfectly dependent, then the low cash flow in the first year will mean a low cash flow in every year. Thus, the possibility of the worst case occurring is the probability of getting ₹ 20,000 net cash flow in year 1 is 10%.`),
      },
      {
        ref: "TYK Practical Q9",
        title: "9. XYZ Ltd. is considering a project for which the following estimates are available: ₹ --- ---...",
        question: rt(String.raw`9. XYZ Ltd. is considering a project for which the following estimates are available:

|   | ₹  |
| --- | --- |
|  Initial Cost of the project | 10,00,000  |
|  Sales price/unit | 60  |
|  Cost/unit | 40  |
|  Sales volumes |   |
|  Year 1 | 20000 units  |
|  Year 2 | 30000 units  |
|  Year 3 | 30000 units  |

Discount rate is 10% p.a.

You are required to measure the sensitivity of the project in relation to each of the following parameters:

(a) Sales Price/unit
(b) Unit cost
(c) Sales volume
(d) Initial outlay and
(e) Project lifetime

Taxation may be ignored.`),
        solution: rt(String.raw`<b>9. Calculation of NPV</b>

NPV = - 10,00,000 + (20,000  x  20) / (1.1) + (30,000  x  20) / (1.21) + (30,000  x  20) / (1.331)
= - 10,00,000 + 3,63,636 + 4,95,868 + 4,50,789
= 13,10,293 - 10,00,000
= ₹ 3,10,293/-

<b>Measurement of sensitivity is as follows:</b>

<b>(a) Sales Price:-</b>

Let the sale price/Unit be S so that the project would break even with 0 NPV.

therefore 10,00,000 = (20,000  x  (S - 40)) / (1.1) + (30,000  x  (S - 40)) / (1.21) + (30,000 (S - 40)) / (1.331)

S - 40 = 10,00,000 / 65,514

S - 40 = ₹ 15.26
S = ₹ 55.26  which represents a fall of (60-55.26)/60
Or  0.079  or  7.9%

<b>Alternative Method</b>

(10,00,000  x  20) / (13,10,293) = ₹ 15.26
S = ₹ 40 + ₹ 15.26
= ₹ 55.26

<b>Alternative Solution</b>

If sale Price decreased by say 10%, then NPV (at Sale Price of ₹ 60 – ₹ 6 = ₹ 54)

NPV = -10,00,000 + (20000  x  14) / ((1.1)^1) + (30000  x  14) / ((1.1)^2) + (30000  x  14) / ((1.1)^3)
= -10,00,000 + 2,54,545 + 3,47,107 + 3,15,552
= -82,796

NPV  decrease  (%) = (3,10,293 - (-82,796)) / (3,10,293)  x  100 = 126.68%

<b>(b) Unit Cost:-</b>

If sales price = ₹ 60 the cost price required to give a margin of ₹ 15.26 is (₹ 60 – ₹ 15.26) or ₹ 44.74 which would represent a rise of 11.85% i.e., $((44.74 - 40) / (40)  x  100)$

<b>Alternative Solution</b>

If unit cost increased by say 10%. The new NPV will be as follows:

NPV = -10,00,000 + (20000  x  16) / ((1.1)^1) + (30000  x  16) / ((1.1)^2) + (30000  x  16) / ((1.1)^3)
= -10,00,000 + 2,90,909 + 3,96,694 + 3,60,631
= 48,234

NPV  decrease  (%) = (3,10,293 - (48,234)) / (3,10,293)  x  100 = 84.46%

<b>(c) Sales volume:-</b>

The requisite percentage fall is:-

3,10,293/13,10,293  x  100 = 23.68%

<b>Alternative Solution</b>

If sale volume decreased by say 10%. The new NPV will be as follows:

NPV = -10,00,000 + (18000  x  20) / ((1.1)^1) + (27000  x  20) / ((1.1)^2) + (27000  x  20) / ((1.1)^3)
= -10,00,000 + 3,27,272 + 4,46,281 + 4,05,710
= 1,79,263

NPV  decrease  (%) = (3,10,293 - 1,79,263) / (3,10,293)  x  100 = 42.22%

(d) Since PV of inflows remains at ₹13,10,293 the initial outlay must also be the same.

therefore   Percentage rise = 3,10,293/10,00,000  x  100 = 31.03%

<b>Alternative Solution</b>

If initial outlay increased by say 10%. The new NPV will be as follows:

NPV = -11,00,000 + (20000  x  20) / ((1.1)^1) + (30000  x  20) / ((1.1)^2) + (30000  x  20) / ((1.1)^3)
= -11,00,000 + 3,63,636 + 4,95,868 + 4,50,789 = 2,10,293

NPV  decrease  (%) = (3,10,293 - 2,10,293) / (3,10,293)  x  100 = 32.22%

(e) Present value for 1st two years.

= -10,00,000 + 4,00,000  x  0.909 + 6,00,000  x  0.826
= -10,00,000 + 3,63,600 + 4,95,600
= -10,00,000 + 8,59,200
= -1,40,800

The project needs to run for some part of the third year so that the present value of return is ₹ 1,40,800. It can be computed as follows:

(i) $30,000  units  x  20  x  0.751 = 4,50,600$

(ii) Per day Production in (₹) assuming a year of 360 days =

(4,50,600) / (360) = 1,252

(iii) Days needed to recover ₹1,40,800 = $(₹1,40,800) / (₹1,252) = 112$

Thus, if the project runs for 2 years and 112 days then break even would be achieved representing a fall of $((3 - 2.311)) / (3)  x  100 = 22.97%$.`),
      },
      {
        ref: "TYK Practical Q10",
        title: "10. From the following details relating to a project, analyse the sensitivity of the project to...",
        question: rt(String.raw`10. From the following details relating to a project, analyse the sensitivity of the project to changes in initial project cost, annual cash inflow and cost of capital:

Initial Project Cost (₹) 1,20,000

Annual Cash Inflow (₹) 45,000

Project Life (Years) 4

Cost of Capital 10%

To which of the three factors, the project is most sensitive? (Use annuity factors: for 10% 3.169 and 11% 3.103).`),
        solution: rt(String.raw`<b>10. CALCULATION OF NPV</b>

|  PV of cash inflows (₹ 45,000 x 3.169) | ₹ 1,42,605  |
| --- | --- |
|  Initial Project Cost | ₹ 1,20,000  |
|  NPV | ₹ 22,605  |
|  If initial project cost is varied adversely by 10%* |   |
|  NPV (Revised) (₹ 1,42,605 - ₹ 1,32,000) | ₹ 10,605  |
|  Change in NPV (₹ 22,605 – ₹ 10,605) / ₹ 22,605 i.e. | 53.08 %  |
|  If annual cash inflow is varied adversely by 10%* |   |
|  Revised annual inflow | ₹ 40,500  |
|  NPV (Revised) (₹ 40,500 x 3.169) – (₹ 1,20,000) | (+) ₹ 8,345  |
|  Change in NPV (₹ 22,605 – ₹ 8,345) / ₹ 22,605 | 63.08 %  |
|  If cost of capital is varied adversely by 10%* |   |
|  NPV (Revised) (₹ 45,000 x 3.103) – ₹ 1,20,000 | (+) ₹ 19,635  |
|  Change in NPV (₹ 22,605 – ₹ 19,635) / ₹ 22,605 | 13.14 %  |

Conclusion: Project is most sensitive to ‘annual cash inflow’.

*Note: Students may please note that they may assume any other percentage rate other than 10% say 15%, 20% 25% etc.`),
      },
      {
        ref: "TYK Practical Q11",
        title: "11. Red Ltd. is considering a project with the following Cash flows: Years Cost of Plant Recurr...",
        question: rt(String.raw`11. Red Ltd. is considering a project with the following Cash flows:

|  Years | Cost of Plant | Recurring Cost | Savings  |
| --- | --- | --- | --- |
|  0 | 10,000 |  |   |
|  1 |  | 4,000 | 12,000  |
|  2 |  | 5,000 | 14,000  |

The cost of capital is 9%. Measure the sensitivity of the project to changes in the levels of plant value, running cost and savings (considering each factor at a time) such that the NPV becomes zero. The P.V. factor at 9% are as under:

|  Year | Factor  |
| --- | --- |
|  0 | 1  |
|  1 | 0.917  |
|  2 | 0.842  |

Which factor is the most sensitive to affect the acceptability of the project?`),
        solution: rt(String.raw`<b>11. P.V. of Cash Flows</b>

Year 1
Running Cost ₹ 4,000 x 0.917 = (₹ 3,668)
Savings ₹ 12,000 x 0.917 = ₹ 11,004

Year 2
Running Cost ₹ 5,000 x 0.842 = (₹ 4,210)
Savings ₹ 14,000 x 0.842 = ₹ 11,788
₹ 14,914

Year 0
Less: P.V. of Cash Outflow ₹ 10,000 x 1 ₹ 10,000
NPV ₹ 4,914

<b>Sensitivity Analysis</b>

(i) Increase of Plant Value by ₹ 4,914

therefore (4,914) / (10,000)  x  100 = 49.14%

(ii) Increase of Running Cost by ₹ 4,914

(4,914) / (3,668 + 4,210) = (4,914) / (7,878)  x  100 = 62.38%

(iii) Fall in Saving by ₹ 4,914

(4,914) / (11,004 + 11,788) = (4,914) / (22,792)  x  100 = 21.56%

Hence, savings factor is the most sensitive to affect the acceptability of the project as in comparison of other two factors a slight % change in this fact shall more affect the NPV than others.

<b>Alternative Solution</b>

P.V. of Cash Flows

|  Year 1 | Running Cost | ₹ 4,000 x 0.917 | = (₹ 3,668)  |
| --- | --- | --- | --- |
|   | Savings | ₹ 12,000 x 0.917 | = ₹ 11,004  |
|  Year 2 | Running Cost | ₹ 5,000 x 0.842 | = (₹ 4,210)  |
|   | Savings | ₹ 14,000 x 0.842 | = ₹ 11,788  |
|   |  |  | ₹ 14,914  |
|  Year 0 | Less: P.V. of Cash Outflow | ₹ 10,000 x 1 | ₹ 10,000  |
|   |  | NPV | ₹ 4,914  |

<b>Sensitivity Analysis</b>

(i) If the initial project cost is varied adversely by say $10%^*$.

NPV (Revised) (₹ 4,914 - ₹ 1,000) = ₹ 3,914

Change in NPV (₹ 4,914 - ₹ 3,914) / (₹ 4,914) = 20.35%

(ii) If Annual Running Cost is varied by say $10%^*$.

NPV (Revised) (₹ 4,914 - ₹ 400  x  0.917 - ₹ 500  x  0.843)
= ₹ 4,914 - ₹ 367 - ₹ 421 = ₹ 4,126

Change in NPV (₹4,914 - ₹4,126) / (₹4,914) = 16.04%

(iii) If Saving is varied by say 10%*.

NPV (Revised)  (₹4,914 - ₹1,200  x  0.917 - ₹1,400  x  0.843)
= ₹4,914 - ₹1,100 - ₹1,180 = ₹2,634

Change in NPV (₹4,914 - ₹2,634) / (₹4,914) = 46.40%

Hence, savings factor is the most sensitive to affect the acceptability of the project.

* Any percentage of variation other than 10% can also be assumed.`),
      },
      {
        ref: "TYK Practical Q12",
        title: "12. The Easygoing Company Limited is considering a new project with initial investment, for a p...",
        question: rt(String.raw`12. The Easygoing Company Limited is considering a new project with initial investment, for a product "Survival". It is estimated that IRR of the project is 16% having an estimated life of 5 years.

Financial Manager has studied that project with sensitivity analysis and informed that annual fixed cost sensitivity is 7.8416%, whereas cost of capital (discount rate) sensitivity is 60%.

Other information available are:

Profit Volume Ratio (P/V) is 70%,

Variable cost ₹ 60/- per unit

Annual Cash Flow ₹ 57,500/-

Ignore Depreciation on initial investment and impact of taxation.

Calculate

(i) Initial Investment of the Project
(ii) Net Present Value of the Project
(iii) Annual Fixed Cost
(iv) Estimated annual unit of sales
(v) Break Even Units

Cumulative Discounting Factor for 5 years

|  8% | 9% | 10% | 11% | 12% | 13% | 14% | 15% | 16% | 17% | 18%  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  3.993 | 3.890 | 3.791 | 3.696 | 3.605 | 3.517 | 3.433 | 3.352 | 3.274 | 3.199 | 3.127  |`),
        solution: rt(String.raw`<b>12. (i) Initial Investment</b>

IRR = 16% (Given)

At IRR, NPV shall be zero, therefore

Initial Cost of Investment = PVAF (16%,5) x Cash Flow (Annual)
= 3.274  x  ₹57,500
= ₹1,88,255

<b>(ii) Net Present Value (NPV)</b>

Let Cost of Capital be X, then $(16 - X) / (X) = 60%$  X = 10%

Thus NPV of the project

= Annual Cash Flow  x  PVAF (10%, 5) - Initial Investment
= ₹57,500  x  3.791 - ₹1,88,255
= ₹2,17,982.50 - ₹1,88,255 = ₹29,727.50

<b>(iii) Annual Fixed Cost</b>

Let change in the Fixed Cost which makes NPV zero is X. Then,

₹29,727.50 - 3.791X = 0
Thus  X = ₹7,841.60

Let original Fixed Cost be Y then,

Y  x  7.8416% = ₹7,841.60
Y = ₹1,00,000

Thus Fixed Cost is equal to ₹ 1,00,000

(iv) Estimated Annual Units of Sales

Selling Price per unit = (₹60) / (100% - 70%) = ₹ 200

(Annual Cash Flow + Fixed Cost) / (P/V Ratio) = Sales Value

(₹57,500 + ₹1,00,000) / (0.70) = ₹ 2,25,000

Sales in Units = (₹2,25,000) / (₹200) = 1,125  units

(v) Break Even Units

(Fixed Cost) / (Contribution Per Unit) = (1,00,000) / (140) = 714.285  units`),
      },
      {
        ref: "TYK Practical Q13",
        title: "13. Unnat Ltd. is considering investing ₹ 50,00,000 in a new machine. The expected life of mach...",
        question: rt(String.raw`13. Unnat Ltd. is considering investing ₹ 50,00,000 in a new machine. The expected life of machine is five years and has no scrap value. It is expected that 2,00,000 units will be produced and sold each year at a selling price of ₹ 30.00 per unit. It is expected that the variable costs to be ₹ 16.50 per unit and fixed costs to be ₹ 10,00,000 per year. The cost of capital of Unnat Ltd. is 12% and acceptable level of risk is 20%.

You are required to measure the sensitivity of the project's net present value to a change in the following project variables:

(a) sale price;
(b) sales volume;
(c) variable cost;
(d) On further investigation it is found that there is a significant chance that the expected sales volume of 2,00,000 units per year will not be achieved. The sales manager of Unnat Ltd. suggests that sales volumes could depend on expected economic states which could be assigned the following probabilities:

|  State of Economy | Annual Sales (in Units) | Prob.  |
| --- | --- | --- |
|  Poor | 1,75000 | 0·30  |
|  Normal | 2,00,000 | 0·60  |
|  Good | 2,25,000 | 0·10  |

Calculate expected net present value of the project and give your decision whether company should accept the project or not.`),
        solution: rt(String.raw`13. Calculation of NPV

= - ₹50,00,000 + [2,00,000 (₹30 - ₹16.50) - ₹10,00,000] PVIAF (12%,5)
= - ₹50,00,000 + [2,00,000 (₹13.50) - ₹10,00,000] 3.605
= - ₹50,00,000 + [₹27,00,000 - ₹10,00,000] 3.605
= - ₹50,00,000 + ₹61,28,500 = ₹11,28,500

Measurement of Sensitivity Analysis

(a) Sales Price:-

Let the sale price/Unit be S so that the project would break even with 0 NPV.

therefore ₹50,00,000 = [2,00,000 (S - ₹16.50) - ₹10,00,000] PVIAF (12%,5)
₹50,00,000 = [2,00,000S - ₹33,00,000 - ₹10,00,000] 3.605
₹50,00,000 = [2,00,000S - ₹43,00,000] 3.605
₹13,86,963 = 2,00,000S - ₹43,00,000
₹56,86,963 = 2,00,000S

S = ₹28.43

which represents a fall of $(30 - 28.43)/30$ or $0.0523$ or $5.23%$

<b>(b) Sales volume:-</b>

Let V be the sale volume so that the project would break even with 0 NPV.

therefore    ₹ 50,00,000 = [V ( ₹ 30 - ₹ 16.50) - ₹ 10,00,000] PVIAF (12%,5)
 ₹ 50,00,000 = [V ( ₹ 13.50) - ₹ 10,00,000] PVIAF (12%,5)
 ₹ 50,00,000 = [ ₹ 13.50V - ₹ 10,00,000] 3.605
 ₹ 13,86,963 = ₹ 13.50V - ₹ 10,00,000
 ₹ 23,86,963 = ₹ 13.50V

$V = 1,76,812$ which represents a fall of $(2,00,000 - 1,76,812)/2,00,000$ or $0.1159$ or $11.59%$

<b>(c) Variable Cost:</b>

Let the variable cost be V so that the project would break even with 0 NPV.

therefore  ₹ 50,00,000 = [2,00,000( ₹ 30 - V) - ₹ 10,00,000] PVIAF (12%,5)
 ₹ 50,00,000 = [ ₹ 60,00,000 - 2,00,000 V - ₹ 10,00,000] 3.605
 ₹ 50,00,000 = [ ₹ 50,00,000 - 2,00,000 V] 3.605
 ₹ 13,86,963 = ₹ 50,00,000 - 2,00,000 V
 ₹ 36,13,037 = 2,00,000V
V = ₹ 18.07$ which represents a fall of $(18.07 - 16.50)/16.50$ or $0.0951$ or $9.51%$

<b>(d) Expected Net Present Value</b>

(1,75,000  x  0.30) + (2,00,000  x  0.60) + (2,25,000  x  0.10) = 1,95,000

NPV = [1,95,000  x  ₹ 13.50 - ₹ 10,00,000] 3.605 - ₹ 50,00,000 = ₹ 8,85,163

Further NPV in worst and best cases will be as follows:

<b>Worst Case:</b>

[1,75,000  x  ₹ 13.50 - ₹ 10,00,000] 3.605 - ₹ 50,00,000 = - ₹ 88,188

<b>Best Case:</b>

[2,25,000  x  ₹ 13.50 - ₹ 10,00,000] 3.605 - ₹ 50,00,000 = ₹ 23,45,188

Thus, there are $30%$ chances that the rise will be a negative NPV and $70%$ chances of positive NPV. Since acceptable level of risk of Unnat Ltd. is $20%$ and there are $30%$ chances of negative NPV hence project should not be accepted.`),
      },
      {
        ref: "TYK Practical Q14",
        title: "14. The Textile Manufacturing Company Ltd., is considering one of two mutually exclusive propos...",
        question: rt(String.raw`14. The Textile Manufacturing Company Ltd., is considering one of two mutually exclusive proposals, Projects M and N, which require cash outlays of ₹ 8,50,000 and ₹ 8,25,000 respectively. The certainty-equivalent (C.E) approach is used in incorporating risk in capital budgeting decisions. The current yield on government bonds is 6% and this is used as the risk free rate. The expected net cash flows and their certainty equivalents are as follows:

|  Project M |   |   | Project N  |   |
| --- | --- | --- | --- | --- |
|  Year-end | Cash Flow ₹ | C.E. | Cash Flow ₹ | C.E.  |
|  1 | 4,50,000 | 0.8 | 4,50,000 | 0.9  |
|  2 | 5,00,000 | 0.7 | 4,50,000 | 0.8  |
|  3 | 5,00,000 | 0.5 | 5,00,000 | 0.7  |

Present value factors of ₹ 1 discounted at 6% at the end of year 1, 2 and 3 are 0.943, 0.890 and 0.840 respectively.

Required:

(i) Which project should be accepted?
(ii) If risk adjusted discount rate method is used, which project would be appraised with a higher rate and why?`),
        solution: rt(String.raw`<b>14. (i) Statement Showing the Net Present Value of Project M</b>

|  Year end | Cash Flow (₹) (a) | C.E. (b) | Adjusted Cash flow (₹) (c) = (a) × (b) | Present value factor at 6% (d) | Total Present value (₹) (e) = (c) × (d)  |
| --- | --- | --- | --- | --- | --- |

Statement Showing the Net Present Value of Project N

|  Year end | Cash Flow (₹) (a) | C.E. (b) | Adjusted Cash flow (₹) (c) = (a) × (b) | Present value factor (d) | Total Present value (₹) (e) = (c) × (d)  |
| --- | --- | --- | --- | --- | --- |
|  1 | 4,50,000 | 0.9 | 4,05,000 | 0.943 | 3,81,915  |
|  2 | 4,50,000 | 0.8 | 3,60,000 | 0.890 | 3,20,400  |
|  3 | 5,00,000 | 0.7 | 3,50,000 | 0.840 | 2,94,000  |
|   |  |  |  |  | 9,96,315  |
|  Less: Initial Investment |   |   |  |  | 8,25,000  |
|  Net Present Value |   |   |  |  | 1,71,315  |

Decision: Since the net present value of Project N is higher, so the project N should be accepted.

(ii) Certainty - Equivalent (C.E.) Co-efficient of Project M (2.0) is lower than Project N (2.4). This means Project M is riskier than Project N as "higher the riskiness of a cash flow, the lower will be the CE factor". If risk adjusted discount rate (RADR) method is used, Project M would be analysed with a higher rate.

RADR is based on the premise that riskiness of a proposal may be taken care of, by adjusting the discount rate. The cash flows from a more risky proposal should be discounted at a relatively higher discount rate as compared to other proposals whose cash flows are less risky. Any investor is basically risk averse. However, he may be ready to take risk provided he is rewarded for undertaking risk by higher returns. So, more risky the investment is, the greater would be the expected return. The expected return is expressed in terms of discount rate which is also the minimum required rate of return generated by a proposal if it is to be accepted. Therefore, there is a positive correlation between risk of a proposal and the discount rate.`),
      },
      {
        ref: "TYK Practical Q15",
        title: "15. Determine the risk adjusted net present value of the following projects: X Y Z --- --- ---...",
        question: rt(String.raw`15. Determine the risk adjusted net present value of the following projects:

|   | X | Y | Z  |
| --- | --- | --- | --- |
|  Net cash outlays (₹) | 2,10,000 | 1,20,000 | 1,00,000  |
|  Project life | 5 years | 5 years | 5 years  |
|  Annual Cash inflow (₹) | 70,000 | 42,000 | 30,000  |
|  Coefficient of variation | 1.2 | 0.8 | 0.4  |

The Company selects the risk-adjusted rate of discount on the basis of the coefficient of variation:

|  Coefficient of Variation | Risk-Adjusted Rate of Return | P.V. Factor 1 to 5 years At risk adjusted rate of discount  |
| --- | --- | --- |
|  0.0 | 10% | 3.791  |
|  0.4 | 12% | 3.605  |
|  0.8 | 14% | 3.433  |
|  1.2 | 16% | 3.274  |
|  1.6 | 18% | 3.127  |
|  2.0 | 22% | 2.864  |
|  More than 2.0 | 25% | 2.689  |`),
        solution: rt(String.raw`15. Statement showing the determination of the risk adjusted net present value

|  Projects | Net cash outlays | Coefficient of variation | Risk adjusted | Annual cash inflow | PV factor 1-5 years | Discounted cash inflow | Net present value  |
| --- | --- | --- | --- | --- | --- | --- | --- |

|   |  |  | discount rate |  |  |  |   |
| --- | --- | --- | --- | --- | --- | --- | --- |
|   | ₹ |  |  | ₹ |  | ₹ | ₹  |
|  (i) | (ii) | (iii) | (iv) | (v) | (vi) | (vii) = (v) × (vi) | (viii) = (vii) - (ii)  |
|  X | 2,10,000 | 1.20 | 16% | 70,000 | 3.274 | 2,29,180 | 19,180  |
|  Y | 1,20,000 | 0.80 | 14% | 42,000 | 3.433 | 1,44,186 | 24,186  |
|  Z | 1,00,000 | 0.40 | 12% | 30,000 | 3.605 | 1,08,150 | 8,150  |`),
      },
      {
        ref: "TYK Practical Q16",
        title: "16. New Projects Ltd. is evaluating 3 projects, P-I, P-II, P-III. Following information is avai...",
        question: rt(String.raw`16. New Projects Ltd. is evaluating 3 projects, P-I, P-II, P-III. Following information is available in respect of these projects:

|   | P-I | P-II | P-III  |
| --- | --- | --- | --- |
|  Cost | ₹ 15,00,000 | ₹ 11,00,000 | ₹ 19,00,000  |
|  Inflows-Year 1 | 6,00,000 | 6,00,000 | 4,00,000  |
|  Year 2 | 6,00,000 | 4,00,000 | 6,00,000  |
|  Year 3 | 6,00,000 | 5,00,000 | 8,00,000  |
|  Year 4 | 6,00,000 | 2,00,000 | 12,00,000  |
|  Risk Index | 1.80 | 1.00 | 0.60  |

Minimum required rate of return of the firm is 15% and applicable tax rate is 40%. The risk free interest rate is 10%.

Required:

(i) Find out the risk-adjusted discount rate (RADR) for these projects.
(ii) Which project is the best?`),
        solution: rt(String.raw`16. (i) The risk free rate of interest and risk factor for each of the projects are given. The risk adjusted discount rate (RADR) for different projects can be found on the basis of CAPM as follows:

Required Rate of Return = $I_{Rf} + (k_o - I_{RF})$ Risk Factor

For P-I : RADR = 0.10 + (0.15 - 0.10) 1.80 = 19%

For P-II : RADR = 0.10 + (0.15 - 0.10) 1.00 = 15%

For P-III : RADR = 0.10 + (0.15 - 0.10) 0.60 = 13%

(ii) The three projects can now be evaluated at 19%, 15% and 13% discount rate as follows:

Project P-I

|  Annual Inflows | ₹ 6,00,000  |
| --- | --- |
|  PVAF (19%, 4) | 2.639  |
|  PV of Inflows (₹ 6,00,000 x 2.639) | ₹ 15,83,400  |
|  Less: Cost of Investment | ₹ 15,00,000  |
|  Net Present Value | ₹ 83,400  |

Project P-II

|  Year | Cash Inflow (₹) | PVF (15%,n) | PV (₹)  |
| --- | --- | --- | --- |
|  1 | 6,00,000 | 0.870 | 5,22,000  |
|  2 | 4,00,000 | 0.756 | 3,02,400  |
|  3 | 5,00,000 | 0.658 | 3,29,000  |
|  4 | 2,00,000 | 0.572 | 1,14,400  |
|  Total Present Value |  |  | 12,67,800  |
|  Less: Cost of Investment |  |  | 11,00,000  |
|  Net Present Value |  |  | 1,67,800  |

<b>Project P-III</b>

|  Year | Cash Inflow (₹) | PVF (13%,n) | PV (₹)  |
| --- | --- | --- | --- |
|  1 | 4,00,000 | 0.885 | 3,54,000  |
|  2 | 6,00,000 | 0.783 | 4,69,800  |
|  3 | 8,00,000 | 0.693 | 5,54,400  |
|  4 | 12,00,000 | 0.613 | 7,35,600  |
|  Total Present Value |  |  | 21,13,800  |
|  Less: Cost of Investment |  |  | 19,00,000  |
|  Net Present Value |  |  | 2,13,800  |

Project P-III has highest NPV. So, it should be accepted by the firm`),
      },
      {
        ref: "TYK Practical Q17",
        title: "17. A firm has projected the following cash flows from a project under evaluation: Year ₹ lakhs...",
        question: rt(String.raw`17. A firm has projected the following cash flows from a project under evaluation:

|  Year | ₹ lakhs  |
| --- | --- |
|  0 | (70)  |
|  1 | 30  |
|  2 | 40  |
|  3 | 30  |

The above cash flows have been made at expected prices after recognizing inflation. The firm's cost of capital is 10%. The expected annual rate of inflation is 5%.

Show how the viability of the project is to be evaluated.`),
        solution: rt(String.raw`17. It is stated that the cash flows have been adjusted for inflation; hence they are “nominal”. The cost of capital or discount rate is “real”. In order to be compatible, the cash flows should be converted into “real flow”. This is done as below:

|  Year | Nominal cash flows | Adjusted Inflation* factor | Real cash flows | PVF @ 10% | PV of cash flows  |
| --- | --- | --- | --- | --- | --- |
|  0 | (70) | – | (70) | 1.000 | (70)  |
|  1 | 30 | 0.952 | 28.56 | 0.909 | 25.96  |
|  2 | 40 | 0.907 | 36.28 | 0.826 | 29.97  |
|  3 | 30 | 0.864 | 25.92 | 0.751 | 19.47  |
|   |  |  |  | Total | 75.40  |
|  Less: Cash out flow |   |   |   |   | 70.00  |
|  NPV (+) |   |   |   |   | 5.40  |

* 1/1.05; 1/(1.05)²; 1/(1.05)³;

Advise: With positive NPV, the project is financially viable.

Alternatively, instead of converting cash flows into real terms, the discount rate can be converted into nominal rate. Result will be the same.

An alternative solution is presented herewith

<b>Alternative solution:</b>

|  Year | Nominal cash flows | PVF @ 15.50% adjusted by the inflation factor i.e. 5%* | PV of cash flows  |
| --- | --- | --- | --- |
|  1 | 30 | 0.866 | 25.98  |
|  2 | 40 | 0.749 | 29.96  |

|  3 | 30 | 0.649 | 19.47  |
| --- | --- | --- | --- |
|   |   |  Cash inflow | 75.41  |
|   |   |  Less: Cash out flow | 70.00  |
|   |   |  Net present value | 5.41  |

* frac 0 . 9 0 91 . 0 5 = 0. 8 6 6, frac 0 . 8 2 61 . 1 0 2 5 = 0. 7 4 9, frac 0 . 7 5 11 . 1 5 7 6 = 0. 6 4 9

Advise: With positive NPV, the project is financially viable.`),
      },
      {
        ref: "TYK Practical Q18",
        title: "18. Shashi Co. Ltd has projected the following cash flows from a project under evaluation: Year...",
        question: rt(String.raw`18. Shashi Co. Ltd has projected the following cash flows from a project under evaluation:

|  Year | 0 | 1 | 2 | 3  |
| --- | --- | --- | --- | --- |
|  ₹ (in lakhs) | (72) | 30 | 40 | 30  |

The above cash flows have been made at expected prices after recognizing inflation. The firm's cost of capital is 10%. The expected annual rate of inflation is 5%. Show how the viability of the project is to be evaluated. PVF at 10% for 1-3 years are 0.909, 0.826 and 0.751.`),
        solution: rt(String.raw`18. Here the given cash flows have to be adjusted for inflation. Alternatively, the discount rate can be converted into nominal rate, as follows:-

text Year 1 = frac 0 . 9 0 91 . 0 5 = 0. 8 6 6;   text Year 2 = frac 0 . 8 2 6(1 . 0 5) ^2 text  or  frac 0 . 8 2 61 . 1 0 2 5 = 0. 7 4 9

text Year 3 = frac 0 . 7 5 1(1 . 0 5) ^3 = frac 0 . 7 5 11 . 1 5 7 6 = 0. 6 4 9

|  Year | Nominal Cash Flows (₹ in lakhs) | Adjusted PVF as above | PV of Cash Flows (₹ in lakhs)  |
| --- | --- | --- | --- |
|  1 | 30 | 0.866 | 25.98  |
|  2 | 40 | 0.749 | 29.96  |
|  3 | 30 | 0.649 | 19.47  |
|   | Cash Inflow |  | 75.41  |
|   | Less: Cash Outflow |  | 72.00  |
|   | Net Present Value |  | 3.41  |

With positive NPV, the project is financially viable.

<b>Alternative Solution</b>

Assumption: The cost of capital given in the question is "Real".

Nominal cost of capital = (1.10) (1.05) -1 = 0.155 =15.50%

DCF Analysis of the project

(₹ Lakhs)

|   | Period | PVF @15.50% | CF | PV  |
| --- | --- | --- | --- | --- |
|  Investment | 0 | 1 | -72 | -72.00  |
|  Operation | 1 | 0.866 | 30 | +25.98  |

|  ---do--- | 2 | 0.750 | 40 | +30.00  |
| --- | --- | --- | --- | --- |
|  ---do--- | 3 | 0.649 | 30 | +19.47  |
|  NPV |  |  |  | +3.45  |

The proposal may be accepted as the NPV is positive.`),
      },
      {
        ref: "TYK Practical Q19",
        title: "19. KLM Ltd. requires ₹ 15,00,000 for a new project. Useful life of project is 3 years. Salvage...",
        question: rt(String.raw`19. KLM Ltd. requires ₹ 15,00,000 for a new project.

Useful life of project is 3 years.

Salvage value - NIL.

Depreciation is ₹ 5,00,000 p.a.

Given below are projected revenues and costs (excluding depreciation) ignoring inflation:

|  Year → | 1 | 2 | 3  |
| --- | --- | --- | --- |
|  Revenues in ₹ | 10,00,000 | 13,00,000 | 14,00,000  |
|  Costs in ₹ | 5,00,000 | 6,00,000 | 6,50,000  |

Applicable tax rate is 35%. Assume cost of capital to be 14% (after tax). The inflation rates for revenues and costs are as under:

|  Year | Revenues % | Costs %  |
| --- | --- | --- |
|  1 | 9 | 10  |

|  2 | 8 | 9  |
| --- | --- | --- |
|  3 | 6 | 7  |

PVF at 14%, for 3 years =0.877, 0.769 and 0.675

Show amount to the nearest rupee in calculations.

You are required to calculate net present value of the project.`),
        solution: rt(String.raw`19. (i) Inflation adjusted Revenues

|  Year | Revenues (₹) | Revenues (Inflation Adjusted) (₹)  |
| --- | --- | --- |
|  1 | 10,00,000 | 10,00,000(1.09) = 10,90,000  |
|  2 | 13,00,000 | 13,00,000(1.09) (1.08) = 15,30,360  |
|  3 | 14,00,000 | 14,00,000(1.09) (1.08)(1.06) = 17,46,965  |

(ii) Inflation adjusted Costs

|  Year | Costs (₹) | Costs (Inflation Adjusted) (₹)  |
| --- | --- | --- |
|  1 | 5,00,000 | 5,00,000(1.10) = 5,50,000  |
|  2 | 6,00,000 | 6,00,000(1.10)(1.09) = 7,19,400  |
|  3 | 6,50,000 | 6,50,000(1.10)(1.09)(1.07) = 8,33,905  |

(iii) Tax Benefit on Depreciation = ₹ 5,00,000 x 0.35 = ₹ 1,75,000
(iv) Net Profit after Tax

|  Year | Revenues (Inflation Adjusted) (₹) (1) | Costs (Inflation Adjusted) (₹) (2) | Net Profit (₹) (3) = (1) - (2) | Tax (₹) (4) = 35% of (3) | Profit after Tax (₹) (3) - (4)  |
| --- | --- | --- | --- | --- | --- |
|  1 | 10,90,000 | 5,50,000 | 5,40,000 | 1,89,000 | 3,51,000  |
|  2 | 15,30,360 | 7,19,400 | 8,10,960 | 2,83,836 | 5,27,124  |
|  3 | 17,46,965 | 8,33,905 | 9,13,060 | 3,19,571 | 5,93,489  |

(v) Present Value of Cash Inflows

|  Year | Net Profit after tax (₹) | Tax Benefit on Depreciation (₹) | Cash Inflow (₹) | PVF@ 14% | PV (₹)  |
| --- | --- | --- | --- | --- | --- |
|  1 | 3,51,000 | 1,75,000 | 5,26,000 | 0.877 | 4,61,302  |
|  2 | 5,27,124 | 1,75,000 | 7,02,124 | 0.769 | 5,39,933  |
|  3 | 5,93,489 | 1,75,000 | 7,68,489 | 0.675 | 5,18,730  |
|   |  |  |  |  | 15,19,965  |

NPV = ₹ 15,19,965 - ₹ 15,00,000 = ₹ 19,965`),
      },
      {
        ref: "TYK Practical Q20",
        title: "20. A firm has an investment proposal, requiring an outlay of ₹ 80,000. The investment proposal...",
        question: rt(String.raw`20. A firm has an investment proposal, requiring an outlay of ₹ 80,000. The investment proposal is expected to have two years economic life with no salvage value. In year 1, there is a 0.4 probability that cash inflow after tax will be ₹ 50,000 and 0.6 probability that cash inflow after tax will be ₹ 60,000. The probability assigned to cash inflow after tax for the year 2 is as follows:

|  The cash inflow year 1 | ₹ 50,000 |   | ₹ 60,000  |   |
| --- | --- | --- | --- | --- |
|  The cash inflow year 2 | Probability |   | Probability  |   |
|   | ₹ 24,000 | 0.2 | ₹ 40,000 | 0.4  |
|   | ₹ 32,000 | 0.3 | ₹ 50,000 | 0.5  |
|   | ₹ 44,000 | 0.5 | ₹ 60,000 | 0.1  |

The firm uses a 10% discount rate for this type of investment.

Required:

(i) Construct a decision tree for the proposed investment project and calculate the expected net present value (NPV).

(ii) What net present value will the project yield, if worst outcome is realized? What is the probability of occurrence of this NPV?

(iii) What will be the best outcome and the probability of that occurrence?

(iv) Will the project be accepted?

(Note: 10% discount factor 1 year 0.909; 2 year 0.826)`),
        solution: rt(String.raw`20. (i) The decision tree diagram is presented in the chart, identifying various paths and outcomes, and the computation of various paths/outcomes and NPV of each path are presented in the following tables:

The Net Present Value (NPV) of each path at 10% discount rate is given below:

|  Path | Year 1 Cash Flows (₹) | Year 2 Cash Flows (₹) | Total Cash Inflows (PV) (₹) | Cash Inflows NPV (₹) (₹)  |   |
| --- | --- | --- | --- | --- | --- |
|  1 | 50,000×.909 = 45,450 | 24,000×.826 = 19,824 | 65,274 | 80,000 | (-) 14,726  |
|  2 | 45,450 | 32,000×.826 = 26,432 | 71,882 | 80,000 | (-) 8,118  |
|  3 | 45,450 | 44,000×.826 = 36,344 | 81,794 | 80,000 | 1,794  |
|  4 | 60,000×.909 = 54,540 | 40,000×.826 = 33,040 | 87,580 | 80,000 | 7,580  |
|  5 | 54,540 | 50,000×.826 = 41,300 | 95,840 | 80,000 | 15,840  |
|  6 | 54,540 | 60,000×.826 = 49,560 | 1,04,100 | 80,000 | 24,100  |

Statement showing Expected Net Present Value

|  z | NPV (₹) | Joint Probability | Expected NPV  |
| --- | --- | --- | --- |
|  1 | −14,726 | 0.08 | −1,178.08  |
|  2 | −8,118 | 0.12 | −974.16  |
|  3 | 1,794 | 0.20 | 358.80  |
|  4 | 7,580 | 0.24 | 1,819.20  |
|  5 | 15,840 | 0.30 | 4,752.00  |

|  6 | 24,100 | 0.06 | 1,446.00  |
| --- | --- | --- | --- |
|   |   |   |  6,223.76  |

(ii) If the worst outcome is realized the project will yield NPV of – ₹ 14,726. The probability of occurrence of this NPV is 8% and a loss of ₹ 1,178 (path 1).
(iii) The best outcome will be path 6 when the NPV is at ₹ 24,100. The probability of occurrence of this NPV is 6% and a expected profit of ₹ 1,446.
(iv) The project should be accepted because the expected NPV is positive at ₹ 6,223.76 based on joint probability.`),
      },
      {
        ref: "TYK Practical Q21",
        title: "21. Jumble Consultancy Group has determined relative utilities of cash flows of two forthcoming...",
        question: rt(String.raw`21. Jumble Consultancy Group has determined relative utilities of cash flows of two forthcoming projects of its client company as follows:

|  Cash Flow in ₹ | -15000 | -10000 | -4000 | 0 | 15000 | 10000 | 5000 | 1000  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  Utilities | -100 | -60 | -3 | 0 | 40 | 30 | 20 | 10  |

The distribution of cash flows of project A and Project B are as follows:

<b>Project A</b>

|  Cash Flow (₹) | -15000 | -10000 | 15000 | 10000 | 5000  |
| --- | --- | --- | --- | --- | --- |
|  Probability | 0.10 | 0.20 | 0.40 | 0.20 | 0.10  |
|  Project B  |   |   |   |   |   |
|  Cash Flow (₹) | -10000 | -4000 | 15000 | 5000 | 10000  |
|  Probability | 0.10 | 0.15 | 0.40 | 0.25 | 0.10  |

Which project should be selected and why?`),
        solution: rt(String.raw`21. Evaluation of project utilizes of Project A and Project B

|   | Project A  |   |   |
| --- | --- | --- | --- |
|  Cash flow (in ₹) | Probability | Utility | Utility value  |
|  -15,000 | 0.10 | -100 | -10  |
|  -10,000 | 0.20 | -60 | -12  |
|  15,000 | 0.40 | 40 | 16  |
|  10,000 | 0.20 | 30 | 6  |
|  5,000 | 0.10 | 20 | 2  |
|   |  |  | 2  |

|  Cash flow (in ₹) | Project B  |   |   |
| --- | --- | --- | --- |
|   |  Probability | Utility | Utility value  |
|  -10,000 | 0.10 | -60 | -6  |
|  -4,000 | 0.15 | -3 | -0.45  |
|  15,000 | 0.40 | 40 | 16  |
|  5,000 | 0.25 | 20 | 5  |
|  10,000 | 0.10 | 30 | 3  |
|   |  |  | 17.55  |

Project B should be selected as its expected utility is more.`),
      },
      {
        ref: "TYK Practical Q22",
        title: "22. A &amp;amp; Co. is contemplating whether to replace an existing machine or to spend money o...",
        question: rt(String.raw`22. A &amp; Co. is contemplating whether to replace an existing machine or to spend money on overhauling it. A &amp; Co. currently pays no taxes. The replacement machine costs ₹ 90,000 now and requires maintenance of ₹ 10,000 at the end of every year for eight years. At the end of eight years it would have a salvage value of ₹ 20,000 and would be sold. The existing machine requires increasing amounts of maintenance each year and its salvage value falls each year as follows:

|  Year | Maintenance (₹) | Salvage (₹)  |
| --- | --- | --- |
|  Present | 0 | 40,000  |
|  1 | 10,000 | 25,000  |
|  2 | 20,000 | 15,000  |
|  3 | 30,000 | 10,000  |
|  4 | 40,000 | 0  |

The opportunity cost of capital for A &amp; Co. is 15%.

Required:

When should the company replace the machine?

(Notes: Present value of an annuity of Re. 1 per period for 8 years at interest rate of 15% : 4.4873; present value of Re. 1 to be received after 8 years at interest rate of 15% : 0.3269).`),
        solution: rt(String.raw`22. A &amp; Co.

Equivalent cost of (EAC) of new machine

|   |  | ₹  |
| --- | --- | --- |
|  (i) | Cost of new machine now | 90,000  |
|   |  Add: PV of annual repairs @ ₹ 10,000 per annum for 8 years (₹ 10,000 × 4.4873) | 44,873  |
|   |   | 1,34,873  |

|   | Less: PV of salvage value at the end of 8 years (₹20,000×0.3269) | 6,538  |
| --- | --- | --- |
|   |  Equivalent annual cost (EAC) (₹ 1,28,335/4.4873) | 1,28,335  |
|   |   |  28,600  |

PV of cost of replacing the old machine in each of 4 years with new machine

|  Scenario | Year | Cash Flow (₹) | PV @ 15% | PV (₹)  |
| --- | --- | --- | --- | --- |
|  Replace Immediately | 0 | (28,600) | 1.00 | (28,600)  |
|   |  | 40,000 | 1.00 | 40,000  |
|   |  |  |  | 11,400  |
|  Replace in one year | 1 | (28,600) | 0.870 | (24,882)  |
|   | 1 | (10,000) | 0.870 | (8,700)  |
|   | 1 | 25,000 | 0.870 | 21,750  |
|   |  |  |  | (11,832)  |
|  Replace in two years | 1 | (10,000) | 0.870 | (8,700)  |
|   | 2 | (28,600) | 0.756 | (21,622)  |
|   | 2 | (20,000) | 0.756 | (15,120)  |
|   | 2 | 15,000 | 0.756 | 11,340  |
|   |  |  |  | (34,102)  |
|  Replace in three years | 1 | (10,000) | 0.870 | (8,700)  |
|   | 2 | (20,000) | 0.756 | (15,120)  |
|   | 3 | (28,600) | 0.658 | (18,819)  |
|   | 3 | (30,000) | 0.658 | (19,740)  |
|   | 3 | 10,000 | 0.658 | 6,580  |
|   |  |  |  | (55,799)  |
|  Replace in four years | 1 | (10,000) | 0.870 | (8,700)  |
|   | 2 | (20,000) | 0.756 | (15,120)  |
|   | 3 | (30,000) | 0.658 | (19,740)  |
|   | 4 | (28,600) | 0.572 | (16,359)  |
|   | 4 | (40,000) | 0.572 | (22,880)  |
|   |  |  |  | (82,799)  |

Advice: The company should replace the old machine immediately because the PV of cost of replacing the old machine with new machine is least.

Alternatively, optimal replacement period can also be computed using the following table:

|  Scenario | Year | Cashflow | PV at 15% | PV  |
| --- | --- | --- | --- | --- |
|  Replace immediately | 0 | (40,000) | 1 | (40,000)  |
|   |  1 to 4 | 28,600 | 2.855 | 81,652  |
|   |   |  |  | 41,652  |
|  Replace after 1 year | 1 | 10,000 | 0.870 | 8,696  |
|   |  1 | (25,000) | 0.870 | (21,739)  |
|   |  2 to 4 | 28,600 | 1.985 | 56,783  |
|   |   |  |  | 43,739  |
|  Replace after 2 years | 1 | 10,000 | 0.870 | 8,696  |
|   |  2 | 20,000 | 0.756 | 15,123  |
|   |  2 | (15,000) | 0.756 | (11,342)  |
|   |  3 and 4 | 28,600 | 1.229 | 35,157  |
|  Replace after 3 years | 1 | 10,000 | 0.870 | 8,696  |
|   |  2 | 20,000 | 0.756 | 15,123  |
|   |  3 | 30,000 | 0.658 | 19,725  |
|   |  3 | (10,000) | 0.658 | (6,575)  |
|   |  4 | 28,600 | 0.572 | 16,352  |
|   |   |  |  | 53,321  |
|  Replace after 4 years | 1 | 10,000 | 0.870 | 8,696  |
|   |  2 | 20,000 | 0.756 | 15,123  |
|   |  3 | 30,000 | 0.658 | 19,725  |
|   |  4 | 40,000 | 0.572 | 22,870  |
|   |  |  |  | 66,414  |`),
      },
      {
        ref: "TYK Practical Q23",
        title: "23. A company has an old machine having book value zero – which can be sold for ₹ 50,000. The c...",
        question: rt(String.raw`23. A company has an old machine having book value zero – which can be sold for ₹ 50,000. The company is thinking to choose one from following two alternatives:

(i) To incur additional cost of ₹ 10,00,000 to upgrade the old existing machine.

(ii) To replace old machine with a new machine costing ₹ 20,00,000 plus installation cost ₹ 50,000.

Both above proposals envisage useful life to be five years with salvage value to be nil.

The expected after tax profits for the above three alternatives are as under :

|  Year | Old existing Machine (₹) | Upgraded Machine (₹) | New Machine (₹)  |
| --- | --- | --- | --- |
|  1 | 5,00,000 | 5,50,000 | 6,00,000  |
|  2 | 5,40,000 | 5,90,000 | 6,40,000  |
|  3 | 5,80,000 | 6,10,000 | 6,90,000  |
|  4 | 6,20,000 | 6,50,000 | 7,40,000  |
|  5 | 6,60,000 | 7,00,000 | 8,00,000  |

The tax rate is 40 per cent.

The company follows straight line method of depreciation. Assume cost of capital to be 15 per cent.

P.V.F. of 15%, 5 = 0.870, 0.756, 0.658, 0.572 and 0.497. You are required to advise the company as to which alternative is to be adopted.`),
        solution: rt(String.raw`23.

|  (A) | Cash Outflow |   | ₹  |
| --- | --- | --- | --- |
|   | (i) | In case machine is upgraded: |   |
|   |  | Upgradation Cost | 10,00,000  |
|   | (ii) | In case new machine installed: |   |
|   |  | Cost | 20,00,000  |
|   |  | Add: Installation cost | 50,000  |
|   |  | Total Cost | 20,50,000  |
|   |  | Less: Disposal of old machine |   |
|   |  | ₹ 50,000 – 40% tax | 30,000  |
|   |  | Total Cash Outflow | 20,20,000  |

Working Note:

(iv) Depreciation – in case machine is upgraded
₹ 10,00,000 ÷ 5 = ₹ 2,00,000

(ii) Depreciation – in case new machine is installed
₹ 20,50,000 ÷ 5 = ₹ 4,10,000

(iii) Old existing machine – Book Value is zero. So, no depreciation.

(B) Cash Inflows after Taxes (CFAT)

|  Year | Old Existing Machine | Upgraded Machine  |   |   |   |
| --- | --- | --- | --- | --- | --- |
|   |  (i) EAT/CFAT ₹ | (ii) EAT ₹ | (iii) DEP ₹ | (iv) CFAT ₹ | = (iv)-(i) Incremental CFAT ₹  |
|  1 | 5,00,000 | 5,50,000 | 2,00,000 | 7,50,000 | 2,50,000  |
|  2 | 5,40,000 | 5,90,000 | 2,00,000 | 7,90,000 | 2,50,000  |
|  3 | 5,80,000 | 6,10,000 | 2,00,000 | 8,10,000 | 2,30,000  |
|  4 | 6,20,000 | 6,50,000 | 2,00,000 | 8,50,000 | 2,30,000  |
|  5 | 6,60,000 | 7,00,000 | 2,00,000 | 9,00,000 | 2,40,000  |

Cash Inflow after Taxes (CFAT)

|  Year |  | New Machine  |   |   |
| --- | --- | --- | --- | --- |
|   |  (vi) EAT ₹ | (vii) DEP ₹ | (viii) CFAT ₹ | (ix) = (viii) - (i) Incremental CFAT (₹)  |
|  1 | 6,00,000 | 4,10,000 | 10,10,000 | 5,10,000  |
|  2 | 6,40,000 | 4,10,000 | 10,50,000 | 5,10,000  |
|  3 | 6,90,000 | 4,10,000 | 11,00,000 | 5,20,000  |
|  4 | 7,40,000 | 4,10,000 | 11,50,000 | 5,30,000  |
|  5 | 8,00,000 | 4,10,000 | 12,10,000 | 5,50,000  |

P.V. AT 15% - 5 Years – on Incremental CFAT

|  Year | Upgraded Machine |   |   | New Machine  |   |   |
| --- | --- | --- | --- | --- | --- | --- |
|   |  Incremental CFAT ₹ | PVF | Total P.V. ₹ | Incremental CFAT | PVF | Total PV ₹  |
|  1 | 2,50,000 | 0.870 | 2,17,500 | 5,10,000 | 0.870 | 4,43,700  |
|  2 | 2,50,000 | 0.756 | 1,89,000 | 5,10,000 | 0.756 | 3,85,560  |
|  3 | 2,30,000 | 0.658 | 1,51,340 | 5,20,000 | 0.658 | 3,42,160  |
|  4 | 2,30,000 | 0.572 | 1,31,560 | 5,30,000 | 0.572 | 3,03,160  |
|  5. | 2,40,000 | 0.497 | 1,19,280 | 5,50,000 | 0.497 | 2,73,350  |
|  Total P.V. of CFAT |   |   | 8,08,680 |  |  | 17,47,930  |
|  Less: Cash Outflows |   |   | 10,00,000 |  |  | 20,20,000*  |
|  N.P.V. = |   |   | -1,91,320 |  |  | -2,72,070  |

*Acquisition Cost (including installation cost) ₹ 20,50,000
Less: Salvage Value of existing machine net of Tax ₹ 30,000
₹ 20,20,000

As the NPV in both the new (alternative) proposals is negative, the company should continue with the existing old Machine.`),
      },
      {
        ref: "TYK Practical Q24",
        title: "24. Company X is forced to choose between two machines A and B. The two machines are designed d...",
        question: rt(String.raw`24. Company X is forced to choose between two machines A and B. The two machines are designed differently but have identical capacity and do exactly the same job. Machine A costs ₹ 1,50,000 and will last for 3 years. It costs ₹ 40,000 per year to run. Machine B is an 'economy' model costing only ₹ 1,00,000, but will last only for 2 years, and costs ₹ 60,000 per year to run. These are real cash flows. The costs are forecasted in rupees of constant purchasing power. Ignore tax. Opportunity cost of capital is 10 per cent. Which machine company X should buy?`),
        solution: rt(String.raw`24. Statement showing the evaluation of two machines

|  Machines | A | B  |
| --- | --- | --- |
|  Purchase cost (₹): (i) | 1,50,000 | 1,00,000  |
|  Life of machines (years) | 3 | 2  |
|  Running cost of machine per year (₹): (ii) | 40,000 | 60,000  |
|  Cumulative present value factor for 1-3 years @ 10% (iii) | 2.486 | –  |
|  Cumulative present value factor for 1-2 years @ 10% (iv) | – | 1.735  |
|  Present value of running cost of machines (₹): (v) | 99,440 | 1,04,100  |
|   | [(ii) × (iii)] | [(ii) × (iv)]  |
|  Cash outflow of machines (₹): (vi) = (i) + (v) | 2,49,440 | 2,04,100  |
|  Equivalent present value of annual cash outflow | 1,00,338 | 1,17,637  |
|   | [(vi) ÷ (iii)] | [(vi) ÷ (iv)]  |

Decision: Company X should buy machine A since its equivalent cash outflow is less than machine B.`),
      },
      {
        ref: "TYK Practical Q25",
        title: "25. Company Y is operating an elderly machine that is expected to produce a net cash inflow of...",
        question: rt(String.raw`25. Company Y is operating an elderly machine that is expected to produce a net cash inflow of ₹ 40,000 in the coming year and ₹ 40,000 next year. Current salvage value is ₹ 80,000 and next year's value is ₹ 70,000. The machine can be replaced now with a new machine, which costs ₹ 1,50,000, but is much more efficient and will provide a cash inflow of ₹ 80,000 a year for 3 years. Company Y wants to know whether it should replace the equipment now or wait a year with the clear understanding that the new machine is the best of the available alternatives and that it in turn be replaced at the optimal point. Ignore tax. Take opportunity cost of capital as 10 per cent. Advise with reasons.`),
        solution: rt(String.raw`25. Statement showing present value of cash inflow of new machine when it replaces elderly machine now

<b>NPV of New Machine</b>

PV of Cash Inflow (80000 x 2.486) ₹ 1,98,880

Less: Purchase Cost of New Machine ₹ 1,50,000

₹ 48,880

Since NPV of New Machine is positive, it should be purchased.

<b>Timing Decision</b>

<b>Replace Now</b>

Current Realizable Value ₹ 80,000

NPV of New Machine ₹ 48,880

Total NPV ₹ 1,28,880

<b>Replace after 1 Year</b>

Cash Inflow for Year 1 ₹ 40000

Realisable Value of Old Machine ₹ 70000

NPV of New Machine ₹ 48,880

Total NPV after 1 Year ₹ 1,58,880

PV of Total NPV (158880/1.1) ₹ 1,44,436

<b>Advise</b>: Since Total NPV is higher in case of Replacement after one year Machine should be replaced after 1 year.`),
      },
      {
        ref: "TYK Practical Q26",
        title: "26. A machine used on a production line must be replaced at least every four years. Costs incur...",
        question: rt(String.raw`26. A machine used on a production line must be replaced at least every four years. Costs incurred to run the machine according to its age are:

|  Age of the Machine (years)  |   |   |   |   |   |
| --- | --- | --- | --- | --- | --- |
|   | 0 | 1 | 2 | 3 | 4  |
|  Purchase price (in ₹) | 60,000 |  |  |  |   |
|  Maintenance (in ₹) |  | 16,000 | 18,000 | 20,000 | 20,000  |
|  Repair (in ₹) |  | 0 | 4,000 | 8,000 | 16,000  |
|  Scrap Value (in ₹) |  | 32,000 | 24,000 | 16,000 | 8,000  |

Future replacement will be with identical machine with same cost. Revenue is unaffected by the age of the machine. Ignoring inflation and tax, determine the optimum replacement cycle. PV factors of the cost of capital of 15% for the respective four years are 0.8696, 0.7561, 0.6575 and 0.5718.`),
        solution: rt(String.raw`<b>26. Working Notes</b>

First of all, we shall calculate cash flows for each replacement cycle as follows:

<b>One Year Replacement Cycle</b>

|  Year | Replacement Cost | Maintenance &amp; Repair | Residual Value | Net cash Flow  |
| --- | --- | --- | --- | --- |
|  0 | (60,000) | - | - | (60,000)  |
|  1 | - | (16,000) | 32,000 | 16,000  |

<b>Two Years Replacement Cycle</b>

|  Year | Replacement Cost | Maintenance &amp; Repair | Residual Value | Net cash Flow  |
| --- | --- | --- | --- | --- |
|  0 | (60,000) | - | - | (60,000)  |
|  1 | - | (16,000) | - | (16,000)  |
|  2 | - | (22,000) | 24,000 | 2,000  |

<b>Three Years Replacement Cycle</b>

|  Year | Replacement Cost | Maintenance &amp; Repair | Residual Value | Net cash Flow  |
| --- | --- | --- | --- | --- |
|  0 | (60,000) | - | - | (60,000)  |
|  1 | - | (16,000) | - | (16,000)  |
|  2 | - | (22,000) | - | (22,000)  |
|  3 | - | (28,000) | 16,000 | (12,000)  |

<b>Four Years Replacement Cycle</b>

|  Year | Replacement Cost | Maintenance &amp; Repair | Residual Value | Net cash Flow  |
| --- | --- | --- | --- | --- |
|  0 | (60,000) | - | - | (60,000)  |
|  1 | - | (16,000) | - | (16,000)  |
|  2 | - | (22,000) | - | (22,000)  |
|  3 | - | (28,000) | - | (28,000)  |
|  4 | - | (36,000) | 8,000 | (28,000)  |

Now we shall calculate NPV for each replacement cycles

|   |   | 1 Year |   | 2 Years |   | 3 Years |   | 4 Years  |   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  Year | PVF@15% | Cash Flows | PV | Cash Flows | PV | Cash Flows | PV | Cash Flows | PV  |
|  0 | 1 | -60,000 | -60,000 | -60,000 | -60,000 | -60,000 | -60,000 | -60,000 | -60,000  |
|  1 | 0.8696 | 16,000 | 13,914 | -16,000 | -13,914 | -16,000 | -13,914 | -16,000 | -13,914  |
|  2 | 0.7561 | - | - | 2,000 | 1,512 | -22,000 | -16,634 | -22,000 | -16,634  |
|  3 | 0.6575 | - | - | - | 0 | -12,000 | -7,890 | -28,000 | -18,410  |
|  4 | 0.5718 | - | - | - | 0 |  | 0 | -28,000 | -16,010  |
|   |  |  | -46,086 |  | -72,402 |  | -98,438 |  | -1,24,968  |

|  Replacement Cycles |  | EAC (₹)  |
| --- | --- | --- |
|  1 Year | 46,086 | 52,997  |
|   | 0.8696 |   |
|  2 Years | 72,402 | 44,536  |
|   | 1.6257 |   |
|  3 Years | 98,438 | 43,114  |
|   | 2.2832 |   |
|  4 Years | 1,24,968 | 43,772  |
|   | 2.855 |   |

Since EAC is least in case of replacement cycle of 3 years hence machine should be replaced after every three years.

Note: Alternatively, Answer can also be computed by excluding initial outflow as there will be no change in final decision.`),
      },
      {
        ref: "TYK Practical Q27",
        title: "27. Trouble Free Solutions (TFS) is an authorized service center of a reputed domestic air cond...",
        question: rt(String.raw`27. Trouble Free Solutions (TFS) is an authorized service center of a reputed domestic air conditioner manufacturing company. All complaints/service related matters of Air conditioner are attended by this service center. The service center employs a large number of mechanics, each of whom is provided with a motor bike to attend the complaints. Each mechanic travels approximately 40000 kms per annuum. TFS decides to continue its present policy of always buying a new bike for its mechanics but wonders whether the present policy of replacing the bike every three year is optimal or not. It is of believe that as new models are entering into market on yearly basis, it wishes to consider whether a replacement of either one year or two years would be better option than present three year period. The fleet of bike is due for replacement shortly in near future.

The purchase price of latest model bike is ₹ 55,000. Resale value of used bike at current prices in market is as follows:

|  Period | ₹  |
| --- | --- |
|  1 Year old | 35,000  |
|  2 Year old | 21,000  |
|  3 Year old | 9,000  |

Running and Maintenance expenses (excluding depreciation) are as follows:

|  Year | Road Taxes Insurance etc. (₹) | Petrol Repair Maintenance etc. (₹)  |
| --- | --- | --- |
|  1 | 3,000 | 30,000  |
|  2 | 3,000 | 35,000  |
|  3 | 3,000 | 43,000  |

Using opportunity cost of capital as 10% you are required to determine optimal replacement period of bike.`),
        solution: rt(String.raw`27. In this question the effect of increasing running cost and decreasing resale value have to be weighted upto against the purchase cost of bike. For this purpose, we shall compute Equivalent Annual Cost (EAC) of replacement in different years shall be computed and compared.

|  Year | Road Taxes (₹) | Petrol etc. (₹) | Total (₹) | PVF @10% | PV (₹) | Cumulative PV (₹) | PV of Resale Price (₹) | Net Outflow (₹)  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  1 | 3,000 | 30,000 | 33,000 | 0.909 | 29,997 | 29,997 | 31,815 | (1,818)  |
|  2 | 3,000 | 35,000 | 38,000 | 0.826 | 31,388 | 61,385 | 17,346 | 44,039  |
|  3 | 3,000 | 43,000 | 46,000 | 0.751 | 34,546 | 95,931 | 6,759 | 89,172  |

Computation of EACs

|  Year* | Purchase Price of Bike (₹) | Net Outflow (₹) | Total Outflow (₹) | PVAF @ 10% | EAC* (₹)  |
| --- | --- | --- | --- | --- | --- |
|  1 | 55,000 | (1,818) | 53,182 | 0.909 | 58,506  |
|  2 | 55,000 | 44,039 | 99,039 | 1.735 | 57,083  |
|  3 | 55,000 | 89,172 | 1,44,172 | 2.486 | 57,993  |

Thus, from above table it is clear that EAC is least in case of 2 years, hence bike should be replaced every two years.

* Assume these periods are the periods from which bike shall be kept in use.
* EAC is used to bring Cash Flows occurring for different periods at one point of Time.

<b>NOTES</b>

|  |   |
| --- | --- |
|  |   |
|  |   |
|  |   |
|  |   |
|  |   |
|  |   |
|  |   |
|  |   |
|  |   |
|  |   |
|  |   |
|  |   |
|  |   |
|  |   |
|  |   |
|  |   |`),
      }
    ];

export const afmCh3CapitalBudgetingDoc: ChapterDoc = {
  id: "afm-ch3",
  storageKey: "afmch3done",
  kicker: "Advanced Financial Management - Chapter 3 - ICAI Study Material",
  heroTitle: "Advanced capital budgeting: <em>bring inflation, risk, financing effects and replacement timing into the NPV decision.</em>",
  heroStrap: "Chapter 3 moves beyond certainty assumptions: inflation and policy shifts, risk and uncertainty, statistical and conventional risk-adjustment tools, sensitivity/scenario/simulation/decision-tree analysis, replacement decisions, optimum replacement cycle and APV. All ICAI illustrations and end-of-chapter TYK questions are included from the corrected source.",
  heroStats: [{ value: "6", label: "ICAI areas" }, { value: "13", label: "Illustrations" }, { value: "27", label: "Practical TYKs" }, { value: "APV", label: "Financing effect" }, { value: "11", label: "MCQs" }],
  flow: {
    eyebrow: "Chapter spine",
    title: "Make the project cash flows honest, then choose the right risk tool",
    steps: [
      { title: "Adjust the base", body: "Inflation, technology and policy changes alter expected cash flows and discount-rate consistency." },
      { title: "Name the risk", body: "Separate risk from uncertainty and identify internal and external risk factors." },
      { title: "Measure dispersion", body: "Expected value, variance, standard deviation and coefficient of variation quantify project risk." },
      { title: "Decide", body: "Use RADR, certainty equivalents, sensitivity, scenarios, simulation, decision trees, EAC and APV." },
    ],
    foot: "Core consistency: nominal cash flows use a nominal rate; real cash flows use a real rate.",
  },
  sections: [
    { id: "current-trends", folio: "\u00b6 1", title: "Current Trends in Capital Budgeting", lede: "Capital budgeting cannot assume certainty. ICAI highlights inflation, technology change and government policy change as practical forces that distort appraisal.", blocks: [{ kind: "formula", lines: ["After-tax cash inflow = (R - C - D)(1 - T) + D = (R - C)(1 - T) + DT", "R = revenue; C = costs other than depreciation; D = depreciation; T = tax rate", "Nominal required return: RN = RR + P", "Real discount rate = [(1 + nominal discount rate) / (1 + inflation rate)] - 1"] }, textCard("Inflation and consistency", rt(String.raw`<b>1. CURRENT TRENDS IN CAPITAL BUDGETING</b>

While discussing the capital budgeting or investment evaluation techniques at Intermediate Level, we have assumed that the investment proposals do not involve any risk and cash flows of the project are known with certainty. This assumption was taken to simplify the understanding of the capital budgeting techniques. However, in practice, this assumption is not correct. In-fact, investment projects are exposed to various types of factors some of which are as follows:

(i) Inflation
(ii) Change in technology
(iii) Change in Government Policies

Now let us discuss the impact of each factor in a detailed manner.

<b>1.1 Impact of Inflation on Capital Budgeting Decisions</b>

Adjustment for inflation is a necessity for capital investment appraisal. This is because inflation will raise the revenues &amp; costs of the project. The net revenues after adjustment for inflation shall be equal to net revenues in current terms. The considerations, which cause distortion, are:

(1) Depreciation charges are based on historical costs. Tax benefits accruing from depreciation charges do not keep parity with inflation.

As annual after-tax cash inflow of a project is equal to

(R - C - D) (1 - T) + D = (R - C) (1 - T) + D T

Where,

R → Revenue from project
C → Costs (apart from depreciation) relating to the project
D → Depreciation charges
T → Tax Rate

Here (R - C) (1 - T) tends to move in line with inflation as inflation influences revenues &amp; costs similarly. DT does not depend on inflation as depreciation charges are based on historical costs. The effect of inflation is to reduce the actual rate of return.

<b>Example:</b>

Initial outlay of a project – ₹ 80,000
Expected life – 4 years
Salvage value – Nil
Annual revenues – ₹ 60,000
Annual costs other than depreciation – ₹ 20,000
Tax Rate – 50%

Depreciation on straight-line basis presuming as if there is no inflation.

|  Year | 1 | 2 | 3 | 4  |
| --- | --- | --- | --- | --- |
|  Revenues | ₹ 60,000 | ₹ 60,000 | ₹ 60,000 | ₹ 60,000  |
|  Costs other than depreciation | ₹ 20,000 | ₹ 20,000 | ₹ 20,000 | ₹ 20,000  |
|  Depreciation | ₹ 20,000 | ₹ 20,000 | ₹ 20,000 | ₹ 20,000  |
|  Taxable profit | ₹ 20,000 | ₹ 20,000 | ₹ 20,000 | ₹ 20,000  |
|  Tax | ₹ 10,000 | ₹ 10,000 | ₹ 10,000 | ₹ 10,000  |
|  Profit after tax | ₹ 10,000 | ₹ 10,000 | ₹ 10,000 | ₹ 10,000  |
|  Net cash inflow | ₹ 30,000 | ₹ 30,000 | ₹ 30,000 | ₹ 30,000  |

If there is inflation @ 10% applicable to revenues &amp; cost of project.

|  Year | 1 | 2 | 3 | 4  |
| --- | --- | --- | --- | --- |
|  Revenues | ₹ 66,000 | ₹ 72,600 | ₹ 79,860 | ₹ 87,846  |
|  Costs other than depreciation | ₹ 22,000 | ₹ 24,200 | ₹ 26,620 | ₹ 29,282  |
|  Depreciation | ₹ 20,000 | ₹ 20,000 | ₹ 20,000 | ₹ 20,000  |
|  Taxable profit | ₹ 24,000 | ₹ 28,400 | ₹ 33,240 | ₹ 38,564  |
|  Tax | ₹ 12,000 | ₹ 14,200 | ₹ 16,620 | ₹ 19,282  |
|  Profit after tax | ₹ 12,000 | ₹ 14,200 | ₹ 16,620 | ₹ 19,282  |
|  Net cash inflow | ₹ 32,000 | ₹ 34,200 | ₹ 36,620 | ₹ 39,282  |

The actual net cash flow stream after deflating for inflation rate of 10% .

|  Real Net Cash Flow | ₹ 29,091 | ₹ 28,264 | ₹ 27,513 | ₹ 26,830  |
| --- | --- | --- | --- | --- |

So actual net cash flows are less than net cash flow if there is no inflation.

(2) Costs of capital considered for investment appraisals contain a premium for anticipated inflation. Due to inflation investors require the nominal rate of return to be equal to:

Required Rate of Return in real terms plus Rate of Inflation.

Formula

R _N = R _R + P

$R_N arrow$ Required rate of return in nominal terms.

$R_R arrow$ Required rate of return in real terms.

$P arrow$ Anticipated inflation rate.

If cost of capital (required rate of return) contains a premium for anticipated inflation, the inflation factor has to be reflected in the projected cash flows.

If there is no inflation, then it has to be discounted at required rate of return in real terms.`)), textCard("Technology and government-policy changes", rt(String.raw`<b>1.2 Impact of change in technology on Capital Budgeting Decisions</b>

Generally it has been observed that those making capital Budgeting decision evaluates the proposals in monetary terms i.e. quantitative values and normally fails to consider critical factors i.e. qualitative factor that can affect the future cash flows one of such factor is technology. It is important to note that here we are not simply talking about decision to replace existing machinery with new machine having improved technology rather we are talking about the impact of technology change on capital budgeting. Now the question arises why it is important to analyze the impacts of change in technology it is because of following reason:

- Change in technology can significantly alter production process.
- Changes can also yield benefits such as improved quality, delivery time greater flexibility, etc.
- Changed technology can also result in reduction in cost of capital
- Improved cash inflows can be achieved through technological changes.
- There may be need to incur additional cost in the form of additional capital expenditure.
- The sale volume can be impacted as the anticipated life cycle of the product can be shortened because of change in consumer preference.

Now next question arises how to incorporate impact in capital budgeting decision. For this purpose it is very necessary that once the project has been launched it should be reviewed on continuous basis and if required it need to be revised in light of changes in the technology.

The various ways in which the impact of change in technology can be incorporated in capital Budgeting decisions are as follows.

1. At the time of making Capital Budgeting decisions the risk of change in technology should be considered using various techniques such as sensitivity analysis, Scenario Analysis, Simulation Analysis etc. (discussed later in this chapter)
2. Once project has been launched analyze the impact of change in technology both positive or negative and revise estimates in monetary terms.
3. If continuation of project is proving to be unviable then look for abandonment option and evaluate the same (discussed later).

4. Suitably adjusting the discounting rate.

<b>1.3 Impact of change in Government Policies on Capital Budgeting Decisions</b>

Government Policies are important external factors that impacts the capital budgeting decision because directly or indirectly they affect the future cash flows of the firm that forms the basis of capital budgeting decisions. It might be possible that Government Policy may not affect us, but it may affect our supplier, buyers, customers, service providers etc.

The impact of changes in these policies can be positive as well as negative. What is more important is that the impact of such should be analysed and if required the estimation should be revised adequately. If required, the firm should consider the option to abandon the project (discussed in later chapter of study material).

The change in Government Policy can be analysed under two headings:

i. Impact of change of Policies on Domestic Capital Budgeting Decision.
ii. Impact of change of Policies on International Capital Budgeting Decision.

While some Government policies are changed after a longer period, say five to ten years, some change from quarter to a year. The impact of each policy may vary from each other. For example, the policies such as New Industrial Policy 1991, might had drastically impacted the Capital Budgeting decisions of various firms in the beginning period of 1990s due to opening of the doors of the Indian Economy for the Global world. However, such types of policies normally come out after a longer period. On the other hand, there are some policies of the Government that are announced/ reviewed within a period of one year. Some of these are as follows:

- Fiscal policy: The use of government spending, taxation and borrowing to influence both the pattern of economic activity and level of growth of aggregate demand, output and employment.
- Monetary Policy: Monetary policy refers to the use of monetary policy instruments which are at the disposal of the central bank to regulate the availability, cost and use of money and credit to promote economic growth, price stability, optimum levels of output and employment, balance of payments equilibrium, stable currency or any other goal of government's economic policy.

Generally, the change in monetary policy depends on the economic status of the nation. In India, the monetary policy includes decisions on open market operations, variation in reserve requirements, selective credit controls, supply of currency, bank rates (Repo Rates) and other rates.

Since in India members of Monetary Policy Committee (MPC) are required to meet at least four times in a year generally changes in the policies related to above mentioned matters takes at least two to three times in a year.

Now let us discuss how changes in Government Policies affect the Capital Budgeting decision under two broad heads:

<b>1.3.1 Impact of changes in Government Policies on Domestic Capital Budgeting Decision.</b>

(a) Since the change in interest rate are decided by Government through its Monetary Policy. This can affect the Cost of Capital because the Cost of Debt is normally dependent on the bank rate of interest as they are considered as one of the important factors to compute YTM.

Though this rate change may not much affect Capital Budgeting decision because they are financed from long term source of finance but they may impact working capital decisions to a great extent. The main reason behind is that the Bank Overdraft as one of the important constituents of Working Capital and it may lead to change in cash flow estimation. Hence, it is important that though small change in Bank Interest can be ignored but a major change say about 100 basis points or so can impact cash flows of the firm and may call for revision of estimations.

(b) Another important change (Government Policy) is related to Fiscal Policy, Since Fiscal Policy forms the basis of Tax Rate and Annual Cash Flows are dependent on Rate of Depreciation of Tax Rate, any drastic change in any of these two items may call for revision of estimated cash flows.

<b>1.3.2 Impact of changes in Government Policies on International Capital Budgeting Decision.</b>

(a) In International Capital Budgeting Decisions, the foreign exchange rate play a very important role. As mentioned above the change in bank rate and money supply is decided as per Monetary Policy, the change in any of these two impacts the rate of Foreign Exchange and it may call for revision of estimates.

(b) Change in Tax Rates relating to Foreign Income or changes in provisions of Double Tax Avoiding Agreement (DTAA) as decided in Fiscal Policy may call revision of estimates.

Thus, from above discussion it can be concluded that while estimating future cash inflows change in the policies be forecasted and a proper provision should be incorporated in the expected cash flows.

<b>2. DEALING WITH RISK IN INVESTMENT DECISIONS</b>

While discussing the capital budgeting or investment evaluation techniques at Intermediate Level in the paper of Financial Management, we have assumed that the investment proposals do not involve any risk and cash flows of the project are known with certainty. This assumption was taken to simplify the understanding of the capital budgeting techniques. However, in practice, this assumption is not correct. In-fact, investment projects are exposed to various degrees of risk.

There can be three types of decision making:

(i) Decision making under certainty: When cash flows are certain.
(ii) Decision making involving risk: When cash flows involves risk and probability can be assigned.
(iii) Decision making under uncertainty: When the cash flows are uncertain and probability cannot be assigned.`)), { kind: "tyk", items: illustrationItems.trends }] },
    { id: "risk-factors", folio: "\u00b6 2-3", title: "Risk, Uncertainty and Factors Affecting Capital Budgeting", lede: "Risk allows probabilities; uncertainty does not. ICAI then maps internal and external factors that make capital budgeting cash flows risky.", blocks: [{ kind: "split", left: { tag: "Risk", tagTone: "cap", title: "Risk", body: "Cash flows are not certain, but probabilities can be assigned to possible outcomes." }, right: { tag: "Uncertainty", tagTone: "exp", title: "Uncertainty", body: "Possible outcomes may be known, but probabilities cannot be assigned reliably." } }, textCard("ICAI text: risk, uncertainty and risk factors", rt(String.raw`<b>2.1 Risk and Uncertainty</b>

Risk is the variability in terms of actual returns comparing with the estimated returns. Most common techniques of risk measurement are Standard Deviation and Coefficient of Variation. There is a thin difference between risk and uncertainty. In case of risk, probability distribution of cash flow is known. When no information is known to formulate probability distribution of cash flows, the situation is referred as uncertainty. However, these two terms are used interchangeably.

<b>2.2 Reasons for adjustment of Risk in Capital Budgeting decisions</b>

Main reasons for considering risk in capital budgeting decisions are as follows:

1. There is an opportunity cost involved while investing in a project for the level of risk. Adjustment of risk is necessary to help make the decision as to whether the returns out of the project are proportionate with the risks borne and whether it is worth investing in the project over the other investment options available.
2. Risk adjustment is required to know the real value of the Cash Inflows. Higher risk will lead to higher risk premium and also expectation of higher return.

<b>3. INTERNAL AND EXTERNAL FACTORS AFFECTING CAPITAL BUDGETING DECISION</b>

Risk arises from different factors, depending on the type of investment being considered, as well as the circumstances and the industry in which the organisation is operating. Accordingly it these factors can be divided following two broad categories:

<b>3.1 Internal Factors</b>

These factors are internal to the company, and they can further be divided into following categories:

<b>3.1.1 Project-specific risk</b>

Risks which are related to a particular project and affects the project's cash flows. It includes completion of the project in scheduled time, error of estimation in resources and allocation, estimation of cash flows etc. For example, a nuclear power project of a power generation company has different risks than hydel projects.

<b>3.1.2 Company-specific risk</b>

Risk which arise due to company specific factors like downgrading of credit rating, changes in key managerial persons, cases for violation of intellectual property rights (IPR) and other laws and regulations, dispute with workers etc. All these factors affect the cash flows of an entity and access to funds for capital investments. For example, two banks have different exposure to default risk.

<b>3.2 External Factors</b>

These factors are external to the company, and they can further be divided into following categories:

<b>3.2.1 Industry-specific risk</b>

These are the risks which effect the whole industry in which the company operates. These risks include regulatory restrictions on industry, changes in technologies etc. For example, regulatory restriction imposed on leather and breweries industries.

<b>3.2.2 Market risk</b>

The risk which arise due to market related conditions like entry of substitute, changes in demand conditions, availability and access to resources etc. For example, a thermal power project gets affected if the coal mines are unable to supply coal requirements of a thermal power company etc.

<b>3.2.3 Competition risk</b>

These are risks related with competition in the market in which a company operates. These risks are risk of entry of rival, product dynamism and change in taste and preference of consumers etc.

<b>3.2.4 Risk due to Economic conditions</b>

These are the risks which are related with macro-economic conditions like changes in monetary policies by central banks, changes in fiscal policies like introduction of new taxes and cess, inflation, changes in GDP, changes in savings and net disposable income etc.

<b>3.2.5 International risk</b>

These are risk which are related with conditions which are caused by global economic conditions like restriction on free trade, restrictions on market access, recessions, bilateral agreements, political and geographical conditions etc. For example, restriction on outsourcing of jobs to overseas markets.

<b>4. METHODS OF INCORPORATING RISK IN CAPITAL BUDGETING</b>

Techniques of risk analysis in capital budgeting can be classified as below:`))] },
    { id: "statistical-techniques", folio: "\u00b6 4.1", title: "Statistical Techniques", lede: "The statistical techniques turn possible cash flows into expected values and measures of dispersion.", blocks: [{ kind: "formula", lines: ["Expected value = Sum(Cash flow x Probability)", "Variance = Sum[(Cash flow - Expected value)^2 x Probability]", "Standard deviation = sqrt(Variance)", "Coefficient of variation = Standard deviation / Expected cash flow"] }, textCard("Probability and expected value", rt(String.raw`<b>4.1 Statistical Techniques</b>

<b>4.1.1 Probability</b>

Probability is a measure about the chances that an event will occur. When an event is certain to occur, probability will be 1 and when there is no chance of happening an event, probability will be 0.

<b>Example:</b>

|  Assumption | Cash Flows (₹) | Probability  |
| --- | --- | --- |
|  Best guess | 3,00,000 | 0.3  |
|  High guess | 2,00,000 | 0.6  |
|  Low guess | 1,20,000 | 0.1  |

In the above example chances that cash flow will be ₹ 3,00,000, ₹ 2,00,000 and ₹ 1,00,000 are 30%, 60% and 10% respectively.

<b>(i) Expected Net Cash Flows</b>

Expected Net Cash flows are calculated as the sum of the likely Cash flows of the Project multiplied by the probability of cash flows. Expected Cash flows are calculated as below:

E(R)/ENCF = Sum_i=1^n NCF_i  x  P_i

Where,
E(R)/ENCF = Expected Net Cash flows
Pᵢ = Probability of Cash flows
NCFᵢ = Net Cash flows

Example:

|  Assumption (1) | Cash Flows (₹) (2) | Probability (3) | Expected cash flow (₹) (2×3)  |
| --- | --- | --- | --- |
|  Best guess | 3,00,000 | 0.3 | 3,00,000 × 0.3 = 90,000  |
|  High guess | 2,00,000 | 0.6 | 2,00,000 × 0.6 = 1,20,000  |
|  Low guess | 1,20,000 | 0.1 | 1,20,000 × 0.1 = 12,000  |
|  Expected Net cash flow (ENCF) |   |   | 2,22,000  |

(ii) Expected Net Present Value

Expected net present value =

ENPV = Sum_t=1^n (ENCF) / ((1 + k)^t)

Where,
ENPV = Expected Net Present Value
ENCF = Expected Net Cash Flows (including both inflows and outflows)
t = Period
k = Discount rate.

(a) Expected Net Present Value - Single period

Let us understand the calculation of Expected Net Present Value (ENPV) for a single period through an illustration as follows:`)), textCard("Variance and standard deviation", rt(String.raw`<b>4.1.2 Variance</b>

Variance is a measurement of the degree of dispersion between numbers in a data set from its average. In very simple words, variance is the measurement of difference between the average of the data set from every number of the data set. Variance is calculated as below:

Variance(sigma^2) = Sum_j=1^n ( NCF_j - ENCF )^2 P_j

Where,

- $NCF_j$ = Net Cash Flow
- $ENCF$ = Expected Net Cash Flow
- $P_j$ = Probability

Variance measures the uncertainty of a value from its average. Thus, variance helps an organization to understand the level of risk it might face on investing in a project. A variance value of zero would indicate that the cash flows that would be generated over the life of the project would be same. This might happen in a case where the company has entered into a contract of providing services in return of a specific sum. A large variance indicates that there will be a large variability between the cash flows of the different years. This can happen in a case where the project being undertaken is very innovative and would require a certain time frame to market the product and enable to develop a customer base and generate revenues. A small variance would indicate that the cash flows would be somewhat stable throughout the life of the project. This is possible in case of products which already have an established market.

<b>4.1.3 Standard Deviation</b>

Standard Deviation (SD) is a degree of variation of individual items of a set of data from its average. The square root of variance is called Standard Deviation. For Capital Budgeting decisions, Standard Deviation is used to calculate the risk associated with the estimated cash flows from the project.

<b>Importance of Variance and Standard Deviation in Capital Budgeting:</b> For making capital budgeting decisions, these two concepts are important to measure the volatility in estimated cash flows and profitability in an investment proposal. Both the concepts measures the difference between the expected cash flows and estimated cash flows (mean or average). Variance measures the range of variability (difference) in cash flows data while Standard deviation determines risk in an investment proposal. An investment proposal in which expected cash flows are close to the estimated net cash flow are seen as less risky and has the potential to make profit.

Standard deviation and Variance are two different statistical concepts but are closely interrelated. Standard deviation is calculated as square root of variance, hence, variance is prerequisite for calculation of SD.`)), textCard("Coefficient of variation", rt(String.raw`<b>4.1.4 The Coefficient of Variation</b>

The standard deviation is a useful measure of calculating the risk associated with the estimated cash inflows from an Investment. However, in Capital Budgeting decisions, the management is several times faced with choosing between many investments' avenues. Under such situations, it becomes difficult for the management to compare the risk associated with different projects using Standard Deviation as each project has different estimated cash flow values. In such cases, the Coefficient of Variation becomes useful.

The Coefficient of Variation calculates the risk borne for every percent of expected return. It is calculated as:

Coefficient of variation = (Standard Deviation) / (Expected Return/Expected Cash Flow)

The Coefficient of Variation enables the management to calculate the risk borne by the concern for every unit of estimated return from a particular investment. Simply put, the investment avenue which has a lower ratio of standard deviation to expected return will provide a better risk – return trade off. Thus, when a selection has to be made between two projects, the management would select a project which has a lower Coefficient of Variation.`)), { kind: "tyk", items: illustrationItems.statistical }] },
    { id: "conventional-techniques", folio: "\u00b6 4.2", title: "Conventional Risk-adjustment Techniques", lede: "ICAI gives two conventional approaches: adjust the discount rate for risk, or adjust the cash flows to certainty equivalents.", blocks: [{ kind: "split", left: { tag: "RADR", tagTone: "cap", title: "Risk-adjusted discount rate", body: "Discount risky expected cash flows at a rate that includes a risk premium." }, right: { tag: "CE", tagTone: "gold", title: "Certainty equivalent", body: "Convert risky expected cash flows into riskless equivalents and discount at the risk-free rate." } }, textCard("Risk-adjusted discount rate", rt(String.raw`<b>4.2 Conventional Techniques</b>

<b>4.2.1 Risk Adjusted Discount Rate</b>

The use of risk adjusted discount rate (RADR) is based on the concept that investors demand higher returns from the risky projects. The required rate of return on any investment should include compensation for delaying consumption plus compensation for inflation equal to risk free rate of return, plus compensation for any kind of risk taken. If the risk associated with any investment project is higher than risk involved in a similar kind of project, discount rate is adjusted upward in order to compensate this additional risk borne. Under this method, NPV is calculated as follows:

NPV = Sum_t=1^n (NDF) / ((1+k)^t) - I

Where,

- NCFt = Net cash flow
- k = Risk adjusted discount rate (RADR)
- I = Initial Investment
- t = Period

A risk adjusted discount rate is a sum of risk-free rate and risk premium. The Risk Premium depends on the perception of risk by the investor of a particular investment and risk aversion of the Investor.

So, Risk adjusted discount rate (RADR) = Risk free rate + Risk premium

<b>Risk Free Rate</b>: It is the rate of return on Investments that bear no risk. For e.g., Government securities yield a return of 6% and bear no risk. In such case, 6% is the risk-free rate.

<b>Risk Premium</b>: It is the rate of return over and above the risk free rate, expected by the Investors as a reward for bearing extra risk. For high risk projects, the risk premium will be high and for low risk projects, the risk premium would be lower.`)), textCard("Certainty equivalent approach", rt(String.raw`<b>4.2.2 Certainty Equivalent (CE)</b>

As per CIMA terminology, "Certainty Equivalent is an approach dealing with risk in a capital budgeting context. It involves expressing risky future cash flows in terms of the certain cashflow which would be considered, by the decision maker, as their equivalent, that is the decision maker would be indifferent between the risky amount and the (lower) riskless amount considered to be its equivalent."

The certainty equivalent is a guaranteed return that the management would accept rather than accepting a higher but uncertain return. This approach allows the decision maker to incorporate his or her utility function into the analysis. In this approach a set of risk less cash flow is generated in place of the original cash flows.

<b>Steps in the Certainty Equivalent (CE) approach</b>

Step 1: Remove risks by substituting equivalent certain cash flows from risky cash flows. This can be done by multiplying each risky cash flow by the appropriate $alpha_s$ value (CE coefficient)

alpha_1 = fracCertain cash flowRisky or expected cash flow_t

Suppose on tossing out a coin, if it comes head, you will win ₹ 10,000 and if it comes out to be tail, you will win nothing. Thus, you have 50% chance of winning and expected value is ₹ 5,000 (₹ 10,000 × 0.50). In such case, if you are indifferent at receiving ₹ 3,000 for a certain amount and not playing then ₹ 3,000 will be certainty equivalent and 0.3 (i.e. ₹ 3,000/₹ 10,000) will be certainty equivalent coefficient.

Step 2: Discounted value of cash flow is obtained by applying risk less rate of interest. Since you have already accounted for risk in the numerator using CE coefficient, using the cost of capital to discount cash flows will tantamount to double counting of risk.

Step 3: After that, normal capital budgeting method is applied except in case of IRR method, where IRR is compared with risk free rate of interest rather than the firm's required rate of return.

Certainty Equivalent Coefficient transforms expected values of uncertain flows into their Certainty Equivalents. It is important to note that the value of Certainty Equivalent Coefficient lies between 0 &amp; 1. Certainty Equivalent Coefficient 1 indicates that the cash flow is certain or management is risk neutral. In industrial situation, cash flows are generally uncertain and managements are usually risk averse. Under this method, NPV is calculated as follows:

NPV = Sum_t=1^n fracalpha_t  x  NCF_t(1 + k)^t - I

Where,

$alpha_t$ = Risk-adjustment factor or the certainly equivalent coefficient

$NCF_{t}$ = Forecasts of net cash flow for year 't' without risk-adjustment

k = Risk free rate assumed to be constant for all periods

I = Initial Investment`)), { kind: "tyk", items: illustrationItems.conventional }] },
    { id: "advanced-risk-techniques", folio: "\u00b6 4.3", title: "Sensitivity, Scenario, Simulation and Decision Tree Analysis", lede: "These techniques test how a project behaves when assumptions change, combine into scenarios, become random simulations, or unfold through sequential decisions.", blocks: [{ kind: "timeline", nodes: [{ phase: "Sensitivity", title: "One variable", body: "Find variables that influence NPV or IRR and test adverse changes one at a time." }, { phase: "Scenario", title: "Combined cases", body: "Evaluate internally consistent sets of assumptions." }, { phase: "Simulation", title: "Monte Carlo", body: "Repeatedly draw values from probability distributions to generate many NPVs." }, { phase: "Decision tree", title: "Sequential choices", body: "Evaluate decision and chance nodes from right to left using EMV/NPV." }] }, textCard("Sensitivity analysis", rt(String.raw`<b>4.3 Other Techniques</b>

<b>4.3.1 Sensitivity Analysis</b>

As per CIMA terminology, "Sensitivity Analysis a modelling and risk assessment procedure in which changes are made to significant variables in order to determine the effect of these changes on the planned outcome. Particular attention is thereafter paid to variables identified as being of special significance".

Sensitivity analysis put in simple terms is a modelling technique which is used in Capital Budgeting decisions, to study the impact of changes in the variables on the outcome of the project. In a project, several variables like weighted average cost of capital, consumer demand, price of the product, cost price per unit etc. operate simultaneously. The changes in these variables impact the outcome of the project. Therefore, it becomes very difficult to assess, change in which variable impacts the project outcome in a significant way. In Sensitivity Analysis, the project outcome is studied after taking into account change in only one variable. The more sensitive is the NPV (or IRR), the more critical is that variable. So, Sensitivity analysis is a way of finding impact on the project's NPV (or IRR) for a given change in one of the variables.

<b>Steps involved in Sensitivity Analysis</b>

Sensitivity Analysis is conducted by following the steps as below:

1. Finding variables, which have an influence on the NPV (or IRR) of the project.
2. Establishing mathematical relationship between the variables.
3. Analysing the effect of the change in each of the variables on the NPV (or IRR) of the project.`)), textCard("Scenario and simulation analysis", rt(String.raw`<b>4.3.2 Scenario Analysis</b>

Although sensitivity analysis is probably the most widely used risk analysis technique, it does have limitations. Therefore, we need to extend sensitivity analysis to deal with the probability distributions of the inputs. In addition, it would be useful to vary more than one variable at a time so we could see the combined effects of changes in the variables.

Scenario analysis provides answer to these situations of extensions. This analysis brings in the probabilities of changes in key variables and also allows us to change more than one variable at a time.

This analysis begins with base case or most likely set of values for the input variables. Then, go for worst case scenario (low unit sales, low sale price, high variable cost, etc.) and best case scenario

(high unit sales, high sale price, low variable cost, etc.). Alternatively, Scenarios analysis is possible where some factors are changed positively and some factors are changed negatively.

So, in a nutshell Scenario analysis examine the risk of investment, to analyse the impact of alternative combinations of variables, on the project's NPV (or IRR).`)), textCard("Decision tree analysis", rt(String.raw`<b>4.3.4. Decision Tree Analysis</b>

Till now we have discussed simple accept-or-reject decisions which view current investments in isolation of subsequent decisions. However, practically investment decisions may have implications for future or further investment decisions and may also impact future decision and events. Such situation can be handled by taking a sequence of decisions over a period. The technique to handle this type of sequential decisions is done through "Decision Tree" technique.

Basically, decision tree is a graphic display of the relationship between a present decision and future events, future decision, and their consequences.

This approach assumes that there are only two types of situations that a finance manager has to face. The first situation is where the manager has control or power to determine what happens next. This is known as "Decision", as he can do what he desires to do.

The second situation is where finance manager has no control over what happens next. This is known as "Event". Since the outcome of the events is not known, a probability distribution needs to be assigned to the various outcomes or consequences. It should, however, be noted when a finance manager faced with a decision situation, he is assumed to act rationally. For example, in a commercial business, he will choose the most profitable course of action and in non-profit organization, the lowest cost may be rational choice.

<b>Steps involved in Decision Tree analysis:</b>

<b>Step 1- Define Investment:</b> Decision tree analysis can be applied to a variety of business decision-making scenarios. Normally it includes following types of decisions.

- Whether or not to launch a new product, if so, whether this launch should be local, national, or international.
- Whether extra production requirement should be met by extending the factory or by outsourcing it to an external supplier.
- Whether to dig for oil or not if so, upto what height and continue to dig even after finding no oil upto a certain depth.

<b>Step 2- Identification of Decision Alternatives:</b> It is very essential to clearly identify decision alternatives. For example if a company is planning to introduce a new product, it may be local launch, national launch or international launch.

<b>Step 3- Drawing a Decision Tree:</b> After identifying decision alternatives, at the relevant data such as the projected cash flows, probability distribution expected present value etc. should be put in diagrammatic form called decision tree.

While drawing a decision tree, it should be noted that NPVs etc. should be placed on the branches of decision tree, coming out of the decisions identified.

While drawing a decision tree, it should be noted that the:-

- The decision point (traditionally represented by square) is the option available for manager to take or not to take - in other words action at these points.
- The event or chance or outcome (traditionally represented by circle) which are dependent on chance process, along with the probabilities thereof, and monetary value associated with them.
- This diagram is drawn from left to right.

Step 4- Evaluating the Alternatives: After drawing out the decision the next step is the evaluation of alternatives. The various alternatives can be evaluated as follows:

(i) This procedure is carried out from the last decision in the sequence (extreme right) and goes on working back to the first (left) for each of the possible decision.

(ii) At each final stage decision point, select the alternative which has the highest NPV and truncate the other alternatives. Each decision point is assigned a value equal to the NPV of the alternative selected at the decision point.

(iii) Proceed backward in the same manner calculating the NPV at chance or event or outcome points (○) selecting the decisions alternative which has highest NPV at various decision points [□] rejecting the inferior decision option, assigning NPV to the decision point, till the first decision point is reached.

In Capital Budgeting, the decision taker has to identify and find out the various alternatives available to an investment decision. By drawing a decision tree, the alternatives are highlighted through a diagram, giving the range of possible outcomes. The stages set for drawing a decision tree is based on the following rules.

1. It begins with a decision point, also known as decision node, represented by a rectangle while the outcome point, also known as chance node, denoted by a circle.
2. Decision alternatives are shown by a straight line starting from the decision node.
3. The Decision Tree Diagram is drawn from left to right. Rectangles and circles have to be sequentially numbered.
4. Values and Probabilities for each branch are to be incorporated next.

The Value of each circle and each rectangle is computed by evaluating from right to left. This procedure is carried out from the last decision in the sequence and goes on working back to the first for each of the possible decisions. The following rules have been set for such evaluation.

(a) The expected monetary value (EMV) at the chance node with branches emanating from a circle is the aggregate of the expected values of the various branches that emanate from the chance node.

(b) The expected value at a decision node with branches emanating from a rectangle is the highest amongst the expected values of the various branches that emanate from the decision node.`)), { kind: "tyk", items: illustrationItems.other }] },
    { id: "replacement-decisions", folio: "\u00b6 5", title: "Replacement Decisions and Optimum Replacement Cycle", lede: "Replacement analysis compares incremental cash flows from old and new assets. For repeat cycles, EAC makes different lives comparable.", blocks: [{ kind: "formula", lines: ["Change in cash flow = [(Change in sales +/- Change in operating costs) - Change in depreciation](1 - tax rate) + Change in depreciation", "EAC = Present value of cash outflow / PVAF", "Choose the asset or replacement cycle with the lowest EAC when benefits are equivalent."] }, textCard("Replacement of existing machine", rt(String.raw`<b>5.1 Replacement of Existing Machine</b>

This is a decision concerning whether an existing asset should be replaced by a newer version of the same machine or even a different type of machine that has the same functionality as the existing machine. Such replacements are generally made to maintain existing levels of operations, although profitability might change due to changes in expenses (that is, the new machine might be either more expensive or cheaper to operate than the existing machine).

Evaluation of replacement projects is slightly more complicated comparing expansion projects because an existing asset is being replaced. When identifying the cash flows for replacement projects, keep in mind that the cash flows associated with the existing (replaced) asset will no longer exist if the new asset is purchased. Therefore, we must not only determine the cash flows that the new asset will generate, but we must also determine the effect of eliminating the cash flows generated by the replaced asset. For example, if a new asset that will produce cash sales equal to ₹ 100,000 per year is purchased to replace an existing asset that is generating cash sales equal to ₹ 75,000, then the incremental, or marginal, cash flow related to sales is ₹ 25,000. Likewise, if the

asset that is replaced can be sold for ₹ 350,000, then the purchase price of the new asset effectively is ₹ 350,000 less than its invoice price. In other words, for replacement decisions, we must determine the overall net effect of purchasing a new asset to replace an existing asset—the cash flows associated with the old asset will be replaced with the cash flows associated with the new asset. Two items that you must remember to include when determining the incremental cash flows are depreciation — not because it is a cash flow, but because it affects cash flows through taxes and taxes — both of which generally change when an older asset is replaced with a newer asset.

Therefore analysis of replacement decision follows certain steps:

Step I. Net cash outflow (assumed at current time /[Present value of cost]):

a. (Book value of old equipment - market value of old equipment) × Tax Rate = Tax payable/ savings from sale
b. Cost of new equipment - [Tax payable/savings from sale + market value of old equipment] = Net cash outflow

Step II. Estimate change in cash flow per year, if replacement decision is implemented.

Change in cash flow = [(Change in sales ± Change in operating costs) - Change in depreciation] (1 - tax rate) + Change in depreciation

Step III. Present value of benefits = Present value of yearly cash flows + Present value of estimated salvage of new system

Step IV. Net present value = Present value of benefits - Present value of costs

Step V. Decision rule. Accept when present value of benefits &amp;gt; present value of costs.

Reject when the opposite is true.`)), textCard("Optimum replacement cycle", rt(String.raw`<b>5.2 Optimum Replacement Cycle</b>

Case discussed above is a simple example replacement decision based on NPV. This decision was based on assumption that the projects do not form part of continuous replacement cycle.

However, sometimes, project may involve continuous replacement cycle. In such cases NPV decision rules needs modification. To determine optimal replacement cycle, concept of Equivalent Annual Cost (EAC), discussed at Intermediate (IPC) Level is used.

The formula to compute EAC is as follows:

(PV of Cash Outflow) / (PVAF)

This decision is based on assumption that as the machine (asset) becomes older its efficiency decreases and leading to increase in operating cost and reduction in resale value.`)), { kind: "tyk", items: illustrationItems.replacement }] },
    { id: "adjusted-present-value", folio: "\u00b6 6", title: "Adjusted Present Value", lede: "APV separates the investment decision from the financing decision by adding financing side effects to base-case NPV.", blocks: [{ kind: "formula", lines: ["APV = Base-case NPV + PV of tax benefit on interest", "Base-case NPV is calculated using the cost of equity assuming the company is all-equity financed."] }, textCard("Adjusted Present Value method", rt(String.raw`<b>6. ADJUSTED PRESENT VALUE</b>

As we are well aware that to evaluate a capital project we discount the expected cash flows by overall Cost of Capital i.e. WACC. Further, as discussed earlier to incorporate risk in the evaluation of any project we can adjust the same discount rate.

However instead of adjusting the cost of capital we can use an alternative approach called Adjusted Present Value (APV) Method. This approach separates the investment decision and financing decision.

Following formula is used to evaluate a project as per this approach:

Base Case NPV + PV of Tax Benefit on Interest

Base Case NPV is calculated using cost of equity assuming the company is unlevered i.e., all equity financed. Now question arises how to calculate the Unlevered Cost of Equity. It has been discussed in the chapter of Business Valuation of this Study Material.

Since viability of the project is partly dependent on how project is financed the PV of Tax Benefits on Interest payment allows for such adjustment. Thus, this method provides a broader view to evaluate a project considering the benefit of increased use of debt in financing of any project.`))] },
    { id: "test-your-knowledge", folio: "TYK", title: "Test Your Knowledge", lede: "All corrected-source theoretical and practical TYK questions are included with their answers/solutions.", blocks: [{ kind: "tyk", items: theoreticalTyk }, { kind: "tyk", items: practicalTyk }] },
    { id: "recall-bank", folio: "Quiz", title: "Recall Bank", lede: "Fast checks for formulas, risk tools and decision rules.", blocks: [{ kind: "flips", title: "Formula flashcards", items: [{ label: "Inflation", question: "What is the inflation consistency rule?", answer: "Nominal cash flows must be discounted at a nominal rate; real cash flows must be discounted at a real rate." }, { label: "Risk", question: "How is risk different from uncertainty?", answer: "Under risk, probabilities can be assigned to possible outcomes; under uncertainty, they cannot be assigned reliably." }, { label: "CV", question: "Why use coefficient of variation?", answer: "It compares relative risk when expected cash flows or returns differ." }, { label: "APV", question: "What does APV add to base-case NPV?", answer: "The present value of financing side effects, especially tax benefit on interest." }] }, { kind: "quiz", items: [
      { question: "Which appraisal consistency rule is correct under inflation?", options: ["Nominal cash flows with nominal discount rate; real cash flows with real discount rate", "Nominal cash flows with risk-free rate only", "Real cash flows with nominal WACC only", "Inflation is ignored when tax exists"], answer: 0, why: "ICAI stresses that cash flows and discount rate must treat inflation consistently." },
      { question: "Why does inflation distort depreciation tax shields?", options: ["Depreciation is based on historical cost", "Depreciation automatically rises with inflation", "Depreciation is a cash outflow", "Tax is ignored in capital budgeting"], answer: 0, why: "The DT benefit does not keep parity with inflation." },
      { question: "Risk differs from uncertainty because under risk:", options: ["Probabilities can be assigned to outcomes", "Cash flows are certain", "Only one outcome exists", "The discount rate is zero"], answer: 0, why: "Risk permits probability assignment; uncertainty does not." },
      { question: "Coefficient of variation is most useful when:", options: ["Projects have different expected values", "Projects have identical expected values only", "There is no risk", "Tax rate is unknown"], answer: 0, why: "CV compares relative risk per unit of expected return/cash flow." },
      { question: "RADR incorporates risk by:", options: ["Increasing the discount rate for riskier projects", "Reducing the initial outlay", "Ignoring project life", "Discounting at zero"], answer: 0, why: "Higher project risk is reflected through a higher required return." },
      { question: "Certainty equivalent approach converts:", options: ["Risky expected cash flows into riskless equivalent amounts", "NPV into IRR", "Depreciation into salvage value", "Nominal rate into tax rate"], answer: 0, why: "CE adjusts cash flows and then discounts at a risk-free rate." },
      { question: "Sensitivity analysis asks:", options: ["What happens if one variable changes?", "Which source of finance is cheapest?", "What is the legal form?", "How many shares should be issued?"], answer: 0, why: "It varies one relevant input and observes the effect on NPV/IRR." },
      { question: "Scenario analysis extends sensitivity analysis by:", options: ["Combining assumptions into complete cases", "Using one variable only", "Eliminating probabilities", "Replacing NPV with book profit"], answer: 0, why: "Scenario analysis evaluates internally consistent sets of assumptions." },
      { question: "Monte Carlo simulation produces:", options: ["A distribution of possible NPVs", "One certain cash flow", "A depreciation schedule", "Only payback period"], answer: 0, why: "Repeated random draws create many simulated NPVs." },
      { question: "Equivalent annual cost is used for:", options: ["Replacement alternatives with different lives", "Dividend policy only", "Mutual fund NAVs", "Futures valuation"], answer: 0, why: "EAC converts PV costs into comparable annual costs." },
      { question: "APV separates:", options: ["Investment decision from financing effects", "Revenue from cost inflation only", "Risk from uncertainty only", "Fixed cost from variable cost"], answer: 0, why: "APV adds financing side effects to base-case NPV." }
    ] }] },
  ],
  footer: "Chapter 3 - Advanced Capital Budgeting Decisions - built from the corrected ICAI Study Material markdown.",
};
