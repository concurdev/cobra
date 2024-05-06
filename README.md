# cobra: Crypto Order Book Real-time Application

**IMPORTANT**: While using the frontend, wait at the browser screen or leave it for a while to see the Trade happening and growing.

## Overview

This project implements a real-time order book and trade update system for a crypto exchange platform. The system enables users to subscribe to specific crypto pairs and receive updates on order book changes and trade executions in real-time.

## Architecture / Implementation Details

The system follows a microservices architecture, characterized by modularity, decentralization, scalability, resilience, and technology diversity.

### Microservices:

- **OrderBookService**: Manages order book data for different currency pairs.
- **TradeService**: Manages trade data for different currency pairs.
- **SubscriptionService**: Manages user subscriptions to currency pairs.
- **SocketService**: Handles WebSocket connections and broadcasts updates to subscribed clients.
- **LoggingService**: Provides logging functionality using Winston.
- **CacheService**: Manages an in-memory cache for storing user subscriptions.
- **MessageQueueService**: Provides methods for interacting with RabbitMQ message queues.

### Communication Flow:

1. User applications connect to the server using sockets.
2. The server acknowledges the connection and prompts the user to identify or authenticate.
3. The user application subscribes to specific crypto pairs.
4. The server confirms the subscription and starts sending real-time updates for the chosen pairs:
   - Order book updates whenever bids or asks change.
   - Trade notifications when a trade is executed for a subscribed pair.
5. Client applications process the received updates and update their user interface accordingly.

### Benefits:

- **Modularity**: Each service is independent and can be developed, deployed, and scaled independently.
- **Decentralization**: Services communicate through well-defined interfaces, promoting autonomy.
- **Scalability**: Services can be scaled individually based on demand.
- **Resilience**: Failures in one service do not necessarily impact other services.
- **Technology Diversity**: Each service can be implemented using different technologies, providing flexibility.

## Usage

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the server using `npm start`.
4. Access the client interface by opening `client/index.html` in a web browser URL would be http://localhost:7373/client/index.html, port 7373 is used in config.
   **IMPORTANT**: Wait at the browser screen or leave it for a while to
   see the Trade happening and growing.

## Technologies Used

- Node.js
- Socket.io
- RabbitMQ
- Winston
- Memory-cache

## Requirements

The system should:

- Maintain order books for each crypto pair.
- Track executed trades and their details.
- Handle user subscriptions to specific crypto pairs.
- Accept connections from user applications and broadcast updates.
- Log events using Winston.
- Cache data in-memory.
- Use RabbitMQ for message queueing.

### Directory Structure

The project structure is as follows:

```
cobra/
│
├── client/
│ ├── index.html
│ └── script.js
│
├── utils/
│ └── env.js
│
├── services/
│ ├── OrderBookService.js
│ ├── TradeService.js
│ ├── SubscriptionService.js
│ ├── SocketService.js
│ ├── LoggingService.js
│ ├── CacheService.js
│ └── MessageQueueService.js
│
├── server.js
└── .env
```

### How to Run

1. Install dependencies: `npm install`
2. Start the server: `npm start` or `npm run dev` for development with nodemon.
3. Testing: `npm test` for all services

## Usage

- Connect to the server using sockets and subscribe to specific crypto pairs.
- Receive real-time updates on order book changes and trade executions.
- Optionally submit buy and sell orders through the socket connection.

## Communication Flow

1. User applications connect to the server using sockets.
2. The server acknowledges the connection and prompts the user to identify or authenticate.
3. The user application subscribes to specific crypto pairs.
4. The server confirms the subscription and starts sending real-time updates for the chosen pairs:
   - Order book updates whenever bids or asks change (new orders, cancellations, quantity adjustments).
   - Trade notifications when a trade is executed for a subscribed pair (including price, quantity, and timestamp).

## Data Flow

1. Order book and trade data are managed by the `OrderBookService` and `TradeService` respectively.
2. User subscriptions are handled by the `SubscriptionService`.
3. Socket connections and message broadcasting are managed by the `SocketService`.
4. Logging is handled by the `LoggingService`.
5. In-memory caching is provided by the `CacheService`.
6. Message queueing is implemented using RabbitMQ through the `MessageQueueService`.

## Logic Explanation

- **OrderBookService**: Generates and updates mock order book data for each crypto pair.
- **TradeService**: Generates and records mock trade data for each crypto pair.
- **SubscriptionService**: Manages user subscriptions to specific crypto pairs.
- **SocketService**: Handles socket connections, subscribes to pairs, and broadcasts updates to connected clients.
- **LoggingService**: Logs events, warnings, and errors using Winston.
- **CacheService**: Provides caching functionality for user subscriptions.
- **MessageQueueService**: Connects to RabbitMQ for message queueing.

## Assumptions

- The project uses mock data for initial order books and trades.
- Error handling and recovery mechanisms are assumed to be implemented for production use.
- The application does not include user authentication and authorization for order submission through the socket connection.
- Message throttling is not implemented in the current version.

## Testing

- Unit tests have been written for each microservice using Jest.
- Integration tests have been performed to ensure proper communication and functionality between microservices.
- End-to-end tests can validate the entire system's behavior from socket connection to receiving updates.

To run all tests at once, use the following command:

```bash
npm test
```

## Broadcasting Logic

- The `SocketService` periodically broadcasts updates to all connected clients.
- New bid and ask data is randomly generated for each currency pair.
- The updated order books and trades are emitted to all connected clients using socket.io.

## Currency Pairs Used

- BTC/USD
- ETH/USD
- XRP/USD
- LTC/USD
- BCH/USD

## Example Output

- When connected to the server, users will see real-time updates on order book changes and trade executions in the browser console.
- Order book updates and trade notifications are printed to the console, indicating the current state of the market.

## License

This project is licensed under the MIT License.
