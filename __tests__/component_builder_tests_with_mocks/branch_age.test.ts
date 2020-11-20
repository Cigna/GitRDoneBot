import * as HttpStatus from "http-status-codes";
import { MergeRequestApi, SuccessfulGetResponse } from "../../src/gitlab";
import {
  mockGitLabCommit,
  fetch_network_error,
  unauthorized_401,
  not_found_404,
} from "../helpers";
import {
  BotActionResponse,
  BranchAge,
  CommonMessages,
  FailedBotAction,
  SuccessfulBotAction,
  SuccessfulBotActionWithNothingToSay,
} from "../../src/bot_actions";
import { BotActionConfig } from "../../src/custom_config/bot_action_config";
import { BranchAgeDefaults } from "../../src/custom_config/action_config_defaults";

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
  const api = new MergeRequestApi("fake-token", 0, 1, "fake-uri");

  describe("open state", (state = "open") => {
    describe("when oldest commit is greater than threshold", () => {
      let branchAgeResponse: BotActionResponse;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValue(old_commits_gitlab_response);
        branchAgeResponse = await BranchAge.analyze(state, api, customConfig);
        done();
      });

      test("should return an instance of SuccessfulBotAction", () => {
        expect(branchAgeResponse.action).toBeInstanceOf(SuccessfulBotAction);
      });

      test("goodGitPractice is false", () => {
        expect(
          (<SuccessfulBotAction>branchAgeResponse.action).goodGitPractice,
        ).toBe(false);
      });

      test("mrNote is bad with hashtag", () => {
        expect((<SuccessfulBotAction>branchAgeResponse.action).mrNote).toBe(
          `${BranchAge.bad} ${BranchAge.hashtag}`,
        );
      });

      test("oldestCommit title is 'Oldest Commit'", () => {
        expect(branchAgeResponse.computedValues["oldestCommit"].title).toBe(
          "Oldest commit",
        );
      });
    });

    describe("when oldest commit is less than threshold", () => {
      let branchAgeResponse: BotActionResponse;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValue(new_commits_gitlab_response);
        branchAgeResponse = await BranchAge.analyze(state, api, customConfig);
        done();
      });

      test("should return apiResponse state of SuccessfulGetResponse", () => {
        expect(branchAgeResponse.action).toBeInstanceOf(SuccessfulBotAction);
      });

      test("oldestCommit title is 'Oldest Commit'", () => {
        expect(branchAgeResponse.computedValues["oldestCommit"].title).toBe(
          "Oldest commit",
        );
      });

      test("goodGitPractice is true", () => {
        expect(
          (<SuccessfulBotAction>branchAgeResponse.action).goodGitPractice,
        ).toBe(true);
      });

      test("mrNote is good with hashtag", () => {
        expect((<SuccessfulBotAction>branchAgeResponse.action).mrNote).toBe(
          `${BranchAge.good} ${BranchAge.hashtag}`,
        );
      });
    });

    describe("when oldest commit is equal to threshold", () => {
      let branchAgeResponse: BotActionResponse;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValue(
          threshold_commits_gitlab_response,
        );
        branchAgeResponse = await BranchAge.analyze(state, api, customConfig);
        done();
      });

      test("should return apiResponse state of SuccessfulGetResponse", () => {
        expect(branchAgeResponse.action).toBeInstanceOf(SuccessfulBotAction);
      });

      test("oldestCommit title is 'Oldest Commit'", () => {
        expect(branchAgeResponse.computedValues["oldestCommit"].title).toBe(
          "Oldest commit",
        );
      });

      test("goodGitPractice is true", () => {
        expect(
          (<SuccessfulBotAction>branchAgeResponse.action).goodGitPractice,
        ).toBe(true);
      });

      test("mrNote is good with hashtag", () => {
        expect((<SuccessfulBotAction>branchAgeResponse.action).mrNote).toBe(
          `${BranchAge.good} ${BranchAge.hashtag}`,
        );
      });
    });

    describe("when commit array is empty", () => {
      let branchAgeResponse: BotActionResponse;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValue(
          new SuccessfulGetResponse(200, []),
        );
        branchAgeResponse = await BranchAge.analyze(state, api, customConfig);
        done();
      });

      test("should return apiResponse state of SuccessfulGetResponse", () => {
        expect(branchAgeResponse.action).toBeInstanceOf(SuccessfulBotAction);
      });

      test("goodGitPractice is true", () => {
        expect(
          (<SuccessfulBotAction>branchAgeResponse.action).goodGitPractice,
        ).toBe(true);
      });

      test("mrNote is good with hashtag", () => {
        expect((<SuccessfulBotAction>branchAgeResponse.action).mrNote).toBe(
          `${BranchAge.good} ${BranchAge.hashtag}`,
        );
      });
    });

    describe("when fetch network error", () => {
      let branchAgeResponse: BotActionResponse;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValue(fetch_network_error);
        branchAgeResponse = await BranchAge.analyze(state, api, customConfig);
        done();
      });

      test("should return apiResponse state of FailedResponse", () => {
        expect(branchAgeResponse.action).toBeInstanceOf(FailedBotAction);
      });
    });
  });

  describe("any state", (state = "any") => {
    describe("when 401 response received from GitLab", () => {
      let branchAgeResponse: BotActionResponse;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValue(unauthorized_401);
        branchAgeResponse = await BranchAge.analyze(state, api, customConfig);
        done();
      });

      test("should return apiResponse state of FailedResponse", () => {
        expect(branchAgeResponse.action).toBeInstanceOf(FailedBotAction);
      });

      test("mrNote === checkPermissionsMessage", () => {
        expect((<FailedBotAction>branchAgeResponse.action).mrNote).toBe(
          CommonMessages.checkPermissionsMessage,
        );
      });
    });

    describe("when 404 response received from GitLab", () => {
      let branchAgeResponse: BotActionResponse;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValue(not_found_404);
        branchAgeResponse = await BranchAge.analyze(state, api, customConfig);
        done();
      });

      test("should return apiResponse state of FailedResponse", () => {
        expect(branchAgeResponse.action).toBeInstanceOf(FailedBotAction);
      });

      test("mrNote === checkPermissionsMessage", () => {
        expect((<FailedBotAction>branchAgeResponse.action).mrNote).toBe(
          CommonMessages.checkPermissionsMessage,
        );
      });
    });
  });
});
