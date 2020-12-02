import { mockUser } from "../helpers";
import {
  SelfMerge,
  SuccessfulBotAction,
  SuccessfulBotActionWithNothingToSay,
} from "../../src/bot_actions";

const AUTHOR_ID = 1;
const ASSIGNEE_ID = 2;

const approved_by_author = [{ user: mockUser(AUTHOR_ID) }];
const approved_by_assignee = [{ user: mockUser(ASSIGNEE_ID) }];
const approved_by_multiple_approvers = [
  { user: mockUser(ASSIGNEE_ID) },
  { user: mockUser(AUTHOR_ID) },
];

describe("SelfMerge.mrIsNotSelfAssignedOrMerged(assigneeOrMergerId, authorId)", () => {
  test("Should return true when MR is not self-assigned or self-merged", () => {
    expect(
      SelfMerge["mrIsNotSelfAssignedOrMerged"](ASSIGNEE_ID, AUTHOR_ID),
    ).toEqual(true);
  });
  test("Should return true when assigneeId or mergedBy is null", () => {
    expect(SelfMerge["mrIsNotSelfAssignedOrMerged"](null, AUTHOR_ID)).toEqual(
      true,
    );
  });
  test("Should return false when MR is self-assigned or self-merged", () => {
    expect(
      SelfMerge["mrIsNotSelfAssignedOrMerged"](AUTHOR_ID, AUTHOR_ID),
    ).toEqual(false);
  });
});

describe("SelfMerge.mrIsNotSelfApproved(approvedByArray, authorId)", () => {
  test("Should return true when MR is not self-approved", () => {
    expect(
      SelfMerge["mrIsNotSelfApproved"](approved_by_assignee, AUTHOR_ID),
    ).toEqual(true);
  });
  test("Should return true when there are more than 1 approvers and MR author is one of them", () => {
    expect(
      SelfMerge["mrIsNotSelfApproved"](
        approved_by_multiple_approvers,
        AUTHOR_ID,
      ),
    ).toEqual(true);
  });
  test("Should return false when MR has only one approver and it is MR author", () => {
    expect(
      SelfMerge["mrIsNotSelfApproved"](approved_by_author, AUTHOR_ID),
    ).toEqual(false);
  });
});

describe("SelfMerge.caseForGoodMessage(state, goodGitPractice)", () => {
  describe("'open' state", (state = "open") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      test("RETURNS BOOLEAN: true", () => {
        expect(SelfMerge.caseForGoodMessage(state, goodGitPractice)).toBe(true);
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(SelfMerge.caseForGoodMessage(state, goodGitPractice)).toBe(
          false,
        );
      });
    });
  });

  describe("'update' state", (state = "update") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      test("RETURNS BOOLEAN: true", () => {
        expect(SelfMerge.caseForGoodMessage(state, goodGitPractice)).toBe(true);
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(SelfMerge.caseForGoodMessage(state, goodGitPractice)).toBe(
          false,
        );
      });
    });
  });

  describe("'merge' state", (state = "merge") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(SelfMerge.caseForGoodMessage(state, goodGitPractice)).toBe(
          false,
        );
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(SelfMerge.caseForGoodMessage(state, goodGitPractice)).toBe(
          false,
        );
      });
    });
  });
});

describe("SelfMerge.caseForBadSelfApprovedMessage(state, goodGitPractice, approversNeeded)", () => {
  describe("'open' state", (state = "open") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMerge.caseForBadSelfApprovedMessage(
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
            SelfMerge.caseForBadSelfApprovedMessage(
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
            SelfMerge.caseForBadSelfApprovedMessage(
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
            SelfMerge.caseForBadSelfApprovedMessage(
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
            SelfMerge.caseForBadSelfApprovedMessage(
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
            SelfMerge.caseForBadSelfApprovedMessage(
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
            SelfMerge.caseForBadSelfApprovedMessage(
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
            SelfMerge.caseForBadSelfApprovedMessage(
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
            SelfMerge.caseForBadSelfApprovedMessage(
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
            SelfMerge.caseForBadSelfApprovedMessage(
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
            SelfMerge.caseForBadSelfApprovedMessage(
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
            SelfMerge.caseForBadSelfApprovedMessage(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBe(true);
        });
      });
    });
  });
});

describe("SelfMerge.caseForBadSelfAssignedMessage(state, goodGitPractice)", () => {
  describe("'open' state", (state = "open") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(
          SelfMerge.caseForBadSelfAssignedMessage(state, goodGitPractice),
        ).toBe(false);
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      test("RETURNS BOOLEAN: true", () => {
        expect(
          SelfMerge.caseForBadSelfAssignedMessage(state, goodGitPractice),
        ).toBe(true);
      });
    });
  });

  describe("'update' state", (state = "update") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(
          SelfMerge.caseForBadSelfAssignedMessage(state, goodGitPractice),
        ).toBe(false);
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      test("RETURNS BOOLEAN: true", () => {
        expect(
          SelfMerge.caseForBadSelfAssignedMessage(state, goodGitPractice),
        ).toBe(true);
      });
    });
  });

  describe("'merge' state", (state = "merge") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(
          SelfMerge.caseForBadSelfAssignedMessage(state, goodGitPractice),
        ).toBe(false);
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(
          SelfMerge.caseForBadSelfAssignedMessage(state, goodGitPractice),
        ).toBe(false);
      });
    });
  });
});

describe("SelfMerge.caseForBadSelfMergedMessage(state, goodGitPractice, approversNeeded)", () => {
  describe("'open' state", (state = "open") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMerge.caseForBadSelfMergedMessage(
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
            SelfMerge.caseForBadSelfMergedMessage(
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
            SelfMerge.caseForBadSelfMergedMessage(
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
            SelfMerge.caseForBadSelfMergedMessage(
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
            SelfMerge.caseForBadSelfMergedMessage(
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
            SelfMerge.caseForBadSelfMergedMessage(
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
            SelfMerge.caseForBadSelfMergedMessage(
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
            SelfMerge.caseForBadSelfMergedMessage(
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
            SelfMerge.caseForBadSelfMergedMessage(
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
            SelfMerge.caseForBadSelfMergedMessage(
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
            SelfMerge.caseForBadSelfMergedMessage(
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
            SelfMerge.caseForBadSelfMergedMessage(
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

describe("SelfMerge.caseForNoApprovalsMessage(state, goodGitPractice, approversNeeded)", () => {
  describe("'open' state", (state = "open") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS BOOLEAN: false", () => {
          expect(
            SelfMerge.caseForNoApprovalsMessage(
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
            SelfMerge.caseForNoApprovalsMessage(
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
            SelfMerge.caseForNoApprovalsMessage(
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
            SelfMerge.caseForNoApprovalsMessage(
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
            SelfMerge.caseForNoApprovalsMessage(
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
            SelfMerge.caseForNoApprovalsMessage(
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
            SelfMerge.caseForNoApprovalsMessage(
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
            SelfMerge.caseForNoApprovalsMessage(
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
            SelfMerge.caseForNoApprovalsMessage(
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
            SelfMerge.caseForNoApprovalsMessage(
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
            SelfMerge.caseForNoApprovalsMessage(
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
            SelfMerge.caseForNoApprovalsMessage(
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

describe("SelfMerge.buildSuccessfulAction(state, goodGitPractice, approversNeeded)", () => {
  describe("'open' state", (state = "open") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS INSTANCE: SuccessfulBotAction w/goodNote", () => {
          const action = SelfMerge.buildSuccessfulAction(
            state,
            goodGitPractice,
            approversNeeded,
          );
          expect(action).toBeInstanceOf(SuccessfulBotAction);
          expect((<SuccessfulBotAction>action).mrNote).toBe(
            `${SelfMerge.goodNote} ${SelfMerge.hashtag}`,
          );
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS INSTANCE: SuccessfulBotAction w/goodNote", () => {
          const action = SelfMerge.buildSuccessfulAction(
            state,
            goodGitPractice,
            approversNeeded,
          );
          expect(action).toBeInstanceOf(SuccessfulBotAction);
          expect((<SuccessfulBotAction>action).mrNote).toBe(
            `${SelfMerge.goodNote} ${SelfMerge.hashtag}`,
          );
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS INSTANCE: SuccessfulBotAction w/badAssignedNote", () => {
          const action = SelfMerge.buildSuccessfulAction(
            state,
            goodGitPractice,
            approversNeeded,
          );
          expect(action).toBeInstanceOf(SuccessfulBotAction);
          expect((<SuccessfulBotAction>action).mrNote).toBe(
            `${SelfMerge.badAssignedNote} ${SelfMerge.hashtag}`,
          );
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS INSTANCE: SuccessfulBotAction w/badAssignedNote", () => {
          const action = SelfMerge.buildSuccessfulAction(
            state,
            goodGitPractice,
            approversNeeded,
          );
          expect(action).toBeInstanceOf(SuccessfulBotAction);
          expect((<SuccessfulBotAction>action).mrNote).toBe(
            `${SelfMerge.badAssignedNote} ${SelfMerge.hashtag}`,
          );
        });
      });
    });
  });

  describe("'update' state", (state = "update") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS INSTANCE: SuccessfulBotAction w/goodNote", () => {
          const action = SelfMerge.buildSuccessfulAction(
            state,
            goodGitPractice,
            approversNeeded,
          );
          expect(action).toBeInstanceOf(SuccessfulBotAction);
          expect((<SuccessfulBotAction>action).mrNote).toBe(
            `${SelfMerge.goodNote} ${SelfMerge.hashtag}`,
          );
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS INSTANCE: SuccessfulBotAction w/goodNote", () => {
          const action = SelfMerge.buildSuccessfulAction(
            state,
            goodGitPractice,
            approversNeeded,
          );
          expect(action).toBeInstanceOf(SuccessfulBotAction);
          expect((<SuccessfulBotAction>action).mrNote).toBe(
            `${SelfMerge.goodNote} ${SelfMerge.hashtag}`,
          );
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS INSTANCE: SuccessfulBotAction w/badAssignedNote", () => {
          const action = SelfMerge.buildSuccessfulAction(
            state,
            goodGitPractice,
            approversNeeded,
          );
          expect(action).toBeInstanceOf(SuccessfulBotAction);
          expect((<SuccessfulBotAction>action).mrNote).toBe(
            `${SelfMerge.badAssignedNote} ${SelfMerge.hashtag}`,
          );
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS INSTANCE: SuccessfulBotAction w/badAssignedNote", () => {
          const action = SelfMerge.buildSuccessfulAction(
            state,
            goodGitPractice,
            approversNeeded,
          );
          expect(action).toBeInstanceOf(SuccessfulBotAction);
          expect((<SuccessfulBotAction>action).mrNote).toBe(
            `${SelfMerge.badAssignedNote} ${SelfMerge.hashtag}`,
          );
        });
      });
    });
  });

  describe("'merge' state", (state = "merge") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS INSTANCE: SuccessfulBotAction w/noApprovalsNote", () => {
          const action = SelfMerge.buildSuccessfulAction(
            state,
            goodGitPractice,
            approversNeeded,
          );
          expect(action).toBeInstanceOf(SuccessfulBotAction);
          expect((<SuccessfulBotAction>action).mrNote).toBe(
            `${SelfMerge.noApprovalsNote} ${SelfMerge.hashtag}`,
          );
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS INSTANCE: SuccessfulBotActionWithNothingToSay", () => {
          expect(
            SelfMerge.buildSuccessfulAction(
              state,
              goodGitPractice,
              approversNeeded,
            ),
          ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
        });
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      describe("approversNeeded === true", (approversNeeded = true) => {
        test("RETURNS INSTANCE: SuccessfulBotAction w/badMergedNote", () => {
          const action = SelfMerge.buildSuccessfulAction(
            state,
            goodGitPractice,
            approversNeeded,
          );
          expect(action).toBeInstanceOf(SuccessfulBotAction);
          expect((<SuccessfulBotAction>action).mrNote).toBe(
            `${SelfMerge.badMergedNote} ${SelfMerge.hashtag}`,
          );
        });
      });
      describe("approversNeeded === false", (approversNeeded = false) => {
        test("RETURNS INSTANCE: SuccessfulBotAction w/badApprovedNote", () => {
          const action = SelfMerge.buildSuccessfulAction(
            state,
            goodGitPractice,
            approversNeeded,
          );
          expect(action).toBeInstanceOf(SuccessfulBotAction);
          expect((<SuccessfulBotAction>action).mrNote).toBe(
            `${SelfMerge.badApprovedNote} ${SelfMerge.hashtag}`,
          );
        });
      });
    });
  });
});
