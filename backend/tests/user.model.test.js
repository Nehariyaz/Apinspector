const { User, sequelize } = require("../models");

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset DB before tests
});

afterAll(async () => {
  await sequelize.close(); // Close DB after tests
});

describe("User Model Tests", () => {
  test("Should create a new user", async () => {
    const user = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "hashedpassword123",
    });

    expect(user.id).toBeDefined();
    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("john@example.com");
  });

  test("Should not allow duplicate emails", async () => {
    try {
      await User.create({
        name: "Jane Doe",
        email: "john@example.com", // Same email as above
        password: "hashedpassword456",
      });
    } catch (error) {
      expect(error.name).toBe("SequelizeUniqueConstraintError");
    }
  });
});
