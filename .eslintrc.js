module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./packages/**/tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier", "security"],
  rules: {
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "@typescript-eslint/camelcase": [
      "error",
      { properties: "never", ignoreImports: true },
    ],
    "@typescript-eslint/ban-ts-ignore": 1,
    // first argument is the level of warning, 2 = error
    // second argument is level of cyclomatic complexity that will trigger error
    complexity: [2, 10],
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:security/recommended",
  ],
};
