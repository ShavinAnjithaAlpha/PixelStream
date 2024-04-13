const winston = require("winston");

const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    // new winston.transports.File({ filename: "logs/info.log", level: "info" }),
    new winston.transports.File({ filename: "logs/warn.log", level: "warn" }),
    new winston.transports.File({ filename: "logs/debug.log", level: "debug" }),
    // new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

if (process.env.NODE_ENV != "production") {
  logger.add(
    new winston.transports.Console({
      format: logger.format.simple,
      level: "error",
    })
  );
}

module.exports = logger;
