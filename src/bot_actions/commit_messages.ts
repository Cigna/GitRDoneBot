import {
  Action,
  AuthorizationFailureBotAction,
  BotActionResponse,
  NetworkFailureBotAction,
  SuccessfulBotAction,
  SuccessfulBotActionWithMessage,
  SuccessfulBotActionWithNothingToSay,
} from "./bot_action";
import {
  AuthorizationFailureResponse,
  GitLabApi,
  SuccessfulGetResponse,
} from "../gitlab";
import { GitLabCommit } from "../interfaces";

/**
 * This Bot Action class analyzes the titles of the Commits contained in the GitLab Merge Request
 * and determines what, if any, feedback to provide to user.
 */
export abstract class CommitMessages {
  private static minimumThreshold = 2;
  static botActionName = "CommitMessages";
  static readonly goodNote = `:star: Nice work following your team's commit message style conventions!`;
  static readonly hashtag = `[#CommitMessage](https://github.com/Cigna/GitRDoneBot#5-commit-messages)`;
  static readonly badNote = `:loudspeaker: Keep commits descriptive and concise - more than one word and between 3 and 50 characters`;

  /**
   * @param state the state of the Merge Request: `open`, `update`, or `merge`
   * @param api an instance of `GitLabApi`
   * @returns data about the success or failure of the GitLab API request and resulting properties calculated by Commit Messages analysis
   */
  static async analyze(
    state: string,
    api: GitLabApi,
  ): Promise<BotActionResponse> {
    let action: Action;
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

  /**
   * Invoked when Bot Action analysis was successful.
   * Constructs a BotAction object containing goodGitPractice and conditional feedback message.
   * @param state the state of the Merge Request: `open`, `update`, or `merge`
   * @param goodGitPractice represents whether or not the Merge Request event meets the criteria for good Commit Messages practice
   * @returns SuccSuccessfulBotActionWithMessageessfulBotAction instance containing feedback for user. If no feedback is warranted, an instance of SuccessfulBotActionWithNothingToSay is returned.
   */
  static buildSuccessfulAction(
    state: string,
    goodGitPractice: boolean,
  ): SuccessfulBotAction {
    let action: SuccessfulBotAction;

    switch (true) {
      case this.caseForBadMessage(goodGitPractice): {
        action = new SuccessfulBotActionWithMessage(
          goodGitPractice,
          this.badNote,
          this.hashtag,
        );
        break;
      }
      case this.caseForGoodMessage(state, goodGitPractice): {
        action = new SuccessfulBotActionWithMessage(
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
