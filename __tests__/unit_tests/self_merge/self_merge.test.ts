import { mockUser } from "../../helpers";
import { SelfMerge } from "../../../src/bot_actions";

const AUTHOR_ID = 1;
const ASSIGNEE_ID = 2;

const approved_by_author = [{ user: mockUser(AUTHOR_ID) }];
const approved_by_assignee = [{ user: mockUser(ASSIGNEE_ID) }];
const approved_by_multiple_approvers = [
  { user: mockUser(ASSIGNEE_ID) },
  { user: mockUser(AUTHOR_ID) },
];

describe("mrIsNotSelfAssignedOrMerged function", () => {
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

describe("mrIsNotSelfApproved function", () => {
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
