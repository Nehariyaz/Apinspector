const { sequelize } = require("../models"); 
const User = require("../models/User");

beforeAll(async () => {
  await sequelize.sync({ force: true }); 
});

afterAll(async () => {
  await sequelize.close(); 
});

describe("User model database test", () => {
  test("should create and retrieve a user", async () => {
    const newUser = await User.create({
      username: "john_doe",
      email: "john@example.com",
      password: "securepassword"
    });

    const foundUser = await User.findByPk(newUser.id);

    expect(foundUser).not.toBeNull();
    expect(foundUser.email).toBe("john@example.com");
    expect(foundUser.username).toBe("john_doe");
  });
});
