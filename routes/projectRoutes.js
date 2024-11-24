const express = require('express');
const ProjectController = require('../controllers/projectController');
const router = express.Router();

// Create Project (POST)
router.post('/project', ProjectController.createProject);

// Get All Projects (GET)
router.get('/projects', ProjectController.getAllProjects);

// Get Project with Financial Records (GET)
router.get('/project/:projectId', ProjectController.getProjectWithPayments);

// Update Project (PUT)
router.put('/project/:projectId', ProjectController.updateProject);

// Partial Update Project (PATCH)
router.patch('/project/:projectId', ProjectController.partialUpdateProject);

// Delete Project (DELETE)
router.delete('/project/:projectId', ProjectController.deleteProject);

module.exports = router;
