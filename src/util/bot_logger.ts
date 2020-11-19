import * as winston from "winston";

let logger: winston.Logger;

export class LoggerFactory {
  public static getInstance(): winston.Logger {
    if (!logger) {
      logger = winston.createLogger({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
        level: "info",
        transports: [new winston.transports.Console()],
      });
    }

    return logger;
  }
}
