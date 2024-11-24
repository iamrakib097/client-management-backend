const { DataTypes } = require('sequelize');
const sequelize = require('../config/db').sequelize;

const ProjectSetting = sequelize.define('ProjectSetting', {
  project_type: {
    type: DataTypes.STRING,
    defaultValue: 'web application',
  },
});

module.exports = ProjectSetting;
