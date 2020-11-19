import * as HttpStatus from "http-status-codes";
import {
  FailedResponse,
  MergeRequestApi,
  SuccessfulGetResponse,
} from "../../src/gitlab";
import { GitOuttaHere, BotActionNote } from "../../src/bot_actions";
import { not_found_404, fetch_network_error } from "../helpers";
import { GitOuttaHereNote } from "../../src/bot_actions/git_outta_here/git_outta_here_note";

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

jest.mock("../../src/gitlab/merge_request_api");

describe("Mock API Tests: GitOuttaHere Class", () => {
  const api = new MergeRequestApi("fake-token", 0, 1, "fake-uri");
  describe("(Any state) when 3XX-5XX response from GitLab", () => {
    let gitOuttaHereResponse: GitOuttaHere;

    beforeAll(async (done) => {
      jest.clearAllMocks();
      // @ts-ignore
      api.getSingleMRChanges.mockResolvedValue(not_found_404);
      gitOuttaHereResponse = await GitOuttaHere.from(api);
      done();
    });

    test("should return apiResponse state of FailedResponse", () => {
      expect(gitOuttaHereResponse.apiResponse).toBeInstanceOf(FailedResponse);
    });

    test("goodGitPractice is undefined", () => {
      expect(gitOuttaHereResponse.goodGitPractice).toBe(undefined);
    });

    test("mrNote is checkPermissions", () => {
      expect(gitOuttaHereResponse.mrNote).toBe(
        BotActionNote.checkPermissionsMessage,
      );
    });
  });

  describe("(Any state) when log files exist in MR", () => {
    let gitOuttaHereResponse: GitOuttaHere;

    beforeAll(async (done) => {
      jest.clearAllMocks();
      // @ts-ignore
      api.getSingleMRChanges.mockResolvedValue(log_files_exist);
      gitOuttaHereResponse = await GitOuttaHere.from(api);
      done();
    });

    test("should return apiResponse state of SuccessfulGetResponse", () => {
      expect(gitOuttaHereResponse.apiResponse).toBeInstanceOf(
        SuccessfulGetResponse,
      );
    });

    test("goodGitPractice is false", () => {
      expect(gitOuttaHereResponse.goodGitPractice).toBe(false);
    });

    test("mrNote is bad with hashtag", () => {
      expect(gitOuttaHereResponse.mrNote).toBe(
        `${GitOuttaHereNote.bad} ${GitOuttaHereNote.hashtag}`,
      );
    });
  });

  describe("(Any state) when log files DO NOT exist in MR", () => {
    let gitOuttaHereResponse: GitOuttaHere;

    beforeAll(async (done) => {
      jest.clearAllMocks();
      // @ts-ignore
      api.getSingleMRChanges.mockResolvedValue(no_log_files);
      gitOuttaHereResponse = await GitOuttaHere.from(api);
      done();
    });

    test("should return apiResponse state of SuccessfulGetResponse", () => {
      expect(gitOuttaHereResponse.apiResponse).toBeInstanceOf(
        SuccessfulGetResponse,
      );
    });

    test("goodGitPractice is true", () => {
      expect(gitOuttaHereResponse.goodGitPractice).toBe(true);
    });

    test("mrNote is noAction", () => {
      expect(gitOuttaHereResponse.mrNote).toBe(
        `${BotActionNote.noActionMessage}`,
      );
    });
  });

  describe("Git Outta Here Action: Zero changes in MR", () => {
    let gitOuttaHereResponse: GitOuttaHere;

    beforeAll(async (done) => {
      jest.clearAllMocks();
      // @ts-ignore
      api.getSingleMRChanges.mockResolvedValue(changes_equal_zero);
      gitOuttaHereResponse = await GitOuttaHere.from(api);
      done();
    });

    test("should return apiResponse state of SuccessfulGetResponse", () => {
      expect(gitOuttaHereResponse.apiResponse).toBeInstanceOf(
        SuccessfulGetResponse,
      );
    });

    test("goodGitPractice is true", () => {
      expect(gitOuttaHereResponse.goodGitPractice).toBe(true);
    });

    test("mrNote is noAction", () => {
      expect(gitOuttaHereResponse.mrNote).toBe(
        `${BotActionNote.noActionMessage}`,
      );
    });
  });

  describe("when there is a fetch network error", () => {
    let gitOuttaHereResponse: GitOuttaHere;

    beforeAll(async (done) => {
      jest.clearAllMocks();
      // @ts-ignore
      api.getSingleMRChanges.mockResolvedValue(fetch_network_error);
      gitOuttaHereResponse = await GitOuttaHere.from(api);
      done();
    });

    test("should return apiResponse state of FailedResponse", () => {
      expect(gitOuttaHereResponse.apiResponse).toBeInstanceOf(FailedResponse);
    });
  });
});
