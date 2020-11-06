import { Context, Handler } from "aws-lambda";
import { LambdaResponse } from "./src/interfaces";
import { MergeRequestApi } from "./src/gitlab";
import {
  BotActionsResponse,
  getMrId,
  getObjectKind,
  getProjectId,
  getState,
} from "./src/merge_request";
import { winlog, getToken, getBaseURI } from "./src/util";
import * as HttpStatus from "http-status-codes";
import { CustomConfig } from "./src/custom_config/custom_config";

let containerId: string;

export class HealthCheckResponse implements LambdaResponse {
  body = "CloudWatch timer healthcheck";
  statusCode = HttpStatus.IM_A_TEAPOT;
}

export class NoActionResponse implements LambdaResponse {
  body = "No action required for this state";
  statusCode = HttpStatus.OK;
}

export class ErrorResponse implements LambdaResponse {
  body = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
  statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
}

export class NotSupportedResponse implements LambdaResponse {
  body = "Not a supported GitLab event.";
  statusCode = HttpStatus.OK;
}

/**
 * Processes incoming GitLab webhook events that have come through API Gateway.
 *
 * @param event GitLab webhook event wrapped with AWS metadata. The `body` property of this param is the
 * original GitLab webhook event, which is a stringified JSON object.
 *
 * @returns
 * 1. BotActionsResponse when incoming event is a Merge Request event in a supported state.
 * 1. GenericResponse with "not supported" message when incoming event is not a Merge Request event.
 * 1. GenericResponse with "no action needed" message when incoming event is a Merge Request event in an unsupported state.
 * 1. GenericResponse with standard HTTP 500 internal server error message if any error occurs while processing event.
 */
const handleGitLabWebhook = async (
  event: any,
): Promise<BotActionsResponse | NoActionResponse | ErrorResponse> => {
  let gitLabEvent: any;
  let token, baseURI, objectKind: string | undefined;
  let response!: BotActionsResponse | NoActionResponse | ErrorResponse;

  try {
    gitLabEvent = JSON.parse(event.body);
    objectKind = getObjectKind(gitLabEvent);
    winlog.info(gitLabEvent);
  } catch (err) {
    objectKind = undefined;
    winlog.error(`Error parsing event.body: ${err.message}`);
    response = new ErrorResponse();
  }

  try {
    token = getToken(process.env.GITLAB_BOT_ACCOUNT_API_TOKEN);
    baseURI = getBaseURI(process.env.GITLAB_BASE_URI);
  } catch (err) {
    winlog.error(`Env var loading Error: ${err.message}`);
    response = new ErrorResponse();
  }

  if (response instanceof ErrorResponse == false) {
    switch (objectKind) {
      case "merge_request":
        const state = getState(gitLabEvent);
        /**
         * We only perform analysis on Merge Request events in the following states
         * in order to minimize the chattiness of the service.
         */
        if (state === "open" || state === "merge" || state === "update") {
          const projectId = getProjectId(gitLabEvent);
          const mrId = getMrId(gitLabEvent);

          const api = new MergeRequestApi(
            token as string,
            projectId,
            mrId,
            baseURI as string,
            winlog,
          );

          const customConfig: CustomConfig = await CustomConfig.from(api);

          /** No action required for update state if custom config
           * toggle for updateMergeRequestComment is set to false */
          if (
            state === "update" &&
            customConfig.updateMergeRequestComment === false
          ) {
            response = new NoActionResponse();
          } else {
            response = await BotActionsResponse.from(
              api,
              customConfig,
              gitLabEvent,
              state,
              winlog,
            );
          }
        } else {
          /** No action required for any MR states besides open, merge, and update */
          response = new NoActionResponse();
        }
        break;
      default:
        /** No action required for any incoming GitLab event that is not a merge request */
        response = new NotSupportedResponse();
    }
  }

  return response;
};

/**
 * Lambda function that processes incoming events.
 * @param event GitLab webhook or CloudWatch Rule that triggers lambda. The `body` property
 * only exists on GitLab webhook events, and will not exist on CloudWatch health check event.
 * @param context Lambda context passed in by AWS API Gateway
 * @returns LambdaResponse standard interface determined by AWS
 * 1. If event is GitLab webhook, returns wrapped BotActions response
 * 1. If event is CloudWatch Rule, returns wrapped GenericResponse response
 *  @remarks Rule set in CloudWatch that pings the Lambda every 15 minutes in order to reduce timeouts from cold start.
 * https://read.acloud.guru/how-to-keep-your-lambda-functions-warm-9d7e1aa6e2f0
 * */
const webhook: Handler = async (
  event: any,
  context: Context,
): Promise<LambdaResponse> => {
  if (!containerId && context.hasOwnProperty("awsRequestId")) {
    containerId = context.awsRequestId;
  }

  const response:
    | BotActionsResponse
    | HealthCheckResponse = event.hasOwnProperty("body")
    ? await handleGitLabWebhook(event)
    : new HealthCheckResponse();

  winlog.info(response);

  return response;
};

export { webhook, handleGitLabWebhook };
