import * as HttpStatus from "http-status-codes";
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
      HttpStatus.NO_CONTENT
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
    if (result == undefined) {
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

export function BuildGetResponse(
  statusCode: number,
  body: [] | {} | undefined,
): SuccessfulGetResponse | FailedResponse {
  let response: SuccessfulGetResponse | FailedResponse;

  // need to explicitly test true and false, since success will be
  // undefined when no api request is required
  if (Response.computeSuccess(statusCode) && body !== undefined) {
    response = new SuccessfulGetResponse(statusCode, body);
  } else {
    response = new FailedResponse(statusCode);
  }
  return response;
}

export function BuildPostORPutResponse(
  statusCode: number,
  body?: any,
): SuccessfulPostORPutResponse | FailedResponse {
  let response: SuccessfulPostORPutResponse | FailedResponse;

  // TODO: is there ever a case where success would be true but body.id wouldn't exist? we don't seem to be handling that here
  if (Response.computeSuccess(statusCode) === true && body.id !== undefined) {
    response = new SuccessfulPostORPutResponse(statusCode, body.id);
  } else {
    response = new FailedResponse(statusCode);
  }
  return response;
}
