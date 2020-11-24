import * as HttpStatus from "http-status-codes";
import { BotActionResponse } from "../bot_actions";
import { CustomConfig } from "../custom_config/custom_config";
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

// IncorrectPermissionsResponse
// *** Scenario 0. Comment posting fails ***
// * REASON:
//   * Incorrect project permissions
// * CRITERIA:
//   * EITHER One or more Bot Actions returns a "IncorrectPermissionsFailure" response, don't even try to post
//   * XOR we try to post the comment and get back 401/403
// * ASSUMPTIONS:
//   * If one API-dependent Bot Action fails due to incorrect permissions, all API-dependent Bot Actions will fail
//   * If API-dependent Bot Actions fail, comment posting will also fail due to lack of permissions
//   * We can return a 4XX response for our own alerting and logging, but will not be sent to GitLab unless we map at APIGW layer
// * LOGGING:
//   * body
//     * GitLab event info
//     * ?CustomConfig?
//     * ?All Bot Action responses?
//   * statusCode
// * RESPONSE TYPE:
//   * IncorrectPermissionsResponse
//   * statusCode 207/401/403: DON'T want to trigger GitLab retry
export class IncorrectPermissionsResponse implements LambdaResponse {
  readonly body: string;
  readonly statusCode = 401;

  constructor(event: MergeRequestEvent) {
    this.body = JSON.stringify(event);
    logger.info({
      statusCode: this.statusCode,
      body: JSON.parse(this.body),
    });
  }
}

// CommentFailedResponse
// *** Scenario 1. Comment posting fails ***
// * REASON:
//   * GitLab API/network failure beyond our control
// * CRITERIA:
//   * At least one SuccessfulBotAction response from an API-dependent Bot Action
//   * Comment POST returns failed response due to timeout or other network failure (408, 413, 5XX codes?)
//     * Need to confirm GitLab codes for API failure other than 401/403
// * RESPONSE TYPE:
//   * CommentFailedResponse
//   * statusCode 500: DO want to trigger GitLab retry
// * ASSUMPTIONS:
//   * GitLab will resend event if it receives 500
//   * We need to map this at APIGW layer to pass back 500 to GitLab
// * LOGGING:
//   * body
//     * GitLab event info
//     * CustomConfig
//     * All Bot Action responses
//     * Emoji info
//     * Comment info
//   * statusCode
export class CommentFailedResponse implements LambdaResponse {
  readonly body: string;
  readonly statusCode = 500;

  constructor(
    mrEvent: MergeRequestEvent,
    customConfig: CustomConfig,
    botActionResponses: BotActionResponse[],
    emoji: string,
    comment: string,
  ) {
    this.body = JSON.stringify({
      mrEvent: mrEvent,
      customConfig: customConfig,
      botActionResponses: botActionResponses,
      emoji: emoji,
      comment: comment,
    });
    logger.info({
      statusCode: this.statusCode,
      body: JSON.parse(this.body),
    });
  }
}

// CommentSuccessResponse
// *** Scenario 2. Comment posting succeeds ***
// * REASON:
//   * Receive 201 back from GitLab
// * CRITERIA:
//   * At least one SuccessfulBotAction response from an API-dependent Bot Action
// * RESPONSE TYPE:
//   * CommentSuccessResponse
//   * statusCode 201
// * ASSUMPTIONS:
//   * If at least one API-dependent Bot Action returns SuccessfulBotAction response, there are no permissions issues
// * LOGGING:
//   * body
//     * GitLab event info
//     * CustomConfig
//     * All Bot Action responses
//     * Emoji info
//     * Comment info
//   * statusCode
export class CommentSuccessResponse implements LambdaResponse {
  readonly body: string;
  readonly statusCode = 201;

  constructor(
    mrEvent: MergeRequestEvent,
    customConfig: CustomConfig,
    botActionResponses: BotActionResponse[],
    emoji: string,
    comment: string,
  ) {
    this.body = JSON.stringify({
      mrEvent: mrEvent,
      customConfig: customConfig,
      botActionResponses: botActionResponses,
      emoji: emoji,
      comment: comment,
    });
    logger.info({
      statusCode: this.statusCode,
      body: JSON.parse(this.body),
    });
  }
}

// NoCommentNeededResponse
// *** Scenario 3. Comment posting not needed ***
// * REASON:
//   * No mrNote string to post
// * CRITERIA:
//   * All Bot Actions return SuccessfulBotActionWithNothingToSay
// * RESPONSE TYPE:
//   * NoCommentNeededResponse
//   * statusCode 200/204
// * ASSUMPTIONS:
//   * None I can think of
// * LOGGING:
//   * body
//     * GitLab event info
//     * ?CustomConfig?
//     * ?All Bot Action responses?
//     * Emoji info
//     * ?Comment info?
//   * statusCode
export class NoCommentNeededResponse implements LambdaResponse {
  readonly body: string;
  readonly statusCode = 200;

  constructor(
    mrEvent: MergeRequestEvent,
    customConfig: CustomConfig,
    botActionResponses: BotActionResponse[],
  ) {
    this.body = JSON.stringify({
      mrEvent: mrEvent,
      customConfig: customConfig,
      botActionResponses: botActionResponses,
    });
    logger.info({
      statusCode: this.statusCode,
      body: JSON.parse(this.body),
    });
  }
}
