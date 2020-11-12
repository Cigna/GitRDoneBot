import {
  FailedResponse,
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
  const api = new MergeRequestApi("fake-token", 0, 1, "fake-uri", winlog);

  beforeAll(async (done) => {
    jest.clearAllMocks();
    // @ts-ignore
    api.fetchWrapper.makeGetRequest.mockResolvedValue(new FailedResponse(404));
    done();
  });

  test("doesn't set the cache if failed", async () => {
    const response = await api.getSingleMRChanges();
    expect(api.fetchWrapper.makeGetRequest).toHaveBeenCalledTimes(1);
    expect(response).toBeInstanceOf(FailedResponse);
    expect(api["MRChanges"]).toBeUndefined;
  });
});
