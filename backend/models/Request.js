const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Request = sequelize.define("Request", {
  method: {type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  body: { type: DataTypes.JSON, allowNull: true },
  headers: { type: DataTypes.JSON, allowNull: true},
  responseStatus: { type: DataTypes.INTEGER, allowNull: true },
  responseData: { type: DataTypes.JSON,allowNull: true },
});

module.exports = Request;

