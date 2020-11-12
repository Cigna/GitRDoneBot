import { BotActionsResponse } from "../../../src/merge_request/bot_actions_response";

describe("Unit Tests: Status class", () => {
  test("Should return 200 if all Bot Action calls were successful", () => {
    const status = BotActionsResponse.fromCodes([200, 200, 200, 200]);
    expect(status).toBe(200);
  });

  test("Should return 200 if at least one Bot Action code is default as long as none are errors", () => {
    const status = BotActionsResponse.fromCodes([200, 204, 204, 200]);
    expect(status).toBe(200);
  });

  test("Should return 207 if at least one Bot Action code is an error", () => {
    const status = BotActionsResponse.fromCodes([200, 204, 500, 403]);
    expect(status).toBe(207);
  });

  test("Should return 207 if all Bot Action codes are errors", () => {
    const status = BotActionsResponse.fromCodes([403, 401, 500, 404]);
    expect(status).toBe(207);
  });
});
