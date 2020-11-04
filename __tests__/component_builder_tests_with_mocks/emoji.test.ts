// TEST FIXTURES

import { GitLabPostResponse, MergeRequestApi } from "../../src/gitlab";
import { winlog } from "../../src/util";
import { BotEmoji } from "../../src/merge_request";
import { unauthorized_401, fetch_network_error } from "../helpers";

const newEmoji = GitLabPostResponse.from(201, {
  id: 42,
});

const noRequest = GitLabPostResponse.noRequestNeeded();

// TESTS

jest.mock("../../src/gitlab/merge_request_api");

describe("Mock API Test: Emoji Class", () => {
  describe("post function", () => {
    const api = new MergeRequestApi("fake-token", 0, 1, "fake-uri", winlog);

    beforeEach((done) => {
      jest.clearAllMocks();
      done();
    });

    test("posts new emoji when content exists", async () => {
      // @ts-ignore
      api.postEmoji.mockResolvedValueOnce(newEmoji);
      const postResponse = await BotEmoji.post(api, [true]);
      expect(postResponse.id).toBe(newEmoji.id);
      expect(postResponse.apiResponse).toEqual(newEmoji.apiRequest);
      expect(api.postEmoji).toHaveBeenCalledTimes(1);
    });

    test("posts no emoji when no content exists", async () => {
      const postResponse = await BotEmoji.post(api, [undefined]);
      expect(postResponse.id).toBe(undefined);
      expect(postResponse.apiResponse).toEqual(noRequest.apiRequest);
      expect(api.postEmoji).toHaveBeenCalledTimes(0);
    });

    test("properly handles 3XX-5XX response from GitLab", async () => {
      // @ts-ignore
      api.postEmoji.mockResolvedValueOnce(post_response_unauthorized_401);
      const postResponse = await BotEmoji.post(api, [true]);
      expect(postResponse.id).toBe(-1);
      // expect(postResponse.apiRequest).toEqual(unauthorized_401);
      expect(api.postEmoji).toHaveBeenCalledTimes(1);
    });

    test("properly handles error returned from fetch", async () => {
      // @ts-ignore
      api.postEmoji.mockResolvedValueOnce(get_response_fetch_network_error);
      const postResponse = await BotEmoji.post(api, [true]);
      expect(postResponse.id).toBe(undefined);
      // expect(postResponse.apiRequest).toEqual(
      //   get_response_fetch_network_error.apiRequest,
      // );
      expect(api.postEmoji).toHaveBeenCalledTimes(1);
    });
  });
});
