const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./User");
const Request = require("./Request");

sequelize.sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.error(" Sync failed:", err));


// Define associations
User.hasMany(Request, { foreignKey: "userId" });
Request.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  sequelize,
  User,
  Request,
};