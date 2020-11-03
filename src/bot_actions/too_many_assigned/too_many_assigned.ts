import {
  FailedResponse,
  MergeRequestApi,
  NoGetResponseNeeded,
  SuccessfulGetResponse,
} from "../../gitlab";
import { BotActionConfig } from "../../custom_config/bot_action_config";
import * as winston from "winston";
import { BotAction } from "../bot_action";
import { TooManyAssignedNote } from "./too_many_assigned_note";

/**
 * This class extends the `BotAction` class by analyzing the number of merge requests assigned to the assignee of the GitLab Merge Request.
 */
export class TooManyAssigned implements BotAction {
  private constructor(
    readonly apiResponse:
      | SuccessfulGetResponse
      | FailedResponse
      | NoGetResponseNeeded,
    readonly goodGitPractice: boolean,
    readonly mrNote: string,
  ) {}

  /**
   * Constructs a complete Bot Action object by making an HTTP call and analyzing response when the state is "merge" and the assigneeId is not null.
   *
   * @param state the state of the incoming Merge Request event from GitLab
   * @param api an instance of the MergeRequestApi class that wraps HTTP requests to and responses from the GitLab API
   * @param customConfig an instance of the BotActionConfig class that defines too many assigned threshold
   * @param logger an instance of winston logger
   * @param assigneeId GitLab user id of merge request assignee
   *
   * @returns BotAction object constructed after getting number of merge requests already assigned to assignee, determining goodGitPractice based on that value, and instantiating a new note object.
   *
   * @remarks If api call fails, returns BotAction where `goodGitPractice` and `apiResponse` will be undefined.
   * */
  static async from(
    state: string,
    api: MergeRequestApi,
    customConfig: BotActionConfig,
    logger: winston.Logger,
    assigneeId: number,
  ): Promise<BotAction> {
    let response!: SuccessfulGetResponse | FailedResponse | NoGetResponseNeeded;
    let goodGitPractice!: boolean;

    if (state !== "merge" && assigneeId !== null) {
      response = await api.getMergeRequestsByAssigneeId(
        assigneeId,
        customConfig.threshold,
      );

      if (response instanceof SuccessfulGetResponse) {
        goodGitPractice = response.result.length <= customConfig.threshold;
      }
    } else {
      response = new NoGetResponseNeeded();
    }

    return new TooManyAssigned(
      response,
      goodGitPractice,
      TooManyAssignedNote.buildMessage(
        response instanceof (SuccessfulGetResponse || NoGetResponseNeeded),
        state,
        goodGitPractice,
        assigneeId,
        logger,
      ),
    );
  }
}
