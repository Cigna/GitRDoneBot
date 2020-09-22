module.exports = {
  globals: {
    "ts-jest": {
      diagnostics: {
        ignoreCodes: [
          // "Type 'undefined' is not assignable to type 'boolean'"
          2322,
          // "Property 'mockResolvedValue' does not exist on type '(state: string, event: any, headers: any, logger: Logger) => Promise<IMRWebhookHandlerResponse>'."
          2339,
          // "Argument of type X is not assignable to parameter of type Y"
          2345,
          // "Object is possibly undefined"
          2532,
          // "Variable X implicitly has any type"
          7005,
          // "Parameter X implicitly has any type"
          7006,
          // "Could not find a declaration file for module"
          7016,
          // "Variable X implicitly has type any in some locations where its type cannot be determined"
          7034,
          // "Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'X'"
          7053,
        ],
        warnOnly: true,
      },
    },
  },
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.ts",
    "!**/test_fixtures/**",
    "!**/node_modules/**",
    "!**/dist/**",
    "!**/coverage/**",
    "!**/commit.ts",
    "!**/interfaces/**",
    "!**/__tests__/helpers/**",
  ],
  coverageReporters: ["text", "text-summary"],
  testEnvironment: "node",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)x?$",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/coverage/",
    "/test_fixtures/",
    "/__tests__/helpers/",
    "/__tests__/postman_tests/",
  ],
};
