import { CommitMessagesNote } from "../../../src/bot_actions/commit_messages/commit_message_note";
import { FailedResponse, SuccessfulGetResponse } from "../../../src/gitlab";

const successfulResponse = new SuccessfulGetResponse(200, {});
const failedResponse = new FailedResponse(401);

describe("CommitMessagesNote.fromMessage(message)", () => {
  describe("any message string", (message = "Helpful reminder from your friendly neighborhood GitRDoneBot.") => {
    test("RETURNS CLASS INSTANCE: CommitMessagesNote", () => {
      const note = CommitMessagesNote.fromMessage(message);
      expect(note).toBeInstanceOf(CommitMessagesNote);
    });
  });
});

describe("CommitMessagesNote.caseForNoAction(state, goodGitPractice, constructiveFeedbackOnlyToggle, totalCommits ", () => {
  describe("state === 'open'", (state = "open") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        describe("totalCommits === 0", (totalCommits = 0) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });

        describe("totalCommits !== 0", (totalCommits = 10) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        describe("totalCommits === 0", (totalCommits = 0) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });

        describe("totalCommits !== 0", (totalCommits = 10) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(false);
          });
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        describe("totalCommits === 0", (totalCommits = 0) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });

        describe("totalCommits !== 0", (totalCommits = 10) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(false);
          });
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        describe("totalCommits === 0", (totalCommits = 0) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });

        describe("totalCommits !== 0", (totalCommits = 10) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(false);
          });
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        describe("totalCommits === 0", (totalCommits = 0) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });

        describe("totalCommits !== 0", (totalCommits = 10) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(false);
          });
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        describe("totalCommits === 0", (totalCommits = 0) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });

        describe("totalCommits !== 0", (totalCommits = 10) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(false);
          });
        });
      });
    });
  });

  describe("state === 'merge'", (state = "merge") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        describe("totalCommits === 0", (totalCommits = 0) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });

        describe("totalCommits !== 0", (totalCommits = 10) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        describe("totalCommits === 0", (totalCommits = 0) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });

        describe("totalCommits !== 0", (totalCommits = 10) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        describe("totalCommits === 0", (totalCommits = 0) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });

        describe("totalCommits !== 0", (totalCommits = 10) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(false);
          });
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        describe("totalCommits === 0", (totalCommits = 0) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });

        describe("totalCommits !== 0", (totalCommits = 10) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(false);
          });
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        describe("totalCommits === 0", (totalCommits = 0) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });

        describe("totalCommits !== 0", (totalCommits = 10) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(false);
          });
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        describe("totalCommits === 0", (totalCommits = 0) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });

        describe("totalCommits !== 0", (totalCommits = 10) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(false);
          });
        });
      });
    });
  });

  describe("state === 'update'", (state = "update") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        describe("totalCommits === 0", (totalCommits = 0) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });

        describe("totalCommits !== 0", (totalCommits = 10) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        describe("totalCommits === 0", (totalCommits = 0) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });

        describe("totalCommits !== 0", (totalCommits = 10) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(false);
          });
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        describe("totalCommits === 0", (totalCommits = 0) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });

        describe("totalCommits !== 0", (totalCommits = 10) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(false);
          });
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        describe("totalCommits === 0", (totalCommits = 0) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });

        describe("totalCommits !== 0", (totalCommits = 10) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(false);
          });
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        describe("totalCommits === 0", (totalCommits = 0) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });

        describe("totalCommits !== 0", (totalCommits = 10) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(false);
          });
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        describe("totalCommits === 0", (totalCommits = 0) => {
          test("RETURNS BOOLEAN: true", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(true);
          });
        });

        describe("totalCommits !== 0", (totalCommits = 10) => {
          test("RETURNS BOOLEAN: false", () => {
            expect(
              CommitMessagesNote.caseForNoActions(
                state,
                goodGitPractice,
                constructiveFeedbackOnlyToggle,
                totalCommits,
              ),
            ).toBe(false);
          });
        });
      });
    });
  });
});

describe("CommitMessagesNote.caseForBadMessage(goodGitPractice)", () => {
  describe("goodGitPractice === true", (goodGitPractice = true) => {
    test("RETURNS BOOLEAN: false", () => {
      expect(CommitMessagesNote.caseForBadMessage(goodGitPractice)).toBe(false);
    });
  });

  describe("goodGitPractice === false", (goodGitPractice = false) => {
    test("RETURNS BOOLEAN: true", () => {
      expect(CommitMessagesNote.caseForBadMessage(goodGitPractice)).toBe(true);
    });
  });

  describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
    test("RETURNS BOOLEAN: false", () => {
      expect(CommitMessagesNote.caseForBadMessage(goodGitPractice)).toBe(false);
    });
  });
});

describe("CommitMessagesNote.caseForGoodMessage(state, goodGitPractice, constructiveFeedbackOnlyToggle", () => {
  describe("state === 'open'", (state = "open") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommitMessagesNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            CommitMessagesNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(true);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommitMessagesNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommitMessagesNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommitMessagesNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommitMessagesNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });
    });
  });

  describe("state === 'update'", (state = "update") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommitMessagesNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            CommitMessagesNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(true);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommitMessagesNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommitMessagesNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommitMessagesNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommitMessagesNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });
    });
  });

  describe("state === 'merge", (state = "merge") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommitMessagesNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommitMessagesNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommitMessagesNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommitMessagesNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommitMessagesNote.caseForGoodMessage(
              state,
              goodGitPractice,
              constructiveFeedbackOnlyToggle,
            ),
          ).toBe(false);
        });
      });

      describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            CommitMessagesNote.caseForGoodMessage(
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

describe("CommitMessagesNote.buildMessage(apiResponse, state, goodGitPractice, thresholdTestedNudges, constructiveFeedbackOnlyToggle, totalCommits, logger)", () => {
  describe("apiResponse !== FailedResponse", (apiResponse = successfulResponse) => {
    describe("state === 'open'", (state = "open") => {
      describe("goodGitPractice === 'true'", (goodGitPractice = true) => {
        describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
          describe("totalCommits === 0", (totalCommits = 0) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });

          describe("totalCommits !== 0", (totalCommits = 10) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });
        });

        describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
          describe("totalCommits === 0", (totalCommits = 0) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });

          describe("totalCommits !== 0", (totalCommits = 10) => {
            test("RETURNS STRING: good + hashtag", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(
                `${CommitMessagesNote.good} ${CommitMessagesNote.hashtag}`,
              );
            });
          });
        });
      });

      describe("goodGitPractice === 'false'", (goodGitPractice = false) => {
        describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
          describe("totalCommits === 0", (totalCommits = 0) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });

          describe("totalCommits !== 0", (totalCommits = 10) => {
            test("RETURNS STRING: bad + hashtag", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.bad} ${CommitMessagesNote.hashtag}`);
            });
          });
        });

        describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
          describe("totalCommits === 0", (totalCommits = 0) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });

          describe("totalCommits !== 0", (totalCommits = 10) => {
            test("RETURNS STRING: bad + hashtag", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.bad} ${CommitMessagesNote.hashtag}`);
            });
          });
        });
      });

      describe("goodGitPractice === 'undefined'", (goodGitPractice = undefined) => {
        describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
          describe("totalCommits === 0", (totalCommits = 0) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });

          describe("totalCommits !== 0", (totalCommits = 10) => {
            test("RETURNS STRING: unknownState", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.unknownState}`);
            });
          });
        });

        describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
          describe("totalCommits === 0", (totalCommits = 0) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });

          describe("totalCommits !== 0", (totalCommits = 10) => {
            test("RETURNS STRING: unknownState", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.unknownState}`);
            });
          });
        });
      });
    });

    describe("state === 'update'", (state = "update") => {
      describe("goodGitPractice === 'true'", (goodGitPractice = true) => {
        describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
          describe("totalCommits === 0", (totalCommits = 0) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });

          describe("totalCommits !== 0", (totalCommits = 10) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });
        });

        describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
          describe("totalCommits === 0", (totalCommits = 0) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });

          describe("totalCommits !== 0", (totalCommits = 10) => {
            test("RETURNS STRING: good + hashtag", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(
                `${CommitMessagesNote.good} ${CommitMessagesNote.hashtag}`,
              );
            });
          });
        });
      });

      describe("goodGitPractice === 'false'", (goodGitPractice = false) => {
        describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
          describe("totalCommits === 0", (totalCommits = 0) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });

          describe("totalCommits !== 0", (totalCommits = 10) => {
            test("RETURNS STRING: bad + hashtag", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.bad} ${CommitMessagesNote.hashtag}`);
            });
          });
        });

        describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
          describe("totalCommits === 0", (totalCommits = 0) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });

          describe("totalCommits !== 0", (totalCommits = 10) => {
            test("RETURNS STRING: bad + hashtag", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.bad} ${CommitMessagesNote.hashtag}`);
            });
          });
        });
      });

      describe("goodGitPractice === 'undefined'", (goodGitPractice = undefined) => {
        describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
          describe("totalCommits === 0", (totalCommits = 0) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });

          describe("totalCommits !== 0", (totalCommits = 10) => {
            test("RETURNS STRING: unknownState", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.unknownState}`);
            });
          });
        });

        describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
          describe("totalCommits === 0", (totalCommits = 0) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });

          describe("totalCommits !== 0", (totalCommits = 10) => {
            test("RETURNS STRING: unknownState", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.unknownState}`);
            });
          });
        });
      });
    });

    describe("state === 'merge'", (state = "merge") => {
      describe("goodGitPractice === 'true'", (goodGitPractice = true) => {
        describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
          describe("totalCommits === 0", (totalCommits = 0) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });

          describe("totalCommits !== 0", (totalCommits = 10) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });
        });

        describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
          describe("totalCommits === 0", (totalCommits = 0) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });

          describe("totalCommits !== 0", (totalCommits = 10) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });
        });
      });

      describe("goodGitPractice === 'false'", (goodGitPractice = false) => {
        describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
          describe("totalCommits === 0", (totalCommits = 0) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });

          describe("totalCommits !== 0", (totalCommits = 10) => {
            test("RETURNS STRING: bad + hashtag", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.bad} ${CommitMessagesNote.hashtag}`);
            });
          });
        });

        describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
          describe("totalCommits === 0", (totalCommits = 0) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });

          describe("totalCommits !== 0", (totalCommits = 10) => {
            test("RETURNS STRING: bad + hashtag", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.bad} ${CommitMessagesNote.hashtag}`);
            });
          });
        });
      });

      describe("goodGitPractice === 'undefined'", (goodGitPractice = undefined) => {
        describe("constructiveFeedbackOnlyToggle === true", (constructiveFeedbackOnlyToggle = true) => {
          describe("totalCommits === 0", (totalCommits = 0) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });

          describe("totalCommits !== 0", (totalCommits = 10) => {
            test("RETURNS STRING: unknownState", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.unknownState}`);
            });
          });
        });

        describe("constructiveFeedbackOnlyToggle === false", (constructiveFeedbackOnlyToggle = false) => {
          describe("totalCommits === 0", (totalCommits = 0) => {
            test("RETURNS STRING: noActionMessage", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.noActionMessage}`);
            });
          });

          describe("totalCommits !== 0", (totalCommits = 10) => {
            test("RETURNS STRING: unknownState", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(`${CommitMessagesNote.unknownState}`);
            });
          });
        });
      });
    });
  });

  describe("apiResponse === FailedResponse", (apiResponse = failedResponse) => {
    describe("state === undefined", (state = undefined) => {
      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        describe("constructiveFeedbackOnlyToggle === undefined", (constructiveFeedbackOnlyToggle = undefined) => {
          describe("totalCommits === undefined", (totalCommits = undefined) => {
            test("RETURNS STRING: checkPermissions", () => {
              expect(
                CommitMessagesNote.buildMessage(
                  apiResponse,
                  state,
                  goodGitPractice,
                  constructiveFeedbackOnlyToggle,
                  totalCommits,
                ),
              ).toBe(CommitMessagesNote.checkPermissionsMessage);
            });
          });
        });
      });
    });
  });
});
