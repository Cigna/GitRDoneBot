import { BotActionNote } from "../bot_action_note";
import {
  FailedResponse,
  NoRequestNeeded,
  SuccessfulGetResponse,
} from "../../gitlab";
import { LoggerFactory } from "../../util";
const logger = LoggerFactory.getInstance();
/**
 * This class extends the `BotActionNote` class by analyzing different state combinations unique to the Self Merge action.
 * Each instance of this class contains a message string that provides feedback to the end-user about the assignee, approvers, and the user who merged the GitLab Merge Request.
 */
export class SelfMergeNote extends BotActionNote {
  static readonly good = `:star: Thanks for following good git practice and not assigning your merge request to yourself!`;
  static readonly badApproved =
    `:loudspeaker: You should re-open this merge request and have someone else review and approve it. ` +
    `You can check your project settings to make sure self approval of merge requests is not enabled. ` +
    `You can find this in Settings -> General -> Merge Request`;
  static readonly badAssigned =
    `:loudspeaker: I noticed that you assigned your merge request to yourself. ` +
    `This is an unsafe practice that circumvents quality code review. You can check your project` +
    ` settings to make sure self approval of merge requests is not enabled. You can find this in` +
    ` Settings -> General -> Merge Request`;
  static readonly badMerged =
    `:loudspeaker: You should re-open this merge request and have someone else review and approve it. ` +
    `You can check your project settings to make sure at least 1 approval is required to merge in new code. ` +
    `Project settings can be updated to require approvals in Settings -> General -> Merge Request`;
  static readonly noApprovals =
    `:loudspeaker: I noticed that your project doesn't require any approvals to merge in your code. ` +
    `It is a good practice to require at least 1 approval to prevent accidentally merging code that hasn't been reviewed by others.` +
    `Project settings can be updated to require approvals in Settings -> General -> Merge Request`;
  static readonly hashtag = `[#SelfMergeAnalysis](https://github.com/Cigna/GitRDoneBot#3-self-merge)`;

  private constructor(message: string) {
    super(message);
  }

  static caseForGoodMessage(
    state: string,
    goodGitPractice: boolean | undefined,
  ): boolean {
    return state !== "merge" && goodGitPractice === true;
  }

  static caseForBadSelfApprovedMessage(
    state: string,
    goodGitPractice: boolean | undefined,
    approversNeeded: boolean | undefined,
  ): boolean {
    return (
      state === "merge" &&
      goodGitPractice === false &&
      approversNeeded === false
    );
  }

  static caseForBadSelfAssignedMessage(
    state: string,
    goodGitPractice: boolean | undefined,
  ): boolean {
    return state !== "merge" && goodGitPractice === false;
  }

  static caseForBadSelfMergedMessage(
    state: string,
    goodGitPractice: boolean | undefined,
    approversNeeded: boolean | undefined,
  ): boolean {
    return (
      state === "merge" && goodGitPractice === false && approversNeeded === true
    );
  }

  static caseForNoApprovalsMessage(
    state: string,
    goodGitPractice: boolean | undefined,
    approversNeeded: boolean | undefined,
  ): boolean {
    return (
      state === "merge" && goodGitPractice === true && approversNeeded === true
    );
  }

  static caseForNoActions(
    state: string,
    goodGitPractice: boolean | undefined,
    approversNeeded: boolean | undefined,
  ): boolean {
    return (
      state === "merge" && goodGitPractice === true && approversNeeded === false
    );
  }

  static fromMessage(message: string): SelfMergeNote {
    return new SelfMergeNote(
      this.conditionallyAddHashtag(message, this.hashtag),
    );
  }

  /**
   * Constructs a `SelfMergeNote` object by identifying one of eight cases: standard case for permissions check,
   * case for bad self-assigned message, case for bad self-approved message, case for bad self-merged message,
   * case for no approvals message, case for no actions, or case for unknown state.
   *
   * @returns `message` of the `SelfMergeNote` object
   * */
  static buildMessage(
    apiResponse: SuccessfulGetResponse | NoRequestNeeded | FailedResponse,
    state: string,
    goodGitPractice: boolean | undefined,
    approversNeeded: boolean | undefined,
  ): string {
    let note: SelfMergeNote;
    switch (true) {
      case this.standardCaseForCheckPermissionsMessage(apiResponse): {
        note = this.fromMessage(this.checkPermissionsMessage);
        break;
      }
      case this.caseForBadSelfAssignedMessage(state, goodGitPractice): {
        note = this.fromMessage(this.badAssigned);
        break;
      }
      case this.caseForBadSelfApprovedMessage(
        state,
        goodGitPractice,
        approversNeeded,
      ): {
        note = this.fromMessage(this.badApproved);
        break;
      }
      case this.caseForBadSelfMergedMessage(
        state,
        goodGitPractice,
        approversNeeded,
      ): {
        note = this.fromMessage(this.badMerged);
        break;
      }
      case this.caseForNoApprovalsMessage(
        state,
        goodGitPractice,
        approversNeeded,
      ): {
        note = this.fromMessage(this.noApprovals);
        break;
      }
      case this.caseForGoodMessage(state, goodGitPractice): {
        note = this.fromMessage(this.good);
        break;
      }
      case this.caseForNoActions(state, goodGitPractice, approversNeeded): {
        note = this.fromMessage(this.noActionMessage);
        break;
      }
      default: {
        note = this.fromMessage(this.unknownState);
        logger.error(`${note.message} SelfMergeAnalysis`);
      }
    }

    return note.message;
  }
}
