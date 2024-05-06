require("dotenv").config(); // Load environment variables from .env file

require("dotenv").config();
const express = require("express");
const http = require("http");
const SocketService = require("./services/SocketService");
const OrderBookService = require("./services/OrderBookService");
const TradeService = require("./services/TradeService");
const SubscriptionService = require("./services/SubscriptionService");
const LoggingService = require("./services/LoggingService");
const CacheService = require("./services/CacheService");
const MessageQueueService = require("./services/MessageQueueService");
const { requireEnv, requireIntEnv } = require("./utils/env");
const path = require("path");

/*
  Server Class:
  - Manages the initialization and startup of the server.
  - Initializes Express app, HTTP server, services, socket service,
    static file serving, and error handling.
  - Starts the server and listens on the appropriate port based on the environment.
*/
class Server {
  constructor() {
    this.app = express(); // Create an Express application
    this.server = http.createServer(this.app); // Create an HTTP server with the Express application
    this.initializeServices(); // Initialize various services
    this.initializeSocketService(); // Initialize the socket service
    this.initializeStaticFiles(); // Serve static files
    this.initializeErrorHandling(); // Initialize error handling middleware
  }

  // Initialize various services required by the server
  initializeServices() {
    this.orderBookService = new OrderBookService(); // Initialize the OrderBookService
    this.tradeService = new TradeService(); // Initialize the TradeService
    this.subscriptionService = new SubscriptionService(); // Initialize the SubscriptionService
    this.loggingService = new LoggingService(); // Initialize the LoggingService
    this.cacheService = new CacheService(); // Initialize the CacheService
    this.messageQueueService = new MessageQueueService(); // Initialize the MessageQueueService
  }

  // Initialize the socket service with required dependencies
  initializeSocketService() {
    this.socketService = new SocketService(this.server, {
      orderBookService: this.orderBookService,
      tradeService: this.tradeService,
      subscriptionService: this.subscriptionService,
      loggingService: this.loggingService,
      cacheService: this.cacheService,
      messageQueueService: this.messageQueueService,
    });
  }

  // Serve static files from the 'client' directory
  initializeStaticFiles() {
    const staticPath = path.join(__dirname, "client"); // Get the absolute path to the 'client' directory
    this.app.use("/client", express.static(staticPath)); // Serve static files from the 'client' directory
  }

  // Initialize error handling middleware
  initializeErrorHandling() {
    this.app.use((err, req, res, next) => {
      this.loggingService.logError(err.stack); // Log the error
      res.status(500).send("Internal Server Error"); // Send an Internal Server Error response
    });
  }

  // Start the server
  start() {
    const PORT =
      requireEnv("NODE_ENV") === "PROD" // Determine the port based on the environment
        ? requireIntEnv("PROD_PORT") // Use the production port if NODE_ENV is 'PROD'
        : requireIntEnv("DEV_PORT"); // Use the development port if NODE_ENV is not 'PROD'

    // Start listening on the specified port
    this.server.listen(PORT, () => {
      this.loggingService.logInfo(`Server running on port ${PORT}`); // Log the port the server is running on
    });

    this.socketService.handleConnection(); // Handle socket connections
  }
}

const server = new Server(); // Create a new instance of the Server class
server.start(); // Start the server
