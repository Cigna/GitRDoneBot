import {
  FailedGetResponse,
  GitLabAPIRequest,
  MergeRequestApi,
  SuccessfulGetResponse,
} from "../../src/gitlab/";
import { winlog } from "../../src/util";

jest.mock("../../src/gitlab/fetch_wrapper");

describe("Caching for get requests behave right", () => {
  const api = new MergeRequestApi("fake-token", 0, 1, "fake-uri", winlog);

  beforeAll(async (done) => {
    jest.clearAllMocks();
    // @ts-ignore
    api.fetchWrapper.makeGetRequest.mockResolvedValue(
      new SuccessfulGetResponse(GitLabAPIRequest.from(200), { Response: 1 }),
    );
    done();
  });

  test("doesn't use cache the first time", async () => {
    const response = await api.getSingleMRChanges();
    expect(api.fetchWrapper.makeGetRequest).toHaveBeenCalledTimes(1);
    expect(response.apiRequest.success).toBe(true);
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
  const api = new MergeRequestApi("fake-token", 0, 1, "fake-uri", winlog);

  beforeAll(async (done) => {
    jest.clearAllMocks();
    // @ts-ignore
    api.fetchWrapper.makeGetRequest.mockResolvedValue(
      new FailedGetResponse(GitLabAPIRequest.from(404)),
    );
    done();
  });

  test("doesn't set the cache if failed", async () => {
    const response = await api.getSingleMRChanges();
    expect(api.fetchWrapper.makeGetRequest).toHaveBeenCalledTimes(1);
    expect(response.apiRequest.success).toBe(false);
    expect(response).toBeInstanceOf(FailedGetResponse);
    expect(api["MRChanges"]).toBeUndefined;
  });
});
