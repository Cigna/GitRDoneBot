import {
  NotFoundORNetworkFailureResponse,
  MergeRequestApi,
  SuccessfulGetResponse,
  AuthorizationFailureResponse,
} from "../gitlab";
import { BotActionConfig } from "./bot_action_config";
import {
  BranchAgeDefaults,
  CommitMessageDefaults,
  DiffSizeDefaults,
  TooManyAssignedDefaults,
} from "./action_config_defaults";

/**
 * This class contains the logic for retrieving the user-defined `.grdb.json` Custom Config file and using those values if valid, or default values if user-defined values are invalid or missing.
 */
export class CustomConfig {
  constructor(
    readonly branchAge: BotActionConfig,
    readonly commitMessage: BotActionConfig,
    readonly diffSize: BotActionConfig,
    readonly tooManyMergeRequests: BotActionConfig,
    readonly updateMergeRequestComment: boolean,
    readonly apiResponse:
      | AuthorizationFailureResponse
      | NotFoundORNetworkFailureResponse
      | SuccessfulGetResponse,
  ) {}

  /**
   * Loads in user-configured values for all valid config properties & property thresholds if api call is successful. If api call fails,
   * or for any invalid user-configured values, uses default values.
   * @param api an instance of the MergeRequestApi class that wraps HTTP requests to and responses from the GitLab API
   * @returns CustomConfig with loaded values
   * */
  static async from(api: MergeRequestApi): Promise<CustomConfig> {
    const response = await api.getConfigurationFile();

    let result: any;

    // no 404 returned from GitLab API
    if (response instanceof SuccessfulGetResponse) {
      result = response.result;
    } else {
      result = {};
    }

    const branchAge: BotActionConfig = BotActionConfig.from(
      BranchAgeDefaults,
      result,
    );

    const commitMessage: BotActionConfig = BotActionConfig.from(
      CommitMessageDefaults,
      result,
    );

    const diff: BotActionConfig = BotActionConfig.from(
      DiffSizeDefaults,
      result,
    );

    const tooManyMergeRequests: BotActionConfig = BotActionConfig.from(
      TooManyAssignedDefaults,
      result,
    );

    const updateMergeRequestComment: boolean = this.getUpdateConfig(result);

    return new CustomConfig(
      branchAge,
      commitMessage,
      diff,
      tooManyMergeRequests,
      updateMergeRequestComment,
      response,
    );
  }

  /**
   * Determine if user-configured value for updateMergeRequestComment is set and valid, or if default value should be used
   * @param retrievedConfig user-configured bot action values
   * @returns boolean for updateMergeRequestComment in CustomConfig
   * */
  static getUpdateConfig = (retrievedConfig: any): boolean => {
    let updateToggle = true;
    if (retrievedConfig.hasOwnProperty("updateMergeRequestComment")) {
      if (typeof retrievedConfig.updateMergeRequestComment === "boolean") {
        updateToggle = retrievedConfig.updateMergeRequestComment;
      }
    }
    return updateToggle;
  };
}
