import { BotEmoji } from "../../../src/merge_request";

describe("compose function", () => {
  test("Returns good emoji when all Bot Action goodGitPractice values are true", () => {
    const emojiResponse = BotEmoji.compose([true, true, true, true]);
    expect(emojiResponse).toBe(BotEmoji.good);
  });

  test("Returns good emoji when at least one Bot Action goodGitPractice value is undefined and none are false", () => {
    const emojiResponse = BotEmoji.compose([true, undefined, true, undefined]);
    expect(emojiResponse).toBe(BotEmoji.good);
  });

  test("Returns bad emoji when at least one Bot Action goodGitPractice value is false", () => {
    const emojiResponse = BotEmoji.compose([true, false, true, true]);
    expect(emojiResponse).toBe(BotEmoji.bad);
  });

  test("Returns bad emoji when at least one Bot Action goodGitPractice value is undefined and at least one is false", () => {
    const emojiResponse = BotEmoji.compose([false, undefined, true, undefined]);
    expect(emojiResponse).toBe(BotEmoji.bad);
  });

  test("Returns 'noAction' when all Bot Action goodGitPractice values are undefined", () => {
    const emojiResponse = BotEmoji.compose([
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
    expect(emojiResponse).toBe(BotEmoji.noAction);
  });
});
