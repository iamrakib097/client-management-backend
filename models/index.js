const sequelize = require("../config/database");
const Client = require("./Client");
const Project = require("./Project");
const Payment = require("./Payment");
const UserModel = require("./User");
const Setting = require("./Setting");
const ClientSetting = require("./ClientSetting");
const ProjectSetting = require("./ProjectSetting");

Client.hasMany(Project, { foreignKey: "client_id" });
Project.hasMany(Payment, { foreignKey: "project_id" });
UserModel.belongsTo(Client, { foreignKey: "client_id" });

module.exports = {
  sequelize,
  Client,
  Project,
  Payment,
  UserModel,
  Setting,
  ClientSetting,
  ProjectSetting,
};
