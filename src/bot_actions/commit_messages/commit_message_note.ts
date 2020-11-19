/**
 * This class extends the `BotActionNote` class by analyzing different state combinations unique to the Commit Messages Action.
 * Each instance of this class contains a message string that provides feedback to the end-user about the titles of the commits contained in the GitLab Merge Request.
 */
export class CommitMessagesNote {
  static readonly good = `:star: Nice work following your team's commit message style conventions!`;
  static readonly hashtag = `[#CommitMessage](https://github.com/Cigna/GitRDoneBot#5-commit-messages)`;
  static readonly bad = `:loudspeaker: Keep commits descriptive and concise - more than one word and between 3 and 50 characters`;

  // static caseForNoActions(
  //   state: string,
  //   goodGitPractice: boolean | undefined,
  //   constructiveFeedbackOnlyToggle: boolean,
  //   totalCommits: number,
  // ): boolean {
  //   return (
  //     ((state === "merge" || constructiveFeedbackOnlyToggle) &&
  //       goodGitPractice === true) ||
  //     totalCommits === 0
  //   );
  // }
}
