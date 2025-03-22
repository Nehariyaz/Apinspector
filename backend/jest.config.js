module.exports = {
    testEnvironment: "node",
    globalTeardown: "./tests/teardown.js",
    testTimeout: 30000,  // Ensure enough time for DB operations
  };
  