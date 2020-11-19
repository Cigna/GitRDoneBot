import {} from "../../../src/util";
import { NewGitWhoDisNote } from "../../../src/bot_actions/new_git_who_dis/new_git_who_dis_note";

describe("NewGitWhoDisNote.caseForBadMessage(goodGitPractice)", () => {
  describe("goodGitPractice === true", (goodGitPractice = true) => {
    test("RETURNS BOOLEAN: false", () => {
      expect(NewGitWhoDisNote.caseForBadMessage(goodGitPractice)).toBe(false);
    });
  });

  describe("goodGitPractice === false", (goodGitPractice = false) => {
    test("RETURNS BOOLEAN: true", () => {
      expect(NewGitWhoDisNote.caseForBadMessage(goodGitPractice)).toBe(true);
    });
  });
});

describe("NewGitWhoDisNote.caseForNoActions(goodGitPractice)", () => {
  describe("goodGitPractice === true", (goodGitPractice = true) => {
    test("RETURNS BOOLEAN: true", () => {
      expect(NewGitWhoDisNote.caseForNoActions(goodGitPractice)).toBe(true);
    });
  });

  describe("goodGitPractice === false", (goodGitPractice = false) => {
    test("RETURNS BOOLEAN: false", () => {
      expect(NewGitWhoDisNote.caseForNoActions(goodGitPractice)).toBe(false);
    });
  });
});

describe("NewGitWhoDisNote.fromMessage(message)", () => {
  describe("any message string", (message = "Helpful reminder from your friendly neighborhood GitRDoneBot.") => {
    test("RETURNS CLASS INSTANCE: NewGitWhoDisNote", () => {
      const note = NewGitWhoDisNote.fromMessage(message);
      expect(note).toBeInstanceOf(NewGitWhoDisNote);
    });
  });
});

describe("NewGitWhoDisNote.buildMessage(authorName, goodGitPractice, logger)", () => {
  describe("goodGitPractice === true", (goodGitPractice = true) => {
    describe("authorName === any string", (authorName = "Captain Mal") => {
      test("RETURNS STRING: noAction", () => {
        expect(NewGitWhoDisNote.buildMessage(authorName, goodGitPractice)).toBe(
          NewGitWhoDisNote.noActionMessage,
        );
      });
    });
  });

  describe("goodGitPractice === false", (goodGitPractice = false) => {
    describe("authorName === any string", (authorName = "Captain Mal") => {
      test("RETURNS STRING: badIcon + authorName + bad + hashtag", () => {
        expect(NewGitWhoDisNote.buildMessage(authorName, goodGitPractice)).toBe(
          `${NewGitWhoDisNote.badIcon} Hi @${authorName}, ${NewGitWhoDisNote.bad} ${NewGitWhoDisNote.hashtag}`,
        );
      });
    });
  });

  describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
    describe("authorName === any string", (authorName = "Captain Mal") => {
      test("RETURNS STRING: unknownState", () => {
        expect(NewGitWhoDisNote.buildMessage(authorName, goodGitPractice)).toBe(
          NewGitWhoDisNote.unknownState,
        );
      });
    });
  });
});
