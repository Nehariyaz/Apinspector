const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Load the correct env file depending on NODE_ENV and RUNNING_IN_DOCKER
const envFiles = [
  ".env", // default fallback
];

// Add environment-specific files
if (process.env.NODE_ENV === "test") {
  envFiles.unshift(".env.test");
} else if (process.env.RUNNING_IN_DOCKER === "true") {
  envFiles.unshift(".env.docker");
}

// Load each env file in order (earlier ones take precedence)
envFiles.forEach((file) => {
  const filePath = path.resolve(__dirname, "..", file);
  if (fs.existsSync(filePath)) {
    dotenv.config({ path: filePath });
    console.log(`Loaded environment variables from ${file}`);
  }
});

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
    username: process.env.DB_USER || "your_test_user",
    password: process.env.DB_PASS || "your_test_password",
    database: process.env.DB_NAME || "your_app_test",
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
