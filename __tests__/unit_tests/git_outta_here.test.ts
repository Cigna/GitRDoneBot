import {
  GitOuttaHere,
  SuccessfulBotActionWithMessage,
  SuccessfulBotActionWithNothingToSay,
} from "../../src/bot_actions";

const deleted_log_files = [
  {
    old_path: "fake.log",
    new_path: "fake.log",
    a_mode: "100644",
    b_mode: "0",
    new_file: false,
    renamed_file: false,
    deleted_file: true,
    diff:
      "@@ -1,3 +0,0 @@\n-This is my fake log\n-\n-More fake stuff\n\\ No newline at end of file\n",
  },
];

const log_files_exist = [
  {
    old_path: "README.md",
    new_path: "README.md",
    a_mode: "100644",
    b_mode: "100644",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      "@@ -4,3 +4,4 @@ Leverage agile frameworks to provide a robust synopsis for high level overviews.\n Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. \n Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.\n \n+Testing for WIP stuff.\n\\ No newline at end of file\n",
  },
  {
    old_path: "renAndStimpy.log",
    new_path: "renAndStimpy.log",
    a_mode: "100644",
    b_mode: "100644",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      "@@ -4,3 +4,4 @@ Leverage agile frameworks to provide a robust synopsis for high level overviews.\n Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. \n Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.\n \n+Testing for WIP stuff.\n\\ No newline at end of file\n",
  },
];

const no_log_files = [
  {
    old_path: "README.md",
    new_path: "README.md",
    a_mode: "100644",
    b_mode: "100644",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      "@@ -4,3 +4,4 @@ Leverage agile frameworks to provide a robust synopsis for high level overviews.\n Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. \n Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.\n \n+Testing for WIP stuff.\n\\ No newline at end of file\n",
  },
];

const changes_equal_zero = [];

describe("GitOuttaHere.noLogFiles(changes)", () => {
  test("should return false when log files EXIST", () => {
    expect(GitOuttaHere["noLogFiles"](log_files_exist)).toBe(false);
  });
  test("should return true when log files DO NOT exist", () => {
    expect(GitOuttaHere["noLogFiles"](no_log_files)).toBe(true);
  });
  test("should return true when log files have been DELETED", () => {
    expect(GitOuttaHere["noLogFiles"](deleted_log_files)).toBe(true);
  });
  test("should return true when there are 0 changes", () => {
    expect(GitOuttaHere["noLogFiles"](changes_equal_zero)).toBe(true);
  });
});

describe("GitOuttaHere.buildSuccessfulAction(goodGitPractice)", () => {
  describe("goodGitPractice === true", (goodGitPractice = true) => {
    test("RETURNS INSTANCE: SuccessfulBotActionWithNothingToSay", () => {
      expect(
        GitOuttaHere.buildSuccessfulAction(goodGitPractice),
      ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
    });
  });

  describe("goodGitPractice === false", (goodGitPractice = false) => {
    test("RETURNS INSTANCE: SuccessfulBotActionWithMessage w/badNote", () => {
      const action = GitOuttaHere.buildSuccessfulAction(goodGitPractice);
      expect(action).toBeInstanceOf(SuccessfulBotActionWithMessage);
      expect((<SuccessfulBotActionWithMessage>action).mrNote).toBe(
        `${GitOuttaHere.badNote} ${GitOuttaHere.hashtag}`,
      );
    });
  });
});
