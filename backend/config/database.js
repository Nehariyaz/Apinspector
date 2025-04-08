const { Sequelize } = require("sequelize");
const path = require("path");

const envFile = process.env.NODE_ENV === "test"
  ? ".env.test"
  : process.env.NODE_ENV === "docker"
    ? ".env.docker"
    : ".env";

    const envPath = path.resolve(
      __dirname,
      process.env.NODE_ENV === "docker" ? "./" : "..",
      envFile
    );
    
    require("dotenv").config({ path: envPath });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || "postgres",
    logging: false,
    pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
