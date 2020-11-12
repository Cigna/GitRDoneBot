import * as HttpStatus from "http-status-codes";
import { FailedResponse } from "../../src/gitlab";

export const bad_request_400 = new FailedResponse(HttpStatus.BAD_REQUEST);
export const unauthorized_401 = new FailedResponse(HttpStatus.UNAUTHORIZED);
export const not_found_404 = new FailedResponse(HttpStatus.NOT_FOUND);
export const internal_error_500 = new FailedResponse(
  HttpStatus.INTERNAL_SERVER_ERROR,
);
export const fetch_network_error = new FailedResponse(HttpStatus.BAD_GATEWAY);
