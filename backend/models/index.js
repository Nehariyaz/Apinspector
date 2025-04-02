const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./User");
const Request = require("./Request");
const TestCase = require("./TestCase");


User.hasMany(TestCase, { foreignKey: "userId" });
Request.belongsTo(User, { foreignKey: "userId" });

User.hasMany(TestCase, { foreignKey: "userId" });
TestCase.belongsTo(User, { foreignKey: "userId" });


module.exports = {
  sequelize,
  User,
  Request,
  TestCase,
};