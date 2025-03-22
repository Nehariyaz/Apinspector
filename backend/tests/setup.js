const { sequelize, connectDB } = require("../config/database");  // Adjust path if needed

beforeAll(async () => {
    console.log("Setting up test database...");
    await connectDB();  // Ensure database connection before tests
    await sequelize.sync({ force: true }); // Reset database before each test
    console.log("Test database synced.");
});

afterAll(async () => {
    console.log("Closing test database...");
    await sequelize.close();  // Properly close the database after tests
    console.log("Test database connection closed.");
});
