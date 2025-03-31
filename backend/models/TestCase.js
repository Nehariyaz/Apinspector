const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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


TestCase.associate = (models) => {
  TestCase.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });
};

module.exports = TestCase;
