const MessageQueueService = require("../services/MessageQueueService");

describe("MessageQueueService", () => {
  let messageQueueService;

  beforeEach(async () => {
    messageQueueService = new MessageQueueService();
    await messageQueueService.connect(); // Wait for the asynchronous connect operation to complete
  });

  test("should publish message to RabbitMQ", () => {
    const mockChannel = {
      publish: jest.fn(),
    };
    messageQueueService.channel = mockChannel;
    messageQueueService.publishMessage("exchange", { message: "Test message" });
    expect(mockChannel.publish).toHaveBeenCalledWith(
      "exchange",
      "",
      Buffer.from('{"message":"Test message"}')
    );
  });

  test("should consume messages from RabbitMQ", () => {
    const mockChannel = {
      consume: jest.fn(),
    };
    messageQueueService.channel = mockChannel;
    const mockCallback = jest.fn();
    messageQueueService.consumeMessages("queue", mockCallback);
    expect(mockChannel.consume).toHaveBeenCalledWith(
      "queue",
      expect.any(Function),
      { noAck: true }
    );
  });
});
