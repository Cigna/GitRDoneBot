import {
  AuthorizationFailureResponse,
  GitLabApi,
  SuccessfulGetResponse,
} from "../../src/gitlab";

jest.mock("../../src/gitlab/api_responses");

describe("Caching for get requests behave right", () => {
  const api = new GitLabApi("fake-token", 0, 1, "fake-uri");

  beforeAll(async (done) => {
    jest.clearAllMocks();
    // @ts-ignore
    api.fetchWrapper.makeGetRequest.mockResolvedValue(
      new SuccessfulGetResponse(200, { Response: 1 }),
    );
    done();
  });

  test("doesn't use cache the first time", async () => {
    const response = await api.getSingleMRChanges();
    expect(api.fetchWrapper.makeGetRequest).toHaveBeenCalledTimes(1);
    expect(response).toBeInstanceOf(SuccessfulGetResponse);
    expect(api["MRChanges"]).toBeDefined;
  });

  test("uses cache the second time", async () => {
    jest.clearAllMocks();
    expect(api["MRChanges"]).toBeDefined;
    const response = await api.getSingleMRChanges();
    expect(api.fetchWrapper.makeGetRequest).toHaveBeenCalledTimes(0);
    expect(response).toBeInstanceOf(SuccessfulGetResponse);
  });
});

describe("Don't set cache if failed request", () => {
  const api = new GitLabApi("fake-token", 0, 1, "fake-uri");

  beforeAll(async (done) => {
    jest.clearAllMocks();
    // @ts-ignore
    api.fetchWrapper.makeGetRequest.mockResolvedValue(
      new AuthorizationFailureResponse(404),
    );
    done();
  });

  test("doesn't set the cache if failed", async () => {
    const response = await api.getSingleMRChanges();
    expect(api.fetchWrapper.makeGetRequest).toHaveBeenCalledTimes(1);
    expect(response).toBeInstanceOf(AuthorizationFailureResponse);
    expect(api["MRChanges"]).toBeUndefined;
  });
});
