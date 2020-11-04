import * as HttpStatus from "http-status-codes";
import {
  MergeRequestApi,
  NoResponseNeeded,
  SuccessfulGetResponse,
} from "../../src/gitlab";
import { mockUser, not_found_404, fetch_network_error } from "../helpers";
import { winlog } from "../../src/util";
import { SelfMerge, BotActionNote } from "../../src/bot_actions";
import { SelfMergeNote } from "../../src/bot_actions/self_merge/self_merge_note";

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

const noRequestNeededResponse = new NoResponseNeeded();

// TESTS

jest.mock("../../src/gitlab/merge_request_api");

describe("Mock API Test: SelfMerge Class", () => {
  const api: MergeRequestApi = new MergeRequestApi(
    "fake-token",
    0,
    1,
    "fake-uri",
    winlog,
  );

  describe("Open State", (state = "open") => {
    describe("When MR is self-assigned", () => {
      const assigneeId: number = ASSIGNEE_ID;
      const authorId: number = AUTHOR_ID;

      let selfMergeResponse: SelfMerge;
      beforeAll(async (done) => {
        jest.clearAllMocks();
        selfMergeResponse = await SelfMerge.from(
          state,
          api,
          winlog,
          assigneeId,
          authorId,
        );
        done();
      });

      test("should return correct apiRequest values for API call not needed", () => {
        expect(selfMergeResponse.apiResponse).toEqual(noRequestNeededResponse);
      });

      test("should call API methods correct number of times", () => {
        expect(api.getMRApprovalConfig).toHaveBeenCalledTimes(0);
        expect(api.getSingleMR).toHaveBeenCalledTimes(0);
      });

      test("should return goodGitPractice === true", () => {
        expect(selfMergeResponse.goodGitPractice).toBe(true);
      });

      test("should return mrNote === good", () => {
        expect(selfMergeResponse.mrNote).toBe(
          `${SelfMergeNote.good} ${SelfMergeNote.hashtag}`,
        );
      });
    });
  });

  describe("Update State", (state = "update") => {
    describe("When MR is self-assigned", () => {
      const assigneeId: number = ASSIGNEE_ID;
      const authorId: number = ASSIGNEE_ID;

      let selfMergeResponse: SelfMerge;
      beforeAll(async (done) => {
        jest.clearAllMocks();
        selfMergeResponse = await SelfMerge.from(
          state,
          api,
          winlog,
          assigneeId,
          authorId,
        );
        done();
      });

      test("should return correct apiRequest values for API call not needed", () => {
        expect(selfMergeResponse.apiResponse).toEqual(noRequestNeededResponse);
      });

      test("should call API methods correct number of times", () => {
        expect(api.getMRApprovalConfig).toHaveBeenCalledTimes(0);
        expect(api.getSingleMR).toHaveBeenCalledTimes(0);
      });

      test("should return goodGitPractice === false", () => {
        expect(selfMergeResponse.goodGitPractice).toBe(false);
      });

      test("should return mrNote === bad (new)", () => {
        expect(selfMergeResponse.mrNote).toBe(
          `${SelfMergeNote.badAssigned} ${SelfMergeNote.hashtag}`,
        );
      });
    });
  });

  describe("Merge State", (state = "merge") => {
    describe("When MR is NOT self-approved", () => {
      const assigneeId: number = ASSIGNEE_ID;
      const authorId: number = SELF_APPROVED_ID;

      let selfMergeResponse: SelfMerge;
      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMRApprovalConfig.mockResolvedValue(
          get_mr_approval_multiple_approvals,
        );
        selfMergeResponse = await SelfMerge.from(
          state,
          api,
          winlog,
          assigneeId,
          authorId,
        );
        done();
      });

      test("should return correct apiRequest values for successful API call", () => {
        expect(selfMergeResponse.apiResponse).toBeInstanceOf(
          SuccessfulGetResponse,
        );
      });

      test("should call API methods correct number of times", () => {
        expect(api.getMRApprovalConfig).toHaveBeenCalledTimes(1);
        expect(api.getSingleMR).toHaveBeenCalledTimes(0);
      });

      test("should return goodGitPractice === true", () => {
        expect(selfMergeResponse.goodGitPractice).toBe(true);
      });

      test("should return approversNeeded === false", () => {
        expect(selfMergeResponse.approversNeeded).toBe(false);
      });

      test("should return mrNote === noAction", () => {
        expect(selfMergeResponse.mrNote).toBe(BotActionNote.noActionMessage);
      });
    });

    describe("When MR is self-approved", () => {
      const assigneeId: number = ASSIGNEE_ID;
      const authorId: number = SELF_APPROVED_ID;

      let selfMergeResponse: SelfMerge;
      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMRApprovalConfig.mockResolvedValue(
          get_mr_approval_self_approved,
        );
        selfMergeResponse = await SelfMerge.from(
          state,
          api,
          winlog,
          assigneeId,
          authorId,
        );
        done();
      });

      test("should return correct apiRequest values for successful API call", () => {
        expect(selfMergeResponse.apiResponse).toEqual(
          get_mr_approval_self_approved,
        );
      });

      test("should call API methods correct number of times", () => {
        expect(api.getMRApprovalConfig).toHaveBeenCalledTimes(1);
        expect(api.getSingleMR).toHaveBeenCalledTimes(0);
      });

      test("should return goodGitPractice === false", () => {
        expect(selfMergeResponse.goodGitPractice).toBe(false);
      });

      test("should return approversNeeded === false", () => {
        expect(selfMergeResponse.approversNeeded).toBe(false);
      });

      test("should return mrNote === badApproved", () => {
        expect(selfMergeResponse.mrNote).toBe(
          `${SelfMergeNote.badApproved} ${SelfMergeNote.hashtag}`,
        );
      });
    });

    describe("When there are no approvals & MR is NOT self-merged", () => {
      const assigneeId: number = ASSIGNEE_ID;
      const authorId: number = SELF_APPROVED_ID;

      let selfMergeResponse: SelfMerge;
      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMRApprovalConfig.mockResolvedValue(get_mr_approval_no_approvals);
        // @ts-ignore
        api.getSingleMR.mockResolvedValue(get_single_mr_not_self_merged);
        selfMergeResponse = await SelfMerge.from(
          state,
          api,
          winlog,
          assigneeId,
          authorId,
        );
        done();
      });

      test("should return correct apiRequest values for successful API call", () => {
        expect(selfMergeResponse.apiResponse).toEqual(
          get_mr_approval_no_approvals,
        );
      });

      test("should call API methods correct number of times", () => {
        expect(api.getMRApprovalConfig).toHaveBeenCalledTimes(1);
        expect(api.getSingleMR).toHaveBeenCalledTimes(1);
      });

      test("should return goodGitPractice === true", () => {
        expect(selfMergeResponse.goodGitPractice).toBe(true);
      });

      test("should return approversNeeded === true", () => {
        expect(selfMergeResponse.approversNeeded).toBe(true);
      });

      test("should return mrNote === noApprovals", () => {
        expect(selfMergeResponse.mrNote).toBe(
          `${SelfMergeNote.noApprovals} ${SelfMergeNote.hashtag}`,
        );
      });
    });

    describe("When there are no approvals & MR is self-merged", () => {
      const assigneeId: number = ASSIGNEE_ID;
      const authorId: number = SELF_APPROVED_ID;

      let selfMergeResponse: SelfMerge;
      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMRApprovalConfig.mockResolvedValue(get_mr_approval_no_approvals);
        // @ts-ignore
        api.getSingleMR.mockResolvedValue(get_single_mr_self_merged);
        selfMergeResponse = await SelfMerge.from(
          state,
          api,
          winlog,
          assigneeId,
          authorId,
        );
        done();
      });

      test("should return correct apiRequest values for successful API call", () => {
        expect(selfMergeResponse.apiResponse).toEqual(
          get_mr_approval_no_approvals,
        );
      });

      test("should call API methods correct number of times", () => {
        expect(api.getMRApprovalConfig).toHaveBeenCalledTimes(1);
        expect(api.getSingleMR).toHaveBeenCalledTimes(1);
      });

      test("should return goodGitPractice === false", () => {
        expect(selfMergeResponse.goodGitPractice).toBe(false);
      });

      test("should return approversNeeded === true", () => {
        expect(selfMergeResponse.approversNeeded).toBe(true);
      });

      test("should return mrNote === badMerged", () => {
        expect(selfMergeResponse.mrNote).toBe(
          `${SelfMergeNote.badMerged} ${SelfMergeNote.hashtag}`,
        );
      });
    });

    describe("When 3XX-5XX response is received from GitLab for getMRApprovalConfig request", () => {
      const assigneeId: number = ASSIGNEE_ID;
      const authorId: number = AUTHOR_ID;

      let selfMergeResponse: SelfMerge;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMRApprovalConfig.mockResolvedValue(not_found_404);
        selfMergeResponse = await SelfMerge.from(
          state,
          api,
          winlog,
          assigneeId,
          authorId,
        );
        done();
      });

      test("should return correct apiRequest values for failed API call", () => {
        expect(selfMergeResponse.apiResponse).toEqual(not_found_404);
      });

      test("should call API methods correct number of times", () => {
        expect(api.getMRApprovalConfig).toHaveBeenCalledTimes(1);
        expect(api.getSingleMR).toHaveBeenCalledTimes(0);
      });

      test("should return goodGitPractice === undefined", () => {
        expect(selfMergeResponse.goodGitPractice).toBe(undefined);
      });

      test("should return mrNote === checkPermissions", () => {
        expect(selfMergeResponse.mrNote).toBe(
          BotActionNote.checkPermissionsMessage,
        );
      });
    });

    describe("When 3XX-5XX response is received from GitLab for getSingleMR request", () => {
      const assigneeId: number = ASSIGNEE_ID;
      const authorId: number = AUTHOR_ID;

      let selfMergeResponse: SelfMerge;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMRApprovalConfig.mockResolvedValue(get_mr_approval_no_approvals);
        // @ts-ignore
        api.getSingleMR.mockResolvedValue(not_found_404);
        selfMergeResponse = await SelfMerge.from(
          state,
          api,
          winlog,
          assigneeId,
          authorId,
        );
        done();
      });

      test("should return correct apiRequest values for failed API call", () => {
        expect(selfMergeResponse.apiResponse).toEqual(not_found_404);
      });

      test("should call API methods correct number of times", () => {
        expect(api.getMRApprovalConfig).toHaveBeenCalledTimes(1);
        expect(api.getSingleMR).toHaveBeenCalledTimes(1);
      });

      test("should return goodGitPractice === undefined", () => {
        expect(selfMergeResponse.goodGitPractice).toBe(undefined);
      });

      test("should return mrNote === checkPermissions", () => {
        expect(selfMergeResponse.mrNote).toBe(
          BotActionNote.checkPermissionsMessage,
        );
      });
    });

    describe("When fetch network error is received", () => {
      const assigneeId: number = ASSIGNEE_ID;
      const authorId: number = AUTHOR_ID;

      let selfMergeResponse: SelfMerge;

      beforeAll(async (done) => {
        jest.clearAllMocks();
        // @ts-ignore
        api.getMRApprovalConfig.mockResolvedValue(fetch_network_error);
        selfMergeResponse = await SelfMerge.from(
          state,
          api,
          winlog,
          assigneeId,
          authorId,
        );
        done();
      });

      test("should return correct apiRequest values for failed API call due to unknown network error", () => {
        expect(selfMergeResponse.apiResponse).toEqual(fetch_network_error);
      });

      test("should call API methods correct number of times", () => {
        expect(api.getMRApprovalConfig).toHaveBeenCalledTimes(1);
        expect(api.getSingleMR).toHaveBeenCalledTimes(0);
      });
    });
  });
});
