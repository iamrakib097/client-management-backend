const ProjectSetting = require("../models/ProjectSetting");

exports.getAllProjectSettings = async (req, res) => {
  try {
    const projectSettings = await ProjectSetting.findAll();
    res.status(200).json(projectSettings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getProjectSettingById = async (req, res) => {
  try {
    const projectSetting = await ProjectSetting.findByPk(req.params.id);
    if (!projectSetting) {
      return res.status(404).json({ message: "Project setting not found" });
    }
    res.status(200).json(projectSetting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createProjectSetting = async (req, res) => {
  try {
    const { project_type } = req.body;
    const projectSetting = await ProjectSetting.create({ project_type });
    res.status(201).json(projectSetting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProjectSettingById = async (req, res) => {
  try {
    const { project_type } = req.body;
    const projectSetting = await ProjectSetting.findByPk(req.params.id);
    if (!projectSetting) {
      return res.status(404).json({ message: "Project setting not found" });
    }
    projectSetting.project_type = project_type;
    await projectSetting.save();
    res.status(200).json(projectSetting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProjectSettingById = async (req, res) => {
  try {
    const projectSetting = await ProjectSetting.findByPk(req.params.id);
    if (!projectSetting) {
      return res.status(404).json({ message: "Project setting not found" });
    }
    await projectSetting.destroy();
    res.status(200).json({ message: "Project setting deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
