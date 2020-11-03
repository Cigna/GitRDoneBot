import * as HttpStatus from "http-status-codes";
import {
  FailedGetResponse,
  GitLabAPIRequest,
  GitLabPostResponse,
} from "../../src/gitlab";

export const bad_request_400 = new FailedGetResponse(
  GitLabAPIRequest.from(HttpStatus.BAD_REQUEST),
);
export const unauthorized_401 = new FailedGetResponse(
  GitLabAPIRequest.from(HttpStatus.UNAUTHORIZED),
);
export const post_response_unauthorized_401 = GitLabPostResponse.from(
  HttpStatus.UNAUTHORIZED,
);

export const not_found_404 = new FailedGetResponse(
  GitLabAPIRequest.from(HttpStatus.NOT_FOUND),
);

export const get_response_not_found_404 = new FailedGetResponse(
  GitLabAPIRequest.from(HttpStatus.NOT_FOUND),
);

export const get_response_unauthorized_401 = new FailedGetResponse(
  GitLabAPIRequest.from(HttpStatus.UNAUTHORIZED),
);

export const internal_error_500 = GitLabAPIRequest.from(
  HttpStatus.INTERNAL_SERVER_ERROR,
);

export const fetch_network_error = GitLabAPIRequest.from(
  HttpStatus.BAD_GATEWAY,
);

export const get_response_fetch_network_error = new FailedGetResponse(
  GitLabAPIRequest.from(HttpStatus.BAD_GATEWAY),
);
