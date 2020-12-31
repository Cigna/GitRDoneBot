import { BotActionConfig } from "../../src/custom_config/bot_action_config";
import { BranchAgeDefaults } from "../../src/custom_config/action_config_defaults";
import {
  BranchAge,
  SuccessfulBotActionWithMessage,
  SuccessfulBotActionWithNothingToSay,
} from "../../src/bot_actions";
import { GitLabCommit } from "../../src/interfaces";
import { mockGitLabCommit } from "../helpers";

// TEST FIXTURES
const defaultConfig = BotActionConfig.from(BranchAgeDefaults, {});

const old_commits: Array<GitLabCommit> = [
  mockGitLabCommit("2nd Oldest commit", "2012-09-20T11:50:22+03:00"),
  mockGitLabCommit("Oldest commit", "2011-09-20T11:50:22+03:00"),
  mockGitLabCommit("3rd Oldest commit", new Date().toString()),
];

const thresholdDate = new Date();
thresholdDate.setDate(thresholdDate.getDate() - defaultConfig.threshold);
thresholdDate.setHours(thresholdDate.getHours() + 1);

// default value for customConfig.constructiveFeedbackOnlyToggle is false
const falseCustomConfig = BotActionConfig.from(BranchAgeDefaults, {});
const trueCustomConfig = BotActionConfig.from(BranchAgeDefaults, {
  branchAgeAnalysis: { constructiveFeedbackOnlyToggle: true },
});

describe("BranchAge.getOldestCommit(commits)", () => {
  test("should return the oldest commit", () => {
    const oldestCommit: GitLabCommit = BranchAge["getOldestCommit"](
      old_commits,
    );
    expect(oldestCommit.title).toBe("Oldest commit");
  });
});

describe("BranchAge.isBranchYoungerThanThreshold(oldestCommit, threshold)", () => {
  test("should return true if commit is younger than threshold", () => {
    expect(
      BranchAge["isBranchYoungerThanThreshold"](
        {
          title: "3rd Oldest commit",
          created_at: new Date().toString(),
        },
        defaultConfig.threshold,
      ),
    ).toBe(true);
  });

  test("should return false if commit is older than threshold", () => {
    expect(
      BranchAge["isBranchYoungerThanThreshold"](
        {
          title: "Oldest commit",
          created_at: "2011-09-20T11:50:22+03:00",
        },
        defaultConfig.threshold,
      ),
    ).toBe(false);
  });

  test("should return true if commit age is equal to the threshold", () => {
    expect(
      BranchAge["isBranchYoungerThanThreshold"](
        {
          title: "Oldest commit",
          created_at: thresholdDate.toString(),
        },
        defaultConfig.threshold,
      ),
    ).toBe(true);
  });
});

describe("BranchAge.caseForBadMessage(goodGitPractice)", () => {
  describe("goodGitPractice === true", (goodGitPractice = true) => {
    test("RETURNS BOOLEAN: false", () => {
      expect(BranchAge.caseForBadMessage(goodGitPractice)).toBe(false);
    });
  });

  describe("goodGitPractice === false", (goodGitPractice = false) => {
    test("RETURNS BOOLEAN: true", () => {
      expect(BranchAge.caseForBadMessage(goodGitPractice)).toBe(true);
    });
  });
});

describe("BranchAge.caseForGoodMessage(state, goodGitPractice, constructiveFeedbackOnlyToggle)", () => {
  describe("'open' state", (state = "open") => {
    describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAge.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAge.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });
    });

    describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            BranchAge.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(true);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAge.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });
    });
  });

  describe("'update' state", (state = "update") => {
    describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAge.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAge.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });
    });

    describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            BranchAge.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(true);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAge.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });
    });
  });

  describe("'merge' state", (state = "merge") => {
    describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAge.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAge.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });
    });

    describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAge.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAge.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });
    });
  });
});

describe("BranchAge.buildSuccessfulAction(state, goodGitPractice, constructiveFeedbackOnlyToggle)", () => {
  describe("'open' state", (state = "open") => {
    describe("customConfig.constructiveFeedbackOnlyToggle === true", (customConfig = trueCustomConfig) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithNothingToSay", () => {
          expect(
            BranchAge.buildSuccessfulAction(
              state,
              goodGitPractice,
              customConfig.constructiveFeedbackOnlyToggle,
            ),
          ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithMessage w/badNote", () => {
          const action = BranchAge.buildSuccessfulAction(
            state,
            goodGitPractice,
            customConfig.constructiveFeedbackOnlyToggle,
          );
          expect(action).toBeInstanceOf(SuccessfulBotActionWithMessage);
          expect((<SuccessfulBotActionWithMessage>action).mrNote).toBe(
            `${BranchAge.badNote} ${BranchAge.hashtag}`,
          );
        });
      });
    });

    describe("customConfig.constructiveFeedbackOnlyToggle === false", (customConfig = falseCustomConfig) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithMessage w/goodNote", () => {
          const action = BranchAge.buildSuccessfulAction(
            state,
            goodGitPractice,
            customConfig.constructiveFeedbackOnlyToggle,
          );
          expect(action).toBeInstanceOf(SuccessfulBotActionWithMessage);
          expect((<SuccessfulBotActionWithMessage>action).mrNote).toBe(
            `${BranchAge.goodNote} ${BranchAge.hashtag}`,
          );
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithMessage w/badNote", () => {
          const action = BranchAge.buildSuccessfulAction(
            state,
            goodGitPractice,
            customConfig.constructiveFeedbackOnlyToggle,
          );
          expect(action).toBeInstanceOf(SuccessfulBotActionWithMessage);
          expect((<SuccessfulBotActionWithMessage>action).mrNote).toBe(
            `${BranchAge.badNote} ${BranchAge.hashtag}`,
          );
        });
      });
    });
  });

  describe("'update' state", (state = "update") => {
    describe("customConfig.constructiveFeedbackOnlyToggle === true", (customConfig = trueCustomConfig) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithNothingToSay", () => {
          expect(
            BranchAge.buildSuccessfulAction(
              state,
              goodGitPractice,
              customConfig.constructiveFeedbackOnlyToggle,
            ),
          ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithMessage w/badNote", () => {
          const action = BranchAge.buildSuccessfulAction(
            state,
            goodGitPractice,
            customConfig.constructiveFeedbackOnlyToggle,
          );
          expect(action).toBeInstanceOf(SuccessfulBotActionWithMessage);
          expect((<SuccessfulBotActionWithMessage>action).mrNote).toBe(
            `${BranchAge.badNote} ${BranchAge.hashtag}`,
          );
        });
      });
    });

    describe("customConfig.constructiveFeedbackOnlyToggle === false", (customConfig = falseCustomConfig) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithMessage w/goodNote", () => {
          const action = BranchAge.buildSuccessfulAction(
            state,
            goodGitPractice,
            customConfig.constructiveFeedbackOnlyToggle,
          );
          expect(action).toBeInstanceOf(SuccessfulBotActionWithMessage);
          expect((<SuccessfulBotActionWithMessage>action).mrNote).toBe(
            `${BranchAge.goodNote} ${BranchAge.hashtag}`,
          );
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithMessage w/badNote", () => {
          const action = BranchAge.buildSuccessfulAction(
            state,
            goodGitPractice,
            customConfig.constructiveFeedbackOnlyToggle,
          );
          expect(action).toBeInstanceOf(SuccessfulBotActionWithMessage);
          expect((<SuccessfulBotActionWithMessage>action).mrNote).toBe(
            `${BranchAge.badNote} ${BranchAge.hashtag}`,
          );
        });
      });
    });
  });

  describe("'merge' state", (state = "merge") => {
    describe("constructiveFeedbackOnlyToggle === true", (customConfig = trueCustomConfig) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithNothingToSay", () => {
          expect(
            BranchAge.buildSuccessfulAction(
              state,
              goodGitPractice,
              customConfig.constructiveFeedbackOnlyToggle,
            ),
          ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithMessage w/badNote", () => {
          const action = BranchAge.buildSuccessfulAction(
            state,
            goodGitPractice,
            customConfig.constructiveFeedbackOnlyToggle,
          );
          expect(action).toBeInstanceOf(SuccessfulBotActionWithMessage);
          expect((<SuccessfulBotActionWithMessage>action).mrNote).toBe(
            `${BranchAge.badNote} ${BranchAge.hashtag}`,
          );
        });
      });
    });

    describe("customConfig.constructiveFeedbackOnlyToggle === false", (customConfig = falseCustomConfig) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithNothingToSay", () => {
          expect(
            BranchAge.buildSuccessfulAction(
              state,
              goodGitPractice,
              customConfig.constructiveFeedbackOnlyToggle,
            ),
          ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithMessage w/badNote", () => {
          const action = BranchAge.buildSuccessfulAction(
            state,
            goodGitPractice,
            customConfig.constructiveFeedbackOnlyToggle,
          );
          expect(action).toBeInstanceOf(SuccessfulBotActionWithMessage);
          expect((<SuccessfulBotActionWithMessage>action).mrNote).toBe(
            `${BranchAge.badNote} ${BranchAge.hashtag}`,
          );
        });
      });
    });
  });
});
