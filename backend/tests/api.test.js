const request = require("supertest");
const app = require("../server");

describe("API Endpoints", () => {
  describe("GET /health", () => {
    it("should return a health check response", async () => {
      const res = await request(app).get("/health");
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: "ok" });
    });
  });

  describe("Non-existent routes", () => {
    it("should return 404 for unknown routes", async () => {
      const res = await request(app).get("/unknown");
      expect(res.status).toBe(404);
      expect(res.body).toEqual(expect.objectContaining({
        message: expect.any(String)
      }));
    });
  });
});