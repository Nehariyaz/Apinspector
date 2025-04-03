const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./User");
const Request = require("./Request");
const TestCase = require("./TestCase");
const Assertion = require("./Assertion");
const Report = require("./Reports");


User.hasMany(TestCase, { foreignKey: "userId" });
TestCase.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Request, { foreignKey: "userId" });
Request.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Assertion, { foreignKey: "userId" });
Assertion.belongsTo(User, { foreignKey: "userId" });

TestCase.hasMany(Assertion, { foreignKey: "testCaseId" });
Assertion.belongsTo(TestCase, { foreignKey: "testCaseId" });

User.hasMany(Report,{ foreignKey: "userId" });
Report.belongsTo(User, { foreignKey: "userId" });

TestCase.hasMany(Report, { foreignKey: "testCaseId" });
Report.belongsTo(TestCase, { foreignKey: "testCaseId" });



module.exports = {
  sequelize,
  User,
  Request,
  TestCase,
  Assertion,
  Report
};