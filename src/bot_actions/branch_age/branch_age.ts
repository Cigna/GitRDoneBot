import { BotActionResponse } from "..";
import { BotActionConfig } from "../../custom_config/bot_action_config";
import {
  AuthorizationFailureResponse,
  MergeRequestApi,
  SuccessfulGetResponse,
} from "../../gitlab";
import { GitLabCommit } from "../../interfaces/gitlab_api_types";
import {
  AuthorizationFailureBotAction,
  NetworkFailureBotAction,
  SuccessfulBotAction,
  SuccessfulBotActionWithNothingToSay,
} from "../bot_action";

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
  ): Promise<BotActionResponse> {
    let action:
      | AuthorizationFailureBotAction
      | NetworkFailureBotAction
      | SuccessfulBotAction
      | SuccessfulBotActionWithNothingToSay
      | UnknownStateBotAction;
    let actionResponse: BotActionResponse;

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
      );

      actionResponse = new BotActionResponse(
        this.botActionName,
        response.statusCode,
        action,
        {
          oldestCommit: oldestCommit,
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

  static caseForGoodMessage(
    state: string,
    goodGitPractice: boolean,
    constructiveFeedbackOnlyToggle: boolean,
  ): boolean {
    return (
      state !== "merge" &&
      goodGitPractice === true &&
      !constructiveFeedbackOnlyToggle
    );
  }

  static caseForBadMessage(goodGitPractice: boolean): boolean {
    return goodGitPractice === false;
  }

  static caseForNoActions(
    state: string,
    goodGitPractice: boolean,
    constructiveFeedbackOnlyToggle: boolean,
  ): boolean {
    return (
      (state === "merge" || constructiveFeedbackOnlyToggle) &&
      goodGitPractice === true
    );
  }

  static buildAction(
    state: string,
    goodGitPractice: boolean,
    constructiveFeedbackOnlyToggle: boolean,
    badNote: string,
    goodNote: string,
    hashtag: string,
  ): SuccessfulBotAction | SuccessfulBotActionWithNothingToSay {
    let action;

    switch (true) {
      case this.caseForBadMessage(goodGitPractice): {
        action = new SuccessfulBotAction(goodGitPractice, badNote, hashtag);
        break;
      }
      case this.caseForGoodMessage(
        state,
        goodGitPractice,
        constructiveFeedbackOnlyToggle,
      ): {
        action = new SuccessfulBotAction(goodGitPractice, goodNote, hashtag);
        break;
      }
      default: {
        action = new SuccessfulBotActionWithNothingToSay(
          state,
          goodGitPractice,
          constructiveFeedbackOnlyToggle,
        );
      }
    }
    return action;
  }
}
