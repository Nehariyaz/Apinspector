require("dotenv").config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,  // Default PostgreSQL port
        dialect: process.env.DB_DIALECT || "postgres",
        logging: false,
        pool: {
            max: 10,       // Max connections in the pool
            min: 2,        // Min connections
            acquire: 30000, // Max time (ms) to acquire a connection
            idle: 10000,    // Time (ms) before releasing an idle connection
        },
    }
);



module.exports = sequelize;
