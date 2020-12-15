import * as HttpStatus from "http-status-codes";
import { GitLabApi, SuccessfulGetResponse } from "../../src/gitlab";
import {
  AuthorizationFailureBotAction,
  GitOuttaHere,
  NetworkFailureBotAction,
  SuccessfulBotAction,
  SuccessfulBotActionWithNothingToSay,
} from "../../src/bot_actions";
import { unauthorized_401, fetch_network_error } from "../helpers";

// TEST FIXTURES
const log_files_exist = new SuccessfulGetResponse(HttpStatus.OK, {
  changes: [
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
  ],
});

const no_log_files = new SuccessfulGetResponse(HttpStatus.OK, {
  changes: [
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
  ],
});

const changes_equal_zero = new SuccessfulGetResponse(200, {
  changes: [],
});

// TESTS

jest.mock("../../src/gitlab/gitlab_api");

describe("Mock API Tests: GitOuttaHere Class", () => {
  const api = new GitLabApi("fake-token", 0, 1, "fake-uri");

  describe("When the API request fails due to authorization failure", () => {
    let gitOuttaHereResponse;

    beforeAll(async (done) => {
      jest.clearAllMocks();
      // @ts-ignore
      api.getSingleMRChanges.mockResolvedValue(unauthorized_401);
      gitOuttaHereResponse = await GitOuttaHere.analyze(api);
      done();
    });

    test("should return instance of AuthorizationFailureBotAction", () => {
      expect(gitOuttaHereResponse.action).toBeInstanceOf(
        AuthorizationFailureBotAction,
      );
    });
  });

  describe("When the API request fails due to network failure", () => {
    let gitOuttaHereResponse;

    beforeAll(async (done) => {
      jest.clearAllMocks();
      // @ts-ignore
      api.getSingleMRChanges.mockResolvedValue(fetch_network_error);
      gitOuttaHereResponse = await GitOuttaHere.analyze(api);
      done();
    });

    test("should return instance of should return instance of NetworkFailureBotAction", () => {
      expect(gitOuttaHereResponse.action).toBeInstanceOf(
        NetworkFailureBotAction,
      );
    });
  });

  describe("When log files exist in MR", () => {
    let gitOuttaHereResponse;

    beforeAll(async (done) => {
      jest.clearAllMocks();
      // @ts-ignore
      api.getSingleMRChanges.mockResolvedValue(log_files_exist);
      gitOuttaHereResponse = await GitOuttaHere.analyze(api);
      done();
    });

    test("should return instance of SuccessfulBotAction", () => {
      expect(gitOuttaHereResponse.action).toBeInstanceOf(SuccessfulBotAction);
    });

    test("goodGitPractice is false", () => {
      expect(
        (<SuccessfulBotAction>gitOuttaHereResponse.action).goodGitPractice,
      ).toBe(false);
    });

    test("mrNote is bad with hashtag", () => {
      expect((<SuccessfulBotAction>gitOuttaHereResponse.action).mrNote).toBe(
        `${GitOuttaHere.badNote} ${GitOuttaHere.hashtag}`,
      );
    });
  });

  describe("When log files DO NOT exist in MR", () => {
    let gitOuttaHereResponse;

    beforeAll(async (done) => {
      jest.clearAllMocks();
      // @ts-ignore
      api.getSingleMRChanges.mockResolvedValue(no_log_files);
      gitOuttaHereResponse = await GitOuttaHere.analyze(api);
      done();
    });

    test("should return instance of SuccessfulBotActionWithNothingToSay", () => {
      expect(gitOuttaHereResponse.action).toBeInstanceOf(
        SuccessfulBotActionWithNothingToSay,
      );
    });

    test("goodGitPractice is true", () => {
      expect(
        (<SuccessfulBotAction>gitOuttaHereResponse.action).goodGitPractice,
      ).toBe(true);
    });
  });

  describe("Git Outta Here Action: Zero changes in MR", () => {
    let gitOuttaHereResponse;

    beforeAll(async (done) => {
      jest.clearAllMocks();
      // @ts-ignore
      api.getSingleMRChanges.mockResolvedValue(changes_equal_zero);
      gitOuttaHereResponse = await GitOuttaHere.analyze(api);
      done();
    });

    test("should return instance of SuccessfulBotActionWithNothingToSay", () => {
      expect(gitOuttaHereResponse.action).toBeInstanceOf(
        SuccessfulBotActionWithNothingToSay,
      );
    });

    test("goodGitPractice is true", () => {
      expect(
        (<SuccessfulBotAction>gitOuttaHereResponse.action).goodGitPractice,
      ).toBe(true);
    });
  });
});
