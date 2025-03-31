require("dotenv").config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });


module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: process.env.DB_SSL === "true",
      authentication: {
        type: "md5"
      }
    },
    logging: process.env.NODE_ENV === "development" ? console.log : false
    },
    test: {
        username: process.env.DB_TEST_USER ,
        password: process.env.DB_TEST_PASSWORD ,
        database: process.env.DB_TEST_NAME ,
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        dialectOptions: {
          authentication: {
            type: "md5"
          }
        },
        logging: false
      },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
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