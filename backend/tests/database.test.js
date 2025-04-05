const request = require("supertest");
const app = require("../server");
const { sequelize } = require("../models");

beforeAll(async () => {
  try {
    console.log("Syncing database...");
    await sequelize.sync({ force: true }); // Reset test DB
    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
});

afterAll(async () => {
  try {
    console.log("Closing database connection...");
    await sequelize.close();
    console.log("Database connection closed.");

    process.removeAllListeners("uncaughtException");
    process.removeAllListeners("unhandledRejection");
  } catch (error) {
    console.error("Error closing database connection:", error);
  }
});

test("Dummy test to prevent Jest error", () => {
  expect(true).toBe(true);
});
