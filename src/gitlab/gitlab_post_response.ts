// import { GitLabAPIRequest } from "./gitlab_API_request_status";
// import * as HttpStatus from "http-status-codes";

// /**
//  * Each instance of this class contains an instance of `GitLabAPIRequest` and, if successful, `id` received from GitLab API `POST` request.
//  */
// export class GitLabPostResponse {
//   private constructor(
//     readonly apiRequest: GitLabAPIRequest,
//     readonly id: number,
//   ) {}

//   /**
//    * Formats response received from GitLab API `POST` request.
//    * @param statusCode HTTP status code
//    * @param body optional param for JSON payload response received from API request
//    * @param statusMessage optional param for constructing non-standard HTTP status message
//    * @returns GitLabGetResponse containing HTTP status information and `id` that will be:
//    * 1. number for created item returned by API call
//    * 1. -1 if unable to create a new item
//    * 1. `undefined` if API call was successful but no id was returned
//    * */
//   static from(
//     statusCode: number,
//     body?: any,
//     statusMessage?: string,
//   ): GitLabPostResponse {
//     let id;

//     // if statusMessage doesn't exist, undefined will be passed in here
//     const apiRequest = GitLabAPIRequest.from(statusCode, statusMessage);

//     // TODO: is there ever a case where success would be true but body.id wouldn't exist? we don't seem to be handling that here
//     if (apiRequest.success === true && body.id !== undefined) {
//       id = body.id;
//     } else if (apiRequest.success === false) {
//       id = -1;
//     }

//     return new GitLabPostResponse(apiRequest, id);
//   }

//   static noRequestNeeded(): GitLabPostResponse {
//     return GitLabPostResponse.from(
//       HttpStatus.NO_CONTENT,
//       {},
//       "No api call required for this state",
//     );
//   }

//   static unknownState(): GitLabPostResponse {
//     return GitLabPostResponse.from(
//       HttpStatus.INTERNAL_SERVER_ERROR,
//       {},
//       "Unknown state encountered, no api call made",
//     );
//   }
// }
