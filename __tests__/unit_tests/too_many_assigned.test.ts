import {
  SuccessfulBotAction,
  SuccessfulBotActionWithNothingToSay,
  TooManyAssigned,
} from "../../src/bot_actions";

describe("TooManyAssigned.caseForBadMessage(state, goodGitPractice, assigneeId)", () => {
  describe("'open' state", (state = "open") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssigned.caseForBadMessage(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(false);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssigned.caseForBadMessage(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssigned.caseForBadMessage(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(false);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            TooManyAssigned.caseForBadMessage(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(true);
        });
      });
    });
  });

  describe("'update' state", (state = "update") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssigned.caseForBadMessage(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(false);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssigned.caseForBadMessage(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssigned.caseForBadMessage(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(false);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            TooManyAssigned.caseForBadMessage(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(true);
        });
      });
    });
  });

  describe("'merge' state", (state = "merge") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssigned.caseForBadMessage(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(false);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssigned.caseForBadMessage(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssigned.caseForBadMessage(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(false);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssigned.caseForBadMessage(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(false);
        });
      });
    });
  });
});

describe("TooManyAssigned.buildSuccessfulAction(apiResponse, state, goodGitPractice, assigneeId, logger)", () => {
  describe("'open' state", (state = "open") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithNothingToSay", () => {
          expect(
            TooManyAssigned.buildSuccessfulAction(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithNothingToSay", () => {
          expect(
            TooManyAssigned.buildSuccessfulAction(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithNothingToSay", () => {
          expect(
            TooManyAssigned.buildSuccessfulAction(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS INSTANCE: SuccessfulBotAction w/badNote", () => {
          const action = TooManyAssigned.buildSuccessfulAction(
            state,
            goodGitPractice,
            assigneeId,
          );
          expect(action).toBeInstanceOf(SuccessfulBotAction);
          expect((<SuccessfulBotAction>action).mrNote).toBe(
            `${TooManyAssigned.badNote} ${TooManyAssigned.hashtag}`,
          );
        });
      });
    });
  });

  describe("'update' state", (state = "update") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithNothingToSay", () => {
          expect(
            TooManyAssigned.buildSuccessfulAction(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithNothingToSay", () => {
          expect(
            TooManyAssigned.buildSuccessfulAction(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithNothingToSay", () => {
          expect(
            TooManyAssigned.buildSuccessfulAction(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS INSTANCE: SuccessfulBotAction w/badNote", () => {
          const action = TooManyAssigned.buildSuccessfulAction(
            state,
            goodGitPractice,
            assigneeId,
          );
          expect(action).toBeInstanceOf(SuccessfulBotAction);
          expect((<SuccessfulBotAction>action).mrNote).toBe(
            `${TooManyAssigned.badNote} ${TooManyAssigned.hashtag}`,
          );
        });
      });
    });
  });

  describe("'merge' state", (state = "merge") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithNothingToSay", () => {
          expect(
            TooManyAssigned.buildSuccessfulAction(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithNothingToSay", () => {
          expect(
            TooManyAssigned.buildSuccessfulAction(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithNothingToSay", () => {
          expect(
            TooManyAssigned.buildSuccessfulAction(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithNothingToSay", () => {
          expect(
            TooManyAssigned.buildSuccessfulAction(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
        });
      });
    });
  });
});
