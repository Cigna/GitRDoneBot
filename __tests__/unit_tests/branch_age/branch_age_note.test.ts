import { BotActionConfig } from "../../../src/custom_config/bot_action_config";
import { BranchAgeDefaults } from "../../../src/custom_config/action_config_defaults";
import { BranchAge, CommonMessages, SuccessfulBotAction, SuccessfulBotActionWithNothingToSay } from "../../../src/bot_actions";
import { SuccessfulGetResponse, FailedResponse } from "../../../src/gitlab";

// default value for customConfig.constructiveFeedbackOnlyToggle is false
const falseCustomConfig = BotActionConfig.from(BranchAgeDefaults, {});
const trueCustomConfig = BotActionConfig.from(BranchAgeDefaults, {
  branchAgeAnalysis: { constructiveFeedbackOnlyToggle: true },
});
const successfulResponse = new SuccessfulGetResponse(200, {});
const failedResponse = new FailedResponse(401);

// These cases were moved to CommonMessages, we might want to move them back
describe("BranchAge.buildAction", () => {
describe("BranchAgeNote.caseForNoActions(state, constructiveFeedbackOnlyToggle, goodGitPractice)", () => {
  describe("'open' state", (state = "open") => {
    describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            CommonMessages.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(true);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommonMessages.caseForNoActions(
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
            CommonMessages.caseForNoActions(
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
            CommonMessages.caseForNoActions(
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
            CommonMessages.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(true);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommonMessages.caseForNoActions(
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
            CommonMessages.caseForNoActions(
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
            CommonMessages.caseForNoActions(
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
            CommonMessages.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(true);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommonMessages.caseForNoActions(
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
            CommonMessages.caseForNoActions(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(true);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommonMessages.caseForNoActions(
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
      expect(CommonMessages.caseForBadMessage(goodGitPractice)).toBe(false);
    });
  });

  describe("goodGitPractice === false", (goodGitPractice = false) => {
    test("RETURNS BOOLEAN: true", () => {
      expect(CommonMessages.caseForBadMessage(goodGitPractice)).toBe(true);
    });
  });
});

describe("BranchAgeNote.caseForGoodMessage(state, constructiveFeedbackOnlyToggle, goodGitPractice)", () => {
  describe("'open' state", (state = "open") => {
    describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommonMessages.caseForGoodMessage(
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
            CommonMessages.caseForGoodMessage(
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
            CommonMessages.caseForGoodMessage(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(true);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommonMessages.caseForGoodMessage(
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
            CommonMessages.caseForGoodMessage(
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
            CommonMessages.caseForGoodMessage(
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
            CommonMessages.caseForGoodMessage(
              state,
              constructiveFeedbackOnlyToggle,
              goodGitPractice,
            ),
          ).toBe(true);
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommonMessages.caseForGoodMessage(
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
            CommonMessages.caseForGoodMessage(
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
            CommonMessages.caseForGoodMessage(
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
            CommonMessages.caseForGoodMessage(
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
            CommonMessages.caseForGoodMessage(
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
              BranchAge.buildAction(
                state,
                goodGitPractice,
                customConfig.constructiveFeedbackOnlyToggle,
                BranchAge.bad,
                BranchAge.good,
                BranchAge.hashtag,
                BranchAge.botActionName,
              ),
            ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
          });
        });

        describe("goodGitPractice === false", (goodGitPractice = false) => {
          test("RETURNS STRING: bad + hashtag", () => {
            const action = BranchAge.buildAction(
              state,
              goodGitPractice,
              customConfig.constructiveFeedbackOnlyToggle,
              BranchAge.bad,
              BranchAge.good,
              BranchAge.hashtag,
              BranchAge.botActionName,
            )
            expect(action).toBeInstanceOf(SuccessfulBotAction);
            expect((<SuccessfulBotAction>action).mrNote).toBe(`${BranchAge.bad} ${BranchAge.hashtag}`);
          });
        });

      describe("customConfig.constructiveFeedbackOnlyToggle === false", (customConfig = falseCustomConfig) => {
        describe("goodGitPractice === true", (goodGitPractice = true) => {
          test("RETURNS STRING: good + hashtag", () => {
            const action = BranchAge.buildAction(
              state,
              goodGitPractice,
              customConfig.constructiveFeedbackOnlyToggle,
              BranchAge.bad,
              BranchAge.good,
              BranchAge.hashtag,
              BranchAge.botActionName,
            )
            expect(action).toBeInstanceOf(SuccessfulBotAction);
            expect((<SuccessfulBotAction>action).mrNote).toBe(`${BranchAge.good} ${BranchAge.hashtag}`);
          });
        });

        describe("goodGitPractice === false", (goodGitPractice = false) => {
          test("RETURNS STRING: bad + hashtag", () => {
            const action = BranchAge.buildAction(
              state,
              goodGitPractice,
              customConfig.constructiveFeedbackOnlyToggle,
              BranchAge.bad,
              BranchAge.good,
              BranchAge.hashtag,
              BranchAge.botActionName,
            )
            expect(action).toBeInstanceOf(SuccessfulBotAction);
            expect((<SuccessfulBotAction>action).mrNote).toBe(`${BranchAge.bad} ${BranchAge.hashtag}`);
          });
        });
      });
    });

    describe("'update' state", (state = "update") => {
      describe("constructiveFeedbackOnlyToggle === true", (customConfig = trueCustomConfig) => {
        describe("goodGitPractice === true", (goodGitPractice = true) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              BranchAge.buildAction(
                state,
                goodGitPractice,
                customConfig.constructiveFeedbackOnlyToggle,
                BranchAge.bad,
                BranchAge.good,
                BranchAge.hashtag,
                BranchAge.botActionName,
              ),
            ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
          });
        });

        describe("goodGitPractice === false", (goodGitPractice = false) => {
          test("RETURNS STRING: bad + hashtag", () => {
            const action = BranchAge.buildAction(
              state,
              goodGitPractice,
              customConfig.constructiveFeedbackOnlyToggle,
              BranchAge.bad,
              BranchAge.good,
              BranchAge.hashtag,
              BranchAge.botActionName,
            )
            expect(action).toBeInstanceOf(SuccessfulBotAction);
            expect((<SuccessfulBotAction>action).mrNote).toBe(`${BranchAge.bad} ${BranchAge.hashtag}`);
          });
        });

      describe("customConfig.constructiveFeedbackOnlyToggle === false", (customConfig = falseCustomConfig) => {
        describe("goodGitPractice === true", (goodGitPractice = true) => {
          test("RETURNS STRING: good + hashtag", () => {
            const action = BranchAge.buildAction(
              state,
              goodGitPractice,
              customConfig.constructiveFeedbackOnlyToggle,
              BranchAge.bad,
              BranchAge.good,
              BranchAge.hashtag,
              BranchAge.botActionName,
            )
            expect(action).toBeInstanceOf(SuccessfulBotAction);
            expect((<SuccessfulBotAction>action).mrNote).toBe(`${BranchAge.good} ${BranchAge.hashtag}`);
          });
        });

        describe("goodGitPractice === false", (goodGitPractice = false) => {
          const action = BranchAge.buildAction(
            state,
            goodGitPractice,
            customConfig.constructiveFeedbackOnlyToggle,
            BranchAge.bad,
            BranchAge.good,
            BranchAge.hashtag,
            BranchAge.botActionName,
          )
          expect(action).toBeInstanceOf(SuccessfulBotAction);
          expect((<SuccessfulBotAction>action).mrNote).toBe(`${BranchAge.bad} ${BranchAge.hashtag}`);
          });
        });
      });
    });

    describe("'merge' state", (state = "merge") => {
      describe("constructiveFeedbackOnlyToggle === true", (customConfig = trueCustomConfig) => {
        describe("goodGitPractice === true", (goodGitPractice = true) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              BranchAge.buildAction(
                state,
                goodGitPractice,
                customConfig.constructiveFeedbackOnlyToggle,
                BranchAge.bad,
                BranchAge.good,
                BranchAge.hashtag,
                BranchAge.botActionName,
              ),
            ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
          });
        });

        describe("goodGitPractice === false", (goodGitPractice = false) => {
          test("RETURNS STRING: bad + hashtag", () => {
            const action = BranchAge.buildAction(
              state,
              goodGitPractice,
              customConfig.constructiveFeedbackOnlyToggle,
              BranchAge.bad,
              BranchAge.good,
              BranchAge.hashtag,
              BranchAge.botActionName,
            )
            expect(action).toBeInstanceOf(SuccessfulBotAction);
            expect((<SuccessfulBotAction>action).mrNote).toBe(`${BranchAge.bad} ${BranchAge.hashtag}`);
          });
        });
      });

      describe("customConfig.constructiveFeedbackOnlyToggle === false", (customConfig = falseCustomConfig) => {
        describe("goodGitPractice === true", (goodGitPractice = true) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              BranchAge.buildAction(
                state,
                goodGitPractice,
                customConfig.constructiveFeedbackOnlyToggle,
                BranchAge.bad,
                BranchAge.good,
                BranchAge.hashtag,
                BranchAge.botActionName,
              ),
            ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
          });
        });

        describe("goodGitPractice === false", (goodGitPractice = false) => {
          test("RETURNS STRING: bad + hashtag", () => {
            const action = BranchAge.buildAction(
              state,
              goodGitPractice,
              customConfig.constructiveFeedbackOnlyToggle,
              BranchAge.bad,
              BranchAge.good,
              BranchAge.hashtag,
              BranchAge.botActionName,
            )
            expect(action).toBeInstanceOf(SuccessfulBotAction);
            expect((<SuccessfulBotAction>action).mrNote).toBe(`${BranchAge.bad} ${BranchAge.hashtag}`);
          });
        });
      });
    });
  });

  // TODO: this is being handled not by the same function and should be tested at the action level.
  // if apiResponse === FailedResponse, all other params are ignored
  // describe("apiResponse === FailedResponse", (apiResponse = failedResponse) => {
  //   describe("state === undefined", (state = undefined) => {
  //     describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
  //       describe("customConfig === undefined", (customConfig = undefined) => {
  //         test("RETURNS STRING: checkPermissions", () => {
  //           expect(
  //             BranchAgeNote.buildMessage(
  //               customConfig,
  //               apiResponse,
  //               goodGitPractice,
  //               state,
  //             ),
  //           ).toBe(BranchAgeNote.checkPermissionsMessage);
  //         });
  //       });
  //     });
  //   });
  // });
