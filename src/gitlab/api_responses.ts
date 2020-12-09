import * as HttpStatus from "http-status-codes";

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
export class NetworkFailureResponse extends ApiResponse {
  // unique property to ensure safe static type-checking
  // required due to how TS implements structural subtyping
  private _networkFailure = true;
  constructor(readonly statusCode: number) {
    super(statusCode);
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

/**
 * @param statusCode HTTP status code
 * @param body Data payload received from HTTP GET request
 * @returns `SuccessfulGetResponse` or `FailedResponse`
 */
export function BuildGetResponse<T>(
  statusCode: number,
  body: T[] | T | undefined,
):
  | SuccessfulGetResponse
  | NetworkFailureResponse
  | AuthorizationFailureResponse {
  let response;

  if (ApiResponse.computeSuccess(statusCode) && body !== undefined) {
    response = new SuccessfulGetResponse(statusCode, body);
  } else if (
    statusCode === HttpStatus.UNAUTHORIZED ||
    statusCode === HttpStatus.FORBIDDEN
  ) {
    response = new AuthorizationFailureResponse(statusCode);
  } else {
    response = new NetworkFailureResponse(statusCode);
  }
  return response;
}

/**
 * @param statusCode HTTP status code
 * @param body (Optional) Data payload received from HTTP PUT/POST request
 * @returns `SuccessfulPostORPutResponse` or `FailedResponse`
 */
export function BuildPostORPutResponse(
  statusCode: number,
  body?: any,
): SuccessfulPostORPutResponse | NetworkFailureResponse {
  let response;

  if (
    ApiResponse.computeSuccess(statusCode) === true &&
    body !== undefined &&
    body.hasOwnProperty("id")
  ) {
    response = new SuccessfulPostORPutResponse(statusCode, body.id);
  } else {
    response = new NetworkFailureResponse(statusCode);
  }
  return response;
}
