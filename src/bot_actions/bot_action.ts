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
  NetworkFailureResponse,
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
 * This interface defines the core properties that are dynamically
 * calculated by each distinct Bot Action:
 * 1. `apiResponse` can be of subtype SuccessfulGetResponse, FailedResponse, or NoRequestNeeded to represent the success or failure of the api call to GitLab
 * 1. `goodGitPractice` represents whether or not the Merge Request event meets the criteria for good behavior
 * 1. `mrNote` is a message that will be included in the comment GitRDoneBot posts to the end-user's Merge Request
 * @remarks 'goodGitPractice' will be undefined when Bot Action logic couldn't be performed due to api
 * failure in order to distinguish from when its value is explicitly set to false after performing some logic.
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

export class AuthorizationFailureBotAction {
  authorizationFailure = true;
}

export class NetworkFailureBotAction {
  networkFailure = true;
}

// Note: a successfulBotAction can have bad or good git practice.
// The successful part of it means we were able to compute the good git practice and the message,
// independent of whether that message contains positive or constructive feedback.
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

export class SuccessfulBotActionWithNothingToSay {
  constructor(readonly goodGitPractice: boolean) {}
}

/**
 * Uses information from Merge Request webhook event to invoke Bot Actions. Uses Bot Action response data to post user-facing comment and emoji on GitLab Merge Request.
 * @param api an instance of the MergeRequestApi class that wraps HTTP requests to and responses from the GitLab API
 * @param customConfig defines threshold values for each of the Bot Actions
 * @param gitLabEvent GitLab webhook body
 * @param state the state of the incoming Merge Request event from GitLab
 * @returns `BotActionsResponse` object
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
        | NetworkFailureResponse = await BotComment.post(
        api,
        state,
        customConfig.updateMergeRequestComment,
        note,
      );

      if (commentResponse instanceof NetworkFailureResponse) {
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
