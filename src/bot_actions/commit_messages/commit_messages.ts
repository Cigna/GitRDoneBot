import { BotAction } from "..";
import {
  MergeRequestApi,
  GitLabAPIRequest,
  SuccessfulGetResponse,
  FailedGetResponse,
} from "../../gitlab";
import { GitLabCommit } from "../../interfaces";
import * as winston from "winston";
import { CommitMessagesNote } from "./commit_message_note";

/**
 * This class extends the `BotAction` class by analyzing the titles of the commits contained in the GitLab Merge Request.
 * In addition to the standard `BotAction` properties, each instance
 * of this class also contains the property:
 * 1. `calculatedThreshold`: `number` the number of failing commit titles that will result in bad practice for an individual commit message criteria
 */
export class CommitMessages implements BotAction {
  private static minimumThreshold = 2;

  private constructor(
    readonly apiRequest: GitLabAPIRequest,
    readonly goodGitPractice: boolean,
    readonly mrNote: string,
    readonly calculatedThreshold: number,
  ) {}

  /**
   * Constructs a complete Commit Message object by making an HTTP call and analyzing response.
   *
   * @param state the state of the incoming Merge Request event from GitLab
   * @param api an instance of the MergeRequestApi class that wraps HTTP requests to and responses from the GitLab API
   * @param constructiveFeedbackOnlyToggle if true, commit message note will reflect no action when CommitMessage.goodGitPractice is true
   * @param logger an instance of winston logger
   *
   * @returns CommitMessage object constructed after testing the number of failing commit titles against calculated threshold for each good practice criteria,
   * determining overall goodGitPractice based on individual tests, and instantiating a new note object.
   *
   * @remarks If api call fails, returns CommitMessage where `goodGitPractice` and `thresholdTestedNudges` will be undefined.
   * */
  static async from(
    state: string,
    api: MergeRequestApi,
    constructiveFeedbackOnlyToggle: boolean,
    logger: winston.Logger,
  ): Promise<CommitMessages> {
    let goodGitPractice!: boolean;
    let totalCommits: number;
    let threshold: number;

    const response:
      | SuccessfulGetResponse
      | FailedGetResponse = await api.getSingleMRCommits();

    if (response instanceof SuccessfulGetResponse) {
      threshold = this.calculateThreshold(response.result.length);
      totalCommits = response.result.length;
      if (response.result.length > 0) {
        const validityOfCommits: Array<boolean> = response.result.map(
          (commit: GitLabCommit) =>
            this.lengthValid(commit.title) && !this.isOneWord(commit.title),
        );
        goodGitPractice = this.testThreshold(validityOfCommits, threshold);
      }
    } else {
      threshold = CommitMessages.minimumThreshold;
      totalCommits = 0;
    }

    return new CommitMessages(
      response.apiRequest,
      goodGitPractice,
      CommitMessagesNote.buildMessage(
        response.apiRequest.success,
        state,
        goodGitPractice,
        constructiveFeedbackOnlyToggle,
        totalCommits,
        logger,
      ),
      threshold,
    );
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
}
