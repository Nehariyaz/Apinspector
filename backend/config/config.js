require("dotenv").config();
console.log("Loaded DB config:");
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("RUNNING_IN_DOCKER:", process.env.RUNNING_IN_DOCKER);


const isDocker = process.env.RUNNING_IN_DOCKER === "true";

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: isDocker ? "postgres_db" : process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: process.env.DB_SSL === "true" ? { require: true, rejectUnauthorized: false } : false,
      authentication: {
        type: "md5"
      }
    },
    logging: process.env.NODE_ENV === "development" ? console.log : false
  },
  test: {
    username: process.env.DB_TEST_USER || "your_test_user",
    password: process.env.DB_TEST_PASS || "your_test_password",
    database: process.env.DB_TEST_NAME || "your_app_test",
    host: isDocker ? "postgres_db" : process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      authentication: {
        type: "md5"
      }
    },
    logging: false
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
      authentication: {
        type: "md5"
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};
