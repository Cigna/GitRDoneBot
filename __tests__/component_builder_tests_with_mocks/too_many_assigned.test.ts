import * as HttpStatus from "http-status-codes";
import { GitLabGetResponse, MergeRequestApi } from "../../src/gitlab";
import {
  createNMergeRequestObjects,
  get_response_not_found_404,
  get_response_fetch_network_error,
} from "../helpers";
import { winlog } from "../../src/util";
import { TooManyAssigned, BotActionNote } from "../../src/bot_actions";
import { BotActionConfig } from "../../src/custom_config/bot_action_config";
import { TooManyAssignedDefaults } from "../../src/custom_config/action_config_defaults";
import { TooManyAssignedNote } from "../../src/bot_actions/too_many_assigned/too_many_assigned_note";

// TEST FIXTURES
const customConfig = BotActionConfig.from(TooManyAssignedDefaults, {});
const noRequestNeededResponse = GitLabGetResponse.noRequestNeeded();
const defaultAssignedMRThreshold: number = 3;
const getResponseWhereAssignedMRSInThreshold: GitLabGetResponse = GitLabGetResponse.from(
  HttpStatus.OK,
  createNMergeRequestObjects(defaultAssignedMRThreshold - 1),
);
const getResponseWhereAssignedMRSNotInThreshold: GitLabGetResponse = GitLabGetResponse.from(
  HttpStatus.OK,
  createNMergeRequestObjects(defaultAssignedMRThreshold),
);

// TESTS

jest.mock("../../src/gitlab/merge_request_api");

describe("Mock API Tests: TooManyAssigned Class", () => {
  const api: MergeRequestApi = new MergeRequestApi(
    "fake-token",
    0,
    1,
    "fake-uri",
    winlog,
  );
  describe("Open State", (state = "open") => {
    describe("When too many assigned === false", (assigneeId = 1) => {
      let tooManyAssignedResponse: TooManyAssigned;
      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMergeRequestsByAssigneeId.mockResolvedValue(
          getResponseWhereAssignedMRSInThreshold,
        );
        tooManyAssignedResponse = await TooManyAssigned.from(
          state,
          api,
          customConfig,
          winlog,
          assigneeId,
        );
        done();
      });

      test("should return correct apiRequest values for successful API call", () => {
        expect(tooManyAssignedResponse.apiRequest).toEqual(
          getResponseWhereAssignedMRSInThreshold.apiRequest,
        );
      });

      test("should return goodGitPractice === true", () => {
        expect(tooManyAssignedResponse.goodGitPractice).toBe(true);
      });

      test("should return mrNote === noAction", async () => {
        expect(tooManyAssignedResponse.mrNote).toBe(
          BotActionNote.noActionMessage,
        );
      });
    });

    describe("When too many assigned === true", (assigneeId = 1) => {
      let tooManyAssignedResponse: TooManyAssigned;
      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMergeRequestsByAssigneeId.mockResolvedValue(
          getResponseWhereAssignedMRSNotInThreshold,
        );
        tooManyAssignedResponse = await TooManyAssigned.from(
          state,
          api,
          customConfig,
          winlog,
          assigneeId,
        );
        done();
      });

      test("should return correct apiRequest values for successful API call", () => {
        expect(tooManyAssignedResponse.apiRequest).toEqual(
          getResponseWhereAssignedMRSNotInThreshold.apiRequest,
        );
      });

      test("should return goodGitPractice === false", () => {
        expect(tooManyAssignedResponse.goodGitPractice).toBe(false);
      });

      test("should return mrNote === noAction", () => {
        expect(tooManyAssignedResponse.mrNote).toBe(
          `${TooManyAssignedNote.bad} ${TooManyAssignedNote.hashtag}`,
        );
      });
    });

    describe("When assigneeId === null", (assigneeId = null) => {
      let tooManyAssignedResponse: TooManyAssigned;
      beforeAll(async (done) => {
        tooManyAssignedResponse = await TooManyAssigned.from(
          state,
          api,
          customConfig,
          winlog,
          assigneeId,
        );
        done();

        test("should return correct apiRequest values for API call not needed", () => {
          expect(tooManyAssignedResponse.apiRequest).toEqual(
            noRequestNeededResponse,
          );
        });

        test("should return goodGitPractice === undefined", () => {
          expect(tooManyAssignedResponse.goodGitPractice).toBe(undefined);
        });

        test("should return mrNote === noAction", () => {
          expect(tooManyAssignedResponse.mrNote).toBe(
            BotActionNote.noActionMessage,
          );
        });
      });
    });

    describe("When 3XX-5XX response received from GitLab", (assigneeId = 1) => {
      let tooManyAssignedResponse: TooManyAssigned;
      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMergeRequestsByAssigneeId.mockResolvedValue(
          get_response_not_found_404,
        );
        tooManyAssignedResponse = await TooManyAssigned.from(
          state,
          api,
          customConfig,
          winlog,
          assigneeId,
        );
        done();
      });

      test("should return correct apiRequest values for failed API call", () => {
        expect(tooManyAssignedResponse.apiRequest).toEqual(
          get_response_not_found_404.apiRequest,
        );
      });
      test("should return goodGitPractice === undefined", () => {
        expect(tooManyAssignedResponse.goodGitPractice).toBe(undefined);
      });
      test("should return mrNote === checkPermissions", () => {
        expect(tooManyAssignedResponse.mrNote).toBe(
          BotActionNote.checkPermissionsMessage,
        );
      });
    });

    describe("When fetch network error is received", (assigneeId = 1) => {
      let tooManyAssignedResponse: TooManyAssigned;
      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMergeRequestsByAssigneeId.mockResolvedValue(
          get_response_fetch_network_error,
        );
        tooManyAssignedResponse = await TooManyAssigned.from(
          state,
          api,
          customConfig,
          winlog,
          assigneeId,
        );
        done();
      });
      test("should return correct apiRequest values for failed API call due to unknown network error", () => {
        expect(tooManyAssignedResponse.apiRequest).toEqual(
          get_response_fetch_network_error.apiRequest,
        );
      });
    });
  });

  describe("Update State", (state = "update") => {
    describe("When too many assigned === false", (assigneeId = 1) => {
      let tooManyAssignedResponse: TooManyAssigned;
      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMergeRequestsByAssigneeId.mockResolvedValue(
          getResponseWhereAssignedMRSInThreshold,
        );
        tooManyAssignedResponse = await TooManyAssigned.from(
          state,
          api,
          customConfig,
          winlog,
          assigneeId,
        );
        done();
      });
      test("should return correct apiRequest values for successful API call", () => {
        expect(tooManyAssignedResponse.apiRequest).toEqual(
          getResponseWhereAssignedMRSInThreshold.apiRequest,
        );
      });
      test("should return goodGitPractice === true", () => {
        expect(tooManyAssignedResponse.goodGitPractice).toBe(true);
      });
      test("should return mrNote === noAction", () => {
        expect(tooManyAssignedResponse.mrNote).toBe(
          BotActionNote.noActionMessage,
        );
      });
    });

    describe("When too many assigned === true", (assigneeId = 1) => {
      let tooManyAssignedResponse: TooManyAssigned;
      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMergeRequestsByAssigneeId.mockResolvedValue(
          getResponseWhereAssignedMRSNotInThreshold,
        );
        tooManyAssignedResponse = await TooManyAssigned.from(
          state,
          api,
          customConfig,
          winlog,
          assigneeId,
        );
        done();
      });
      test("should return correct apiRequest values for successful API call", () => {
        expect(tooManyAssignedResponse.apiRequest).toEqual(
          getResponseWhereAssignedMRSNotInThreshold.apiRequest,
        );
      });
      test("should return goodGitPractice === false", () => {
        expect(tooManyAssignedResponse.goodGitPractice).toBe(false);
      });
      test("should return mrNote === bad", () => {
        expect(tooManyAssignedResponse.mrNote).toBe(
          `${TooManyAssignedNote.bad} ${TooManyAssignedNote.hashtag}`,
        );
      });
    });

    describe("When assigneeId === null", (assigneeId = null) => {
      let tooManyAssignedResponse: TooManyAssigned;
      beforeAll(async (done) => {
        tooManyAssignedResponse = await TooManyAssigned.from(
          state,
          api,
          customConfig,
          winlog,
          assigneeId,
        );
        done();
      });

      test("should return correct apiRequest values for API call not needed", () => {
        expect(tooManyAssignedResponse.apiRequest).toEqual(
          noRequestNeededResponse.apiRequest,
        );
      });

      test("should return goodGitPractice === undefined", () => {
        expect(tooManyAssignedResponse.goodGitPractice).toBe(undefined);
      });

      test("should return mrNote === noAction", () => {
        expect(tooManyAssignedResponse.mrNote).toBe(
          BotActionNote.noActionMessage,
        );
      });
    });

    describe("When 3XX-5XX response received from GitLab", (assigneeId = 1) => {
      let tooManyAssignedResponse: TooManyAssigned;
      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMergeRequestsByAssigneeId.mockResolvedValue(
          get_response_not_found_404,
        );
        tooManyAssignedResponse = await TooManyAssigned.from(
          state,
          api,
          customConfig,
          winlog,
          assigneeId,
        );
        done();
      });

      test("should return correct apiRequest values for failed API call", () => {
        expect(tooManyAssignedResponse.apiRequest).toEqual(
          get_response_not_found_404.apiRequest,
        );
      });
      test("should return goodGitPractice === undefined", () => {
        expect(tooManyAssignedResponse.goodGitPractice).toBe(undefined);
      });
      test("should return mrNote === checkPermissions", () => {
        expect(tooManyAssignedResponse.mrNote).toBe(
          BotActionNote.checkPermissionsMessage,
        );
      });
    });

    describe("When fetch network error is received", (assigneeId = 1) => {
      let tooManyAssignedResponse: TooManyAssigned;
      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMergeRequestsByAssigneeId.mockResolvedValue(
          get_response_fetch_network_error,
        );
        tooManyAssignedResponse = await TooManyAssigned.from(
          state,
          api,
          customConfig,
          winlog,
          assigneeId,
        );
        done();
      });
      test("should return correct apiRequest values for failed API call due to unknown network error", () => {
        expect(tooManyAssignedResponse.apiRequest).toEqual(
          get_response_fetch_network_error.apiRequest,
        );
      });
    });
  });

  describe("Merge State", (state = "merge") => {
    describe("any property values", (assigneeId = null) => {
      let tooManyAssignedResponse: TooManyAssigned;
      beforeAll(async (done) => {
        tooManyAssignedResponse = await TooManyAssigned.from(
          state,
          api,
          customConfig,
          winlog,
          assigneeId,
        );
        done();
      });
      test("should return correct apiRequest values when API call not needed", () => {
        expect(tooManyAssignedResponse.apiRequest).toEqual(
          noRequestNeededResponse.apiRequest,
        );
      });

      test("should return goodGitPractice === undefined", () => {
        expect(tooManyAssignedResponse.goodGitPractice).toBe(undefined);
      });

      test("should return mrNote === noAction", () => {
        expect(tooManyAssignedResponse.mrNote).toBe(
          BotActionNote.noActionMessage,
        );
      });
    });
  });
});
