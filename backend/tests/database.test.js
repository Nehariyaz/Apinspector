const { execSync } = require("child_process");
const { sequelize, User, Request } = require("../models");

beforeAll(async () => {
  try {
    console.log("Setting up test database...");
    console.log("Dropping and recreating test database...");
    execSync('PGPASSWORD=1234 psql -U postgres -c "DROP DATABASE IF EXISTS user_module_test;"', {
      stdio: "inherit",
    });
    execSync('PGPASSWORD=1234 psql -U postgres -c "CREATE DATABASE user_module_test;"', {
      stdio: "inherit",
    });

    console.log("Running migrations...");
    const migrationOutput = execSync(
      "NODE_ENV=test npx sequelize-cli db:migrate --config config/config.js --env test --debug",
      { encoding: "utf8" }
    );
    console.log("Migration output:", migrationOutput);

    console.log("Connecting to database...");
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    User.associate({ Request });
    Request.associate({ User });
  } catch (error) {
    console.error("Error setting up test database:", error);
    throw error;
  }
}, 30000);

afterAll(async () => {
  try {
    console.log("Closing database connection...");
    await sequelize.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error closing database connection:", error);
  }
});

describe("Database Tests", () => {
  it("should connect to the database", async () => {
    await expect(sequelize.authenticate()).resolves.toBeUndefined();
  });

  it("should have the Users and Requests tables after migrations", async () => {
    const tables = await sequelize.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'",
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log("Raw tables result:", tables);
    // Handle array-of-arrays format
    const tableNames = (tables || []).map((row) => row[0].toLowerCase());
    console.log("Found tables:", tableNames);

    expect(tableNames).toContain("users");
    expect(tableNames).toContain("requests");
  });

  it("should create a user in the database", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: await require("bcryptjs").hash("password123", 10),
    };

    const user = await User.create(userData);
    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@example.com");
    expect(user.id).toBeDefined();

    const foundUser = await User.findOne({ where: { email: "test@example.com" } });
    expect(foundUser).toBeDefined();
    expect(foundUser.username).toBe("testuser");
  });

  it("should create a request linked to a user", async () => {
    const user = await User.findOne({ where: { email: "test@example.com" } });
    const requestData = {
      method: "GET",
      url: "https://api.example.com",
      headers: JSON.stringify({ "Content-Type": "application/json" }),
      body: JSON.stringify({ key: "value" }),
      userId: user.id,
    };

    const apiRequest = await Request.create(requestData);
    expect(apiRequest).toBeDefined();
    expect(apiRequest.method).toBe("GET");
    expect(apiRequest.url).toBe("https://api.example.com");
    expect(apiRequest.userId).toBe(user.id);

    const foundRequest = await Request.findOne({ where: { url: "https://api.example.com" } });
    expect(foundRequest).toBeDefined();
    expect(foundRequest.method).toBe("GET");
  });
});