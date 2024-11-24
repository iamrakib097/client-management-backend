const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/db").sequelize;

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "Client", // Default to Client
    },
  },
  {
    // Hooks to handle password hashing based on user role
    hooks: {
      beforeCreate: async (user) => {
        if (user.role === "Admin") {
          // Hash the password for Admin users
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
        // For 'Client' users, the password remains in plain text (no hashing)
      },
      beforeUpdate: async (user) => {
        if (user.role === "Admin" && user.changed("password")) {
          // Hash the password if the role is Admin and the password has changed
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
        // For 'Client' users, the password remains unchanged (plain text)
      },
    },
  }
);

module.exports = User;
