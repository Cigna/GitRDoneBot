import {
  BuildPostORPutResponse,
  NotFoundORNetworkFailureResponse,
  SuccessfulGetResponse,
  SuccessfulPostORPutResponse,
} from "../../src/gitlab/api_responses";

describe("SuccessfulGetResponse constructor", () => {
  describe("When an undefined result object is passed into constructor", () => {});
  test("result property is set to be an empty object", () => {
    const apiResponse = new SuccessfulGetResponse(200, undefined);
    expect(apiResponse.result).toStrictEqual({});
  });
});

describe("BuildPostORPutResponse function", () => {
  describe("When api request is successful", (statusCode = 201) => {
    describe("body is NOT undefined and contains property id", (body = {
      id: 1,
    }) => {
      test("instance of SuccessfulPostORPutResponse is returned", () => {
        expect(BuildPostORPutResponse(statusCode, body)).toBeInstanceOf(
          SuccessfulPostORPutResponse,
        );
      });
    });
    describe("body is NOT undefined and does NOT contain property id", (body = {}) => {
      test("instance of NotFoundORNetworkFailureResponse is returned", () => {
        expect(BuildPostORPutResponse(statusCode, body)).toBeInstanceOf(
          NotFoundORNetworkFailureResponse,
        );
      });
    });
    describe("body IS undefined", (body = undefined) => {
      test("instance of NotFoundORNetworkFailureResponse is returned", () => {
        expect(BuildPostORPutResponse(statusCode, body)).toBeInstanceOf(
          NotFoundORNetworkFailureResponse,
        );
      });
    });
  });
});
