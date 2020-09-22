import * as winston from "winston";
import { BotAction } from "../bot_action";
import { GitLabGetResponse, GitLabAPIRequest } from "../../gitlab";
import { NewGitWhoDisNote } from "./new_git_who_dis_note";

/**
 * This class extends the `BotAction` class by analyzing the name of the author of the GitLab Merge Request.
 */
export class NewGitWhoDis extends BotAction {
  private constructor(
    apiRequest: GitLabAPIRequest,
    goodGitPractice: boolean,
    mrNote: string,
  ) {
    super(apiRequest, goodGitPractice, mrNote);
  }

  /**
   * Constructs a complete Bot Action object by analyzing the author name.
   * @param authorName the name of the GitLab user who authored the Merge Request
   * @param logger an instance of winston logger
   * @returns BotAction object constructed after checking that the author name is not a LAN ID,
   * determining goodGitPractice based on that check, and instantiating a new note object
   * */
  static async from(
    logger: winston.Logger,
    authorName: string,
  ): Promise<BotAction> {
    const goodGitPractice: boolean = this.authorNameIsNotLanId(authorName);
    const apiResponse: GitLabGetResponse = GitLabGetResponse.noRequestNeeded();

    return new BotAction(
      apiResponse.apiRequest,
      goodGitPractice,
      NewGitWhoDisNote.buildMessage(authorName, goodGitPractice, logger),
    );
  }

  // Change this to check for the format of your organizations default GitLab account id
  private static authorNameIsNotLanId(authorName: string): boolean {
    const regex = new RegExp(/^[a-zA-Z]\d{5}$/);
    const authorNameIsLanId: boolean = regex.test(authorName);
    return !authorNameIsLanId;
  }
}
