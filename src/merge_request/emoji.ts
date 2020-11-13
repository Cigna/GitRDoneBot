import {
  FailedResponse,
  MergeRequestApi,
  NoRequestNeeded,
  SuccessfulPostORPutResponse,
} from "../gitlab";

/**
 * This class handles the logic for determining which emoji to post to end-user's Merge Request based on all `goodGitPractice` properties from individual Bot Actions.
 * Each instance of this class contains the emoji posted to a Merge Request, as well as HTTP status information about the POST request.
 */
export class BotEmoji {
  static readonly bad: string = "eyes";
  static readonly good: string = "trophy";

  private constructor(
    readonly apiResponse:
      | SuccessfulPostORPutResponse
      | NoRequestNeeded
      | FailedResponse,
    readonly name: string,
  ) {}

  /**
   * Evaluates `allChecks` to determine whether or not to post an emoji to the Merge Request. If emoji is needed, performs POST request.
   * @param api an instance of the MergeRequestApi class that wraps HTTP requests to and responses from the GitLab API
   * @param allChecks Array of `goodGitPractice` booleans
   * @returns
   * 1. `BotEmoji` with no action response if all elements of `allChecks` are `undefined`
   * 1. `BotEmoji` with emoji name and HTTP POST response info
   * */
  static async post(
    api: MergeRequestApi,
    allGoodGitPractice: boolean,
  ): Promise<BotEmoji> {
    let response:
      | SuccessfulPostORPutResponse
      | NoRequestNeeded
      | FailedResponse;

    let emoji: string;
    if (allGoodGitPractice) {
      emoji = this.good;
    } else {
      emoji = this.bad;
    }

    switch (true) {
      default: {
        response = await api.postEmoji(emoji);
      }
    }

    return new BotEmoji(response, emoji);
  }
}
