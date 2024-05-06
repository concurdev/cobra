/**
 * Service class for managing order books.
 */
class OrderBookService {
  /**
   * Initialize order book service with mock order book data.
   */
  constructor() {
    // Initialize order book data
    this.orderBooks = this.generateMockOrderBooks();
  }

  /**
   * Generate mock order book data.
   * @returns {object} Mock order book data.
   */
  generateMockOrderBooks() {
    const mockOrderBooks = {};
    const pairs = ["BTC/USD", "ETH/USD", "XRP/USD", "LTC/USD", "BCH/USD"];
    pairs.forEach((pair) => {
      mockOrderBooks[pair] = { bids: [], asks: [] };
      // Generate mock data for initial bids and asks
      for (let i = 0; i < 5; i++) {
        mockOrderBooks[pair].bids.push({
          price: Math.random() * 10000,
          quantity: Math.random() * 100,
        });
        mockOrderBooks[pair].asks.push({
          price: Math.random() * 10000,
          quantity: Math.random() * 100,
        });
      }
    });
    return mockOrderBooks;
  }

  /**
   * Get order book for a specific trading pair.
   * @param {string} pair - The trading pair (e.g., "BTC/USD").
   * @returns {object} Order book data for the specified pair.
   */
  getOrderBook(pair) {
    return this.orderBooks[pair] || { bids: [], asks: [] };
  }

  /**
   * Update order book data for a specific trading pair.
   * @param {string} pair - The trading pair (e.g., "BTC/USD").
   * @param {object} data - Updated order book data.
   */
  updateOrderBook(pair, data) {
    this.orderBooks[pair] = data;
  }
}

module.exports = OrderBookService;
