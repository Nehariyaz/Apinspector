const request = require("supertest");
const app = require("../../server");
const { sequelize } = require("../../models");

jest.setTimeout(30000); // Increase Jest timeout for the whole test suite

beforeAll(async () => {
  try {
    console.log("Syncing database...");
    await sequelize.sync({ force: true });
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

test("POST /api/register - should return 400 if fields are missing", async () => {
  const res = await request(app).post("/api/register").send({});
  expect(res.statusCode).toBe(400);
  expect(res.body.message).toBe("Missing required fields.");
});

test("POST /api/register - should return 403 if CAPTCHA is invalid", async () => {
  const res = await request(app).post("/api/register").send({
    email: "test@example.com",
    password: "Test1234!",
    captchaToken: "invalid-captcha-token", // Simulate invalid CAPTCHA token
  });

  expect(res.statusCode).toBe(403); // Expect 403 Forbidden for invalid CAPTCHA
  expect(res.body.message).toBe("reCAPTCHA failed, please try again"); // Match the actual error message
});
