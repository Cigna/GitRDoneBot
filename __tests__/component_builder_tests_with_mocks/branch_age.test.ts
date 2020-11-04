import * as HttpStatus from "http-status-codes";
import {
  FailedResponse,
  MergeRequestApi,
  SuccessfulGetResponse,
} from "../../src/gitlab";
import {
  mockGitLabCommit,
  fetch_network_error,
  unauthorized_401,
  not_found_404,
} from "../helpers";
import { winlog } from "../../src/util";
import { BranchAge, BotActionNote } from "../../src/bot_actions";
import { BotActionConfig } from "../../src/custom_config/bot_action_config";
import { BranchAgeDefaults } from "../../src/custom_config/action_config_defaults";
import { BranchAgeNote } from "../../src/bot_actions/branch_age/branch_age_note";

// TEST FIXTURES
const customConfig = BotActionConfig.from(BranchAgeDefaults, {});

const thresholdDate = new Date();
thresholdDate.setDate(thresholdDate.getDate() - 7);
thresholdDate.setHours(thresholdDate.getHours() + 1);

const old_commits_gitlab_response = new SuccessfulGetResponse(HttpStatus.OK, [
  mockGitLabCommit("2nd Oldest commit", "2012-09-20T11:50:22+03:00"),
  mockGitLabCommit("Oldest commit", "2011-09-20T11:50:22+03:00"),
  mockGitLabCommit("3rd Oldest commit", new Date().toString()),
]);

const new_commits_gitlab_response = new SuccessfulGetResponse(HttpStatus.OK, [
  mockGitLabCommit("Oldest commit", new Date().toString()),
]);

const threshold_commits_gitlab_response = new SuccessfulGetResponse(
  HttpStatus.OK,
  [mockGitLabCommit("Oldest commit", thresholdDate.toString())],
);

// TESTS
jest.mock("../../src/gitlab/merge_request_api");

describe("Mock API Test: BranchAge Class", () => {
  const api = new MergeRequestApi("fake-token", 0, 1, "fake-uri", winlog);

  describe("open state", (state = "open") => {
    describe("when oldest commit is greater than threshold", () => {
      let branchAgeResponse: BranchAge;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValue(old_commits_gitlab_response);
        branchAgeResponse = await BranchAge.from(
          state,
          api,
          customConfig,
          winlog,
        );
        done();
      });

      test("apiRequest values reflect successful API call", () => {
        expect(branchAgeResponse.apiResponse).toBeInstanceOf(
          SuccessfulGetResponse,
        );
        expect(branchAgeResponse.apiResponse.statusCode).toEqual(HttpStatus.OK);
        expect(branchAgeResponse.apiResponse.message).toEqual(
          HttpStatus.getStatusText(HttpStatus.OK),
        );
      });

      test("goodGitPractice is false", () => {
        expect(branchAgeResponse.goodGitPractice).toBe(false);
      });

      test("mrNote is bad with hashtag", () => {
        expect(branchAgeResponse.mrNote).toBe(
          `${BranchAgeNote.bad} ${BranchAgeNote.hashtag}`,
        );
      });

      test("oldestCommit title is 'Oldest Commit'", () => {
        expect(branchAgeResponse.oldestCommit.title).toBe("Oldest commit");
      });
    });

    describe("when oldest commit is less than threshold", () => {
      let branchAgeResponse: BranchAge;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValue(new_commits_gitlab_response);
        branchAgeResponse = await BranchAge.from(
          state,
          api,
          customConfig,
          winlog,
        );
        done();
      });

      test("apiRequest values reflect successful API call", () => {
        expect(branchAgeResponse.apiResponse).toBeInstanceOf(
          SuccessfulGetResponse,
        );
        expect(branchAgeResponse.apiResponse.statusCode).toEqual(HttpStatus.OK);
        expect(branchAgeResponse.apiResponse.message).toEqual(
          HttpStatus.getStatusText(HttpStatus.OK),
        );
      });

      test("oldestCommit title is 'Oldest Commit'", () => {
        expect(branchAgeResponse.oldestCommit.title).toBe("Oldest commit");
      });

      test("goodGitPractice is true", () => {
        expect(branchAgeResponse.goodGitPractice).toBe(true);
      });

      test("mrNote is good with hashtag", () => {
        expect(branchAgeResponse.mrNote).toBe(
          `${BranchAgeNote.good} ${BranchAgeNote.hashtag}`,
        );
      });
    });

    describe("when oldest commit is equal to threshold", () => {
      let branchAgeResponse: BranchAge;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValue(
          threshold_commits_gitlab_response,
        );
        branchAgeResponse = await BranchAge.from(
          state,
          api,
          customConfig,
          winlog,
        );
        done();
      });

      test("apiRequest values reflect successful API call", () => {
        expect(branchAgeResponse.apiResponse).toBeInstanceOf(
          SuccessfulGetResponse,
        );
        expect(branchAgeResponse.apiResponse.statusCode).toEqual(HttpStatus.OK);
        expect(branchAgeResponse.apiResponse.message).toEqual(
          HttpStatus.getStatusText(HttpStatus.OK),
        );
      });

      test("oldestCommit title is 'Oldest Commit'", () => {
        expect(branchAgeResponse.oldestCommit.title).toBe("Oldest commit");
      });

      test("goodGitPractice is true", () => {
        expect(branchAgeResponse.goodGitPractice).toBe(true);
      });

      test("mrNote is good with hashtag", () => {
        expect(branchAgeResponse.mrNote).toBe(
          `${BranchAgeNote.good} ${BranchAgeNote.hashtag}`,
        );
      });
    });

    describe("when commit array is empty", () => {
      let branchAgeResponse: BranchAge;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValue(
          new SuccessfulGetResponse(200, []),
        );
        branchAgeResponse = await BranchAge.from(
          state,
          api,
          customConfig,
          winlog,
        );
        done();
      });

      test("apiRequest values reflect successful API call", () => {
        expect(branchAgeResponse.apiResponse).toBeInstanceOf(
          SuccessfulGetResponse,
        );
        expect(branchAgeResponse.apiResponse.statusCode).toEqual(HttpStatus.OK);
        expect(branchAgeResponse.apiResponse.message).toEqual(
          HttpStatus.getStatusText(HttpStatus.OK),
        );
      });

      test("oldestCommit is undefined", () => {
        expect(branchAgeResponse.oldestCommit).toEqual(undefined);
      });

      test("goodGitPractice is true", () => {
        expect(branchAgeResponse.goodGitPractice).toBe(true);
      });

      test("mrNote is good with hashtag", () => {
        expect(branchAgeResponse.mrNote).toBe(
          `${BranchAgeNote.good} ${BranchAgeNote.hashtag}`,
        );
      });
    });

    describe("when fetch network error", () => {
      let branchAgeResponse: BranchAge;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValue(fetch_network_error);
        branchAgeResponse = await BranchAge.from(
          state,
          api,
          customConfig,
          winlog,
        );
        done();
      });

      test("apiRequest values reflect unknown network error", () => {
        expect(branchAgeResponse.apiResponse).toBeInstanceOf(FailedResponse);
        expect(branchAgeResponse.apiResponse).toEqual(fetch_network_error);
      });
    });
  });

  describe("any state", (state = undefined) => {
    describe("when 401 response received from GitLab", () => {
      let branchAgeResponse: BranchAge;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValue(unauthorized_401);
        branchAgeResponse = await BranchAge.from(
          state,
          api,
          customConfig,
          winlog,
        );
        done();
      });

      test("apiRequest values reflect not found API call", () => {
        expect(branchAgeResponse.apiResponse).toBeInstanceOf(FailedResponse);
        expect(branchAgeResponse.apiResponse.statusCode).toEqual(
          HttpStatus.UNAUTHORIZED,
        );
        expect(branchAgeResponse.apiResponse.message).toEqual(
          HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
        );
      });

      test("oldestCommit is undefined", () => {
        expect(branchAgeResponse.oldestCommit).toBe(undefined);
      });

      test("mrNote === checkPermissionsMessage", () => {
        expect(branchAgeResponse.mrNote).toBe(
          BotActionNote.checkPermissionsMessage,
        );
      });

      test("goodGitPractice is undefined", () => {
        expect(branchAgeResponse.goodGitPractice).toBe(undefined);
      });
    });

    describe("when 404 response received from GitLab", () => {
      let branchAgeResponse: BranchAge;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValue(not_found_404);
        branchAgeResponse = await BranchAge.from(
          state,
          api,
          customConfig,
          winlog,
        );
        done();
      });

      test("apiRequest values reflect not found API call", () => {
        expect(branchAgeResponse.apiResponse).toBeInstanceOf(FailedResponse);
        expect(branchAgeResponse.apiResponse.statusCode).toEqual(
          HttpStatus.NOT_FOUND,
        );
        expect(branchAgeResponse.apiResponse.message).toEqual(
          HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
        );
      });

      test("oldestCommit is undefined", () => {
        expect(branchAgeResponse.oldestCommit).toBe(undefined);
      });

      test("mrNote === checkPermissionsMessage", () => {
        expect(branchAgeResponse.mrNote).toBe(
          BotActionNote.checkPermissionsMessage,
        );
      });

      test("goodGitPractice is undefined", () => {
        expect(branchAgeResponse.goodGitPractice).toBe(undefined);
      });
    });
  });
});
