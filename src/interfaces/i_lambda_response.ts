import * as HttpStatus from "http-status-codes";

/** Interface required by AWS Lambda*/
export interface LambdaResponse {
  body: string;
  statusCode: number;
}

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
