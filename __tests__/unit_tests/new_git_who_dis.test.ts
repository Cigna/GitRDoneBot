import {
  BotActionResponse,
  NewGitWhoDis,
  SuccessfulBotAction,
  SuccessfulBotActionWithNothingToSay,
} from "../../src/bot_actions";

describe("NewGitWhoDis.analyze (Any state) authorName !== LAN ID", () => {
  const authorName: string = "Eleanor Shellstrop";
  let botActionResponse: BotActionResponse;
  beforeEach(async () => {
    botActionResponse = await NewGitWhoDis.analyze(authorName);
  });
  test("Should return instance of SuccessfulBotActionWithNothingToSay", () => {
    expect(botActionResponse.action).toBeInstanceOf(
      SuccessfulBotActionWithNothingToSay,
    );
  });
  test("Should return goodGitPractice === true", () => {
    expect(
      (<SuccessfulBotActionWithNothingToSay>botActionResponse.action)
        .goodGitPractice,
    ).toBe(true);
  });
});

describe("NewGitWhoDis.analyze: (Any state) authorName === LAN ID", () => {
  const authorName: string = "A01234";
  let botActionResponse: BotActionResponse;
  beforeEach(async () => {
    botActionResponse = await NewGitWhoDis.analyze(authorName);
  });
  test("Should return instance of SuccessfulBotAction", () => {
    expect(botActionResponse.action).toBeInstanceOf(SuccessfulBotAction);
  });

  test("Should return goodGitPractice === false", () => {
    expect(
      (<SuccessfulBotAction>botActionResponse.action).goodGitPractice,
    ).toBe(false);
  });
});

describe("NewGitWhoDis.authorNameIsNotLanId function", () => {
  test("Should return true when authorName is not LAN ID", () => {
    expect(NewGitWhoDis["authorNameIsNotLanId"]("Test Author")).toEqual(true);
  });
  test("Should return true when authorName is not LAN ID & contains special chars", () => {
    expect(NewGitWhoDis["authorNameIsNotLanId"]("Martin 42!")).toEqual(true);
  });
  test("Should return true when authorName is blank", () => {
    expect(NewGitWhoDis["authorNameIsNotLanId"](" ")).toEqual(true);
  });
  test("Should return false when authorName is LAN ID", () => {
    expect(NewGitWhoDis["authorNameIsNotLanId"]("a12345")).toEqual(false);
  });
  test("Should return false when authorName is LAN ID", () => {
    expect(NewGitWhoDis["authorNameIsNotLanId"]("A12345")).toEqual(false);
  });
});

describe("NewGitWhoDis.buildSuccessfulAction(goodGitPractice)", (authorName = "A12345") => {
  describe("goodGitPractice === true", (goodGitPractice = true) => {
    test("RETURNS INSTANCE: SuccessfulBotActionWithNothingToSay", () => {
      expect(
        NewGitWhoDis.buildSuccessfulAction(authorName, goodGitPractice),
      ).toBeInstanceOf(SuccessfulBotActionWithNothingToSay);
    });
  });

  describe("goodGitPractice === false", (goodGitPractice = false) => {
    test("RETURNS INSTANCE: SuccessfulBotAction w/badNote", () => {
      const action = NewGitWhoDis.buildSuccessfulAction(
        authorName,
        goodGitPractice,
      );
      expect(action).toBeInstanceOf(SuccessfulBotAction);
      expect((<SuccessfulBotAction>action).mrNote).toBe(
        `${NewGitWhoDis.badIcon} Hi @${authorName}, ${NewGitWhoDis.badNote} ${NewGitWhoDis.hashtag}`,
      );
    });
  });
});
