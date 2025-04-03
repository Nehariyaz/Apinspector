const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Assertion = sequelize.define("Assertion", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  testCaseId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userId: { 
    type: DataTypes.UUID,
    allowNull: false, 
  },
  assertionType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  condition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expectedValue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receivedValue: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "-",
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending", 
  },
});




module.exports = Assertion;
