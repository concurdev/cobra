const OrderBookService = require("../services/OrderBookService");

describe("OrderBookService", () => {
  let orderBookService;

  beforeEach(() => {
    orderBookService = new OrderBookService();
  });

  test("should return order book for a specific pair", () => {
    const orderBook = orderBookService.getOrderBook("BTC/USD");
    expect(orderBook).toBeDefined();
  });

  test("should update order book for a specific pair", () => {
    const initialOrderBook = orderBookService.getOrderBook("BTC/USD");
    orderBookService.updateOrderBook("BTC/USD", { bids: [], asks: [] });
    const updatedOrderBook = orderBookService.getOrderBook("BTC/USD");
    expect(updatedOrderBook).toEqual({ bids: [], asks: [] });
  });
});
