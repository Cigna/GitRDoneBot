import { ApiResponse } from "../gitlab";

/**
 * This interface defines the core properties that are dynamically
 * calculated by each distinct Bot Action:
 * 1. `apiResponse` can be of subtype SuccessfulGetResponse, FailedResponse, or NoRequestNeeded to represent the success or failure of the api call to GitLab
 * 1. `goodGitPractice` represents whether or not the Merge Request event meets the criteria for good behavior
 * 1. `mrNote` is a message that will be included in the comment GitRDoneBot posts to the end-user's Merge Request
 * @remarks 'goodGitPractice' will be undefined when Bot Action logic couldn't be performed due to api
 * failure in order to distinguish from when its value is explicitly set to false after performing some logic.
 * */
export interface BotAction {
  apiResponse: ApiResponse;
  goodGitPractice: boolean;
  mrNote: string;
}

export interface SuccessfulBotAction {
  // apiResponse: ApiResponse;
  // goodGitPractice: boolean;
  mrNote: string;
}
