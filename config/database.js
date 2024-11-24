const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");
    require("../models/Client");
    require("../models/Project");
    require("../models/Payment");
    require("../models/User");
    require("../models/CurrencySetting");
    require("../models/ClientSetting");
    require("../models/ProjectSetting");

    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

module.exports = { sequelize, connectDB };
