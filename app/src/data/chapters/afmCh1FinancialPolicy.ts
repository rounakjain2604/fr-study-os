// AFM Chapter 1 — Financial Policy and Corporate Strategy.
//
// Authored from the ICAI CA Final AFM (Paper 2) Study Material, Chapter 1
// (ICAI_Materials_Text/02_AFM_Advanced_Financial_Management/001 - Chapter 1 ...).
// Section numbering (¶1–¶6) follows the ICAI chapter.

import type { ChapterDoc } from "../chapterDoc";

export const afmCh1FinancialPolicyDoc: ChapterDoc = {
  id: "afm-ch1",
  storageKey: "afmch1done",
  kicker: "Advanced Financial Management · Chapter 1 · ICAI Study Material",
  heroTitle: "Where money meets strategy: <em>the CFO's expanded role, and how financial policy funds, shapes and limits corporate strategy.</em>",
  heroStrap:
    "A theory chapter. Six blocks: the advanced role of the CFO, the strategic financial decision-making framework, strategy at three hierarchy levels, financial planning, the financial-policy / strategy interface, and the one number the exam loves — the sustainable growth rate. Learn the definitions and lists verbatim.",
  heroStats: [
    { value: "6", label: "ICAI sections" },
    { value: "4", label: "Key decisions" },
    { value: "3", label: "Strategy levels" },
    { value: "SGR", label: "Growth rate" },
    { value: "8", label: "MCQs" },
  ],
  flow: {
    eyebrow: "Chapter spine",
    title: "Strategy + Finance + Management = Fundamentals of Business",
    steps: [
      { title: "CFO & value creation", body: "From controls and compliance to risk, supply chain, M&A and ESG financing." },
      { title: "Decisions & levels", body: "Financing, investment, dividend and portfolio decisions — set at corporate, SBU and functional levels." },
      { title: "Plan & interface", body: "Financial planning (FR + FT + FG); capital structure is the key interface with strategy." },
      { title: "Sustainable growth", body: "Grow only as fast as policy can fund: SGR = ROE × (1 − payout)." },
    ],
    foot: "Objective throughout · maximise shareholders' wealth",
  },
  sections: [
    {
      id: "cfo",
      folio: "¶ 1",
      title: "Advanced Role of the CFO in Value Creation",
      lede: "Traditionally the CFO's job was <strong>wealth maximisation</strong> — guarding the firm's financial health and running adequate financial controls. Globalisation, the information explosion and the pandemic have <strong>drastically expanded</strong> that brief.",
      blocks: [
        {
          kind: "split",
          left: {
            tag: "Traditional",
            tagTone: "ntr",
            title: "Govern, comply, control",
            body: "Wealth maximisation for shareholders, overseeing financial health, and implementing adequate financial controls — plus governance, compliance and business ethics.",
          },
          right: {
            tag: "Advanced",
            tagTone: "cap",
            title: "Strategic & operational partner",
            body: "On top of the traditional role, today's CFO contributes to <b>strategic and operational decision-making</b>, taking a leadership role in <b>value creation</b> — and on a <b>sustainable</b> basis for the long term.",
          },
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Area a",
              tagTone: "cap",
              title: "Risk Management",
              body: "CFOs now look after the overall functioning of the organisation's <b>risk-management framework</b>.",
            },
            {
              tag: "Area b",
              tagTone: "cap",
              title: "Supply Chain",
              body: "Post-pandemic supply-chain stress threatens sustainable growth; as caretakers of finance, CFOs judge the <b>financial viability</b> of supply-chain management.",
            },
            {
              tag: "Area c",
              tagTone: "cap",
              title: "Mergers, Acquisitions & Restructuring",
              body: "A spate of M&A to hold growth and market share makes the CFO crucial — an error in these <b>strategic</b> decisions can collapse the whole business.",
            },
            {
              tag: "Area d",
              tagTone: "cap",
              title: "ESG Financing",
              body: "With ESG evolving, the CFO's role shifts from traditional financing to <b>sustainability financing</b>.",
            },
          ],
        },
      ],
    },
    {
      id: "framework",
      folio: "¶ 2",
      title: "Strategic Financial Decision-Making Framework",
      lede: "Capital investment is the <strong>springboard for wealth creation</strong>. Because capital is the limiting factor, the strategic problem is allocating limited funds between competing uses so the firm can sustain or raise investor returns.",
      blocks: [
        {
          kind: "note",
          body: "Every business needs three fundamental essentials: <b>(1)</b> a clear and realistic strategy, <b>(2)</b> the financial resources, controls and systems to see it through, and <b>(3)</b> the right management team and processes to make it happen. Hence: <b>Strategy + Finance + Management = Fundamentals of Business</b>.",
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Definition",
              tagTone: "ntr",
              title: "Strategy",
              body: "The <b>long-term direction and scope</b> of an organisation to achieve <b>competitive advantage</b> through the configuration of resources within a changing environment, for the fulfilment of stakeholders' aspirations and expectations.",
            },
            {
              tag: "¶ 2.1",
              tagTone: "cap",
              title: "Strategic Financial Management",
              body: "The <b>application of financial management techniques to strategic decisions</b> to help achieve the decision-maker's objectives. It marries the backward-looking, report-focused discipline of accounting with the forward-looking subject of financial management — identifying strategies that <b>maximise market value</b> and allocating scarce capital among competing opportunities.",
            },
          ],
        },
        {
          kind: "bullets",
          items: [
            "<b>Functions of SFM (¶ 2.2):</b> continual search for the best investment opportunities;",
            "selection of the best, most profitable opportunities;",
            "determination of the optimal mix of funds for the opportunities;",
            "establishment of systems for internal controls; and",
            "analysis of results for future decision-making.",
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Key decisions ×4",
              tagTone: "cap",
              title: "The scope of financial strategy",
              bullets: [
                "<b>Financing decisions</b> — the mode of financing / mix of equity and debt capital",
                "<b>Investment decisions</b> — profitable use of funds, especially long-term capital projects (return vs risk)",
                "<b>Dividend decisions</b> — split of earnings between payouts and reinvestment",
                "<b>Portfolio decisions</b> — evaluate investments by their contribution to the whole corporation, not in isolation",
              ],
              note: "Financing, investment and dividend decisions were met at Intermediate; <b>portfolio decisions</b> are developed later in this Study Material.",
            },
            {
              tag: "Planning horizons",
              tagTone: "ntr",
              title: "Strategic · tactical · operational",
              body: "<b>Strategy</b> is a long-term course of action (senior management); <b>tactics</b> are intermediate plans (middle management); <b>operations</b> are short-term functions (line management). The investment and financing functions apply across all three horizons.",
            },
          ],
        },
      ],
    },
    {
      id: "levels",
      folio: "¶ 3",
      title: "Strategy at Different Hierarchy Levels",
      lede: "Strategies at different levels are the outcome of different planning needs. There are <strong>three levels</strong> — corporate, business unit and functional.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Level 1",
              tagTone: "cap",
              title: "Corporate level",
              body: "Concerned with the <b>selection of businesses</b> the company should compete in, and coordinating that portfolio of businesses.",
            },
            {
              tag: "Level 2",
              tagTone: "cap",
              title: "Business-unit (SBU) level",
              body: "An SBU is any <b>profit centre</b> that can be planned independently. The issues: practical coordination of operating units and building/sustaining a <b>competitive advantage</b> for its products and services.",
            },
            {
              tag: "Level 3",
              tagTone: "cap",
              title: "Functional level",
              body: "Operating divisions and departments (R&D, operations, marketing, finance, HR). Among these, <b>finance assumes the highest importance</b> — it mobilises and deploys money, the most critical resource.",
            },
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Corporate-level test",
              tagTone: "gold",
              title: "Three questions a corporate strategy must answer",
              table: {
                columns: ["Test", "What it asks"],
                rows: [
                  { label: "<b>Suitability</b>", values: ["Would the strategy work to accomplish the company's common objective?"] },
                  { label: "<b>Feasibility</b>", values: ["What kind and number of resources are needed to formulate and implement it?"] },
                  { label: "<b>Acceptability</b>", values: ["Are the stakeholders satisfied? — can be financial and non-financial."] },
                ],
              },
            },
            {
              tag: "Top-down / bottom-up",
              tagTone: "ntr",
              title: "How the levels interact",
              body: "Functional units feed information (customer feedback, resources and capabilities) up to business-unit and corporate strategy; once the higher-level strategy is set, functions translate it into discrete action plans. Corporate strategy deploys resources; <b>financial strategy mobilises and effectively utilises money</b>.",
            },
          ],
        },
      ],
    },
    {
      id: "planning",
      folio: "¶ 4",
      title: "Financial Planning",
      lede: "Financial planning is the <strong>backbone</strong> of business and corporate planning — a systematic approach to maximise existing financial resources using financial tools to achieve financial goals.",
      blocks: [
        {
          kind: "formula",
          lines: [
            "<b>Financial Planning = FR + FT + FG</b>",
            "FR = Financial Resources · FT = Financial Tools · FG = Financial Goals",
          ],
        },
        {
          kind: "cards",
          columns: 3,
          items: [
            { tag: "Component 1", tagTone: "ntr", title: "Financial Resources (FR)", body: "The funds the firm has and can mobilise — internally generated and externally raised." },
            { tag: "Component 2", tagTone: "ntr", title: "Financial Tools (FT)", body: "The techniques used to deploy resources toward the goals — budgeting, appraisal, analysis." },
            { tag: "Component 3", tagTone: "ntr", title: "Financial Goals (FG)", body: "The financial objectives, consistent with the corporate mission and objectives, decided at the very outset." },
          ],
        },
        {
          kind: "note",
          body: "<b>Outcomes of financial planning:</b> financial objectives, financial decision-making, and financial measures for evaluating corporate performance (e.g. <b>ratio analysis</b> and <b>cash-flow statement analysis</b>) — the chosen measures depend on the corporate objectives.",
        },
      ],
    },
    {
      id: "interface",
      folio: "¶ 5",
      title: "Interface of Financial Policy & Strategic Management",
      lede: "The <strong>starting point</strong> of an organisation is money and its <strong>end point</strong> is also money. No firm can run a business or fund expansion without a suitable internally- and/or externally-mobilised financial base.",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Dimension 1 — the key one",
              tagTone: "cap",
              title: "Sources of finance & capital structure",
              body: "Funds come from <b>ownership capital</b> (equity / preference shares) and <b>borrowed capital</b> (debentures); public deposits give short/medium-term funds; overdraft, cash credit, bill discounting, bank loans and trade credit give short-term funds.",
              note: "Debt–equity norms (for minimising the risk of excessive loans): <b>public sector ≈ 1:1</b>, <b>private sector ≈ 2:1</b> — but the ideal varies by industry; capital-intensive industries carry a much higher proportion of debt.",
            },
            {
              tag: "Dimension 2",
              tagTone: "cap",
              title: "Investment & fund-allocation decisions",
              body: "A planner frames policies for fixed-asset investment and current-asset restraint. Investment proposals fall into three groups:",
              bullets: [
                "Addition of a <b>new product</b>",
                "Increasing the level of operation of an existing product (more capacity / a new plant)",
                "<b>Cost reduction</b> and efficient resource use",
              ],
            },
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Dimension 3",
              tagTone: "cap",
              title: "Dividend policy",
              body: "Decides earnings <b>distributed as dividend</b> vs <b>retained</b> for expansion. From a long-term funding view, dividend is the part of earnings that cannot be profitably used by the firm.",
              bullets: [
                "<b>Stability</b> of dividend has a positive impact on share prices",
                "A <b>constant percentage</b> of net earnings aids flexibility and signals lower risk",
                "Some pay a <b>minimum dividend + extra</b> when earnings are above normal",
                "Cash vs <b>stock dividend</b> must also be examined",
              ],
            },
            {
              tag: "Interdependence",
              tagTone: "gold",
              title: "Cause and effect run both ways",
              body: "Financial policy cannot be framed in isolation of other functional policies — it shapes investors' awareness of the firm. So financial policy must be considered <b>during corporate planning itself</b>: sometimes corporate strategy is the cause and financial policy the effect, and sometimes the reverse.",
            },
          ],
        },
      ],
    },
    {
      id: "sgr",
      folio: "¶ 6",
      title: "Balancing Financial Goals vis-à-vis Sustainable Growth",
      lede: "Sustainable growth forces managers to weigh the <strong>financial consequences of sales increases</strong> and to set growth goals consistent with the firm's operating and financial policies. Too fast or too slow both hurt — finance should keep growth close to the sustainable rate.",
      blocks: [
        {
          kind: "formula",
          lines: [
            "<b>SGR = ROE × (1 − Dividend-payout ratio)</b>",
            "= ROE × retention ratio (b)",
            "Driving variables: net profit margin · asset-turnover ratio · assets-to-equity ratio · retention rate",
            "Decomposition (ROE = margin × asset turnover × equity multiplier) gives the familiar P × R × A × T view — same result.",
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Higgins' model",
              tagTone: "cap",
              title: "Three assumptions of the SGR",
              bullets: [
                "Maintain a <b>target capital structure without issuing new equity</b>",
                "Maintain a <b>target dividend-payout ratio</b>",
                "Increase sales <b>as rapidly as market conditions allow</b>",
              ],
              note: "Because the only new equity is retained earnings, sales and assets cannot grow faster than retained earnings plus the debt those earnings can support. If the firm <i>is</i> willing to issue equity, there is in principle no financial constraint on growth.",
            },
            {
              tag: "Twin cornerstones",
              tagTone: "gold",
              title: "Strategy AND capability",
              body: "Achieving sustainable growth needs both a <b>growth strategy</b> and <b>growth capability</b> (the infrastructure to execute it). An excellent strategy without the infrastructure — or vice-versa — dooms long-term growth.",
            },
          ],
        },
        {
          kind: "note",
          body: "<b>Mature firms</b> often grow <i>slower</i> than their SGR; with surplus cash they raise dividends, buy back stock, cut debt — or acquire fast-growing companies (raising actual growth). <b>Inflation</b> raises the external finance required and, if a historical-cost debt-equity ratio must stay constant, <b>lowers the sustainable growth rate</b>.",
        },
        {
          kind: "tyk",
          items: [
            {
              ref: "Worked sum",
              title: "Compute the sustainable growth rate",
              question:
                "A company earns PAT of ₹4 crore on equity of ₹25 crore and pays out 30% of profits as dividend. Find its sustainable growth rate.",
              solution:
                "ROE = PAT ÷ Equity = 4 ÷ 25 = <b>16%</b>. Retention b = 1 − 0.30 = 0.70.<br/>SGR = ROE × (1 − payout) = 16% × 0.70 = <b>11.2%</b>.<br/><br/>So the firm can grow sales/assets about 11.2% a year on its current margins, asset use, payout and leverage — without issuing new equity. Faster growth needs external finance, a higher retention or better margins. (Cross-check via the P×R×A×T decomposition gives the same 11.2% because P×A×T = ROE.)",
            },
            {
              ref: "TYK 1",
              title: "Explain the interface of financial policy and strategic management",
              question: "Explain the interface of financial policy and strategic management. (ICAI TYK — refer ¶ 5.)",
              solution:
                "The starting and ending point of any organisation is money, so financial policy and strategy are inseparable. The <b>most important dimension</b> is the <b>sources of finance and capital structure</b> — ownership vs borrowed capital and the debt–equity mix (norms ≈ 1:1 public, 2:1 private, varying by industry). The second is <b>investment and fund-allocation</b>: framing policies for fixed and current assets and selecting among new-product, capacity-expansion and cost-reduction proposals via capital budgeting. The third is <b>dividend policy</b> — the split between distribution and retention, and its signalling effect on share price. Because investors judge the firm through its financial policy, that policy must be settled <b>during corporate planning itself</b>: corporate strategy can be the cause and financial policy the effect, or vice-versa.",
            },
            {
              ref: "TYK 2",
              title: "Short note — balancing financial goals vis-à-vis sustainable growth",
              question: "Write a short note on balancing financial goals vis-à-vis sustainable growth. (ICAI TYK — refer ¶ 6.)",
              solution:
                "Sustainable growth (Higgins) is the maximum rate of sales growth a firm can sustain given its profitability, asset utilisation, dividend payout and leverage — i.e. the most it can grow <b>without issuing new equity</b>: <b>SGR = ROE × (1 − payout)</b>. The model assumes a target capital structure with no new equity, a target payout, and sales growing as fast as the market allows. A conflict arises when growth goals are inconsistent with the sustainable rate: growing too fast opens a financing gap (raise equity/debt, retain more, or slow down); growing too slowly leaves surplus cash to return or redeploy. Sustainable growth needs both a growth <b>strategy</b> and the <b>capability/infrastructure</b> to deliver it, so finance must keep actual growth close to the sustainable rate.",
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
              question: "Which is NOT one of the four post-pandemic areas where the CFO's role has advanced (per ICAI)?",
              options: ["Risk management", "Supply chain", "ESG financing", "Statutory audit sign-off"],
              answer: 3,
              why: "ICAI lists risk management, supply chain, M&A/restructuring and ESG financing — not signing the statutory audit.",
            },
            {
              question: "“Strategy + Finance + Management” equals:",
              options: ["Corporate governance", "Fundamentals of business", "The balanced scorecard", "Working capital"],
              answer: 1,
              why: "ICAI: the three fundamental essentials sum to the Fundamentals of Business.",
            },
            {
              question: "How many key decisions fall within the scope of financial strategy per ICAI?",
              options: ["Two", "Three", "Four (financing, investment, dividend, portfolio)", "Five"],
              answer: 2,
              why: "ICAI lists four — financing, investment, dividend and portfolio decisions.",
            },
            {
              question: "A corporate-level strategy must answer Suitability, Feasibility and:",
              options: ["Affordability", "Acceptability", "Availability", "Accountability"],
              answer: 1,
              why: "The three tests are Suitability, Feasibility and Acceptability (stakeholder satisfaction).",
            },
            {
              question: "Financial Planning, per ICAI, equals:",
              options: ["FR + FT + FG", "Debt + Equity", "NPV + IRR", "Risk + Return"],
              answer: 0,
              why: "Financial Planning = Financial Resources + Financial Tools + Financial Goals.",
            },
            {
              question: "The most important dimension of the financial-policy / strategy interface is:",
              options: ["Dividend declaration dates", "Sources of finance and capital structure", "The audit timetable", "Petty-cash controls"],
              answer: 1,
              why: "ICAI states sources of finance and capital structure are the most important dimensions.",
            },
            {
              question: "The ICAI debt-equity norm cited for private-sector firms is approximately:",
              options: ["1:1", "2:1", "1:2", "3:1"],
              answer: 1,
              why: "Public sector ≈ 1:1, private sector ≈ 2:1 — varying by industry.",
            },
            {
              question: "The sustainable growth rate (Higgins) equals:",
              options: ["ROE × payout ratio", "ROE × (1 − payout ratio)", "ROCE × payout ratio", "Net margin × payout ratio"],
              answer: 1,
              why: "SGR = ROE × (1 − dividend-payout) = ROE × retention ratio.",
            },
          ],
        },
      ],
    },
  ],
  footer:
    "AFM Chapter 1 · Financial Policy and Corporate Strategy — built from the ICAI Study Material (Chapter 1). Section numbers follow the ICAI chapter; verify any figure against your book.",
};
