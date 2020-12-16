import * as HttpStatus from "http-status-codes";
import fetch from "node-fetch";
import { LoggerFactory } from "../util";

const logger = LoggerFactory.getInstance();

/**
 * Base class that contains status code received from HTTP request.
 *
 * Is extended by multiple subclasses to capture state of request as a specific instance type.
 *
 * Subclasses contain different information relevant to their state, such as a response body
 */
export abstract class ApiResponse {
  readonly message: string;
  constructor(readonly statusCode: number) {
    this.message = HttpStatus.getStatusText(statusCode);
  }

  public static computeSuccess(statusCode: number): boolean {
    let success: boolean;

    if (
      statusCode === HttpStatus.OK ||
      statusCode === HttpStatus.CREATED ||
      statusCode === HttpStatus.NO_CONTENT
    ) {
      success = true;
    } else {
      success = false;
    }
    return success;
  }
}

/**
 * Subclass of ApiResponse. Contains data payload from GET request, if one exists.
 */
export class SuccessfulGetResponse extends ApiResponse {
  constructor(readonly statusCode: number, readonly result: any) {
    super(statusCode);
    if (result === undefined) {
      this.result = {};
    }
  }
}

/**
 * Subclass of ApiResponse. Used for all API requests that respond with codes indicating network failure.
 */
export class NotFoundORNetworkFailureResponse extends ApiResponse {
  readonly isNotFound: boolean;
  constructor(readonly statusCode: number) {
    super(statusCode);
    this.isNotFound = statusCode === HttpStatus.NOT_FOUND;
  }
}

/**
 * Subclass of ApiResponse. Used for all API requests that respond with codes 401 or 403.
 */
export class AuthorizationFailureResponse extends ApiResponse {
  // unique property to ensure safe static type-checking
  // required due to how TS implements structural subtyping
  private _authorizationFailure = true;
  constructor(readonly statusCode: number) {
    super(statusCode);
  }
}

/**
 * Subclass of ApiResponse. Always contains status code 204.
 */
export class NoRequestNeeded extends ApiResponse {
  // unique property to ensure safe static type-checking
  // required due to how TS implements structural subtyping
  private _noRequest = true;
  constructor() {
    super(HttpStatus.NO_CONTENT);
  }
}

/**
 * Subclass of ApiResponse. Contains id of object created by POST/PUT request, if one exists.
 */
export class SuccessfulPostORPutResponse extends ApiResponse {
  constructor(readonly statusCode: number, readonly id: number) {
    super(statusCode);
  }
}

export type GetResponse =
  | SuccessfulGetResponse
  | NotFoundORNetworkFailureResponse
  | AuthorizationFailureResponse;

export type PostORPutResponse =
  | SuccessfulPostORPutResponse
  | NotFoundORNetworkFailureResponse;

/**
 * @param statusCode HTTP status code
 * @param body Data payload received from HTTP GET request
 * @returns instance of the `ApiResponse` subclass that indicates success or failure of the HTTP request
 */
export function BuildGetResponse<T>(
  statusCode: number,
  body: T[] | T | undefined,
): GetResponse {
  let response;

  if (ApiResponse.computeSuccess(statusCode) && body !== undefined) {
    response = new SuccessfulGetResponse(statusCode, body);
  } else if (
    statusCode === HttpStatus.UNAUTHORIZED ||
    statusCode === HttpStatus.FORBIDDEN
  ) {
    response = new AuthorizationFailureResponse(statusCode);
  } else {
    response = new NotFoundORNetworkFailureResponse(statusCode);
  }
  return response;
}

/**
 * @param statusCode HTTP status code
 * @param body (Optional) Data payload received from HTTP PUT/POST request
 * @returns instance of the `ApiResponse` subclass that indicates success or failure of the HTTP request
 */
export function BuildPostORPutResponse(
  statusCode: number,
  body?: any,
): PostORPutResponse {
  let response;

  if (
    ApiResponse.computeSuccess(statusCode) === true &&
    body !== undefined &&
    body.hasOwnProperty("id")
  ) {
    response = new SuccessfulPostORPutResponse(statusCode, body.id);
  } else {
    response = new NotFoundORNetworkFailureResponse(statusCode);
  }
  return response;
}

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
  public async makeGetRequest(uri: string): Promise<GetResponse> {
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
  ): Promise<PostORPutResponse> {
    let response;
    const putOptions = {
      body: JSON.stringify(qs),
      headers: this.commonHeaders,
      method: "PUT",
    };

    try {
      const result: RawFetchResponse = await this.handleFetch(uri, putOptions);
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
  ): Promise<PostORPutResponse> {
    let response;
    const postOptions = {
      body: JSON.stringify(qs),
      headers: this.commonHeaders,
      method: "POST",
    };

    try {
      const result: RawFetchResponse = await this.handleFetch(uri, postOptions);
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
  public async makeDeleteRequest(uri: string): Promise<GetResponse> {
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
