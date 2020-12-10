import { getToken, getBaseURI, getBotUsername } from "../../src/util";

describe("getToken function ", () => {
  test("returns token if it is defined", () => {
    expect(getToken("token")).toEqual("token");
  });

  test("throws error if undefined", () => {
    let token: string;
    try {
      token = getToken(undefined);
    } catch (err) {
      expect(err.message).toBe(
        "GITLAB_BOT_ACCOUNT_API_TOKEN missing from environment",
      );
    }
  });
});

describe("getBaseURI function ", () => {
  test("returns baseURI if it is defined", () => {
    expect(getBaseURI("uri")).toEqual("uri");
  });

  test("throws error if undefined", () => {
    let uri: string;
    try {
      uri = getBaseURI(undefined);
    } catch (err) {
      expect(err.message).toBe("GITLAB_BASE_URI missing from environment");
    }
  });
});

describe("getBotUsername function ", () => {
  test("returns botName if defined", () => {
    expect(getBotUsername("botName")).toEqual("botName");
  });

  test("throws error if undefined", () => {
    let botName: string;
    try {
      botName = getBotUsername(undefined);
    } catch (err) {
      expect(err.message).toBe(
        "GITLAB_BOT_ACCOUNT_NAME missing from environment",
      );
    }
  });
});
