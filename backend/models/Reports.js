const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const TestCase = require("./TestCase");
//const Assertion = require("./Assertion");

const Report = sequelize.define("Report", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  testCaseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "TestCases",
      key: "id"
    }
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id"
    }
  },
  status: {
    type: DataTypes.ENUM("passed", "failed"),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});




module.exports = Report;
