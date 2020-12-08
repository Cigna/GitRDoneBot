import * as HttpStatus from "http-status-codes";
import { MergeRequestApi, SuccessfulGetResponse } from "../../src/gitlab";
import {
  mockGitLabCommit,
  createNGitLabCommits,
  internal_error_500,
  unauthorized_401,
} from "../helpers";
import {
  AuthorizationFailureBotAction,
  BotActionResponse,
  CommitMessages,
  NetworkFailureBotAction,
  SuccessfulBotAction,
} from "../../src/bot_actions";

// TEST FIXTURES
const DYNAMIC_TOTAL_COMMITS = 20;

const DYNAMIC_CALCULATED_THRESHOLD = Math.floor(DYNAMIC_TOTAL_COMMITS * 0.2);

const DEFAULT_THRESHOLD = 2;

const single_commit = new SuccessfulGetResponse(HttpStatus.OK, [
  mockGitLabCommit("Sample", Date.now().toString()),
]);

const less_than_dynamic_threshold_commits = new SuccessfulGetResponse(
  HttpStatus.OK,
  [
    mockGitLabCommit("", Date.now().toString()),
    mockGitLabCommit("", Date.now().toString()),
    mockGitLabCommit("", Date.now().toString()),
    mockGitLabCommit("", Date.now().toString()),
  ],
);

const more_than_dynamic_threshold_commits = new SuccessfulGetResponse(
  HttpStatus.OK,
  createNGitLabCommits(DYNAMIC_TOTAL_COMMITS),
);

const zero_commits = new SuccessfulGetResponse(
  HttpStatus.OK,
  createNGitLabCommits(0),
);

const too_many_one_word_commits = new SuccessfulGetResponse(HttpStatus.OK, [
  mockGitLabCommit("add", Date.now().toString()),
  mockGitLabCommit("Delete three-failures.txt", Date.now().toString()),
  mockGitLabCommit("Update", Date.now().toString()),
  mockGitLabCommit("bug fix", Date.now().toString()),
  mockGitLabCommit("bug::fix", Date.now().toString()),
]);

jest.mock("../../src/gitlab/merge_request_api");

describe("Mock API Test: CommitMessages Class", () => {
  const api = new MergeRequestApi("fake-token", 0, 1, "fake-uri");

  describe("open state", (state = "open") => {
    describe("when there is a single commit", () => {
      let commitMessageResponse: BotActionResponse;

      beforeAll(async () => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValueOnce(single_commit);
        commitMessageResponse = await CommitMessages.analyze(state, api);
      });

      test("should return an instance of SuccessfulBotAction", () => {
        expect(commitMessageResponse.action).toBeInstanceOf(
          SuccessfulBotAction,
        );
      });

      test("calculated threshold is correctly calculated to be default threshold", () => {
        expect(
          commitMessageResponse.computedValues["calculatedThreshold"],
        ).toBe(DEFAULT_THRESHOLD);
      });

      test("goodGitPractice is true", () => {
        expect(
          (<SuccessfulBotAction>commitMessageResponse.action).goodGitPractice,
        ).toBe(true);
      });
      test("mrNote is good with hashtag", () => {
        expect((<SuccessfulBotAction>commitMessageResponse.action).mrNote).toBe(
          `${CommitMessages.goodNote} ${CommitMessages.hashtag}`,
        );
      });
    });

    describe("when total number of commits falls below dynamic calculation threshold", () => {
      let commitMessageResponse: BotActionResponse;

      beforeAll(async () => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValueOnce(
          less_than_dynamic_threshold_commits,
        );
        commitMessageResponse = await CommitMessages.analyze(state, api);
      });

      test("should return an instance of SuccessfulBotAction", () => {
        expect(commitMessageResponse.action).toBeInstanceOf(
          SuccessfulBotAction,
        );
      });

      test("calculated threshold is correctly calculated to be default threshold", () => {
        expect(
          commitMessageResponse.computedValues["calculatedThreshold"],
        ).toBe(DEFAULT_THRESHOLD);
      });

      // because test fixture has all empty strings as commit messages
      test("goodGitPractice is false", () => {
        expect(
          (<SuccessfulBotAction>commitMessageResponse.action).goodGitPractice,
        ).toBe(false);
      });

      // not checking full message here because of the complexity of this Bot Action's message
      test("mrNote is bad with hashtag", () => {
        expect((<SuccessfulBotAction>commitMessageResponse.action).mrNote).toBe(
          `${CommitMessages.badNote} ${CommitMessages.hashtag}`,
        );
      });
    });

    describe("when total number of commits triggers dynamic calculation", () => {
      let commitMessageResponse: BotActionResponse;

      beforeAll(async () => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValueOnce(
          more_than_dynamic_threshold_commits,
        );
        commitMessageResponse = await CommitMessages.analyze(state, api);
      });

      test("should return an instance of SuccessfulBotAction", () => {
        expect(commitMessageResponse.action).toBeInstanceOf(
          SuccessfulBotAction,
        );
      });

      test("calculated threshold is correctly calculated to be 20% of total commits", () => {
        expect(
          commitMessageResponse.computedValues["calculatedThreshold"],
        ).toBe(DYNAMIC_CALCULATED_THRESHOLD);
      });

      // because test fixture has all empty strings as commit messages
      test("goodGitPractice is false", () => {
        expect(
          (<SuccessfulBotAction>commitMessageResponse.action).goodGitPractice,
        ).toBe(false);
      });

      // not checking full message here because of the complexity of this Bot Action's message
      test("mrNote is bad with hashtag", () => {
        expect((<SuccessfulBotAction>commitMessageResponse.action).mrNote).toBe(
          `${CommitMessages.badNote} ${CommitMessages.hashtag}`,
        );
      });
    });

    describe("when the API request fails due to network failure", () => {
      let commitMessageResponse: BotActionResponse;

      beforeAll(async () => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValueOnce(internal_error_500);
        commitMessageResponse = await CommitMessages.analyze(state, api);
      });

      test("should return instance of NetworkFailureBotAction", () => {
        expect(commitMessageResponse.action).toBeInstanceOf(
          NetworkFailureBotAction,
        );
      });
    });

    describe("when the API request fails due to authorization failure", () => {
      let commitMessageResponse: BotActionResponse;

      beforeAll(async () => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValueOnce(unauthorized_401);
        commitMessageResponse = await CommitMessages.analyze(state, api);
      });

      test("should return instance of AuthorizationFailureBotAction", () => {
        expect(commitMessageResponse.action).toBeInstanceOf(
          AuthorizationFailureBotAction,
        );
      });
    });

    describe("when there are no commits", () => {
      let commitMessageResponse: BotActionResponse;

      beforeAll(async () => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValueOnce(zero_commits);
        commitMessageResponse = await CommitMessages.analyze(state, api);
      });

      test("should return instance of SuccessfulBotAction", () => {
        expect(commitMessageResponse.action).toBeInstanceOf(
          SuccessfulBotAction,
        );
      });

      test("calculated threshold is correctly calculated to be default threshold", () => {
        expect(
          commitMessageResponse.computedValues["calculatedThreshold"],
        ).toBe(DEFAULT_THRESHOLD);
      });

      test("goodGitPractice is true", () => {
        expect(
          (<SuccessfulBotAction>commitMessageResponse.action).goodGitPractice,
        ).toBe(true);
      });

      // not checking full message here because of the complexity of this Bot Action's message
      test("mrNote is good with hashtag", () => {
        expect((<SuccessfulBotAction>commitMessageResponse.action).mrNote).toBe(
          `${CommitMessages.goodNote} ${CommitMessages.hashtag}`,
        );
      });
    });

    describe("when there are too many one word commits", () => {
      let commitMessageResponse: BotActionResponse;

      beforeAll(async () => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValueOnce(too_many_one_word_commits);
        commitMessageResponse = await CommitMessages.analyze(state, api);
      });

      test("should return an instance of SuccessfulBotAction", () => {
        expect(commitMessageResponse.action).toBeInstanceOf(
          SuccessfulBotAction,
        );
      });

      test("goodGitPractice is false", () => {
        expect(
          (<SuccessfulBotAction>commitMessageResponse.action).goodGitPractice,
        ).toBe(false);
      });

      test("mrNote is bad with hashtag", () => {
        expect((<SuccessfulBotAction>commitMessageResponse.action).mrNote).toBe(
          `${CommitMessages.badNote} ${CommitMessages.hashtag}`,
        );
      });
    });
  });
});
