const request = require("supertest");
const { app, server } = require("../../server"); // Ensure correct import
const sequelize = require("../../config/database");

beforeAll(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established before tests.");
  } catch (error) {
    console.error(" Database connection failed:", error);
  }
});

afterAll(async () => {
  if (server && server.close) {
    await new Promise((resolve) => server.close(resolve)); // Ensures clean shutdown
    console.log("✅ Server closed.");
  }
  if (sequelize && sequelize.close) {
    await sequelize.close();
    console.log("✅ Database connection closed.");
  }
});

describe("🔍 API Health Check", () => {
  it("✅ Should return 200 OK with status: ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ status: "ok" });
  });
});
