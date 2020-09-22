import * as HttpStatus from "http-status-codes";
import {
  GitLabAPIRequest,
  GitLabPostResponse,
  GitLabGetResponse,
} from "../../src/gitlab";

export const bad_request_400 = GitLabAPIRequest.from(HttpStatus.BAD_REQUEST);

export const unauthorized_401 = GitLabAPIRequest.from(HttpStatus.UNAUTHORIZED);
export const post_response_unauthorized_401 = GitLabPostResponse.from(
  HttpStatus.UNAUTHORIZED,
);

export const not_found_404 = GitLabAPIRequest.from(HttpStatus.NOT_FOUND);

export const get_response_not_found_404 = GitLabGetResponse.from(
  HttpStatus.NOT_FOUND,
  {},
);

export const get_response_unauthorized_401 = GitLabGetResponse.from(
  HttpStatus.UNAUTHORIZED,
  {},
);

export const internal_error_500 = GitLabAPIRequest.from(
  HttpStatus.INTERNAL_SERVER_ERROR,
);

export const fetch_network_error = GitLabAPIRequest.from(
  HttpStatus.BAD_GATEWAY,
);

export const get_response_fetch_network_error = GitLabGetResponse.from(
  HttpStatus.BAD_GATEWAY,
  {},
);
