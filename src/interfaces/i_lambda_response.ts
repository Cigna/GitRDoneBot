import * as HttpStatus from "http-status-codes";
import { LoggerFactory } from "../util";

const logger = LoggerFactory.getInstance();

/** Interface required by AWS Lambda*/
export interface LambdaResponse {
  body: string;
  statusCode: number;
}

export class HealthCheckResponse implements LambdaResponse {
  readonly body: string;
  readonly statusCode: number;

  constructor(containerId: string, readonly event: any) {
    this.statusCode = HttpStatus.IM_A_TEAPOT;
    this.body = `CloudWatch timer healthcheck. Container ID: ${containerId}`;
    logger.info(this);
  }
}

export class NoActionResponse implements LambdaResponse {
  readonly body: string;
  readonly statusCode: number;

  constructor() {
    this.body = "No action required for this state";
    this.statusCode = HttpStatus.OK;
    logger.info(this);
  }
}

export class ErrorResponse implements LambdaResponse {
  readonly body: string;
  readonly statusCode: number;

  constructor(errMessage?: string) {
    if (errMessage) {
      this.body = errMessage;
    } else {
      this.body = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    logger.error(this);
  }
}

export class NotSupportedResponse implements LambdaResponse {
  readonly body: string;
  readonly statusCode: number;

  constructor(eventType: string | undefined) {
    this.body = `${eventType} is not a supported GitLab event.`;
    this.statusCode = HttpStatus.OK;
    logger.info(this);
  }
}
