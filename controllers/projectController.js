// controllers/projectController.js
const Project = require('../models/Project');
const Payment = require('../models/Payment');

// Create Project (POST)
exports.createProject = async (req, res) => {
  try {
    const { name, details, budget, sub_total, start_time, end_time, status, project_type, client_id, financialRecords } = req.body;
    const project = await Project.create({
      name,
      details,
      budget,
      sub_total,
      start_time,
      end_time,
      status,
      project_type,
      client_id,
      financialRecords, // Store initial financial records
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Projects (GET)
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get Project with Financial Records (GET)
exports.getProjectWithPayments = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findByPk(projectId, {
      include: {
        model: Payment,
        as: 'payments',
      },
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Include payment details and financialRecords in response
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Project (PUT)
exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, details, budget, sub_total, start_time, end_time, status, project_type, client_id, financialRecords } = req.body;

    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update project with new data
    project.name = name || project.name;
    project.details = details || project.details;
    project.budget = budget || project.budget;
    project.sub_total = sub_total || project.sub_total;
    project.start_time = start_time || project.start_time;
    project.end_time = end_time || project.end_time;
    project.status = status || project.status;
    project.project_type = project_type || project.project_type;
    project.client_id = client_id || project.client_id;
    project.financialRecords = financialRecords || project.financialRecords;

    await project.save();
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Partial Update Project (PATCH)
exports.partialUpdateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, details, budget, financialRecords } = req.body;

    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update specific fields
    project.name = name || project.name;
    project.details = details || project.details;
    project.budget = budget || project.budget;
    project.financialRecords = financialRecords || project.financialRecords;

    await project.save();
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Project (DELETE)
exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.destroy();
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
