import {
  AuthorizationFailureBotAction,
  BotActionResponse,
  NetworkFailureBotAction,
  SuccessfulBotAction,
  SuccessfulBotActionWithNothingToSay,
} from "./bot_action";
import {
  AuthorizationFailureResponse,
  MergeRequestApi,
  SuccessfulGetResponse,
} from "../gitlab";
import { GitLabCommit } from "../interfaces";

/**
 * This class analyzes the titles of the commits contained in the GitLab Merge Request.
 * This class implements the `BotAction` interface and also contains the property:
 * 1. `calculatedThreshold`: `number` the number of failing commit titles that will result in bad practice for an individual commit message criteria
 */
export abstract class CommitMessages {
  private static minimumThreshold = 2;
  static botActionName = "CommitMessages";
  static readonly goodNote = `:star: Nice work following your team's commit message style conventions!`;
  static readonly hashtag = `[#CommitMessage](https://github.com/Cigna/GitRDoneBot#5-commit-messages)`;
  static readonly badNote = `:loudspeaker: Keep commits descriptive and concise - more than one word and between 3 and 50 characters`;

  /**
   * Constructs a complete Commit Message object by making an HTTP call and analyzing response.
   *
   * @param state the state of the incoming Merge Request event from GitLab
   * @param api an instance of the MergeRequestApi class that wraps HTTP requests to and responses from the GitLab API
   *
   * @returns CommitMessage object constructed after testing the number of failing commit titles against calculated threshold for each good practice criteria,
   * determining overall goodGitPractice based on individual tests, and instantiating a new note object.
   *
   * @remarks If api call fails, returns CommitMessage where `goodGitPractice` and `thresholdTestedNudges` will be undefined.
   * */
  static async analyze(
    state: string,
    api: MergeRequestApi,
  ): Promise<BotActionResponse> {
    let action:
      | AuthorizationFailureBotAction
      | NetworkFailureBotAction
      | SuccessfulBotAction
      | SuccessfulBotActionWithNothingToSay;
    let actionResponse: BotActionResponse;

    const response = await api.getSingleMRCommits();

    if (response instanceof SuccessfulGetResponse) {
      let goodGitPractice!: boolean;
      const threshold = this.calculateThreshold(response.result.length);
      const totalCommits = response.result.length;

      if (totalCommits === 0) {
        goodGitPractice = true;
      } else {
        const validityOfCommits: Array<boolean> = response.result.map(
          (commit: GitLabCommit) =>
            this.lengthValid(commit.title) && !this.isOneWord(commit.title),
        );
        goodGitPractice = this.testThreshold(validityOfCommits, threshold);
      }

      action = this.buildSuccessfulAction(state, goodGitPractice);

      actionResponse = new BotActionResponse(
        this.botActionName,
        response.statusCode,
        action,
        {
          calculatedThreshold: threshold,
        },
      );
    } else {
      if (response instanceof AuthorizationFailureResponse) {
        action = new AuthorizationFailureBotAction();
      } else {
        action = new NetworkFailureBotAction();
      }
      actionResponse = new BotActionResponse(
        this.botActionName,
        response.statusCode,
        action,
      );
    }

    return actionResponse;
  }

  /**
   *
   * Computes the threshold (number of offenses required to give a "nudge")
   * Since MRs can be of many different sizes, it makes sense to evaluate
   * the user based on the percentage of correct commits.
   *
   * If we do this, though, we run into strange behavior when there are
   * very few commits.
   *
   * So, we define both a universal minimum threshold and a percentage of
   * commits. The "threshold" is the higher of these two numbers.
   *
   * @param totalCommits Number of commits used in this merge request
   */
  private static calculateThreshold(totalCommits: number): number {
    const PERCENT = 0.2;
    const THRESHOLD_FOR_PERCENT = CommitMessages.minimumThreshold / PERCENT;

    return totalCommits >= THRESHOLD_FOR_PERCENT
      ? Math.floor(totalCommits * PERCENT)
      : CommitMessages.minimumThreshold;
  }

  /**
   *
   * @param grammarParam Ordered array indicating whether each commit followed (true) or violated (false) this convention
   * @param threshold Obtained by the `calculateThreshold` function
   */
  private static testThreshold(
    grammarParam: Array<boolean>,
    threshold: number,
  ): boolean {
    return grammarParam.filter((bool) => bool === false).length <= threshold;
  }

  /**
   * Returns whether a string follows the length convention
   * @returns True if the string has at least 4 alphanumeric characters and at most 50 of any type of character.
   */
  private static lengthValid(message: string): boolean {
    return message.replace(/[\W_]+/g, "").length >= 4 && message.length <= 50;
  }

  private static isOneWord(title: string): boolean {
    return title.trim().split(" ").length === 1;
  }

  static caseForGoodMessage(state: string, goodGitPractice: boolean): boolean {
    return state !== "merge" && goodGitPractice === true;
  }

  static caseForBadMessage(goodGitPractice: boolean): boolean {
    return goodGitPractice === false;
  }

  static buildSuccessfulAction(
    state: string,
    goodGitPractice: boolean,
  ): SuccessfulBotAction | SuccessfulBotActionWithNothingToSay {
    let action: SuccessfulBotAction | SuccessfulBotActionWithNothingToSay;

    switch (true) {
      case this.caseForBadMessage(goodGitPractice): {
        action = new SuccessfulBotAction(
          goodGitPractice,
          this.badNote,
          this.hashtag,
        );
        break;
      }
      case this.caseForGoodMessage(state, goodGitPractice): {
        action = new SuccessfulBotAction(
          goodGitPractice,
          this.goodNote,
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
