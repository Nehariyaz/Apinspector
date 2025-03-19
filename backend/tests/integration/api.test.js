const request = require("supertest");
const { app, server } = require("../../server"); // Ensure correct import
const sequelize = require("../../database"); // Import database connection

afterAll(async () => {
  if (server && server.close) {
    await new Promise((resolve) => server.close(resolve)); // Ensures clean shutdown
  }
  if (sequelize && sequelize.close) {
    await sequelize.close();
  }
});

describe("API Tests", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ status: "ok" }); // More robust match
  });
});
