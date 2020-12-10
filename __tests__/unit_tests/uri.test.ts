import { URI } from "../../src/gitlab";

const GITLAB_BASE_URI = "fake-uri";
const uriBuilder = new URI(GITLAB_BASE_URI, 0, 1);

describe("URI library", () => {
  describe("Emoji endpoints", () => {
    test("should return the correct URL string for getAllOrPostNewEmoji", () => {
      expect(uriBuilder.forEmojis()).toBe(
        `${GITLAB_BASE_URI}/projects/0/merge_requests/1/award_emoji`,
      );
    });

    test("should return the correct URL string for deleteEmoji", () => {
      expect(uriBuilder.forSingleEmoji(2)).toBe(
        `${GITLAB_BASE_URI}/projects/0/merge_requests/1/award_emoji/2`,
      );
    });
  });

  describe("Note endpoints", () => {
    test("should return the correct URL string for postNewNote", () => {
      expect(uriBuilder.forNotes()).toBe(
        `${GITLAB_BASE_URI}/projects/0/merge_requests/1/notes`,
      );
    });

    test("should return the correct URL string for listAllNotes", () => {
      expect(uriBuilder.forNotesFilterByPage(1)).toBe(
        `${GITLAB_BASE_URI}/projects/0/merge_requests/1/notes?page=1&per_page=100&sort=asc`,
      );
    });

    test("should return the correct URL string for updateOrDeleteNote", () => {
      expect(uriBuilder.forSingleNote(2)).toBe(
        `${GITLAB_BASE_URI}/projects/0/merge_requests/1/notes/2`,
      );
    });
  });

  describe("General Merge Request endpoints", () => {
    test("should return the correct URL string for getAllMRByAssigneeId", () => {
      expect(uriBuilder.forMRsFilterByAssigneeId(0, 1)).toBe(
        `${GITLAB_BASE_URI}/merge_requests?state=opened&scope=all&page=0&per_page=1&assignee_id=0`,
      );
    });

    test("should return the correct URL string for getMRApprovalConfiguration", () => {
      expect(uriBuilder.forMRApprovals()).toBe(
        `${GITLAB_BASE_URI}/projects/0/merge_requests/1/approvals`,
      );
    });

    test("should return the correct URL string for getMRChanges", () => {
      expect(uriBuilder.forMRChanges()).toBe(
        `${GITLAB_BASE_URI}/projects/0/merge_requests/1/changes`,
      );
    });

    test("should return the correct URL string for getMRCommits", () => {
      expect(uriBuilder.forSingleMRCommits()).toBe(
        `${GITLAB_BASE_URI}/projects/0/merge_requests/1/commits`,
      );
    });
  });

  describe("Repository File endpoints", () => {
    test("should return the correct URL string for getRawConfigFile", () => {
      expect(uriBuilder.forSingleProjectRepoRawConfigFile()).toBe(
        `${GITLAB_BASE_URI}/projects/0/repository/files/.grdb.json/raw?ref=master`,
      );
    });
  });
});
