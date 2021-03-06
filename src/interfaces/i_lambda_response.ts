import * as HttpStatus from "http-status-codes";
import { BotActionResponse } from "../bot_actions";
import { CustomConfig } from "../custom_config/custom_config";
import { PostORPutResponse } from "../gitlab";
import { LoggerFactory } from "../util";
import { MergeRequestEvent } from "./i_merge_request_event";

const logger = LoggerFactory.getInstance();

/** Interface required by AWS Lambda*/
export interface LambdaResponse {
  body: string;
  statusCode: number;
}

export class HealthCheckResponse implements LambdaResponse {
  readonly body: string;
  readonly statusCode: number;

  constructor(event: any, containerId?: string) {
    this.statusCode = HttpStatus.OK;

    if (event.source === "aws.events") {
      // lambda warmer ping
      this.body = `CloudWatch timer healthcheck. Container ID: ${containerId}`;
    } else {
      // external infra ping
      this.body = `External ${event.headers["Healthcheck"]} infra healthcheck.`;
    }

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

/**
 * Instances of this class indicate that GitRDoneBot does not have correct end-user-enabled permissions to send all GET or POST requests to the GitLab Merge Request.
 */
export class IncorrectPermissionsResponse implements LambdaResponse {
  readonly body: string;
  readonly statusCode = HttpStatus.UNAUTHORIZED;

  constructor(event: MergeRequestEvent) {
    this.body = JSON.stringify(event);
    logger.info({
      statusCode: this.statusCode,
      body: JSON.parse(this.body),
    });
  }
}

/**
 * Instances of this class indicate that Comment POST request failed due to API/Network failure beyond our control. Will trigger a retry of request by GitLab.
 */
export class CommentFailedResponse implements LambdaResponse {
  readonly body: string;
  readonly statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

  constructor(
    mrEvent: MergeRequestEvent,
    customConfig: CustomConfig,
    botActionResponses: BotActionResponse[],
    emoji: {
      emoji: string;
      apiResponse: PostORPutResponse;
    },
    comment: string,
  ) {
    const bodyObj = {
      mrEvent: mrEvent,
      customConfig: customConfig,
      botActionResponses: botActionResponses,
      emoji: emoji,
      comment: comment,
    };
    logger.info({
      statusCode: this.statusCode,
      body: bodyObj,
    });
    this.body = JSON.stringify(bodyObj);
  }
}

/**
 * Instances of this class indicate that Comment POST request succeeded.
 */
export class CommentSuccessResponse implements LambdaResponse {
  readonly body: string;
  readonly statusCode = HttpStatus.CREATED;

  constructor(
    mrEvent: MergeRequestEvent,
    customConfig: CustomConfig,
    botActionResponses: BotActionResponse[],
    emoji: {
      emoji: string;
      apiResponse: PostORPutResponse;
    },
    comment: string,
  ) {
    const bodyObj = {
      mrEvent: mrEvent,
      customConfig: customConfig,
      botActionResponses: botActionResponses,
      emoji: emoji,
      comment: comment,
    };
    logger.info({
      statusCode: this.statusCode,
      body: bodyObj,
    });
    this.body = JSON.stringify(bodyObj);
  }
}

/**
 * Instances of this class indicate that no Comment POST request is required.
 */
export class NoCommentNeededResponse implements LambdaResponse {
  readonly body: string;
  readonly statusCode = HttpStatus.OK;

  constructor(
    mrEvent: MergeRequestEvent,
    customConfig: CustomConfig,
    botActionResponses: BotActionResponse[],
  ) {
    const bodyObj = {
      mrEvent: mrEvent,
      customConfig: customConfig,
      botActionResponses: botActionResponses,
    };
    logger.info({
      statusCode: this.statusCode,
      body: bodyObj,
    });
    this.body = JSON.stringify(bodyObj);
  }
}
