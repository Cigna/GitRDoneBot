import { BotAction } from "../bot_action";
import {
  GitLabAPIRequest,
  GitLabGetResponse,
  MergeRequestApi,
} from "../../gitlab";
import * as winston from "winston";
import { BotActionConfig } from "../../custom_config/bot_action_config";
import { DiffSizeNote } from "./diff_size_note";
import { Change } from "../../interfaces";
// import * as parse from "parse-diff";

/**
 * This class extends the `BotAction` class by analyzing how many lines of diff are contained in the GitLab Merge Request.
 * In addition to the standard `BotAction` properties, each instance
 * of this class also contains the property:
 * 1. `totalDiffs`: `number` lines of diff contained in the Merge Request
 */
export class DiffSize extends BotAction {
  private constructor(
    apiRequest: GitLabAPIRequest,
    goodGitPractice: boolean,
    mrNote: string,
    readonly totalDiffs: number,
  ) {
    super(apiRequest, goodGitPractice, mrNote);
  }

  /**
   * Constructs a complete DiffSize object by making an HTTP call and analyzing response.
   *
   * @param state the state of the incoming Merge Request event from GitLab
   * @param api an instance of the MergeRequestApi class that wraps HTTP requests to and responses from the GitLab API
   * @param customConfig an instance of the BotActionConfig class that defines diff size threshold
   * @param logger an instance of winston logger
   *
   * @returns DiffSize object constructed after calculating lines of diff, determining goodGitPractice based on that value, and instantiating a new note object.
   *
   * @remarks If api call fails, returns DiffSize where `goodGitPractice` and `thresholdTestedNudges` will be undefined.
   * */
  static async from(
    state: string,
    api: MergeRequestApi,
    customConfig: BotActionConfig,
    logger: winston.Logger,
  ): Promise<DiffSize> {
    let totalDiffs: number;
    let goodGitPractice!: boolean;

    const apiResponse: GitLabGetResponse = await api.getSingleMRChanges();

    // the changes property should contain an array of diffs that can be parsed to calculate
    // the total lines of diff contained in a Merge Request
    // if this property is missing, assign a value of -1 to totalDiffs to indicate that
    if (
      apiResponse.apiRequest.success &&
      apiResponse.result.hasOwnProperty("changes")
    ) {
      totalDiffs = this.calculateDiffs(apiResponse.result.changes);
      goodGitPractice = totalDiffs < customConfig.threshold;
    } else {
      totalDiffs = -1;
    }

    return new DiffSize(
      apiResponse.apiRequest,
      goodGitPractice,
      DiffSizeNote.buildMessage(
        customConfig,
        apiResponse.apiRequest.success,
        state,
        goodGitPractice,
        totalDiffs,
        logger,
      ),
      totalDiffs,
    );
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
}
