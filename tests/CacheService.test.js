const CacheService = require("../services/CacheService");

describe("CacheService", () => {
  let cacheService;

  beforeEach(() => {
    cacheService = new CacheService();
  });

  test("should put data into cache", () => {
    cacheService.put("key", "value");
    expect(cacheService.get("key")).toBe("value");
  });

  test("should retrieve data from cache", () => {
    cacheService.put("key", "value");
    expect(cacheService.get("key")).toBe("value");
  });

  test("should delete data from cache", () => {
    cacheService.put("key", "value");
    cacheService.del("key");
    expect(cacheService.get("key")).toBeNull();
  });
});
