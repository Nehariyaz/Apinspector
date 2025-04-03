const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Request = require("./Request");
const User = require("./User");
const Report = require("./Reports");
const Assertion = require("./Assertion");

const TestCase = sequelize.define("TestCase", {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true 
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  queryParams: {                
    type: DataTypes.JSON,
    allowNull: true,
  },
  headers: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  response: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
  userId: {
    type: DataTypes.UUID, 
    allowNull: false,
    references: {
      model: "Users", 
      key: "id",
    },
  },
});



module.exports = TestCase;
