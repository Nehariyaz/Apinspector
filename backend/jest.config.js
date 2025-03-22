module.exports = {
    testEnvironment: "node",
    globalTeardown: "<rootDir>/tests/teardown.js",
    setupFilesAfterEnv: ["./tests/setup.js"],  // (Optional) Use if you need a setup script
    testTimeout: 30000,  // Ensure enough time for DB operations
};
