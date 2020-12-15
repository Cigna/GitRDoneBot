import * as HttpStatus from "http-status-codes";
import { GitLabApi, SuccessfulGetResponse } from "../../src/gitlab";
import {
  createNMergeRequestObjects,
  fetch_network_error,
  unauthorized_401,
} from "../helpers";
import {
  AuthorizationFailureBotAction,
  NetworkFailureBotAction,
  SuccessfulBotAction,
  SuccessfulBotActionWithNothingToSay,
  TooManyAssigned,
} from "../../src/bot_actions";
import { BotActionConfig } from "../../src/custom_config/bot_action_config";
import { TooManyAssignedDefaults } from "../../src/custom_config/action_config_defaults";

// TEST FIXTURES
const customConfig = BotActionConfig.from(TooManyAssignedDefaults, {});
const defaultAssignedMRThreshold: number = 3;
const getResponseWhereAssignedMRSBelowThreshold: SuccessfulGetResponse = new SuccessfulGetResponse(
  HttpStatus.OK,
  createNMergeRequestObjects(defaultAssignedMRThreshold - 1),
);
const getResponseWhereAssignedMRSEqualsThreshold: SuccessfulGetResponse = new SuccessfulGetResponse(
  HttpStatus.OK,
  createNMergeRequestObjects(defaultAssignedMRThreshold),
);
const getResponseWhereAssignedMRSNotInThreshold: SuccessfulGetResponse = new SuccessfulGetResponse(
  HttpStatus.OK,
  createNMergeRequestObjects(defaultAssignedMRThreshold + 1),
);

// TESTS

jest.mock("../../src/gitlab/gitlab_api");

describe("Mock API Tests: TooManyAssigned Class", () => {
  const api: GitLabApi = new GitLabApi("fake-token", 0, 1, "fake-uri");
  describe("Open State", (state = "open") => {
    describe("When too many assigned === false", (assigneeId = 1) => {
      let tooManyAssignedResponse;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMergeRequestsByAssigneeId.mockResolvedValue(
          getResponseWhereAssignedMRSBelowThreshold,
        );
        tooManyAssignedResponse = await TooManyAssigned.analyze(
          state,
          api,
          customConfig,
          assigneeId,
        );
        done();
      });

      test("should return instance of SuccessfulBotActionWithNothingToSay", () => {
        expect(tooManyAssignedResponse.action).toBeInstanceOf(
          SuccessfulBotActionWithNothingToSay,
        );
      });

      test("should return goodGitPractice === true", () => {
        expect(
          (<SuccessfulBotActionWithNothingToSay>tooManyAssignedResponse.action)
            .goodGitPractice,
        ).toBe(true);
      });
    });

    describe("When too many assigned === false and assigned MRs equals threshold", (assigneeId = 1) => {
      let tooManyAssignedResponse;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMergeRequestsByAssigneeId.mockResolvedValue(
          getResponseWhereAssignedMRSEqualsThreshold,
        );
        tooManyAssignedResponse = await TooManyAssigned.analyze(
          state,
          api,
          customConfig,
          assigneeId,
        );
        done();
      });

      test("should return instance of SuccessfulBotActionWithNothingToSay", () => {
        expect(tooManyAssignedResponse.action).toBeInstanceOf(
          SuccessfulBotActionWithNothingToSay,
        );
      });

      test("should return goodGitPractice === true", () => {
        expect(
          (<SuccessfulBotActionWithNothingToSay>tooManyAssignedResponse.action)
            .goodGitPractice,
        ).toBe(true);
      });
    });

    describe("When too many assigned === true", (assigneeId = 1) => {
      let tooManyAssignedResponse;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMergeRequestsByAssigneeId.mockResolvedValue(
          getResponseWhereAssignedMRSNotInThreshold,
        );
        tooManyAssignedResponse = await TooManyAssigned.analyze(
          state,
          api,
          customConfig,
          assigneeId,
        );
        done();
      });

      test("should return instance of SuccessfulBotAction", () => {
        expect(tooManyAssignedResponse.action).toBeInstanceOf(
          SuccessfulBotAction,
        );
      });

      test("should return goodGitPractice === false", () => {
        expect(
          (<SuccessfulBotAction>tooManyAssignedResponse.action).goodGitPractice,
        ).toBe(false);
      });

      test("should return mrNote === bad", () => {
        expect(
          (<SuccessfulBotAction>tooManyAssignedResponse.action).mrNote,
        ).toBe(`${TooManyAssigned.badNote} ${TooManyAssigned.hashtag}`);
      });
    });

    describe("When assigneeId === null", (assigneeId = null) => {
      let tooManyAssignedResponse;

      beforeAll(async (done) => {
        tooManyAssignedResponse = await TooManyAssigned.analyze(
          state,
          api,
          customConfig,
          assigneeId,
        );
        done();

        test("should return instance of SuccessfulBotActionWithNothingToSay", () => {
          expect(tooManyAssignedResponse.action).toBeInstanceOf(
            SuccessfulBotActionWithNothingToSay,
          );
        });

        test("should return statusCode 204 to indicated no API request needed", () => {
          expect(tooManyAssignedResponse.statusCode).toBe(
            HttpStatus.NO_CONTENT,
          );
        });

        test("should return goodGitPractice === true", () => {
          expect(
            (<SuccessfulBotActionWithNothingToSay>(
              tooManyAssignedResponse.action
            )).goodGitPractice,
          ).toBe(true);
        });
      });
    });

    describe("When the API request for getMergeRequestsByAssigneeId fails due to authorization failure", (assigneeId = 1) => {
      let tooManyAssignedResponse;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMergeRequestsByAssigneeId.mockResolvedValue(unauthorized_401);
        tooManyAssignedResponse = await TooManyAssigned.analyze(
          state,
          api,
          customConfig,
          assigneeId,
        );
        done();
      });

      test("should return instance of AuthorizationFailureBotAction", () => {
        expect(tooManyAssignedResponse.action).toBeInstanceOf(
          AuthorizationFailureBotAction,
        );
      });
    });

    describe("When the API request for getMergeRequestsByAssigneeId fails due to network failure", (assigneeId = 1) => {
      let tooManyAssignedResponse;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMergeRequestsByAssigneeId.mockResolvedValue(fetch_network_error);
        tooManyAssignedResponse = await TooManyAssigned.analyze(
          state,
          api,
          customConfig,
          assigneeId,
        );
        done();
      });

      test("should return instance of NetworkFailureBotAction", () => {
        expect(tooManyAssignedResponse.action).toBeInstanceOf(
          NetworkFailureBotAction,
        );
      });
    });
  });

  describe("Update State", (state = "update") => {
    describe("When too many assigned === false", (assigneeId = 1) => {
      let tooManyAssignedResponse;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMergeRequestsByAssigneeId.mockResolvedValue(
          getResponseWhereAssignedMRSBelowThreshold,
        );
        tooManyAssignedResponse = await TooManyAssigned.analyze(
          state,
          api,
          customConfig,
          assigneeId,
        );
        done();
      });
      test("should return instance of SuccessfulBotActionWithNothingToSay", () => {
        expect(tooManyAssignedResponse.action).toBeInstanceOf(
          SuccessfulBotActionWithNothingToSay,
        );
      });

      test("should return goodGitPractice === true", () => {
        expect(
          (<SuccessfulBotActionWithNothingToSay>tooManyAssignedResponse.action)
            .goodGitPractice,
        ).toBe(true);
      });
    });

    describe("When too many assigned === true", (assigneeId = 1) => {
      let tooManyAssignedResponse;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMergeRequestsByAssigneeId.mockResolvedValue(
          getResponseWhereAssignedMRSNotInThreshold,
        );
        tooManyAssignedResponse = await TooManyAssigned.analyze(
          state,
          api,
          customConfig,
          assigneeId,
        );
        done();
      });

      test("should return instance of SuccessfulBotAction", () => {
        expect(tooManyAssignedResponse.action).toBeInstanceOf(
          SuccessfulBotAction,
        );
      });

      test("should return goodGitPractice === false", () => {
        expect(
          (<SuccessfulBotAction>tooManyAssignedResponse.action).goodGitPractice,
        ).toBe(false);
      });

      test("should return mrNote === bad", () => {
        expect(
          (<SuccessfulBotAction>tooManyAssignedResponse.action).mrNote,
        ).toBe(`${TooManyAssigned.badNote} ${TooManyAssigned.hashtag}`);
      });
    });

    describe("When assigneeId === null", (assigneeId = null) => {
      let tooManyAssignedResponse;

      beforeAll(async (done) => {
        tooManyAssignedResponse = await TooManyAssigned.analyze(
          state,
          api,
          customConfig,
          assigneeId,
        );
        done();
      });

      test("should return instance of SuccessfulBotActionWithNothingToSay", () => {
        expect(tooManyAssignedResponse.action).toBeInstanceOf(
          SuccessfulBotActionWithNothingToSay,
        );
      });

      test("should return statusCode 204 to indicated no API request needed", () => {
        expect(tooManyAssignedResponse.statusCode).toBe(HttpStatus.NO_CONTENT);
      });

      test("should return goodGitPractice === true", () => {
        expect(
          (<SuccessfulBotActionWithNothingToSay>tooManyAssignedResponse.action)
            .goodGitPractice,
        ).toBe(true);
      });
    });

    describe("When the API request for getMergeRequestsByAssigneeId fails due to authorization failure", (assigneeId = 1) => {
      let tooManyAssignedResponse;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMergeRequestsByAssigneeId.mockResolvedValue(unauthorized_401);
        tooManyAssignedResponse = await TooManyAssigned.analyze(
          state,
          api,
          customConfig,
          assigneeId,
        );
        done();
      });

      test("should return instance of AuthorizationFailureBotAction", () => {
        expect(tooManyAssignedResponse.action).toBeInstanceOf(
          AuthorizationFailureBotAction,
        );
      });
    });

    describe("When the API request for getMergeRequestsByAssigneeId fails due to network failure", (assigneeId = 1) => {
      let tooManyAssignedResponse;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMergeRequestsByAssigneeId.mockResolvedValue(fetch_network_error);
        tooManyAssignedResponse = await TooManyAssigned.analyze(
          state,
          api,
          customConfig,
          assigneeId,
        );
        done();
      });

      test("should return instance of NetworkFailureBotAction", () => {
        expect(tooManyAssignedResponse.action).toBeInstanceOf(
          NetworkFailureBotAction,
        );
      });
    });
  });

  describe("Merge State", (state = "merge") => {
    describe("any property values", (assigneeId = null) => {
      let tooManyAssignedResponse;

      beforeAll(async (done) => {
        tooManyAssignedResponse = await TooManyAssigned.analyze(
          state,
          api,
          customConfig,
          assigneeId,
        );
        done();
      });
      test("should return instance of SuccessfulBotActionWithNothingToSay", () => {
        expect(tooManyAssignedResponse.action).toBeInstanceOf(
          SuccessfulBotActionWithNothingToSay,
        );
      });

      test("should return statusCode 204 to indicated no API request needed", () => {
        expect(tooManyAssignedResponse.statusCode).toBe(HttpStatus.NO_CONTENT);
      });

      test("should return goodGitPractice === true", () => {
        expect(
          (<SuccessfulBotActionWithNothingToSay>tooManyAssignedResponse.action)
            .goodGitPractice,
        ).toBe(true);
      });
    });
  });
});
