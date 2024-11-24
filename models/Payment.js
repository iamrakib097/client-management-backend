const { DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;
const dayjs = require("dayjs");

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      const rawDate = this.getDataValue("payment_date");
      if (!rawDate) return null;
      return dayjs(rawDate).format("DD MMM YYYY"); // e.g., 10 Nov 2024
    },
  },
  received_amount: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:"0"
  },
  transaction: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Payment;
