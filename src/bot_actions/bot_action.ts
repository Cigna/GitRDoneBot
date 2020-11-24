import { LoggerFactory } from "../util";

const logger = LoggerFactory.getInstance();
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
      | SuccessfulBotActionWithNothingToSay
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
  constructor(
    readonly mrState: string,
    readonly goodGitPractice: boolean,
    readonly constructiveFeedbackOnlyToggle: boolean,
  ) {}
}

// // TODO: do we need to log to error here?
// export class UnknownStateBotAction {
//   unknownState = "Unknown state encountered while composing note:";
//   constructor(
//     readonly mrState: string,
//     readonly goodGitPractice: boolean,
//     readonly constructiveFeedbackOnlyToggle: boolean,
//   ) {
//     logger.error(this);
//   }
// }
