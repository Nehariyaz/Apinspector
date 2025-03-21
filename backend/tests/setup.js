// Load environment variables from .env.test
require('dotenv').config({ path: './.env.test' });
const { sequelize } = require("../models");

module.exports = async () => {
  try {
    console.log("Syncing test database...");
    await sequelize.sync({ force: true }); // Reset DB before running tests
    console.log("Test database synced successfully.");
  } catch (error) {
    console.error("Error syncing test database:", error);
  }
};
