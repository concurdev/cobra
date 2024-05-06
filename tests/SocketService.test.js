const SocketService = require("../services/SocketService");
const OrderBookService = require("../services/OrderBookService");
const TradeService = require("../services/TradeService");
const SubscriptionService = require("../services/SubscriptionService");
const LoggingService = require("../services/LoggingService");
const CacheService = require("../services/CacheService");
const MessageQueueService = require("../services/MessageQueueService");

jest.mock("../services/LoggingService");

describe("SocketService", () => {
  let socketService;
  let orderBookService;
  let tradeService;
  let subscriptionService;
  let loggingService;
  let cacheService;
  let messageQueueService;

  beforeEach(() => {
    orderBookService = new OrderBookService();
    tradeService = new TradeService();
    subscriptionService = new SubscriptionService();
    loggingService = new LoggingService();
    cacheService = new CacheService(); // Mock or actual CacheService instance
    messageQueueService = new MessageQueueService(); // Mock or actual MessageQueueService instance

    // Mock HTTP server
    const server = {
      on: jest.fn(),
    };

    // Mock socket.io instance
    const io = {
      on: jest.fn(),
      emit: jest.fn(),
    };

    socketService = new SocketService(server, {
      orderBookService,
      tradeService,
      subscriptionService,
      loggingService,
      cacheService,
      messageQueueService,
    });

    // Assign mocked io to the instance
    socketService.io = io;
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  test("should connect to socket server", () => {
    // Mock socket object
    const socket = {
      on: jest.fn(),
      emit: jest.fn(),
      close: jest.fn(),
    };

    // Trigger 'connection' event
    socketService.handleConnection();

    // Trigger 'connection' callback
    socketService.io.on.mock.calls[0][1](socket);

    // Expectations
    expect(loggingService.logInfo).toHaveBeenCalledWith("New user connected");
  });

  test("should handle error on invalid connection", () => {
    // Mock socket.io instance with 'connection' event throwing error
    const ioWithError = {
      on: jest.fn((event, callback) => {
        if (event === "connection") {
          throw new Error("Invalid connection");
        }
      }),
    };

    socketService.io = ioWithError;

    // Expectations
    expect(socketService.handleConnection).toThrow("Invalid connection");
  });
});
