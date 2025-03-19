require("dotenv").config();
const sequelize = require("../config/database");

module.exports = async () => {
    try {
        console.log("🔄 Setting up test database...");
        await sequelize.sync({ force: true }); // Change to alter: true if needed
        console.log("✅ Test database ready!");
    } catch (error) {
        console.error("❌ Error setting up test database:", error);
        process.exit(1);
    }
};
