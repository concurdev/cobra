/**
 * Manages trade data for different currency pairs.
 * Allows recording and retrieval of trade information for specific pairs.
 */
class TradeService {
  constructor() {
    // Initialize trade data
    this.trades = {};
    this.generateMockTrades();
  }

  /**
   * Generates mock trade data for initial setup.
   */
  generateMockTrades() {
    const pairs = ["BTC/USD", "ETH/USD", "XRP/USD", "LTC/USD", "BCH/USD"];
    pairs.forEach((pair) => {
      this.trades[pair] = [];
      // Generate mock data for initial trades
      for (let i = 0; i < 5; i++) {
        this.trades[pair].push({
          price: Math.random() * 10000,
          quantity: Math.random() * 10,
          timestamp: new Date().toISOString(),
        });
      }
    });
  }

  /**
   * Retrieves trades for a specific currency pair.
   * @param {string} pair - The currency pair for which trades are requested.
   * @returns {object[]} - An array of trade objects for the specified pair.
   */
  getTrades(pair) {
    return this.trades[pair] || [];
  }

  /**
   * Records a trade for a specific currency pair.
   * @param {string} pair - The currency pair for which the trade is recorded.
   * @param {object} tradeData - The trade data to be recorded.
   */
  recordTrade(pair, tradeData) {
    if (!this.trades[pair]) {
      this.trades[pair] = [];
    }
    this.trades[pair].push(tradeData);
  }
}

module.exports = TradeService;
