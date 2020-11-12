import { BotAction, SuccessfulBotAction } from "../bot_action";
import * as winston from "winston";
import {
  ApiResponse,
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
export class GoodNote {
  private constructor(readonly mrNote: string) {}
}
export class BadNote {
  private constructor(readonly mrNote: string) {}
}
export class FailedNote {
  readonly mrNote = "Check Permissions Message";
}

export class BotActionLogger {
  private constructor(
    readonly apiResponse: ApiResponse,
    readonly goodGitPractice: boolean,
    readonly mrNote: string,
    readonly oldestCommit: GitLabCommit,
  ) {}
}

function getOldestCommit(commits: Array<GitLabCommit>): GitLabCommit {
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

function isBranchYoungerThanThreshold(
  oldestCommit: GitLabCommit,
  threshold: number,
): boolean {
  // this gives us the number of milliseconds between the oldest commit and current time
  const oldestCommitAge =
    Date.now() - new Date(oldestCommit.created_at).getTime();
  // divide oldestCommitAge by milliseconds/day to compare int num of days with threshold
  return Math.floor(oldestCommitAge / 8.64e7) <= threshold;
}

/**
 * Constructs a complete Branch Age object by making an HTTP call and analyzing response.
 *
 * @param state the state of the incoming Merge Request event from GitLab
 * @param api an instance of the MergeRequestApi class that wraps HTTP requests to and responses from the GitLab API
 * @param customConfig an instance of the BotActionConfig class that defines branch age threshold
 * @param logger an instance of winston logger
 *
 * @returns BranchAge object constructed after calculating the age of oldest commit, determining goodGitPractice based on that value, and instantiating a new note object.
 *
 * @remarks If api call fails, returns BranchAge where `goodGitPractice` and `oldestCommit` are undefined.
 * */
export async function from(
  state: string,
  api: MergeRequestApi,
  customConfig: BotActionConfig,
  logger: winston.Logger,
): Promise<GoodNote | BadNote | FailedNote> {
  let goodGitPractice!: boolean;
  let oldestCommit!: GitLabCommit;
  let note!: GoodNote | BadNote | FailedNote;

  const response: ApiResponse = await api.getSingleMRCommits();

  if (response instanceof SuccessfulGetResponse) {
    if (response.result.length === 0) {
      // When result array is empty, we are assuming there are no commits on this branch (ie, opened from an Issue).
      goodGitPractice = true;
    } else {
      oldestCommit = getOldestCommit(response.result);
      goodGitPractice = isBranchYoungerThanThreshold(
        oldestCommit,
        customConfig.threshold,
      );
    }
  }

  // return new BranchAge(
  //   response,
  //   goodGitPractice,
  //   BranchAgeNote.buildMessage(
  //     customConfig,
  //     response,
  //     goodGitPractice,
  //     state,
  //     logger,
  //   ),
  //   oldestCommit,
  // );
  return note;
}
