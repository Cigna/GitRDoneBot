import { BotActionConfig } from "../../../src/custom_config/bot_action_config";
import { BranchAgeDefaults } from "../../../src/custom_config/action_config_defaults";

const invalidConfigMisspelledActionName = {
  branchAgeAnalysi: {
    thresholdInDays: 100,
  },
};

const invalidConfigMisspelledThresholdName = {
  branchAgeAnalysis: {
    thresholdInDay: 100,
  },
};

const invalidConfigMisspelledToggleName = {
  branchAgeAnalysis: {
    constructiveFeedbackOnlyToggl: true,
  },
};

const invalidConfigWrongThresholdType = {
  branchAgeAnalysis: {
    thresholdInDays: "ten",
  },
};

const invalidConfigWrongToggleType = {
  branchAgeAnalysis: {
    constructiveFeedbackOnlyToggle: 1,
  },
};

const validConfigAllProperties = {
  branchAgeAnalysis: {
    thresholdInDays: 10,
    constructiveFeedbackOnlyToggle: true,
  },
};

const validConfigThresholdExtraProperties = {
  branchAgeAnalysis: {
    thresholdInDays: 10,
    Foo: "bar",
  },
};

const validConfigThresholdOutsideLimits = {
  branchAgeAnalysis: {
    thresholdInDays: 100,
  },
};

const validConfigThresholdWithinLimitsNoToggle = {
  branchAgeAnalysis: {
    thresholdInDays: 10,
  },
};

const validConfigToggleOnly = {
  branchAgeAnalysis: {
    constructiveFeedbackOnlyToggle: true,
  },
};

describe("Unit Test: BranchAgeAnalysisConfig.getCustomConfig", () => {
  describe("Invalid & Empty Config Files", () => {
    test("returns correct default values for empty result", () => {
      const config = BotActionConfig.from(BranchAgeDefaults, {});
      expect(config.threshold).toBe(BranchAgeDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        BranchAgeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns correct default values for invalid ACTION name", () => {
      const config = BotActionConfig.from(
        BranchAgeDefaults,
        invalidConfigMisspelledActionName,
      );
      expect(config.threshold).toBe(BranchAgeDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        BranchAgeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns correct default values for invalid THRESHOLD name", () => {
      const config = BotActionConfig.from(
        BranchAgeDefaults,
        invalidConfigMisspelledThresholdName,
      );
      expect(config.threshold).toBe(BranchAgeDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        BranchAgeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns correct default values for invalid TOGGLE name", () => {
      const config = BotActionConfig.from(
        BranchAgeDefaults,
        invalidConfigMisspelledToggleName,
      );
      expect(config.threshold).toBe(BranchAgeDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        BranchAgeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns correct default values for invalid THRESHOLD type", () => {
      const config = BotActionConfig.from(
        BranchAgeDefaults,
        invalidConfigWrongThresholdType,
      );
      expect(config.threshold).toBe(BranchAgeDefaults.thresholdDefault);
      expect(
        typeof invalidConfigWrongThresholdType.branchAgeAnalysis
          .thresholdInDays,
      ).toBe("string");
      expect(typeof config.threshold).toBe("number");

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        BranchAgeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns correct default values for invalid TOGGLE type", () => {
      const config = BotActionConfig.from(
        BranchAgeDefaults,
        invalidConfigWrongToggleType,
      );
      expect(config.threshold).toBe(BranchAgeDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        BranchAgeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
      expect(
        typeof invalidConfigWrongToggleType.branchAgeAnalysis
          .constructiveFeedbackOnlyToggle,
      ).toBe("number");
      expect(typeof config.constructiveFeedbackOnlyToggle).toBe("boolean");
    });
  });

  describe("Valid Config Files", () => {
    test("returns custom threshold value & custom toggle value when threshold value is within limits & toggle property is provided", () => {
      const config = BotActionConfig.from(
        BranchAgeDefaults,
        validConfigAllProperties,
      );
      expect(config.threshold).toBe(
        validConfigAllProperties.branchAgeAnalysis.thresholdInDays,
      );

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        validConfigAllProperties.branchAgeAnalysis
          .constructiveFeedbackOnlyToggle,
      );
    });

    test("ignores properties that don't exist on ICustomConfig", () => {
      const config = BotActionConfig.from(
        BranchAgeDefaults,
        validConfigThresholdExtraProperties,
      );
      expect(config).not.toHaveProperty(
        validConfigThresholdExtraProperties.branchAgeAnalysis.Foo,
      );

      expect(config.threshold).toBe(
        validConfigThresholdExtraProperties.branchAgeAnalysis.thresholdInDays,
      );

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        BranchAgeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns DEFAULT threshold value & default toggle value when threshold value is OUTSIDE limits & no toggle property provided", () => {
      const config = BotActionConfig.from(
        BranchAgeDefaults,
        validConfigThresholdOutsideLimits,
      );
      expect(config.threshold).toBe(BranchAgeDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        BranchAgeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns CUSTOM threshold value & default toggle value when threshold value is WITHIN limits & no toggle property provided", () => {
      const config = BotActionConfig.from(
        BranchAgeDefaults,
        validConfigThresholdWithinLimitsNoToggle,
      );
      expect(config.threshold).toBe(
        validConfigThresholdWithinLimitsNoToggle.branchAgeAnalysis
          .thresholdInDays,
      );

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        BranchAgeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns default threshold value & custom toggle value when only toggle property is provided", () => {
      const config = BotActionConfig.from(
        BranchAgeDefaults,
        validConfigToggleOnly,
      );
      expect(config.threshold).toBe(BranchAgeDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        validConfigToggleOnly.branchAgeAnalysis.constructiveFeedbackOnlyToggle,
      );
    });
  });
});
