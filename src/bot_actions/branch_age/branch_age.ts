import { BotActionInfo, CommonMessages } from "..";
import { BotActionConfig } from "../../custom_config/bot_action_config";
import { MergeRequestApi, SuccessfulGetResponse } from "../../gitlab";
import { GitLabCommit } from "../../interfaces/gitlab_api_types";
import {
  FailedBotAction,
  SuccessfulBotAction,
  SuccessfulBotActionWithNothingToSay,
} from "../bot_action";
import { LoggerFactory } from "../../util";

const logger = LoggerFactory.getInstance();
/**
 * This class extends the `BotActionNote` class by analyzing different state combinations unique to the Branch Age action.
 * Each instance of this class contains a message string that provides feedback to the end-user about the age of the commits contained in the GitLab Merge Request.
 */

export abstract class BranchAge {
  static botActionName = "BranchAge";
  static readonly good =
    `:star: It’s great that you’re committing and merging code frequently` +
    ` - the commits on this branch aren’t old or stale. Good job!`;
  static readonly bad =
    `:loudspeaker: This merge request has a pretty old commit. ` +
    `You should try and merge more frequently to keep your commits on branches fresh.`;
  static readonly hashtag = `[#BranchAgeAnalysis](https://github.com/Cigna/GitRDoneBot#2-branch-age)`;

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
  ): Promise<
    SuccessfulBotAction | FailedBotAction | SuccessfulBotActionWithNothingToSay
  > {
    let action:
      | FailedBotAction
      | SuccessfulBotAction
      | SuccessfulBotActionWithNothingToSay;

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
      action = this.buildAction(
        state,
        goodGitPractice,
        customConfig.constructiveFeedbackOnlyToggle,
        this.bad,
        this.good,
        this.hashtag,
        this.botActionName,
      );
      LoggerFactory.appendBotInfo(
        new BotActionInfo(this.botActionName, response.statusCode, action, {
          oldestCommit: oldestCommit,
        }),
      );
    } else {
      action = new FailedBotAction(CommonMessages.checkPermissionsMessage);
      LoggerFactory.appendBotInfo(
        new BotActionInfo(this.botActionName, response.statusCode, action),
      );
    }
    return action;
  }
  static buildAction(
    state: string,
    goodGitPractice: boolean,
    constructiveFeedbackOnlyToggle: boolean,
    badNote: string,
    goodNote: string,
    hashtag: string,
    botActionName: string,
  ):
    | SuccessfulBotAction
    | FailedBotAction
    | SuccessfulBotActionWithNothingToSay {
    let action;

    switch (true) {
      // No Actions check MUST come second
      case CommonMessages.caseForNoActions(
        state,
        goodGitPractice,
        constructiveFeedbackOnlyToggle,
      ): {
        action = new SuccessfulBotActionWithNothingToSay(
          "Don't say nice things. Silence is a virtue.",
        );
        break;
      }
      case CommonMessages.caseForBadMessage(goodGitPractice): {
        action = new SuccessfulBotAction(goodGitPractice, badNote, hashtag);
      }
      case CommonMessages.caseForGoodMessage(
        state,
        goodGitPractice,
        constructiveFeedbackOnlyToggle,
      ): {
        action = new SuccessfulBotAction(goodGitPractice, goodNote, hashtag);
        break;
      }
      default: {
        action = new FailedBotAction(CommonMessages.unknownState);
        logger.error(`${botActionName} unknown state encountered`);
      }
    }
    return action;
  }
}
