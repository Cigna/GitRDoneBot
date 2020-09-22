import {
  GitLabAPIRequest,
  GitLabGetResponse,
  MergeRequestApi,
} from "../../gitlab";
import * as winston from "winston";
import { BotAction } from "../bot_action";
import { GitOuttaHereNote } from "./git_outta_here_note";

/**
 * This class extends the `BotAction` class by checking for log files in the changes contained in the GitLab Merge Request.
 */
export class GitOuttaHere extends BotAction {
  private constructor(
    apiRequest: GitLabAPIRequest,
    goodGitPractice: boolean,
    mrNote: string,
  ) {
    super(apiRequest, goodGitPractice, mrNote);
  }

  /**
   * Constructs a complete Bot Action object by making an HTTP call and analyzing response.
   *
   * @param api an instance of the MergeRequestApi class that wraps HTTP requests to and responses from the GitLab API
   * @param logger an instance of winston logger
   *
   * @returns BotAction object constructed after checking for log files in the Merge Request changes,
   * determining goodGitPractice based on that check, and instantiating a new note object.
   *
   * @remarks If api call fails, returns BotAction where `goodGitPractice` will be undefined.
   * */
  static async from(
    api: MergeRequestApi,
    logger: winston.Logger,
  ): Promise<BotAction> {
    let goodGitPractice!: boolean;

    const apiResponse: GitLabGetResponse = await api.getSingleMRChanges();

    if (
      apiResponse.apiRequest.success &&
      apiResponse.result.hasOwnProperty("changes")
    ) {
      goodGitPractice = this.noLogFiles(apiResponse.result.changes);
    }

    return new BotAction(
      apiResponse.apiRequest,
      goodGitPractice,
      GitOuttaHereNote.buildMessage(
        apiResponse.apiRequest.success,
        goodGitPractice,
        logger,
      ),
    );
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
}
