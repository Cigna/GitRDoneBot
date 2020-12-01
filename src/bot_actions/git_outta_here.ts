import {
  MergeRequestApi,
  SuccessfulGetResponse,
  AuthorizationFailureResponse,
} from "../gitlab";
import {
  AuthorizationFailureBotAction,
  BotActionResponse,
  NetworkFailureBotAction,
  SuccessfulBotAction,
  SuccessfulBotActionWithNothingToSay,
} from "./bot_action";

/**
 * This class checks for log files in the changes contained in the GitLab Merge Request.
 * This class implements the `BotAction` interface.
 * */
export abstract class GitOuttaHere {
  static readonly botActionName = "GitOuttaHere";
  static readonly badNote =
    ":loudspeaker: It looks like you've got log files in your repo. You should remove them from the repo and store them somewhere else. Make sure you update your [`.gitignore` file](https://help.github.com/en/github/using-git/ignoring-files)! ";
  static readonly hashtag = `[#GitOuttaHere](https://github.com/Cigna/GitRDoneBot#7-git-outta-here)`;
  /**
   * Constructs a complete Bot Action object by making an HTTP call and analyzing response.
   *
   * @param api an instance of the MergeRequestApi class that wraps HTTP requests to and responses from the GitLab API
   *
   * @returns BotAction object constructed after checking for log files in the Merge Request changes,
   * determining goodGitPractice based on that check, and instantiating a new note object.
   *
   * @remarks If api call fails, returns BotAction where `goodGitPractice` will be undefined.
   * */
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
   * */
  private static noLogFiles(changes: any[]): boolean {
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

  static buildSuccessfulAction(
    goodGitPractice: boolean,
  ): SuccessfulBotAction | SuccessfulBotActionWithNothingToSay {
    let action;

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
