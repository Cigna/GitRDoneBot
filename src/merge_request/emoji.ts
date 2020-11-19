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
  static readonly noAction: string = "No BotEmoji action required.";

  private constructor(
    readonly apiResponse:
      | SuccessfulPostORPutResponse
      | NoRequestNeeded
      | FailedResponse,
    readonly name: string,
  ) {}

  /**
   * Evaluates array of `goodGitPractice` booleans to decide which GitLab emoji should be posted, or if no action is required.
   * @param allChecks Array of `goodGitPractice` booleans
   * @returns
   * 1. "No BotEmoji action required." if all elements of `allChecks` are `undefined`
   * 1. "trophy" if at least one element of `allChecks` is `true` and no elements are `false`
   * 1. "eyes" if at least one element in `allChecks` is `false`
   * */
  static compose(allChecks: Array<boolean | undefined>): string {
    let emoji: string;
    const allUndefined = allChecks.every((bool) => bool === undefined);

    if (allUndefined) {
      emoji = this.noAction;
    } else {
      emoji = allChecks
        .filter((check) => check !== undefined)
        .every((bool) => bool === true)
        ? this.good
        : this.bad;
    }
    return emoji;
  }

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
    allChecks: Array<boolean | undefined>,
  ): Promise<BotEmoji> {
    let response:
      | SuccessfulPostORPutResponse
      | NoRequestNeeded
      | FailedResponse;
    const emoji = this.compose(allChecks);
    const caseForNoActions = emoji === this.noAction;

    switch (true) {
      case caseForNoActions: {
        response = new NoRequestNeeded();
        break;
      }
      default: {
        response = await api.postEmoji(emoji);
      }
    }

    return new BotEmoji(response, emoji);
  }
}
