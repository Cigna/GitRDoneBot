/**
 * This extensible class defines the core message property that is dynamically calculated by each distinct Bot Action Note:
 * 1. `message` is a message that will be included in the comment GitRDoneBot posts to the end-user's Merge Request
 *
 * This class also provides standard messages for unknown state, no action, and check permissions.
 * */
export abstract class BotActionNote {
  static readonly unknownState: string =
    "Unknown state encountered while composing note:";
  static readonly noActionMessage: string = "NA";
  static readonly checkPermissionsMessage: string =
    "Please check that GitRDoneBot has the correct permissions to access your project resources.";

  constructor(readonly message: string) {}

  static conditionallyAddHashtag(message: string, hashtag: string): string {
    let composedMessage: string;
    if (
      message === this.noActionMessage ||
      message === this.checkPermissionsMessage ||
      message === this.unknownState
    ) {
      composedMessage = message;
    } else composedMessage = `${message} ${hashtag}`;
    return composedMessage;
  }

  /**
   * @remarks
   * 1. Permissions check MUST come first in the switch statement for every bot action note builder.
   * 1. `gitLabRequestSuccess` could possibly be undefined,
   * which evaluates to ['falsy'](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) and therefore requires strict equality checks
   */
  static standardCaseForCheckPermissionsMessage(
    gitLabRequestSuccess: boolean | undefined,
  ): boolean {
    return gitLabRequestSuccess === false;
  }
}
