import * as winston from "winston";
import { BotActionInfo } from "../bot_actions";

let logger: winston.Logger;
let botActionInfos: Array<BotActionInfo>;

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

  public static appendBotInfo(info: BotActionInfo): void {
    if (!botActionInfos) {
      botActionInfos = [];
    }
    botActionInfos.push(info);
  }

  public static getBotActionInfo(): Array<BotActionInfo> {
    return botActionInfos;
  }
}
