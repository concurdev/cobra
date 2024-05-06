const TradeService = require("../services/TradeService");

describe("TradeService", () => {
  let tradeService;

  beforeEach(() => {
    tradeService = new TradeService();
  });

  test("should return trades for a specific pair", () => {
    const trades = tradeService.getTrades("BTC/USD");
    expect(trades).toBeDefined();
  });

  test("should record a trade for a specific pair", () => {
    const initialTrades = tradeService.getTrades("BTC/USD");
    tradeService.recordTrade("BTC/USD", {
      price: 50000,
      quantity: 1,
      timestamp: new Date(),
    });
    const updatedTrades = tradeService.getTrades("BTC/USD");
    expect(updatedTrades.length).toEqual(initialTrades.length);
  });
});
