import {
  BranchAge,
  CommitMessages,
  DiffSize,
  GitOuttaHere,
  NewGitWhoDis,
  SelfMerge,
  TooManyAssigned,
} from "../bot_actions";
import { CustomConfig } from "../custom_config/custom_config";
import {
  MergeRequestApi,
  NotFoundORNetworkFailureResponse,
  SuccessfulPostORPutResponse,
} from "../gitlab";
import {
  IncorrectPermissionsResponse,
  CommentFailedResponse,
  CommentSuccessResponse,
  NoCommentNeededResponse,
  MergeRequestEvent,
} from "../interfaces";
import { getMergeRequestEventData, BotComment } from "../merge_request";

/**
 * This class defines the core properties that are dynamically
 * calculated by each distinct Bot Action:
 * @param name is the name of the Bot Action
 * @param statusCode is the HTTP code returned by the GitLab API request made by the Bot Action. Will be 204 if no API request is required by that Bot Action.
 * @param action type of this object will indicate whether the Bot Action succeeded or failed, and if successful, contains standard properties computed by all successful Bot Actions
 * @param computedValues optional object that may contain one or more properties specific to a particular Bot Action
 * */
export class BotActionResponse {
  // Note, not all bot actions have additional computed values.
  constructor(
    readonly name: string,
    readonly statusCode: number,
    readonly action:
      | AuthorizationFailureBotAction
      | NetworkFailureBotAction
      | SuccessfulBotAction
      | SuccessfulBotActionWithNothingToSay,
    readonly computedValues?: {},
  ) {}
}

/**
 * This class is constructed by a Bot Action if GitLab API request fails with code 401 or 403
 */
export class AuthorizationFailureBotAction {
  authorizationFailure = true;
}

/**
 * This class is constructed by a Bot Action if GitLab API request fails with any code other than 401 or 403
 */
export class NetworkFailureBotAction {
  networkFailure = true;
}

/**
 * This class is constructed by Bot Actions to indicate that analysis of git practice was successful,
 * and there is feedback to provide to end user.
 * @param goodGitPractice boolean indicating whether or not user followed good git practice as defined by a particular Bot Action
 * @param message string containing positive or constructive feedback that will be posted for end user to see
 * @param hashtag string indicating the name of the Bot Action providing feedback
 */
export class SuccessfulBotAction {
  mrNote: string;
  constructor(
    readonly goodGitPractice: boolean,
    message: string,
    hashtag: string,
  ) {
    this.mrNote = `${message} ${hashtag}`;
  }
}

/**
 * This class is constructed by Bot Actions to indicate that analysis of git practice was successful,
 * and there is no feedback to provide to end user.
 * @param goodGitPractice boolean indicating whether or not user followed good git practice as defined by a particular Bot Action
 */
export class SuccessfulBotActionWithNothingToSay {
  constructor(readonly goodGitPractice: boolean) {}
}

/**
 * Uses information from Merge Request webhook event to invoke Bot Actions.
 * Uses Bot Action response data to post user-facing comment and emoji on GitLab Merge Request that generated webhook event.
 * @param api an instance of the MergeRequestApi class that wraps HTTP requests to and responses from the GitLab API
 * @param customConfig defines threshold values for each of the Bot Actions
 * @param gitLabEvent GitLab webhook body
 * @param state the state of the incoming Merge Request event from GitLab
 * @returns object that implements `LambdaResponse` interface which uses specific types to indicate success or failure of posting comment on GitLab Merge Request
 * */
export async function runBotActions(
  api: MergeRequestApi,
  customConfig: CustomConfig,
  gitLabEvent: any,
  state: string,
): Promise<
  | IncorrectPermissionsResponse
  | CommentFailedResponse
  | CommentSuccessResponse
  | NoCommentNeededResponse
> {
  const mergeRequestEvent: MergeRequestEvent = getMergeRequestEventData(
    gitLabEvent,
  );

  // lambdaResponse is guaranteed to be set,
  // must declared here so it will be in scope for response constructor
  let lambdaResponse!:
    | IncorrectPermissionsResponse
    | CommentFailedResponse
    | CommentSuccessResponse
    | NoCommentNeededResponse;

  // fire all Bot Actions in parallel - order does not matter
  const botActionResponses: Array<BotActionResponse> = await Promise.all([
    await BranchAge.analyze(state, api, customConfig.branchAge),
    await CommitMessages.analyze(state, api),
    await DiffSize.analyze(state, api, customConfig.diffSize),
    await GitOuttaHere.analyze(api),
    await NewGitWhoDis.analyze(mergeRequestEvent.authorName),
    await SelfMerge.analyze(
      state,
      api,
      mergeRequestEvent.assigneeId,
      mergeRequestEvent.authorId,
    ),
    await TooManyAssigned.analyze(
      state,
      api,
      customConfig.tooManyMergeRequests,
      mergeRequestEvent.assigneeId,
    ),
  ]);

  const chattyBotActions: Array<SuccessfulBotAction> = [];
  const silentBotActions: Array<SuccessfulBotActionWithNothingToSay> = [];

  botActionResponses.forEach(function (response) {
    switch (true) {
      case response.action instanceof AuthorizationFailureBotAction: {
        lambdaResponse = new IncorrectPermissionsResponse(mergeRequestEvent);
        break;
      }
      case response.action instanceof SuccessfulBotAction: {
        chattyBotActions.push(response.action as SuccessfulBotAction);
      }
      case response.action instanceof SuccessfulBotActionWithNothingToSay: {
        silentBotActions.push(
          response.action as SuccessfulBotActionWithNothingToSay,
        );
      }
    }
  });

  if (!(lambdaResponse instanceof IncorrectPermissionsResponse)) {
    if (chattyBotActions.length === 0) {
      lambdaResponse = new NoCommentNeededResponse(
        mergeRequestEvent,
        customConfig,
        botActionResponses,
      );
    } else {
      const note: string = chattyBotActions.reduce(
        (note: string, action: SuccessfulBotAction) =>
          note.concat(`${action.mrNote}<br /><br />`),
        "",
      );

      const allGoodGitPractice: boolean = [
        ...chattyBotActions,
        ...silentBotActions,
      ].every((action) => action.goodGitPractice === true);

      const emoji = allGoodGitPractice ? "trophy" : "eyes";
      // we don't really care whether this succeeds or fails
      api.postEmoji(emoji);

      // POST logic must be performed only after all Bot Action promises have resolved
      const commentResponse:
        | SuccessfulPostORPutResponse
        | NotFoundORNetworkFailureResponse = await BotComment.post(
        api,
        state,
        customConfig.updateMergeRequestComment,
        note,
      );

      if (commentResponse instanceof NotFoundORNetworkFailureResponse) {
        lambdaResponse = new CommentFailedResponse(
          mergeRequestEvent,
          customConfig,
          botActionResponses,
          emoji,
          note,
        );
      } else {
        lambdaResponse = new CommentSuccessResponse(
          mergeRequestEvent,
          customConfig,
          botActionResponses,
          emoji,
          note,
        );
      }
    }
  }

  return lambdaResponse;
}
