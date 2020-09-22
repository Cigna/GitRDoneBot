import { BotActionNote } from "../../../src/bot_actions";

describe("conditionallyAddHashtag(message, hashtag) function", (hashtag = "#MyCoolBotAction") => {
  describe("when message === noActionMessage", (message = BotActionNote.noActionMessage) => {
    test("RETURNS STRING: noActionMessage", () => {
      expect(BotActionNote.conditionallyAddHashtag(message, hashtag)).toBe(
        BotActionNote.noActionMessage,
      );
    });
  });

  describe("when message === checkPermissionsMessage", (message = BotActionNote.checkPermissionsMessage) => {
    test("RETURNS STRING: checkPermissionsMessage", () => {
      expect(BotActionNote.conditionallyAddHashtag(message, hashtag)).toBe(
        BotActionNote.checkPermissionsMessage,
      );
    });
  });

  describe("when message === unknownState", (message = BotActionNote.unknownState) => {
    test("RETURNS STRING: unknownState", () => {
      expect(BotActionNote.conditionallyAddHashtag(message, hashtag)).toBe(
        BotActionNote.unknownState,
      );
    });
  });

  describe("when message !== noActionMessage || checkPermissionsMessage || unknownState", (message = "Helpful reminder from your friendly neighborhood GitRDoneBot.") => {
    test("RETURNS STRING: message + hashtag ", () => {
      expect(BotActionNote.conditionallyAddHashtag(message, hashtag)).toBe(
        `${message} ${hashtag}`,
      );
    });
  });
});

describe("standardCaseForCheckPermissionsMessage(gitLabRequestSuccess) function", () => {
  describe("when gitLabRequestSuccess is false", (gitLabRequestSuccess = false) => {
    test("RETURNS BOOLEAN: true", () => {
      expect(
        BotActionNote.standardCaseForCheckPermissionsMessage(
          gitLabRequestSuccess,
        ),
      ).toBe(true);
    });
  });

  describe("when gitLabRequestSuccess is undefined", (gitLabRequestSuccess = undefined) => {
    test("RETURNS BOOLEAN: false", () => {
      expect(
        BotActionNote.standardCaseForCheckPermissionsMessage(
          gitLabRequestSuccess,
        ),
      ).toBe(false);
    });
  });

  describe("when gitLabRequestSuccess is true", (gitLabRequestSuccess = true) => {
    test("RETURNS BOOLEAN: false", () => {
      expect(
        BotActionNote.standardCaseForCheckPermissionsMessage(
          gitLabRequestSuccess,
        ),
      ).toBe(false);
    });
  });
});
