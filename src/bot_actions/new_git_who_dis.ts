import {
  BotActionResponse,
  SuccessfulBotAction,
  SuccessfulBotActionWithNothingToSay,
} from "./bot_action";
import { NoRequestNeeded } from "../gitlab";

/**
 * This class analyzes the name of the author of the GitLab Merge Request.
 * This class implements the `BotAction` interface.
 * */
export abstract class NewGitWhoDis {
  static readonly botActionName = "NewGitWhoDis";
  static readonly badNote = `it's really hard to see who you are! Would you please make your Git account names human readable?`;
  static readonly badIcon = `:loudspeaker:`;
  static readonly hashtag = `[#NewGitWhoDis](https://github.com/Cigna/GitRDoneBot#6-new-git-who-dis)`;

  /**
   * Constructs a complete Bot Action object by analyzing the author name.
   * @param authorName the name of the GitLab user who authored the Merge Request
   * @returns BotAction object constructed after checking that the author name is not a LAN ID,
   * determining goodGitPractice based on that check, and instantiating a new note object
   * */
  static async analyze(authorName: string): Promise<BotActionResponse> {
    const goodGitPractice = this.authorNameIsNotLanId(authorName);

    const action = this.buildSuccessfulAction(authorName, goodGitPractice);

    return new BotActionResponse(
      this.botActionName,
      new NoRequestNeeded().statusCode,
      action,
    );
  }

  // Change this to check for the format of your organizations default GitLab account id
  private static authorNameIsNotLanId(authorName: string): boolean {
    const regex = new RegExp(/^[a-zA-Z]\d{5}$/);
    const authorNameIsLanId: boolean = regex.test(authorName);
    return !authorNameIsLanId;
  }

  static buildSuccessfulAction(
    authorName: string,
    goodGitPractice: boolean,
  ): SuccessfulBotAction | SuccessfulBotActionWithNothingToSay {
    let action;

    switch (goodGitPractice) {
      case false: {
        action = new SuccessfulBotAction(
          goodGitPractice,
          `${this.badIcon} Hi @${authorName}, ${this.badNote}`,
          this.hashtag,
        );
        break;
      }
      default: {
        action = new SuccessfulBotActionWithNothingToSay(goodGitPractice);
      }
    }
    return action;
  }
}
