import {} from "../../../src/util";
import { GitOuttaHereNote } from "../../../src/bot_actions/git_outta_here/git_outta_here_note";
import { FailedResponse, SuccessfulGetResponse } from "../../../src/gitlab";

const successfulResponse = new SuccessfulGetResponse(200, {});
const failedResponse = new FailedResponse(401);

describe("GitOuttaHereNote.caseForBadMessage(goodGitPractice)", () => {
  describe("goodGitPractice === true", (goodGitPractice = true) => {
    test("RETURNS BOOLEAN: false", () => {
      expect(GitOuttaHereNote.caseForBadMessage(goodGitPractice)).toBe(false);
    });
  });

  describe("goodGitPractice === false", (goodGitPractice = false) => {
    test("RETURNS BOOLEAN: true", () => {
      expect(GitOuttaHereNote.caseForBadMessage(goodGitPractice)).toBe(true);
    });
  });
});

describe("GitOuttaHereNote.caseForNoActions(goodGitPractice)", () => {
  describe("goodGitPractice === true", (goodGitPractice = true) => {
    test("RETURNS BOOLEAN: true", () => {
      expect(GitOuttaHereNote.caseForNoActions(goodGitPractice)).toBe(true);
    });
  });

  describe("goodGitPractice === false", (goodGitPractice = false) => {
    test("RETURNS BOOLEAN: false", () => {
      expect(GitOuttaHereNote.caseForNoActions(goodGitPractice)).toBe(false);
    });
  });
});

describe("GitOuttaHereNote.fromMessage(message)", () => {
  describe("any message string", (message = "Helpful reminder from your friendly neighborhood GitRDoneBot.") => {
    test("RETURNS CLASS INSTANCE: GitOuttaHereNote", () => {
      const note = GitOuttaHereNote.fromMessage(message);
      expect(note).toBeInstanceOf(GitOuttaHereNote);
    });
  });
});

describe("GitOuttaHereNote.buildMessage(apiResponse, goodGitPractice, logger)", () => {
  describe("apiResponse !== FailedResponse", (apiResponse = successfulResponse) => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      test("RETURNS STRING: noAction", () => {
        expect(
          GitOuttaHereNote.buildMessage(apiResponse, goodGitPractice),
        ).toBe(GitOuttaHereNote.noActionMessage);
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      test("RETURNS STRING: bad + hashtag", () => {
        expect(
          GitOuttaHereNote.buildMessage(apiResponse, goodGitPractice),
        ).toBe(`${GitOuttaHereNote.bad} ${GitOuttaHereNote.hashtag}`);
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      test("RETURNS STRING: unknownState", () => {
        expect(
          GitOuttaHereNote.buildMessage(apiResponse, goodGitPractice),
        ).toBe(GitOuttaHereNote.unknownState);
      });
    });
  });

  // if apiResponse === FailedResponse, all other params are ignored
  describe("apiResponse === FailedResponse", (apiResponse = failedResponse) => {
    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      test("RETURNS STRING: checkPermissions", () => {
        expect(
          GitOuttaHereNote.buildMessage(apiResponse, goodGitPractice),
        ).toBe(GitOuttaHereNote.checkPermissionsMessage);
      });
    });
  });
});
