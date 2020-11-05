import * as HttpStatus from "http-status-codes";

// TODO: Update all code comment docs

/**
 * Each instance of this class contains an instance of `GitLabAPIRequest` and, if it exists, payload received from GitLab API `GET` request.
 */

/**
 * Formats response received from GitLab API `GET` request.
 * @param statusCode HTTP status code
 * @param body JSON payload response received from API request
 * @param statusMessage optional param for constructing non-standard HTTP status message
 * @returns GitLabGetResponse containing HTTP status information and either:
 * * payload received from API call
 *
 * OR
 * * message conveying why there is no payload
 * @remarks `result` will be `undefined` when api call not required
 * */

class Response {
  readonly message: string;
  constructor(readonly statusCode: number) {
    this.message = HttpStatus.getStatusText(statusCode);
  }
  public static computeSuccess(statusCode: number): boolean {
    let success: boolean | undefined;

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
export class SuccessfulGetResponse extends Response {
  constructor(readonly statusCode: number, readonly result: any) {
    super(statusCode);
    if (result === undefined) {
      this.result = {};
    }
  }
}

export class FailedResponse extends Response {
  constructor(readonly statusCode: number) {
    super(statusCode);
  }
}
export class NoResponseNeeded extends Response {
  constructor() {
    super(HttpStatus.NO_CONTENT);
  }
}

export class SuccessfulPostORPutResponse extends Response {
  constructor(readonly statusCode: number, readonly id: number) {
    super(statusCode);
  }
}

export function BuildGetResponse<T>(
  statusCode: number,
  body: T[] | T | undefined,
): SuccessfulGetResponse | FailedResponse {
  let response: SuccessfulGetResponse | FailedResponse;

  if (Response.computeSuccess(statusCode) && body !== undefined) {
    response = new SuccessfulGetResponse(statusCode, body);
  } else {
    response = new FailedResponse(statusCode);
  }
  return response;
}

// TODO: what types can body potentially be
export function BuildPostORPutResponse<T>(
  statusCode: number,
  body?: any,
): SuccessfulPostORPutResponse | FailedResponse {
  let response: SuccessfulPostORPutResponse | FailedResponse;

  if (
    Response.computeSuccess(statusCode) === true &&
    body !== undefined &&
    body.hasOwnProperty("id")
  ) {
    response = new SuccessfulPostORPutResponse(statusCode, body.id);
  } else {
    response = new FailedResponse(statusCode);
  }
  return response;
}
