import { BotAction } from "../bot_action";

import * as winston from "winston";
import {
  FailedResponse,
  MergeRequestApi,
  NoResponseNeeded,
  SuccessfulGetResponse,
} from "../../gitlab";
import { SelfMergeNote } from "./self_merge_note";
import { User } from "../../interfaces/gitlab_api_types";

/**
 * This class extends the `BotAction` class by analyzing the assignee or the approvers and the user who merged the GitLab Merge Request.
 * In addition to the standard `BotAction` properties, each instance
 * of this class also contains the property:
 * 1. `approversNeeded`: `boolean` If true, Merge Request is merged with approvers. If false, Merge Request is merged without approvers.
 * If undefined, Merge Request is not merged.
 */
export class SelfMerge implements BotAction {
  private constructor(
    readonly apiResponse:
      | SuccessfulGetResponse
      | FailedResponse
      | NoResponseNeeded,
    readonly goodGitPractice: boolean,
    readonly mrNote: string,
    readonly approversNeeded: boolean | undefined,
  ) {}

  /**
   * Constructs a complete Self Merge object by analyzing the assignee id and author id or by analyzing the response(s) of HTTP call(s).
   *
   * @param state the state of the incoming Merge Request event from GitLab
   * @param api an instance of the MergeRequestApi class that wraps HTTP requests to and responses from the GitLab API
   * @param logger an instance of winston logger
   * @param assigneeId GitLab user id of the Merge Request assignee
   * @param authorId GitLab user id of the Merge Request author
   *
   * @returns SelfMerge object constructed after checking the assignee or the approvers and the user who merged the Merge Request,
   * determining goodGitPractice based on that check, and instantiating a new note object.
   * */
  static async from(
    state: string,
    api: MergeRequestApi,
    logger: winston.Logger,
    assigneeId: number,
    authorId: number,
  ): Promise<SelfMerge> {
    let goodGitPractice!: boolean;
    let approversNeeded!: boolean;
    let response!: SuccessfulGetResponse | FailedResponse | NoResponseNeeded;

    if (state !== "merge") {
      response = new NoResponseNeeded();
      goodGitPractice = this.mrIsNotSelfAssignedOrMerged(assigneeId, authorId);
    } else {
      // Make API call for merge state only
      const whoApproved:
        | SuccessfulGetResponse
        | FailedResponse = await api.getMRApprovalConfig();

      if (whoApproved instanceof SuccessfulGetResponse) {
        if (
          whoApproved.result.hasOwnProperty("approved_by") &&
          whoApproved.result.approved_by.length
        ) {
          approversNeeded = false;
          response = whoApproved;
          goodGitPractice = this.mrIsNotSelfApproved(
            whoApproved.result.approved_by,
            authorId,
          );
        } else {
          // if approval array is empty, second api call required to see who merged the MR
          approversNeeded = true;
          const whoMerged:
            | SuccessfulGetResponse
            | FailedResponse = await api.getSingleMR();
          response = whoMerged;
          if (
            whoMerged instanceof SuccessfulGetResponse &&
            whoMerged.result.hasOwnProperty("merged_by")
          ) {
            goodGitPractice = this.mrIsNotSelfAssignedOrMerged(
              whoMerged.result.merged_by.id,
              authorId,
            );
          }
        }
      } else {
        response = whoApproved;
      }
    }

    // success var
    return new SelfMerge(
      response,
      goodGitPractice,
      SelfMergeNote.buildMessage(
        response instanceof SuccessfulGetResponse ||
          response instanceof NoResponseNeeded,
        state,
        goodGitPractice,
        approversNeeded,
        logger,
      ),
      approversNeeded,
    );
  }

  private static mrIsNotSelfAssignedOrMerged(
    assigneeOrMergerId: number,
    authorId: number,
  ): boolean {
    let mrIsNotSelfAssignedOrMerged: boolean;

    if (assigneeOrMergerId === authorId) {
      mrIsNotSelfAssignedOrMerged = false;
    } else {
      mrIsNotSelfAssignedOrMerged = true;
    }

    return mrIsNotSelfAssignedOrMerged;
  }

  /**
   * @param approvedByArray array of GitLab users who approved the GitLab Merge Request
   * @param authorId the GitLab id of the user who authored the Merge Request
   * @returns true if the author of the GitLab Merge Request is not the only user in the `approvedByArray`
   * */
  private static mrIsNotSelfApproved(
    approvedByArray: Array<{ user: User }>,
    authorId: number,
  ): boolean {
    let mrIsNotSelfApproved: boolean;

    if (approvedByArray.length === 1) {
      mrIsNotSelfApproved =
        approvedByArray[0].user.id === authorId ? false : true;
    } else {
      mrIsNotSelfApproved = true;
    }

    return mrIsNotSelfApproved;
  }
}
