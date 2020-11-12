// TEST FIXTURES

import {
  FailedResponse,
  MergeRequestApi,
  NoRequestNeeded,
  SuccessfulPostORPutResponse,
} from "../../src/gitlab";
import { winlog } from "../../src/util";
import { BotEmoji } from "../../src/merge_request";
import { unauthorized_401, fetch_network_error } from "../helpers";

const newEmoji = new SuccessfulPostORPutResponse(201, 42);

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
      expect(postResponse.apiResponse).toBeInstanceOf(
        SuccessfulPostORPutResponse,
      );
      expect(api.postEmoji).toHaveBeenCalledTimes(1);
    });

    test("posts no emoji when no content exists", async () => {
      const postResponse = await BotEmoji.post(api, [undefined]);
      expect(postResponse.apiResponse).toBeInstanceOf(NoRequestNeeded);
      expect(api.postEmoji).toHaveBeenCalledTimes(0);
    });

    test("properly handles 3XX-5XX response from GitLab", async () => {
      // @ts-ignore
      api.postEmoji.mockResolvedValueOnce(unauthorized_401);
      const postResponse = await BotEmoji.post(api, [true]);
      expect(postResponse.apiResponse).toBeInstanceOf(FailedResponse);
      expect(api.postEmoji).toHaveBeenCalledTimes(1);
    });

    test("properly handles error returned from fetch", async () => {
      // @ts-ignore
      api.postEmoji.mockResolvedValueOnce(fetch_network_error);
      const postResponse = await BotEmoji.post(api, [true]);
      expect(postResponse.apiResponse).toBeInstanceOf(FailedResponse);
      expect(api.postEmoji).toHaveBeenCalledTimes(1);
    });
  });
});
