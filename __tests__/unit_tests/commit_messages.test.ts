import {
  CommitMessages,
  SuccessfulBotActionWithMessage,
  SuccessfulBotActionWithNothingToSay,
} from "../../src/bot_actions";

function XsOfLength(num: number): string {
  let str = "";
  for (let i = 0; i < num; i++) {
    str += "X";
  }
  return str;
}

describe("CommitMessages.lengthValid(message)", () => {
  test("returns false when string length is less than 4 characters", () => {
    expect(CommitMessages["lengthValid"]("a aa")).toBe(false);
  });
  test("returns true when string length equals 4 characters", () => {
    expect(CommitMessages["lengthValid"]("a123")).toBe(true);
  });
  describe("when string length is greater than 4 and less than 50 characters", () => {
    test("returns true for 5 characters", () => {
      expect(CommitMessages["lengthValid"]("a1234")).toBe(true);
    });
    test("returns true for 49 characters", () => {
      expect(CommitMessages["lengthValid"](XsOfLength(49))).toBe(true);
    });
  });

  test("returns true when string length is equal to 50 characters", () => {
    expect(CommitMessages["lengthValid"](XsOfLength(50))).toBe(true);
  });

  test("returns false when string length is greater than 50 characters", () => {
    expect(CommitMessages["lengthValid"](XsOfLength(51))).toBe(false);
  });
});

describe("CommitMessages.testThreshold(grammarParam, threshold)", () => {
  test("should return true if number of false values in array is less than threshold", () => {
    expect(CommitMessages["testThreshold"]([true, true, false], 2)).toBe(true);
  });
  test("should return true if number of false values in array equals threshold", () => {
    expect(CommitMessages["testThreshold"]([true, true, false], 1)).toBe(true);
  });
  test("should return false if number of false values in array exceeds threshold", () => {
    expect(CommitMessages["testThreshold"]([true, false, false], 1)).toBe(
      false,
    );
  });
});

describe("CommitMessages.calculateThreshold(totalCommits)", () => {
  describe("totalCommits === 5", (totalCommits = 5) => {
    test("RETURNS NUMBER: 2", () => {
      expect(CommitMessages["calculateThreshold"](totalCommits)).toBe(2);
    });
  });

  describe("totalCommits === 10", (totalCommits = 10) => {
    test("RETURNS NUMBER: 2", () => {
      expect(CommitMessages["calculateThreshold"](totalCommits)).toBe(2);
    });
  });

  describe("totalCommits === 15", (totalCommits = 15) => {
    test("RETURNS NUMBER: 3", () => {
      expect(CommitMessages["calculateThreshold"](totalCommits)).toBe(3);
    });
  });

  describe("totalCommits === 20", (totalCommits = 20) => {
    test("RETURNS NUMBER: 4", () => {
      expect(CommitMessages["calculateThreshold"](totalCommits)).toBe(4);
    });
  });
});

describe("CommitMessages.isOneWord(title)", () => {
  test("default case", () => {
    expect(CommitMessages["isOneWord"]("one")).toBe(true);
    expect(CommitMessages["isOneWord"]("hello ")).toBe(true);
    expect(CommitMessages["isOneWord"]("one two")).toBe(false);
    expect(CommitMessages["isOneWord"]("1 two 3")).toBe(false);
  });
  test("non-standard spacing/punctuation", () => {
    expect(CommitMessages["isOneWord"]("  one  ")).toBe(true);
    expect(CommitMessages["isOneWord"]("one-two")).toBe(true);
    expect(CommitMessages["isOneWord"](" one-      2")).toBe(false);

    expect(CommitMessages["isOneWord"]("::")).toBe(true);
    expect(CommitMessages["isOneWord"](": :")).toBe(false);
    expect(CommitMessages["isOneWord"](": : a")).toBe(false);
    expect(CommitMessages["isOneWord"](": : ")).toBe(false);
    expect(CommitMessages["isOneWord"]("a: : ")).toBe(false);
    expect(CommitMessages["isOneWord"]("a(): : ")).toBe(false);
  });
});

describe("CommitMessages.caseForBadMessage(goodGitPractice)", () => {
  describe("goodGitPractice === true", (goodGitPractice = true) => {
    test("RETURNS BOOLEAN: false", () => {
      expect(CommitMessages.caseForBadMessage(goodGitPractice)).toBe(false);
    });
  });

  describe("goodGitPractice === false", (goodGitPractice = false) => {
    test("RETURNS BOOLEAN: true", () => {
      expect(CommitMessages.caseForBadMessage(goodGitPractice)).toBe(true);
    });
  });
});

describe("CommitMessages.caseForGoodMessage(state, goodGitPractice", () => {
  describe("state === 'open'", (state = "open") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      test("RETURNS BOOLEAN: true", () => {
        expect(CommitMessages.caseForGoodMessage(state, goodGitPractice)).toBe(
          true,
        );
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(CommitMessages.caseForGoodMessage(state, goodGitPractice)).toBe(
          false,
        );
      });
    });
  });

  describe("state === 'update'", (state = "update") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      test("RETURNS BOOLEAN: true", () => {
        expect(CommitMessages.caseForGoodMessage(state, goodGitPractice)).toBe(
          true,
        );
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(CommitMessages.caseForGoodMessage(state, goodGitPractice)).toBe(
          false,
        );
      });
    });
  });

  describe("state === 'merge", (state = "merge") => {
    describe("goodGitPractice === true", (goodGitPractice = true) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(CommitMessages.caseForGoodMessage(state, goodGitPractice)).toBe(
          false,
        );
      });
    });

    describe("goodGitPractice === false", (goodGitPractice = false) => {
      test("RETURNS BOOLEAN: false", () => {
        expect(CommitMessages.caseForGoodMessage(state, goodGitPractice)).toBe(
          false,
        );
      });
    });
  });
});

describe("CommitMessages.buildSuccessfulAction(state, goodGitPractice)", () => {
  describe("state === 'open'", (state = "open") => {
    describe("goodGitPractice === 'true'", (goodGitPractice = true) => {
      test("RETURNS INSTANCE: SuccessfulBotActionWithMessage w/goodNote", () => {
        const action = CommitMessages.buildSuccessfulAction(
          state,
          goodGitPractice,
        );
        expect(action).toBeInstanceOf(SuccessfulBotActionWithMessage);
        expect((<SuccessfulBotActionWithMessage>action).mrNote).toBe(
          `${CommitMessages.goodNote} ${CommitMessages.hashtag}`,
        );
      });
    });

    describe("goodGitPractice === 'false'", (goodGitPractice = false) => {
      test("RETURNS INSTANCE: SuccessfulBotActionWithMessage w/badNote", () => {
        const action = CommitMessages.buildSuccessfulAction(
          state,
          goodGitPractice,
        );
        expect(action).toBeInstanceOf(SuccessfulBotActionWithMessage);
        expect((<SuccessfulBotActionWithMessage>action).mrNote).toBe(
          `${CommitMessages.badNote} ${CommitMessages.hashtag}`,
        );
      });
    });
  });

  describe("state === 'update'", (state = "update") => {
    describe("goodGitPractice === 'true'", (goodGitPractice = true) => {
      test("RETURNS INSTANCE: SuccessfulBotActionWithMessage w/goodNote", () => {
        const action = CommitMessages.buildSuccessfulAction(
          state,
          goodGitPractice,
        );
        expect(action).toBeInstanceOf(SuccessfulBotActionWithMessage);
        expect((<SuccessfulBotActionWithMessage>action).mrNote).toBe(
          `${CommitMessages.goodNote} ${CommitMessages.hashtag}`,
        );
      });
    });

    describe("goodGitPractice === 'false'", (goodGitPractice = false) => {
      test("RETURNS INSTANCE: SuccessfulBotActionWithMessage w/badNote", () => {
        const action = CommitMessages.buildSuccessfulAction(
          state,
          goodGitPractice,
        );
        expect(action).toBeInstanceOf(SuccessfulBotActionWithMessage);
        expect((<SuccessfulBotActionWithMessage>action).mrNote).toBe(
          `${CommitMessages.badNote} ${CommitMessages.hashtag}`,
        );
      });
    });
  });

  describe("state === 'merge'", (state = "merge") => {
    describe("goodGitPractice === 'true'", (goodGitPractice = true) => {
      test("RETURNS INSTANCE: SuccessfulBotActionWithNothingToSay", () => {
        expect(
          CommitMessages.buildSuccessfulAction(state, goodGitPractice),
        ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
      });
    });

    describe("goodGitPractice === 'false'", (goodGitPractice = false) => {
      test("RETURNS INSTANCE: SuccessfulBotActionWithMessage w/badNote", () => {
        const action = CommitMessages.buildSuccessfulAction(
          state,
          goodGitPractice,
        );
        expect(action).toBeInstanceOf(SuccessfulBotActionWithMessage);
        expect((<SuccessfulBotActionWithMessage>action).mrNote).toBe(
          `${CommitMessages.badNote} ${CommitMessages.hashtag}`,
        );
      });
    });
  });
});
