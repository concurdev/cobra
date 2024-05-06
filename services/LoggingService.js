const winston = require("winston");
const packageInfo = require("../package.json");

/**
 * LoggingService class provides methods for logging messages using Winston.
 */
class LoggingService {
  constructor() {
    // Configure Winston logger
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.label({ label: packageInfo.name }), // Add the app name from package.json
        winston.format.timestamp(), // Add timestamp
        winston.format.printf(({ level, message, label, timestamp, env }) => {
          return `${label} | ${env} run @ ${timestamp} | ${level}: ${message}`; // Format log message
        })
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "combined.log" }),
      ],
    });
  }

  // Method for logging info messages
  logInfo(message) {
    this.logger.info(message, { env: process.env.NODE_ENV });
  }

  // Method for logging warning messages
  logWarn(message) {
    this.logger.warn(message, { env: process.env.NODE_ENV });
  }

  // Method for logging error messages
  logError(message) {
    this.logger.error(message, { env: process.env.NODE_ENV });
  }
}

module.exports = LoggingService;
