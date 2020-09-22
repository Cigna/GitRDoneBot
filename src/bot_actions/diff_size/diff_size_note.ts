import * as winston from "winston";
import { BotActionNote } from "../bot_action_note";
import { BotActionConfig } from "../../custom_config/bot_action_config";

/**
 * This class extends the `BotActionNote` class by analyzing different state combinations unique to the Diff Size action.
 * Each instance of this class contains a message string that provides feedback to the end-user about the number of lines of diff contained in the GitLab Merge Request.
 */
export class DiffSizeNote extends BotActionNote {
  static readonly zeroLine: string = `:star: Great idea creating a MR right away from a branch/issue!`;
  static readonly good = `:star: Great job keeping your merge requests manageable!`;
  static readonly bad =
    `:loudspeaker: This merge request is larger than one person can handle. ` +
    `Why not call in a partner and keep your branches smaller?`;
  static readonly hashtag = `#DiffAnalysis`;

  private constructor(message: string) {
    super(message);
  }

  static fromMessage(message: string): DiffSizeNote {
    return new DiffSizeNote(
      this.conditionallyAddHashtag(message, this.hashtag),
    );
  }

  static caseForNoActions(
    state: string,
    constructiveFeedbackOnlyToggle: boolean,
    goodGitPractice: boolean | undefined,
  ): boolean {
    return (
      (state === "merge" || constructiveFeedbackOnlyToggle) &&
      goodGitPractice === true
    );
  }

  static caseForZeroMessage(
    state: string,
    totalDiffs: number,
    constructiveFeedbackOnlyToggle: boolean,
    goodGitPractice: boolean | undefined,
  ): boolean {
    return (
      state !== "merge" &&
      totalDiffs === 0 &&
      !constructiveFeedbackOnlyToggle &&
      goodGitPractice === true
    );
  }

  static caseForBadMessage(goodGitPractice: boolean | undefined): boolean {
    return goodGitPractice === false;
  }

  static caseForGoodMessage(
    state: string,
    goodGitPractice: boolean | undefined,
    constructiveFeedbackOnlyToggle: boolean,
  ): boolean {
    return (
      state !== "merge" &&
      goodGitPractice === true &&
      !constructiveFeedbackOnlyToggle
    );
  }

  /**
   * Constructs a `DiffSizeNote` object by identifying one of six cases: standard case for permissions check,
   * case for zero message, case for bad message, case for good message, case for no actions, or case for unknown state.
   *
   * @returns `message` of the `DiffSizeNote` object
   * */
  static buildMessage(
    customConfig: BotActionConfig,
    gitLabRequestSuccess: boolean | undefined,
    state: string,
    goodGitPractice: boolean | undefined,
    totalDiffs: number,
    logger: winston.Logger,
  ): string {
    let note: DiffSizeNote;

    switch (true) {
      case this.standardCaseForCheckPermissionsMessage(gitLabRequestSuccess): {
        note = this.fromMessage(this.checkPermissionsMessage);
        break;
      }
      case this.caseForZeroMessage(
        state,
        totalDiffs,
        customConfig.constructiveFeedbackOnlyToggle,
        goodGitPractice,
      ): {
        note = this.fromMessage(this.zeroLine);
        break;
      }
      case this.caseForBadMessage(goodGitPractice): {
        note = this.fromMessage(this.bad);
        break;
      }
      case this.caseForGoodMessage(
        state,
        goodGitPractice,
        customConfig.constructiveFeedbackOnlyToggle,
      ): {
        note = this.fromMessage(this.good);
        break;
      }
      case this.caseForNoActions(
        state,
        customConfig.constructiveFeedbackOnlyToggle,
        goodGitPractice,
      ): {
        note = this.fromMessage(this.noActionMessage);
        break;
      }
      default: {
        note = this.fromMessage(this.unknownState);
        logger.error(`${note.message} DiffAnalysis`);
      }
    }

    return note.message;
  }
}
