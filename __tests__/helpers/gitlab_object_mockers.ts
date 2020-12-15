import {
  BotActionResponse,
  SuccessfulBotAction,
  SuccessfulBotActionWithNothingToSay,
} from "../../src/bot_actions";
import {
  Note,
  User,
  GitLabCommit,
  MergeRequest,
  Change,
} from "../../src/interfaces";

export function mockGitLabWebhookEvent(
  authorId: number,
  projectId: number,
  assigneeId: number | null,
  mrId: number,
  mrState: string,
  objectKind: string,
) {
  return {
    object_kind: objectKind,
    project: {
      id: projectId,
      name: "grdbot-test",
      namespace: "grdbot-home",
    },
    user: mockUser(authorId),
    object_attributes: {
      assignee_id: assigneeId,
      author_id: authorId,
      iid: mrId,
      action: mrState,
      created_at: Date.now().toString(),
      source: {
        web_url: "http://fakegit.serenity.com",
      },
      last_commit: {
        author: {
          email: "rivertam@firefly.fake",
        },
      },
    },
  };
}

export function mockNote(noteId: number, username: string): Note {
  return {
    id: noteId,
    body: "Comment for MR",
    author: {
      id: 2,
      name: "River Tam",
      username: username,
      state: "active",
      avatar_url:
        "http://git.serenity.com/uploads/-/system/user/avatar/rivertam/avatar.png",
      web_url: "http://git.serenity.com",
    },
    created_at: "2019-07-30T21:11:32.892Z",
    updated_at: "2019-08-01T15:55:57.912Z",
    system: false,
    noteable_id: 2,
    noteable_type: "MergeRequest",
    resolvable: false,
    noteable_iid: 42,
  };
}

export function mockUser(authorId: number): User {
  return {
    id: authorId,
    name: "Twinkie Dog",
    username: "twinkie.dog",
    state: "active",
    avatar_url: "",
    web_url: "http://gitlab.com/twinkie.dog",
  };
}

export function mockGitLabCommit(
  title: string,
  created_at: string,
): GitLabCommit {
  return {
    title: title,
    created_at: created_at,
  };
}

export function mockMergeRequest(): MergeRequest {
  return {
    merged_by: mockUser(1),
    author: mockUser(2),
    assignee: mockUser(3),
  };
}

export function mockChange(diff: string): Change {
  return {
    old_path: "README.md",
    new_path: "README.md",
    a_mode: "100644",
    b_mode: "100644",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff: diff,
  };
}

export function mockSuccessfulBotActionWithNothingToSay(
  name: string,
): BotActionResponse {
  return {
    name: name,
    statusCode: 200,
    action: new SuccessfulBotActionWithNothingToSay(true),
  };
}

export function mockSuccessfulBotAction(name: string): BotActionResponse {
  return {
    name: name,
    statusCode: 200,
    action: new SuccessfulBotAction(true, `${name} msg`, `#${name}`),
  };
}

export function createNNotes(count: number, username: string): any {
  let notes: Array<Note> = [];
  for (let i = 0; i < count; i++) {
    notes.push(mockNote(100 + i, username));
  }
  return notes;
}

export function createNGitLabCommits(count: number): any {
  let commits: Array<GitLabCommit> = [];
  for (let i = 0; i < count; i++) {
    commits.push(mockGitLabCommit("", Date.now().toString()));
  }
  return commits;
}

export function createNMergeRequestObjects(count: number): any {
  let MRs: Array<MergeRequest> = [];
  for (let i = 0; i < count; i++) {
    MRs.push(mockMergeRequest());
  }
  return MRs;
}
