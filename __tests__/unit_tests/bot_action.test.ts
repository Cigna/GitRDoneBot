import {
  allGoodGitPractice,
  composeNote,
  SuccessfulBotAction,
  SuccessfulBotActionWithNothingToSay,
} from "../../src/bot_actions";

describe("Bot Action unit tests", () => {
  const msg1 = "fake mrNote";
  const msg2 = "faux mrNote";
  const hash1 = "#FakeAction";
  const hash2 = "#FauxAction";

  describe("composeNote function", () => {
    describe("when an array of SuccessfulBotAction is passed in", () => {
      const chattyBotActions = [
        new SuccessfulBotAction(true, msg1, hash1),
        new SuccessfulBotAction(true, msg2, hash2),
      ];
      test("a single string composed of all mrNotes is returned", () => {
        expect(composeNote(chattyBotActions)).toBe(
          `${msg1} ${hash1}<br /><br />${msg2} ${hash2}`,
        );
      });
    });
  });

  describe("allGoodGitPractice function", () => {
    describe("When all goodGitPractice bools are true", () => {
      const chattyBotActions = [
        new SuccessfulBotAction(true, msg1, hash1),
        new SuccessfulBotAction(true, msg2, hash2),
      ];

      const silentBotActions = [
        new SuccessfulBotActionWithNothingToSay(true),
        new SuccessfulBotActionWithNothingToSay(true),
      ];
      test("true is returned", () => {
        expect(allGoodGitPractice(chattyBotActions, silentBotActions)).toBe(
          true,
        );
      });
    });

    describe("When at least one chatty goodGitPractice bool is false", () => {
      const chattyBotActions = [
        new SuccessfulBotAction(false, msg1, hash1),
        new SuccessfulBotAction(true, msg2, hash2),
      ];

      const silentBotActions = [
        new SuccessfulBotActionWithNothingToSay(true),
        new SuccessfulBotActionWithNothingToSay(true),
      ];
      test("false is returned", () => {
        expect(allGoodGitPractice(chattyBotActions, silentBotActions)).toBe(
          false,
        );
      });
    });

    describe("When at least one silent goodGitPractice bool is false", () => {
      const chattyBotActions = [
        new SuccessfulBotAction(true, msg1, hash1),
        new SuccessfulBotAction(true, msg2, hash2),
      ];

      const silentBotActions = [
        new SuccessfulBotActionWithNothingToSay(false),
        new SuccessfulBotActionWithNothingToSay(true),
      ];
      test("false is returned", () => {
        expect(allGoodGitPractice(chattyBotActions, silentBotActions)).toBe(
          false,
        );
      });
    });
  });
});
