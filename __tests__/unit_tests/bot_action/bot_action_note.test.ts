import { BotActionNote } from "../../../src/bot_actions";
import {
  FailedResponse,
  NoResponseNeeded,
  SuccessfulGetResponse,
} from "../../../src/gitlab";

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

describe("standardCaseForCheckPermissionsMessage(apiResponse) function", () => {
  describe("when apiResponse is FailedResponse", (apiResponse = new FailedResponse(
    401,
  )) => {
    test("RETURNS BOOLEAN: true", () => {
      expect(
        BotActionNote.standardCaseForCheckPermissionsMessage(apiResponse),
      ).toBe(true);
    });
  });

  describe("when apiResponse is NoResponseNeeded", (apiResponse = new NoResponseNeeded()) => {
    test("RETURNS BOOLEAN: false", () => {
      expect(
        BotActionNote.standardCaseForCheckPermissionsMessage(apiResponse),
      ).toBe(false);
    });
  });

  describe("when apiResponse is SuccessfulGetResponse", (apiResponse = new SuccessfulGetResponse(
    200,
    {},
  )) => {
    test("RETURNS BOOLEAN: false", () => {
      expect(
        BotActionNote.standardCaseForCheckPermissionsMessage(apiResponse),
      ).toBe(false);
    });
  });
});
