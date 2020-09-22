import { BotActionConfig } from "../../../src/custom_config/bot_action_config";
import { BranchAgeDefaults } from "../../../src/custom_config/action_config_defaults";
import { BranchAge } from "../../../src/bot_actions";
import { GitLabCommit } from "../../../src/interfaces";
import { mockGitLabCommit } from "../../helpers";

const defaultConfig = BotActionConfig.from(BranchAgeDefaults, {});

const old_commits: Array<GitLabCommit> = [
  mockGitLabCommit("2nd Oldest commit", "2012-09-20T11:50:22+03:00"),
  mockGitLabCommit("Oldest commit", "2011-09-20T11:50:22+03:00"),
  mockGitLabCommit("3rd Oldest commit", new Date().toString()),
];

describe("getOldestCommit function", () => {
  test("should return the oldest commit", () => {
    const oldestCommit: GitLabCommit = BranchAge["getOldestCommit"](
      old_commits,
    );
    expect(oldestCommit.title).toBe("Oldest commit");
  });
});

describe("isBranchYoungerThanThreshold function", () => {
  test("should return true if commit is younger than threshold", () => {
    expect(
      BranchAge["isBranchYoungerThanThreshold"](
        { title: "3rd Oldest commit", created_at: new Date().toString() },
        defaultConfig.threshold,
      ),
    ).toBe(true);
  });

  test("should return false if commit is older than threshold", () => {
    expect(
      BranchAge["isBranchYoungerThanThreshold"](
        {
          title: "Oldest commit",
          created_at: "2011-09-20T11:50:22+03:00",
        },
        defaultConfig.threshold,
      ),
    ).toBe(false);
  });
});
