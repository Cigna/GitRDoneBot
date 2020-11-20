import {
  SuccessfulBotAction,
  FailedBotAction,
  SuccessfulBotActionWithNothingToSay,
} from ".";
import { LoggerFactory } from "../util";

const logger = LoggerFactory.getInstance();
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

  static caseForGoodMessage(
    state: string,
    goodGitPractice: boolean,
    constructiveFeedbackOnlyToggle: boolean,
  ): boolean {
    return (
      state !== "merge" &&
      goodGitPractice === true &&
      !constructiveFeedbackOnlyToggle
    );
  }

  static caseForBadMessage(goodGitPractice: boolean): boolean {
    return goodGitPractice === false;
  }

  static caseForNoActions(
    state: string,
    goodGitPractice: boolean,
    constructiveFeedbackOnlyToggle: boolean,
  ): boolean {
    return (
      (state === "merge" || constructiveFeedbackOnlyToggle) &&
      goodGitPractice === true
    );
  }

  /**
   * Constructs a `CommitMessagesNote` object by identifying one of five cases: standard case for permissions check,
   * case for no actions, case for bad message, case for good message, or case for unknown state.
   *
   * @returns `message` of the `CommitMessagesNote` object
   * */
  static buildAction(
    state: string,
    goodGitPractice: boolean,
    constructiveFeedbackOnlyToggle: boolean,
    badNote: string,
    goodNote: string,
    hashtag: string,
    botActionName: string,
  ):
    | SuccessfulBotAction
    | FailedBotAction
    | SuccessfulBotActionWithNothingToSay {
    let action;

    switch (true) {
      // No Actions check MUST come second
      case CommonMessages.caseForNoActions(
        state,
        goodGitPractice,
        constructiveFeedbackOnlyToggle,
      ): {
        action = new SuccessfulBotActionWithNothingToSay(
          "Sing a song of silence.",
        );
        break;
      }
      case CommonMessages.caseForBadMessage(goodGitPractice): {
        action = new SuccessfulBotAction(goodGitPractice, badNote, hashtag);
      }
      case CommonMessages.caseForGoodMessage(
        state,
        goodGitPractice,
        constructiveFeedbackOnlyToggle,
      ): {
        action = new SuccessfulBotAction(goodGitPractice, goodNote, hashtag);
        break;
      }
      default: {
        action = new FailedBotAction(CommonMessages.unknownState);
        logger.error(`${botActionName} unknown state encountered`);
      }
    }
    return action;
  }
}
