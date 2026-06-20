// AFM Chapter 9 - Derivatives Analysis and Valuation.
//
// Compact first-principles rebuild from the ICAI AFM Chapter 9 material.
// This first pass covers A, B and C: core theory, forward/futures pricing,
// and futures contracts. It is exam-focused, not a verbatim reproduction.

import type { ChapterDoc } from "../chapterDoc";

export const afmCh9DerivativesDoc: ChapterDoc = {
  id: "afm-ch9",
  storageKey: "afmch9done",
  kicker: "Advanced Financial Management · Chapter 9 · ICAI Study Material",
  heroTitle: "Derivatives: <em>lock the future, price the risk, hedge the exposure.</em>",
  heroStrap:
    "A derivative is never valuable by itself. It gets value from an underlying asset, rate, index or commodity. Master the exam in this order: why derivatives exist, how forward/futures prices are built from spot plus carry, and how futures create leverage, margin calls, MTM and hedges.",
  heroStats: [
    { value: "A", label: "Core theory" },
    { value: "B", label: "Pricing" },
    { value: "C", label: "Futures" },
    { value: "6", label: "Key formulas" },
    { value: "8", label: "Recall cards" },
  ],
  flow: {
    eyebrow: "First principles",
    title: "Every derivative question is a chain",
    steps: [
      { title: "Underlying", body: "Identify the asset, index, rate or commodity whose price drives the contract." },
      { title: "Promise", body: "Ask whether the contract creates an obligation (forward/future) or only a right (option later)." },
      { title: "Price", body: "Start from spot, add financing/storage carry, subtract income or yield." },
      { title: "Position", body: "Map long/short, margin, MTM and hedge direction before doing arithmetic." },
    ],
    foot: "Derivative value = underlying economics + contract promise + time",
  },
  sections: [
    {
      id: "a-core-theory",
      folio: "A",
      title: "Core Theory: What A Derivative Really Is",
      lede:
        "A derivative is a contract whose value is <b>derived</b> from a basic variable called the <b>underlying</b>. The underlying may be equity, index, forex, commodity, interest rate or any reference rate.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "1",
              tagTone: "cap",
              title: "No underlying, no derivative value",
              body:
                "The contract is only a promise. Its profit or loss is decided by how the <b>underlying price</b> moves against the contract price by maturity.",
            },
            {
              tag: "2",
              tagTone: "cap",
              title: "Long wants price up",
              body:
                "The buyer/long position benefits when the underlying value rises above the agreed price. The seller/short position benefits when it falls below the agreed price.",
            },
            {
              tag: "3",
              tagTone: "exp",
              title: "Derivative is a risk-transfer machine",
              body:
                "One party gives away risk; another party accepts it for possible gain. That is why the same instrument can be used for <b>hedging</b>, <b>speculation</b> or <b>arbitrage</b>.",
            },
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Users",
              tagTone: "gold",
              title: "Who uses derivatives and why",
              table: {
                columns: ["User", "Main purpose"],
                rows: [
                  { label: "Corporation", values: ["Hedge currency risk, inventory risk and input/output price risk."] },
                  { label: "Individual investor", values: ["Speculation, hedging and yield enhancement."] },
                  { label: "Institutional investor", values: ["Asset allocation hedge, yield enhancement and arbitrage."] },
                  { label: "Dealer", values: ["Hedge own positions, exploit inefficiencies and earn spreads."] },
                ],
              },
            },
            {
              tag: "Cash vs derivatives",
              tagTone: "ntr",
              title: "Cash market buys the asset; derivative market buys exposure",
              bullets: [
                "<b>Cash market:</b> tangible asset is bought or sold; full money is usually paid upfront.",
                "<b>Derivative market:</b> contract is traded; minimum lots and margin requirements apply.",
                "<b>Cash asset:</b> may be for consumption or investment.",
                "<b>Derivative contract:</b> usually for hedging, arbitrage or speculation.",
                "<b>Ownership:</b> buying shares gives ownership; buying futures does not.",
              ],
            },
          ],
        },
        {
          kind: "split",
          left: {
            tag: "Forward",
            tagTone: "cap",
            title: "Forward contract",
            body:
              "A private agreement where seller must deliver a specified asset of agreed quality and quantity at a specified place/date, and buyer must pay the pre-negotiated price. Everything is customized.",
          },
          right: {
            tag: "Future",
            tagTone: "cap",
            title: "Futures contract",
            body:
              "A standardized exchange-traded forward-type contract. It requires margin, is marked to market daily, and is usually closed by offset or cash settlement rather than actual delivery.",
          },
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Comparison",
              tagTone: "gold",
              title: "Forward vs futures",
              table: {
                columns: ["Basis", "Forward", "Futures"],
                rows: [
                  { label: "Trading", values: ["OTC/private deal", "Organized exchange"], strong: true },
                  { label: "Size", values: ["Tailor-made", "Standardized"] },
                  { label: "Settlement", values: ["On agreed date", "Daily via clearing house"] },
                  { label: "Delivery date", values: ["Negotiated", "Exchange cycle"] },
                  { label: "Margin", values: ["Usually not required", "Initial/maintenance margin required"] },
                  { label: "MTM", values: ["No daily MTM", "Daily marking to market"] },
                  { label: "Credit risk", values: ["Borne by parties", "Reduced by clearing house"] },
                  { label: "Cost", values: ["Bid-ask spread", "Brokerage and exchange costs"] },
                ],
              },
            },
          ],
        },
        {
          kind: "flips",
          title: "A. Quick recall",
          items: [
            {
              label: "Derivative",
              question: "What is the first-principles meaning of a derivative?",
              answer:
                "A derivative is a <b>contract</b> whose value comes from an <b>underlying</b> asset, index, rate or commodity.",
            },
            {
              label: "Long",
              question: "Who is long in a forward/futures contract?",
              answer:
                "The party that has agreed to <b>buy</b> the underlying in the future. Long usually gains when the underlying price rises.",
            },
            {
              label: "Short",
              question: "Who is short in a forward/futures contract?",
              answer:
                "The party that has agreed to <b>sell</b> the underlying in the future. Short usually gains when the underlying price falls.",
            },
            {
              label: "Purpose",
              question: "Name the three exam-purpose uses of derivatives.",
              answer: "<b>Hedging</b>, <b>speculation</b> and <b>arbitrage</b>.",
            },
          ],
        },
      ],
    },
    {
      id: "b-forward-futures-pricing",
      folio: "B",
      title: "Forward/Futures Pricing: Spot Plus Carry Minus Income",
      lede:
        "The fair futures/forward price is not guessed. It is built from the spot price adjusted for the cost and benefit of carrying the underlying until maturity.",
      blocks: [
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Basis",
              tagTone: "ntr",
              title: "Basis tells the gap",
              body:
                "<b>Basis = Spot price - Futures price.</b> If futures price is above spot, basis is negative. As expiry approaches, spot and futures prices normally converge.",
            },
            {
              tag: "Contango",
              tagTone: "cap",
              title: "Normal cost-of-carry market",
              body:
                "When futures price is above spot because it includes financing/storage carry, the market is called <b>contango</b>.",
            },
            {
              tag: "Backwardation",
              tagTone: "exp",
              title: "Inverted market",
              body:
                "When spot price exceeds futures price, basis is positive. This is <b>backwardation</b>, usually caused by factors beyond normal carry.",
            },
          ],
        },
        {
          kind: "formula",
          lines: [
            "Basis = Spot price - Futures price",
            "Cost-of-carry fair price = Spot price + Carrying cost - Returns/income",
            "Annual compounding: A = P(1 + r)^t",
            "Multiple compounding: A = P(1 + r/n)^(nt)",
            "Continuous compounding, no income: F = S e^(rt)",
            "Known cash income: F = (S - I)e^(rt), where I = present value of income",
            "Yield income: F = S e^[t(r - y)], where y = income/dividend yield",
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Arbitrage",
              tagTone: "gold",
              title: "If market futures price is too high",
              bullets: [
                "Borrow money and <b>buy the asset</b> in the spot market.",
                "<b>Sell futures</b> at the overpriced futures price.",
                "Receive income/dividend during the period, if any.",
                "At expiry, deliver/sell the asset through futures.",
                "Profit = futures sale + income - spot cost - financing cost.",
              ],
            },
            {
              tag: "Arbitrage",
              tagTone: "gold",
              title: "If market futures price is too low",
              bullets: [
                "<b>Sell/short the asset</b> in spot where possible.",
                "Invest the proceeds.",
                "<b>Buy futures</b> at the underpriced futures price.",
                "Close at expiry and earn the pricing gap.",
                "Exam logic: buy cheap side, sell expensive side.",
              ],
            },
          ],
        },
        {
          kind: "trap",
          body:
            "<b>Exam trap:</b> dividend is a benefit of holding the asset, so it is <b>subtracted</b> from the futures price. Interest/storage/financing is a cost of holding the asset, so it is <b>added</b>.",
        },
        {
          kind: "tyk",
          items: [
            {
              ref: "Worked sum",
              title: "Cost-of-carry with dividend",
              question:
                "Spot price is Rs.220. Time to expiry is 3 months. Borrowing rate is 15% p.a. Dividend is 25% on face value Rs.10 before expiry. Find the fair futures price.",
              solution:
                "Carrying cost = 220 x 15% x 3/12 = Rs.8.25.<br>Dividend = 25% x Rs.10 = Rs.2.50.<br>Fair futures price = Spot + carrying cost - dividend = 220 + 8.25 - 2.50 = <b>Rs.225.75</b>.",
            },
            {
              ref: "Worked sum",
              title: "Arbitrage when futures is overpriced",
              question:
                "Using the same data, actual futures price is Rs.230. What should the arbitrageur do and what is the riskless profit per share?",
              solution:
                "Theoretical price = Rs.225.75, actual futures = Rs.230, so futures is overpriced.<br>Action: borrow and buy spot at Rs.220; sell futures at Rs.230.<br>Inflows at expiry = futures sale Rs.230 + dividend Rs.2.50 = Rs.232.50.<br>Outflows = repay spot borrowing Rs.220 + interest Rs.8.25 = Rs.228.25.<br>Riskless profit = 232.50 - 228.25 = <b>Rs.4.25 per share</b>.",
            },
            {
              ref: "Worked sum",
              title: "Continuous compounding",
              question:
                "A non-dividend stock trades at Rs.200. Risk-free rate is 10% p.a. continuously compounded. Maturity is 3 months. Find the forward price.",
              solution:
                "Use F = S e^(rt).<br>S = 200, r = 0.10, t = 3/12 = 0.25.<br>F = 200 x e^(0.10 x 0.25) = 200 x e^0.025 = <b>about Rs.205.06</b>.",
            },
            {
              ref: "Worked sum",
              title: "Index futures with dividend yield",
              question:
                "Index is 1400. Risk-free rate is 10% p.a. continuously compounded. Dividend yield is 6% p.a. Maturity is 3 months. Find fair futures price.",
              solution:
                "Use F = S e^[t(r - y)].<br>S = 1400, r = 0.10, y = 0.06, t = 3/12 = 0.25.<br>F = 1400 x e^[0.25(0.10 - 0.06)] = 1400 x e^0.01 = <b>about Rs.1,414.07</b>.",
            },
          ],
        },
        {
          kind: "flips",
          title: "B. Formula recall",
          items: [
            {
              label: "Basis",
              question: "What is basis?",
              answer: "<b>Basis = Spot price - Futures price.</b>",
            },
            {
              label: "Convergence",
              question: "What happens to basis near expiry?",
              answer: "Basis normally approaches <b>zero</b> because spot and futures prices converge.",
            },
            {
              label: "Income",
              question: "Why is dividend subtracted in futures pricing?",
              answer: "Because dividend is an <b>income benefit</b> from holding the asset; it reduces the fair futures price.",
            },
          ],
        },
      ],
    },
    {
      id: "c-futures-contracts",
      folio: "C",
      title: "Futures Contracts: Leverage, MTM, Speculation And Hedging",
      lede:
        "A futures contract is an exchange-traded obligation. The exam tests the mechanics: contract size, margin, long/short payoff, daily marking to market, and hedging direction.",
      blocks: [
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "Single stock futures",
              tagTone: "cap",
              title: "One stock, future obligation",
              body:
                "A standardized contract to buy or sell a specific stock at a future date and agreed price. It can be closed by taking an opposite position before expiry.",
            },
            {
              tag: "Index futures",
              tagTone: "cap",
              title: "Basket exposure, cash settled",
              body:
                "A contract based on an index level such as Nifty or Sensex. Contract value = Index level x contract multiplier. These are usually cash settled and useful for portfolio hedging.",
            },
          ],
        },
        {
          kind: "formula",
          lines: [
            "Contract value = Futures price x lot size",
            "Initial margin = Contract value x margin %",
            "Long futures profit = (Exit futures price - Entry futures price) x lot size",
            "Short futures profit = (Entry futures price - Exit futures price) x lot size",
            "Index contract value = Index level x contract multiplier",
            "Portfolio hedge contracts = Portfolio value x Beta / Futures contract value",
          ],
        },
        {
          kind: "cards",
          columns: 3,
          items: [
            {
              tag: "Long",
              tagTone: "cap",
              title: "Go long when bullish",
              body:
                "Long futures means you agree to buy later. If futures price rises, you gain. If it falls, you lose. Margin makes percentage gains/losses larger.",
            },
            {
              tag: "Short",
              tagTone: "exp",
              title: "Go short when bearish",
              body:
                "Short futures means you agree to sell later. If futures price falls, you gain. If it rises, you lose.",
            },
            {
              tag: "Hedge",
              tagTone: "gold",
              title: "Hedge by taking the opposite futures position",
              body:
                "If you hold shares and fear a fall, sell futures. Loss on shares is offset by gain on short futures. This locks value but also sacrifices upside.",
            },
          ],
        },
        {
          kind: "cards",
          columns: 2,
          items: [
            {
              tag: "MTM",
              tagTone: "ntr",
              title: "Marking to market",
              body:
                "At the end of each trading day, all open futures contracts are repriced at the settlement price. Profit is credited and loss is debited to the margin account. Economically, yesterday's contract is reset to today's settlement price.",
            },
            {
              tag: "Why index futures",
              tagTone: "gold",
              title: "Advantages over stock futures",
              bullets: [
                "Better portfolio hedge and more flexible asset allocation.",
                "Diversification reduces stock-specific volatility.",
                "Lower manipulation risk than individual shares.",
                "Cash settlement is simpler.",
                "Cost-efficient hedge for broad market risk.",
              ],
            },
          ],
        },
        {
          kind: "tyk",
          items: [
            {
              ref: "Worked sum",
              title: "Long single-stock futures",
              question:
                "An investor goes long one stock future at Rs.80. Lot size is 100 and margin is 20%. Later the contract is squared off at Rs.96. Find margin and profit.",
              solution:
                "Contract value = 80 x 100 = Rs.8,000.<br>Initial margin = 8,000 x 20% = Rs.1,600.<br>Profit = (96 - 80) x 100 = <b>Rs.1,600</b>.<br>Return on margin = 1,600 / 1,600 = <b>100%</b>.",
            },
            {
              ref: "Worked sum",
              title: "Short single-stock futures",
              question:
                "An investor goes short one stock future at Rs.160. Lot size is 100 and margin is 20%. The contract is bought back at Rs.140. Find margin and profit.",
              solution:
                "Contract value = 160 x 100 = Rs.16,000.<br>Initial margin = 16,000 x 20% = Rs.3,200.<br>Profit for short = (160 - 140) x 100 = <b>Rs.2,000</b>.",
            },
            {
              ref: "Worked sum",
              title: "Long index futures",
              question:
                "An investor goes long Nifty futures at 8000. Lot size is 50 and margin is 20%. One month later Nifty futures is 8500. Find margin and profit.",
              solution:
                "Contract value = 8000 x 50 = Rs.4,00,000.<br>Initial margin = 4,00,000 x 20% = Rs.80,000.<br>Profit = (8500 - 8000) x 50 = <b>Rs.25,000</b>.",
            },
            {
              ref: "Worked sum",
              title: "Hedge with short futures",
              question:
                "An investor bought 100 shares at Rs.300. Current price is Rs.350 and the investor wants to lock the Rs.50 gain. Which futures position is needed, and what is locked profit?",
              solution:
                "The investor owns the stock, so the risk is a price fall. Take the opposite position: <b>sell one Rs.350 futures contract</b> for 100 shares.<br>If price falls, stock loses but short futures gains. If price rises, stock gains but short futures loses.<br>Locked profit = (350 - 300) x 100 = <b>Rs.5,000</b>.",
            },
          ],
        },
        {
          kind: "drill",
          yesLabel: "Go long futures",
          noLabel: "Go short futures",
          items: [
            {
              prompt: "You expect the stock/index to rise and want speculative profit.",
              capitalise: true,
              why: "Bullish view means buy exposure: go long futures.",
            },
            {
              prompt: "You own a share portfolio and fear a temporary market fall.",
              capitalise: false,
              why: "You already hold long cash exposure. Hedge by selling/shorting index futures.",
            },
            {
              prompt: "You expect Bank Nifty to decline next month.",
              capitalise: false,
              why: "Bearish view means short futures; profit comes when futures price falls.",
            },
            {
              prompt: "You will need to buy the underlying later and fear the price will rise.",
              capitalise: true,
              why: "Future buyer's risk is price increase, so buy futures now to lock exposure.",
            },
          ],
        },
        {
          kind: "quiz",
          items: [
            {
              question: "In futures trading, marking to market means:",
              options: [
                "Final settlement only on maturity",
                "Daily repricing of open contracts at settlement price",
                "Physical delivery of all futures contracts",
                "No margin adjustment until expiry",
              ],
              answer: 1,
              why: "MTM debits/credits daily profit or loss to the margin account using the settlement price.",
            },
            {
              question: "A portfolio manager holding shares and fearing a market fall should generally:",
              options: ["Buy index futures", "Sell index futures", "Buy more shares", "Ignore beta"],
              answer: 1,
              why: "A long cash portfolio is hedged by taking an opposite short position in index futures.",
            },
            {
              question: "If a trader is short futures, the trader gains when:",
              options: ["Futures price rises", "Futures price falls", "Basis is zero", "Margin is refunded"],
              answer: 1,
              why: "Short futures profit = entry price minus exit price, multiplied by lot size.",
            },
          ],
        },
        {
          kind: "flips",
          title: "C. Quick recall",
          items: [
            {
              label: "MTM",
              question: "What are the two cash-flow effects of MTM?",
              answer:
                "Profit is <b>credited</b> and loss is <b>debited</b> to the margin account every day.",
            },
            {
              label: "Index contract",
              question: "How is index futures contract value calculated?",
              answer: "<b>Index level x contract multiplier</b>.",
            },
            {
              label: "Portfolio hedge",
              question: "What is the standard number of contracts for a portfolio hedge?",
              answer:
                "<b>Portfolio value x Beta / Futures contract value</b>, adjusted for rounding and hedge direction.",
            },
            {
              label: "Short hedge",
              question: "When do you use a short hedge?",
              answer:
                "When you hold the asset/portfolio and fear a fall. Sell futures to offset the cash-market loss.",
            },
          ],
        },
      ],
    },
  ],
  footer:
    "Chapter 9 · Derivatives Analysis and Valuation — compact first-principles content from ICAI Study Material, covering A Core Theory, B Forward/Futures Pricing, and C Futures Contracts.",
};
