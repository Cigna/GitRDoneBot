import * as HttpStatus from "http-status-codes";
import * as mod from "../../handler";
import * as jestPlugin from "serverless-jest-plugin";

import { Context } from "aws-lambda";
import { mockGitLabWebhookEvent } from "../helpers";
import { getToken } from "../../src/util";
import { handleGitLabWebhook } from "../../handler";
import { CustomConfig } from "../../src/custom_config/custom_config";
import { SuccessfulGetResponse } from "../../src/gitlab";
import {
  ErrorResponse,
  HealthCheckResponse,
  IncorrectPermissionsResponse,
  NoActionResponse,
  NotSupportedResponse,
} from "../../src/interfaces";
import { runBotActions } from "../../src/bot_actions";
import { getMergeRequestEventData } from "../../src/merge_request/helpers";

const context: Context = {
  awsRequestId: "abcdefghi-1234-jklm-5678-nopqrstuvxyz90",
  callbackWaitsForEmptyEventLoop: false,
  done() {
    return null;
  },
  fail() {
    return null;
  },
  functionName: "dummy",
  functionVersion: "dummy",
  getRemainingTimeInMillis() {
    return 50;
  },
  invokedFunctionArn: "arn:aws:lambda:us-east-1:123456789012",
  logGroupName: "dummy",
  logStreamName: "dummy",
  memoryLimitInMB: "1024",
  succeed() {
    return null;
  },
};

const cloudWatchRuleEvent: any = {
  account: "123456789012",
  detail: {},
  // detail-type: "Scheduled Event",
  id: "abcdefghi-1234-jklm-5678-nopqrstuvxyz90",
  region: "us-east-1",
  resources: ["arn:aws:events:us-east-1:123456789012:rule/my-scheduled-rule"],
  source: "aws.events",
  time: "2015-10-08T16:53:06Z",
  version: "0",
};

const nonMREvent = {
  body: '{"object_kind":"push"}',
};

const customConfigUpdateToggleFalse: CustomConfig = {
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
  updateMergeRequestComment: false,
};

const PROJECT_ID = 1;
const MR_ID = 1;
const USER_ID = 0;

const reopenedEvent = {
  body: JSON.stringify(
    mockGitLabWebhookEvent(
      USER_ID,
      PROJECT_ID,
      USER_ID,
      MR_ID,
      "reopen",
      "merge_request",
    ),
  ),
};

const closedEvent = {
  body: JSON.stringify(
    mockGitLabWebhookEvent(
      USER_ID,
      PROJECT_ID,
      USER_ID,
      MR_ID,
      "close",
      "merge_request",
    ),
  ),
};

const openEvent = {
  body: JSON.stringify(
    mockGitLabWebhookEvent(
      USER_ID,
      PROJECT_ID,
      USER_ID,
      MR_ID,
      "open",
      "merge_request",
    ),
  ),
};

const updateEvent = {
  body: JSON.stringify(
    mockGitLabWebhookEvent(
      USER_ID,
      PROJECT_ID,
      USER_ID,
      MR_ID,
      "update",
      "merge_request",
    ),
  ),
};

// TESTS
jest.mock("../../src/custom_config/custom_config");
jest.mock("../../src/bot_actions/bot_action.ts");
const lambdaWrapper = jestPlugin.lambdaWrapper;
const wrapped = lambdaWrapper.wrap(mod, { handler: "webhook" });

describe("Mock API Integration Tests: Lambda Handler webhook function", () => {
  test("webhook returns a NoActionResponse when closed GitLab event received", () => {
    return wrapped.runHandler(closedEvent, context, null).then((response) => {
      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(NoActionResponse);
    });
  });

  test("webhook returns a HealthCheckResponse when CloudWatch Rule event received", () => {
    return wrapped
      .runHandler(cloudWatchRuleEvent, context, null)
      .then((response) => {
        expect(response).toBeDefined();
        expect(response).toBeInstanceOf(HealthCheckResponse);
      });
  });
});

describe("Mock API Integration Tests: Lamda Handler handleGitLabWebhook function", () => {
  test("Non-MR GitLab Event: returns NotSupportedResponse", async () => {
    const response = await handleGitLabWebhook(nonMREvent);
    expect(response).toBeDefined();
    expect(response).toBeInstanceOf(NotSupportedResponse);
  });

  test("Reopened State: returns NoActionResponse", async () => {
    const response = await handleGitLabWebhook(reopenedEvent);
    expect(response).toBeDefined();
    expect(response).toBeInstanceOf(NoActionResponse);
  });

  test("Closed State: returns NoActionResponse", async () => {
    const response = await handleGitLabWebhook(closedEvent);
    expect(response).toBeDefined();
    expect(response).toBeInstanceOf(NoActionResponse);
  });

  test("Updated State: returns NoActionResponse when toggle is false", async () => {
    // @ts-ignore
    CustomConfig.from.mockResolvedValue(customConfigUpdateToggleFalse);
    const response = await handleGitLabWebhook(updateEvent);
    expect(response).toBeDefined();
    expect(response).toBeInstanceOf(NoActionResponse);
  });

  test("Open State: invokes runBotActions and returns appropriate response", async () => {
    // @ts-ignore
    CustomConfig.from.mockResolvedValue(customConfigUpdateToggleFalse);
    // @ts-ignore
    runBotActions.mockImplementationOnce(() => {
      return new IncorrectPermissionsResponse(
        getMergeRequestEventData(JSON.parse(openEvent.body)),
      );
    });
    const response = await handleGitLabWebhook(openEvent);
    expect(response).toBeDefined();
    expect(response).toBeInstanceOf(IncorrectPermissionsResponse);
  });
});

describe("Mock API Integration Tests: lambda handler response (Error Cases)", () => {
  test("Unable to parse event.body: returns ErrorResponse", () => {
    return wrapped.runHandler({ body: {} }, context, null).then((response) => {
      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(ErrorResponse);
    });
  });
});

describe("Mock API Integration Tests: lambda handler response (Error Cases)", () => {
  let tempToken: string | undefined = process.env.GITLAB_BOT_ACCOUNT_API_TOKEN;
  let tempNodeEnv: string | undefined = process.env.NODE_ENV;

  beforeAll((done) => {
    delete process.env.GITLAB_BOT_ACCOUNT_API_TOKEN;
    process.env.NODE_ENV = "gitlab";
    done();
  });

  afterAll((done) => {
    process.env.GITLAB_BOT_ACCOUNT_API_TOKEN = tempToken;
    process.env.NODE_ENV = tempNodeEnv;
    done();
  });

  test("Missing GitLab API token: returns ErrorResponse", () => {
    return wrapped.runHandler(openEvent, context, null).then((response) => {
      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(ErrorResponse);
      expect(getToken).toThrowError(
        new Error("GITLAB_BOT_ACCOUNT_API_TOKEN missing from environment"),
      );
    });
  });
});
