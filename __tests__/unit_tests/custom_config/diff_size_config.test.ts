import { BotActionConfig } from "../../../src/custom_config/bot_action_config";
import { DiffSizeDefaults } from "../../../src/custom_config/action_config_defaults";

const invalidConfigMisspelledActionName = {
  difAnalysis: {
    thresholdInLinesOfDiff: 100,
  },
};

const invalidConfigMisspelledThresholdName = {
  diffAnalysis: {
    thresholdInLinesOfDif: 100,
  },
};

const invalidConfigMisspelledToggleName = {
  diffAnalysis: {
    constructiveFeedbackOnlyToggl: true,
  },
};

const invalidConfigWrongThresholdType = {
  diffAnalysis: {
    thresholdInLinesOfDiff: "one hundred",
  },
};

const invalidConfigWrongToggleType = {
  diffAnalysis: {
    constructiveFeedbackOnlyToggle: 1,
  },
};

const validConfigAllProperties = {
  diffAnalysis: {
    thresholdInLinesOfDiff: 100,
    constructiveFeedbackOnlyToggle: true,
  },
};

const validConfigThresholdExtraProperties = {
  diffAnalysis: {
    thresholdInLinesOfDiff: 100,
    Foo: "bar",
  },
};

const validConfigThresholdOutsideLimits = {
  diffAnalysis: {
    thresholdInLinesOfDiff: 10000,
  },
};

const validConfigThresholdWithinLimitsNoToggle = {
  diffAnalysis: {
    thresholdInLinesOfDiff: 100,
  },
};

const validConfigToggleOnly = {
  diffAnalysis: {
    constructiveFeedbackOnlyToggle: true,
  },
};

describe("Unit Test: DiffAnalysisConfig.getCustomConfig", () => {
  describe("Invalid & Empty Config Files", () => {
    test("returns correct default values for empty result", () => {
      const config = BotActionConfig.from(DiffSizeDefaults, {});
      expect(config.threshold).toBe(DiffSizeDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        DiffSizeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns correct default values for invalid ACTION name", () => {
      const config = BotActionConfig.from(
        DiffSizeDefaults,
        invalidConfigMisspelledActionName,
      );
      expect(config.threshold).toBe(DiffSizeDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        DiffSizeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns correct default values for invalid THRESHOLD name", () => {
      const config = BotActionConfig.from(
        DiffSizeDefaults,
        invalidConfigMisspelledThresholdName,
      );
      expect(config.threshold).toBe(DiffSizeDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        DiffSizeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns correct default values for invalid TOGGLE name", () => {
      const config = BotActionConfig.from(
        DiffSizeDefaults,
        invalidConfigMisspelledToggleName,
      );
      expect(config.threshold).toBe(DiffSizeDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        DiffSizeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns correct default values for invalid THRESHOLD type", () => {
      const config = BotActionConfig.from(
        DiffSizeDefaults,
        invalidConfigWrongThresholdType,
      );
      expect(config.threshold).toBe(DiffSizeDefaults.thresholdDefault);
      expect(
        typeof invalidConfigWrongThresholdType.diffAnalysis
          .thresholdInLinesOfDiff,
      ).toBe("string");
      expect(typeof config.threshold).toBe("number");

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        DiffSizeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns correct default values for invalid TOGGLE type", () => {
      const config = BotActionConfig.from(
        DiffSizeDefaults,
        invalidConfigWrongToggleType,
      );
      expect(config.threshold).toBe(DiffSizeDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        DiffSizeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
      expect(
        typeof invalidConfigWrongToggleType.diffAnalysis
          .constructiveFeedbackOnlyToggle,
      ).toBe("number");
      expect(typeof config.constructiveFeedbackOnlyToggle).toBe("boolean");
    });
  });

  describe("Valid Config Files", () => {
    test("returns custom threshold value & custom toggle value when threshold value is within limits & toggle property is provided", () => {
      const config = BotActionConfig.from(
        DiffSizeDefaults,
        validConfigAllProperties,
      );
      expect(config.threshold).toBe(
        validConfigAllProperties.diffAnalysis.thresholdInLinesOfDiff,
      );

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        validConfigAllProperties.diffAnalysis.constructiveFeedbackOnlyToggle,
      );
    });

    test("ignores properties that don't exist on ICustomConfig", () => {
      const config = BotActionConfig.from(
        DiffSizeDefaults,
        validConfigThresholdExtraProperties,
      );
      expect(config).not.toHaveProperty(
        validConfigThresholdExtraProperties.diffAnalysis.Foo,
      );

      expect(config.threshold).toBe(
        validConfigThresholdExtraProperties.diffAnalysis.thresholdInLinesOfDiff,
      );

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        DiffSizeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns DEFAULT threshold value & default toggle value when threshold value is OUTSIDE limits & no toggle property provided", () => {
      const config = BotActionConfig.from(
        DiffSizeDefaults,
        validConfigThresholdOutsideLimits,
      );
      expect(config.threshold).toBe(DiffSizeDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        DiffSizeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns CUSTOM threshold value & default toggle value when threshold value is WITHIN limits & no toggle property provided", () => {
      const config = BotActionConfig.from(
        DiffSizeDefaults,
        validConfigThresholdWithinLimitsNoToggle,
      );
      expect(config.threshold).toBe(
        validConfigThresholdWithinLimitsNoToggle.diffAnalysis
          .thresholdInLinesOfDiff,
      );

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        DiffSizeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("returns default threshold value & custom toggle value when only toggle property is provided", () => {
      const config = BotActionConfig.from(
        DiffSizeDefaults,
        validConfigToggleOnly,
      );
      expect(config.threshold).toBe(DiffSizeDefaults.thresholdDefault);

      expect(config.constructiveFeedbackOnlyToggle).toBe(
        validConfigToggleOnly.diffAnalysis.constructiveFeedbackOnlyToggle,
      );
    });
  });
});
