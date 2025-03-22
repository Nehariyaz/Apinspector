const request = require("supertest");
const app = require("../server"); // Import the app

describe("Basic API Tests", () => {
  it("should return a health check response", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  it("should return 404 for unknown routes", async () => {
    const res = await request(app).get("/unknown");
    expect(res.status).toBe(404);
  });
});
