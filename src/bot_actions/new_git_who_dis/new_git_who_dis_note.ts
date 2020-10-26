import * as winston from "winston";
import { BotActionNote } from "../bot_action_note";

/**
 * This class extends the `BotActionNote` class by analyzing different state combinations unique to the New Git Who Dis action.
 * Each instance of this class contains a message string that provides feedback to the end-user about the name of the author of the GitLab Merge Request.
 */
export class NewGitWhoDisNote extends BotActionNote {
  static readonly bad = `it's really hard to see who you are! Would you please make your Git account names human readable?`;
  static readonly badIcon = `:loudspeaker:`;
  static readonly hashtag = `[#NewGitWhoDis](https://github.com/Cigna/GitRDoneBot#6-new-git-who-dis)`;

  private constructor(message: string) {
    super(message);
  }

  static caseForBadMessage(goodGitPractice: boolean | undefined): boolean {
    return goodGitPractice === false;
  }

  static caseForNoActions(goodGitPractice: boolean | undefined): boolean {
    return goodGitPractice === true;
  }

  static fromMessage(message: string): NewGitWhoDisNote {
    return new NewGitWhoDisNote(
      this.conditionallyAddHashtag(message, this.hashtag),
    );
  }

  /**
   * Constructs a `NewGitWhoDisNote` object by identifying one of three cases:
   * case for bad message, case for no actions, or case for unknown state.
   *
   * @returns `message` of the `NewGitWhoDisNote` object
   * */
  static buildMessage(
    authorName: string,
    goodGitPractice: boolean,
    logger: winston.Logger,
  ): string {
    let note: NewGitWhoDisNote;

    switch (true) {
      case this.caseForBadMessage(goodGitPractice): {
        note = this.fromMessage(
          `${this.badIcon} Hi @${authorName}, ${this.bad}`,
        );
        break;
      }
      case this.caseForNoActions(goodGitPractice): {
        note = this.fromMessage(this.noActionMessage);
        break;
      }
      default: {
        note = this.fromMessage(this.unknownState);
        logger.error(`${note.message} NewGitWhoDis`);
      }
    }

    return note.message;
  }
}
