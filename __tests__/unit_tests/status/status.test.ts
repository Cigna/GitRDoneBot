import { Status } from "../../../src/util";

describe("Unit Tests: Status class", () => {
  test("Should return 200 if all Bot Action calls were successful", () => {
    const status = Status.fromCodes([200, 200, 200, 200]);
    expect(status.code).toBe(200);
  });

  test("Should return 200 if at least one Bot Action code is default as long as none are errors", () => {
    const status = Status.fromCodes([200, 204, 204, 200]);
    expect(status.code).toBe(200);
  });

  test("Should return 207 if at least one Bot Action code is an error", () => {
    const status = Status.fromCodes([200, 204, 500, 403]);
    expect(status.code).toBe(207);
  });

  test("Should return 207 if all Bot Action codes are errors", () => {
    const status = Status.fromCodes([403, 401, 500, 404]);
    expect(status.code).toBe(207);
  });
});
