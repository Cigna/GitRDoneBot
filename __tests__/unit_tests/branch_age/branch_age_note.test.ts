import { BotActionConfig } from "../../../src/custom_config/bot_action_config";
import { BranchAgeDefaults } from "../../../src/custom_config/action_config_defaults";
import { BranchAgeNote } from "../../../src/bot_actions/branch_age/branch_age_note";
import { SuccessfulGetResponse, FailedResponse } from "../../../src/gitlab";

// default value for customConfig.constructiveFeedbackOnlyToggle is false
const falseCustomConfig = BotActionConfig.from(BranchAgeDefaults, {});
const trueCustomConfig = BotActionConfig.from(BranchAgeDefaults, {
  branchAgeAnalysis: { constructiveFeedbackOnlyToggle: true },
});
const successfulResponse = new SuccessfulGetResponse(200, {});
const failedResponse = new FailedResponse(401);

describe("BranchAgeNote.fromMessage(message)", () => {
  describe("any message string", (message = "Helpful reminder from your friendly neighborhood GitRDoneBot.") => {
    test("RETURNS CLASS INSTANCE: BranchAgeNote", () => {
      const note = BranchAgeNote.fromMessage(message);
      expect(note).toBeInstanceOf(BranchAgeNote);
    });
  });
});

describe("BranchAgeNote.caseForNoActions(state, constructiveFeedbackOnlyToggle, goodGitPractice)", () => {
  describe("'open' state", (state = "open") => {
    describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            BranchAgeNote.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(true);
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });
    });

    describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });
    });
  });

  describe("'update' state", (state = "update") => {
    describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            BranchAgeNote.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(true);
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });
    });

    describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });
    });
  });

  describe("'merge' state", (state = "merge") => {
    describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            BranchAgeNote.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(true);
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });
    });

    describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            BranchAgeNote.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(true);
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });
    });
  });
});

describe("BranchAgeNote.caseForBadMessage(goodGitPractice)", () => {
  describe("goodGitPractice === true", (goodGitPractice = true) => {
    test("RETURNS BOOLEAN: false", () => {
      expect(BranchAgeNote.caseForBadMessage(goodGitPractice)).toBe(false);
    });
  });

  describe("goodGitPractice === false", (goodGitPractice = false) => {
    test("RETURNS BOOLEAN: true", () => {
      expect(BranchAgeNote.caseForBadMessage(goodGitPractice)).toBe(true);
    });
  });

  describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
    test("RETURNS BOOLEAN: false", () => {
      expect(BranchAgeNote.caseForBadMessage(goodGitPractice)).toBe(false);
    });
  });
});

describe("BranchAgeNote.caseForGoodMessage(state, constructiveFeedbackOnlyToggle, goodGitPractice)", () => {
  describe("'open' state", (state = "open") => {
    describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForGoodMessage(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForGoodMessage(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForGoodMessage(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });
    });

    describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            BranchAgeNote.caseForGoodMessage(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(true);
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForGoodMessage(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForGoodMessage(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
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
            BranchAgeNote.caseForGoodMessage(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForGoodMessage(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForGoodMessage(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });
    });

    describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            BranchAgeNote.caseForGoodMessage(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(true);
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForGoodMessage(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForGoodMessage(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
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
            BranchAgeNote.caseForGoodMessage(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForGoodMessage(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForGoodMessage(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });
    });

    describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForGoodMessage(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForGoodMessage(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            BranchAgeNote.caseForGoodMessage(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(false);
        });
      });
    });
  });
});

describe("BranchAgeNote.buildMessage(customConfig, apiResponse, goodGitPractice, state, logger)", () => {
  describe("apiResponse !== FailedResponse", (apiResponse = successfulResponse) => {
    describe("'open' state", (state = "open") => {
      describe("customConfig.constructiveFeedbackOnlyToggle === true", (customConfig = trueCustomConfig) => {
        describe("goodGitPractice === true", (goodGitPractice = true) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              BranchAgeNote.buildMessage(
                customConfig,
                apiResponse,
                goodGitPractice,
                state,
              ),
            ).toBe(BranchAgeNote.noActionMessage);
          });
        });

        describe("goodGitPractice === false", (goodGitPractice = false) => {
          test("RETURNS STRING: bad + hashtag", () => {
            expect(
              BranchAgeNote.buildMessage(
                customConfig,
                apiResponse,
                goodGitPractice,
                state,
              ),
            ).toBe(`${BranchAgeNote.bad} ${BranchAgeNote.hashtag}`);
          });
        });

        describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
          test("RETURNS STRING: unknownState", () => {
            expect(
              BranchAgeNote.buildMessage(
                customConfig,
                apiResponse,
                goodGitPractice,
                state,
              ),
            ).toBe(BranchAgeNote.unknownState);
          });
        });
      });

      describe("customConfig.constructiveFeedbackOnlyToggle === false", (customConfig = falseCustomConfig) => {
        describe("goodGitPractice === true", (goodGitPractice = true) => {
          test("RETURNS STRING: good + hashtag", () => {
            expect(
              BranchAgeNote.buildMessage(
                customConfig,
                apiResponse,
                goodGitPractice,
                state,
              ),
            ).toBe(`${BranchAgeNote.good} ${BranchAgeNote.hashtag}`);
          });
        });

        describe("goodGitPractice === false", (goodGitPractice = false) => {
          test("RETURNS STRING: bad + hashtag", () => {
            expect(
              BranchAgeNote.buildMessage(
                customConfig,
                apiResponse,
                goodGitPractice,
                state,
              ),
            ).toBe(`${BranchAgeNote.bad} ${BranchAgeNote.hashtag}`);
          });
        });

        describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
          test("RETURNS STRING: unknownState", () => {
            expect(
              BranchAgeNote.buildMessage(
                customConfig,
                apiResponse,
                goodGitPractice,
                state,
              ),
            ).toBe(BranchAgeNote.unknownState);
          });
        });
      });
    });

    describe("'update' state", (state = "update") => {
      describe("constructiveFeedbackOnlyToggle === true", (customConfig = trueCustomConfig) => {
        describe("goodGitPractice === true", (goodGitPractice = true) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              BranchAgeNote.buildMessage(
                customConfig,
                apiResponse,
                goodGitPractice,
                state,
              ),
            ).toBe(BranchAgeNote.noActionMessage);
          });
        });

        describe("goodGitPractice === false", (goodGitPractice = false) => {
          test("RETURNS STRING: bad + hashtag", () => {
            expect(
              BranchAgeNote.buildMessage(
                customConfig,
                apiResponse,
                goodGitPractice,
                state,
              ),
            ).toBe(`${BranchAgeNote.bad} ${BranchAgeNote.hashtag}`);
          });
        });

        describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
          test("RETURNS STRING: unknownState", () => {
            expect(
              BranchAgeNote.buildMessage(
                customConfig,
                apiResponse,
                goodGitPractice,
                state,
              ),
            ).toBe(BranchAgeNote.unknownState);
          });
        });
      });

      describe("customConfig.constructiveFeedbackOnlyToggle === false", (customConfig = falseCustomConfig) => {
        describe("goodGitPractice === true", (goodGitPractice = true) => {
          test("RETURNS STRING: good + hashtag", () => {
            expect(
              BranchAgeNote.buildMessage(
                customConfig,
                apiResponse,
                goodGitPractice,
                state,
              ),
            ).toBe(`${BranchAgeNote.good} ${BranchAgeNote.hashtag}`);
          });
        });

        describe("goodGitPractice === false", (goodGitPractice = false) => {
          test("RETURNS STRING: bad + hashtag", () => {
            expect(
              BranchAgeNote.buildMessage(
                customConfig,
                apiResponse,
                goodGitPractice,
                state,
              ),
            ).toBe(`${BranchAgeNote.bad} ${BranchAgeNote.hashtag}`);
          });
        });

        describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
          test("RETURNS STRING: unknownState", () => {
            expect(
              BranchAgeNote.buildMessage(
                customConfig,
                apiResponse,
                goodGitPractice,
                state,
              ),
            ).toBe(BranchAgeNote.unknownState);
          });
        });
      });
    });

    describe("'merge' state", (state = "merge") => {
      describe("constructiveFeedbackOnlyToggle === true", (customConfig = trueCustomConfig) => {
        describe("goodGitPractice === true", (goodGitPractice = true) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              BranchAgeNote.buildMessage(
                customConfig,
                apiResponse,
                goodGitPractice,
                state,
              ),
            ).toBe(BranchAgeNote.noActionMessage);
          });
        });

        describe("goodGitPractice === false", (goodGitPractice = false) => {
          test("RETURNS STRING: bad + hashtag", () => {
            expect(
              BranchAgeNote.buildMessage(
                customConfig,
                apiResponse,
                goodGitPractice,
                state,
              ),
            ).toBe(`${BranchAgeNote.bad} ${BranchAgeNote.hashtag}`);
          });
        });

        describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
          test("RETURNS STRING: unknownState", () => {
            expect(
              BranchAgeNote.buildMessage(
                customConfig,
                apiResponse,
                goodGitPractice,
                state,
              ),
            ).toBe(BranchAgeNote.unknownState);
          });
        });
      });

      describe("customConfig.constructiveFeedbackOnlyToggle === false", (customConfig = falseCustomConfig) => {
        describe("goodGitPractice === true", (goodGitPractice = true) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              BranchAgeNote.buildMessage(
                customConfig,
                apiResponse,
                goodGitPractice,
                state,
              ),
            ).toBe(BranchAgeNote.noActionMessage);
          });
        });

        describe("goodGitPractice === false", (goodGitPractice = false) => {
          test("RETURNS STRING: bad + hashtag", () => {
            expect(
              BranchAgeNote.buildMessage(
                customConfig,
                apiResponse,
                goodGitPractice,
                state,
              ),
            ).toBe(`${BranchAgeNote.bad} ${BranchAgeNote.hashtag}`);
          });
        });

        describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
          test("RETURNS STRING: unknownState", () => {
            expect(
              BranchAgeNote.buildMessage(
                customConfig,
                apiResponse,
                goodGitPractice,
                state,
              ),
            ).toBe(BranchAgeNote.unknownState);
          });
        });
      });
    });
  });

  // if apiResponse === FailedResponse, all other params are ignored
  describe("apiResponse === FailedResponse", (apiResponse = failedResponse) => {
    describe("state === undefined", (state = undefined) => {
      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        describe("customConfig === undefined", (customConfig = undefined) => {
          test("RETURNS STRING: checkPermissions", () => {
            expect(
              BranchAgeNote.buildMessage(
                customConfig,
                apiResponse,
                goodGitPractice,
                state,
              ),
            ).toBe(BranchAgeNote.checkPermissionsMessage);
          });
        });
      });
    });
  });
});
