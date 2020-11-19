import {
  FailedResponse,
  MergeRequestApi,
  SuccessfulGetResponse,
} from "../../gitlab";
import { BotAction } from "../bot_action";
import { GitOuttaHereNote } from "./git_outta_here_note";

/**
 * This class checks for log files in the changes contained in the GitLab Merge Request.
 * This class implements the `BotAction` interface.
 * */
export class GitOuttaHere implements BotAction {
  private constructor(
    readonly apiResponse: SuccessfulGetResponse | FailedResponse,
    readonly goodGitPractice: boolean,
    readonly mrNote: string,
  ) {}

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
  static async from(api: MergeRequestApi): Promise<GitOuttaHere> {
    let goodGitPractice!: boolean;

    const response = await api.getSingleMRChanges();

    if (
      response instanceof SuccessfulGetResponse &&
      response.result.hasOwnProperty("changes")
    ) {
      goodGitPractice = this.noLogFiles(response.result.changes);
    }

    return new GitOuttaHere(
      response,
      goodGitPractice,
      GitOuttaHereNote.buildMessage(response, goodGitPractice),
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
