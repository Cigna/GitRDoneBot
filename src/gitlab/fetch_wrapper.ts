import fetch from "node-fetch";
import * as HttpStatus from "http-status-codes";
import { BuildGetResponse, BuildPostORPutResponse } from ".";
import {
  AuthorizationFailureResponse,
  NetworkFailureResponse,
  SuccessfulGetResponse,
  SuccessfulPostORPutResponse,
} from "./api_responses";
import { LoggerFactory } from "../util";
const logger = LoggerFactory.getInstance();
interface RawFetchResponse {
  body: [] | {} | undefined | string;
  status: number;
}

/**
 * This utility class contains methods and properties required to make HTTP calls using the Fetch API library
 * and building custom response objects.
 * @remarks Fetch treats 4XX or 5XX response codes as successful responses.
 * Fetch differentiates these from a 'network error' which will throw an error in the try/catch block.
 */
export class FetchWrapper {
  private readonly commonHeaders: {};
  private readonly deleteOptions: {};
  private readonly getOptions: {};

  constructor(readonly token: string) {
    this.commonHeaders = {
      "Content-Type": "application/json",
      "Private-Token": this.token,
    };
    this.deleteOptions = {
      headers: this.commonHeaders,
      method: "DELETE",
    };
    this.getOptions = {
      headers: this.commonHeaders,
      method: "GET",
    };
  }

  /**
   * Sends an HTTP GET request
   * @param uri The specific API endpoint to send a request to
   * @returns `ApiResponse` subclass instance that indicates whether the call succeeded or failed
   */
  public async makeGetRequest(
    uri: string,
  ): Promise<
    | SuccessfulGetResponse
    | NetworkFailureResponse
    | AuthorizationFailureResponse
  > {
    let response;
    try {
      const result: RawFetchResponse = await this.handleFetch(
        uri,
        this.getOptions,
      );
      response = BuildGetResponse(result.status, result.body);
    } catch (err) {
      logger.error(`${err}`);
      response = BuildGetResponse(HttpStatus.BAD_GATEWAY, {});
    }
    return response;
  }

  /**
   * Sends an HTTP PUT request
   * @param uri The specific API endpoint to send a request to
   * @param qs Querystring data required by the API endpoint
   * @returns `ApiResponse` subclass instance that indicates whether the call succeeded or failed
   */
  public async makePutRequest(
    uri: string,
    qs: any,
  ): Promise<SuccessfulPostORPutResponse | NetworkFailureResponse> {
    let response;
    const putOptions = {
      body: JSON.stringify(qs),
      headers: this.commonHeaders,
      method: "PUT",
    };

    try {
      const result: any = await this.handleFetch(uri, putOptions);
      response = BuildPostORPutResponse(result.status, result.body);
    } catch (err) {
      logger.error(`${err}`);
      response = BuildPostORPutResponse(HttpStatus.BAD_GATEWAY);
    }
    return response;
  }

  /**
   * Sends an HTTP POST request
   * @param uri The specific API endpoint to send a request to
   * @param qs Querystring data required by the API endpoint
   * @returns `ApiResponse` subclass instance that indicates whether the call succeeded or failed
   */
  public async makePostRequest(
    uri: string,
    qs: any,
  ): Promise<SuccessfulPostORPutResponse | NetworkFailureResponse> {
    let response;
    const postOptions = {
      body: JSON.stringify(qs),
      headers: this.commonHeaders,
      method: "POST",
    };

    try {
      const result: any = await this.handleFetch(uri, postOptions);
      response = BuildPostORPutResponse(result.status, result.body);
    } catch (err) {
      logger.error(`${err}`);
      response = BuildPostORPutResponse(HttpStatus.BAD_GATEWAY);
    }
    return response;
  }

  private handleFetch(uri: string, options: any): Promise<RawFetchResponse> {
    return fetch(uri, options)
      .then((res) => res.json().then((body) => ({ body, status: res.status })))
      .catch((error) => {
        logger.error(`Error: ${error}`);
        return { body: {}, status: 500 };
      });
  }

  /**
   * HELPER METHOD FOR TESTS ONLY
   * @remarks
   * If DELETE is successful, will return a 204 code as result.
   */
  public async makeDeleteRequest(
    uri: string,
  ): Promise<
    | SuccessfulGetResponse
    | NetworkFailureResponse
    | AuthorizationFailureResponse
  > {
    let response;
    try {
      const statusCode: number = await this.handleDeleteFetch(
        uri,
        this.deleteOptions,
      );
      response = BuildGetResponse(statusCode, {});
    } catch (err) {
      logger.error(`${err}`);
      response = BuildGetResponse(HttpStatus.BAD_GATEWAY, {});
    }
    return response;
  }

  /**
   * HELPER METHOD FOR TESTS ONLY
   * @remarks
   * GitLab API doesn't send back a response body on delete, it just sends
   * back a 204 status.
   */
  private handleDeleteFetch(uri: string, options: any): Promise<number> {
    return fetch(uri, options)
      .then((res) => res.status)
      .catch((error) => {
        logger.error(`Error: ${error}`);
        return 500;
      });
  }
}
