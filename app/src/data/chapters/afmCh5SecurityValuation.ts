// AFM Chapter 5 - Security Valuation.
//
// Built from the corrected ICAI Chapter 5 markdown as an exam-ready native doc.
// The concept manifest is intentionally explicit so a student can complete the
// chapter from the app without reopening the module for coverage checks.

import type { ChapterDoc } from "../chapterDoc";

export const afmCh5SecurityValuationDoc: ChapterDoc = {
  id: "afm-ch5",
  storageKey: "afmch5done",
  kicker: "Advanced Financial Management - Chapter 5 - ICAI Study Material",
  heroTitle: "Security valuation is <em>cash flow, risk, and time.</em>",
  heroStrap:
    "Value any security by identifying the cash flows, selecting the matching discount rate, and discounting them correctly. Chapter 5 applies this one idea to equity, preference shares, bonds, rights, convertibles, money-market instruments and valuation assignments.",
  heroStats: [
    { value: "10", label: "Core blocks" },
    { value: "31", label: "TYK patterns" },
    { value: "18", label: "Formula families" },
    { value: "3", label: "Equity models" },
    { value: "Bond", label: "Heavy area" },
    { value: "Manifest", label: "Coverage check" },
  ],
  flow: {
    eyebrow: "First principles",
    title: "From security to value",
    steps: [
      { title: "Cash flow", body: "Decide whether the investor receives dividends, FCFE, FCFF, coupons, redemption value, discount income or conversion value." },
      { title: "Risk rate", body: "Match the discount rate: Ke for equity cash flows, Ko/WACC for firm cash flows, Kp for preference shares and Kd/YTM for bonds." },
      { title: "Timing", body: "Place each cash flow at the correct date: annual, semi-annual, supernormal-growth period, maturity, repo term or T-bill maturity." },
      { title: "Decision", body: "Compare intrinsic value with market price, compute yield, identify premium/discount, or decide whether the security/transaction is worthwhile." },
    ],
    foot: "Cash flow type decides discount rate; timing decides the marks",
  },
  sections: [
    {
      id: "manifest",
      folio: "Manifest",
      title: "Concept Manifest: Do Not Skip These",
      lede:
        "This is the chapter completion checklist. If you can explain or solve every row below without looking, Chapter 5 is covered from the app.",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "A",
              tagTone: "gold",
              title: "Return, risk and discount-rate selection",
              table: {
                columns: ["Coverage", "Exam-ready when you can"],
                rows: [
                  { label: "Required return", values: ["Define it as opportunity cost / cost of capital for similar risk."] },
                  { label: "Discount rate", values: ["Explain why different cash flows may need different risk rates."] },
                  { label: "IRR", values: ["Set market price = PV of cash inflows and interpret reinvestment risk."] },
                  { label: "Equity risk premium", values: ["Compute Rx - Rf = beta x (Rm - Rf)."] },
                  { label: "CAPM Ke", values: ["Use Ke = Rf + beta(Rm - Rf), then feed Ke into DDM/FCFE."] },
                  { label: "Nominal vs real cash flow", values: ["Use nominal cash flows with nominal discount rates in equity valuation."] },
                ],
              },
            },
            {
              tag: "B",
              tagTone: "cap",
              title: "Equity valuation patterns",
              table: {
                columns: ["Coverage", "Exam-ready when you can"],
                rows: [
                  { label: "One-year holding", values: ["P0 = (D1 + P1) / (1 + Ke)."] },
                  { label: "Zero-growth DDM", values: ["P0 = D / Ke."] },
                  { label: "Constant-growth DDM", values: ["P0 = D1 / (Ke - g), with Ke > g."] },
                  { label: "Two-stage DDM", values: ["PV supernormal dividends + PV terminal price."] },
                  { label: "Three-stage / H model", values: ["Normal-growth value plus abnormal-growth premium."] },
                  { label: "Gordon earnings model", values: ["Value = EPS1(1-b)/(Ke - br)."] },
                  { label: "Walter model", values: ["Use D + (E-D)(r/Ke), then divide by Ke."] },
                  { label: "P/E multiple", values: ["Value = EPS x PE, after preference dividend."] },
                  { label: "CAPM + DDM", values: ["Compute Ke by CAPM before valuing share."] },
                  { label: "Bonus/buyback/dividend suspension", values: ["Value the altered dividend stream and terminal price."] },
                ],
              },
            },
            {
              tag: "C",
              tagTone: "exp",
              title: "FCF, enterprise value, rights and preference shares",
              table: {
                columns: ["Coverage", "Exam-ready when you can"],
                rows: [
                  { label: "FCFF from NI/EBIT/EBITDA/CFO", values: ["Build FCFF from any starting point and discount at Ko/WACC."] },
                  { label: "FCFE", values: ["NI + depreciation - capex - delta NWC + net debt + net preference issue - preference dividend."] },
                  { label: "DDM vs FCFE", values: ["Explain why FCFE can be better when dividends are below distributable cash."] },
                  { label: "Enterprise value", values: ["EV = market cap + debt + minority interest - cash/non-operating assets as relevant."] },
                  { label: "EV/Sales and EV/EBITDA", values: ["Know when these multiples are useful."] },
                  { label: "Rights valuation", values: ["Compute TERP/ex-right price and value per right."] },
                  { label: "Preference shares", values: ["Value irredeemable as perpetuity and redeemable as PV of dividend + redemption."] },
                ],
              },
            },
            {
              tag: "D",
              tagTone: "danger",
              title: "Debt, yield, duration and bond strategy",
              table: {
                columns: ["Coverage", "Exam-ready when you can"],
                rows: [
                  { label: "Bond basics", values: ["Par, coupon, maturity, redemption and frequency."] },
                  { label: "Bond price", values: ["PV of coupon annuity + PV of redemption value."] },
                  { label: "YTM", values: ["Find rate that equates PV of cash flows to market price."] },
                  { label: "Semi-annual bond", values: ["Halve coupon and yield; double number of periods."] },
                  { label: "Price-yield relationship", values: ["Yields up means prices down; premium/discount pulls to par over time."] },
                  { label: "Macaulay duration", values: ["Weighted average time of PV cash flows."] },
                  { label: "Modified duration / volatility", values: ["Estimate price change for yield movement."] },
                  { label: "Immunization", values: ["Match portfolio duration with investment horizon."] },
                  { label: "Yield curve / forward rates", values: ["Derive implied forward rates from spot/coupon bonds."] },
                  { label: "Term structure theories", values: ["Expectation, liquidity preference and preferred habitat."] },
                  { label: "Convexity adjustment", values: ["Improve duration estimate for larger yield changes."] },
                ],
              },
            },
            {
              tag: "E",
              tagTone: "ntr",
              title: "Convertibles, warrants and money-market instruments",
              table: {
                columns: ["Coverage", "Exam-ready when you can"],
                rows: [
                  { label: "Convertible debentures", values: ["Compute conversion value, premium, downside risk and parity price."] },
                  { label: "Warrants", values: ["Theoretical value = (market price - exercise price) x shares per warrant."] },
                  { label: "Zero coupon bonds", values: ["Explain discount issue, no coupon and lump-sum maturity value."] },
                  { label: "Bond refunding", values: ["NPV of interest savings versus call premium, issue cost and tax effects."] },
                  { label: "T-bills", values: ["Solve issue price/yield using discount yield formula."] },
                  { label: "Commercial bills/CD/CP", values: ["Compute front-end discount and effective yield/cost."] },
                  { label: "Repo/reverse repo", values: ["Compute dirty price, margin and maturity repayment."] },
                ],
              },
            },
            {
              tag: "F",
              tagTone: "gold",
              title: "Valuer theory and answer-writing",
              table: {
                columns: ["Coverage", "Exam-ready when you can"],
                rows: [
                  { label: "Role of valuers", values: ["M&A, slump sale, conversion of debt/security, capital reduction and restructuring."] },
                  { label: "Code of conduct", values: ["Integrity, competence, independence, confidentiality, records, fees and restrictions."] },
                  { label: "Before accepting assignment", values: ["Narrative plus numbers; assumptions; data quality; emotion/market story."] },
                  { label: "Theory questions", values: ["Duration < maturity and zero coupon bond short notes."] },
                ],
              },
            },
          ],
        },
        {
          kind: "trap",
          body:
            "<b>Completion rule:</b> do not mark this chapter done just by reading formulas. You must be able to choose the model from the facts: DDM vs FCFE, Ke vs Ko, annual vs semi-annual, market price vs intrinsic value, and yield vs discount.",
        },
      ],
    },
    {
      id: "return-framework",
      folio: "1",
      title: "Return Concepts And Discount Rate Selection",
      lede:
        "Every valuation starts with the return demanded for the risk. The exam often hides the valuation model behind the words required return, opportunity cost, discount rate, IRR or CAPM.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Required return",
              tagTone: "gold",
              title: "Minimum acceptable return",
              body:
                "Required rate of return is the minimum return expected by an investor for an investment of similar risk. It is also called opportunity cost or cost of capital.",
            },
            {
              tag: "Discount rate",
              tagTone: "cap",
              title: "Risk-adjusted present-value rate",
              body:
                "The discount rate converts future cash flows into present value. Different cash flows can have different risk premiums because inflation, maturity, liquidity and default risk can differ.",
            },
            {
              tag: "IRR",
              tagTone: "exp",
              title: "Rate that equates price and PV",
              body:
                "IRR is the discount rate at which the PV of a security's expected cash flows equals its market price. Actual annual return may differ if interim cash flows are reinvested at a rate different from IRR.",
            },
          ],
        },
        {
          kind: "formula",
          lines: [
            "Present Value = CF1/(1+r1) + CF2/(1+r2)^2 + ... + CFn/(1+rn)^n",
            "IRR: Market Price = Sum of expected cash flows discounted at IRR",
            "Equity Risk Premium = Rx - Rf = beta x (Rm - Rf)",
            "Required Return on Equity (CAPM): Ke = Rf + beta(Rm - Rf)",
            "Use nominal cash flows with nominal discount rate; use real cash flows with real discount rate",
            "Equity cash flows -> Ke; firm cash flows -> Ko/WACC; preference dividends -> Kp; bond cash flows -> Kd/YTM",
          ],
        },
        {
          kind: "flips",
          title: "Fast model selection",
          items: [
            {
              label: "Ke",
              question: "Which discount rate is used for dividends and FCFE?",
              answer: "<b>Ke</b>, the required return on equity.",
            },
            {
              label: "Ko",
              question: "Which discount rate is used for FCFF?",
              answer: "<b>Ko / WACC</b>, because FCFF belongs to all capital providers.",
            },
            {
              label: "Nominal",
              question: "In equity valuation, does ICAI prefer nominal or real cash flows?",
              answer: "<b>Nominal cash flows</b> and nominal discount rate, because taxes are generally stated in nominal terms.",
            },
          ],
        },
      ],
    },
    {
      id: "equity-valuation",
      folio: "2",
      title: "Valuation Of Equity Shares",
      lede:
        "Equity valuation in this chapter has three families: dividend based, earning based and cash-flow based. The model is chosen from what the question gives.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "DDM",
              tagTone: "gold",
              title: "Dividend based models",
              bullets: [
                "Assume annual dividend.",
                "First dividend is received at the end of year 1.",
                "Sale price is normally ex-dividend at year end.",
                "Use Ke as discount rate.",
              ],
            },
            {
              tag: "Earnings",
              tagTone: "cap",
              title: "Earning based models",
              bullets: [
                "Use when value is tied to EPS, retention and return on retained earnings.",
                "Gordon earnings model uses retention ratio and ROE.",
                "Walter model links dividend policy with r versus Ke.",
                "P/E approach values share as EPS x multiple.",
              ],
            },
            {
              tag: "Cash flow",
              tagTone: "exp",
              title: "Free cash flow models",
              bullets: [
                "FCFE values equity directly.",
                "FCFF values the firm as a whole.",
                "FCFE uses Ke; FCFF uses Ko/WACC.",
                "FCFE is useful when dividends do not represent distributable cash.",
              ],
            },
          ],
        },
        {
          kind: "formula",
          lines: [
            "One-year holding: P0 = (D1 + P1) / (1 + Ke)",
            "Zero-growth DDM: P0 = D / Ke",
            "Constant-growth DDM: P0 = D1 / (Ke - g) = D0(1+g)/(Ke-g), where Ke > g",
            "Two-stage DDM: P0 = PV of supernormal dividends + Pn/(1+Ke)^n",
            "Terminal price after supernormal growth: Pn = D0(1+g1)^n(1+g2)/(Ke-g2)",
            "H Model: P0 = D0(1+gn)/(r-gn) + D0 x H x (gc-gn)/(r-gn)",
            "Gordon earnings model: Value = EPS1(1-b)/(Ke - b r)",
            "Walter model: Value = [D + (E-D)(r/Ke)] / Ke",
            "P/E approach: Value = EPS x PE Ratio",
            "EPS = (PAT - Preference Dividend) / Number of Equity Shares",
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Exam instinct",
              tagTone: "gold",
              title: "Choose the model from the facts",
              table: {
                columns: ["Question facts", "Use"],
                rows: [
                  { label: "Dividend, growth and Ke", values: ["DDM / Gordon growth."] },
                  { label: "High growth for finite years, then normal growth", values: ["Two-stage DDM."] },
                  { label: "Growth declines gradually", values: ["Three-stage logic / H model if asked."] },
                  { label: "EPS, ROE, retention", values: ["Gordon earnings or Walter model."] },
                  { label: "P/E multiple given", values: ["EPS x P/E, after preference dividend."] },
                  { label: "Beta, market return and risk-free rate", values: ["First compute Ke using CAPM, then value."] },
                ],
              },
            },
            {
              tag: "Trap",
              tagTone: "danger",
              title: "Growth must be handled carefully",
              bullets: [
                "Use D1 in the numerator for constant-growth DDM.",
                "Do not use D0 directly unless the formula explicitly multiplies by (1+g).",
                "Terminal value starts one period after supernormal growth ends.",
                "Ke must be greater than perpetual growth rate.",
                "Bonus issue changes number of shares and dividend base; it does not create value by itself.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "fcf-ev-rights-pref",
      folio: "3",
      title: "FCFF, FCFE, Enterprise Value, Rights And Preference Shares",
      lede:
        "This section covers the items students often skip because they look smaller than DDM and bonds. They are still testable and appear in practical patterns.",
      blocks: [
        {
          kind: "formula",
          lines: [
            "FCFF from NI = Net Income + Interest(1-tax) + Depreciation - Capex - Increase in non-cash NWC",
            "FCFF from EBIT = EBIT(1-tax) + Depreciation - Capex - Increase in non-cash NWC",
            "FCFF from EBITDA = EBITDA(1-tax) + Depreciation x tax rate - Capex - Increase in non-cash NWC",
            "FCFF from FCFE = FCFE + Interest(1-tax) + Principal prepaid - New debt issued + Preferred dividend",
            "FCFF from CFO = CFO + Interest(1-tax) - Capex",
            "FCFE = Net Income + Depreciation - Capex - Increase in non-cash NWC + New debt - Debt repayment + Net preference issue - Preference dividend",
            "Enterprise Value = Market capitalisation + interest-bearing debt + minority interest - cash and non-operating assets, as relevant",
            "TERP / Ex-right price = (value of existing shares + subscription money received) / total shares after rights",
            "Value per right = (Ex-right price - Subscription price) / number of existing shares required for one right share",
            "Irredeemable preference value = Dividend / required return on preference share",
            "Redeemable preference value = PV of preference dividends + PV of redemption value",
          ],
        },
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "FCFE vs DDM",
              tagTone: "gold",
              title: "Why FCFE can be better",
              body:
                "DDM values only dividends actually paid. FCFE values cash available after operating expenses, interest, net debt obligations, capex and working capital needs. If payout is low despite healthy cash, DDM may undervalue equity.",
            },
            {
              tag: "Enterprise value",
              tagTone: "cap",
              title: "Value of the whole business",
              body:
                "EV is more comprehensive than equity value because it considers both debt and equity claims and is less distorted by capital structure. EV/Sales helps when earnings are negative; EV/EBITDA is common for capital-intensive or acquisition analysis.",
            },
            {
              tag: "Preference shares",
              tagTone: "exp",
              title: "Like fixed-income valuation",
              body:
                "Preference shares usually have fixed dividends. Irredeemable preference shares are valued like perpetuities; redeemable preference shares are valued like bonds with dividend cash flows and redemption value.",
            },
          ],
        },
        {
          kind: "trap",
          body:
            "<b>Rights trap:</b> a right issue does not automatically create wealth. Wealth is preserved when the shareholder considers both ex-right share value and the value/cost of rights subscribed or sold.",
        },
      ],
    },
    {
      id: "bonds",
      folio: "4",
      title: "Bond Valuation, YTM And Price Behaviour",
      lede:
        "Bond questions are formula-heavy but predictable. Most answers are PV of coupons plus PV of redemption, then interpretation of premium, discount, YTM or price change.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Bond basics",
              tagTone: "ntr",
              title: "Four inputs",
              bullets: [
                "Par/face value: amount stated on the bond.",
                "Coupon rate and frequency: annual, semi-annual etc.",
                "Maturity: total time till redemption.",
                "Redemption: par, premium or bullet repayment.",
              ],
            },
            {
              tag: "Price",
              tagTone: "gold",
              title: "PV of promised cash flows",
              body:
                "Bond value is the present value of periodic interest payments plus the present value of maturity/redemption value, discounted at Kd or YTM required for similar risk.",
            },
            {
              tag: "YTM",
              tagTone: "cap",
              title: "Yield inside the market price",
              body:
                "YTM is the discount rate at which PV of all future bond cash flows equals the market price. In exams, find it by equation, interpolation or trial as required.",
            },
          ],
        },
        {
          kind: "formula",
          lines: [
            "Bond value: V = Sum I/(1+Kd)^t + F/(1+Kd)^n",
            "Shortcut: V = I(PVIFA Kd,n) + F(PVIF Kd,n)",
            "Semi-annual bond: V = (I/2)(PVIFA Kd/2, 2n) + F(PVIF Kd/2, 2n)",
            "YTM: Market price = PV of coupons and redemption discounted at YTM",
            "Approximate YTM = [Annual interest + (Redemption value - Market price)/n] / [(Redemption value + Market price)/2]",
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Theorems",
              tagTone: "gold",
              title: "Bond value rules",
              table: {
                columns: ["Condition", "Effect"],
                rows: [
                  { label: "YTM = coupon rate", values: ["Bond sells at par."] },
                  { label: "YTM > coupon rate", values: ["Bond sells at discount."] },
                  { label: "YTM < coupon rate", values: ["Bond sells at premium."] },
                  { label: "Longer maturity", values: ["Greater price change for a given yield change."] },
                  { label: "Time passes", values: ["Premium/discount bond price moves toward par at maturity."] },
                ],
              },
            },
            {
              tag: "Zero coupon",
              tagTone: "exp",
              title: "No coupon, only maturity value",
              body:
                "Zero coupon bonds are issued at a discount and pay no coupon during life. At maturity, the investor receives face value. Corporate ZCBs may offer higher return but also higher risk depending on issuer strength and maturity.",
            },
          ],
        },
      ],
    },
    {
      id: "duration-yield",
      folio: "5",
      title: "Duration, Immunization, Yield Curve And Convexity",
      lede:
        "This is the bond-risk section. Duration estimates sensitivity; immunization uses duration; the yield curve explains term structure; convexity improves duration's linear estimate.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Duration",
              tagTone: "gold",
              title: "Weighted average recovery time",
              body:
                "Duration is the weighted average time in which the investor recovers the true cost of the bond through the present value of coupons and principal.",
            },
            {
              tag: "Why < maturity",
              tagTone: "cap",
              title: "Coupon bonds pay before maturity",
              body:
                "A coupon-carrying bond returns part of investment through coupons before final maturity. Therefore its weighted average recovery time is normally less than maturity.",
            },
            {
              tag: "Risk",
              tagTone: "danger",
              title: "Higher duration means higher rate risk",
              body:
                "Higher time to maturity increases duration; higher coupon and higher YTM reduce duration. Longer duration means greater price sensitivity to interest-rate changes.",
            },
          ],
        },
        {
          kind: "formula",
          lines: [
            "Macaulay Duration = Sum[t x PV(CFt)] / Bond price",
            "Modified Duration = Macaulay Duration / (1 + YTM / compounding periods per year)",
            "Approximate % price change = - Modified Duration x change in yield",
            "Volatility in ICAI solutions often means Duration / (1 + yield)",
            "Immunization condition: Duration of bond/portfolio = investor's holding period",
            "Convexity coefficient C* = (V+ + V- - 2V0) / [2 x V0 x (delta y)^2]",
            "Convexity adjustment = C* x (delta y)^2 x 100",
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Yield curve",
              tagTone: "exp",
              title: "Term structure of rates",
              body:
                "The yield curve shows how YTM relates to maturity for bonds similar in all respects except maturity. It may slope upward, downward, be flat or take other shapes depending on expectations, liquidity preference and market segmentation.",
            },
            {
              tag: "Forward rates",
              tagTone: "gold",
              title: "Spot plus future one-period rates",
              body:
                "Forward rates are implied rates applicable to future periods. A multi-year bond can be valued either using a single YTM or by discounting each cash flow by the product of spot and forward rates.",
            },
          ],
        },
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Expectation",
              tagTone: "ntr",
              title: "Future short rates",
              body:
                "Long-term interest rates are treated as unbiased estimators of future short-term interest rates.",
            },
            {
              tag: "Liquidity preference",
              tagTone: "ntr",
              title: "Premium for longer maturity",
              body:
                "Risk-averse investors demand extra return for longer maturities and lower liquidity; normal curve is upward sloping.",
            },
            {
              tag: "Preferred habitat",
              tagTone: "ntr",
              title: "Maturity-segment demand and supply",
              body:
                "Investors prefer particular maturity segments. If pulled out of habitat, they require compensation; this shapes the yield curve.",
            },
          ],
        },
      ],
    },
    {
      id: "convertibles-money-market",
      folio: "6",
      title: "Convertibles, Warrants, Refunding And Money-Market Instruments",
      lede:
        "These topics look scattered, but the exam tests them as compact definitions or direct computations. Keep the formulas ready.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Convertibles",
              tagTone: "gold",
              title: "Debt plus conversion option",
              body:
                "Convertible debentures can be converted into equity shares after a specified period. Conversion ratio is shares per debenture; conversion price is the price paid for each share through conversion.",
            },
            {
              tag: "Warrants",
              tagTone: "cap",
              title: "Detachable share subscription right",
              body:
                "A warrant gives the holder the right to subscribe equity shares at a stated price. Unlike convertible debentures, warrants may be detachable and are exercised by cash payment.",
            },
            {
              tag: "Refunding",
              tagTone: "exp",
              title: "Replace high coupon with lower coupon",
              body:
                "Bond refunding is evaluated by NPV: present value of after-tax interest savings versus cash outflows like call premium, issue cost and transition costs.",
            },
          ],
        },
        {
          kind: "formula",
          lines: [
            "Conversion value = Market price per equity share x number of shares received per debenture",
            "Conversion premium = Market price of convertible bond - conversion value",
            "Stock value of bond = Market price of share x shares per bond",
            "Downside risk % = (Convertible bond market price - straight bond value) / convertible bond market price x 100",
            "Conversion parity price = Convertible bond market price / number of shares",
            "Theoretical warrant value = (Market price of share - Exercise price) x number of shares per warrant",
            "T-bill yield: Y = [(F - P)/P] x 365/M x 100",
            "Commercial bill / CD / CP effective yield = (FV - SV)/SV x days or months in year / M x 100",
            "Repo dirty price = clean price + accrued interest; apply margin to determine first-leg cash as required by question",
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Money market",
              tagTone: "ntr",
              title: "Instrument recall",
              bullets: [
                "Call money: overnight funds.",
                "Notice money: funds for 2 to 14 days.",
                "Treasury bills: government short-term instruments issued at discount.",
                "Commercial bills: trade bills arising from genuine credit transactions.",
                "Certificate of deposit: negotiable term deposit issued by banks at market rates.",
                "Commercial paper: unsecured negotiable promissory note by highly rated corporates.",
                "Repo: sale of securities with agreement to repurchase; reverse repo is the lender's view.",
              ],
            },
            {
              tag: "Repo vs reverse",
              tagTone: "danger",
              title: "Perspective matters",
              bullets: [
                "Repo is viewed from the seller/borrower of funds.",
                "Reverse repo is viewed from the lender/supplier of funds.",
                "Repo helps meet deficiency of funds.",
                "Reverse repo absorbs excess liquidity.",
                "Repo rate is normally higher than reverse repo rate.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "valuers",
      folio: "7",
      title: "Role, Responsibilities And Precautions Of Valuers",
      lede:
        "This is theory-heavy but testable. Write it in clean headings: where valuation is required, code of conduct, and precautions before accepting an assignment.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Role",
              tagTone: "gold",
              title: "When valuation is statutorily needed",
              bullets: [
                "Mergers, acquisitions, demergers and takeovers.",
                "Slump sale, asset sale, IPR sale and liquidation values.",
                "Conversion of debt/security and foreign investment transactions.",
                "Capital reduction and listed-security regulations.",
                "Strategic financial restructuring and court/statutory requirements.",
              ],
            },
            {
              tag: "Conduct",
              tagTone: "cap",
              title: "Model code themes",
              bullets: [
                "Integrity and fairness.",
                "Professional competence and due care.",
                "Independence and disclosure of interest.",
                "Confidentiality.",
                "Information management and working papers.",
                "Transparent remuneration and no undisclosed fees.",
                "Restrictions on excessive assignments and incompatible work.",
              ],
            },
            {
              tag: "Precautions",
              tagTone: "exp",
              title: "Before accepting valuation assignment",
              bullets: [
                "Valuation is an estimate, not a precise number.",
                "Quality depends on assumptions, data and understanding of the business.",
                "Do not rely only on historical financial statements.",
                "Narrative drivers like scalability, replication, growth and cross-sell matter.",
                "Numbers and story must meet in the middle.",
                "Market emotion can affect valuation outcomes.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "exam-blueprint",
      folio: "Exam",
      title: "What ICAI Can Test From This Chapter",
      lede:
        "The source TYK contains 2 theory questions and 31 practical questions. The list below converts them into testable exam patterns.",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Theory bank",
              tagTone: "gold",
              title: "Direct theory questions",
              bullets: [
                "Why duration of a coupon-carrying bond is less than maturity.",
                "Short note on zero coupon bonds.",
                "Meaning of required return, discount rate and IRR.",
                "Equity risk premium and CAPM.",
                "Nominal versus real cash flow and correct discount-rate matching.",
                "DDM versus FCFE.",
                "Enterprise value and EV multiples.",
                "Bond value theorems and price-yield relationship.",
                "Immunization and term-structure theories.",
                "Convertible debentures and warrants.",
                "Money-market instruments and repo/reverse repo.",
                "Role, responsibilities and precautions of valuers.",
              ],
            },
            {
              tag: "Numerical bank",
              tagTone: "cap",
              title: "Practical patterns from TYK",
              bullets: [
                "Dividend growth model plus Walter model.",
                "Rights issue: ex-right price, right value and shareholder wealth.",
                "Two-stage / multi-stage DDM.",
                "P/E multiple and earnings-growth model.",
                "Finite growth with expected future market price.",
                "Ke from DDM under constant and supernormal growth.",
                "Adjusted normal yield based share valuation.",
                "CAPM plus dividend growth model.",
                "FCFE based share valuation.",
                "P/E, retention and growth sensitivity.",
                "Income statement -> sustainable growth -> DDM fair price.",
                "Bonus issue and buyback impact on value/EPS.",
                "Bond price at multiple yields and YTM.",
                "Semi-annual bond pricing.",
                "Convertible bond premium, exercise decision, downside risk and parity.",
                "Bond refunding decision.",
                "Duration, volatility, expected price change and immunization.",
                "T-bill issue price, short-term investment breakeven, CP proceeds and repo settlement.",
              ],
            },
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Theory writing",
              tagTone: "ntr",
              title: "ICAI theory answer structure",
              bullets: [
                "Start with a one-line definition.",
                "Write 4-6 crisp ICAI terms.",
                "Add formula only if the concept is computational.",
                "End with use, effect or conclusion.",
              ],
            },
            {
              tag: "Practical writing",
              tagTone: "ntr",
              title: "ICAI numerical answer structure",
              bullets: [
                "State the model selected from the facts.",
                "Write the formula before substitution.",
                "Show each year's cash flow and discount factor.",
                "Keep terminal value separate from interim cash flows.",
                "Conclude: undervalued/overvalued, buy/not buy, exercise/not exercise, refund/not refund.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "icai-practice",
      folio: "Practice",
      title: "ICAI-Style Answer Writing Practice",
      lede:
        "These are representative answer frames for the full TYK bank. Master these patterns and the 31 practical questions become variations, not surprises.",
      blocks: [
        {
          kind: "tyk",
          items: [
            {
              ref: "Theory 1",
              title: "Duration of coupon bond",
              question: "Why should the duration of a coupon-carrying bond always be less than the time to its maturity?",
              solution:
                "<div class='exam-answer'><p class='exam-lead'>Duration is the weighted average time within which the investor recovers the true cost of the bond through the present value of its cash flows.</p><div class='exam-box'><h4>ICAI answer</h4><p>A coupon-carrying bond pays periodic coupons before maturity and repays principal at maturity. Since part of the investment is recovered before final maturity through coupon payments, the weighted average recovery time is less than the bond's maturity. Only a zero coupon bond, where the entire cash flow is received at maturity, has duration equal to maturity.</p></div></div>",
            },
            {
              ref: "Theory 2",
              title: "Zero Coupon Bonds",
              question: "Write a short note on Zero Coupon Bonds.",
              solution:
                "<div class='exam-answer'><p class='exam-lead'><b>Zero Coupon Bonds</b> are bonds that do not pay periodic coupon interest during their life.</p><div class='exam-box'><h4>Points to write</h4><ol><li>They are issued at a discount to face value.</li><li>At maturity, the investor receives face value as a lump sum.</li><li>The difference between issue price and maturity value represents return to the investor.</li><li>They are useful for long-range planning because maturity dates are generally long term.</li><li>Corporate ZCBs may offer higher return but also carry issuer and maturity risk.</li></ol></div></div>",
            },
            {
              ref: "Pattern 1",
              title: "Dividend growth plus Walter model",
              question: "A share has book value, ROE, retention ratio and Ke. Show how to value it using DGM and Walter's model.",
              solution:
                "<div class='exam-answer'><table class='exam-table'><thead><tr><th>Step</th><th>Working pattern</th></tr></thead><tbody><tr><td>EPS</td><td>Book value per share x ROE.</td></tr><tr><td>Dividend</td><td>EPS x payout ratio, where payout = 1 - retention.</td></tr><tr><td>Growth</td><td>g = retention ratio x ROE.</td></tr><tr><td>DGM</td><td>P0 = D1/(Ke - g).</td></tr><tr><td>Walter</td><td>P0 = [D + (E-D)(r/Ke)] / Ke.</td></tr></tbody></table><div class='exam-box'><h4>Conclusion</h4><p>State both values separately and do not mix dividend growth model with Walter's earnings-retention adjustment.</p></div></div>",
            },
            {
              ref: "Pattern 2",
              title: "Rights issue",
              question: "How should a rights issue question be solved?",
              solution:
                "<div class='exam-answer'><table class='exam-table'><thead><tr><th>Step</th><th>ICAI working</th></tr></thead><tbody><tr><td>1</td><td>Compute number of right shares from the offer ratio.</td></tr><tr><td>2</td><td>Compute subscription money = right shares x subscription price.</td></tr><tr><td>3</td><td>TERP = (market value of old shares + subscription money) / total shares after issue.</td></tr><tr><td>4</td><td>Value of right = cum-right price - ex-right price, or per-shareholding value as required.</td></tr><tr><td>5</td><td>For shareholder wealth, compare value of shares plus value/cost of rights before and after.</td></tr></tbody></table><div class='exam-box'><h4>Conclusion</h4><p>Right issue normally reallocates value; it does not create wealth merely because shares are issued below market price.</p></div></div>",
            },
            {
              ref: "Pattern 3",
              title: "Two-stage DDM",
              question: "A dividend grows at high rate for a few years and normal rate thereafter. Show the solution skeleton.",
              solution:
                "<div class='exam-answer'><table class='exam-table'><thead><tr><th>Step</th><th>Working pattern</th></tr></thead><tbody><tr><td>Interim dividends</td><td>Forecast D1 to Dn using supernormal growth.</td></tr><tr><td>Terminal dividend</td><td>D(n+1) = Dn x (1 + normal growth).</td></tr><tr><td>Terminal price</td><td>Pn = D(n+1)/(Ke - normal growth).</td></tr><tr><td>Present value</td><td>Discount D1 to Dn and Pn at Ke.</td></tr><tr><td>Value</td><td>P0 = PV interim dividends + PV terminal price.</td></tr></tbody></table><div class='exam-box'><h4>Trap</h4><p>Do not discount terminal price from year n+1. Pn is located at the end of the supernormal period.</p></div></div>",
            },
            {
              ref: "Pattern 4",
              title: "CAPM plus DDM",
              question: "A question gives beta, risk-free rate, market return, dividend and growth. How should it be solved?",
              solution:
                "<div class='exam-answer'><table class='exam-table'><thead><tr><th>Step</th><th>Working pattern</th></tr></thead><tbody><tr><td>Ke</td><td>Ke = Rf + beta(Rm - Rf).</td></tr><tr><td>D1</td><td>D1 = D0(1+g), unless dividend given is already next year's dividend.</td></tr><tr><td>Price</td><td>P0 = D1/(Ke - g).</td></tr><tr><td>Sensitivity</td><td>If beta, Rf or growth changes, recompute Ke and price.</td></tr></tbody></table><div class='exam-box'><h4>Conclusion</h4><p>Higher beta or risk-free rate raises Ke and lowers value; higher sustainable growth raises value, provided Ke remains greater than g.</p></div></div>",
            },
            {
              ref: "Pattern 5",
              title: "FCFE valuation",
              question: "A question gives PAT, equity capital, debt ratio, beta, capex, depreciation and working-capital change. Show how to value the share.",
              solution:
                "<div class='exam-answer'><table class='exam-table'><thead><tr><th>Step</th><th>Working pattern</th></tr></thead><tbody><tr><td>Shares</td><td>Number of shares = equity capital / face value.</td></tr><tr><td>EPS / NI per share</td><td>PAT / number of shares.</td></tr><tr><td>Ke</td><td>Use CAPM if beta, Rf and Rm are given.</td></tr><tr><td>FCFE per share</td><td>NI + depreciation - capex - delta working capital + net borrowing, adjusted per share.</td></tr><tr><td>Value</td><td>For stable growth: P0 = FCFE1/(Ke - g).</td></tr></tbody></table><div class='exam-box'><h4>Trap</h4><p>Debt ratio affects the reinvestment financed by debt. Do not treat all capex and working-capital needs as equity-funded if the question gives a debt ratio.</p></div></div>",
            },
            {
              ref: "Pattern 6",
              title: "Bond pricing and YTM",
              question: "How should a normal coupon bond valuation/YTM question be presented?",
              solution:
                "<div class='exam-answer'><table class='exam-table'><thead><tr><th>Step</th><th>ICAI working</th></tr></thead><tbody><tr><td>Coupon</td><td>I = face value x coupon rate.</td></tr><tr><td>Price</td><td>V = I(PVIFA Kd,n) + redemption value(PVIF Kd,n).</td></tr><tr><td>YTM</td><td>Set market price equal to PV of coupons and redemption and solve for Kd/YTM.</td></tr><tr><td>Interpretation</td><td>If YTM > coupon, bond is at discount; if YTM < coupon, bond is at premium.</td></tr></tbody></table><div class='exam-box'><h4>Conclusion</h4><p>State maximum price if investor requires a yield; state yield if market price is given.</p></div></div>",
            },
            {
              ref: "Pattern 7",
              title: "Semi-annual bond",
              question: "How do you handle a bond where interest is payable half-yearly?",
              solution:
                "<div class='exam-answer'><table class='exam-table'><thead><tr><th>Input</th><th>Convert to</th></tr></thead><tbody><tr><td>Annual coupon</td><td>Half-year coupon = annual coupon / 2.</td></tr><tr><td>Annual yield</td><td>Half-year yield = annual yield / 2.</td></tr><tr><td>Years to maturity</td><td>Number of periods = years x 2.</td></tr><tr><td>Formula</td><td>V = (I/2)(PVIFA Kd/2, 2n) + F(PVIF Kd/2, 2n).</td></tr></tbody></table><div class='exam-box'><h4>Trap</h4><p>Do not discount half-year coupons with annual yield for annual periods.</p></div></div>",
            },
            {
              ref: "Pattern 8",
              title: "Duration and price change",
              question: "A bond question asks for market price, duration, volatility and expected price after yield change. Show the steps.",
              solution:
                "<div class='exam-answer'><table class='exam-table'><thead><tr><th>Step</th><th>Working pattern</th></tr></thead><tbody><tr><td>Price</td><td>PV of coupons and redemption at YTM.</td></tr><tr><td>Duration table</td><td>For each year: cash flow, PV factor, PV, and t x PV.</td></tr><tr><td>Macaulay duration</td><td>Sum(t x PV) / bond price.</td></tr><tr><td>Modified duration / volatility</td><td>Macaulay duration / (1 + YTM).</td></tr><tr><td>Price change</td><td>Approx % change = - modified duration x change in yield.</td></tr></tbody></table><div class='exam-box'><h4>Conclusion</h4><p>If yield increases, expected price falls. If yield decreases, expected price rises.</p></div></div>",
            },
            {
              ref: "Pattern 9",
              title: "Immunization with two bonds",
              question: "An investor needs a target amount after a fixed horizon and has two bonds. What is the solution method?",
              solution:
                "<div class='exam-answer'><table class='exam-table'><thead><tr><th>Step</th><th>Working pattern</th></tr></thead><tbody><tr><td>Target PV</td><td>Discount target amount at current yield for the holding period.</td></tr><tr><td>Bond durations</td><td>Compute/identify duration of each bond.</td></tr><tr><td>Weights</td><td>Set weighted duration = required holding period.</td></tr><tr><td>Investment split</td><td>Allocate target PV between bonds using the duration weights.</td></tr><tr><td>Quantity</td><td>Number of bonds = rupee investment / current bond price.</td></tr></tbody></table><div class='exam-box'><h4>Conclusion</h4><p>Buy both bonds if a combination is required to match the investment horizon; this immunizes the target value against rate changes.</p></div></div>",
            },
            {
              ref: "Pattern 10",
              title: "Convertible bond",
              question: "How do you solve convertible bond premium, downside risk and parity questions?",
              solution:
                "<div class='exam-answer'><table class='exam-table'><thead><tr><th>Measure</th><th>Formula</th></tr></thead><tbody><tr><td>Conversion value</td><td>Market price per share x conversion ratio.</td></tr><tr><td>Premium over conversion value</td><td>Market price of convertible bond - conversion value.</td></tr><tr><td>Downside risk %</td><td>(Convertible price - straight bond value) / convertible price x 100.</td></tr><tr><td>Conversion premium</td><td>Convertible price - stock value of bond.</td></tr><tr><td>Parity price</td><td>Convertible bond price / number of shares.</td></tr></tbody></table><div class='exam-box'><h4>Exercise decision</h4><p>Compare conversion value with straight bond/redemption value or holding value. Exercise when conversion value is more beneficial.</p></div></div>",
            },
            {
              ref: "Pattern 11",
              title: "Bond refunding",
              question: "How should a bond refunding decision be analysed?",
              solution:
                "<div class='exam-answer'><table class='exam-table'><thead><tr><th>Step</th><th>Working pattern</th></tr></thead><tbody><tr><td>Annual saving</td><td>Old after-tax interest - new after-tax interest.</td></tr><tr><td>PV of savings</td><td>Discount annual savings for remaining life.</td></tr><tr><td>Outflows</td><td>Call premium, issue cost, overlap/transition interest and other cash costs.</td></tr><tr><td>Tax effects</td><td>Consider tax shield/write-off effects if given.</td></tr><tr><td>NPV</td><td>PV savings - PV/cash outflows.</td></tr></tbody></table><div class='exam-box'><h4>Conclusion</h4><p>Refund if NPV is positive; do not refund if NPV is negative.</p></div></div>",
            },
            {
              ref: "Pattern 12",
              title: "T-bill, CP and CD yield",
              question: "How do you solve discount money-market instrument questions?",
              solution:
                "<div class='exam-answer'><table class='exam-table'><thead><tr><th>Instrument</th><th>Working pattern</th></tr></thead><tbody><tr><td>T-bill</td><td>Y = [(F-P)/P] x 365/M x 100; rearrange for P if yield is given.</td></tr><tr><td>CP/CD/Bill</td><td>Discount = FV x discount rate x period; sale value = FV - discount.</td></tr><tr><td>Effective yield</td><td>(FV - SV)/SV x days or months in year / M x 100.</td></tr></tbody></table><div class='exam-box'><h4>Trap</h4><p>Front-end discount means yield/cost is computed on net proceeds, not face value.</p></div></div>",
            },
            {
              ref: "Pattern 13",
              title: "Repo settlement",
              question: "How should a repo question asking dirty price and maturity repayment be solved?",
              solution:
                "<div class='exam-answer'><table class='exam-table'><thead><tr><th>Step</th><th>Working pattern</th></tr></thead><tbody><tr><td>Accrued interest</td><td>Coupon x face value x accrued days / day-count base.</td></tr><tr><td>Dirty price</td><td>Clean price + accrued interest.</td></tr><tr><td>Apply margin</td><td>Compute initial cash using dirty value adjusted for margin as question requires.</td></tr><tr><td>Repo interest</td><td>Initial cash x repo rate x repo days / day-count base.</td></tr><tr><td>Repayment</td><td>Initial cash + repo interest.</td></tr></tbody></table><div class='exam-box'><h4>Conclusion</h4><p>State both dirty price and maturity repayment; use the day-count convention given in the question.</p></div></div>",
            },
            {
              ref: "Pattern 14",
              title: "Valuer theory answer",
              question: "Write an ICAI-style answer on role and responsibilities of valuers.",
              solution:
                "<div class='exam-answer'><p class='exam-lead'>Valuers provide independent estimates of value for statutory, transactional and reporting purposes. Their work must combine technical valuation, business understanding and professional conduct.</p><div class='exam-grid'><div class='exam-box'><h4>Role</h4><ol><li>M&A, demerger and takeover valuation.</li><li>Slump sale, asset sale, IPR sale and liquidation value.</li><li>Conversion of debt/security and foreign investment transactions.</li><li>Capital reduction and listed-security regulations.</li><li>Strategic restructuring and court/statutory requirements.</li></ol></div><div class='exam-box'><h4>Responsibilities</h4><ol><li>Integrity and fairness.</li><li>Professional competence and due care.</li><li>Independence and disclosure of interest.</li><li>Confidentiality and proper records.</li><li>Transparent remuneration and no success fee as independent valuer.</li></ol></div></div></div>",
            },
          ],
        },
        {
          kind: "drill",
          yesLabel: "Correct model",
          noLabel: "Wrong model",
          items: [
            {
              prompt: "Question gives beta, Rf, Rm, D0 and g. Use CAPM first, then DDM.",
              capitalise: true,
              why: "Beta data exists to compute Ke; DDM then converts dividend stream into value.",
            },
            {
              prompt: "Question gives FCFF. Discount it at Ke because shareholders own the company.",
              capitalise: false,
              why: "FCFF belongs to all providers of capital, so use Ko/WACC, not Ke.",
            },
            {
              prompt: "Semi-annual bond: use annual coupon and annual yield without adjustment.",
              capitalise: false,
              why: "Coupon and yield must be converted to half-year periods and maturity doubled.",
            },
            {
              prompt: "Coupon bond duration should normally be less than maturity.",
              capitalise: true,
              why: "Coupons recover part of the value before maturity, lowering weighted average time.",
            },
            {
              prompt: "T-bill yield should be computed on issue price/purchase price, not face value.",
              capitalise: true,
              why: "The formula uses (F-P)/P, annualised for days to maturity.",
            },
          ],
        },
      ],
    },
    {
      id: "final-quiz",
      folio: "Quiz",
      title: "Full Chapter Check",
      blocks: [
        {
          kind: "quiz",
          items: [
            {
              question: "FCFE should normally be discounted at:",
              options: ["Ke", "Kd", "Ko/WACC", "Risk-free rate only"],
              answer: 0,
              why: "FCFE is cash flow available to equity shareholders, so Ke is the matching discount rate.",
            },
            {
              question: "If YTM is greater than the coupon rate, the bond will generally sell at:",
              options: ["Premium", "Par", "Discount", "Conversion value"],
              answer: 2,
              why: "Investors require more than the coupon offers, so price must fall below par.",
            },
            {
              question: "In a two-stage DDM, terminal value is calculated at:",
              options: ["Today", "End of supernormal growth period", "One year before D1", "Only at liquidation"],
              answer: 1,
              why: "Terminal price Pn is located at the end of the finite high-growth period.",
            },
            {
              question: "A coupon-carrying bond's duration is normally less than maturity because:",
              options: ["Coupon is ignored", "Principal is paid early", "Coupons are received before maturity", "YTM is always zero"],
              answer: 2,
              why: "The weighted average timing of cash flows is pulled earlier by coupons.",
            },
            {
              question: "A repo transaction is called reverse repo from the perspective of:",
              options: ["Seller of securities raising funds", "Supplier/lender of funds", "Issuer of commercial paper", "Shareholder exercising rights"],
              answer: 1,
              why: "Repo/reverse repo naming depends on perspective. Reverse repo is the lender/supplier of funds view.",
            },
          ],
        },
      ],
    },
  ],
  footer:
    "Chapter 5 - Security Valuation - concept manifest plus exam-ready notes covering return concepts, equity valuation, FCFE/FCFF, rights, preference shares, bonds, duration, yield curve, convertibles, money-market instruments, valuers and ICAI-style practice patterns.",
};
