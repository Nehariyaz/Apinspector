const { sequelize } = require("../models");

module.exports = async () => {
  console.log("Closing database connection...");
  await sequelize.close();
};
