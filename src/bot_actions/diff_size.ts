import {
  AuthorizationFailureBotAction,
  BotActionResponse,
  NetworkFailureBotAction,
  SuccessfulBotAction,
  SuccessfulBotActionWithNothingToSay,
} from "./bot_action";
import { BotActionConfig } from "../custom_config/bot_action_config";
import {
  AuthorizationFailureResponse,
  MergeRequestApi,
  SuccessfulGetResponse,
} from "../gitlab";
import { Change } from "../interfaces";

/**
 * This class analyzes how many lines of diff are contained in the GitLab Merge Request.
 * This class implements the `BotAction` interface and also contains the property:
 * 1. `totalDiffs`: `number` lines of diff contained in the Merge Request
 * */
export abstract class DiffSize {
  static readonly botActionName = "DiffSize";
  static readonly zeroNote = `:star: Great idea creating a MR right away from a branch/issue!`;
  static readonly goodNote = `:star: Great job keeping your merge requests manageable!`;
  static readonly badNote =
    `:loudspeaker: This merge request is larger than one person can handle. ` +
    `Why not call in a partner and keep your branches smaller?`;
  static readonly hashtag = `[#DiffAnalysis](https://github.com/Cigna/GitRDoneBot#1-diff-size)`;

  /**
   * Constructs a complete DiffSize object by making an HTTP call and analyzing response.
   *
   * @param state the state of the incoming Merge Request event from GitLab
   * @param api an instance of the MergeRequestApi class that wraps HTTP requests to and responses from the GitLab API
   * @param customConfig an instance of the BotActionConfig class that defines diff size threshold
   *
   * @returns DiffSize object constructed after calculating lines of diff, determining goodGitPractice based on that value, and instantiating a new note object.
   *
   * @remarks If api call fails, returns DiffSize where `goodGitPractice` and `thresholdTestedNudges` will be undefined.
   * */
  static async analyze(
    state: string,
    api: MergeRequestApi,
    customConfig: BotActionConfig,
  ): Promise<BotActionResponse> {
    let action:
      | AuthorizationFailureBotAction
      | NetworkFailureBotAction
      | SuccessfulBotAction
      | SuccessfulBotActionWithNothingToSay;
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
   * */
  private static calculateDiffs(changes: Array<Change>): number {
    let totalDiffs = 0;

    if (changes.length !== 0) {
      const parsedDiffsArray: number[] = [];
      changes.map((change: Change) => {
        if (change.hasOwnProperty("diff")) {
          const parsedDiff = this.customParser(change.diff);
          parsedDiffsArray.push(parsedDiff);
        }
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

  static buildSuccessfulAction(
    state: string,
    totalDiffs: number,
    goodGitPractice: boolean,
    constructiveFeedbackOnlyToggle: boolean,
  ): SuccessfulBotAction | SuccessfulBotActionWithNothingToSay {
    let action: SuccessfulBotAction | SuccessfulBotActionWithNothingToSay;

    switch (true) {
      case this.caseForZeroMessage(
        state,
        totalDiffs,
        goodGitPractice,
        constructiveFeedbackOnlyToggle,
      ): {
        action = new SuccessfulBotAction(
          goodGitPractice,
          this.zeroNote,
          this.hashtag,
        );
        break;
      }
      case this.caseForBadMessage(goodGitPractice): {
        action = new SuccessfulBotAction(
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
