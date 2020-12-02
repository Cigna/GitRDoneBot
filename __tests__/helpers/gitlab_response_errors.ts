import * as HttpStatus from "http-status-codes";
import {
  AuthorizationFailureResponse,
  NetworkFailureResponse,
} from "../../src/gitlab";

export const bad_request_400 = new NetworkFailureResponse(
  HttpStatus.BAD_REQUEST,
);
export const unauthorized_401 = new AuthorizationFailureResponse(
  HttpStatus.UNAUTHORIZED,
);
export const forbidden_403 = new AuthorizationFailureResponse(
  HttpStatus.FORBIDDEN,
);
export const not_found_404 = new NetworkFailureResponse(HttpStatus.NOT_FOUND);
export const internal_error_500 = new NetworkFailureResponse(
  HttpStatus.INTERNAL_SERVER_ERROR,
);
export const fetch_network_error = new NetworkFailureResponse(
  HttpStatus.BAD_GATEWAY,
);
