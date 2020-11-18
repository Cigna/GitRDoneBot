import * as request from "supertest";
import * as HttpStatus from "http-status-codes";
import {
  Note,
  User,
  MergeRequest,
  Change,
  GitLabCommit,
  ApprovalsResponse,
  LambdaResponse,
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
  FailedResponse,
  MergeRequestApi,
  SuccessfulGetResponse,
  SuccessfulPostORPutResponse,
} from "../../src/gitlab";
import { handleGitLabWebhook } from "../../handler";
import { BotActionsResponse } from "../../src/merge_request";
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
let EDIT_MR_NOTE_ID: number;
let api: MergeRequestApi;
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

  api = new MergeRequestApi(
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
  describe("When GitLab API is called", () => {
    let postEmojiResponse: SuccessfulPostORPutResponse | FailedResponse;

    beforeAll(async (done) => {
      postEmojiResponse = await api.postEmoji("trophy");
      done();
    });

    test("request is successful", () => {
      expect(postEmojiResponse).toBeInstanceOf(SuccessfulPostORPutResponse);
    });
  });
});

describe("Live Integration Tests: mergeRequestApi.getAllMRNotes", () => {
  let getAllMRNotesResponse: SuccessfulGetResponse | FailedResponse;
  let resultNoteArray: Array<Note>;

  beforeAll(async (done) => {
    getAllMRNotesResponse = await api.getAllMRNotes(1);
    if (getAllMRNotesResponse instanceof SuccessfulGetResponse) {
      resultNoteArray = getAllMRNotesResponse.result;
    }
    done();
  });

  describe("When GitLab API is called", () => {
    test("request is successful", () => {
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

describe("Live Integration Tests: mergeRequestApi.newMRNote", () => {
  describe("When GitLab API is called", () => {
    const NEW_NOTE_MESSAGE = "New note message";

    let newMRNoteResponse: SuccessfulPostORPutResponse | FailedResponse;

    beforeAll(async (done) => {
      newMRNoteResponse = await api.newMRNote(NEW_NOTE_MESSAGE);
      if (newMRNoteResponse instanceof SuccessfulPostORPutResponse) {
        EDIT_MR_NOTE_ID = newMRNoteResponse.id;
      }
      done();
    });

    test("request is successful", () => {
      expect(newMRNoteResponse).toBeInstanceOf(SuccessfulPostORPutResponse);
    });

    test("note id is returned", () => {
      expect(EDIT_MR_NOTE_ID).not.toBe(-1);
    });
  });
});

describe("Live Integration Tests: mergeRequestApi.editMRNote", () => {
  describe("When GitLab API is called", () => {
    const UPDATED_NOTE_MESSAGE = "New updated note message";

    let editMRNoteResponse: SuccessfulPostORPutResponse | FailedResponse;

    beforeAll(async (done) => {
      editMRNoteResponse = await api.editMRNote(
        EDIT_MR_NOTE_ID,
        UPDATED_NOTE_MESSAGE,
      );
      done();
    });

    test("request is successful", () => {
      expect(editMRNoteResponse).toBeInstanceOf(SuccessfulPostORPutResponse);
    });

    test("note id is returned", () => {
      expect(EDIT_MR_NOTE_ID).not.toBe(-1);
    });
  });
});

describe("Live Integration Tests: mergeRequestApi.getMergeRequestsByAssigneeId", () => {
  describe("Happy Path", () => {
    const THRESHOLD = 3;

    let allMRSByAssigneeIDResponse: SuccessfulGetResponse | FailedResponse;
    let resultMRsByAssigneeID: Array<MergeRequest>;

    beforeAll(async (done) => {
      allMRSByAssigneeIDResponse = await api.getMergeRequestsByAssigneeId(
        GRDB_SVP_USER_ID,
        THRESHOLD,
      );
      if (allMRSByAssigneeIDResponse instanceof SuccessfulGetResponse) {
        resultMRsByAssigneeID = allMRSByAssigneeIDResponse.result;
      }
      done();
    });

    describe("When GitLab API is called", () => {
      test("request is successful", () => {
        expect(allMRSByAssigneeIDResponse).toBeInstanceOf(
          SuccessfulGetResponse,
        );
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
});

describe("Live Integration Tests: mergeRequestApi.getMRApprovalConfig", () => {
  let getMRApprovalConfigResponse: SuccessfulGetResponse | FailedResponse;
  let resultMRApproval: ApprovalsResponse;

  beforeAll(async (done) => {
    getMRApprovalConfigResponse = await api.getMRApprovalConfig();
    if (getMRApprovalConfigResponse instanceof SuccessfulGetResponse) {
      resultMRApproval = getMRApprovalConfigResponse.result;
    }
    done();
  });

  describe("When GitLab API is called", () => {
    test("request is successful", () => {
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
  let getSingleMRChangesResponse: SuccessfulGetResponse | FailedResponse;
  let resultSingleMRChanges: { changes: Array<Change> };

  beforeAll(async (done) => {
    getSingleMRChangesResponse = await api.getSingleMRChanges();
    if (getSingleMRChangesResponse instanceof SuccessfulGetResponse) {
      resultSingleMRChanges = getSingleMRChangesResponse.result;
    }
    done();
  });
  describe("When GitLab API is called", () => {
    test("request is successful", () => {
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
  let getSingleMRCommitsResponse: SuccessfulGetResponse | FailedResponse;
  let resultSingleMRCommits: Array<GitLabCommit>;

  beforeAll(async (done) => {
    getSingleMRCommitsResponse = await api.getSingleMRCommits();
    if (getSingleMRCommitsResponse instanceof SuccessfulGetResponse) {
      resultSingleMRCommits = getSingleMRCommitsResponse.result;
    }
    done();
  });

  describe("When GitLab API is called", () => {
    test("request is successful", () => {
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
  let getSingleMRResponse: SuccessfulGetResponse | FailedResponse;
  let resultSingleMR;

  beforeAll(async (done) => {
    getSingleMRResponse = await api.getSingleMR();
    if (getSingleMRResponse instanceof SuccessfulGetResponse) {
      resultSingleMR = getSingleMRResponse.result;
    }
    done();
  });
  describe("When GitLab API is called", () => {
    test("request is successful", () => {
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
  let response: LambdaResponse;

  beforeAll(async (done) => {
    const openEvent = {
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
    response = await handleGitLabWebhook(openEvent);
    done();
  });
  test("Open State: returns MergeRequestHandler response", () => {
    expect(response).toBeInstanceOf(BotActionsResponse);
    expect([HttpStatus.OK, HttpStatus.MULTI_STATUS]).toContain(
      response.statusCode,
    );
  });
});

describe("Live Integration API Tests: handler.handleGitLabWebhook responses", () => {
  test("Merged State: returns MergeRequestHandler response", async () => {
    const mergedEvent = {
      body: JSON.stringify(
        mockGitLabWebhookEvent(
          USER_ID,
          PROJECT_ID,
          null,
          MERGE_REQ_ID,
          "merge",
          "merge_request",
        ),
      ),
    };

    const response = await handleGitLabWebhook(mergedEvent);
    expect(response).toBeInstanceOf(BotActionsResponse);
    expect([HttpStatus.OK, HttpStatus.MULTI_STATUS]).toContain(
      response.statusCode,
    );
  }, 30000);

  test("Updated State: returns MergeRequestHandler response when toggle is true", async () => {
    const updateEvent = {
      body: JSON.stringify(
        mockGitLabWebhookEvent(
          USER_ID,
          PROJECT_ID,
          null,
          MERGE_REQ_ID,
          "update",
          "merge_request",
        ),
      ),
    };
    const response = await handleGitLabWebhook(updateEvent);
    expect(response).toBeInstanceOf(BotActionsResponse);
    expect([HttpStatus.OK, HttpStatus.MULTI_STATUS]).toContain(
      response.statusCode,
    );
  }, 30000);
});

describe("Live lambda handler response with mocked Infra (Error Cases)", () => {
  let tempToken = process.env.GITLAB_BOT_ACCOUNT_API_TOKEN;

  beforeAll(() => {
    process.env.GITLAB_BOT_ACCOUNT_API_TOKEN = "BAD_TOKEN";
  });

  afterAll(() => {
    process.env.GITLAB_BOT_ACCOUNT_API_TOKEN = tempToken;
  });

  test("Bad GitLab API token: returns 207 status from handler", () => {
    // test fixture needs to be created within test scope to make sure it has access to dynamic values
    openEvent = {
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
      expect(response.statusCode).toBe(HttpStatus.MULTI_STATUS);
    });
  }, 30000);
});
