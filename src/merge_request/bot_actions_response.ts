import {
  BranchAge,
  CommitMessages,
  DiffSize,
  GitOuttaHere,
  NewGitWhoDis,
  SelfMerge,
  SuccessfulBotAction,
  TooManyAssigned,
} from "../bot_actions";
import { MergeRequestApi } from "../gitlab";
import {
  ErrorResponse,
  LambdaResponse,
  MergeRequestEvent,
} from "../interfaces";
import {
  BotComment,
  BotEmoji,
  getMergeRequestEventData,
} from "../merge_request";
import { CustomConfig } from "../custom_config/custom_config";
import { LoggerFactory } from "../util/bot_logger";
import * as HttpStatus from "http-status-codes";

const logger = LoggerFactory.getInstance();
/**
 * This class contains the aggregation logic for invoking Bot Actions and using their responses to post a comment and emoji on the Merge Request.
 * Each instance of this class contains information on the incoming Merge Request event, Custom configuration information (if it exists), response info returned from individual Bot Actions, and what (if any) comment and emoji were posted.
 * @remarks
 * GitLab will retry requests if a response is not received back within 10 seconds, so instances of this class are passed back by the lambda function to satisfy that requirement.
 * However, GitLab does nothing with this data - the core purpose of instances of this class is to log information for analysis & debugging.
 */
export class BotActionsResponse implements LambdaResponse {
  private constructor(readonly statusCode: number, readonly body: string) {
    logger.info({
      statusCode: this.statusCode,
      body: JSON.parse(this.body),
    });
  }

  /**
   * Uses information from Merge Request webhook event to invoke Bot Actions. Uses Bot Action response data to post user-facing comment and emoji on GitLab Merge Request.
   * @param api an instance of the MergeRequestApi class that wraps HTTP requests to and responses from the GitLab API
   * @param customConfig defines threshold values for each of the Bot Actions
   * @param gitLabEvent GitLab webhook body
   * @param state the state of the incoming Merge Request event from GitLab
   * @returns `BotActionsResponse` object
   * */
  static async from(
    api: MergeRequestApi,
    customConfig: CustomConfig,
    gitLabEvent: any,
    state: string,
  ): Promise<BotActionsResponse | ErrorResponse> {
    const mergeRequestEvent: MergeRequestEvent = getMergeRequestEventData(
      gitLabEvent,
    );
    const successfulBotActions: Array<SuccessfulBotAction> = [];

    // variables declared here so they will be in scope for response constructor
    // only status is guaranteed to be set regardless of error
    let statusCode: number;

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
    const botActionResponses = await Promise.all([
      await BranchAge.analyze(state, api, customConfig.branchAge),
      // await commitMessagePromise,
      // await diffPromise,
      // await gitOuttaHerePromise,
      // await newGitWhoDisPromise,
      // await selfMergePromise,
      // await tooManyAssignedPromise,
    ]);

    botActionResponses.forEach(function (botActionResponse) {
      if (botActionResponse instanceof SuccessfulBotAction) {
        successfulBotActions.push(botActionResponse);
      }
    });

    const totalActions = botActionResponses.length;
    const successfulActions = successfulBotActions.length;

    if (successfulActions === 0) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    } else {
      if (successfulActions === totalActions) {
        statusCode = HttpStatus.OK;
      } else {
        statusCode = HttpStatus.MULTI_STATUS;
      }

      const note = successfulBotActions.reduce(
        (note: string, action: SuccessfulBotAction) =>
          note.concat(`${action.mrNote}<br /><br />`),
        "",
      );

      const allGoodGitPractice = successfulBotActions.every(
        (action) => action.goodGitPractice === true,
      );

      const postCommentPromise: Promise<BotComment> = BotComment.post(
        api,
        state,
        customConfig.updateMergeRequestComment,
        note,
      );

      const postEmojiPromise: Promise<BotEmoji> = BotEmoji.post(
        api,
        allGoodGitPractice,
      );

      // fire POST logic in parallel - must be performed only after all Bot Action promises have resolved

      const [comment, emoji] = [
        await postCommentPromise,
        await postEmojiPromise,
      ];
    }

    // NOTE STATUS DOESN'T TAKE INTO ACCOUNT EMOJI AND COMMENT....
    // Emoji returns a 404 if it already exists so we probably don't care about it.

    logger.info(botActionResponses);
    LoggerFactory.logBotActionInfo();
    return new BotActionsResponse(statusCode, "What should we put here?");
  }
}
