const LoggingService = require("../services/LoggingService");

describe("LoggingService", () => {
  let loggingService;

  beforeEach(() => {
    loggingService = new LoggingService();
  });

  test("should log info message", () => {
    const mockLoggerInfo = jest.spyOn(loggingService.logger, "info");
    loggingService.logInfo("Test info message");
    expect(mockLoggerInfo).toHaveBeenCalledWith("Test info message", {
      env: "test",
    });
  });

  test("should log warning message", () => {
    const mockLoggerWarn = jest.spyOn(loggingService.logger, "warn");
    loggingService.logWarn("Test warning message");
    expect(mockLoggerWarn).toHaveBeenCalledWith("Test warning message", {
      env: "test",
    });
  });

  test("should log error message", () => {
    const mockLoggerError = jest.spyOn(loggingService.logger, "error");
    loggingService.logError("Test error message");
    expect(mockLoggerError).toHaveBeenCalledWith("Test error message", {
      env: "test",
    });
  });
});
