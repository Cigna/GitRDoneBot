import { BotActionConfig } from "../custom_config/bot_action_config";
import {
  AuthorizationFailureResponse,
  MergeRequestApi,
  SuccessfulGetResponse,
} from "../gitlab";
import { GitLabCommit } from "../interfaces/gitlab_api_types";
import {
  AuthorizationFailureBotAction,
  BotActionResponse,
  NetworkFailureBotAction,
  SuccessfulBotAction,
  SuccessfulBotActionWithNothingToSay,
} from "./bot_action";

/**
 * This Bot Action class analyzes the age of the Commits contained in the GitLab Merge Request
 * and determines what, if any, feedback to provide to user.
 */
export abstract class BranchAge {
  static readonly botActionName = "BranchAge";
  static readonly goodNote =
    `:star: It’s great that you’re committing and merging code frequently` +
    ` - the commits on this branch aren’t old or stale. Good job!`;
  static readonly badNote =
    `:loudspeaker: This merge request has a pretty old commit. ` +
    `You should try and merge more frequently to keep your commits on branches fresh.`;
  static readonly hashtag = `[#BranchAgeAnalysis](https://github.com/Cigna/GitRDoneBot#2-branch-age)`;

  /**
   * @param commits Array of all Commits associated with the Merge Request
   * @returns the oldest Commit in the array
   */
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

  /**
   * @param oldestCommit a single Commit object
   * @param threshold the number of days to compare the age of the Commit to
   * @returns `true` if age of oldestCommit is less than threshold
   */
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

  /**
   * @param state the state of the Merge Request: `open`, `update`, or `merge`
   * @param api an instance of `MergeRequestApi`
   * @param customConfig an instance of `BotActionConfig`
   * @returns data about the success or failure of the GitLab API request and resulting properties calculated by Branch Age analysis
   */
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

      action = this.buildSuccessfulAction(
        state,
        goodGitPractice,
        customConfig.constructiveFeedbackOnlyToggle,
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

  /**
   * Invoked when Bot Action analysis was successful.
   * Constructs a BotAction object containing goodGitPractice and conditional feedback message.
   * @param state the state of the Merge Request: `open`, `update`, or `merge`
   * @param goodGitPractice represents whether or not the Merge Request event meets the criteria for good Branch Age practice
   * @param constructiveFeedbackOnlyToggle if true, positive feedback will not be provided
   * @returns SuccessfulBotAction instance containing feedback for user. If no feedback is warranted, an instance of SuccessfulBotActionWithNothingToSay is returned.
   */
  static buildSuccessfulAction(
    state: string,
    goodGitPractice: boolean,
    constructiveFeedbackOnlyToggle: boolean,
  ): SuccessfulBotAction | SuccessfulBotActionWithNothingToSay {
    let action: SuccessfulBotAction | SuccessfulBotActionWithNothingToSay;

    switch (true) {
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
