const { Sequelize, Op } = require("sequelize");
const { User } = require("./models"); // Adjust the path to your models

async function deleteAllRecords() {
  try {
    // Delete all records but keep the auto-increment counter
    await User.destroy({ where: {} });

    console.log("All records deleted successfully.");
  } catch (error) {
    console.error("Error deleting records:", error);
  }
}

deleteAllRecords();
