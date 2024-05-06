const SubscriptionService = require("../services/SubscriptionService");

describe("SubscriptionService", () => {
  let subscriptionService;

  beforeEach(() => {
    subscriptionService = new SubscriptionService();
  });

  test("should subscribe a user to specific pairs", () => {
    subscriptionService.subscribe("user123", ["BTC/USD", "ETH/USD"]);
    expect(subscriptionService.subscriptions["user123"]).toEqual([
      "BTC/USD",
      "ETH/USD",
    ]);
  });

  test("should unsubscribe a user from specific pairs", () => {
    subscriptionService.subscriptions["user123"] = ["BTC/USD", "ETH/USD"];
    subscriptionService.unsubscribe("user123");
    expect(subscriptionService.subscriptions["user123"]).toBeUndefined();
  });
});
