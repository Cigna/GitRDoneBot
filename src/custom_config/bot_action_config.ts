import { BotActionDefaults } from "./action_config_defaults";

/**
 * This class standardizes Custom Config property syntax for each configurable Bot Action.
 */
export class BotActionConfig {
  private constructor(
    readonly constructiveFeedbackOnlyToggle: boolean,
    readonly threshold: number,
  ) {}

  /**
   * This method analyzes user-defined Bot Action configuration values and uses them for Bot Action logic if they are valid.
   * If configuration values are missing or invalid, the default values are used.
   * @param botActionDefaults the default values for the configurable Bot Action
   * @param retrieved the values retrieved from the user-defined `.grdb.json` Custom Config file
   */
  static from(
    botActionDefaults: BotActionDefaults,
    retrieved: any,
  ): BotActionConfig {
    let constructiveFeedbackOnlyToggle =
      botActionDefaults.constructiveFeedbackOnlyToggleDefault;
    let threshold = botActionDefaults.thresholdDefault;

    if (retrieved.hasOwnProperty(botActionDefaults.actionName)) {
      constructiveFeedbackOnlyToggle = this.setConstructiveFeedbackOnlyToggle(
        botActionDefaults.constructiveFeedbackOnlyToggleDefault,
        retrieved,
        botActionDefaults.actionName,
      );

      threshold = this.setThreshold(
        retrieved,
        botActionDefaults.actionName,
        botActionDefaults.thresholdName,
        botActionDefaults.thresholdDefault,
        botActionDefaults.thresholdMin,
        botActionDefaults.thresholdMax,
      );
    }
    return new BotActionConfig(constructiveFeedbackOnlyToggle, threshold);
  }

  /**
   * Determine if user-configured value for constructiveFeedbackOnlyToggle is set and valid, or if default value should be used
   * @param defaultToggle default config value for constructiveFeedbackOnlyToggleDefault
   * @param retrieved user-configured bot action values
   * @param actionName name of bot action
   * @returns boolean for constructiveFeedbackOnlyToggle in BotActionConfig
   * */
  static setConstructiveFeedbackOnlyToggle = (
    defaultToggle: boolean,
    retrieved: any,
    actionName: string,
  ): boolean => {
    let constructiveFeedbackOnlyToggle: boolean = defaultToggle;

    // safe to ignore "Generic Object Injection Sink" warning:
    // satisfies "whitelist" requirement for eslint rule security/detect-object-injection
    if (
      retrieved[actionName].hasOwnProperty("constructiveFeedbackOnlyToggle") &&
      BotActionConfig.validToggle(
        retrieved[actionName].constructiveFeedbackOnlyToggle,
      )
    ) {
      constructiveFeedbackOnlyToggle =
        retrieved[actionName].constructiveFeedbackOnlyToggle;
    }
    return constructiveFeedbackOnlyToggle;
  };

  /**
   * Determine if user-configured value for bot action threshold is set and valid, or if default value should be used
   * @param retrieved user-configured bot action values
   * @param actionName name of bot action
   * @param thresholdName name of threshold for bot action
   * @param defaultThreshold action config default value for threshold
   * @param thresholdMin minimum value for valid threshold
   * @param thresholdMax maximum value for valid threshold
   * @returns number for threshold value in BotActionConfig
   * */
  static setThreshold = (
    retrieved: any,
    actionName: string,
    thresholdName: string,
    defaultThreshold: number,
    thresholdMin: number,
    thresholdMax: number,
  ): number => {
    let threshold = defaultThreshold;
    // safe to ignore "Generic Object Injection Sink" warning:
    // satisfies "whitelist" requirement for eslint rule security/detect-object-injection
    if (
      retrieved[actionName].hasOwnProperty(thresholdName) &&
      BotActionConfig.validThreshold(
        retrieved[actionName][thresholdName],
        thresholdMin,
        thresholdMax,
      )
    ) {
      threshold = retrieved[actionName][thresholdName];
    }
    return threshold;
  };

  static validThreshold = (
    threshold: any,
    min: number,
    max: number,
  ): boolean => {
    let valid = false;
    if (typeof threshold === "number") {
      valid = threshold >= min && threshold <= max;
    }
    return valid;
  };

  static validToggle = (toggle: any): boolean => {
    return typeof toggle === "boolean";
  };
}
