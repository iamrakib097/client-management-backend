// models/Project.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;
const dayjs = require("dayjs");

const Payment = require("./Payment");

const Project = sequelize.define("Project", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  details: {
    type: DataTypes.STRING,
  },
  budget: {
    type: DataTypes.STRING,
    defaultValue: "0",
  },
  sub_total: {
    type: DataTypes.STRING,
    defaultValue: "0",
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      const rawDate = this.getDataValue("start_time");
      if (!rawDate) return null;
      return dayjs(rawDate).format("DD MMM YYYY");
    },
  },
  end_time: {
    type: DataTypes.DATE,
    get() {
      const rawDate = this.getDataValue("end_time");
      if (!rawDate) return null;
      return dayjs(rawDate).format("DD MMM YYYY");
    },
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "ongoing",
  },
  project_type: {
    type: DataTypes.STRING,
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  financialRecords: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
});

Project.hasMany(Payment, { foreignKey: "project_id", as: "payments" });
Payment.belongsTo(Project, { foreignKey: "project_id", as: "project" });
module.exports = Project;
