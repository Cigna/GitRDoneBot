import * as HttpStatus from "http-status-codes";

/**
 * Status class keeps format consistent for all responses returned by
 * 1. wrapped GitLab API responses
 * 1. the overall webhook response
 */
export class Status {
  private constructor(readonly code: number, readonly message: string) {}

  static from(code: number, customMessage?: string): Status {
    const message: string = customMessage || HttpStatus.getStatusText(code);

    return new Status(code, message);
  }

  /**
   * Provides an overall status from a set of status codes
   *
   * @param allCodes Array of status codes
   *
   * @returns
   * 1. Status with code of 200 when none of the elements of allCodes are a `4XX` or `5XX`.
   * 1. Status with code of 207 when at least one element of allCodes is a `4XX` or `5XX`.
   */
  static fromCodes(allCodes: Array<number>): Status {
    const statusCode: number = allCodes.some((code) => {
      return code >= 400;
    })
      ? 207
      : 200;
    return Status.from(statusCode);
  }

  /**
   * Creates a status with custom message for events where no action is required
   *
   * @returns Status with code of 200
   */
  static forNoAction(): Status {
    return Status.from(HttpStatus.OK, "No action required for this state");
  }

  /**
   * Creates a status with custom message for unsupported GitLab events.
   *
   * @returns Status with code of 200
   */
  static forNotSupported(): Status {
    return Status.from(HttpStatus.OK, "Not a supported GitLab event.");
  }

  /**
   * Creates a status with custom message for CloudWatch timer healthcheck
   *
   * @returns Status with code of 418
   */
  static forHealthCheck(): Status {
    return Status.from(HttpStatus.IM_A_TEAPOT, "CloudWatch timer healthcheck");
  }
}
