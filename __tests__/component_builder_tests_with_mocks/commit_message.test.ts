import * as HttpStatus from "http-status-codes";
import {
  FailedResponse,
  MergeRequestApi,
  SuccessfulGetResponse,
} from "../../src/gitlab";
import {
  mockGitLabCommit,
  createNGitLabCommits,
  internal_error_500,
} from "../helpers";
import { winlog } from "../../src/util";
import { CommitMessages } from "../../src/bot_actions";
import { CommitMessagesNote } from "../../src/bot_actions/commit_messages/commit_message_note";

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
  const api = new MergeRequestApi("fake-token", 0, 1, "fake-uri", winlog);

  describe("open state", (state = "open") => {
    describe("when there is a single commit", (constructiveFeedbackOnlyToggle = false) => {
      let commitMessageResponse: CommitMessages;
      beforeAll(async () => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValueOnce(single_commit);
        commitMessageResponse = await CommitMessages.from(
          state,
          api,
          constructiveFeedbackOnlyToggle,
          winlog,
        );
      });

      test("apiRequest values reflect successful API call", () => {
        expect(commitMessageResponse.apiResponse).toBeInstanceOf(
          SuccessfulGetResponse,
        );
        expect(commitMessageResponse.apiResponse.statusCode).toEqual(
          HttpStatus.OK,
        );
        expect(commitMessageResponse.apiResponse.message).toEqual(
          HttpStatus.getStatusText(HttpStatus.OK),
        );
      });

      test("calculated threshold is correctly calculated to be default threshold", () => {
        expect(commitMessageResponse.calculatedThreshold).toBe(
          DEFAULT_THRESHOLD,
        );
      });

      test("goodGitPractice is true", () => {
        expect(commitMessageResponse.goodGitPractice).toBe(true);
      });

      test("mrNote is good with hashtag", () => {
        expect(commitMessageResponse.mrNote).toBe(
          `${CommitMessagesNote.good} ${CommitMessagesNote.hashtag}`,
        );
      });
    });

    describe("when total number of commits falls below dynamic calculation threshold", (constructiveFeedbackOnlyToggle = false) => {
      let commitMessageResponse: CommitMessages;
      beforeAll(async () => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValueOnce(
          less_than_dynamic_threshold_commits,
        );
        commitMessageResponse = await CommitMessages.from(
          state,
          api,
          constructiveFeedbackOnlyToggle,
          winlog,
        );
      });

      test("apiRequest values reflect successful API call", async () => {
        expect(commitMessageResponse.apiResponse).toBeInstanceOf(
          SuccessfulGetResponse,
        );
        expect(commitMessageResponse.apiResponse.statusCode).toEqual(
          HttpStatus.OK,
        );
        expect(commitMessageResponse.apiResponse.message).toEqual(
          HttpStatus.getStatusText(HttpStatus.OK),
        );
      });

      test("calculated threshold is correctly calculated to be default threshold", () => {
        expect(commitMessageResponse.calculatedThreshold).toBe(
          DEFAULT_THRESHOLD,
        );
      });

      // because test fixture has all empty strings as commit messages
      test("goodGitPractice is false", async () => {
        expect(commitMessageResponse.goodGitPractice).toBe(false);
      });

      // not checking full message here because of the complexity of this Bot Action's message
      test("mrNote is bad with hashtag", async () => {
        expect(commitMessageResponse.mrNote).toContain(
          `${CommitMessagesNote.bad}`,
        );
      });
    });

    describe("when total number of commits triggers dynamic calculation", (constructiveFeedbackOnlyToggle = false) => {
      let commitMessageResponse: CommitMessages;
      beforeAll(async () => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValueOnce(
          more_than_dynamic_threshold_commits,
        );
        commitMessageResponse = await CommitMessages.from(
          state,
          api,
          constructiveFeedbackOnlyToggle,
          winlog,
        );
      });

      test("apiRequest values reflect successful API call", async () => {
        expect(commitMessageResponse.apiResponse).toBeInstanceOf(
          SuccessfulGetResponse,
        );
        expect(commitMessageResponse.apiResponse.statusCode).toEqual(
          HttpStatus.OK,
        );
        expect(commitMessageResponse.apiResponse.message).toEqual(
          HttpStatus.getStatusText(HttpStatus.OK),
        );
      });

      test("calculated threshold is correctly calculated to be 20% of total commits", () => {
        expect(commitMessageResponse.calculatedThreshold).toBe(
          DYNAMIC_CALCULATED_THRESHOLD,
        );
      });

      // because test fixture has all empty strings as commit messages
      test("goodGitPractice is false", async () => {
        expect(commitMessageResponse.goodGitPractice).toBe(false);
      });

      // not checking full message here because of the complexity of this Bot Action's message
      test("mrNote is bad with hashtag", async () => {
        expect(commitMessageResponse.mrNote).toContain(
          `${CommitMessagesNote.bad}`,
        );
      });
    });

    describe("when the API request fails", (constructiveFeedbackOnlyToggle = false) => {
      let commitMessageResponse: CommitMessages;
      beforeAll(async () => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValueOnce(internal_error_500);
        commitMessageResponse = await CommitMessages.from(
          state,
          api,
          constructiveFeedbackOnlyToggle,
          winlog,
        );
      });

      test("apiRequest values reflect failed API call", () => {
        expect(commitMessageResponse.apiResponse).toBeInstanceOf(
          FailedResponse,
        );
        expect(commitMessageResponse.apiResponse.statusCode).toEqual(
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
        expect(commitMessageResponse.apiResponse.message).toEqual(
          HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
        );
      });

      test("calculated threshold is correctly left to be the default threshold", () => {
        expect(commitMessageResponse.calculatedThreshold).toBe(
          DEFAULT_THRESHOLD,
        );
      });

      test("goodGitPractice is false", () => {
        expect(commitMessageResponse.goodGitPractice).toBe(undefined);
      });

      // not checking full message here because of the complexity of this Bot Action's message
      test("mrNote is the check permissions message", async () => {
        expect(commitMessageResponse.mrNote).toEqual(
          CommitMessagesNote.checkPermissionsMessage,
        );
      });
    });

    describe("when there are no commits", (constructiveFeedbackOnlyToggle = false) => {
      let commitMessageResponse: CommitMessages;
      beforeAll(async () => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValueOnce(zero_commits);
        commitMessageResponse = await CommitMessages.from(
          state,
          api,
          constructiveFeedbackOnlyToggle,
          winlog,
        );
      });

      test("apiRequest values reflect a successful API call", () => {
        expect(commitMessageResponse.apiResponse).toBeInstanceOf(
          SuccessfulGetResponse,
        );
        expect(commitMessageResponse.apiResponse.statusCode).toEqual(
          HttpStatus.OK,
        );
        expect(commitMessageResponse.apiResponse.message).toEqual(
          HttpStatus.getStatusText(HttpStatus.OK),
        );
      });

      test("calculated threshold is correctly left to be the default threshold", () => {
        expect(commitMessageResponse.calculatedThreshold).toBe(
          DEFAULT_THRESHOLD,
        );
      });

      test("goodGitPractice is undefined", () => {
        expect(commitMessageResponse.goodGitPractice).toBe(undefined);
      });

      // not checking full message here because of the complexity of this Bot Action's message
      test("mrNote is good message", async () => {
        expect(commitMessageResponse.mrNote).toEqual(
          CommitMessagesNote.noActionMessage,
        );
      });
    });

    describe("when there are too many one word commits", (constructiveFeedbackOnlyToggle = false) => {
      let commitMessageResponse: CommitMessages;
      beforeAll(async () => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getSingleMRCommits.mockResolvedValueOnce(too_many_one_word_commits);
        commitMessageResponse = await CommitMessages.from(
          state,
          api,
          constructiveFeedbackOnlyToggle,
          winlog,
        );
      });

      test("apiRequest values reflect successful api call", () => {
        expect(commitMessageResponse.apiResponse).toEqual(
          too_many_one_word_commits,
        );
      });

      test("Should return goodGitPractice === false", () => {
        expect(commitMessageResponse.goodGitPractice).toBe(false);
      });

      test("Should return mrNote === bad", () => {
        expect(commitMessageResponse.mrNote).toBe(
          `${CommitMessagesNote.bad} ${CommitMessagesNote.hashtag}`,
        );
      });
    });
  });
});
