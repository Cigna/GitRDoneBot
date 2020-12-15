import {
  GitLabApi,
  SuccessfulGetResponse,
  NotFoundORNetworkFailureResponse,
  SuccessfulPostORPutResponse,
} from "../gitlab";
import { Note } from "../interfaces";
import { getBotUsername } from "../util/env_var_loader";
import { LoggerFactory } from "../util";

const logger = LoggerFactory.getInstance();

/**
 * This abstract class contains the logic for posting comments to end-user's Merge Request.
 */
export abstract class BotComment {
  static caseForNewNote(state: string, updateToggle: boolean): boolean {
    return state === "open" || (state === "merge" && updateToggle === false);
  }

  static caseForUpdateNote(state: string, updateToggle: boolean): boolean {
    return state !== "open" && updateToggle === true;
  }

  /**
   * Evaluates parameters to one of three outcomes: posts new note from GRDBot to GitLab Merge Request, updates existing GRDBot note, or takes no action.
   * @param api an instance of the GitLabApi class that wraps HTTP requests to and responses from the GitLab API
   * @param state the state of the incoming Merge Request event from GitLab
   * @param updateToggle `true` updates previous GRDBot comment if exists; `false` always posts new comment
   * @param messages Array of `mrNote` strings
   * @returns
   * 1. `BotComment` with no action response when all messages are "NA"
   * 1. `BotComment` with new comment response when state is "open"
   * 1. `BotComment` with new comment response when state is "update" but no previous GRDBot comment exists on MR
   * 1. `BotComment` with update comment response when state is "update" and previous GRDBot comment exists on MR
   * 1. `BotComment` with new comment response when state is "merge" and `updateToggle` is `false`
   * 1. `BotComment` with new comment response when state is "merge", `updateToggle` is `true`, but no previous GRDBot comment exists on MR
   * 1. `BotComment` with update comment response when state is "merge", `updateToggle` is `true`, and previous GRDBot comment exists on MR
   * */
  static async post(
    api: GitLabApi,
    state: string,
    updateToggle: boolean,
    comment: string,
  ): Promise<SuccessfulPostORPutResponse | NotFoundORNetworkFailureResponse> {
    let response:
      | SuccessfulPostORPutResponse
      | NotFoundORNetworkFailureResponse;

    switch (true) {
      case this.caseForNewNote(state, updateToggle): {
        response = await api.newMRNote(comment);
        break;
      }
      case this.caseForUpdateNote(state, updateToggle): {
        const noteId = await this.getMRNoteId(api);
        if (noteId === -1) {
          response = await api.newMRNote(comment);
        } else {
          response = await api.editMRNote(noteId, comment);
        }
        break;
      }
      default: {
        response = new NotFoundORNetworkFailureResponse(500);
        logger.error(`comment.post: Encountered Unknown State`);
      }
    }

    return response;
  }

  /**
   * Gets id of oldest merge request note where author's username matches GITLAB_BOT_ACCOUNT_NAME defined in env vars
   * @param api an instance of the GitLabApi class that wraps HTTP requests to and responses from the GitLab API
   * @returns id of GRDBot note if it exists, or -1 if no GRDBot note exists
   * */
  static async getMRNoteId(api: GitLabApi): Promise<number> {
    const botName = getBotUsername(process.env.GITLAB_BOT_ACCOUNT_NAME);
    let noteId = -1;
    let noteCount = 100;
    let currentPage = 1;

    // Grab the next page of notes until the first note authored by GRDBot is found or the last page is reached.
    while (noteCount === 100) {
      const response = await api.getAllMRNotes(currentPage);
      if (
        response instanceof SuccessfulGetResponse &&
        response.result.length !== 0
      ) {
        const grdbNote: Note = response.result.find((note: Note) => {
          return note.author.username === botName;
        });
        noteId = grdbNote === undefined ? -1 : grdbNote.id;
        // set the noteCount to 0 to break the while loop if the noteId is a real number,
        // else set it to the length of the result array, which will cause the while loop
        // to continue if more notes exist
        noteCount = noteId === -1 ? response.result.length : 0;
        currentPage++;
      } else {
        noteCount = 0;
      }
    }
    return noteId;
  }
}
