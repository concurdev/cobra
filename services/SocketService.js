const socketIo = require("socket.io");

/**
 * Service class for managing WebSocket connections and broadcasting updates.
 */
class SocketService {
  /**
   * Initialize the SocketService with required dependencies.
   * @param {http.Server} server - The HTTP server instance.
   * @param {object} services - An object containing various services required for handling socket connections.
   * @param {OrderBookService} services.orderBookService - The order book service instance.
   * @param {TradeService} services.tradeService - The trade service instance.
   * @param {SubscriptionService} services.subscriptionService - The subscription service instance.
   * @param {LoggingService} services.loggingService - The logging service instance.
   * @param {CacheService} services.cacheService - The cache service instance.
   * @param {MessageQueueService} services.messageQueueService - The message queue service instance.
   */
  constructor(
    server,
    {
      orderBookService,
      tradeService,
      subscriptionService,
      loggingService,
      cacheService,
      messageQueueService,
    }
  ) {
    // Initialize socket.io with the provided HTTP server
    this.io = socketIo(server);
    // Assign required services
    this.orderBookService = orderBookService;
    this.tradeService = tradeService;
    this.subscriptionService = subscriptionService;
    this.loggingService = loggingService;
    this.cacheService = cacheService;
    this.messageQueueService = messageQueueService;

    // Bind methods to this instance
    this.handleConnection = this.handleConnection.bind(this);
    this.broadcastUpdates = this.broadcastUpdates.bind(this);
  }

  /**
   * Handle new socket connections.
   * Subscribe to requested pairs, handle disconnections, and broadcast updates.
   */
  handleConnection() {
    // Handle connection event
    this.io.on("connection", (socket) => {
      // Log new user connection
      this.loggingService.logInfo("New user connected");

      // Handle subscribe event
      socket.on("subscribe", (pairs) => {
        this.loggingService.logInfo(`Subscribing to pairs: ${pairs}`);
        // For each subscribed pair, send order book and trade updates
        pairs.forEach((pair) => {
          const orderBook = this.orderBookService.getOrderBook(pair);
          const trades = this.tradeService.getTrades(pair);
          socket.emit("orderBookUpdate", orderBook);
          socket.emit("tradeUpdate", trades);
        });
        // Store user subscription in cache or database
        this.cacheService.put(socket.id, pairs);
      });

      // Handle disconnect event
      socket.on("disconnect", () => {
        // Log user disconnection
        this.loggingService.logInfo("User disconnected");
        // Remove user subscription from cache or database
        this.cacheService.del(socket.id);
      });
    });

    // Throttle the broadcast to every 5 seconds
    setInterval(this.broadcastUpdates, 5000);
  }

  /**
   * Broadcasts updates for order books and trades to all connected clients at regular intervals.
   * Randomly generates new bid and ask data for each currency pair, updates the order books with the new data,
   * and emits the updated order books and trades to all connected clients using socket.io.
   * This function is called periodically to provide real-time updates to clients.
   */
  broadcastUpdates() {
    // Array of currency pairs to update
    const pairs = ["BTC/USD", "ETH/USD", "XRP/USD", "LTC/USD", "BCH/USD"];

    // Iterate over each currency pair
    pairs.forEach((pair) => {
      // Generate new random bid data
      const newBid = {
        price: Math.random() * 10000, // Random price
        quantity: Math.random() * 100, // Random quantity
      };

      // Generate new random ask data
      const newAsk = {
        price: Math.random() * 10000, // Random price
        quantity: Math.random() * 100, // Random quantity
      };

      // Get the current order book for the pair
      const orderBook = this.orderBookService.getOrderBook(pair);

      // Add the new bid and ask data to the order book
      orderBook.bids.push(newBid);
      orderBook.asks.push(newAsk);

      // Update the order book with the new data
      this.orderBookService.updateOrderBook(pair, orderBook);

      // Generate new random trade data
      const newTrade = {
        price: Math.random() * 10000, // Random price
        quantity: Math.random() * 10, // Random quantity
        timestamp: new Date().toISOString(), // Current timestamp
      };

      // Record the new trade in the trade service
      this.tradeService.recordTrade(pair, newTrade);
    });

    // Get a copy of the updated order books
    const updatedOrderBooks = { ...this.orderBookService.orderBooks };

    // Get a copy of the updated trades
    const updatedTrades = { ...this.tradeService.trades };

    // Emit the updated order books to all connected clients
    this.io.emit("orderBookUpdate", updatedOrderBooks);

    // Emit the updated trades to all connected clients
    this.io.emit("tradeUpdate", updatedTrades);
  }
}

module.exports = SocketService;
