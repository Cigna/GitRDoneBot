import { BotComment } from "../../../src/merge_request";

const sampleFullMessageArray = [
  "Branch Age Analysis Message",
  "Diff Analysis Message",
  "Self Merge Analysis Message",
  "Too Many Assigned Analysis Message",
];

const sampleFullMessageOutput =
  "Branch Age Analysis Message<br /><br />Diff Analysis Message<br /><br />Self Merge Analysis Message<br /><br />Too Many Assigned Analysis Message";

const samplePartialMessageArray = [
  "Branch Age Analysis Message",
  "Too Many Assigned Analysis Message",
];

const samplePartialMessageOutput =
  "Branch Age Analysis Message<br /><br />Too Many Assigned Analysis Message";

const sampleBadStringsMessageArray = [
  "Branch Age Analysis Message",
  "Unknown state encountered while composing note:",
  "NA",
  "Too Many Assigned Analysis Message",
];

const sampleBadStringsMessageOutput =
  "Branch Age Analysis Message<br /><br />Too Many Assigned Analysis Message";

const sampleNoActionMessageArray = ["NA", "NA", "NA", "NA"];

const sampleNoActionMessageOutput = "No BotComment action required.";

describe("Unit Test: Comment Class", () => {
  describe("compose function", () => {
    test("should return the correct message when all strings have content", () => {
      const newMessage = BotComment.compose(sampleFullMessageArray);
      expect(newMessage).toBe(sampleFullMessageOutput);
    });

    test("should return the correct message when one or more strings is empty", () => {
      const newMessage = BotComment.compose(samplePartialMessageArray);
      expect(newMessage).toBe(samplePartialMessageOutput);
    });

    test("should not include 'unknownState' or 'NA' strings", () => {
      const newMessage = BotComment.compose(sampleBadStringsMessageArray);
      expect(newMessage).toBe(sampleBadStringsMessageOutput);
    });

    test("should return 'noAction' string if all mrNotes === 'NA' || 'unknownState'", () => {
      const newMessage = BotComment.compose(sampleNoActionMessageArray);
      expect(newMessage).toBe(sampleNoActionMessageOutput);
    });
  });
});
