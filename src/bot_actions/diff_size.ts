import {
  AuthorizationFailureBotAction,
  BotActionResponse,
  NetworkFailureBotAction,
  SuccessfulBotActionWithMessage,
  SuccessfulBotActionWithNothingToSay,
} from "./bot_action";
import { BotActionConfig } from "../custom_config/bot_action_config";
import {
  AuthorizationFailureResponse,
  GitLabApi,
  SuccessfulGetResponse,
} from "../gitlab";
import { Change } from "../interfaces";
import { Action, SuccessfulBotAction } from ".";

/**
 * This Bot Action class analyzes how many lines of diff are contained in the GitLab Merge Request
 * and determines what, if any, feedback to provide to user.
 */
export abstract class DiffSize {
  static readonly botActionName = "DiffSize";
  static readonly zeroNote = `:star: Great idea creating a MR right away from a branch/issue!`;
  static readonly goodNote = `:star: Great job keeping your merge requests manageable!`;
  static readonly badNote =
    `:loudspeaker: This merge request is larger than one person can handle. ` +
    `Why not call in a partner and keep your branches smaller?`;
  static readonly hashtag = `[#DiffAnalysis](https://github.com/Cigna/GitRDoneBot#1-diff-size)`;

  /**
   * @param state the state of the Merge Request: `open`, `update`, or `merge`
   * @param api an instance of `GitLabApi`
   * @param customConfig an instance of `BotActionConfig`
   * @returns data about the success or failure of the GitLab API request and resulting properties calculated by Diff Size analysis
   * */
  static async analyze(
    state: string,
    api: GitLabApi,
    customConfig: BotActionConfig,
  ): Promise<BotActionResponse> {
    let action: Action;
    let actionResponse: BotActionResponse;

    const response = await api.getSingleMRChanges();

    // if changes property doesn't exist, consider this to be a Network Failure
    if (
      response instanceof SuccessfulGetResponse &&
      response.result.hasOwnProperty("changes")
    ) {
      const totalDiffs = this.calculateDiffs(response.result.changes);
      const goodGitPractice = totalDiffs <= customConfig.threshold;

      action = this.buildSuccessfulAction(
        state,
        totalDiffs,
        goodGitPractice,
        customConfig.constructiveFeedbackOnlyToggle,
      );

      actionResponse = new BotActionResponse(
        this.botActionName,
        response.statusCode,
        action,
        {
          totalDiffs: totalDiffs,
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
   * Calculates the total lines of diff as the sum of additions and deletions across all of the Change objects.
   * @param changes array of GitLab Change objects
   * @returns total lines of diff across all of the `changes`
   */
  private static calculateDiffs(changes: Array<Change>): number {
    let totalDiffs = 0;

    if (changes.length !== 0) {
      const parsedDiffsArray: number[] = [];
      changes.map((change: Change) => {
        const parsedDiff = this.customParser(change.diff);
        parsedDiffsArray.push(parsedDiff);
      });

      totalDiffs = parsedDiffsArray.reduce(
        (accumulator, currentVal) => accumulator + currentVal,
      );
    }

    return totalDiffs;
  }

  private static customParser(diff: string): number {
    const diffNewlines: Array<string> = diff.split("\n");
    // only keep lines that start with exactly 1 '+' and/or '-'
    const diffFinder = new RegExp("^[-+]{1}", "m");
    const noContextLines: Array<string> = diffNewlines.filter((line) => {
      return line.match(diffFinder);
    });
    return noContextLines.length;
  }

  static caseForZeroMessage(
    state: string,
    totalDiffs: number,
    goodGitPractice: boolean,
    constructiveFeedbackOnlyToggle: boolean,
  ): boolean {
    return (
      state !== "merge" &&
      totalDiffs === 0 &&
      goodGitPractice === true &&
      !constructiveFeedbackOnlyToggle
    );
  }

  static caseForBadMessage(goodGitPractice: boolean): boolean {
    return !goodGitPractice;
  }

  static caseForGoodMessage(
    state: string,
    totalDiffs: number,
    goodGitPractice: boolean,
    constructiveFeedbackOnlyToggle: boolean,
  ): boolean {
    return (
      state !== "merge" &&
      totalDiffs !== 0 &&
      goodGitPractice === true &&
      !constructiveFeedbackOnlyToggle
    );
  }

  /**
   * Invoked when Bot Action analysis was successful.
   * Constructs a BotAction object containing goodGitPractice and conditional feedback message.
   * @param state the state of the Merge Request: `open`, `update`, or `merge`
   * @param totalDiffs total lines of diff in the Merge Request
   * @param goodGitPractice represents whether or not the Merge Request event meets the criteria for good Diff Size practice
   * @param constructiveFeedbackOnlyToggle if true, positive feedback will not be provided
   * @returns SuccessfulBotActionWithMessage instance containing feedback for user. If no feedback is warranted, an instance of SuccessfulBotActionWithNothingToSay is returned.
   * */
  static buildSuccessfulAction(
    state: string,
    totalDiffs: number,
    goodGitPractice: boolean,
    constructiveFeedbackOnlyToggle: boolean,
  ): SuccessfulBotAction {
    let action: SuccessfulBotAction;

    switch (true) {
      case this.caseForZeroMessage(
        state,
        totalDiffs,
        goodGitPractice,
        constructiveFeedbackOnlyToggle,
      ): {
        action = new SuccessfulBotActionWithMessage(
          goodGitPractice,
          this.zeroNote,
          this.hashtag,
        );
        break;
      }
      case this.caseForBadMessage(goodGitPractice): {
        action = new SuccessfulBotActionWithMessage(
          goodGitPractice,
          this.badNote,
          this.hashtag,
        );
        break;
      }
      case this.caseForGoodMessage(
        state,
        totalDiffs,
        goodGitPractice,
        constructiveFeedbackOnlyToggle,
      ): {
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
