import { CustomConfig } from "../../../src/custom_config/custom_config";

describe("Unit Tests: CustomConfig.getUpdateConfig Function", () => {
  test("Returns default value when no config is found", () => {
    const updateToggle = CustomConfig.getUpdateConfig({});
    expect(updateToggle).toBe(true);
  });

  test("Returns value from valid config", () => {
    const updateToggle = CustomConfig.getUpdateConfig({
      updateMergeRequestComment: false,
    });
    expect(updateToggle).toBe(false);
  });

  test("Returns default value when config property is invalid", () => {
    const updateToggle = CustomConfig.getUpdateConfig({
      updateMergeRequestComment: "false",
    });
    expect(updateToggle).toBe(true);
  });
});
