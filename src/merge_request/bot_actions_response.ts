import * as HttpStatus from "http-status-codes";
import * as winston from "winston";
import {
  BranchAge,
  CommitMessages,
  DiffSize,
  GitOuttaHere,
  NewGitWhoDis,
  SelfMerge,
  TooManyAssigned,
} from "../bot_actions";
import { MergeRequestApi } from "../gitlab";
import { LambdaResponse, MergeRequestEvent } from "../interfaces";
import {
  BotComment,
  BotEmoji,
  getMergeRequestEventData,
} from "../merge_request";
import { CustomConfig } from "../custom_config/custom_config";

/**
 * This class contains the aggregation logic for invoking Bot Actions and using their responses to post a comment and emoji on the Merge Request.
 * Each instance of this class contains information on the incoming Merge Request event, Custom configuration information (if it exists), response info returned from individual Bot Actions, and what (if any) comment and emoji were posted.
 * @remarks
 * GitLab will retry requests if a response is not received back within 10 seconds, so instances of this class are passed back by the lambda function to satisfy that requirement.
 * However, GitLab does nothing with this data - the core purpose of instances of this class is to log information for analysis & debugging.
 */
export class BotActionsResponse implements LambdaResponse {
  private constructor(readonly statusCode: number, readonly body: string) {}

  /**
   * Uses information from Merge Request webhook event to invoke Bot Actions. Uses Bot Action response data to post user-facing comment and emoji on GitLab Merge Request.
   * @param api an instance of the MergeRequestApi class that wraps HTTP requests to and responses from the GitLab API
   * @param customConfig defines threshold values for each of the Bot Actions
   * @param gitLabEvent GitLab webhook body
   * @param state the state of the incoming Merge Request event from GitLab
   * @param logger an instance of winston logger
   * @returns `BotActionsResponse` object
   * */
  static async from(
    api: MergeRequestApi,
    customConfig: CustomConfig,
    gitLabEvent: any,
    state: string,
    logger: winston.Logger,
  ): Promise<BotActionsResponse> {
    const mergeRequestEvent: MergeRequestEvent = getMergeRequestEventData(
      gitLabEvent,
    );

    // variables declared here so they will be in scope for response constructor
    // only status is guaranteed to be set regardless of error
    let statusCode: number,
      branchAge!: BranchAge,
      commitMessage!: CommitMessages,
      diffSize!: DiffSize,
      gitOuttaHere!: GitOuttaHere,
      newGitWhoDis!: NewGitWhoDis,
      selfMerge!: SelfMerge,
      tooManyAssigned!: TooManyAssigned,
      comment!: BotComment,
      emoji!: BotEmoji;

    try {
      const branchAgePromise: Promise<BranchAge> = BranchAge.from(
        state,
        api,
        customConfig.branchAge,
        logger,
      );

      // NOTE: this hardcoded commitMessageConstructiveFeedbackOnlyToggle is a placeholder until
      // correct customConfig functionality can be implemented
      const commitMessageConstructiveFeedbackOnlyToggle = false;
      const commitMessagePromise: Promise<CommitMessages> = CommitMessages.from(
        state,
        api,
        commitMessageConstructiveFeedbackOnlyToggle,
        logger,
      );

      const diffPromise: Promise<DiffSize> = DiffSize.from(
        state,
        api,
        customConfig.diffSize,
        logger,
      );

      const gitOuttaHerePromise: Promise<GitOuttaHere> = GitOuttaHere.from(
        api,
        logger,
      );

      const newGitWhoDisPromise: Promise<NewGitWhoDis> = NewGitWhoDis.from(
        logger,
        mergeRequestEvent.authorName,
      );

      const selfMergePromise: Promise<SelfMerge> = SelfMerge.from(
        state,
        api,
        logger,
        mergeRequestEvent.assigneeId,
        mergeRequestEvent.authorGitId,
      );

      const tooManyAssignedPromise: Promise<TooManyAssigned> = TooManyAssigned.from(
        state,
        api,
        customConfig.tooManyMergeRequests,
        logger,
        mergeRequestEvent.assigneeId,
      );

      // fire all Bot Actions in parallel - order does not matter
      [
        branchAge,
        commitMessage,
        diffSize,
        gitOuttaHere,
        newGitWhoDis,
        selfMerge,
        tooManyAssigned,
      ] = [
        await branchAgePromise,
        await commitMessagePromise,
        await diffPromise,
        await gitOuttaHerePromise,
        await newGitWhoDisPromise,
        await selfMergePromise,
        await tooManyAssignedPromise,
      ];

      const postCommentPromise: Promise<BotComment> = BotComment.post(
        api,
        state,
        logger,
        customConfig.updateMergeRequestComment,
        [
          branchAge.mrNote,
          commitMessage.mrNote,
          diffSize.mrNote,
          gitOuttaHere.mrNote,
          newGitWhoDis.mrNote,
          selfMerge.mrNote,
          tooManyAssigned.mrNote,
        ],
      );

      const postEmojiPromise: Promise<BotEmoji> = BotEmoji.post(api, [
        branchAge.goodGitPractice,
        commitMessage.goodGitPractice,
        diffSize.goodGitPractice,
        gitOuttaHere.goodGitPractice,
        newGitWhoDis.goodGitPractice,
        selfMerge.goodGitPractice,
        tooManyAssigned.goodGitPractice,
      ]);

      // fire POST logic in parallel - must be performed only after all Bot Action promises have resolved
      [comment, emoji] = [await postCommentPromise, await postEmojiPromise];

      // gets overall status from statuses returned by individual Bot Action API calls
      statusCode = this.fromCodes([
        branchAge.apiResponse.statusCode,
        commitMessage.apiResponse.statusCode,
        diffSize.apiResponse.statusCode,
        gitOuttaHere.apiResponse.statusCode,
        selfMerge.apiResponse.statusCode,
        tooManyAssigned.apiResponse.statusCode,
      ]);
    } catch (err) {
      logger.error(`BotActionsResponse Error: ${err.message}`);
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const responseBody = {
      mergeRequestEvent,
      customConfig,
      branchAge,
      commitMessage,
      diffSize,
      gitOuttaHere,
      newGitWhoDis,
      selfMerge,
      tooManyAssigned,
      comment,
      emoji,
    };

    logger.info({
      statusCode: statusCode,
      body: responseBody,
    });

    return new BotActionsResponse(statusCode, JSON.stringify(responseBody));
  }

  /**
   * Provides an overall status from a set of status codes
   *
   * @param allCodes Array of status codes
   *
   * @returns
   * 1. 200 when none of the elements of allCodes are a `4XX` or `5XX`.
   * 1. 207 when at least one element of allCodes is a `4XX` or `5XX`.
   */
  static fromCodes(allCodes: Array<number>): number {
    const statusCode: number = allCodes.some((code) => {
      return code >= 400;
    })
      ? 207
      : 200;
    return statusCode;
  }
}
