import { NetworkFailureResponse, SuccessfulGetResponse } from "../../gitlab";
import { CommonMessages } from "../bot_action_note";
import { BotActionNote } from "../bot_action_note";
import { LoggerFactory } from "../../util";
const logger = LoggerFactory.getInstance();
/**
 * This class extends the `BotActionNote` class by analyzing different state combinations unique to the Git Outta Here action.
 * Each instance of this class contains a message string that provides feedback to the end-user about the existence of log files in the changes contained in the GitLab Merge Request.
 */
export class GitOuttaHereNote extends CommonMessages {
  static readonly bad =
    ":loudspeaker: It looks like you've got log files in your repo. You should remove them from the repo and store them somewhere else. Make sure you update your [`.gitignore` file](https://help.github.com/en/github/using-git/ignoring-files)! ";
  static readonly hashtag = `[#GitOuttaHere](https://github.com/Cigna/GitRDoneBot#7-git-outta-here)`;

  private constructor(message: string) {
    super(message);
  }

  static caseForBadMessage(goodGitPractice: boolean | undefined): boolean {
    return goodGitPractice === false;
  }

  static caseForNoActions(goodGitPractice: boolean | undefined): boolean {
    return goodGitPractice === true;
  }

  static fromMessage(message: string): GitOuttaHereNote {
    return new GitOuttaHereNote(
      this.conditionallyAddHashtag(message, this.hashtag),
    );
  }

  /**
   * Constructs a `GitOuttaHereNote` object by identifying one of four cases: standard case for permissions check,
   * case for bad message, case for no actions, or case for unknown state.
   *
   * @returns `message` of the `GitOuttaHereNote` object
   * */
  static buildMessage(
    apiResponse: SuccessfulGetResponse | NetworkFailureResponse,
    goodGitPractice: boolean | undefined,
  ): string {
    let note: GitOuttaHereNote;

    switch (true) {
      case this.standardCaseForCheckPermissionsMessage(apiResponse): {
        note = this.fromMessage(this.checkPermissionsMessage);
        break;
      }
      case this.caseForBadMessage(goodGitPractice): {
        note = this.fromMessage(this.bad);
        break;
      }
      case this.caseForNoActions(goodGitPractice): {
        note = this.fromMessage(this.noActionMessage);
        break;
      }
      default: {
        note = this.fromMessage(this.unknownState);
        logger.error(`${note.message} GitOuttaHere`);
      }
    }
    return note.message;
  }
}
