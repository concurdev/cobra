const amqp = require("amqplib/callback_api");

/**
 * MessageQueueService class provides methods for interacting with RabbitMQ message queues.
 */
class MessageQueueService {
  constructor() {
    // Connect to RabbitMQ server
    this.connect();
  }

  /**
   * Connect to the RabbitMQ server.
   */
  connect() {
    const url = "amqp://localhost"; // RabbitMQ server URL
    amqp.connect(url, (err, connection) => {
      if (err) {
        console.error("Failed to connect to RabbitMQ:", err);
        return;
      }
      // console.log("Connected to RabbitMQ"); // for debugging
      // Create a channel
      connection.createChannel((err, channel) => {
        if (err) {
          console.error("Error creating RabbitMQ channel:", err);
          return;
        }
        // Define exchange
        const exchange = "orderbook"; // Exchange name
        // Assert exchange
        channel.assertExchange(exchange, "fanout", { durable: false }); // Declare exchange
        // Store channel reference
        this.channel = channel;
      });
    });
  }

  /**
   * Publish a message to a RabbitMQ exchange.
   * @param {string} exchange - The name of the exchange.
   * @param {object} message - The message to be published.
   */
  publishMessage(exchange, message) {
    if (!this.channel) {
      console.error("RabbitMQ channel not available"); // Log error if channel is not available
      return;
    }
    // Publish message to exchange
    this.channel.publish(exchange, "", Buffer.from(JSON.stringify(message))); // Convert message to buffer and publish
    console.log("Message published to RabbitMQ");
  }

  /**
   * Consume messages from a RabbitMQ queue.
   * @param {string} queue - The name of the queue.
   * @param {function} callback - The callback function to handle consumed messages.
   */
  consumeMessages(queue, callback) {
    if (!this.channel) {
      console.error("RabbitMQ channel not available");
      return;
    }
    // Consume messages from queue
    this.channel.consume(
      queue,
      (message) => {
        callback(message);
      },
      { noAck: true }
    );
  }
}

module.exports = MessageQueueService;
