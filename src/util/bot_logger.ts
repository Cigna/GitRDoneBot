import * as winston from "winston";

export const winlog = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  level: "info",
  transports: [new winston.transports.Console()],
});
