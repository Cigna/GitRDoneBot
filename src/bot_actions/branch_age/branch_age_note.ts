import { LoggerFactory } from "../../util";

const logger = LoggerFactory.getInstance();

/**
 * This class extends the `BotActionNote` class by analyzing different state combinations unique to the Branch Age action.
 * Each instance of this class contains a message string that provides feedback to the end-user about the age of the commits contained in the GitLab Merge Request.
 */
export abstract class BranchAgeMessage {
  static readonly good =
    `:star: It’s great that you’re committing and merging code frequently` +
    ` - the commits on this branch aren’t old or stale. Good job!`;
  static readonly bad =
    `:loudspeaker: This merge request has a pretty old commit. ` +
    `You should try and merge more frequently to keep your commits on branches fresh.`;
  static readonly hashtag = `[#BranchAgeAnalysis](https://github.com/Cigna/GitRDoneBot#2-branch-age)`;

  static caseForNoActions(
    state: string,
    constructiveFeedbackOnlyToggle: boolean,
    goodGitPractice: boolean,
  ): boolean {
    return (
      (state === "merge" || constructiveFeedbackOnlyToggle) &&
      goodGitPractice === true
    );
  }

  static caseForBadMessage(goodGitPractice: boolean): boolean {
    return goodGitPractice === false;
  }

  static caseForGoodMessage(
    state: string,
    constructiveFeedbackOnlyToggle: boolean,
    goodGitPractice: boolean,
  ): boolean {
    return (
      state !== "merge" &&
      goodGitPractice === true &&
      !constructiveFeedbackOnlyToggle
    );
  }
}
