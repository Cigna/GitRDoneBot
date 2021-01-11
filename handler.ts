import { Context, Handler } from "aws-lambda";
import {
  ErrorResponse,
  HealthCheckResponse,
  LambdaResponse,
  NoActionResponse,
  NotSupportedResponse,
} from "./src/interfaces";
import { GitLabApi } from "./src/gitlab";
import { getMrId, getProjectId, getState } from "./src/merge_request";
import { getToken, getBaseURI } from "./src/util";
import { CustomConfig } from "./src/custom_config/custom_config";
import { runBotActions } from "./src/bot_actions";

let containerId: string;

/**
 * Processes incoming GitLab webhook events that have come through API Gateway.
 *
 * @param event GitLab webhook event wrapped with AWS metadata. The `body` property of this param is the
 * original GitLab webhook event, which is a stringified JSON object.
 *
 * @returns a LambdaResponse of subtype
 * 1. BotActionsResponse when incoming event is a Merge Request event in a supported state.
 * 1. NotSupportedResponse with "not supported" message when incoming event is not a Merge Request event.
 * 1. NoActionResponse with "no action needed" message when incoming event is a Merge Request event in an unsupported state.
 * 1. ErrorResponse if there is an HTTP 500 internal server error message if any error occurs while processing event.
 */
const handleGitLabWebhook = async (event: any): Promise<LambdaResponse> => {
  let gitLabEvent: any;
  let token, baseURI;
  let response!: LambdaResponse;

  try {
    gitLabEvent = JSON.parse(event.body);
  } catch (err) {
    response = new ErrorResponse(`Error parsing event.body: ${err.message}`);
  }

  try {
    token = getToken(process.env.GITLAB_BOT_ACCOUNT_API_TOKEN);
    baseURI = getBaseURI(process.env.GITLAB_BASE_URI);
  } catch (err) {
    response = new ErrorResponse(`Env var loading Error: ${err.message}`);
  }

  if (!(response instanceof ErrorResponse)) {
    switch (event.headers["X-Gitlab-Event"]) {
      case "Merge Request Hook":
        const state = getState(gitLabEvent);
        /**
         * We only perform analysis on Merge Request events in the following states
         * in order to minimize the chattiness of the service.
         */
        if (state === "open" || state === "merge" || state === "update") {
          const projectId = getProjectId(gitLabEvent);
          const mrId = getMrId(gitLabEvent);

          const api = new GitLabApi(
            token as string,
            projectId,
            mrId,
            baseURI as string,
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
            response = await runBotActions(
              api,
              customConfig,
              gitLabEvent,
              state,
            );
          }
        } else {
          /** No action required for any MR states besides open, merge, and update */
          response = new NoActionResponse();
        }
        break;
      default:
        /** No action required for any incoming GitLab event that is not a merge request */
        response = new NotSupportedResponse(event.headers["X-Gitlab-Event"]);
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

  let response;

  if (event.hasOwnProperty("headers") && event.headers["X-Gitlab-Event"]) {
    response = await handleGitLabWebhook(event);
  } else {
    response = new HealthCheckResponse(event, containerId);
  }

  return response;
};

export { webhook, handleGitLabWebhook };
