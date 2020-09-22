import { winlog } from "../../../src/util";
import { TooManyAssignedNote } from "../../../src/bot_actions/too_many_assigned/too_many_assigned_note";

describe("TooManyAssignedNote.fromMessage(message)", () => {
  describe("any message string", (message = "Helpful reminder from your friendly neighborhood GitRDoneBot.") => {
    test("RETURNS CLASS INSTANCE: SelfMergeAnalysisNote", () => {
      const note = TooManyAssignedNote.fromMessage(message);
      expect(note).toBeInstanceOf(TooManyAssignedNote);
    });
  });
});

describe("TooManyAssignedNote.customCaseForCheckPermissionsMessage(gitLabRequestSuccess, state, assigneeId)", () => {
  describe("gitLabRequestSuccess === true", (gitLabRequestSuccess = true) => {
    describe("'open' state", (state = "open") => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssignedNote.customCaseForCheckPermissionsMessage(
              gitLabRequestSuccess,
              state,
              assigneeId,
            ),
          ).toBe(false);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssignedNote.customCaseForCheckPermissionsMessage(
              gitLabRequestSuccess,
              state,
              assigneeId,
            ),
          ).toBe(false);
        });
      });
    });

    describe("'update' state", (state = "update") => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssignedNote.customCaseForCheckPermissionsMessage(
              gitLabRequestSuccess,
              state,
              assigneeId,
            ),
          ).toBe(false);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssignedNote.customCaseForCheckPermissionsMessage(
              gitLabRequestSuccess,
              state,
              assigneeId,
            ),
          ).toBe(false);
        });
      });
    });

    describe("'merge' state", (state = "merge") => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssignedNote.customCaseForCheckPermissionsMessage(
              gitLabRequestSuccess,
              state,
              assigneeId,
            ),
          ).toBe(false);
        });
      });
      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssignedNote.customCaseForCheckPermissionsMessage(
              gitLabRequestSuccess,
              state,
              assigneeId,
            ),
          ).toBe(false);
        });
      });
    });
  });

  describe("gitLabRequestSuccess === false", (gitLabRequestSuccess = false) => {
    describe("'open' state", (state = "open") => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssignedNote.customCaseForCheckPermissionsMessage(
              gitLabRequestSuccess,
              state,
              assigneeId,
            ),
          ).toBe(false);
        });
      });
      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            TooManyAssignedNote.customCaseForCheckPermissionsMessage(
              gitLabRequestSuccess,
              state,
              assigneeId,
            ),
          ).toBe(true);
        });
      });
    });

    describe("'update' state", (state = "update") => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssignedNote.customCaseForCheckPermissionsMessage(
              gitLabRequestSuccess,
              state,
              assigneeId,
            ),
          ).toBe(false);
        });
      });
      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            TooManyAssignedNote.customCaseForCheckPermissionsMessage(
              gitLabRequestSuccess,
              state,
              assigneeId,
            ),
          ).toBe(true);
        });
      });
    });

    describe("'merge' state", (state = "merge") => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssignedNote.customCaseForCheckPermissionsMessage(
              gitLabRequestSuccess,
              state,
              assigneeId,
            ),
          ).toBe(false);
        });
      });
      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssignedNote.customCaseForCheckPermissionsMessage(
              gitLabRequestSuccess,
              state,
              assigneeId,
            ),
          ).toBe(false);
        });
      });
    });
  });
});

describe("TooManyAssignedNote.caseForBadMessage(state, goodGitPractice, assigneeId)", () => {
  describe("'open' state", (state = "open") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssignedNote.caseForBadMessage(
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
            TooManyAssignedNote.caseForBadMessage(
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
            TooManyAssignedNote.caseForBadMessage(
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
            TooManyAssignedNote.caseForBadMessage(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(true);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssignedNote.caseForBadMessage(
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
            TooManyAssignedNote.caseForBadMessage(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(false);
        });
      });
    });
  });

  describe("'update' state", (state = "update") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssignedNote.caseForBadMessage(
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
            TooManyAssignedNote.caseForBadMessage(
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
            TooManyAssignedNote.caseForBadMessage(
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
            TooManyAssignedNote.caseForBadMessage(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(true);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssignedNote.caseForBadMessage(
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
            TooManyAssignedNote.caseForBadMessage(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(false);
        });
      });
    });
  });

  describe("'merge' state", (state = "merge") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssignedNote.caseForBadMessage(
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
            TooManyAssignedNote.caseForBadMessage(
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
            TooManyAssignedNote.caseForBadMessage(
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
            TooManyAssignedNote.caseForBadMessage(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssignedNote.caseForBadMessage(
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
            TooManyAssignedNote.caseForBadMessage(
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

describe("TooManyAssignedNote.caseForNoActions(state, goodGitPractice, assigneeId)", () => {
  describe("'open' state", (state = "open") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            TooManyAssignedNote.caseForNoActions(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(true);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            TooManyAssignedNote.caseForNoActions(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(true);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            TooManyAssignedNote.caseForNoActions(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(true);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssignedNote.caseForNoActions(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            TooManyAssignedNote.caseForNoActions(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(true);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssignedNote.caseForNoActions(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(false);
        });
      });
    });
  });

  describe("'update' state", (state = "update") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            TooManyAssignedNote.caseForNoActions(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(true);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            TooManyAssignedNote.caseForNoActions(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(true);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            TooManyAssignedNote.caseForNoActions(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(true);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssignedNote.caseForNoActions(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            TooManyAssignedNote.caseForNoActions(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(true);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            TooManyAssignedNote.caseForNoActions(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(false);
        });
      });
    });
  });

  describe("'merge' state", (state = "merge") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            TooManyAssignedNote.caseForNoActions(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(true);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            TooManyAssignedNote.caseForNoActions(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(true);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            TooManyAssignedNote.caseForNoActions(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(true);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            TooManyAssignedNote.caseForNoActions(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(true);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("assigneeId === null", (assigneeId = null) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            TooManyAssignedNote.caseForNoActions(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(true);
        });
      });

      describe("assigneeId !== null", (assigneeId = 1) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            TooManyAssignedNote.caseForNoActions(
              state,
              goodGitPractice,
              assigneeId,
            ),
          ).toBe(true);
        });
      });
    });
  });
});

describe("TooManyAssignedNote.buildMessage(gitLabRequestSuccess, state, goodGitPractice, assigneeId, logger)", () => {
  describe("gitLabRequestSuccess === true", (gitLabRequestSuccess = true) => {
    describe("'open' state", (state = "open") => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        describe("assigneeId === null", (assigneeId = null) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });

        describe("assigneeId !== null", (assigneeId = 1) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        describe("assigneeId === null", (assigneeId = null) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });

        describe("assigneeId !== null", (assigneeId = 1) => {
          test("RETURNS STRING: bad + hashtag", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.bad} ${TooManyAssignedNote.hashtag}`);
          });
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        describe("assigneeId === null", (assigneeId = null) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });

        describe("assigneeId !== null", (assigneeId = 1) => {
          test("RETURNS STRING: unknownState", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.unknownState}`);
          });
        });
      });
    });

    describe("'update' state", (state = "update") => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        describe("assigneeId === null", (assigneeId = null) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });

        describe("assigneeId !== null", (assigneeId = 1) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        describe("assigneeId === null", (assigneeId = null) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });

        describe("assigneeId !== null", (assigneeId = 1) => {
          test("RETURNS STRING: bad + hashtag", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.bad} ${TooManyAssignedNote.hashtag}`);
          });
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        describe("assigneeId === null", (assigneeId = null) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });

        describe("assigneeId !== null", (assigneeId = 1) => {
          test("RETURNS STRING: unknownState", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.unknownState}`);
          });
        });
      });
    });

    describe("'merge' state", (state = "merge") => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        describe("assigneeId === null", (assigneeId = null) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });

        describe("assigneeId !== null", (assigneeId = 1) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        describe("assigneeId === null", (assigneeId = null) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });

        describe("assigneeId !== null", (assigneeId = 1) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        describe("assigneeId === null", (assigneeId = null) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });

        describe("assigneeId !== null", (assigneeId = 1) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });
      });
    });
  });

  describe("gitLabRequestSuccess === false", (gitLabRequestSuccess = false) => {
    describe("'open' state", (state = "open") => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        describe("assigneeId === null", (assigneeId = null) => {
          test("RETURNS STRING: noActions", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });

        describe("assigneeId !== null", (assigneeId = 1) => {
          test("RETURNS STRING: checkPermissions", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.checkPermissionsMessage}`);
          });
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        describe("assigneeId === null", (assigneeId = null) => {
          test("RETURNS STRING: noActions", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });

        describe("assigneeId !== null", (assigneeId = 1) => {
          test("RETURNS STRING: checkPermissions", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.checkPermissionsMessage}`);
          });
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        describe("assigneeId === null", (assigneeId = null) => {
          test("RETURNS STRING: noActions", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });

        describe("assigneeId !== null", (assigneeId = 1) => {
          test("RETURNS STRING: checkPermissions", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.checkPermissionsMessage}`);
          });
        });
      });
    });

    describe("'update' state", (state = "update") => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        describe("assigneeId === null", (assigneeId = null) => {
          test("RETURNS STRING: noActions", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });

        describe("assigneeId !== null", (assigneeId = 1) => {
          test("RETURNS STRING: checkPermissions", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.checkPermissionsMessage}`);
          });
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        describe("assigneeId === null", (assigneeId = null) => {
          test("RETURNS STRING: noActions", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });

        describe("assigneeId !== null", (assigneeId = 1) => {
          test("RETURNS STRING: checkPermissions", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.checkPermissionsMessage}`);
          });
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        describe("assigneeId === null", (assigneeId = null) => {
          test("RETURNS STRING: noActions", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });

        describe("assigneeId !== null", (assigneeId = 1) => {
          test("RETURNS STRING: checkPermissions", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.checkPermissionsMessage}`);
          });
        });
      });
    });

    describe("'merge' state", (state = "merge") => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        describe("assigneeId === null", (assigneeId = null) => {
          test("RETURNS STRING: noActions", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });

        describe("assigneeId !== null", (assigneeId = 1) => {
          test("RETURNS STRING: noActions", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        describe("assigneeId === null", (assigneeId = null) => {
          test("RETURNS STRING: noActions", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });

        describe("assigneeId !== null", (assigneeId = 1) => {
          test("RETURNS STRING: noActions", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        describe("assigneeId === null", (assigneeId = null) => {
          test("RETURNS STRING: noActions", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });

        describe("assigneeId !== null", (assigneeId = 1) => {
          test("RETURNS STRING: noActions", () => {
            expect(
              TooManyAssignedNote.buildMessage(
                gitLabRequestSuccess,
                state,
                goodGitPractice,
                assigneeId,
                winlog,
              ),
            ).toBe(`${TooManyAssignedNote.noActionMessage}`);
          });
        });
      });
    });
  });
});
