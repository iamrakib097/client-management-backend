const { DataTypes } = require('sequelize');
const sequelize = require('../config/db').sequelize;

const ClientSetting = sequelize.define('ClientSetting', {
  client_status: {
    type: DataTypes.STRING,
    defaultValue: 'good',
  },
});

module.exports = ClientSetting;
