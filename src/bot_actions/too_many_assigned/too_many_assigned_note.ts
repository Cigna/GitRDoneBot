import { CommonMessages } from "../bot_action_note";
import * as winston from "winston";
import {
  FailedResponse,
  NoRequestNeeded,
  SuccessfulGetResponse,
} from "../../gitlab";

/**
 * This class extends the `BotActionNote` class by analyzing different state combinations unique to the Too Many Assigned action.
 * Each instance of this class contains a message string that provides feedback to the end-user about the number of merge requests assigned to the assignee of the GitLab Merge Request.
 */
export class TooManyAssignedNote extends CommonMessages {
  static readonly bad = `:loudspeaker: You've assigned this merge request to someone who already has a lot on their plate.
       Reassigning the merge request to someone else will help it get approved more quickly`;
  static readonly hashtag = `[#TooManyAssignedAnalysis](https://github.com/Cigna/GitRDoneBot#4-too-many-assigned)`;

  private constructor(message: string) {
    super(message);
  }

  /**
   * @remarks Custom case needed instead of using generic BotActionNote `standardCaseForCheckPermissionsMessage` because extra param assigneeId needs to be checked.
   */
  static customCaseForCheckPermissionsMessage(
    apiResponse: SuccessfulGetResponse | NoRequestNeeded | FailedResponse,
    state: string,
    assigneeId: number | null,
  ): boolean {
    return (
      state !== "merge" &&
      apiResponse instanceof FailedResponse &&
      assigneeId !== null
    );
  }

  static caseForBadMessage(
    state: string,
    goodGitPractice: boolean | undefined,
    assigneeId: number | null,
  ): boolean {
    return (
      state !== "merge" && goodGitPractice === false && assigneeId !== null
    );
  }

  static caseForNoActions(
    state: string,
    goodGitPractice: boolean | undefined,
    assigneeId: number | null,
  ): boolean {
    return state === "merge" || goodGitPractice === true || assigneeId === null;
  }

  static fromMessage(message: string): TooManyAssignedNote {
    return new TooManyAssignedNote(
      this.conditionallyAddHashtag(message, this.hashtag),
    );
  }

  /**
   * Constructs a `TooManyAssignedNote` object by identifying one of four cases: custom case for permissions check,
   * case for bad message, case for no actions, or case for unknown state.
   *
   * @returns `message` of the `TooManyAssignedNote` object
   * */
  static buildMessage(
    apiResponse: SuccessfulGetResponse | NoRequestNeeded | FailedResponse,
    state: string,
    goodGitPractice: boolean | undefined,
    assigneeId: number,
    logger: winston.Logger,
  ): string {
    let note: TooManyAssignedNote;

    switch (true) {
      case this.customCaseForCheckPermissionsMessage(
        apiResponse,
        state,
        assigneeId,
      ): {
        note = this.fromMessage(this.checkPermissionsMessage);
        break;
      }
      case this.caseForBadMessage(state, goodGitPractice, assigneeId): {
        note = this.fromMessage(this.bad);
        break;
      }
      case this.caseForNoActions(state, goodGitPractice, assigneeId): {
        note = this.fromMessage(this.noActionMessage);
        break;
      }
      default: {
        note = this.fromMessage(this.unknownState);
        logger.error(`${note.message} TooManyAssignedAnalysis`);
      }
    }

    return note.message;
  }
}
