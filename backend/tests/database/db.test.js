require("dotenv").config({ path: ".env.test" });
const { Pool } = require("pg");
const { sequelize } = require("../../models");

jest.setTimeout(120000); // ⏳ Increase timeout to 2 minutes

const pool = new Pool({
  user: process.env.DB_USER || "testuser",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "testdb",
  password: process.env.DB_PASSWORD || "testpassword",
  port: process.env.DB_PORT || 5432,
});

// ✅ Wait for PostgreSQL & Sequelize to be ready
const waitForPostgres = async (retries = 20, delay = 3000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.query("SELECT 1");
      console.log("✅ PostgreSQL is ready!");

      // Authenticate Sequelize after PostgreSQL is ready
      await sequelize.authenticate();
      console.log("✅ Sequelize connected successfully.");

      // Reset the test database before running tests
      await sequelize.sync({ force: true });
      console.log("🔄 Database reset (force: true).");

      return;
    } catch (err) {
      if (i < retries - 1) {
        console.log(`⏳ Waiting for PostgreSQL (${retries - i - 1} retries left)...`);
        await new Promise((res) => setTimeout(res, delay));
      } else {
        console.error("🚨 PostgreSQL did not start in time!");
        throw err;
      }
    }
  }
};

beforeAll(async () => {
  console.log("🔄 Setting up test database...");
  await waitForPostgres();
});

afterAll(async () => {
  console.log("🛑 Closing database connections...");

  try {
    if (sequelize) {
      await sequelize.close();
      console.log("✅ Sequelize connection closed.");
    }
  } catch (err) {
    console.error("⚠️ Error closing Sequelize connection:", err);
  }

  try {
    if (pool) {
      await pool.end();
      console.log("✅ PostgreSQL pool closed.");
    }
  } catch (err) {
    console.error("⚠️ Error closing PostgreSQL pool:", err);
  }
});

describe("Database Connection Test", () => {
  test("should connect to the database and execute a query", async () => {
    console.log("🔍 Running test query...");
    const res = await pool.query("SELECT 1 AS result");
    expect(res.rows[0].result).toBe(1);
    console.log("✅ Query executed successfully!");
  });
});
