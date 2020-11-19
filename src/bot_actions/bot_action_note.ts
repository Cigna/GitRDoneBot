/**
 * This extensible class defines the core message property that is dynamically calculated by each distinct Bot Action Note:
 * 1. `message` is a message that will be included in the comment GitRDoneBot posts to the end-user's Merge Request
 *
 * This class also provides standard messages for unknown state, no action, and check permissions.
 * */
export abstract class CommonMessages {
  static readonly unknownState: string =
    "Unknown state encountered while composing note:";
  static readonly checkPermissionsMessage: string =
    "Please check that GitRDoneBot has the correct permissions to access your project resources.";
}
