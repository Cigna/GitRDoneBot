import * as winston from "winston";
import { BotActionInfo } from "../bot_actions";

let logger: winston.Logger;

export class LoggerFactory {
  static botActionInfos: Array<BotActionInfo> = [];

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

  /**
   * appendBotInfo
   */
  public static appendBotInfo(info: BotActionInfo): void {
    this.botActionInfos.push(info);
  }

  public static logBotActionInfo(): void {
    logger.info(this.botActionInfos);
  }
}
