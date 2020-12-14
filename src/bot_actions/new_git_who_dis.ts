import {
  BotActionResponse,
  SuccessfulBotAction,
  SuccessfulBotActionWithNothingToSay,
} from "./bot_action";
import { NoRequestNeeded } from "../gitlab";

/**
 * This Bot Action class analyzes the name of the author of the GitLab Merge Request
 * and determines what, if any, feedback to provide to user.
 */
export abstract class NewGitWhoDis {
  static readonly botActionName = "NewGitWhoDis";
  static readonly badNote = `it's really hard to see who you are! Would you please make your Git account names human readable?`;
  static readonly badIcon = `:loudspeaker:`;
  static readonly hashtag = `[#NewGitWhoDis](https://github.com/Cigna/GitRDoneBot#6-new-git-who-dis)`;

  /**
   * @param authorName the name of the GitLab user who authored the Merge Request
   * @returns data about properties calculated by New Git Who Dis analysis
   * @remarks this function never requires an API call
   */
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

  /**
   * Invoked when Bot Action analysis was successful.
   * Constructs a BotAction object containing goodGitPractice and conditional feedback message.
   * @param goodGitPractice represents whether or not the Merge Request event meets the criteria for good New Git Who Dis practice
   * @returns SuccessfulBotAction instance containing feedback for user. If no feedback is warranted, an instance of SuccessfulBotActionWithNothingToSay is returned.
   */
  static buildSuccessfulAction(
    authorName: string,
    goodGitPractice: boolean,
  ): SuccessfulBotAction | SuccessfulBotActionWithNothingToSay {
    let action: SuccessfulBotAction | SuccessfulBotActionWithNothingToSay;

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
