import { NewGitWhoDis, BotActionNote } from "../../../src/bot_actions";
import {  } from "../../../src/util";
import { NewGitWhoDisNote } from "../../../src/bot_actions/new_git_who_dis/new_git_who_dis_note";

describe("New Git Who Dis Action: (Any state) authorName !== LAN ID", () => {
  const authorName: string = "Eleanor Shellstrop";
  let botActionResponse: NewGitWhoDis;
  beforeEach(async () => {
    botActionResponse = await NewGitWhoDis.from(, authorName);
  });

  test("Should return goodGitPractice === true", () => {
    expect(botActionResponse.goodGitPractice).toBe(true);
  });

  test("Should return mrNote === noAction", () => {
    expect(botActionResponse.mrNote).toBe(BotActionNote.noActionMessage);
  });
});

describe("New Git Who Dis Action: (Any state) authorName === LAN ID", () => {
  const authorName: string = "C01234";
  let botActionResponse: NewGitWhoDis;
  beforeEach(async () => {
    botActionResponse = await NewGitWhoDis.from(, authorName);
  });
  test("Should return goodGitPractice === false", () => {
    expect(botActionResponse.goodGitPractice).toBe(false);
  });

  test("Should return mrNote === bad", () => {
    expect(botActionResponse.mrNote).toBe(
      `${NewGitWhoDisNote.badIcon} Hi @${authorName}, ${NewGitWhoDisNote.bad} ${NewGitWhoDisNote.hashtag}`,
    );
  });
});

describe("authorNameIsNotLanId function", () => {
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
    expect(NewGitWhoDis["authorNameIsNotLanId"]("c12345")).toEqual(false);
  });
  test("Should return false when authorName is LAN ID", () => {
    expect(NewGitWhoDis["authorNameIsNotLanId"]("C12345")).toEqual(false);
  });
});
