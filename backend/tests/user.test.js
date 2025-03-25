const request = require("supertest");
const app = require("../server");
const { sequelize, User } = require("../models");
const bcrypt = require("bcryptjs");

// Mock reCAPTCHA verification
jest.mock('../controllers/authController', () => {
  const original = jest.requireActual('../controllers/authController');
  return {
    ...original,
    verifyCaptcha: jest.fn().mockResolvedValue(true)
  };
});

describe("User Module", () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  describe("User Registration", () => {
    it("should create a new user", async () => {
      const userData = {
        username: "newuser",
        email: "new@example.com",
        password: "secure123",
        captchaToken: "valid-token"
      };

      const res = await request(app)
        .post("/register")
        .send(userData);

      expect(res.statusCode).toBe(201);
      
      const dbUser = await User.findOne({
        where: { email: userData.email }
      });
      expect(dbUser).not.toBeNull();
    });

    it("should reject duplicate emails", async () => {
      await User.create({
        username: "existing",
        email: "dupe@example.com",
        password: "pass"
      });

      const res = await request(app)
        .post("/register")
        .send({
          username: "duplicate",
          email: "dupe@example.com",
          password: "pass2",
          captchaToken: "valid-token"
        });

      expect(res.statusCode).toBe(409);
    });
  });

  describe("User Authentication", () => {
    let testUser;

    beforeAll(async () => {
      testUser = await User.create({
        username: "authuser",
        email: "auth@example.com",
        password: await bcrypt.hash("password123", 10)
      });
    });

    it("should login with valid credentials", async () => {
      const res = await request(app)
        .post("/login")
        .send({
          email: "auth@example.com",
          password: "password123",
          captchaToken: "valid-token"
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
    });

    it("should reject invalid passwords", async () => {
      const res = await request(app)
        .post("/login")
        .send({
          email: "auth@example.com",
          password: "wrongpass",
          captchaToken: "valid-token"
        });

      expect(res.statusCode).toBe(401);
    });
  });
});