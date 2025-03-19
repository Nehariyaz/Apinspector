const request = require("supertest");
const { app, server } = require("../../server"); // Ensure correct import
const { sequelize } = require("../../models"); // Import database connection

afterAll(async () => {
  if (server && server.close) {
    await server.close(); // Close the server after tests
  }
  if (sequelize && sequelize.close) {
    await sequelize.close(); // Close DB connection
  }
});

describe("API Tests", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
  });
});
