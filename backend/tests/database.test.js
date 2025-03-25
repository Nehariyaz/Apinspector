const { sequelize, User, Request } = require("../models");

describe("Database Layer", () => {
  beforeAll(async () => {
    try {
      await sequelize.authenticate();
    } catch (error) {
      console.error("Database connection failed:", error);
      throw error;
    }
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("Database Configuration", () => {
    it("should use the test database", () => {
      expect(sequelize.config.database).toMatch(/_test$/);
    });
  });

  describe("User Model", () => {
    it("should create with required fields", async () => {
      const user = await User.create({
        username: "testuser",
        email: "test@example.com",
        password: "hashedpassword"
      });
      expect(user.id).toBeDefined();
    });
  });

  describe("Request Model", () => {
    let testUser;

    beforeAll(async () => {
      testUser = await User.create({
        username: "requser",
        email: "req@example.com",
        password: "reqpass"
      });
    });

    it("should create with required fields", async () => {
      const req = await Request.create({
        method: "GET",
        url: "https://api.example.com",
        userId: testUser.id
      });
      expect(req.id).toBeDefined();
    });
  });
});