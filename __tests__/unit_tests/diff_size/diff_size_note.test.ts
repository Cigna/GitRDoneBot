import { winlog } from "../../../src/util";
import { BotActionConfig } from "../../../src/custom_config/bot_action_config";
import { DiffSizeDefaults } from "../../../src/custom_config/action_config_defaults";
import { DiffSizeNote } from "../../../src/bot_actions/diff_size/diff_size_note";
import { FailedResponse, SuccessfulGetResponse } from "../../../src/gitlab";

// default value for customConfig.constructiveFeedbackOnlyToggle is false
const falseCustomConfig = BotActionConfig.from(DiffSizeDefaults, {});
const trueCustomConfig = BotActionConfig.from(DiffSizeDefaults, {
  diffAnalysis: { constructiveFeedbackOnlyToggle: true },
});
const successfulResponse = new SuccessfulGetResponse(200, {});
const failedResponse = new FailedResponse(401);

describe("DiffSizeNote.fromMessage(message)", () => {
  describe("any message string", (message = "Helpful reminder from your friendly neighborhood GitRDoneBot.") => {
    test("RETURNS CLASS INSTANCE: DiffSizeNote", () => {
      const note = DiffSizeNote.fromMessage(message);
      expect(note).toBeInstanceOf(DiffSizeNote);
    });
  });
});

describe("DiffSizeNote.caseForNoActions(state, constructiveFeedbackOnlyToggle, goodGitPractice)", () => {
  describe("'open' state", (state = "open") => {
    describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            DiffSizeNote.caseForNoActions(
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
            DiffSizeNote.caseForNoActions(
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
            DiffSizeNote.caseForNoActions(
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
            DiffSizeNote.caseForNoActions(
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
            DiffSizeNote.caseForNoActions(
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
            DiffSizeNote.caseForNoActions(
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
            DiffSizeNote.caseForNoActions(
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
            DiffSizeNote.caseForNoActions(
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
            DiffSizeNote.caseForNoActions(
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
            DiffSizeNote.caseForNoActions(
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
            DiffSizeNote.caseForNoActions(
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
            DiffSizeNote.caseForNoActions(
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
            DiffSizeNote.caseForNoActions(
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
            DiffSizeNote.caseForNoActions(
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
            DiffSizeNote.caseForNoActions(
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
            DiffSizeNote.caseForNoActions(
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
            DiffSizeNote.caseForNoActions(
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
            DiffSizeNote.caseForNoActions(
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

describe("DiffSizeNote.caseForZeroMessage(state, totalDiffs, constructiveFeedbackOnlyToggle, goodGitPractice)", () => {
  describe("'open' state", (state = "open") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        describe("totalDiffs === 0", (totalDiffs = 0) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });

        describe("totalDiffs !== 0", (totalDiffs = -1) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        describe("totalDiffs === 0", (totalDiffs = 0) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(true);
          });
        });

        describe("totalDiffs !== 0", (totalDiffs = -1) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        describe("totalDiffs === 0", (totalDiffs = 0) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });

        describe("totalDiffs !== 0", (totalDiffs = -1) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        describe("totalDiffs === 0", (totalDiffs = 0) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });

        describe("totalDiffs !== 0", (totalDiffs = -1) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        describe("totalDiffs === 0", (totalDiffs = 0) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });

        describe("totalDiffs !== 0", (totalDiffs = -1) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        describe("totalDiffs === 0", (totalDiffs = 0) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });

        describe("totalDiffs !== 0", (totalDiffs = -1) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });
      });
    });
  });

  describe("'update' state", (state = "update") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        describe("totalDiffs === 0", (totalDiffs = 0) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });

        describe("totalDiffs !== 0", (totalDiffs = -1) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        describe("totalDiffs === 0", (totalDiffs = 0) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(true);
          });
        });

        describe("totalDiffs !== 0", (totalDiffs = -1) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        describe("totalDiffs === 0", (totalDiffs = 0) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });

        describe("totalDiffs !== 0", (totalDiffs = -1) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        describe("totalDiffs === 0", (totalDiffs = 0) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });

        describe("totalDiffs !== 0", (totalDiffs = -1) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        describe("totalDiffs === 0", (totalDiffs = 0) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });

        describe("totalDiffs !== 0", (totalDiffs = -1) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        describe("totalDiffs === 0", (totalDiffs = 0) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });

        describe("totalDiffs !== 0", (totalDiffs = -1) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });
      });
    });
  });

  describe("'merge' state", (state = "merge") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        describe("totalDiffs === 0", (totalDiffs = 0) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });

        describe("totalDiffs !== 0", (totalDiffs = -1) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        describe("totalDiffs === 0", (totalDiffs = 0) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });

        describe("totalDiffs !== 0", (totalDiffs = -1) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        describe("totalDiffs === 0", (totalDiffs = 0) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });

        describe("totalDiffs !== 0", (totalDiffs = -1) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        describe("totalDiffs === 0", (totalDiffs = 0) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });

        describe("totalDiffs !== 0", (totalDiffs = -1) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        describe("totalDiffs === 0", (totalDiffs = 0) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });

        describe("totalDiffs !== 0", (totalDiffs = -1) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        describe("totalDiffs === 0", (totalDiffs = 0) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });

        describe("totalDiffs !== 0", (totalDiffs = -1) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              DiffSizeNote.caseForZeroMessage(
                state,
                totalDiffs,
                constructiveFeedbackOnlyToggle,
                goodGitPractice,
              ),
            ).toBe(false);
          });
        });
      });
    });
  });
});

describe("DiffSizeNote.caseForBadMessage(goodGitPractice)", () => {
  describe("goodGitPractice === true", (goodGitPractice = true) => {
    test("RETURNS BOOLEAN: false", () => {
      expect(DiffSizeNote.caseForBadMessage(goodGitPractice)).toBe(false);
    });
  });

  describe("goodGitPractice === false", (goodGitPractice = false) => {
    test("RETURNS BOOLEAN: true", () => {
      expect(DiffSizeNote.caseForBadMessage(goodGitPractice)).toBe(true);
    });
  });

  describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
    test("RETURNS BOOLEAN: false", () => {
      expect(DiffSizeNote.caseForBadMessage(goodGitPractice)).toBe(false);
    });
  });
});

describe("DiffSizeNote.caseForGoodMessage(state, goodGitPractice, constructiveFeedbackOnlyToggle)", () => {
  describe("'open' state", (state = "open") => {
    describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            DiffSizeNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            DiffSizeNote.caseForGoodMessage(
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
            DiffSizeNote.caseForGoodMessage(
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
            DiffSizeNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(true);
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            DiffSizeNote.caseForGoodMessage(
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
            DiffSizeNote.caseForGoodMessage(
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
            DiffSizeNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            DiffSizeNote.caseForGoodMessage(
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
            DiffSizeNote.caseForGoodMessage(
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
            DiffSizeNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(true);
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            DiffSizeNote.caseForGoodMessage(
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
            DiffSizeNote.caseForGoodMessage(
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
            DiffSizeNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            DiffSizeNote.caseForGoodMessage(
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
            DiffSizeNote.caseForGoodMessage(
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
            DiffSizeNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            DiffSizeNote.caseForGoodMessage(
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
            DiffSizeNote.caseForGoodMessage(
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

describe("DiffSizeNote.buildMessage(customConfig, apiResponse, state, goodGitPractice, totalDiffs, logger)", () => {
  // All DiffSizeNote logic only cares if apiResponse === false; true or undefined are ignored
  describe("apiResponse !== false", (apiResponse = successfulResponse) => {
    describe("'open' state", (state = "open") => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        describe("customConfig.constructiveFeedbackOnlyToggle === true", (customConfig = trueCustomConfig) => {
          describe("totalDiffs === 0", (totalDiffs = 0) => {
            test("RETURNS STRING: noAction", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.noActionMessage);
            });
          });

          describe("totalDiffs !== 0", (totalDiffs = -1) => {
            test("RETURNS STRING: noAction", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.noActionMessage);
            });
          });
        });

        describe("customConfig.constructiveFeedbackOnlyToggle === false", (customConfig = falseCustomConfig) => {
          describe("totalDiffs === 0", (totalDiffs = 0) => {
            test("RETURNS STRING: zeroLine + hashtag", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(`${DiffSizeNote.zeroLine} ${DiffSizeNote.hashtag}`);
            });
          });

          describe("totalDiffs !== 0", (totalDiffs = -1) => {
            test("RETURNS STRING: good + hashtag", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(`${DiffSizeNote.good} ${DiffSizeNote.hashtag}`);
            });
          });
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        describe("customConfig.constructiveFeedbackOnlyToggle === true", (customConfig = trueCustomConfig) => {
          describe("totalDiffs === 0", (totalDiffs = 0) => {
            test("RETURNS STRING: bad + hashtag", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(`${DiffSizeNote.bad} ${DiffSizeNote.hashtag}`);
            });
          });

          describe("totalDiffs !== 0", (totalDiffs = -1) => {
            test("RETURNS STRING: bad + hashtag", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(`${DiffSizeNote.bad} ${DiffSizeNote.hashtag}`);
            });
          });
        });

        describe("customConfig.constructiveFeedbackOnlyToggle === false", (customConfig = falseCustomConfig) => {
          describe("totalDiffs === 0", (totalDiffs = 0) => {
            test("RETURNS STRING: bad + hashtag", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(`${DiffSizeNote.bad} ${DiffSizeNote.hashtag}`);
            });
          });

          describe("totalDiffs !== 0", (totalDiffs = -1) => {
            test("RETURNS STRING: bad + hashtag", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(`${DiffSizeNote.bad} ${DiffSizeNote.hashtag}`);
            });
          });
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        describe("customConfig.constructiveFeedbackOnlyToggle === true", (customConfig = trueCustomConfig) => {
          describe("totalDiffs === 0", (totalDiffs = 0) => {
            test("RETURNS STRING: unknownState", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.unknownState);
            });
          });

          describe("totalDiffs !== 0", (totalDiffs = -1) => {
            test("RETURNS STRING: unknownState", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.unknownState);
            });
          });
        });

        describe("customConfig.constructiveFeedbackOnlyToggle === false", (customConfig = falseCustomConfig) => {
          describe("totalDiffs === 0", (totalDiffs = 0) => {
            test("RETURNS STRING: unknownState", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.unknownState);
            });
          });

          describe("totalDiffs !== 0", (totalDiffs = -1) => {
            test("RETURNS STRING: unknownState", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.unknownState);
            });
          });
        });
      });
    });

    describe("'update' state", (state = "update") => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        describe("customConfig.constructiveFeedbackOnlyToggle === true", (customConfig = trueCustomConfig) => {
          describe("totalDiffs === 0", (totalDiffs = 0) => {
            test("RETURNS STRING: noAction", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.noActionMessage);
            });
          });

          describe("totalDiffs !== 0", (totalDiffs = -1) => {
            test("RETURNS STRING: noAction", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.noActionMessage);
            });
          });
        });

        describe("customConfig.constructiveFeedbackOnlyToggle === false", (customConfig = falseCustomConfig) => {
          describe("totalDiffs === 0", (totalDiffs = 0) => {
            test("RETURNS STRING: zeroLine", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(`${DiffSizeNote.zeroLine} ${DiffSizeNote.hashtag}`);
            });
          });

          describe("totalDiffs !== 0", (totalDiffs = -1) => {
            test("RETURNS STRING: good + hashtag", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(`${DiffSizeNote.good} ${DiffSizeNote.hashtag}`);
            });
          });
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        describe("customConfig.constructiveFeedbackOnlyToggle === true", (customConfig = trueCustomConfig) => {
          describe("totalDiffs === 0", (totalDiffs = 0) => {
            test("RETURNS STRING: bad + hashtag", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(`${DiffSizeNote.bad} ${DiffSizeNote.hashtag}`);
            });
          });

          describe("totalDiffs !== 0", (totalDiffs = -1) => {
            test("RETURNS STRING: bad + hashtag", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(`${DiffSizeNote.bad} ${DiffSizeNote.hashtag}`);
            });
          });
        });

        describe("customConfig.constructiveFeedbackOnlyToggle === false", (customConfig = falseCustomConfig) => {
          describe("totalDiffs === 0", (totalDiffs = 0) => {
            test("RETURNS STRING: bad + hashtag", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(`${DiffSizeNote.bad} ${DiffSizeNote.hashtag}`);
            });
          });

          describe("totalDiffs !== 0", (totalDiffs = -1) => {
            test("RETURNS STRING: bad + hashtag", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(`${DiffSizeNote.bad} ${DiffSizeNote.hashtag}`);
            });
          });
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        describe("customConfig.constructiveFeedbackOnlyToggle === true", (customConfig = trueCustomConfig) => {
          describe("totalDiffs === 0", (totalDiffs = 0) => {
            test("RETURNS STRING: unknownState", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.unknownState);
            });
          });

          describe("totalDiffs !== 0", (totalDiffs = -1) => {
            test("RETURNS STRING: unknownState", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.unknownState);
            });
          });
        });

        describe("customConfig.constructiveFeedbackOnlyToggle === false", (customConfig = falseCustomConfig) => {
          describe("totalDiffs === 0", (totalDiffs = 0) => {
            test("RETURNS STRING: unknownState", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.unknownState);
            });
          });

          describe("totalDiffs !== 0", (totalDiffs = -1) => {
            test("RETURNS STRING: unknownState", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.unknownState);
            });
          });
        });
      });
    });

    describe("'merge' state", (state = "merge") => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        describe("customConfig.constructiveFeedbackOnlyToggle === true", (customConfig = trueCustomConfig) => {
          describe("totalDiffs === 0", (totalDiffs = 0) => {
            test("RETURNS STRING: noAction", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.noActionMessage);
            });
          });

          describe("totalDiffs !== 0", (totalDiffs = -1) => {
            test("RETURNS STRING: noAction", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.noActionMessage);
            });
          });
        });

        describe("customConfig.constructiveFeedbackOnlyToggle === false", (customConfig = falseCustomConfig) => {
          describe("totalDiffs === 0", (totalDiffs = 0) => {
            test("RETURNS STRING: noAction", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.noActionMessage);
            });
          });

          describe("totalDiffs !== 0", (totalDiffs = -1) => {
            test("RETURNS STRING: noAction", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.noActionMessage);
            });
          });
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        describe("customConfig.constructiveFeedbackOnlyToggle === true", (customConfig = trueCustomConfig) => {
          describe("totalDiffs === 0", (totalDiffs = 0) => {
            test("RETURNS STRING: bad + hashtag", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(`${DiffSizeNote.bad} ${DiffSizeNote.hashtag}`);
            });
          });

          describe("totalDiffs !== 0", (totalDiffs = -1) => {
            test("RETURNS STRING: bad + hashtag", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(`${DiffSizeNote.bad} ${DiffSizeNote.hashtag}`);
            });
          });
        });

        describe("customConfig.constructiveFeedbackOnlyToggle === false", (customConfig = falseCustomConfig) => {
          describe("totalDiffs === 0", (totalDiffs = 0) => {
            test("RETURNS STRING: bad + hashtag", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(`${DiffSizeNote.bad} ${DiffSizeNote.hashtag}`);
            });
          });

          describe("totalDiffs !== 0", (totalDiffs = -1) => {
            test("RETURNS STRING: bad + hashtag", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(`${DiffSizeNote.bad} ${DiffSizeNote.hashtag}`);
            });
          });
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        describe("customConfig.constructiveFeedbackOnlyToggle === true", (customConfig = trueCustomConfig) => {
          describe("totalDiffs === 0", (totalDiffs = 0) => {
            test("RETURNS STRING: unknownState", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.unknownState);
            });
          });

          describe("totalDiffs !== 0", (totalDiffs = -1) => {
            test("RETURNS STRING: unknownState", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.unknownState);
            });
          });
        });

        describe("customConfig.constructiveFeedbackOnlyToggle === false", (customConfig = falseCustomConfig) => {
          describe("totalDiffs === 0", (totalDiffs = 0) => {
            test("RETURNS STRING: unknownState", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.unknownState);
            });
          });

          describe("totalDiffs !== 0", (totalDiffs = -1) => {
            test("RETURNS STRING: unknownState", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.unknownState);
            });
          });
        });
      });
    });
  });

  // if apiResponse === FailedResponse, all other params are ignored
  describe("apiResponse === FailedResponse", (apiResponse = failedResponse) => {
    describe("state === undefined", (state = undefined) => {
      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        describe("constructiveFeedbackOnlyToggle === undefined", (customConfig = undefined) => {
          describe("totalDiffs === undefined", (totalDiffs = undefined) => {
            test("RETURNS STRING: checkPermissions", () => {
              expect(
                DiffSizeNote.buildMessage(
                  customConfig,
                  apiResponse,
                  state,
                  goodGitPractice,
                  totalDiffs,
                  winlog,
                ),
              ).toBe(DiffSizeNote.checkPermissionsMessage);
            });
          });
        });
      });
    });
  });
});
