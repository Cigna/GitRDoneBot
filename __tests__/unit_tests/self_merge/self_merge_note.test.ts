import { winlog } from "../../../src/util";
import { SelfMergeNote } from "../../../src/bot_actions/self_merge/self_merge_note";
import { FailedResponse, SuccessfulGetResponse } from "../../../src/gitlab";

const successfulResponse = new SuccessfulGetResponse(200, {});
const failedResponse = new FailedResponse(401);

describe("SelfMergeNote.caseForGoodMessage(state, goodGitPractice)", () => {
  describe("'open' state", (state = "open") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      test("RETURNS BOOLEAN: true", () => {
        expect(SelfMergeNote.caseForGoodMessage(state, goodGitPractice)).toBe(
          true,
        );
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(SelfMergeNote.caseForGoodMessage(state, goodGitPractice)).toBe(
          false,
        );
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(SelfMergeNote.caseForGoodMessage(state, goodGitPractice)).toBe(
          false,
        );
      });
    });
  });

  describe("'update' state", (state = "update") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      test("RETURNS BOOLEAN: true", () => {
        expect(SelfMergeNote.caseForGoodMessage(state, goodGitPractice)).toBe(
          true,
        );
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(SelfMergeNote.caseForGoodMessage(state, goodGitPractice)).toBe(
          false,
        );
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(SelfMergeNote.caseForGoodMessage(state, goodGitPractice)).toBe(
          false,
        );
      });
    });
  });

  describe("'merge' state", (state = "merge") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(SelfMergeNote.caseForGoodMessage(state, goodGitPractice)).toBe(
          false,
        );
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(SelfMergeNote.caseForGoodMessage(state, goodGitPractice)).toBe(
          false,
        );
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(SelfMergeNote.caseForGoodMessage(state, goodGitPractice)).toBe(
          false,
        );
      });
    });
  });
});

describe("SelfMergeNote.caseForBadSelfApprovedMessage(state, goodGitPractice, approversNeeded)", () => {
  describe("'open' state", (state = "open") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });
  });

  describe("'update' state", (state = "update") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });
  });

  describe("'merge' state", (state = "merge") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(true);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });
  });
});

describe("SelfMergeNote.caseForBadSelfAssignedMessage(state, goodGitPractice)", () => {
  describe("'open' state", (state = "open") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(
          SelfMergeNote.caseForBadSelfAssignedMessage(state, goodGitPractice),
        ).toBe(false);
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      test("RETURNS BOOLEAN: true", () => {
        expect(
          SelfMergeNote.caseForBadSelfAssignedMessage(state, goodGitPractice),
        ).toBe(true);
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(
          SelfMergeNote.caseForBadSelfAssignedMessage(state, goodGitPractice),
        ).toBe(false);
      });
    });
  });

  describe("'update' state", (state = "update") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(
          SelfMergeNote.caseForBadSelfAssignedMessage(state, goodGitPractice),
        ).toBe(false);
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      test("RETURNS BOOLEAN: true", () => {
        expect(
          SelfMergeNote.caseForBadSelfAssignedMessage(state, goodGitPractice),
        ).toBe(true);
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(
          SelfMergeNote.caseForBadSelfAssignedMessage(state, goodGitPractice),
        ).toBe(false);
      });
    });
  });

  describe("'merge' state", (state = "merge") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(
          SelfMergeNote.caseForBadSelfAssignedMessage(state, goodGitPractice),
        ).toBe(false);
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(
          SelfMergeNote.caseForBadSelfAssignedMessage(state, goodGitPractice),
        ).toBe(false);
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(
          SelfMergeNote.caseForBadSelfAssignedMessage(state, goodGitPractice),
        ).toBe(false);
      });
    });
  });
});

describe("SelfMergeNote.caseForBadSelfMergedMessage(state, goodGitPractice, approversNeeded)", () => {
  describe("'open' state", (state = "open") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });
  });

  describe("'update' state", (state = "update") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });
  });

  describe("'merge' state", (state = "merge") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(true);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForBadSelfMergedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });
  });
});

describe("SelfMergeNote.caseForNoApprovalsMessage(state, goodGitPractice, approversNeeded)", () => {
  describe("'open' state", (state = "open") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });
  });

  describe("'update' state", (state = "update") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });
  });

  describe("'merge' state", (state = "merge") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(true);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoApprovalsMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });
  });
});

describe("SelfMergeNote.caseForNoActions(state, goodGitPractice, approversNeeded)", () => {
  describe("'open' state", (state = "open") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });
  });

  describe("'update' state", (state = "update") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });
  });

  describe("'merge' state", (state = "merge") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: true", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(true);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });

    describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
      describe("approversNeeded === undefined", (approversNeeded = undefined) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMergeNote.caseForNoActions(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(false);
        });
      });
    });
  });
});

describe("SelfMergeNote.fromMessage(message)", () => {
  describe("any message string", (message = "Helpful reminder from your friendly neighborhood GitRDoneBot.") => {
    test("RETURNS CLASS INSTANCE: SelfMergeNote", () => {
      const note = SelfMergeNote.fromMessage(message);
      expect(note).toBeInstanceOf(SelfMergeNote);
    });
  });
});

describe("SelfMergeNote.buildMessage(apiResponse, state, goodGitPractice, approversNeeded, logger)", () => {
  describe("apiResponse !== FailedResponse", (apiResponse = successfulResponse) => {
    describe("'open' state", (state = "open") => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        describe("approversNeeded === true", (approversNeeded = true) => {
          test("RETURNS STRING: good + hashtag", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.good} ${SelfMergeNote.hashtag}`);
          });
        });
        describe("approversNeeded === false", (approversNeeded = false) => {
          test("RETURNS STRING: good + hashtag", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.good} ${SelfMergeNote.hashtag}`);
          });
        });
        describe("approversNeeded === undefined", (approversNeeded = undefined) => {
          test("RETURNS STRING: good + hashtag", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.good} ${SelfMergeNote.hashtag}`);
          });
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        describe("approversNeeded === true", (approversNeeded = true) => {
          test("RETURNS STRING: badAssigned + hashtag", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.badAssigned} ${SelfMergeNote.hashtag}`);
          });
        });
        describe("approversNeeded === false", (approversNeeded = false) => {
          test("RETURNS STRING: badAssigned + hashtag", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.badAssigned} ${SelfMergeNote.hashtag}`);
          });
        });
        describe("approversNeeded === undefined", (approversNeeded = undefined) => {
          test("RETURNS STRING: badAssigned + hashtag", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.badAssigned} ${SelfMergeNote.hashtag}`);
          });
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        describe("approversNeeded === true", (approversNeeded = true) => {
          test("RETURNS STRING: unknownState", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.unknownState}`);
          });
        });
        describe("approversNeeded === false", (approversNeeded = false) => {
          test("RETURNS STRING: unknownState", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.unknownState}`);
          });
        });
        describe("approversNeeded === undefined", (approversNeeded = undefined) => {
          test("RETURNS STRING: unknownState", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.unknownState}`);
          });
        });
      });
    });

    describe("'update' state", (state = "update") => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        describe("approversNeeded === true", (approversNeeded = true) => {
          test("RETURNS STRING: good + hashtag", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.good} ${SelfMergeNote.hashtag}`);
          });
        });
        describe("approversNeeded === false", (approversNeeded = false) => {
          test("RETURNS STRING: good + hashtag", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.good} ${SelfMergeNote.hashtag}`);
          });
        });
        describe("approversNeeded === undefined", (approversNeeded = undefined) => {
          test("RETURNS STRING: good + hashtag", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.good} ${SelfMergeNote.hashtag}`);
          });
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        describe("approversNeeded === true", (approversNeeded = true) => {
          test("RETURNS STRING: badAssigned + hashtag", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.badAssigned} ${SelfMergeNote.hashtag}`);
          });
        });
        describe("approversNeeded === false", (approversNeeded = false) => {
          test("RETURNS STRING: badAssigned + hashtag", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.badAssigned} ${SelfMergeNote.hashtag}`);
          });
        });
        describe("approversNeeded === undefined", (approversNeeded = undefined) => {
          test("RETURNS STRING: badAssigned + hashtag", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.badAssigned} ${SelfMergeNote.hashtag}`);
          });
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        describe("approversNeeded === true", (approversNeeded = true) => {
          test("RETURNS STRING: unknownState", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.unknownState}`);
          });
        });
        describe("approversNeeded === false", (approversNeeded = false) => {
          test("RETURNS STRING: unknownState", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.unknownState}`);
          });
        });
        describe("approversNeeded === undefined", (approversNeeded = undefined) => {
          test("RETURNS STRING: unknownState", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.unknownState}`);
          });
        });
      });
    });

    describe("'merge' state", (state = "merge") => {
      describe("goodGitPractice === true", (goodGitPractice = true) => {
        describe("approversNeeded === true", (approversNeeded = true) => {
          test("RETURNS STRING: noApprovals + hashtag", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.noApprovals} ${SelfMergeNote.hashtag}`);
          });
        });
        describe("approversNeeded === false", (approversNeeded = false) => {
          test("RETURNS STRING: noAction", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.noActionMessage}`);
          });
        });
        describe("approversNeeded === undefined", (approversNeeded = undefined) => {
          test("RETURNS STRING: unknownState", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.unknownState}`);
          });
        });
      });

      describe("goodGitPractice === false", (goodGitPractice = false) => {
        describe("approversNeeded === true", (approversNeeded = true) => {
          test("RETURNS STRING: badMerged + hashtag", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.badMerged} ${SelfMergeNote.hashtag}`);
          });
        });
        describe("approversNeeded === false", (approversNeeded = false) => {
          test("RETURNS STRING: badApproved + hashtag", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.badApproved} ${SelfMergeNote.hashtag}`);
          });
        });
        describe("approversNeeded === undefined", (approversNeeded = undefined) => {
          test("RETURNS STRING: unknownState", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.unknownState}`);
          });
        });
      });

      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        describe("approversNeeded === true", (approversNeeded = true) => {
          test("RETURNS STRING: unknownState", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.unknownState}`);
          });
        });
        describe("approversNeeded === false", (approversNeeded = false) => {
          test("RETURNS STRING: unknownState", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.unknownState}`);
          });
        });
        describe("approversNeeded === undefined", (approversNeeded = undefined) => {
          test("RETURNS STRING: unknownState", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(`${SelfMergeNote.unknownState}`);
          });
        });
      });
    });
  });

  // if apiResponse === false, all other params are ignored
  describe("apiResponse === false", (apiResponse = failedResponse) => {
    describe("state === undefined", (state = undefined) => {
      describe("goodGitPractice === undefined", (goodGitPractice = undefined) => {
        describe("approversNeeded === undefined", (approversNeeded = undefined) => {
          test("RETURNS STRING: checkPermissions", () => {
            expect(
              SelfMergeNote.buildMessage(
                apiResponse,
                state,
                goodGitPractice,
                approversNeeded,
                winlog,
              ),
            ).toBe(SelfMergeNote.checkPermissionsMessage);
          });
        });
      });
    });
  });
});
