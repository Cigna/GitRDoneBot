export interface BotActionDefaults {
  actionName: string;
  thresholdName: string;
  thresholdDefault: number;
  thresholdMin: number;
  thresholdMax: number;
  constructiveFeedbackOnlyToggleDefault: boolean;
}

interface CommitMessageAdditonalProperties {
  nudges: CommitMessageNudges;
}

interface CommitMessageNudges {
  length: boolean;
  capitalization: boolean;
  punctuation: boolean;
  tense: boolean;
}

export const BranchAgeDefaults: Readonly<BotActionDefaults> = {
  actionName: "branchAgeAnalysis",
  thresholdName: "thresholdInDays",
  thresholdDefault: 7,
  thresholdMin: 0,
  thresholdMax: 14,
  constructiveFeedbackOnlyToggleDefault: false,
};

export const CommitMessageDefaults: Readonly<BotActionDefaults> = {
  actionName: "cmAnalysis",
  thresholdName: "thresholdBadCms",
  thresholdDefault: 3,
  thresholdMin: 1,
  thresholdMax: 100,
  constructiveFeedbackOnlyToggleDefault: false,
};

export const DiffSizeDefaults: Readonly<BotActionDefaults> = {
  actionName: "diffAnalysis",
  thresholdName: "thresholdInLinesOfDiff",
  thresholdDefault: 500,
  thresholdMin: 0,
  thresholdMax: 500,
  constructiveFeedbackOnlyToggleDefault: false,
};

export const TooManyAssignedDefaults: Readonly<BotActionDefaults> = {
  actionName: "tooManyMergeRequestsAnalysis",
  thresholdName: "thresholdNumberOfMergeRequests",
  thresholdDefault: 3,
  thresholdMin: 1,
  thresholdMax: 10,
  constructiveFeedbackOnlyToggleDefault: false,
};
