const cache = require("memory-cache");

/*
  CacheService:
  - Provides methods to interact with an in-memory cache.
*/
class CacheService {
  constructor() {
    this.cache = cache; // Initialize the cache instance
  }

  // Method to add data to the cache
  put(key, value) {
    this.cache.put(key, value); // Add key-value pair to the cache
  }

  // Method to retrieve data from the cache
  get(key) {
    return this.cache.get(key); // Retrieve value associated with the given key from the cache
  }

  // Method to delete data from the cache
  del(key) {
    this.cache.del(key); // Delete data associated with the given key from the cache
  }
}

module.exports = CacheService;
