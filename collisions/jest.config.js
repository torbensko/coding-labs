module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["<rootDir>/src/**/?(*.)+(spec|test).ts"],
  verbose: true,
};
