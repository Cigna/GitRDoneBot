import * as request from "supertest";
import {
  Note,
  User,
  MergeRequest,
  Change,
  GitLabCommit,
  ApprovalsResponse,
  CommentSuccessResponse,
  IncorrectPermissionsResponse,
} from "../../src/interfaces";
import {
  mockNote,
  mockUser,
  mockMergeRequest,
  mockChange,
  mockGitLabCommit,
  importTestProjectToGitlab,
  cleanUpEmojis,
  cleanUpMRNotes,
  mockGitLabWebhookEvent,
} from "../helpers";
import {
  GitLabApi,
  SuccessfulGetResponse,
  SuccessfulPostORPutResponse,
} from "../../src/gitlab";
import { handleGitLabWebhook } from "../../handler";
import * as mod from "../../handler";
import * as jestPlugin from "serverless-jest-plugin";
import { Context } from "aws-lambda";

const lambdaWrapper = jestPlugin.lambdaWrapper;
const wrapped = lambdaWrapper.wrap(mod, { handler: "webhook" });

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

const API_TOKEN = process.env.GITLAB_BOT_ACCOUNT_API_TOKEN;
const GROUP_NAME = process.env.GITLAB_TESTING_GROUP_NAME;
const BASE_URI = process.env.GITLAB_BASE_URI;
const PROJECT_NAME = process.env.GITLAB_TEST_PROJECT_NAME;

const USER_ID = 0;
const MERGE_REQ_ID = 1;
const GRDB_SVP_USER_ID = 8040;

const mockNoteInstance: Note = mockNote(1, "River_Tam");
const noteProperties = Object.keys(mockNoteInstance);

const mockUserInstance: User = mockUser(1234);
const userProperties = Object.keys(mockUserInstance);

const mockMergeRequestInstance: MergeRequest = mockMergeRequest();
const mergeRequestProperties = Object.keys(mockMergeRequestInstance);

const mockChangeInstance: Change = mockChange(
  "@@ -4,3 +4,4 @@ Leverage agile frameworks to provide a robust synopsis for high level overviews.\n",
);
const changeProperties = Object.keys(mockChangeInstance);

const mockCommitInstance: GitLabCommit = mockGitLabCommit(
  "Add new line",
  Date.now().toString(),
);
const commitProperties = Object.keys(mockCommitInstance);

let PROJECT_ID: number;
let api: GitLabApi;
let openEvent: any;

beforeAll(async (done) => {
  // get functional testing project
  let live_test_project = await request(BASE_URI)
    .get(`/projects/${GROUP_NAME}%2F${PROJECT_NAME}`)
    .set("Private-Token", `${API_TOKEN}`);

  PROJECT_ID = live_test_project.body.id;

  if (!PROJECT_ID) {
    PROJECT_ID = await importTestProjectToGitlab();
  }

  api = new GitLabApi(
    API_TOKEN as string,
    PROJECT_ID,
    MERGE_REQ_ID,
    BASE_URI as string,
  );
  await cleanUpEmojis(api);
  await cleanUpMRNotes(api);
  done();
}, 50000);

describe("Live Integration Tests: mergeRequestApi.postEmoji", () => {
  test("SuccessfulPostORPutResponse is received", async () => {
    const postEmojiResponse = await api.postEmoji("trophy");
    expect(postEmojiResponse).toBeInstanceOf(SuccessfulPostORPutResponse);
  });
});

describe("Live Integration Tests: mergeRequestApi.getAllMRNotes", () => {
  let resultNoteArray: Array<Note>;

  describe("When GitLab API is called", () => {
    test("SuccessfulGetResponse is received", async () => {
      const getAllMRNotesResponse = await api.getAllMRNotes(1);
      if (getAllMRNotesResponse instanceof SuccessfulGetResponse) {
        resultNoteArray = getAllMRNotesResponse.result;
      }
      expect(getAllMRNotesResponse).toBeInstanceOf(SuccessfulGetResponse);
    });
  });

  describe.each(noteProperties)(
    "API response contains property %p and it is the correct type",
    (noteProperty) => {
      test("for each note object", () => {
        resultNoteArray.forEach((note) => {
          expect(note[noteProperty]).toBeDefined();
          expect(typeof note[noteProperty]).toEqual(
            typeof mockNoteInstance[noteProperty],
          );
          // 'author' is a nested object of type User and must be explicitly tested
          if (noteProperty === "author") {
            userProperties.forEach((userProperty) => {
              expect(note.author[userProperty]).toBeDefined();
              expect(typeof note.author[userProperty]).toEqual(
                typeof mockUserInstance[userProperty],
              );
            });
          }
        });
      });
    },
  );
});

describe("Live Integration Tests: mergeRequestApi.newMRNote & mergeRequestApi.editMRNote", () => {
  let EDIT_MR_NOTE_ID: number;
  describe("When posting NEW note", (message = "New note message") => {
    test("SuccessfulPostORPutResponse is received", async () => {
      const newMRNoteResponse = await api.newMRNote(message);
      if (newMRNoteResponse instanceof SuccessfulPostORPutResponse) {
        EDIT_MR_NOTE_ID = newMRNoteResponse.id;
      }
      expect(newMRNoteResponse).toBeInstanceOf(SuccessfulPostORPutResponse);
    });
  });

  describe("When posting UPDATED note", (message = "Updated note message") => {
    test("SuccessfulPostORPutResponse is received", async () => {
      const editMRNoteResponse = await api.editMRNote(EDIT_MR_NOTE_ID, message);
      expect(editMRNoteResponse).toBeInstanceOf(SuccessfulPostORPutResponse);
    });
  });
});

describe("Live Integration Tests: mergeRequestApi.getMergeRequestsByAssigneeId", (threshold = 3) => {
  let resultMRsByAssigneeID: Array<MergeRequest>;

  describe("When GitLab API is called", () => {
    test("SuccessfulGetResponse is received", async () => {
      const allMRSByAssigneeIDResponse = await api.getMergeRequestsByAssigneeId(
        GRDB_SVP_USER_ID,
        threshold,
      );
      if (allMRSByAssigneeIDResponse instanceof SuccessfulGetResponse) {
        resultMRsByAssigneeID = allMRSByAssigneeIDResponse.result;
      }
      expect(allMRSByAssigneeIDResponse).toBeInstanceOf(SuccessfulGetResponse);
    });
  });

  describe.each(mergeRequestProperties)(
    "API response contains property %p and it is the correct type",
    (expectedProperty) => {
      test("for each merge request object", () => {
        resultMRsByAssigneeID.forEach((mr) => {
          expect(mr[expectedProperty]).toBeDefined();
          expect(typeof mr[expectedProperty]).toEqual(
            typeof mockMergeRequestInstance[expectedProperty],
          );
        });
      });
    },
  );
});

describe("Live Integration Tests: mergeRequestApi.getMRApprovalConfig", () => {
  let resultMRApproval: ApprovalsResponse;

  describe("When GitLab API is called", () => {
    test("SuccessfulGetResponse is received", async () => {
      const getMRApprovalConfigResponse = await api.getMRApprovalConfig();
      if (getMRApprovalConfigResponse instanceof SuccessfulGetResponse) {
        resultMRApproval = getMRApprovalConfigResponse.result;
      }
      expect(getMRApprovalConfigResponse).toBeInstanceOf(SuccessfulGetResponse);
    });

    test("API response contains property approved_by", () => {
      expect(resultMRApproval.approved_by).toBeDefined();
    });
  });

  describe.each(userProperties)(
    "approved_by response contains property %p and it is the right type",
    (expectedProperty) => {
      test("for each user object", () => {
        resultMRApproval.approved_by.forEach((user) => {
          expect(user.user[expectedProperty]).toBeDefined();
          expect(typeof user.user[expectedProperty]).toEqual(
            typeof mockUserInstance[expectedProperty],
          );
        });
      });
    },
  );
});

describe("Live Integration Tests: mergeRequestApi.getSingleMRChanges", () => {
  let resultSingleMRChanges: { changes: Array<Change> };

  describe("When GitLab API is called", () => {
    test("SuccessfulGetResponse is received", async () => {
      const getSingleMRChangesResponse = await api.getSingleMRChanges();
      if (getSingleMRChangesResponse instanceof SuccessfulGetResponse) {
        resultSingleMRChanges = getSingleMRChangesResponse.result;
      }
      expect(getSingleMRChangesResponse).toBeInstanceOf(SuccessfulGetResponse);
    });

    test("API response contains property changes", () => {
      expect(resultSingleMRChanges.changes).toBeDefined();
    });
  });

  describe.each(changeProperties)(
    "changes response contains property %p and it is the right type",
    (expectedProperty) => {
      test("for each change object", () => {
        resultSingleMRChanges.changes.forEach((change) => {
          expect(change[expectedProperty]).toBeDefined();
          expect(typeof change[expectedProperty]).toEqual(
            typeof mockChangeInstance[expectedProperty],
          );
        });
      });
    },
  );
});

describe("Live Integration Tests: mergeRequestApi.getSingleMRCommits", () => {
  let resultSingleMRCommits: Array<GitLabCommit>;

  describe("When GitLab API is called", () => {
    test("SuccessfulGetResponse is received", async () => {
      const getSingleMRCommitsResponse = await api.getSingleMRCommits();
      if (getSingleMRCommitsResponse instanceof SuccessfulGetResponse) {
        resultSingleMRCommits = getSingleMRCommitsResponse.result;
      }
      expect(getSingleMRCommitsResponse).toBeInstanceOf(SuccessfulGetResponse);
    });
  });

  describe.each(commitProperties)(
    "API response contains property %p and it is the right type",
    (expectedProperty) => {
      test("for each commit object", () => {
        resultSingleMRCommits.forEach((commit) => {
          expect(commit[expectedProperty]).toBeDefined();
          expect(typeof commit[expectedProperty]).toEqual(
            typeof mockCommitInstance[expectedProperty],
          );
        });
      });
    },
  );
});

describe("Live Integration Tests: mergeRequestApi.getSingleMR", () => {
  let resultSingleMR;

  describe("When GitLab API is called", () => {
    test("SuccessfulGetResponse is received", async () => {
      const getSingleMRResponse = await api.getSingleMR();
      if (getSingleMRResponse instanceof SuccessfulGetResponse) {
        resultSingleMR = getSingleMRResponse.result;
      }
      expect(getSingleMRResponse).toBeInstanceOf(SuccessfulGetResponse);
    });

    test("API response contains property merged_by", () => {
      expect(resultSingleMR.merged_by).toBeDefined();
    });
  });

  describe.each(userProperties)(
    "merged_by response contains property %p and it is the right type",
    (expectedProperty) => {
      test("for the user", () => {
        expect(resultSingleMR.merged_by[expectedProperty]).toBeDefined();
        expect(typeof resultSingleMR.merged_by[expectedProperty]).toEqual(
          typeof mockUserInstance[expectedProperty],
        );
      });
    },
  );
});

describe("Live Integration API Tests: handler.handleGitLabWebhook responses", () => {
  test("Open State: returns CommentSuccessResponse", async () => {
    const openEvent = {
      headers: {
        "X-Gitlab-Event": "Merge Request Hook",
      },
      body: JSON.stringify(
        mockGitLabWebhookEvent(
          USER_ID,
          PROJECT_ID,
          null,
          MERGE_REQ_ID,
          "open",
          "merge_request",
        ),
      ),
    };
    const response = await handleGitLabWebhook(openEvent);
    expect(response).toBeInstanceOf(CommentSuccessResponse);
  });
});

describe("Live lambda handler response with mocked Infra (Error Cases)", () => {
  let tempToken = process.env.GITLAB_BOT_ACCOUNT_API_TOKEN;

  beforeEach(() => {
    process.env.GITLAB_BOT_ACCOUNT_API_TOKEN = "BAD_TOKEN";
  });

  afterEach(() => {
    process.env.GITLAB_BOT_ACCOUNT_API_TOKEN = tempToken;
  });

  test("Bad GitLab API token: returns IncorrectPermissionsResponse", () => {
    // test fixture needs to be created within test scope to make sure it has access to dynamic values
    openEvent = {
      headers: {
        "X-Gitlab-Event": "Merge Request Hook",
      },
      body: JSON.stringify(
        mockGitLabWebhookEvent(
          USER_ID,
          PROJECT_ID,
          null,
          MERGE_REQ_ID,
          "open",
          "merge_request",
        ),
      ),
    };

    return wrapped.runHandler(openEvent, context, null).then((response) => {
      expect(response).toBeInstanceOf(IncorrectPermissionsResponse);
    });
  }, 30000);
});
