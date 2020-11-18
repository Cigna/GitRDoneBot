import { BotAction } from "../bot_action";
import {
  FailedResponse,
  MergeRequestApi,
  SuccessfulGetResponse,
} from "../../gitlab";
import { BotActionConfig } from "../../custom_config/bot_action_config";
import { BranchAgeNote } from "./branch_age_note";
import { GitLabCommit } from "../../interfaces";

/**
 * This class analyzes the age of the commits contained in the GitLab Merge Request.
 * This class implements the `BotAction` interface and also contains the property:
 * 1. `oldestCommit`: `GitLabCommit` with the oldest created_at date contained in the Merge Request
 */
export class BranchAge implements BotAction {
  private constructor(
    readonly apiResponse: SuccessfulGetResponse | FailedResponse,
    readonly goodGitPractice: boolean,
    readonly mrNote: string,
    readonly oldestCommit: GitLabCommit,
  ) {}

  /**
   * Constructs a complete Branch Age object by making an HTTP call and analyzing response.
   *
   * @param state the state of the incoming Merge Request event from GitLab
   * @param api an instance of the MergeRequestApi class that wraps HTTP requests to and responses from the GitLab API
   * @param customConfig an instance of the BotActionConfig class that defines branch age threshold
   *
   * @returns BranchAge object constructed after calculating the age of oldest commit, determining goodGitPractice based on that value, and instantiating a new note object.
   *
   * @remarks If api call fails, returns BranchAge where `goodGitPractice` and `oldestCommit` are undefined.
   * */
  static async from(
    state: string,
    api: MergeRequestApi,
    customConfig: BotActionConfig,
  ): Promise<BranchAge> {
    let goodGitPractice!: boolean;
    let oldestCommit!: GitLabCommit;

    const response = await api.getSingleMRCommits();

    if (response instanceof SuccessfulGetResponse) {
      if (response.result.length === 0) {
        // When result array is empty, we are assuming there are no commits on this branch (ie, opened from an Issue).
        goodGitPractice = true;
      } else {
        oldestCommit = this.getOldestCommit(response.result);
        goodGitPractice = this.isBranchYoungerThanThreshold(
          oldestCommit,
          customConfig.threshold,
        );
      }
    }

    return new BranchAge(
      response,
      goodGitPractice,
      BranchAgeNote.buildMessage(
        customConfig,
        response,
        goodGitPractice,
        state,
      ),
      oldestCommit,
    );
  }

  private static getOldestCommit(commits: Array<GitLabCommit>): GitLabCommit {
    const oldestCommit: GitLabCommit = commits.reduce(
      (prevCommit, currCommit) => {
        return new Date(prevCommit.created_at).getTime() <
          new Date(currCommit.created_at).getTime()
          ? prevCommit
          : currCommit;
      },
    );
    return oldestCommit;
  }

  private static isBranchYoungerThanThreshold(
    oldestCommit: GitLabCommit,
    threshold: number,
  ): boolean {
    // this gives us the number of milliseconds between the oldest commit and current time
    const oldestCommitAge =
      Date.now() - new Date(oldestCommit.created_at).getTime();
    // divide oldestCommitAge by milliseconds/day to compare int num of days with threshold
    return Math.floor(oldestCommitAge / 8.64e7) <= threshold;
  }
}
