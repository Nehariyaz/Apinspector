const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TestCase = sequelize.define('TestCase', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  method: {
    type: DataTypes.ENUM('GET', 'POST', 'PUT', 'DELETE'),
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  queryParams: {
    type: DataTypes.JSON,  // Store query params as JSON
    defaultValue: [],
  },
  body: {
    type: DataTypes.TEXT,  // Store JSON data as text
    allowNull: true,
  }
});

module.exports = TestCase;
