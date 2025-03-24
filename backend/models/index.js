const sequelize = require("../config/database");  // ✅ Correct path
const User = require("./User");
const Request = require("./Request");

sequelize.authenticate()
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Database connection failed:", err));

sequelize.sync({ force: false })
    .then(() => console.log("Tables synced"))
    .catch(err => console.error("Sync error:", err));

module.exports = { sequelize, User };  
