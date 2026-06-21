// AFM Chapter 12 - Interest Rate Risk Management.
//
// Compact first-principles rebuild from the ICAI AFM Chapter 12 material.
// Full chapter coverage: benchmark rates, interest-rate risk types, ALM, FRAs,
// interest-rate futures, caps/floors/collars, swaps, swaptions and TYK sums.

import type { ChapterDoc } from "../chapterDoc";

export const afmCh12InterestRateRiskDoc: ChapterDoc = {
  id: "afm-ch12",
  storageKey: "afmch12done",
  kicker: "Advanced Financial Management · Chapter 12 · ICAI Study Material",
  heroTitle: "Interest-rate risk: <em>earnings move when rates move.</em>",
  heroStrap:
    "Interest rate risk is the risk that borrowing cost, investment income, bond value or reinvestment return changes because market rates move. The chapter is a toolkit: identify the exposure, choose the hedge, then compute the cash settlement.",
  heroStats: [
    { value: "5", label: "ARRs" },
    { value: "6", label: "Risk types" },
    { value: "FRA", label: "Core sum" },
    { value: "Cap", label: "Borrower hedge" },
    { value: "7", label: "TYK sums" },
    { value: "10", label: "Theory answers" },
  ],
  flow: {
    eyebrow: "First principles",
    title: "From rate movement to hedge cash flow",
    steps: [
      { title: "Exposure", body: "Decide whether the entity is hurt by rising rates, falling rates, or a mismatch in reset dates." },
      { title: "Benchmark", body: "Identify the reference rate: MIBOR, MIBID, SOFR, SONIA, EUR STR, TONAR or SARON." },
      { title: "Instrument", body: "Use ALM/FRA, futures, cap/floor/collar, swap or swaption depending on whether certainty or optionality is needed." },
      { title: "Settlement", body: "Compute only the differential cash flow; principal is normally not exchanged." },
    ],
    foot: "Borrower fears rising rates; lender/investor fears falling rates",
  },
  sections: [
    {
      id: "map",
      folio: "Map",
      title: "Chapter Map",
      lede:
        "Interest rate risk management is not one formula. It is a sequence: <b>benchmark rate</b>, <b>risk type</b>, <b>hedging instrument</b>, and <b>settlement cash flow</b>.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Why rates matter",
              tagTone: "exp",
              title: "Small rate changes can hit thin-margin firms hard",
              body:
                "Interest is both the cost of borrowing and the reward for lending. It compensates for time, default risk, inflation risk and account/processing cost.",
            },
            {
              tag: "Macro drivers",
              tagTone: "ntr",
              title: "What pushes rates",
              bullets: [
                "<b>Money demand/supply:</b> high growth raises money demand and can raise rates.",
                "<b>Inflation:</b> higher inflation generally pushes rates up.",
                "<b>Government/RBI:</b> public borrowing, OMO, CRR, SLR and policy rates affect market rates.",
              ],
            },
            {
              tag: "Exam instinct",
              tagTone: "gold",
              title: "The hedge depends on the pain",
              body:
                "A borrower with floating debt fears <b>rising</b> rates. A lender or investor receiving floating income fears <b>falling</b> rates. Fixed-rate bond holders face <b>price</b> risk when yields move.",
            },
          ],
        },
        {
          kind: "flips",
          title: "Anchor recall",
          items: [
            {
              label: "Borrower",
              question: "A floating-rate borrower fears which movement?",
              answer: "A floating-rate borrower fears <b>rising interest rates</b> because interest cost increases.",
            },
            {
              label: "Lender",
              question: "A floating-rate lender/investor fears which movement?",
              answer: "A floating-rate lender fears <b>falling interest rates</b> because interest income decreases.",
            },
            {
              label: "Principal",
              question: "In most IR derivatives, is notional principal exchanged?",
              answer: "<b>No.</b> Notional principal is used only to calculate settlement amounts.",
            },
          ],
        },
      ],
    },
    {
      id: "benchmark-rates",
      folio: "1",
      title: "Benchmark Rates",
      lede:
        "A benchmark or reference rate is the base rate used to price loans, bonds and derivatives. Credit spread or basis points are then added according to borrower risk.",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "LIBOR shift",
              tagTone: "exp",
              title: "Why ARRs replaced LIBOR",
              bullets: [
                "LIBOR depended heavily on panel-bank judgement and was unsecured.",
                "Manipulation concerns led to the move away from LIBOR from 2022 contracts.",
                "Alternative Reference Rates are based more on actual overnight transactions.",
                "ARRs are treated as near risk-free and generally contain no term premium.",
              ],
            },
            {
              tag: "India",
              tagTone: "cap",
              title: "MIBOR and MIBID",
              body:
                "<b>MIBOR</b> is the Mumbai Interbank Offered Rate: the rate at which a bank lends/charges another borrower. <b>MIBID</b> is the Mumbai Interbank Bid Rate: the rate at which a bank is willing to borrow. These are used in swaps, FRAs and floating-rate instruments.",
            },
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "ARR table",
              tagTone: "gold",
              title: "Alternative reference rates",
              table: {
                columns: ["Region", "Rate", "Nature"],
                rows: [
                  { label: "USA", values: ["SOFR - Secured Overnight Financing Rate", "Secured"] },
                  { label: "UK", values: ["SONIA - Sterling Overnight Index Average", "Unsecured"] },
                  { label: "Europe", values: ["Euro Short-Term Rate", "Unsecured"] },
                  { label: "Japan", values: ["TONAR - Tokyo Overnight Average Rate", "Unsecured"] },
                  { label: "Switzerland", values: ["SARON - Swiss Average Rate Overnight", "Secured"] },
                ],
              },
            },
          ],
        },
        {
          kind: "quiz",
          items: [
            {
              question: "MIBOR is best understood as:",
              options: [
                "The rate at which banks want to borrow from other banks",
                "The rate at which banks charge/lend in the interbank market",
                "The rate for equity dividends",
                "The fixed coupon on government bonds",
              ],
              answer: 1,
              why: "MIBOR is the offered/lending rate. MIBID is the bid/borrowing rate.",
            },
            {
              question: "SOFR is:",
              options: ["Unsecured UK ARR", "Secured US ARR", "Japanese unsecured ARR", "Swiss secured ARR"],
              answer: 1,
              why: "SOFR is the US Secured Overnight Financing Rate.",
            },
          ],
        },
      ],
    },
    {
      id: "risk-types",
      folio: "2",
      title: "Interest Rate Risk: Types And Measurement",
      lede:
        "Interest rate risk affects both <b>income</b> and <b>market value</b>. Banks and companies must identify which exact form of rate risk they face before hedging it.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Gap",
              tagTone: "cap",
              title: "Gap exposure",
              body:
                "Assets and liabilities have different maturity or repricing dates. A positive gap means RSAs exceed RSLs; rising rates may increase NII. A negative gap means RSLs exceed RSAs; falling rates may increase NII.",
            },
            {
              tag: "Basis",
              tagTone: "exp",
              title: "Basis risk",
              body:
                "Different benchmarks or instruments do not move by the same magnitude. Example: assets linked to one rate and liabilities linked to another.",
            },
            {
              tag: "Embedded option",
              tagTone: "exp",
              title: "Embedded option risk",
              body:
                "Borrowers/prepaying customers exercise options when rates move: prepayment of loans, call/put options on bonds, or premature deposit withdrawal.",
            },
            {
              tag: "Yield curve",
              tagTone: "ntr",
              title: "Yield curve risk",
              body:
                "The yield curve changes shape across maturities instead of shifting evenly. Portfolio income/value changes depend on where maturities sit on the curve.",
            },
            {
              tag: "Price",
              tagTone: "danger",
              title: "Price risk",
              body:
                "Bond prices and yields move inversely. If assets are sold before maturity, rate changes create market-value gains or losses.",
            },
            {
              tag: "Reinvestment",
              tagTone: "danger",
              title: "Reinvestment risk",
              body:
                "Future cash flows may have to be reinvested at uncertain rates. This affects NII when cash-flow timing is mismatched.",
            },
          ],
        },
        {
          kind: "formula",
          lines: [
            "Gap = Rate Sensitive Assets (RSA) - Rate Sensitive Liabilities (RSL)",
            "Earnings at Risk (EaR) = Gap x assumed adverse interest-rate change",
            "Positive gap: RSA > RSL; rising rates can improve NII",
            "Negative gap: RSL > RSA; falling rates can improve NII",
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Measurement",
              tagTone: "gold",
              title: "Main measurement methods",
              bullets: [
                "<b>Maturity gap analysis:</b> earnings sensitivity.",
                "<b>Duration:</b> capital/market-value sensitivity.",
                "<b>Simulation:</b> income/value under scenarios.",
                "<b>Value at Risk:</b> likely loss under a confidence level.",
              ],
            },
            {
              tag: "Gap limits",
              tagTone: "danger",
              title: "Limitations of gap reports",
              bullets: [
                "Ignores basis and embedded option risk.",
                "Assumes positions in a time band mature/reprice together.",
                "Does not fully capture market-value impact.",
                "Assumes parallel yield-curve shifts, which seldom happen exactly.",
                "May miss variability in non-interest income and expenses.",
              ],
            },
          ],
        },
        {
          kind: "flips",
          title: "Risk type recall",
          items: [
            { label: "Gap", question: "What causes gap exposure?", answer: "Different principal amounts, maturities or repricing dates for assets, liabilities and off-balance-sheet items." },
            { label: "Basis", question: "What is basis risk?", answer: "The risk that different rates/benchmarks move by different magnitudes." },
            { label: "Option", question: "Give examples of embedded option risk.", answer: "Loan prepayment, bond call/put exercise, or premature withdrawal of term deposits." },
            { label: "Price", question: "Why does price risk arise for bonds?", answer: "Because bond prices and market yields are inversely related, especially when sold before maturity." },
          ],
        },
      ],
    },
    {
      id: "alm-and-fra",
      folio: "3",
      title: "Traditional Hedges: ALM And FRAs",
      lede:
        "Traditional hedging starts with managing the balance sheet itself. Where a specific future borrowing/lending rate must be locked, the chapter's main numerical tool is the FRA.",
      blocks: [
        {
          kind: "split",
          left: {
            tag: "ALM",
            tagTone: "cap",
            title: "Asset-Liability Management",
            body:
              "ALM is a dynamic framework for measuring, monitoring and managing liquidity risk, interest-rate risk, market risk, funding, capital planning and profit planning by controlling the structure of assets, liabilities and capital.",
          },
          right: {
            tag: "FRA",
            tagTone: "gold",
            title: "Forward Rate Agreement",
            body:
              "An FRA is an OTC agreement that fixes a future borrowing or lending rate on a notional amount. No principal is exchanged; only the discounted interest differential is settled in cash.",
          },
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "FRA features",
              tagTone: "ntr",
              title: "What an FRA does",
              bullets: [
                "Used to lock future interest cost or interest revenue.",
                "Off-balance-sheet and OTC.",
                "Principal is notional only.",
                "Buyer benefits when reference rate exceeds forward rate.",
                "Seller benefits when reference rate is below forward rate.",
                "Settlement is discounted because cash is paid at the beginning of the loan/deposit period.",
              ],
            },
            {
              tag: "Notation",
              tagTone: "ntr",
              title: "Reading 6 x 9 FRA",
              body:
                "A <b>6 x 9 FRA</b> fixes the 3-month rate starting 6 months from now and ending 9 months from now. The exposure period is 9 - 6 = 3 months.",
            },
          ],
        },
        {
          kind: "formula",
          lines: [
            "FRA settlement = N x (RR - FR) x (dtm / DY) / [1 + RR x (dtm / DY)]",
            "N = notional principal",
            "RR = reference rate on settlement/fixing date",
            "FR = agreed forward rate",
            "dtm = FRA period in days; DY = 360 or 365",
            "If RR > FR: seller pays buyer. If RR < FR: buyer pays seller.",
          ],
        },
        {
          kind: "tyk",
          items: [
            {
              ref: "TYK 1",
              title: "FRA settlement for future borrowing",
              question:
                "Parker will borrow Rs.60 crore for 3 months in 6 months. Bank quotes an FRA at 9.30%. Find settlement if actual rate after 6 months is (i) 9.60% and (ii) 8.80%.",
              solution:
                "Use settlement = N x (RR - FR) x (3/12) / [1 + RR x (3/12)].<br><br><b>(i) RR = 9.60%</b><br>= 60 crore x (0.096 - 0.093) x 0.25 / [1 + 0.096 x 0.25]<br>= 60 crore x 0.00075 / 1.024 = <b>Rs.4,39,453 receivable from banker</b>.<br><br><b>(ii) RR = 8.80%</b><br>= 60 crore x (0.088 - 0.093) x 0.25 / [1 + 0.088 x 0.25]<br>= 60 crore x -0.00125 / 1.022 = <b>Rs.7,33,855 payable to banker</b>.",
            },
            {
              ref: "TYK 2",
              title: "6 x 9 FRA: choose the right reference rate",
              question:
                "TM Fincorp bought a 6 x 9 Rs.100 crore FRA at 5.25%. On fixing date, 3-month MIBOR is 5.50%, 6-month is 5.70%, 9-month is 5.85%. Determine profit/loss in basis points and settlement amount. Assume 360-day year and 92-day period.",
              solution:
                "A 6 x 9 FRA is on the <b>3-month rate starting after 6 months</b>, so use 3-month MIBOR = 5.50%.<br>Profit = 5.50% - 5.25% = <b>25 basis points</b> to TM Fincorp.<br><br>Settlement = 100 crore x (0.055 - 0.0525) x (92/360) / [1 + 0.055 x (92/360)]<br>= <b>Rs.6,30,032 receivable</b>.",
            },
          ],
        },
        {
          kind: "trap",
          body:
            "<b>FRA trap:</b> in a 6 x 9 FRA, do not use the 6-month or 9-month reference rate. The underlying exposure is the 3-month period between month 6 and month 9.",
        },
      ],
    },
    {
      id: "interest-rate-futures",
      folio: "4",
      title: "Interest Rate Futures",
      lede:
        "Interest rate futures hedge adverse movement in rates through the inverse relationship between interest rates and bond prices.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Borrower",
              tagTone: "exp",
              title: "Borrower fears rising rates",
              body:
                "If rates rise, bond prices fall. A borrower can <b>sell interest rate futures</b> today and buy back later; the futures profit offsets higher borrowing cost.",
            },
            {
              tag: "Underlying",
              tagTone: "ntr",
              title: "Underlying is the bond, not the rate",
              body:
                "IR futures are linked to interest-bearing securities such as government securities or treasury bills. Rates affect the futures through bond prices.",
            },
            {
              tag: "Settlement",
              tagTone: "cap",
              title: "Daily MTM plus delivery/final settlement",
              body:
                "Interest-rate futures involve daily mark-to-market settlement and, where specified, physical delivery/final settlement on expiry.",
            },
          ],
        },
        {
          kind: "formula",
          lines: [
            "Actual delivery price = Futures settlement price x Conversion factor",
            "Seller profit = (Futures settlement price x Conversion factor) - quoted spot price of deliverable bond",
            "Seller loss = quoted spot price - (Futures settlement price x Conversion factor)",
            "CTD bond = bond that maximizes seller profit or minimizes seller loss",
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Conversion factor",
              tagTone: "gold",
              title: "Why conversion factor exists",
              body:
                "Deliverable bonds have different coupons and maturities. The conversion factor makes them comparable with the notional bond used in the futures contract.",
            },
            {
              tag: "CTD",
              tagTone: "gold",
              title: "Cheapest to deliver",
              body:
                "The CTD bond is the least costly deliverable bond for the futures seller. It is chosen by comparing acquisition cost with delivery proceeds after conversion-factor adjustment.",
            },
          ],
        },
      ],
    },
    {
      id: "caps-floors-collars",
      folio: "5",
      title: "Interest Rate Options: Caps, Floors And Collars",
      lede:
        "Interest rate options give protection against bad rate movements while preserving benefit from favourable movements. This optionality is why a premium is paid.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Cap",
              tagTone: "cap",
              title: "Cap = borrower's call option",
              body:
                "A cap pays when the reference rate rises above the cap rate. It sets a maximum floating borrowing cost while preserving benefit if rates fall.",
            },
            {
              tag: "Floor",
              tagTone: "exp",
              title: "Floor = lender's put option",
              body:
                "A floor pays when the reference rate falls below the floor rate. It protects minimum interest income.",
            },
            {
              tag: "Collar",
              tagTone: "gold",
              title: "Collar = buy cap, sell floor",
              body:
                "A borrower buys a cap and sells a floor. The cap protects the upside in rates; the sold floor reduces premium but limits benefit from very low rates.",
            },
          ],
        },
        {
          kind: "formula",
          lines: [
            "Cap payoff = N x max(0, r - rc) x (dt / days in year)",
            "Floor payoff = N x max(0, rf - r) x (dt / days in year)",
            "Collar payoff to buyer = N x [max(0, r - rc) - max(0, rf - r)] x (dt / days in year)",
            "r = actual reset rate; rc = cap rate; rf = floor rate",
          ],
        },
        {
          kind: "tyk",
          items: [
            {
              ref: "ICAI example",
              title: "Simple cap payoff",
              question:
                "One-year cap, notional $1 million, 6-month LIBOR cap rate 5%. Reset date LIBOR is 5.5%. Period from reset to payment is 184 days on 360-day basis. Find payoff.",
              solution:
                "Cap payoff = N x max(0, r - rc) x dt/360.<br>= $1,000,000 x (0.055 - 0.050) x 184/360<br>= <b>$2,555.56 payable by cap seller to buyer</b>.",
            },
            {
              ref: "TYK 3",
              title: "Cap option hedging rising LIBOR",
              question:
                "XYZ borrows GBP 15 million at six-month LIBOR + 10% for 24 months and buys a cap at 8%. Premium is 1% for the reset periods. LIBOR for three reset periods is 9%, 9.5% and 10%. Show how far risk is hedged.",
              solution:
                "Cap compensates only when LIBOR exceeds 8%. Extra rates above cap: 1%, 1.5%, 2%. Each reset is 6 months, so compensation per period:<br>Period 1: GBP15m x 1% x 6/12 = <b>GBP75,000</b>.<br>Period 2: GBP15m x 1.5% x 6/12 = <b>GBP112,500</b>.<br>Period 3: GBP15m x 2% x 6/12 = <b>GBP150,000</b>.<br>Total bank compensation = <b>GBP337,500</b>.<br>ICAI annualises/allocates premium at about GBP40,861 per reset. Net benefit for three resets = 337,500 - 122,583 = <b>GBP214,917</b>.",
            },
            {
              ref: "TYK 7",
              title: "Cap on floating-rate loan",
              question:
                "A borrower has Rs.40,00,000 floating-rate loan and wants to cap cost at 8.5%. Premium is 0.75% paid upfront. Actual rates on four due dates are 10.2%, 11.5%, 9.25%, 8.25%. Find premium and compensation.",
              solution:
                "Premium = Rs.40,00,000 x 0.75% = <b>Rs.30,000</b> paid upfront.<br><br>Cap compensation:<br>31-Mar-2013: (10.20% - 8.50%) x 40,00,000 = <b>Rs.68,000</b>.<br>31-Mar-2014: (11.50% - 8.50%) x 40,00,000 = <b>Rs.1,20,000</b>.<br>31-Mar-2015: (9.25% - 8.50%) x 40,00,000 = <b>Rs.30,000</b>.<br>31-Mar-2016: actual 8.25% is below cap, so <b>nil compensation</b>.<br>The cap keeps the borrower's effective floating rate from exceeding 8.5%, ignoring premium timing.",
            },
          ],
        },
        {
          kind: "drill",
          yesLabel: "Buy cap",
          noLabel: "Buy floor",
          items: [
            {
              prompt: "Floating-rate borrower wants protection from rising rates.",
              capitalise: true,
              why: "A cap compensates when reference rate rises above the cap rate.",
            },
            {
              prompt: "Floating-rate lender wants protection from falling rates.",
              capitalise: false,
              why: "A floor compensates when reference rate falls below the floor rate.",
            },
            {
              prompt: "Borrower wants cheaper cap premium and is willing to give up benefit below a floor.",
              capitalise: true,
              why: "This is a collar: buy cap and sell floor.",
            },
          ],
        },
      ],
    },
    {
      id: "swaps",
      folio: "6",
      title: "Interest Rate Swaps",
      lede:
        "In a swap, counterparties exchange interest payments based on different rates. The notional principal is only a calculation base.",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Fixed/floating",
              tagTone: "cap",
              title: "Plain vanilla swap",
              body:
                "One party pays fixed and receives floating; the other receives fixed and pays floating. It converts fixed-rate exposure into floating-rate exposure, or vice versa.",
            },
            {
              tag: "AIC",
              tagTone: "gold",
              title: "All-in-cost quotation",
              body:
                "Swap markets quote the fixed rate as <b>All-In-Cost</b>, meaning the fixed rate quoted against a flat floating-rate index.",
            },
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Swap types",
              tagTone: "ntr",
              title: "Types of swaps in the chapter",
              bullets: [
                "<b>Plain vanilla/coupon/generic swap:</b> fixed vs floating.",
                "<b>Basis rate swap:</b> floating vs floating on different benchmarks.",
                "<b>Asset swap:</b> fixed-rate investment exchanged for floating-rate return.",
                "<b>Amortising swap:</b> notional declines over the swap life.",
              ],
            },
            {
              tag: "Timing",
              tagTone: "ntr",
              title: "Trade date and settlement date",
              body:
                "A swap is negotiated on trade date; settlement normally starts two days later. Reset dates determine floating rates; payment dates determine cash settlement.",
            },
          ],
        },
        {
          kind: "formula",
          lines: [
            "Semi-annual fixed payment = N x AIC x (180/360)",
            "Floating payment = N x R x (dt/360)",
            "Net settlement = fixed leg - floating leg, paid by the net payer",
            "OIS floating leg compounds overnight rates on the evolving principal balance",
          ],
        },
        {
          kind: "tyk",
          items: [
            {
              ref: "TYK 4",
              title: "Generic swap fixed/floating payment",
              question:
                "A dealer quotes AIC for a generic swap at 8% against 6-month LIBOR flat. Notional is Rs.5,00,000. Find semi-annual fixed payment, first floating payment if 181 days and LIBOR 6%, and net amount.",
              solution:
                "Fixed payment = N x AIC x 180/360 = 5,00,000 x 8% x 0.5 = <b>Rs.20,000</b>.<br><br>Floating payment = N x LIBOR x dt/360 = 5,00,000 x 6% x 181/360 = <b>about Rs.15,083 to Rs.15,090</b> depending rounding.<br><br>Net paid by fixed-rate payer = 20,000 - 15,090 = <b>Rs.4,910</b> (or Rs.4,917 using exact 181/360 rounding).",
            },
            {
              ref: "TYK 5",
              title: "OIS fixed rate from net settlement",
              question:
                "Derivative Bank enters OIS on Rs.10 crore for 7 days and receives overnight MIBOR floating. MIBOR rates produce total floating interest of Rs.1,53,740. Bank received Rs.317 net. Find fixed interest and fixed rate.",
              solution:
                "If bank received Rs.317 net while receiving floating, then floating interest - fixed interest = 317.<br>Fixed interest = 1,53,740 - 317 = <b>Rs.1,53,423</b>.<br>Fixed rate corresponding to the 7-day period on Rs.10 crore is approximately <b>8%</b>, matching ICAI's rounded result.",
            },
            {
              ref: "TYK 6",
              title: "Currency swap opportunity gain",
              question:
                "A Inc can borrow Yen at 5% or USD at 9%. B Inc can borrow Yen at 8% or USD at 10%. They need opposite currencies for one year; USD1 = Yen120. Swap terms: B pays A 1% over A's Yen loan cost; A reimburses B's USD interest at 9%. Quantify opportunity gain.",
              solution:
                "A has comparative advantage in Yen: advantage over B = 8% - 5% = 3%. B has smaller disadvantage/relative advantage in USD: 10% - 9% = 1%. Total possible gain = 2%; split by terms as 1% each.<br><br><b>A Inc:</b> Without swap, USD borrowing cost = 9% x $200,000 = $18,000. Under swap, net cost equals $16,000, so gain = <b>$2,000</b> or 1%.<br><br><b>B Inc:</b> Without swap, Yen borrowing cost = Yen240,00,000 x 8% = Yen19,20,000. Under swap, net cost = Yen16,80,000, so gain = <b>Yen2,40,000</b> or 1%.",
            },
          ],
        },
        {
          kind: "trap",
          body:
            "<b>Swap trap:</b> do not exchange principal in an interest-rate swap. Calculate fixed and floating interest on the notional, then settle only the net difference unless the question is a currency swap requiring principal exchange mechanics.",
        },
      ],
    },
    {
      id: "swaptions",
      folio: "7",
      title: "Swaptions",
      lede:
        "A swaption is an option on a future interest-rate swap. It gives the right, not the obligation, to enter into a swap later at terms fixed today.",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Call swaption",
              tagTone: "cap",
              title: "Fixed-rate payer swaption",
              body:
                "Also called a call swaption. It gives the holder the right to enter a swap where the holder <b>pays fixed</b> and <b>receives floating</b>.",
            },
            {
              tag: "Put swaption",
              tagTone: "exp",
              title: "Fixed-rate receiver swaption",
              body:
                "Also called a put swaption. It gives the holder the right to enter a swap where the holder <b>receives fixed</b> and <b>pays floating</b>.",
            },
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Features",
              tagTone: "gold",
              title: "Principal features",
              bullets: [
                "Effectively an option on a forward-start interest-rate swap.",
                "Example: 3-month into 5-year swaption = option to enter a 5-year swap after 3 months.",
                "Option period runs from transaction date to expiry date.",
                "Premium is quoted in basis points.",
                "Can be cash-settled by marking to market at expiry.",
              ],
            },
            {
              tag: "Uses",
              tagTone: "ntr",
              title: "Where swaptions are used",
              bullets: [
                "Speculation by swap traders.",
                "Hedging swap books.",
                "Hedging embedded optionality in business contracts.",
                "Borrowers targeting an acceptable future borrowing rate.",
                "Businesses tendering for contracts.",
                "Protection for callable or puttable bond issues.",
              ],
            },
          ],
        },
        {
          kind: "flips",
          title: "Swaption recall",
          items: [
            {
              label: "Definition",
              question: "What is a swaption?",
              answer: "An <b>option on an interest-rate swap</b>: right but not obligation to enter a swap later.",
            },
            {
              label: "Payer",
              question: "What does a fixed-rate payer swaption allow?",
              answer: "The holder can enter a swap to <b>pay fixed</b> and <b>receive floating</b>.",
            },
            {
              label: "Receiver",
              question: "What does a fixed-rate receiver swaption allow?",
              answer: "The holder can enter a swap to <b>receive fixed</b> and <b>pay floating</b>.",
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
        "This is the high-yield checklist. In the exam, Chapter 12 usually appears as either a short theory note, an instrument-selection explanation, or a settlement computation.",
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
                "Meaning and importance of benchmark/reference rates.",
                "LIBOR replacement and Alternative Reference Rates.",
                "MIBOR vs MIBID and their use in derivatives.",
                "Types of interest rate risk: gap, basis, embedded option, yield curve, price and reinvestment risk.",
                "Limitations of gap analysis.",
                "ALM as a risk-management framework.",
                "Forward Rate Agreements: meaning, features and settlement.",
                "Interest Rate Futures: use, conversion factor and CTD bond.",
                "Caps, floors and collars: meaning, payoff and borrower/lender use.",
                "Interest Rate Swaps and Swaptions: features, types and uses.",
              ],
            },
            {
              tag: "Numerical bank",
              tagTone: "cap",
              title: "Computations ICAI can ask",
              bullets: [
                "FRA settlement for future borrowing/lending.",
                "Basis-point profit/loss in a 6 x 9 or similar FRA.",
                "Cap payoff and net benefit after premium allocation.",
                "Interest-rate collar payoff.",
                "Fixed and floating leg of a generic swap.",
                "Net settlement under swap.",
                "OIS floating leg and implied fixed rate.",
                "Currency swap opportunity gain/loss.",
                "Cap compensation across multiple settlement dates.",
              ],
            },
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Write like ICAI",
              tagTone: "ntr",
              title: "Theory answer structure",
              bullets: [
                "<b>Line 1:</b> define the instrument/risk in one sentence.",
                "<b>Line 2:</b> state who uses it and why.",
                "<b>Middle:</b> list features in point form using ICAI terms: notional principal, benchmark rate, reset date, settlement date, premium, cash settlement.",
                "<b>End:</b> conclude with the hedge effect: fixes rate, caps rate, creates floor, exchanges fixed/floating, or gives option to enter a swap.",
              ],
            },
            {
              tag: "Write like ICAI",
              tagTone: "ntr",
              title: "Numerical answer structure",
              bullets: [
                "<b>Step 1:</b> identify exposure and instrument: borrower/lender, cap/floor/FRA/swap.",
                "<b>Step 2:</b> write the formula before substitution.",
                "<b>Step 3:</b> show the correct period fraction: 3/12, 90/360, 92/360, 181/360 etc.",
                "<b>Step 4:</b> state who pays whom.",
                "<b>Step 5:</b> add a conclusion line: risk hedged, net saving, or final effective cost.",
              ],
            },
          ],
        },
        {
          kind: "trap",
          body:
            "<b>Presentation trap:</b> do not write only the final number in AFM. ICAI gives marks for the formula, the rate selected, the period selected, and the final payer/receiver conclusion.",
        },
      ],
    },
    {
      id: "theory-answer-practice",
      folio: "Theory",
      title: "ICAI-Style Theory Answer Practice",
      lede:
        "Use these as answer-writing templates. Each model answer is compact enough for an exam, but complete enough to capture the testable points.",
      blocks: [
        {
          kind: "tyk",
          items: [
            {
              ref: "Theory 1",
              title: "Forward Rate Agreements",
              question: "Write a short note on Forward Rate Agreements.",
              solution:
                "<div class='exam-answer'><p class='exam-lead'><b>Forward Rate Agreement (FRA)</b> is an OTC contract used by a borrower or lender to protect a future borrowing/lending rate against unfavourable interest-rate movement.</p><div class='exam-grid'><div class='exam-box'><h4>Features</h4><ol><li>Fixes interest cost or interest income for a future period.</li><li>Off-balance-sheet derivative contract.</li><li>Principal is only <b>notional</b>; principal is not exchanged.</li><li>Cash settlement is for the interest differential only.</li><li>Reference rate may be LIBOR, MIBOR or another benchmark.</li><li>Differential is discounted because settlement is made at the start of the loan/deposit period.</li></ol></div><div class='exam-box'><h4>Formula and conclusion</h4><p>Settlement = N x (RR - FR) x (dtm/DY) / [1 + RR x (dtm/DY)].<br><br>If RR exceeds FR, the seller pays the buyer. If RR is below FR, the buyer pays the seller.</p></div></div></div>",
            },
            {
              ref: "Theory 2",
              title: "Swaptions and uses",
              question: "What do you know about swaptions and their uses?",
              solution:
                "<div class='exam-answer'><p class='exam-lead'><b>Swaption</b> is an option on an interest rate swap. It gives the holder the right, but not the obligation, to enter a swap later at a specified fixed rate and for a specified term.</p><div class='exam-grid'><div class='exam-box'><h4>Types</h4><ol><li><b>Fixed-rate payer / call swaption:</b> right to pay fixed and receive floating.</li><li><b>Fixed-rate receiver / put swaption:</b> right to receive fixed and pay floating.</li></ol></div><div class='exam-box'><h4>Exam features</h4><ol><li>Option on a forward-starting IRS.</li><li>3-month into 5-year swaption = option after 3 months to enter a 5-year swap.</li><li>Option period runs from transaction date to expiry.</li><li>Premium is generally quoted in basis points.</li><li>May be cash settled by marking the swaption to market at expiry.</li></ol></div></div><div class='exam-box'><h4>Uses</h4><p>Used for speculation, hedging swap books, hedging embedded optionality, targeting an acceptable borrowing rate, tendering for contracts and protecting callable/puttable bond issues.</p></div></div>",
            },
            {
              ref: "Theory 3",
              title: "Benchmark rates and ARRs",
              question: "Explain benchmark rates and the movement from LIBOR to Alternative Reference Rates.",
              solution:
                "<div class='exam-answer'><p class='exam-lead'><b>Benchmark rate</b> or reference rate is the base interest rate used to price loans, overdrafts, mortgages, bonds, floating-rate instruments and derivatives such as FRAs and swaps.</p><table class='exam-table'><thead><tr><th>Point</th><th>ICAI-style answer</th></tr></thead><tbody><tr><td>Pricing use</td><td>Credit spread is added to the benchmark according to the risk profile of the borrower.</td></tr><tr><td>LIBOR issue</td><td>LIBOR relied substantially on panel-bank judgement and manipulation concerns arose.</td></tr><tr><td>ARR shift</td><td>New contracts shifted to <b>Alternative Reference Rates</b> from 2022 onwards.</td></tr><tr><td>ARR nature</td><td>ARRs are based on actual overnight transactions, may be secured or unsecured, are near risk-free and generally do not include a term premium.</td></tr><tr><td>Examples</td><td>SOFR, SONIA, Euro Short-Term Rate, TONAR and SARON. In India, MIBOR and MIBID are important benchmark rates.</td></tr></tbody></table></div>",
            },
            {
              ref: "Theory 4",
              title: "Types of interest rate risk",
              question: "Briefly explain the major types of interest rate risk.",
              solution:
                "<div class='exam-answer'><p class='exam-lead'><b>Interest rate risk</b> is the risk that earnings, cash flows or market value change due to movement in market interest rates.</p><table class='exam-table'><thead><tr><th>Risk</th><th>Meaning</th></tr></thead><tbody><tr><td>Gap exposure</td><td>Mismatch in maturity or repricing dates of rate-sensitive assets and liabilities.</td></tr><tr><td>Basis risk</td><td>Different benchmarks or instruments do not move by the same magnitude.</td></tr><tr><td>Embedded option risk</td><td>Prepayment, premature withdrawal or call/put options are exercised when rates move.</td></tr><tr><td>Yield curve risk</td><td>Non-parallel changes in the yield curve affect income and portfolio value.</td></tr><tr><td>Price risk</td><td>Bond prices move inversely with yields, especially when assets are sold before maturity.</td></tr><tr><td>Reinvestment risk</td><td>Future cash flows may have to be reinvested at uncertain rates.</td></tr></tbody></table></div>",
            },
            {
              ref: "Theory 5",
              title: "Gap analysis and its limitations",
              question: "Explain gap exposure and limitations of the gap report.",
              solution:
                "<div class='exam-answer'><p class='exam-lead'><b>Gap exposure</b> arises when rate-sensitive assets, rate-sensitive liabilities and off-balance-sheet items have different maturity or repricing dates.</p><div class='exam-grid'><div class='exam-box'><h4>Core working</h4><p>Gap = RSA - RSL.<br><br><b>Positive gap:</b> RSA exceeds RSL; increase in rates may increase NII.<br><b>Negative gap:</b> RSL exceeds RSA; decrease in rates may increase NII.<br><br>Earnings at Risk = Gap x assumed change in interest rate.</p></div><div class='exam-box'><h4>Limitations</h4><ol><li>Ignores basis and embedded option risks.</li><li>Assumes all items in a time band mature/reprice together.</li><li>Does not fully measure economic value impact.</li><li>Ignores timing differences in payments.</li><li>Assumes parallel yield-curve shifts.</li><li>May miss non-interest income and expense variability.</li></ol></div></div></div>",
            },
            {
              ref: "Theory 6",
              title: "ALM",
              question: "Write a short note on Asset-Liability Management.",
              solution:
                "<div class='exam-answer'><p class='exam-lead'><b>Asset-Liability Management (ALM)</b> is a comprehensive and dynamic framework for measuring, monitoring and managing risks arising from the structure of a bank's assets, liabilities and capital.</p><div class='exam-grid'><div class='exam-box'><h4>Objective</h4><p>ALM seeks to maximise net interest earnings within the overall risk preference of the institution.</p></div><div class='exam-box'><h4>Coverage</h4><p>It covers liquidity risk, interest rate risk, market risk, trading risk, funding and capital planning, profit planning and growth projection.</p></div></div><div class='exam-box'><h4>Importance</h4><p>Banks and financial institutions face credit risk, interest risk and liquidity risk. ALM helps quantify these risks and design strategies for managing the risk-return trade-off. It is therefore part of intermediate and long-term strategic planning.</p></div></div>",
            },
            {
              ref: "Theory 7",
              title: "Interest rate futures",
              question: "Explain how interest rate futures are used to hedge interest rate risk.",
              solution:
                "<div class='exam-answer'><p class='exam-lead'><b>Interest rate futures</b> are futures contracts whose underlying instrument is an interest-bearing asset such as a government security or treasury bill.</p><div class='exam-grid'><div class='exam-box'><h4>Hedge logic</h4><p>Interest rates and bond prices move inversely. A borrower fearing a rise in rates can <b>sell interest rate futures</b>. If rates rise, bond/futures prices fall and the borrower can buy back futures at a lower price, making a gain that offsets higher borrowing cost.</p></div><div class='exam-box'><h4>Key terms</h4><p><b>Conversion factor:</b> makes deliverable bonds comparable.<br><br><b>Cheapest to Deliver (CTD):</b> deliverable bond that maximises seller profit or minimises seller loss.</p></div></div></div>",
            },
            {
              ref: "Theory 8",
              title: "Caps, floors and collars",
              question: "Distinguish between interest rate cap, floor and collar.",
              solution:
                "<div class='exam-answer'><table class='exam-table'><thead><tr><th>Instrument</th><th>Meaning</th><th>Natural user</th></tr></thead><tbody><tr><td>Cap</td><td>Buyer receives compensation when reference rate rises above cap rate.</td><td>Floating-rate borrower; sets maximum rate.</td></tr><tr><td>Floor</td><td>Buyer receives compensation when reference rate falls below floor rate.</td><td>Lender/investor; sets minimum income rate.</td></tr><tr><td>Collar</td><td>Combination of cap and floor. Borrower usually buys cap and sells floor.</td><td>Borrower wanting protection with lower premium cost.</td></tr></tbody></table><div class='exam-box'><h4>Conclusion</h4><p>Cap sets a maximum rate, floor sets a minimum rate, and collar creates an interest-rate band.</p></div></div>",
            },
            {
              ref: "Theory 9",
              title: "Interest rate swaps",
              question: "Write a short note on interest rate swaps and their types.",
              solution:
                "<div class='exam-answer'><p class='exam-lead'><b>Interest rate swap</b> is an agreement between two counterparties to exchange interest payments computed on a notional principal. The notional principal is not exchanged.</p><div class='exam-grid'><div class='exam-box'><h4>Fixed/floating swap</h4><p>One party pays fixed and receives floating; the other pays floating and receives fixed. The fixed rate is often quoted as All-In-Cost against a floating benchmark.</p></div><div class='exam-box'><h4>Use</h4><p>Swaps transform fixed-rate exposure into floating-rate exposure or floating-rate exposure into fixed-rate exposure.</p></div></div><table class='exam-table'><thead><tr><th>Type</th><th>Meaning</th></tr></thead><tbody><tr><td>Plain vanilla swap</td><td>Fixed-rate payments exchanged for floating-rate payments.</td></tr><tr><td>Basis rate swap</td><td>Two floating legs based on different benchmarks.</td></tr><tr><td>Asset swap</td><td>Fixed-rate investment return exchanged for floating-rate return.</td></tr><tr><td>Amortising swap</td><td>Notional principal declines over the life of the swap.</td></tr></tbody></table></div>",
            },
            {
              ref: "Theory 10",
              title: "Borrower hedge selection",
              question: "A borrower expects rates to rise. Which instruments can be used and how should the answer be framed?",
              solution:
                "<div class='exam-answer'><p class='exam-lead'>A borrower expecting rising rates wants protection from higher interest cost.</p><table class='exam-table'><thead><tr><th>Instrument</th><th>How it helps</th></tr></thead><tbody><tr><td>FRA</td><td>Locks future borrowing rate; borrower receives settlement if reference rate exceeds forward rate.</td></tr><tr><td>Interest rate futures</td><td>Sell futures; gain if rates rise and bond/futures prices fall.</td></tr><tr><td>Cap</td><td>Sets maximum floating rate while keeping benefit if rates fall.</td></tr><tr><td>Collar</td><td>Buy cap and sell floor to reduce premium, but give up benefit below floor.</td></tr><tr><td>Swap</td><td>Pay fixed and receive floating to convert floating borrowing into fixed-rate exposure.</td></tr><tr><td>Payer swaption</td><td>Right to enter a pay-fixed receive-floating swap later.</td></tr></tbody></table><div class='exam-box'><h4>Conclusion</h4><p>Choose FRA/swap for certainty, cap/swaption for optionality, and collar when premium reduction is important.</p></div></div>",
            },
          ],
        },
      ],
    },
    {
      id: "numerical-answer-practice",
      folio: "Practice",
      title: "ICAI-Style Numerical Answer Practice",
      lede:
        "These prompts train the exact presentation marks: formula first, substitution second, payer/receiver conclusion last.",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "FRA answer",
              tagTone: "gold",
              title: "FRA settlement answer skeleton",
              body:
                "<b>Step 1:</b> State FRA period and selected reference rate.<br><b>Step 2:</b> Formula = N x (RR - FR) x (dtm/DY) / [1 + RR x (dtm/DY)].<br><b>Step 3:</b> Substitute rates in decimals and period fraction.<br><b>Step 4:</b> If result is positive, seller pays buyer; if negative, buyer pays seller.<br><b>Step 5:</b> State final amount rounded as per question.",
            },
            {
              tag: "Cap answer",
              tagTone: "gold",
              title: "Cap/floor/collar answer skeleton",
              body:
                "<b>Cap:</b> N x max(0, actual rate - cap rate) x time.<br><b>Floor:</b> N x max(0, floor rate - actual rate) x time.<br><b>Collar:</b> cap payoff less floor payoff.<br><b>Presentation:</b> show each reset date separately, then total payoff and premium effect.",
            },
            {
              tag: "Swap answer",
              tagTone: "gold",
              title: "Swap answer skeleton",
              body:
                "<b>Step 1:</b> identify fixed payer and floating payer.<br><b>Step 2:</b> fixed leg = N x AIC x period fraction.<br><b>Step 3:</b> floating leg = N x reference rate x actual days/360.<br><b>Step 4:</b> net settlement = higher leg minus lower leg.<br><b>Step 5:</b> state who pays the net amount.",
            },
            {
              tag: "Currency swap answer",
              tagTone: "gold",
              title: "Currency swap answer skeleton",
              body:
                "<b>Step 1:</b> identify comparative advantage in each currency.<br><b>Step 2:</b> compute total gain available.<br><b>Step 3:</b> show principal exchange if required.<br><b>Step 4:</b> show interest receipts and payments for each party.<br><b>Step 5:</b> compare net cost with direct borrowing cost and state opportunity gain/loss.",
            },
          ],
        },
        {
          kind: "tyk",
          items: [
            {
              ref: "Practice 1",
              title: "FRA answer-writing drill",
              question:
                "A company will borrow Rs.50 crore after 3 months for 6 months. FRA rate is 8.40%. Actual reference rate on settlement date is 9.00%. Write the ICAI-style solution skeleton and settlement logic. Assume 180/360.",
              solution:
                "<div class='exam-answer'><div class='exam-box'><h4>Exposure</h4><p>Future borrower fears rising rates. FRA protects the borrower by paying compensation when reference rate exceeds the forward rate.</p></div><table class='exam-table'><thead><tr><th>Step</th><th>Working</th></tr></thead><tbody><tr><td>Formula</td><td>Settlement = N x (RR - FR) x (dtm/DY) / [1 + RR x (dtm/DY)]</td></tr><tr><td>Substitution</td><td>50 crore x (0.090 - 0.084) x (180/360) / [1 + 0.090 x (180/360)]</td></tr><tr><td>Simplification</td><td>50 crore x 0.003 / 1.045</td></tr><tr><td>Amount</td><td><b>Rs.14,35,407 receivable approximately</b></td></tr></tbody></table><div class='exam-box'><h4>Conclusion</h4><p>Since RR > FR, the FRA seller/bank pays the company.</p></div></div>",
            },
            {
              ref: "Practice 2",
              title: "Cap answer-writing drill",
              question:
                "A borrower has Rs.20 crore floating debt and buys a cap at 9%. On reset date actual rate is 10.25% for a 3-month period. Show cap compensation using ICAI style. Assume 90/360.",
              solution:
                "<div class='exam-answer'><div class='exam-box'><h4>Instrument</h4><p>Cap protects a floating-rate borrower against the rate rising above the cap rate.</p></div><table class='exam-table'><thead><tr><th>Step</th><th>Working</th></tr></thead><tbody><tr><td>Formula</td><td>Cap payoff = N x max(0, r - rc) x dt/360</td></tr><tr><td>Substitution</td><td>Rs.20 crore x max(0, 10.25% - 9.00%) x 90/360</td></tr><tr><td>Simplification</td><td>Rs.20 crore x 1.25% x 0.25</td></tr><tr><td>Amount</td><td><b>Rs.6,25,000 receivable from cap seller</b></td></tr></tbody></table><div class='exam-box'><h4>Conclusion</h4><p>Borrower's interest cost above 9% is compensated for the reset period.</p></div></div>",
            },
            {
              ref: "Practice 3",
              title: "Swap answer-writing drill",
              question:
                "Notional is Rs.10,00,000. AIC is 7.5% and floating reference rate is 6.8% for 182 days. Compute fixed leg, floating leg and net settlement using a 360-day year.",
              solution:
                "<div class='exam-answer'><table class='exam-table'><thead><tr><th>Leg</th><th>Formula</th><th>Amount</th></tr></thead><tbody><tr><td>Fixed leg</td><td>N x AIC x 180/360 = 10,00,000 x 7.5% x 0.5</td><td class='num'><b>Rs.37,500</b></td></tr><tr><td>Floating leg</td><td>N x R x dt/360 = 10,00,000 x 6.8% x 182/360</td><td class='num'><b>Rs.34,378</b></td></tr><tr><td>Net settlement</td><td>37,500 - 34,378</td><td class='num'><b>Rs.3,122</b></td></tr></tbody></table><div class='exam-box'><h4>Conclusion</h4><p>Rs.3,122 is payable by the fixed-rate payer to the floating-rate payer.</p></div></div>",
            },
          ],
        },
        {
          kind: "drill",
          yesLabel: "Show payer/receiver",
          noLabel: "Final number only",
          items: [
            {
              prompt: "FRA answer where actual rate exceeds FRA rate.",
              capitalise: true,
              why: "State that seller/bank pays buyer; the direction is a marking point.",
            },
            {
              prompt: "Cap answer where actual rate is below strike.",
              capitalise: true,
              why: "Show nil compensation and explain why; do not skip the reset period.",
            },
            {
              prompt: "Swap answer with both fixed and floating legs.",
              capitalise: true,
              why: "Compute both legs and state the net payer; final number alone is incomplete.",
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
              question: "A cap option is most naturally bought by:",
              options: ["A floating-rate borrower", "A floating-rate lender", "A fixed-rate bond seller", "A swap dealer only"],
              answer: 0,
              why: "A cap pays when rates rise above the cap rate, so it protects a floating-rate borrower.",
            },
            {
              question: "A floor option protects against:",
              options: ["Rising interest cost", "Falling interest income", "Bond delivery risk", "Foreign exchange translation risk"],
              answer: 1,
              why: "A floor pays when the reference rate falls below the floor rate.",
            },
            {
              question: "In an interest rate swap, the notional principal is:",
              options: ["Always exchanged at inception", "Always exchanged at maturity", "Used only to calculate payments", "Ignored for settlement"],
              answer: 2,
              why: "Interest-rate swaps normally exchange interest differentials, not principal.",
            },
            {
              question: "A basis rate swap exchanges:",
              options: ["Fixed against fixed", "Floating against floating on different benchmarks", "Equity against debt", "Currency principal only"],
              answer: 1,
              why: "A basis swap has both legs floating, but linked to different reference rates.",
            },
            {
              question: "The CTD bond is chosen because it:",
              options: ["Has the highest coupon", "Has the longest maturity", "Maximizes seller profit or minimizes seller loss", "Is always the newest bond"],
              answer: 2,
              why: "Cheapest-to-deliver is the least expensive deliverable option for the futures seller after conversion-factor adjustment.",
            },
          ],
        },
      ],
    },
  ],
  footer:
    "Chapter 12 · Interest Rate Risk Management — compact first-principles content from ICAI Study Material, covering benchmark rates, risk types, ALM, FRAs, futures, caps/floors/collars, swaps, swaptions and practical patterns.",
};
