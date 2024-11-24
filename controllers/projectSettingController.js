const ProjectSetting = require('../models/ProjectSetting');

// Get all Project Settings
exports.getAllProjectSettings = async (req, res) => {
  try {
    const projectSettings = await ProjectSetting.findAll();  // Sequelize equivalent of find()
    res.status(200).json(projectSettings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get Project Setting by ID
exports.getProjectSettingById = async (req, res) => {
  try {
    const projectSetting = await ProjectSetting.findByPk(req.params.id);  // Sequelize equivalent of findById()
    if (!projectSetting) {
      return res.status(404).json({ message: 'Project setting not found' });
    }
    res.status(200).json(projectSetting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create a new Project Setting (POST)
exports.createProjectSetting = async (req, res) => {
  try {
    const { project_type } = req.body;  // Use project_type instead of type
    const projectSetting = await ProjectSetting.create({ project_type });  // Sequelize equivalent of new and save
    res.status(201).json(projectSetting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Project Setting by ID (PUT)
exports.updateProjectSettingById = async (req, res) => {
  try {
    const { project_type } = req.body;  // Corrected to project_type
    const projectSetting = await ProjectSetting.findByPk(req.params.id);  // Sequelize equivalent of findById()
    if (!projectSetting) {
      return res.status(404).json({ message: 'Project setting not found' });
    }
    projectSetting.project_type = project_type;  // Updated to use project_type
    await projectSetting.save();  // Sequelize equivalent of save
    res.status(200).json(projectSetting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Project Setting by ID (DELETE)
exports.deleteProjectSettingById = async (req, res) => {
  try {
    const projectSetting = await ProjectSetting.findByPk(req.params.id);  // Sequelize equivalent of findById()
    if (!projectSetting) {
      return res.status(404).json({ message: 'Project setting not found' });
    }
    await projectSetting.destroy();  // Sequelize equivalent of remove
    res.status(200).json({ message: 'Project setting deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
