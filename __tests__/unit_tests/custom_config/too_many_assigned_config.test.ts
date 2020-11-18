import { BotActionConfig } from "../../../src/custom_config/bot_action_config";
import { TooManyAssignedDefaults } from "../../../src/custom_config/action_config_defaults";

const invalidConfigMisspelledActionName = {
  tooManyMergeRequestsAnalysi: {
    thresholdNumberOfMergeRequests: 5,
  },
};

const invalidConfigMisspelledThresholdName = {
  tooManyMergeRequestsAnalysis: {
    thresholdNumberOfMergeRequest: 5,
  },
};

const invalidConfigMisspelledToggleName = {
  tooManyMergeRequestsAnalysis: {
    constructiveFeedbackOnlyToggl: true,
  },
};

const invalidConfigWrongThresholdType = {
  tooManyMergeRequestsAnalysis: {
    thresholdNumberOfMergeRequests: "five",
  },
};

const invalidConfigWrongToggleType = {
  tooManyMergeRequestsAnalysis: {
    constructiveFeedbackOnlyToggle: 1,
  },
};

const validConfigAllProperties = {
  tooManyMergeRequestsAnalysis: {
    thresholdNumberOfMergeRequests: 5,
    constructiveFeedbackOnlyToggle: true,
  },
};

const validConfigAllPropertiesThresholdEqualsLimit = {
  tooManyMergeRequestsAnalysis: {
    thresholdNumberOfMergeRequests: 2,
    constructiveFeedbackOnlyToggle: true,
  },
};

const validConfigThresholdExtraProperties = {
  tooManyMergeRequestsAnalysis: {
    thresholdNumberOfMergeRequests: 5,
    Foo: "bar",
  },
};

const validConfigThresholdExceedsLimits = {
  tooManyMergeRequestsAnalysis: {
    thresholdNumberOfMergeRequests: 50,
  },
};

const validConfigThresholdBelowLimits = {
  tooManyMergeRequestsAnalysis: {
    thresholdNumberOfMergeRequests: 1,
  },
};

const validConfigThresholdWithinLimitsNoToggle = {
  tooManyMergeRequestsAnalysis: {
    thresholdNumberOfMergeRequests: 5,
  },
};

const validConfigToggleOnly = {
  tooManyMergeRequestsAnalysis: {
    constructiveFeedbackOnlyToggle: true,
  },
};

describe("Unit Test: TooManyAssignedAnalysisConfig.getCustomConfig", () => {
  describe("Invalid & Empty Config Files", () => {
    test("returns correct default values for empty result", () => {
      const config = BotActionConfig.from(TooManyAssignedDefaults, {});
      expect(config.threshold).toBe(TooManyAssignedDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        TooManyAssignedDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns correct default values for invalid ACTION name", () => {
      const config = BotActionConfig.from(
        TooManyAssignedDefaults,
        invalidConfigMisspelledActionName,
      );

      expect(config.threshold).toBe(TooManyAssignedDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        TooManyAssignedDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns correct default values for invalid THRESHOLD name", () => {
      const config = BotActionConfig.from(
        TooManyAssignedDefaults,
        invalidConfigMisspelledThresholdName,
      );

      expect(config.threshold).toBe(TooManyAssignedDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        TooManyAssignedDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns correct default values for invalid TOGGLE name", () => {
      const config = BotActionConfig.from(
        TooManyAssignedDefaults,
        invalidConfigMisspelledToggleName,
      );

      expect(config.threshold).toBe(TooManyAssignedDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        TooManyAssignedDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns correct default values for invalid THRESHOLD type", () => {
      const config = BotActionConfig.from(
        TooManyAssignedDefaults,
        invalidConfigWrongThresholdType,
      );

      expect(config.threshold).toBe(TooManyAssignedDefaults.thresholdDefault);
      expect(
        typeof invalidConfigWrongThresholdType.tooManyMergeRequestsAnalysis
          .thresholdNumberOfMergeRequests,
      ).toBe("string");
      expect(typeof config.threshold).toBe("number");

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        TooManyAssignedDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns correct default values for invalid TOGGLE type", () => {
      const config = BotActionConfig.from(
        TooManyAssignedDefaults,
        invalidConfigWrongToggleType,
      );

      expect(config.threshold).toBe(TooManyAssignedDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        TooManyAssignedDefaults.constructiveFeedbackOnlyToggleDefault,
      );
      expect(
        typeof invalidConfigWrongToggleType.tooManyMergeRequestsAnalysis
          .constructiveFeedbackOnlyToggle,
      ).toBe("number");
      expect(typeof config.constructiveFeedbackOnlyToggle).toBe("boolean");
    });
  });

  describe("Valid Config Files", () => {
    test("returns custom threshold value & custom toggle value when threshold value is within limits & toggle property is provided", () => {
      const config = BotActionConfig.from(
        TooManyAssignedDefaults,
        validConfigAllProperties,
      );

      expect(config.threshold).toBe(
        validConfigAllProperties.tooManyMergeRequestsAnalysis
          .thresholdNumberOfMergeRequests,
      );

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        validConfigAllProperties.tooManyMergeRequestsAnalysis
          .constructiveFeedbackOnlyToggle,
      );
    });

    test("returns custom threshold value & custom toggle value when threshold value equals minimum & toggle property is provided", () => {
      const config = BotActionConfig.from(
        TooManyAssignedDefaults,
        validConfigAllPropertiesThresholdEqualsLimit,
      );

      expect(config.threshold).toBe(
        validConfigAllPropertiesThresholdEqualsLimit
          .tooManyMergeRequestsAnalysis.thresholdNumberOfMergeRequests,
      );

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        validConfigAllPropertiesThresholdEqualsLimit
          .tooManyMergeRequestsAnalysis.constructiveFeedbackOnlyToggle,
      );
    });

    test("ignores properties that don't exist on ICustomConfig", () => {
      const config = BotActionConfig.from(
        TooManyAssignedDefaults,
        validConfigThresholdExtraProperties,
      );

      expect(config).not.toHaveProperty(
        validConfigThresholdExtraProperties.tooManyMergeRequestsAnalysis.Foo,
      );

      expect(config.threshold).toBe(
        validConfigThresholdExtraProperties.tooManyMergeRequestsAnalysis
          .thresholdNumberOfMergeRequests,
      );

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        TooManyAssignedDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns DEFAULT threshold value & default toggle value when threshold value EXCEEDS limits & no toggle property provided", () => {
      const config = BotActionConfig.from(
        TooManyAssignedDefaults,
        validConfigThresholdExceedsLimits,
      );

      expect(config.threshold).toBe(TooManyAssignedDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        TooManyAssignedDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns DEFAULT threshold value & default toggle value when threshold value is BELOW limits & no toggle property provided", () => {
      const config = BotActionConfig.from(
        TooManyAssignedDefaults,
        validConfigThresholdBelowLimits,
      );

      expect(config.threshold).toBe(TooManyAssignedDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        TooManyAssignedDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns CUSTOM threshold value & default toggle value when threshold value is WITHIN limits & no toggle property provided", () => {
      const config = BotActionConfig.from(
        TooManyAssignedDefaults,
        validConfigThresholdWithinLimitsNoToggle,
      );

      expect(config.threshold).toBe(
        validConfigThresholdWithinLimitsNoToggle.tooManyMergeRequestsAnalysis
          .thresholdNumberOfMergeRequests,
      );

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        TooManyAssignedDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns default threshold value & custom toggle value when only toggle property is provided", () => {
      const config = BotActionConfig.from(
        TooManyAssignedDefaults,
        validConfigToggleOnly,
      );

      expect(config.threshold).toBe(TooManyAssignedDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        validConfigToggleOnly.tooManyMergeRequestsAnalysis
          .constructiveFeedbackOnlyToggle,
      );
    });
  });
});
