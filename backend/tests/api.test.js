const request = require("supertest");
const app = require("../server"); // Adjust path
 // Change path if needed

describe("User API Tests", () => {
  test("GET /health - Check if API is running", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "OK");
  });
});
