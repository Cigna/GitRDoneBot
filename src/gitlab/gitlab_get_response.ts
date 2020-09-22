import { GitLabAPIRequest } from "./gitlab_API_request_status";
import * as HttpStatus from "http-status-codes";

/**
 * Each instance of this class contains an instance of `GitLabAPIRequest` and, if it exists, payload received from GitLab API `GET` request.
 */
export class GitLabGetResponse {
  private constructor(
    readonly apiRequest: GitLabAPIRequest,
    readonly result: any,
  ) {}

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
  static from(
    statusCode: number,
    body: Record<string, any>,
    statusMessage?: string,
  ): GitLabGetResponse {
    let result: any;

    // if optional statusMessage param is not provided, undefined will be passed in here
    const apiRequest = GitLabAPIRequest.from(statusCode, statusMessage);

    // need to explicitly test true and false, since success will be
    // undefined when no api request is required
    if (apiRequest.success === true && body !== undefined) {
      result = body;
    } else if (apiRequest.success === false) {
      result = { message: "There was an error making the request." };
    }
    return new GitLabGetResponse(apiRequest, result);
  }

  static noRequestNeeded(): GitLabGetResponse {
    return GitLabGetResponse.from(
      HttpStatus.NO_CONTENT,
      {},
      "No api call required for this state",
    );
  }
}
