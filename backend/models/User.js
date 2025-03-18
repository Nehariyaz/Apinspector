const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");  
const bcrypt = require("bcryptjs");

const User = sequelize.define("User", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4,primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false, },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    resetPasswordToken: { type: DataTypes.STRING, allowNull: true },
    resetPasswordExpires: { type: DataTypes.DATE, allowNull: true },
});

// Hash password before saving
// User.beforeCreate(async (user) => {
//     user.password = await bcrypt.hash(user.password, 10);
// });

module.exports = User;
