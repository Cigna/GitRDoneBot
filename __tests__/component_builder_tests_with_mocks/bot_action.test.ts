import * as HttpStatus from "http-status-codes";
import {
  BranchAge,
  CommitMessages,
  DiffSize,
  GitOuttaHere,
  NewGitWhoDis,
  runBotActions,
  SelfMerge,
  TooManyAssigned,
} from "../../src/bot_actions";
import { CustomConfig } from "../../src/custom_config/custom_config";
import {
  NotFoundORNetworkFailureResponse,
  SuccessfulGetResponse,
} from "../../src/gitlab";
import { GitLabApi } from "../../src/gitlab/gitlab_api";
import {
  CommentFailedResponse,
  NoCommentNeededResponse,
} from "../../src/interfaces";
import { BotComment } from "../../src/merge_request";
import {
  mockGitLabWebhookEvent,
  mockSuccessfulBotAction,
  mockSuccessfulBotActionWithNothingToSay,
} from "../helpers";

jest.mock("../../src/bot_actions/branch_age");
jest.mock("../../src/bot_actions/commit_messages");
jest.mock("../../src/bot_actions/diff_size");
jest.mock("../../src/bot_actions/git_outta_here");
jest.mock("../../src/bot_actions/new_git_who_dis");
jest.mock("../../src/bot_actions/self_merge");
jest.mock("../../src/bot_actions/too_many_assigned");
jest.mock("../../src/gitlab/gitlab_api");
jest.mock("../../src/merge_request/comment");

const fakeCustomConfig: CustomConfig = {
  apiResponse: new SuccessfulGetResponse(HttpStatus.OK, {}),
  branchAge: {
    constructiveFeedbackOnlyToggle: true,
    threshold: 2,
  },
  commitMessage: {
    constructiveFeedbackOnlyToggle: false,
    threshold: 2,
  },
  diffSize: {
    constructiveFeedbackOnlyToggle: true,
    threshold: 3,
  },
  tooManyMergeRequests: {
    constructiveFeedbackOnlyToggle: true,
    threshold: 4,
  },
  updateMergeRequestComment: true,
};

const fakeGitLabEvent = mockGitLabWebhookEvent(
  0,
  1,
  2,
  3,
  "open",
  "merge_request",
);

const api = new GitLabApi("fake-token", 0, 1, "fake-uri");

describe("Mock API Test: runBotActions(api, customConfig, gitLabEvent, state", () => {
  describe("When all Bot Actions have nothing to say", () => {
    // @ts-ignore
    BranchAge.analyze.mockResolvedValueOnce(
      mockSuccessfulBotActionWithNothingToSay(BranchAge.botActionName),
    );
    // @ts-ignore
    CommitMessages.analyze.mockResolvedValueOnce(
      mockSuccessfulBotActionWithNothingToSay(CommitMessages.botActionName),
    );
    // @ts-ignore
    DiffSize.analyze.mockResolvedValueOnce(
      mockSuccessfulBotActionWithNothingToSay(DiffSize.botActionName),
    );
    // @ts-ignore
    GitOuttaHere.analyze.mockResolvedValueOnce(
      mockSuccessfulBotActionWithNothingToSay(GitOuttaHere.botActionName),
    );
    // @ts-ignore
    NewGitWhoDis.analyze.mockResolvedValueOnce(
      mockSuccessfulBotActionWithNothingToSay(NewGitWhoDis.botActionName),
    );
    // @ts-ignore
    SelfMerge.analyze.mockResolvedValueOnce(
      mockSuccessfulBotActionWithNothingToSay(SelfMerge.botActionName),
    );
    // @ts-ignore
    TooManyAssigned.analyze.mockResolvedValueOnce(
      mockSuccessfulBotActionWithNothingToSay(TooManyAssigned.botActionName),
    );
    test("NoCommentNeededResponse is returned", async () => {
      const response = await runBotActions(
        api,
        fakeCustomConfig,
        fakeGitLabEvent,
        "open",
      );
      expect(response).toBeInstanceOf(NoCommentNeededResponse);
    });
  });

  describe("When comment posting fails", () => {
    // @ts-ignore
    BranchAge.analyze.mockResolvedValueOnce(
      mockSuccessfulBotAction(BranchAge.botActionName),
    );
    // @ts-ignore
    CommitMessages.analyze.mockResolvedValueOnce(
      mockSuccessfulBotAction(CommitMessages.botActionName),
    );
    // @ts-ignore
    DiffSize.analyze.mockResolvedValueOnce(
      mockSuccessfulBotAction(DiffSize.botActionName),
    );
    // @ts-ignore
    GitOuttaHere.analyze.mockResolvedValueOnce(
      mockSuccessfulBotAction(GitOuttaHere.botActionName),
    );
    // @ts-ignore
    NewGitWhoDis.analyze.mockResolvedValueOnce(
      mockSuccessfulBotAction(NewGitWhoDis.botActionName),
    );
    // @ts-ignore
    SelfMerge.analyze.mockResolvedValueOnce(
      mockSuccessfulBotAction(SelfMerge.botActionName),
    );
    // @ts-ignore
    TooManyAssigned.analyze.mockResolvedValueOnce(
      mockSuccessfulBotAction(TooManyAssigned.botActionName),
    );
    // @ts-ignore
    api.postEmoji.mockResolvedValueOnce(
      new NotFoundORNetworkFailureResponse(404),
    );
    // @ts-ignore
    BotComment.post.mockResolvedValueOnce(
      new NotFoundORNetworkFailureResponse(502),
    );
    test("CommentFailedResponse is returned", async () => {
      const response = await runBotActions(
        api,
        fakeCustomConfig,
        fakeGitLabEvent,
        "open",
      );
      expect(response).toBeInstanceOf(CommentFailedResponse);
    });
  });
});
