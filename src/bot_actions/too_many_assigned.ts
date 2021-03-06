import {
  AuthorizationFailureResponse,
  GitLabApi,
  NoRequestNeeded,
  SuccessfulGetResponse,
} from "../gitlab";
import { BotActionConfig } from "../custom_config/bot_action_config";
import {
  Action,
  AuthorizationFailureBotAction,
  BotActionResponse,
  NetworkFailureBotAction,
  SuccessfulBotActionWithMessage,
  SuccessfulBotActionWithNothingToSay,
} from "./bot_action";
import { SuccessfulBotAction } from ".";

/**
 * This Bot Action class analyzes the number of Merge Requests assigned to the assignee of the GitLab Merge Request
 * and determines what, if any, feedback to provide to user.
 * */
export abstract class TooManyAssigned {
  static readonly botActionName = "TooManyAssigned";
  static readonly badNote = `:loudspeaker: You've assigned this merge request to someone who already has a lot on their plate.
	Reassigning the merge request to someone else will help it get approved more quickly`;
  static readonly hashtag = `[#TooManyAssignedAnalysis](https://github.com/Cigna/GitRDoneBot#4-too-many-assigned)`;

  /**
   * @param state the state of the Merge Request: `open`, `update`, or `merge`
   * @param api an instance of `GitLabApi`
   * @param customConfig an instance of `BotActionConfig`
   * @param assigneeId GitLab user id of Merge Request assignee
   * @returns data about the success or failure of the GitLab API request and resulting properties calculated by Too Many Assigned analysis
   * */
  static async analyze(
    state: string,
    api: GitLabApi,
    customConfig: BotActionConfig,
    assigneeId: number | null,
  ): Promise<BotActionResponse> {
    let action: Action;
    let actionResponse: BotActionResponse;

    // Make API call for open & update states only
    if (state !== "merge" && assigneeId !== null) {
      const response = await api.getMergeRequestsByAssigneeId(
        assigneeId,
        customConfig.threshold,
      );

      if (response instanceof SuccessfulGetResponse) {
        const goodGitPractice =
          response.result.length <= customConfig.threshold;

        action = this.buildSuccessfulAction(state, goodGitPractice, assigneeId);

        actionResponse = new BotActionResponse(
          this.botActionName,
          response.statusCode,
          action,
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
    } else {
      const goodGitPractice = true;

      action = this.buildSuccessfulAction(state, goodGitPractice, assigneeId);

      actionResponse = new BotActionResponse(
        this.botActionName,
        new NoRequestNeeded().statusCode,
        action,
      );
    }

    return actionResponse;
  }

  static caseForBadMessage(
    state: string,
    goodGitPractice: boolean,
    assigneeId: number | null,
  ): boolean {
    return (
      state !== "merge" && goodGitPractice === false && assigneeId !== null
    );
  }

  /**
   * Invoked when Bot Action analysis was successful.
   * Constructs a BotAction object containing goodGitPractice and conditional feedback message.
   * @param state the state of the Merge Request: `open`, `update`, or `merge`
   * @param goodGitPractice represents whether or not the Merge Request event meets the criteria for good Too Many Assigned practice
   * @param assigneeId the user ID of the person who is assigned to review this Merge Request
   * @returns SuccessfulBotActionWithMessage instance containing feedback for user. If no feedback is warranted, an instance of SuccessfulBotActionWithNothingToSay is returned.
   * */
  static buildSuccessfulAction(
    state: string,
    goodGitPractice: boolean,
    assigneeId: number | null,
  ): SuccessfulBotAction {
    let action: SuccessfulBotAction;

    switch (true) {
      case this.caseForBadMessage(state, goodGitPractice, assigneeId): {
        action = new SuccessfulBotActionWithMessage(
          goodGitPractice,
          this.badNote,
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
