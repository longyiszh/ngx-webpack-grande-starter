const config = {
  rootDir: "..",
  preset: "jest-preset-angular",
  setupTestFrameworkScriptFile: "./src/client/jest.setup.ts",
  globals: {
    "ts-jest": {
      tsConfigFile: "./src/client/tsconfig.test.json"
    }
  }
}

module.exports = config;