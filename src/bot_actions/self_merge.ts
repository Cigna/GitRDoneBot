import {
  AuthorizationFailureBotAction,
  BotActionResponse,
  NetworkFailureBotAction,
  SuccessfulBotAction,
  SuccessfulBotActionWithNothingToSay,
} from "./bot_action";
import {
  MergeRequestApi,
  NoRequestNeeded,
  SuccessfulGetResponse,
  AuthorizationFailureResponse,
} from "../gitlab";
import { User } from "../interfaces/gitlab_api_types";

/**
 * This Bot Action class analyzes the assignee or the approvers and the user who merged the GitLab Merge Request
 * and determines what, if any, feedback to provide to user.
 * */
export abstract class SelfMerge {
  static readonly botActionName = "SelfMerge";
  static readonly goodNote = `:star: Thanks for following good git practice and not assigning your merge request to yourself!`;
  static readonly badApprovedNote =
    `:loudspeaker: You should re-open this merge request and have someone else review and approve it. ` +
    `You can check your project settings to make sure self approval of merge requests is not enabled. ` +
    `You can find this in Settings -> General -> Merge Request`;
  static readonly badAssignedNote =
    `:loudspeaker: I noticed that you assigned your merge request to yourself. ` +
    `This is an unsafe practice that circumvents quality code review. You can check your project` +
    ` settings to make sure self approval of merge requests is not enabled. You can find this in` +
    ` Settings -> General -> Merge Request`;
  static readonly badMergedNote =
    `:loudspeaker: You should re-open this merge request and have someone else review and approve it. ` +
    `You can check your project settings to make sure at least 1 approval is required to merge in new code. ` +
    `Project settings can be updated to require approvals in Settings -> General -> Merge Request`;
  static readonly noApprovalsNote =
    `:loudspeaker: I noticed that your project doesn't require any approvals to merge in your code. ` +
    `It is a good practice to require at least 1 approval to prevent accidentally merging code that hasn't been reviewed by others.` +
    `Project settings can be updated to require approvals in Settings -> General -> Merge Request`;
  static readonly hashtag = `[#SelfMergeAnalysis](https://github.com/Cigna/GitRDoneBot#3-self-merge)`;

  /**
   * @param state the state of the Merge Request: `open`, `update`, or `merge`
   * @param api an instance of `MergeRequestApi`
   * @param assigneeId GitLab user id of the Merge Request assignee
   * @param authorId GitLab user id of the Merge Request author
   *
   * @returns data about the success or failure of the GitLab API request and resulting properties calculated by Self Merge analysis
   * */
  static async analyze(
    state: string,
    api: MergeRequestApi,
    assigneeId: number,
    authorId: number,
  ): Promise<BotActionResponse> {
    let action:
      | AuthorizationFailureBotAction
      | NetworkFailureBotAction
      | SuccessfulBotAction
      | SuccessfulBotActionWithNothingToSay;
    let actionResponse!: BotActionResponse;

    // No API call required for open & update states
    if (state !== "merge") {
      const goodGitPractice = this.mrIsNotSelfAssignedOrMerged(
        assigneeId,
        authorId,
      );
      const approversNeeded = false;

      action = this.buildSuccessfulAction(
        state,
        goodGitPractice,
        approversNeeded,
      );

      actionResponse = new BotActionResponse(
        this.botActionName,
        new NoRequestNeeded().statusCode,
        action,
        {
          assigneeId: assigneeId,
          authorId: authorId,
          approversNeeded: approversNeeded,
        },
      );
    }

    // Make API call for merge state only
    if (state === "merge") {
      const whoApproved = await api.getMRApprovalConfig();

      if (whoApproved instanceof SuccessfulGetResponse) {
        if (
          whoApproved.result.hasOwnProperty("approved_by") &&
          whoApproved.result.approved_by.length
        ) {
          const approversNeeded = false;
          const goodGitPractice = this.mrIsNotSelfApproved(
            whoApproved.result.approved_by,
            authorId,
          );

          action = this.buildSuccessfulAction(
            state,
            goodGitPractice,
            approversNeeded,
          );

          actionResponse = new BotActionResponse(
            this.botActionName,
            whoApproved.statusCode,
            action,
            {
              assigneeId: assigneeId,
              authorId: authorId,
              approversNeeded: approversNeeded,
            },
          );
        } else {
          // if approval array is empty, second api call required to see who merged the MR
          const approversNeeded = true;
          const whoMerged = await api.getSingleMR();
          if (
            whoMerged instanceof SuccessfulGetResponse &&
            whoMerged.result.hasOwnProperty("merged_by")
          ) {
            const goodGitPractice = this.mrIsNotSelfAssignedOrMerged(
              whoMerged.result.merged_by.id,
              authorId,
            );

            action = this.buildSuccessfulAction(
              state,
              goodGitPractice,
              approversNeeded,
            );

            actionResponse = new BotActionResponse(
              this.botActionName,
              whoMerged.statusCode,
              action,
              {
                assigneeId: assigneeId,
                authorId: authorId,
                approversNeeded: approversNeeded,
              },
            );
          } else {
            if (whoMerged instanceof AuthorizationFailureResponse) {
              action = new AuthorizationFailureBotAction();
            } else {
              action = new NetworkFailureBotAction();
            }
            actionResponse = new BotActionResponse(
              this.botActionName,
              whoMerged.statusCode,
              action,
            );
          }
        }
      } else {
        if (whoApproved instanceof AuthorizationFailureResponse) {
          action = new AuthorizationFailureBotAction();
        } else {
          action = new NetworkFailureBotAction();
        }
        actionResponse = new BotActionResponse(
          this.botActionName,
          whoApproved.statusCode,
          action,
        );
      }
    }

    return actionResponse;
  }

  private static mrIsNotSelfAssignedOrMerged(
    assigneeOrMergerId: number,
    authorId: number,
  ): boolean {
    let mrIsNotSelfAssignedOrMerged: boolean;

    if (assigneeOrMergerId === authorId) {
      mrIsNotSelfAssignedOrMerged = false;
    } else {
      mrIsNotSelfAssignedOrMerged = true;
    }

    return mrIsNotSelfAssignedOrMerged;
  }

  /**
   * @param approvedByArray array of GitLab users who approved the GitLab Merge Request
   * @param authorId the GitLab id of the user who authored the Merge Request
   * @returns true if the author of the GitLab Merge Request is not the only user in the `approvedByArray`
   * */
  private static mrIsNotSelfApproved(
    approvedByArray: Array<{ user: User }>,
    authorId: number,
  ): boolean {
    let mrIsNotSelfApproved: boolean;

    if (approvedByArray.length === 1) {
      mrIsNotSelfApproved =
        approvedByArray[0].user.id === authorId ? false : true;
    } else {
      mrIsNotSelfApproved = true;
    }

    return mrIsNotSelfApproved;
  }

  static caseForGoodMessage(state: string, goodGitPractice: boolean): boolean {
    return state !== "merge" && goodGitPractice === true;
  }

  static caseForBadSelfApprovedMessage(
    state: string,
    goodGitPractice: boolean,
    approversNeeded: boolean,
  ): boolean {
    return (
      state === "merge" &&
      goodGitPractice === false &&
      approversNeeded === false
    );
  }

  static caseForBadSelfAssignedMessage(
    state: string,
    goodGitPractice: boolean,
  ): boolean {
    return state !== "merge" && goodGitPractice === false;
  }

  static caseForBadSelfMergedMessage(
    state: string,
    goodGitPractice: boolean,
    approversNeeded: boolean,
  ): boolean {
    return (
      state === "merge" && goodGitPractice === false && approversNeeded === true
    );
  }

  static caseForNoApprovalsMessage(
    state: string,
    goodGitPractice: boolean,
    approversNeeded: boolean,
  ): boolean {
    return (
      state === "merge" && goodGitPractice === true && approversNeeded === true
    );
  }

  /**
   * Invoked when Bot Action analysis was successful.
   * Constructs a BotAction object containing goodGitPractice and conditional feedback message.
   * @param state the state of the Merge Request: `open`, `update`, or `merge`
   * @param goodGitPractice represents whether or not the Merge Request event meets the criteria for good Self Merge practice
   * @param constructiveFeedbackOnlyToggle if true, positive feedback will not be provided
   * @returns SuccessfulBotAction instance containing feedback for user. If no feedback is warranted, an instance of SuccessfulBotActionWithNothingToSay is returned.
   * */
  static buildSuccessfulAction(
    state: string,
    goodGitPractice: boolean,
    approversNeeded: boolean,
  ): SuccessfulBotAction | SuccessfulBotActionWithNothingToSay {
    let action: SuccessfulBotAction | SuccessfulBotActionWithNothingToSay;

    switch (true) {
      case this.caseForBadSelfAssignedMessage(state, goodGitPractice): {
        action = new SuccessfulBotAction(
          goodGitPractice,
          this.badAssignedNote,
          this.hashtag,
        );
        break;
      }
      case this.caseForBadSelfApprovedMessage(
        state,
        goodGitPractice,
        approversNeeded,
      ): {
        action = new SuccessfulBotAction(
          goodGitPractice,
          this.badApprovedNote,
          this.hashtag,
        );
        break;
      }
      case this.caseForBadSelfMergedMessage(
        state,
        goodGitPractice,
        approversNeeded,
      ): {
        action = new SuccessfulBotAction(
          goodGitPractice,
          this.badMergedNote,
          this.hashtag,
        );
        break;
      }
      case this.caseForNoApprovalsMessage(
        state,
        goodGitPractice,
        approversNeeded,
      ): {
        action = new SuccessfulBotAction(
          goodGitPractice,
          this.noApprovalsNote,
          this.hashtag,
        );
        break;
      }
      case this.caseForGoodMessage(state, goodGitPractice): {
        action = new SuccessfulBotAction(
          goodGitPractice,
          this.goodNote,
          this.hashtag,
        );
        break;
      }
      default: {
        action = new SuccessfulBotActionWithNothingToSay(goodGitPractice);
      }
    }

    return action;
  }
}
