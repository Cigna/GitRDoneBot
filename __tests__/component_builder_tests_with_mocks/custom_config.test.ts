import {
  MergeRequestApi,
  NotFoundORNetworkFailureResponse,
  SuccessfulGetResponse,
} from "../../src/gitlab";
import { not_found_404 } from "../helpers";
import { CustomConfig } from "../../src/custom_config/custom_config";
import {
  BranchAgeDefaults,
  DiffSizeDefaults,
  TooManyAssignedDefaults,
} from "../../src/custom_config/action_config_defaults";

const DEFAULT_UPDATE_TOGGLE_VALUE = true;

const invalidKeys = new SuccessfulGetResponse(200, {
  difAnalysis: {
    thresholdInLinesOfDiff: 1,
  },
  branchAgeAalysis: {
    thresholdInDays: 14,
  },
});

const validKeysValidValues = new SuccessfulGetResponse(200, {
  diffAnalysis: {
    thresholdInLinesOfDiff: 1,
    constructiveFeedbackOnlyToggle: true,
  },
  branchAgeAnalysis: {
    thresholdInDays: 14,
    constructiveFeedbackOnlyToggle: true,
  },
  tooManyMergeRequestsAnalysis: {
    thresholdNumberOfMergeRequests: 4,
    constructiveFeedbackOnlyToggle: true,
  },
  updateMergeRequestComment: false,
});

const validKeysInvalidValues = new SuccessfulGetResponse(200, {
  diffAnalysis: {
    thresholdInLinesOfDiff: 1000,
  },
  branchAgeAnalysis: {
    thresholdInDays: 100,
  },
});

// TESTS

jest.mock("../../src/gitlab/merge_request_api");

describe("Mock API Test: CustomConfig Class", () => {
  const api = new MergeRequestApi("fake-token", 0, 1, "fake-uri");

  describe("when a retrieved custom config has valid keys with valid values", () => {
    let customConfigResponse: CustomConfig;

    beforeAll(async (done) => {
      jest.clearAllMocks();
      // @ts-ignore
      api.getConfigurationFile.mockResolvedValue(validKeysValidValues);
      customConfigResponse = await CustomConfig.from(api);
      done();
    });

    test("should return apiResponse state of SuccessfulGetResponse", () => {
      expect(customConfigResponse.apiResponse).toBeInstanceOf(
        SuccessfulGetResponse,
      );
    });

    test("branchAge custom values replace default values", () => {
      expect(customConfigResponse.branchAge.threshold).toBe(
        validKeysValidValues.result.branchAgeAnalysis.thresholdInDays,
      );
      expect(
        customConfigResponse.branchAge.constructiveFeedbackOnlyToggle,
      ).toBe(
        validKeysValidValues.result.branchAgeAnalysis
          .constructiveFeedbackOnlyToggle,
      );
    });

    test("diffSize custom values replace default values", () => {
      expect(customConfigResponse.diffSize.threshold).toBe(
        validKeysValidValues.result.diffAnalysis.thresholdInLinesOfDiff,
      );
      expect(customConfigResponse.diffSize.constructiveFeedbackOnlyToggle).toBe(
        validKeysValidValues.result.diffAnalysis.constructiveFeedbackOnlyToggle,
      );
    });

    test("tooManyMergeRequests custom values replace default values", () => {
      expect(customConfigResponse.tooManyMergeRequests.threshold).toBe(
        validKeysValidValues.result.tooManyMergeRequestsAnalysis
          .thresholdNumberOfMergeRequests,
      );
      expect(
        customConfigResponse.tooManyMergeRequests
          .constructiveFeedbackOnlyToggle,
      ).toBe(
        validKeysValidValues.result.tooManyMergeRequestsAnalysis
          .constructiveFeedbackOnlyToggle,
      );
    });

    test("updateMergeRequestComment custom value replaces default value", () => {
      expect(customConfigResponse.updateMergeRequestComment).toBe(
        validKeysValidValues.result.updateMergeRequestComment,
      );
    });
  });

  describe("when a retrieved custom config has valid keys with invalid values", () => {
    let customConfigResponse: CustomConfig;

    beforeAll(async (done) => {
      jest.clearAllMocks();
      // @ts-ignore
      api.getConfigurationFile.mockResolvedValue(validKeysInvalidValues);
      customConfigResponse = await CustomConfig.from(api);
      done();
    });

    test("should return apiResponse state of SuccessfulGetResponse", () => {
      expect(customConfigResponse.apiResponse).toBeInstanceOf(
        SuccessfulGetResponse,
      );
    });

    test("branchAge custom values that exceed threshold do not replace default values", () => {
      expect(customConfigResponse.branchAge.threshold).toBe(
        BranchAgeDefaults.thresholdDefault,
      );
      expect(
        customConfigResponse.branchAge.constructiveFeedbackOnlyToggle,
      ).toBe(BranchAgeDefaults.constructiveFeedbackOnlyToggleDefault);
    });

    test("diffSize custom values that exceed threshold do not replace default values", () => {
      expect(customConfigResponse.diffSize.threshold).toBe(
        DiffSizeDefaults.thresholdDefault,
      );
      expect(customConfigResponse.diffSize.constructiveFeedbackOnlyToggle).toBe(
        DiffSizeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("tooManyMergeRequests uses default values when custom values do not exist", () => {
      expect(customConfigResponse.tooManyMergeRequests.threshold).toBe(
        TooManyAssignedDefaults.thresholdDefault,
      );
      expect(
        customConfigResponse.tooManyMergeRequests
          .constructiveFeedbackOnlyToggle,
      ).toBe(TooManyAssignedDefaults.constructiveFeedbackOnlyToggleDefault);
    });

    test("updateMergeRequestComment uses default value when custom value does not exist", () => {
      expect(customConfigResponse.updateMergeRequestComment).toBe(
        DEFAULT_UPDATE_TOGGLE_VALUE,
      );
    });
  });

  describe("when a retrieved custom config has invalid keys", () => {
    let customConfigResponse: CustomConfig;

    beforeAll(async (done) => {
      jest.clearAllMocks();
      // @ts-ignore
      api.getConfigurationFile.mockResolvedValue(invalidKeys);
      customConfigResponse = await CustomConfig.from(api);
      done();
    });

    test("should return apiResponse state of SuccessfulGetResponse", () => {
      expect(customConfigResponse.apiResponse).toBeInstanceOf(
        SuccessfulGetResponse,
      );
    });

    test("branchAge uses default values when custom values not detected due to invalid key name", () => {
      expect(customConfigResponse.branchAge.threshold).toBe(
        BranchAgeDefaults.thresholdDefault,
      );
      expect(
        customConfigResponse.branchAge.constructiveFeedbackOnlyToggle,
      ).toBe(BranchAgeDefaults.constructiveFeedbackOnlyToggleDefault);
    });

    test("diffSize uses default values when custom values not detected due to invalid key name", () => {
      expect(customConfigResponse.diffSize.threshold).toBe(
        DiffSizeDefaults.thresholdDefault,
      );
      expect(customConfigResponse.diffSize.constructiveFeedbackOnlyToggle).toBe(
        DiffSizeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("tooManyMergeRequests uses default values when custom values do not exist", () => {
      expect(customConfigResponse.tooManyMergeRequests.threshold).toBe(
        TooManyAssignedDefaults.thresholdDefault,
      );
      expect(
        customConfigResponse.tooManyMergeRequests
          .constructiveFeedbackOnlyToggle,
      ).toBe(TooManyAssignedDefaults.constructiveFeedbackOnlyToggleDefault);
    });

    test("updateMergeRequestComment uses default value when custom value does not exist", () => {
      expect(customConfigResponse.updateMergeRequestComment).toBe(
        DEFAULT_UPDATE_TOGGLE_VALUE,
      );
    });
  });

  describe("when no config exists", () => {
    let customConfigResponse: CustomConfig;

    beforeAll(async (done) => {
      jest.clearAllMocks();
      // @ts-ignore
      api.getConfigurationFile.mockResolvedValue(not_found_404);
      customConfigResponse = await CustomConfig.from(api);
      done();
    });

    test("should return apiResponse state of NotFoundORNotFoundORNetworkFailureResponse", () => {
      expect(customConfigResponse.apiResponse).toBeInstanceOf(
        NotFoundORNetworkFailureResponse,
      );
      expect(
        (<NotFoundORNetworkFailureResponse>(
          customConfigResponse.apiResponse
        )).isNotFound,
      ).toBe(true);
    });

    test("branchAge uses default values when custom values do not exist", () => {
      expect(customConfigResponse.branchAge.threshold).toBe(
        BranchAgeDefaults.thresholdDefault,
      );
      expect(
        customConfigResponse.branchAge.constructiveFeedbackOnlyToggle,
      ).toBe(BranchAgeDefaults.constructiveFeedbackOnlyToggleDefault);
    });

    test("diffSize uses default values when custom values do not exist", () => {
      expect(customConfigResponse.diffSize.threshold).toBe(
        DiffSizeDefaults.thresholdDefault,
      );
      expect(customConfigResponse.diffSize.constructiveFeedbackOnlyToggle).toBe(
        DiffSizeDefaults.constructiveFeedbackOnlyToggleDefault,
      );
    });

    test("tooManyMergeRequests uses default values when custom values do not exist", () => {
      expect(customConfigResponse.tooManyMergeRequests.threshold).toBe(
        TooManyAssignedDefaults.thresholdDefault,
      );
      expect(
        customConfigResponse.tooManyMergeRequests
          .constructiveFeedbackOnlyToggle,
      ).toBe(TooManyAssignedDefaults.constructiveFeedbackOnlyToggleDefault);
    });

    test("updateMergeRequestComment uses default value when custom value does not exist", () => {
      expect(customConfigResponse.updateMergeRequestComment).toBe(
        DEFAULT_UPDATE_TOGGLE_VALUE,
      );
    });
  });
});
