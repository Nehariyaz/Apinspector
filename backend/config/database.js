console.log("database.js is being loaded...");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_NAME || "database.sqlite",
    logging: false,
});


sequelize.authenticate()
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("Error: " + err));

module.exports = sequelize;
