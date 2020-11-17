import * as winston from "winston";
import { BotActionInfo, CommonMessages, BotActionResponse } from "..";
import { BotActionConfig } from "../../custom_config/bot_action_config";
import { MergeRequestApi, SuccessfulGetResponse } from "../../gitlab";
import { GitLabCommit } from "../../interfaces/gitlab_api_types";
import {
  FailedBotAction,
  SuccessfulBotAction,
  SuccessfulBotActionWithNothingToSay,
} from "../bot_action";
import { BranchAgeMessage } from "./branch_age_note";

/**
 * This class extends the `BotActionNote` class by analyzing different state combinations unique to the Branch Age action.
 * Each instance of this class contains a message string that provides feedback to the end-user about the age of the commits contained in the GitLab Merge Request.
 */

export abstract class BranchAge {
  static botActionName = "BranchAge";

  static getOldestCommit(commits: Array<GitLabCommit>): GitLabCommit {
    const oldestCommit: GitLabCommit = commits.reduce(
      (prevCommit, currCommit) => {
        return new Date(prevCommit.created_at).getTime() <
          new Date(currCommit.created_at).getTime()
          ? prevCommit
          : currCommit;
      },
    );
    return oldestCommit;
  }

  static isBranchYoungerThanThreshold(
    oldestCommit: GitLabCommit,
    threshold: number,
  ): boolean {
    // this gives us the number of milliseconds between the oldest commit and current time
    const oldestCommitAge =
      Date.now() - new Date(oldestCommit.created_at).getTime();
    // divide oldestCommitAge by milliseconds/day to compare int num of days with threshold
    return Math.floor(oldestCommitAge / 8.64e7) <= threshold;
  }

  static async analyze(
    state: string,
    api: MergeRequestApi,
    customConfig: BotActionConfig,
    logger: winston.Logger,
  ): Promise<BotActionResponse> {
    let action:
      | FailedBotAction
      | SuccessfulBotAction
      | SuccessfulBotActionWithNothingToSay;
    let info: BotActionInfo;
    const response = await api.getSingleMRCommits();

    if (response instanceof SuccessfulGetResponse) {
      let goodGitPractice!: boolean;
      let oldestCommit!: GitLabCommit;

      if (response.result.length === 0) {
        // When result array is empty, we are assuming there are no commits on this branch (ie, opened from an Issue).
        goodGitPractice = true;
      } else {
        oldestCommit = this.getOldestCommit(response.result);
        goodGitPractice = this.isBranchYoungerThanThreshold(
          oldestCommit,
          customConfig.threshold,
        );
      }
      action = this.buildAction(customConfig, goodGitPractice, state, logger);
      info = new BotActionInfo(this.botActionName, response, {
        oldestCommit: oldestCommit,
      });
    } else {
      action = new FailedBotAction(CommonMessages.checkPermissionsMessage);
      info = new BotActionInfo(this.botActionName, response);
    }

    return { action, info };
  }

  /**
   * Constructs a `BranchAgeNote` object by identifying one of five cases: standard case for permissions check,
   * case for bad message, case for good message, case for no actions, or case for unknown state.
   *
   * @returns `message` of the `BranchAgeNote` object
   * */
  static buildAction(
    customConfig: BotActionConfig,
    goodGitPractice: boolean,
    state: string,
    logger: winston.Logger,
  ):
    | SuccessfulBotAction
    | FailedBotAction
    | SuccessfulBotActionWithNothingToSay {
    let action;

    switch (true) {
      case BranchAgeMessage.caseForBadMessage(goodGitPractice): {
        action = new SuccessfulBotAction(
          false,
          BranchAgeMessage.bad,
          BranchAgeMessage.hashtag,
        );
        break;
      }
      case BranchAgeMessage.caseForGoodMessage(
        state,
        customConfig.constructiveFeedbackOnlyToggle,
        goodGitPractice,
      ): {
        action = new SuccessfulBotAction(
          true,
          BranchAgeMessage.good,
          BranchAgeMessage.hashtag,
        );
        break;
      }
      case BranchAgeMessage.caseForNoActions(
        state,
        customConfig.constructiveFeedbackOnlyToggle,
        goodGitPractice,
      ): {
        action = new SuccessfulBotActionWithNothingToSay();
        break;
      }
      default: {
        action = new FailedBotAction(CommonMessages.unknownState);
        logger.error(`BranchAge unknown state encountered`);
      }
    }
    return action;
  }
}
