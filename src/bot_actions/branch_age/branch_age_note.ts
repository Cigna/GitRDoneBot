import * as winston from "winston";
import { BotActionNote } from "../bot_action_note";
import { BotActionConfig } from "../../custom_config/bot_action_config";
import { FailedResponse, SuccessfulGetResponse } from "../../gitlab";
import { FailedBotAction, NoAction, SuccessfulBotAction } from "../bot_action";

/**
 * This class extends the `BotActionNote` class by analyzing different state combinations unique to the Branch Age action.
 * Each instance of this class contains a message string that provides feedback to the end-user about the age of the commits contained in the GitLab Merge Request.
 */
export abstract class BranchAgeNote {
  static readonly good =
    `:star: It’s great that you’re committing and merging code frequently` +
    ` - the commits on this branch aren’t old or stale. Good job!`;
  static readonly bad =
    `:loudspeaker: This merge request has a pretty old commit. ` +
    `You should try and merge more frequently to keep your commits on branches fresh.`;
  static readonly hashtag = `[#BranchAgeAnalysis](https://github.com/Cigna/GitRDoneBot#2-branch-age)`;

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

  static caseForBadMessage(goodGitPractice: boolean | undefined): boolean {
    return goodGitPractice === false;
  }

  static caseForGoodMessage(
    state: string,
    constructiveFeedbackOnlyToggle: boolean,
    goodGitPractice: boolean | undefined,
  ): boolean {
    return (
      state !== "merge" &&
      goodGitPractice === true &&
      !constructiveFeedbackOnlyToggle
    );
  }
  /**
   * Constructs a `BranchAgeNote` object by identifying one of five cases: standard case for permissions check,
   * case for bad message, case for good message, case for no actions, or case for unknown state.
   *
   * @returns `message` of the `BranchAgeNote` object
   * */
  static buildAction(
    customConfig: BotActionConfig,
    apiResponse: SuccessfulGetResponse | FailedResponse,
    goodGitPractice: boolean | undefined,
    state: string,
    logger: winston.Logger,
  ): SuccessfulBotAction | FailedBotAction | NoAction {
    let action: SuccessfulBotAction | FailedBotAction | NoAction;

    switch (true) {
      case BotActionNote.standardCaseForCheckPermissionsMessage(apiResponse): {
        action = new FailedBotAction(BotActionNote.checkPermissionsMessage);
        break;
      }
      case this.caseForBadMessage(goodGitPractice): {
        action = new SuccessfulBotAction(false, this.bad, this.hashtag);
        break;
      }
      case this.caseForGoodMessage(
        state,
        customConfig.constructiveFeedbackOnlyToggle,
        goodGitPractice,
      ): {
        action = new SuccessfulBotAction(true, this.good, this.hashtag);
        break;
      }
      case this.caseForNoActions(
        state,
        customConfig.constructiveFeedbackOnlyToggle,
        goodGitPractice,
      ): {
        action = new NoAction();
        break;
      }
      default: {
        action = new FailedBotAction(BotActionNote.unknownState);
        logger.error(`BranchAge unknown state encountered`);
      }
    }
    return action;
  }
}
