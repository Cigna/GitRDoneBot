import { Status } from "../util/status";
import * as HttpStatus from "http-status-codes";

/**
 * Each instance of this class provides a standardized abstraction of HTTP requests by including an instance of the Status class and
 * `success` which is an easy to reference boolean that encapsulates HTTP status code checking across bot actions.
 */
export class GitLabAPIRequest {
  private constructor(
    readonly success: boolean | undefined,
    readonly status: Status,
  ) {}

  /**
   * Formats status information for GitLab API responses.
   * @param statusCode HTTP status code
   * @param statusMessage optional param for constructing non-standard HTTP status message
   * @returns GitLabAPIRequest that contains information about the status and success of the request:
   * 1. when `statusCode` is 200 or 201, `success` is `true`
   * 1. when `statusCode` is 204, `success` is `undefined`
   * 1. for all other codes, `success` is `false`
   * @remarks `success` will be `undefined` when API call is not made in order to distinguish from actual failed API calls.
   * */
  static from(statusCode: number, statusMessage?: string): GitLabAPIRequest {
    let success: boolean | undefined;

    if (statusCode === HttpStatus.OK || statusCode === HttpStatus.CREATED) {
      success = true;
    } else if (statusCode === HttpStatus.NO_CONTENT) {
      success = undefined;
    } else {
      success = false;
    }

    return new GitLabAPIRequest(
      success,
      Status.from(statusCode, statusMessage),
    );
  }
}
