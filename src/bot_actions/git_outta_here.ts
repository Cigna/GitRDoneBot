import {
  MergeRequestApi,
  SuccessfulGetResponse,
  AuthorizationFailureResponse,
} from "../gitlab";
import { Change } from "../interfaces";
import {
  AuthorizationFailureBotAction,
  BotActionResponse,
  NetworkFailureBotAction,
  SuccessfulBotAction,
  SuccessfulBotActionWithNothingToSay,
} from "./bot_action";

/**
 * This Bot Action class checks for log files in the Changes contained in the GitLab Merge Request
 * and determines what, if any, feedback to provide to user.
 */
export abstract class GitOuttaHere {
  static readonly botActionName = "GitOuttaHere";
  static readonly badNote =
    ":loudspeaker: It looks like you've got log files in your repo. You should remove them from the repo and store them somewhere else. Make sure you update your [`.gitignore` file](https://help.github.com/en/github/using-git/ignoring-files)! ";
  static readonly hashtag = `[#GitOuttaHere](https://github.com/Cigna/GitRDoneBot#7-git-outta-here)`;

  /**
   * @param api an instance of `MergeRequestApi`
   * @returns data about the success or failure of the GitLab API request and resulting properties calculated by Git Outta Here analysis
   */
  static async analyze(api: MergeRequestApi): Promise<BotActionResponse> {
    let action:
      | AuthorizationFailureBotAction
      | NetworkFailureBotAction
      | SuccessfulBotAction
      | SuccessfulBotActionWithNothingToSay;
    let actionResponse: BotActionResponse;

    const response = await api.getSingleMRChanges();

    // if changes property doesn't exist, consider this to be a Network Failure
    if (
      response instanceof SuccessfulGetResponse &&
      response.result.hasOwnProperty("changes")
    ) {
      const goodGitPractice = this.noLogFiles(response.result.changes);

      action = this.buildSuccessfulAction(goodGitPractice);

      actionResponse = new BotActionResponse(
        this.botActionName,
        response.statusCode,
        action,
      );
    } else {
      if (response instanceof AuthorizationFailureResponse) {
        action = new AuthorizationFailureBotAction();
      } else {
        action = new NetworkFailureBotAction();
      }
      actionResponse = new BotActionResponse(
        this.botActionName,
        response.statusCode,
        action,
      );
    }
    return actionResponse;
  }

  /**
   * @param changes array of GitLab Change objects
   * @returns true if none of the `changes` reflect an update to or creation of a log file
   */
  private static noLogFiles(changes: Array<Change>): boolean {
    let thereAreNoLogs = true;
    if (changes.length !== 0) {
      const regex = new RegExp(/\.log$/);
      for (const change of changes) {
        const fileIsALog: boolean = regex.test(change.new_path);
        if (fileIsALog === true && change.deleted_file === false) {
          thereAreNoLogs = false;
          break;
        }
      }
    }
    return thereAreNoLogs;
  }

  /**
   * Invoked when Bot Action analysis was successful.
   * Constructs a BotAction object containing goodGitPractice and conditional feedback message.
   * @param goodGitPractice represents whether or not the Merge Request event meets the criteria for good Git Outta Here practice
   * @returns SuccessfulBotAction instance containing feedback for user. If no feedback is warranted, an instance of SuccessfulBotActionWithNothingToSay is returned.
   */
  static buildSuccessfulAction(
    goodGitPractice: boolean,
  ): SuccessfulBotAction | SuccessfulBotActionWithNothingToSay {
    let action: SuccessfulBotAction | SuccessfulBotActionWithNothingToSay;

    switch (goodGitPractice) {
      case false: {
        action = new SuccessfulBotAction(
          goodGitPractice,
          this.badNote,
          this.hashtag,
        );
        break;
      }
      default: {
        action = new SuccessfulBotActionWithNothingToSay(goodGitPractice);
      }
    }
    return action;
  }
}
