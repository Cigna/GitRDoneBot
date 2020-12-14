import {
  MergeRequestApi,
  NoRequestNeeded,
  SuccessfulGetResponse,
  AuthorizationFailureResponse,
} from "../gitlab";
import { BotActionConfig } from "../custom_config/bot_action_config";
import {
  AuthorizationFailureBotAction,
  BotActionResponse,
  NetworkFailureBotAction,
  SuccessfulBotAction,
  SuccessfulBotActionWithNothingToSay,
} from "./bot_action";

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
   * @param api an instance of `MergeRequestApi`
   * @param customConfig an instance of `BotActionConfig`
   * @param assigneeId GitLab user id of Merge Request assignee
   * @returns data about the success or failure of the GitLab API request and resulting properties calculated by Too Many Assigned analysis
   * */
  static async analyze(
    state: string,
    api: MergeRequestApi,
    customConfig: BotActionConfig,
    assigneeId: number | null,
  ): Promise<BotActionResponse> {
    let action:
      | AuthorizationFailureBotAction
      | NetworkFailureBotAction
      | SuccessfulBotAction
      | SuccessfulBotActionWithNothingToSay;
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
   * Constructs a `TooManyAssignedNote` object by identifying one of four cases: custom case for permissions check,
   * case for bad message, case for no actions, or case for unknown state.
   *
   * @returns `message` of the `TooManyAssignedNote` object
   * */
  static buildSuccessfulAction(
    state: string,
    goodGitPractice: boolean,
    assigneeId: number | null,
  ): SuccessfulBotAction | SuccessfulBotActionWithNothingToSay {
    let action: SuccessfulBotAction | SuccessfulBotActionWithNothingToSay;

    switch (true) {
      case this.caseForBadMessage(state, goodGitPractice, assigneeId): {
        action = new SuccessfulBotAction(
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
