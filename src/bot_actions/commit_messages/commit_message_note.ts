import * as winston from "winston";
import { CommonMessages } from "..";
import { FailedResponse, SuccessfulGetResponse } from "../../gitlab";

/**
 * This class extends the `BotActionNote` class by analyzing different state combinations unique to the Commit Messages Action.
 * Each instance of this class contains a message string that provides feedback to the end-user about the titles of the commits contained in the GitLab Merge Request.
 */
export class CommitMessagesNote extends CommonMessages {
  static readonly good = `:star: Nice work following your team's commit message style conventions!`;
  static readonly hashtag = `[#CommitMessage](https://github.com/Cigna/GitRDoneBot#5-commit-messages)`;
  static readonly bad = `:loudspeaker: Keep commits descriptive and concise - more than one word and between 3 and 50 characters`;

  private constructor(message: string) {
    super(message);
  }

  static caseForBadMessage(goodGitPractice: boolean | undefined): boolean {
    return goodGitPractice === false;
  }

  static caseForGoodMessage(
    state: string,
    goodGitPractice: boolean | undefined,
    constructiveFeedbackOnlyToggle: boolean,
  ): boolean {
    return (
      state !== "merge" &&
      goodGitPractice === true &&
      !constructiveFeedbackOnlyToggle
    );
  }

  static caseForNoActions(
    state: string,
    goodGitPractice: boolean | undefined,
    constructiveFeedbackOnlyToggle: boolean,
    totalCommits: number,
  ): boolean {
    return (
      ((state === "merge" || constructiveFeedbackOnlyToggle) &&
        goodGitPractice === true) ||
      totalCommits === 0
    );
  }

  static fromMessage(message: string): CommitMessagesNote {
    return new CommitMessagesNote(
      this.conditionallyAddHashtag(message, this.hashtag),
    );
  }

  /**
   * Constructs a `CommitMessagesNote` object by identifying one of five cases: standard case for permissions check,
   * case for no actions, case for bad message, case for good message, or case for unknown state.
   *
   * @returns `message` of the `CommitMessagesNote` object
   * */
  static buildMessage(
    apiResponse: SuccessfulGetResponse | FailedResponse,
    state: string,
    goodGitPractice: boolean | undefined,
    constructiveFeedbackOnlyToggle: boolean,
    totalCommits: number,
    logger: winston.Logger,
  ): string {
    let note: CommitMessagesNote;

    switch (true) {
      case this.standardCaseForCheckPermissionsMessage(apiResponse): {
        note = this.fromMessage(this.checkPermissionsMessage);
        break;
      }
      // No Actions check MUST come second
      case this.caseForNoActions(
        state,
        goodGitPractice,
        constructiveFeedbackOnlyToggle,
        totalCommits,
      ): {
        note = this.fromMessage(this.noActionMessage);
        break;
      }
      case this.caseForBadMessage(goodGitPractice): {
        note = this.fromMessage(this.bad);
        break;
      }
      case this.caseForGoodMessage(
        state,
        goodGitPractice,
        constructiveFeedbackOnlyToggle,
      ): {
        note = this.fromMessage(this.good);
        break;
      }
      default: {
        note = this.fromMessage(this.unknownState);
        logger.error(`${note.message} CommitMessages`);
      }
    }
    return note.message;
  }
}
