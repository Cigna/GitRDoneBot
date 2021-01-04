import * as HttpStatus from "http-status-codes";
import { GitLabApi, SuccessfulGetResponse } from "../../src/gitlab";
import { mockUser, fetch_network_error, unauthorized_401 } from "../helpers";
import {
  AuthorizationFailureBotAction,
  NetworkFailureBotAction,
  SelfMerge,
  SuccessfulBotActionWithMessage,
  SuccessfulBotActionWithNothingToSay,
} from "../../src/bot_actions";

// TEST FIXTURES

const SELF_APPROVED_ID = 123;
const ASSIGNEE_ID = 1;
const AUTHOR_ID = 2;
const get_mr_approval_multiple_approvals = new SuccessfulGetResponse(
  HttpStatus.OK,
  {
    approved_by: [
      { user: mockUser(ASSIGNEE_ID) },
      { user: mockUser(AUTHOR_ID) },
    ],
  },
);
const get_mr_approval_no_approvals = new SuccessfulGetResponse(HttpStatus.OK, {
  approved_by: [],
});
const get_mr_approval_self_approved = new SuccessfulGetResponse(HttpStatus.OK, {
  approved_by: [{ user: mockUser(SELF_APPROVED_ID) }],
});
const get_single_mr_self_merged = new SuccessfulGetResponse(HttpStatus.OK, {
  merged_by: mockUser(SELF_APPROVED_ID),
});
const get_single_mr_not_self_merged = new SuccessfulGetResponse(HttpStatus.OK, {
  merged_by: mockUser(ASSIGNEE_ID),
});

// TESTS

jest.mock("../../src/gitlab/gitlab_api");

describe("Mock API Test: SelfMerge Class", () => {
  const api: GitLabApi = new GitLabApi("fake-token", 0, 1, "fake-uri");

  describe("Open State", (state = "open") => {
    describe("When MR is self-assigned", () => {
      const assigneeId: number = ASSIGNEE_ID;
      const authorId: number = AUTHOR_ID;

      let selfMergeResponse;
      beforeAll(async (done) => {
        jest.clearAllMocks();
        selfMergeResponse = await SelfMerge.analyze(
          state,
          api,
          assigneeId,
          authorId,
        );
        done();
      });

      test("should return statusCode 204 to indicated no API request needed", () => {
        expect(selfMergeResponse.statusCode).toBe(HttpStatus.NO_CONTENT);
      });

      test("should call API methods correct number of times", () => {
        expect(api.getMRApprovalConfig).toHaveBeenCalledTimes(0);
        expect(api.getSingleMR).toHaveBeenCalledTimes(0);
      });

      test("should return instance of SuccessfulBotActionWithMessage", () => {
        expect(selfMergeResponse.action).toBeInstanceOf(
          SuccessfulBotActionWithMessage,
        );
      });
      test("should return goodGitPractice === true", () => {
        expect(
          (<SuccessfulBotActionWithMessage>selfMergeResponse.action)
            .goodGitPractice,
        ).toBe(true);
      });

      test("should return mrNote === good", () => {
        expect(
          (<SuccessfulBotActionWithMessage>selfMergeResponse.action).mrNote,
        ).toBe(`${SelfMerge.goodNote} ${SelfMerge.hashtag}`);
      });
    });
  });

  describe("Update State", (state = "update") => {
    describe("When MR is self-assigned", () => {
      const assigneeId: number = ASSIGNEE_ID;
      const authorId: number = ASSIGNEE_ID;

      let selfMergeResponse;
      beforeAll(async (done) => {
        jest.clearAllMocks();
        selfMergeResponse = await SelfMerge.analyze(
          state,
          api,
          assigneeId,
          authorId,
        );
        done();
      });

      test("should return statusCode 204 to indicated no API request needed", () => {
        expect(selfMergeResponse.statusCode).toBe(HttpStatus.NO_CONTENT);
      });

      test("should call API methods correct number of times", () => {
        expect(api.getMRApprovalConfig).toHaveBeenCalledTimes(0);
        expect(api.getSingleMR).toHaveBeenCalledTimes(0);
      });

      test("should return goodGitPractice === false", () => {
        expect(
          (<SuccessfulBotActionWithMessage>selfMergeResponse.action)
            .goodGitPractice,
        ).toBe(false);
      });

      test("should return mrNote === bad (new)", () => {
        expect(
          (<SuccessfulBotActionWithMessage>selfMergeResponse.action).mrNote,
        ).toBe(`${SelfMerge.badAssignedNote} ${SelfMerge.hashtag}`);
      });
    });
  });

  describe("Merge State", (state = "merge") => {
    describe("When MR is NOT self-approved", () => {
      const assigneeId: number = ASSIGNEE_ID;
      const authorId: number = SELF_APPROVED_ID;

      let selfMergeResponse;
      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMRApprovalConfig.mockResolvedValue(
          get_mr_approval_multiple_approvals,
        );
        selfMergeResponse = await SelfMerge.analyze(
          state,
          api,
          assigneeId,
          authorId,
        );
        done();
      });

      test("should return instance of SuccessfulBotActionWithNothingToSay", () => {
        expect(selfMergeResponse.action).toBeInstanceOf(
          SuccessfulBotActionWithNothingToSay,
        );
      });

      test("should call API methods correct number of times", () => {
        expect(api.getMRApprovalConfig).toHaveBeenCalledTimes(1);
        expect(api.getSingleMR).toHaveBeenCalledTimes(0);
      });

      test("should return goodGitPractice === true", () => {
        expect(
          (<SuccessfulBotActionWithMessage>selfMergeResponse.action)
            .goodGitPractice,
        ).toBe(true);
      });

      test("should return approversNeeded === false", () => {
        expect(selfMergeResponse.computedValues["approversNeeded"]).toBe(false);
      });
    });

    describe("When MR is self-approved", () => {
      const assigneeId: number = ASSIGNEE_ID;
      const authorId: number = SELF_APPROVED_ID;

      let selfMergeResponse;
      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMRApprovalConfig.mockResolvedValue(
          get_mr_approval_self_approved,
        );
        selfMergeResponse = await SelfMerge.analyze(
          state,
          api,
          assigneeId,
          authorId,
        );
        done();
      });

      test("should return instance of SuccessfulBotActionWithMessage", () => {
        expect(selfMergeResponse.action).toBeInstanceOf(
          SuccessfulBotActionWithMessage,
        );
      });

      test("should call API methods correct number of times", () => {
        expect(api.getMRApprovalConfig).toHaveBeenCalledTimes(1);
        expect(api.getSingleMR).toHaveBeenCalledTimes(0);
      });

      test("should return goodGitPractice === false", () => {
        expect(
          (<SuccessfulBotActionWithMessage>selfMergeResponse.action)
            .goodGitPractice,
        ).toBe(false);
      });

      test("should return approversNeeded === false", () => {
        expect(selfMergeResponse.computedValues["approversNeeded"]).toBe(false);
      });

      test("should return mrNote === badApproved", () => {
        expect(
          (<SuccessfulBotActionWithMessage>selfMergeResponse.action).mrNote,
        ).toBe(`${SelfMerge.badApprovedNote} ${SelfMerge.hashtag}`);
      });
    });

    describe("When there are no approvals & MR is NOT self-merged", () => {
      const assigneeId: number = ASSIGNEE_ID;
      const authorId: number = SELF_APPROVED_ID;

      let selfMergeResponse;
      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMRApprovalConfig.mockResolvedValue(get_mr_approval_no_approvals);
        // @ts-ignore
        api.getSingleMR.mockResolvedValue(get_single_mr_not_self_merged);
        selfMergeResponse = await SelfMerge.analyze(
          state,
          api,
          assigneeId,
          authorId,
        );
        done();
      });

      test("should return instance of SuccessfulBotActionWithMessage", () => {
        expect(selfMergeResponse.action).toBeInstanceOf(
          SuccessfulBotActionWithMessage,
        );
      });

      test("should call API methods correct number of times", () => {
        expect(api.getMRApprovalConfig).toHaveBeenCalledTimes(1);
        expect(api.getSingleMR).toHaveBeenCalledTimes(1);
      });

      test("should return goodGitPractice === true", () => {
        expect(
          (<SuccessfulBotActionWithMessage>selfMergeResponse.action)
            .goodGitPractice,
        ).toBe(true);
      });

      test("should return approversNeeded === true", () => {
        expect(selfMergeResponse.computedValues["approversNeeded"]).toBe(true);
      });

      test("should return mrNote === noApprovals", () => {
        expect(
          (<SuccessfulBotActionWithMessage>selfMergeResponse.action).mrNote,
        ).toBe(`${SelfMerge.noApprovalsNote} ${SelfMerge.hashtag}`);
      });
    });

    describe("When there are no approvals & MR is self-merged", () => {
      const assigneeId: number = ASSIGNEE_ID;
      const authorId: number = SELF_APPROVED_ID;

      let selfMergeResponse;
      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMRApprovalConfig.mockResolvedValue(get_mr_approval_no_approvals);
        // @ts-ignore
        api.getSingleMR.mockResolvedValue(get_single_mr_self_merged);
        selfMergeResponse = await SelfMerge.analyze(
          state,
          api,
          assigneeId,
          authorId,
        );
        done();
      });

      test("should return instance of SuccessfulBotActionWithMessage", () => {
        expect(selfMergeResponse.action).toBeInstanceOf(
          SuccessfulBotActionWithMessage,
        );
      });

      test("should call API methods correct number of times", () => {
        expect(api.getMRApprovalConfig).toHaveBeenCalledTimes(1);
        expect(api.getSingleMR).toHaveBeenCalledTimes(1);
      });

      test("should return goodGitPractice === false", () => {
        expect(
          (<SuccessfulBotActionWithMessage>selfMergeResponse.action)
            .goodGitPractice,
        ).toBe(false);
      });

      test("should return approversNeeded === true", () => {
        expect(selfMergeResponse.computedValues["approversNeeded"]).toBe(true);
      });

      test("should return mrNote === badMerged", () => {
        expect(
          (<SuccessfulBotActionWithMessage>selfMergeResponse.action).mrNote,
        ).toBe(`${SelfMerge.badMergedNote} ${SelfMerge.hashtag}`);
      });
    });

    describe("When the API request for getMRApprovalConfig fails due to authorization failure", () => {
      const assigneeId: number = ASSIGNEE_ID;
      const authorId: number = AUTHOR_ID;

      let selfMergeResponse;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMRApprovalConfig.mockResolvedValue(unauthorized_401);
        selfMergeResponse = await SelfMerge.analyze(
          state,
          api,
          assigneeId,
          authorId,
        );
        done();
      });

      test("should return instance of AuthorizationFailureBotAction", () => {
        expect(selfMergeResponse.action).toBeInstanceOf(
          AuthorizationFailureBotAction,
        );
      });

      test("should call API methods correct number of times", () => {
        expect(api.getMRApprovalConfig).toHaveBeenCalledTimes(1);
        expect(api.getSingleMR).toHaveBeenCalledTimes(0);
      });
    });

    describe("When the API request for getMRApprovalConfig fails due to network failure", () => {
      const assigneeId: number = ASSIGNEE_ID;
      const authorId: number = AUTHOR_ID;

      let selfMergeResponse;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMRApprovalConfig.mockResolvedValue(fetch_network_error);
        selfMergeResponse = await SelfMerge.analyze(
          state,
          api,
          assigneeId,
          authorId,
        );
        done();
      });

      test("should return instance of NetworkFailureBotAction", () => {
        expect(selfMergeResponse.action).toBeInstanceOf(
          NetworkFailureBotAction,
        );
      });

      test("should call API methods correct number of times", () => {
        expect(api.getMRApprovalConfig).toHaveBeenCalledTimes(1);
        expect(api.getSingleMR).toHaveBeenCalledTimes(0);
      });
    });

    describe("When the API request for getSingleMR fails due to authorization failure", () => {
      const assigneeId: number = ASSIGNEE_ID;
      const authorId: number = AUTHOR_ID;

      let selfMergeResponse;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMRApprovalConfig.mockResolvedValue(get_mr_approval_no_approvals);
        // @ts-ignore
        api.getSingleMR.mockResolvedValue(unauthorized_401);
        selfMergeResponse = await SelfMerge.analyze(
          state,
          api,
          assigneeId,
          authorId,
        );
        done();
      });

      test("should return instance of AuthorizationFailureBotAction", () => {
        expect(selfMergeResponse.action).toBeInstanceOf(
          AuthorizationFailureBotAction,
        );
      });

      test("should call API methods correct number of times", () => {
        expect(api.getMRApprovalConfig).toHaveBeenCalledTimes(1);
        expect(api.getSingleMR).toHaveBeenCalledTimes(1);
      });
    });

    describe("When the API request for getSingleMR fails due to network failure", () => {
      const assigneeId: number = ASSIGNEE_ID;
      const authorId: number = AUTHOR_ID;

      let selfMergeResponse;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMRApprovalConfig.mockResolvedValue(get_mr_approval_no_approvals);
        // @ts-ignore
        api.getSingleMR.mockResolvedValue(fetch_network_error);
        selfMergeResponse = await SelfMerge.analyze(
          state,
          api,
          assigneeId,
          authorId,
        );
        done();
      });

      test("should return instance of NetworkFailureBotAction", () => {
        expect(selfMergeResponse.action).toBeInstanceOf(
          NetworkFailureBotAction,
        );
      });

      test("should call API methods correct number of times", () => {
        expect(api.getMRApprovalConfig).toHaveBeenCalledTimes(1);
        expect(api.getSingleMR).toHaveBeenCalledTimes(1);
      });
    });
  });
});
