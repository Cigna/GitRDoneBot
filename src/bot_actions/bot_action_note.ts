// import {
//   SuccessfulBotAction,
//   NetworkFailureBotAction,
//   SuccessfulBotActionWithNothingToSay,
// } from ".";

// /**
//  * This extensible class defines the core message property that is dynamically calculated by each distinct Bot Action Note:
//  * 1. `message` is a message that will be included in the comment GitRDoneBot posts to the end-user's Merge Request
//  *
//  * This class also provides standard messages for unknown state, no action, and check permissions.
//  * */

// export abstract class CommonMessages {
//   // *** THIS CASE IS COMMON TO ***
//   // * Branch Age
//   // * Diff Analysis
//   // *** THIS CASE IS NOT COMMON TO ***
//   // * Self Merge
//   // * Too Many Assigned (has no good message)
//   static caseForGoodMessage(
//     state: string,
//     goodGitPractice: boolean,
//     constructiveFeedbackOnlyToggle: boolean,
//   ): boolean {
//     return (
//       state !== "merge" &&
//       goodGitPractice === true &&
//       !constructiveFeedbackOnlyToggle
//     );
//   }

//   // *** THIS CASE IS COMMON TO ***
//   // * Branch Age
//   // * Diff Analysis
//   // *** THIS CASE IS NOT COMMON TO ***
//   // * Self Merge (has 3 distinct bad messages)
//   // * Too Many Assigned
//   static caseForBadMessage(goodGitPractice: boolean): boolean {
//     return goodGitPractice === false;
//   }

//   // *** THIS CASE IS COMMON TO ***
//   // * Branch Age
//   // * Diff Analysis
//   // *** THIS CASE IS NOT COMMON TO ***
//   // * Self Merge
//   // * Too Many Assigned
//   static caseForNoActions(
//     state: string,
//     goodGitPractice: boolean,
//     constructiveFeedbackOnlyToggle: boolean,
//   ): boolean {
//     return (
//       (state === "merge" || constructiveFeedbackOnlyToggle) &&
//       goodGitPractice === true
//     );
//   }

//   /**
//    * Constructs a `CommitMessagesNote` object by identifying one of five cases: standard case for permissions check,
//    * case for no actions, case for bad message, case for good message, or case for unknown state.
//    *
//    * @returns `message` of the `CommitMessagesNote` object
//    * */
//   static buildAction(
//     state: string,
//     goodGitPractice: boolean,
//     constructiveFeedbackOnlyToggle: boolean,
//     badNote: string,
//     goodNote: string,
//     hashtag: string,
//   ):
//     | SuccessfulBotAction
//     | NetworkFailureBotAction
//     | SuccessfulBotActionWithNothingToSay
//     | UnknownStateBotAction {
//     let action;

//     switch (true) {
//       // No Actions check MUST come second
//       case CommonMessages.caseForNoActions(
//         state,
//         goodGitPractice,
//         constructiveFeedbackOnlyToggle,
//       ): {
//         action = new SuccessfulBotActionWithNothingToSay(
//           state,
//           goodGitPractice,
//           constructiveFeedbackOnlyToggle,
//         );
//         break;
//       }
//       case CommonMessages.caseForBadMessage(goodGitPractice): {
//         action = new SuccessfulBotAction(goodGitPractice, badNote, hashtag);
//         break;
//       }
//       case CommonMessages.caseForGoodMessage(
//         state,
//         goodGitPractice,
//         constructiveFeedbackOnlyToggle,
//       ): {
//         action = new SuccessfulBotAction(goodGitPractice, goodNote, hashtag);
//         break;
//       }
//       default: {
//         action = new UnknownStateBotAction(
//           state,
//           goodGitPractice,
//           constructiveFeedbackOnlyToggle,
//         );
//       }
//     }
//     return action;
//   }
// }
