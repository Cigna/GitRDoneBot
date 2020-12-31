import * as HttpStatus from "http-status-codes";
import {
  AuthorizationFailureResponse,
  NotFoundORNetworkFailureResponse,
} from "../../src/gitlab";

export const bad_request_400 = new NotFoundORNetworkFailureResponse(
  HttpStatus.BAD_REQUEST,
);
export const unauthorized_401 = new AuthorizationFailureResponse(
  HttpStatus.UNAUTHORIZED,
);
export const forbidden_403 = new AuthorizationFailureResponse(
  HttpStatus.FORBIDDEN,
);
export const not_found_404 = new NotFoundORNetworkFailureResponse(
  HttpStatus.NOT_FOUND,
);
export const internal_error_500 = new NotFoundORNetworkFailureResponse(
  HttpStatus.INTERNAL_SERVER_ERROR,
);
export const fetch_network_error = new NotFoundORNetworkFailureResponse(
  HttpStatus.BAD_GATEWAY,
);
