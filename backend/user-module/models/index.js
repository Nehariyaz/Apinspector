const sequelize = require("../config/database");
const User = require("./User");

sequelize.sync({ force: false }) // Set true for development to reset tables
    .then(() => console.log("Tables synced"))
    .catch(err => console.log("Sync error: ", err));

module.exports = { User };
