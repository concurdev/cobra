/**
 * Manages user subscriptions to currency pairs.
 * Allows users to subscribe to and unsubscribe from currency pairs.
 */
class SubscriptionService {
  constructor() {
    // Initialize subscriptions data
    this.subscriptions = {};
  }

  /**
   * Handles user subscription to currency pairs.
   * @param {string} userId - The unique identifier of the user.
   * @param {string[]} pairs - An array of currency pairs to subscribe to.
   */
  subscribe(userId, pairs) {
    this.subscriptions[userId] = pairs;
  }

  /**
   * Handles user unsubscription from currency pairs.
   * @param {string} userId - The unique identifier of the user.
   */
  unsubscribe(userId) {
    delete this.subscriptions[userId];
  }
}

module.exports = SubscriptionService;
