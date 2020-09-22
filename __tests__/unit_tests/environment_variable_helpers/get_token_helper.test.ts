import { getToken, getBaseURI } from "../../../src/util";

describe("getToken function ", () => {
  test("check that get token returns token if it is defined", () => {
    expect(getToken("token")).toEqual("token");
  });

  test("check that get token throws error", () => {
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
  test("check that get baseURI returns uri if it is defined", () => {
    expect(getBaseURI("uri")).toEqual("uri");
  });

  test("check that  get baseURI throws error", () => {
    let uri: string;
    try {
      uri = getBaseURI(undefined);
    } catch (err) {
      expect(err.message).toBe("GITLAB_BASE_URI missing from environment");
    }
  });
});
