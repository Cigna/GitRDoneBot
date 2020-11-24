// import {
//   AuthorizationFailureBotAction,
//   BotActionResponse,
//   BranchAge,
//   CommitMessages,
//   DiffSize,
//   GitOuttaHere,
//   NewGitWhoDis,
//   SelfMerge,
//   SuccessfulBotAction,
//   SuccessfulBotActionWithNothingToSay,
//   TooManyAssigned,
// } from "../bot_actions";
// import { MergeRequestApi, NetworkFailureResponse } from "../gitlab";
// import {
//   CommentFailedResponse,
//   CommentSuccessResponse,
//   ErrorResponse,
//   IncorrectPermissionsResponse,
//   LambdaResponse,
//   MergeRequestEvent,
//   NoCommentNeededResponse,
// } from "../interfaces";
// import {
//   BotComment,
//   BotEmoji,
//   getMergeRequestEventData,
// } from "../merge_request";
// import { CustomConfig } from "../custom_config/custom_config";
// import { LoggerFactory } from "../util/bot_logger";
// import * as HttpStatus from "http-status-codes";

// const logger = LoggerFactory.getInstance();
// /** TODO: Refactor design decisions - WIP
//   Posting a comment (end user feedback) is the primary function of GRDBot, and should drive the type of Response we ultimately send back/log.
//   If we create 4 new response types as outlined below, we can stick them all in the `i_lambda_response` file, and therefore have all response logic in one place.
//   We could then turn BotActionsResponse into a pure static aggregator/controller/utility class, or even just move it to be a function defined in the main `handler` file.

//   *** Scenario 0. Comment posting fails ***
//   * REASON:
//     * Incorrect project permissions
//   * CRITERIA:
//     * EITHER One or more Bot Actions returns a "IncorrectPermissionsFailure" response, don't even try to post
//     * XOR we try to post the comment and get back 401/403
//   * ASSUMPTIONS:
//     * If one API-dependent Bot Action fails due to incorrect permissions, all API-dependent Bot Actions will fail
//     * If API-dependent Bot Actions fail, comment posting will also fail due to lack of permissions
//     * We can return a 4XX response for our own alerting and logging, but will not be sent to GitLab unless we map at APIGW layer
//   * LOGGING:
//     * body
//       * GitLab event info
//       * ?CustomConfig?
//       * ?All Bot Action responses?
//     * statusCode
//   * RESPONSE TYPE:
//     * IncorrectPermissionsResponse
//     * statusCode 207/401/403: DON'T want to trigger GitLab retry

//   *** Scenario 1. Comment posting fails ***
//   * REASON:
//     * GitLab API/network failure beyond our control
//   * CRITERIA:
//     * At least one SuccessfulBotAction response from an API-dependent Bot Action
//     * Comment POST returns failed response due to timeout or other network failure (408, 413, 5XX codes?)
//       * Need to confirm GitLab codes for API failure other than 401/403
//   * RESPONSE TYPE:
//     * CommentFailedResponse
//     * statusCode 500: DO want to trigger GitLab retry
//   * ASSUMPTIONS:
//     * GitLab will resend event if it receives 500
//     * We need to map this at APIGW layer to pass back 500 to GitLab
//   * LOGGING:
//     * body
//       * GitLab event info
//       * CustomConfig
//       * All Bot Action responses
//       * Emoji info
//       * Comment info
//     * statusCode

//   *** Scenario 2. Comment posting succeeds ***
//   * REASON:
//     * Receive 201 back from GitLab
//   * CRITERIA:
//     * At least one SuccessfulBotAction response from an API-dependent Bot Action
//   * RESPONSE TYPE:
//     * CommentSuccessResponse
//     * statusCode 201
//   * ASSUMPTIONS:
//     * If at least one API-dependent Bot Action returns SuccessfulBotAction response, there are no permissions issues
//   * LOGGING:
//     * body
//       * GitLab event info
//       * CustomConfig
//       * All Bot Action responses
//       * Emoji info
//       * Comment info
//     * statusCode

//   *** Scenario 3. Comment posting not needed ***
//   * REASON:
//     * No mrNote string to post
//   * CRITERIA:
//     * All Bot Actions return SuccessfulBotActionWithNothingToSay
//   * RESPONSE TYPE:
//     * NoCommentNeededResponse
//     * statusCode 200/204
//   * ASSUMPTIONS:
//     * None I can think of
//   * LOGGING:
//     * body
//       * GitLab event info
//       * ?CustomConfig?
//       * ?All Bot Action responses?
//       * Emoji info
//       * ?Comment info?
//     * statusCode
// */

// /**
//  * This class contains the aggregation logic for invoking Bot Actions and using their responses to post a comment and emoji on the Merge Request.
//  * Each instance of this class contains information on the incoming Merge Request event, Custom configuration information (if it exists), response info returned from individual Bot Actions, and what (if any) comment and emoji were posted.
//  * @remarks
//  * GitLab will retry requests if a response is not received back within 10 seconds, so instances of this class are passed back by the lambda function to satisfy that requirement.
//  * However, GitLab does nothing with this data - the core purpose of instances of this class is to log information for analysis & debugging.
//  */
// export class BotActionsAnalyzer implements LambdaResponse {

//   /**
//    * Uses information from Merge Request webhook event to invoke Bot Actions. Uses Bot Action response data to post user-facing comment and emoji on GitLab Merge Request.
//    * @param api an instance of the MergeRequestApi class that wraps HTTP requests to and responses from the GitLab API
//    * @param customConfig defines threshold values for each of the Bot Actions
//    * @param gitLabEvent GitLab webhook body
//    * @param state the state of the incoming Merge Request event from GitLab
//    * @returns `BotActionsResponse` object
//    * */
//   static async from(
//     api: MergeRequestApi,
//     customConfig: CustomConfig,
//     gitLabEvent: any,
//     state: string,
//   ): Promise<
//     | IncorrectPermissionsResponse
//     | CommentFailedResponse
//     | CommentSuccessResponse
//     | NoCommentNeededResponse
//   > {
//     const mergeRequestEvent: MergeRequestEvent = getMergeRequestEventData(
//       gitLabEvent,
//     );

//     // lambdaResponse is guaranteed to be set,
//     // must declared here so it will be in scope for response constructor
//     let lambdaResponse!:
//       | IncorrectPermissionsResponse
//       | CommentFailedResponse
//       | CommentSuccessResponse
//       | NoCommentNeededResponse;

//     // // ALWAYS REQUIRES API CALL
//     // const diffPromise: Promise<DiffSize> = DiffSize.from(
//     //   state,
//     //   api,
//     //   customConfig.diffSize,
//     // );

//     // // ALWAYS REQUIRES API CALL
//     // const gitOuttaHerePromise: Promise<GitOuttaHere> = GitOuttaHere.from(api);

//     // // NEVER REQUIRES API CALL
//     // const newGitWhoDisPromise: Promise<NewGitWhoDis> = NewGitWhoDis.from(
//     //   mergeRequestEvent.authorName,
//     // );

//     // // SOMETIMES REQUIRES API CALL
//     // const selfMergePromise: Promise<SelfMerge> = SelfMerge.from(
//     //   state,
//     //   api,
//     //   mergeRequestEvent.assigneeId,
//     //   mergeRequestEvent.authorGitId,
//     // );

//     // // SOMETIMES REQUIRES API CALL
//     // const tooManyAssignedPromise: Promise<TooManyAssigned> = TooManyAssigned.from(
//     //   state,
//     //   api,
//     //   customConfig.tooManyMergeRequests,
//     //   mergeRequestEvent.assigneeId,
//     // );

//     // // NOTE: this hardcoded commitMessageConstructiveFeedbackOnlyToggle is a placeholder until
//     // // correct customConfig functionality can be implemented
//     // const commitMessageConstructiveFeedbackOnlyToggle = false;

//     // fire all Bot Actions in parallel - order does not matter

//     const botActionResponses = await Promise.all([
//       // ALWAYS REQUIRES API CALL
//       await BranchAge.analyze(state, api, customConfig.branchAge),
//       // await CommitMessages.analyze(
//       //   state,
//       //   api,
//       //   commitMessageConstructiveFeedbackOnlyToggle,
//       // ),
//       // await diffPromise,
//       // await gitOuttaHerePromise,
//       // await newGitWhoDisPromise,
//       // await selfMergePromise,
//       // await tooManyAssignedPromise,
//     ]);

//     const chattyBotActions: Array<SuccessfulBotAction> = [];
//     const silentBotActions: Array<SuccessfulBotActionWithNothingToSay> = [];
//     const successfulBotActions: Array<
//       SuccessfulBotAction | SuccessfulBotActionWithNothingToSay
//     > = [];

//     // do we need to care about NetworkFailureBotAction here?
//     botActionResponses.forEach(function (response) {
//       switch (true) {
//         case response.action instanceof AuthorizationFailureBotAction: {
//           lambdaResponse = new IncorrectPermissionsResponse(mergeRequestEvent);
//           break;
//         }
//         case response.action instanceof SuccessfulBotAction: {
//           chattyBotActions.push(response.action as SuccessfulBotAction);
//           successfulBotActions.push(response.action as SuccessfulBotAction);
//         }
//         case response.action instanceof SuccessfulBotActionWithNothingToSay: {
//           silentBotActions.push(
//             response.action as SuccessfulBotActionWithNothingToSay,
//           );
//           successfulBotActions.push(
//             response.action as SuccessfulBotActionWithNothingToSay,
//           );
//         }
//       }
//     });

//     if (!(lambdaResponse instanceof IncorrectPermissionsResponse)) {
//       if (chattyBotActions.length === 0) {
//         lambdaResponse = new NoCommentNeededResponse(
//           mergeRequestEvent,
//           customConfig,
//           botActionResponses,
//         );
//       } else {
//         const note = chattyBotActions.reduce(
//           (note: string, action: SuccessfulBotAction) =>
//             note.concat(`${action.mrNote}<br /><br />`),
//           "",
//         );

//         const allGoodGitPractice = successfulBotActions.every(
//           (action) => action.goodGitPractice === true,
//         );

//         const postCommentPromise: Promise<BotComment> = BotComment.post(
//           api,
//           state,
//           customConfig.updateMergeRequestComment,
//           note,
//         );

//         const postEmojiPromise: Promise<BotEmoji> = BotEmoji.post(
//           api,
//           allGoodGitPractice,
//         );

//         // fire POST logic in parallel - must be performed only after all Bot Action promises have resolved

//         const [commentResponse, emoji] = [
//           await postCommentPromise,
//           await postEmojiPromise,
//         ];

//         if (commentResponse instanceof NetworkFailureResponse) {
//           lambdaResponse = new CommentFailedResponse(
//             mergeRequestEvent,
//             customConfig,
//             botActionResponses,
//             emoji,
//             note,
//           );
//         } else {
//           lambdaResponse = new CommentSuccessResponse(
//             mergeRequestEvent,
//             customConfig,
//             botActionResponses,
//             emoji,
//             note,
//           );
//         }
//       }
//     }

//     return lambdaResponse;
//   }
// }
