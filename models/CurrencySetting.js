const { DataTypes } = require('sequelize');
const sequelize = require('../config/db').sequelize;

const CurrencySetting = sequelize.define('CurrencySetting', {
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'USD',
  },
});

module.exports = CurrencySetting;
