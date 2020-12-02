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
 * This class analyzes the number of merge requests assigned to the assignee of the GitLab Merge Request.
 * This class implements the `BotAction` interface.
 * */
export abstract class TooManyAssigned {
  static readonly botActionName = "TooManyAssigned";
  static readonly badNote = `:loudspeaker: You've assigned this merge request to someone who already has a lot on their plate.
	Reassigning the merge request to someone else will help it get approved more quickly`;
  static readonly hashtag = `[#TooManyAssignedAnalysis](https://github.com/Cigna/GitRDoneBot#4-too-many-assigned)`;

  /**
   * Constructs a complete Bot Action object by making an HTTP call and analyzing response when the state is "merge" and the assigneeId is not null.
   *
   * @param state the state of the incoming Merge Request event from GitLab
   * @param api an instance of the MergeRequestApi class that wraps HTTP requests to and responses from the GitLab API
   * @param customConfig an instance of the BotActionConfig class that defines too many assigned threshold
   * @param assigneeId GitLab user id of merge request assignee
   *
   * @returns BotAction object constructed after getting number of merge requests already assigned to assignee, determining goodGitPractice based on that value, and instantiating a new note object.
   *
   * @remarks If api call fails, returns BotAction where `goodGitPractice` will be undefined.
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
        {
          assigneeId: assigneeId,
        },
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
