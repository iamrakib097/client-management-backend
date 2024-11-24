const express = require('express');
const ProjectSettingController = require('../controllers/projectSettingController');
const router = express.Router();

// Get all Project Settings
router.get('/project-settings', ProjectSettingController.getAllProjectSettings);

// Get Project Setting by ID
router.get('/project-setting/:id', ProjectSettingController.getProjectSettingById);

// Create a new Project Setting
router.post('/project-setting', ProjectSettingController.createProjectSetting);

// Update Project Setting by ID
router.put('/project-setting/:id', ProjectSettingController.updateProjectSettingById);

// Delete Project Setting by ID
router.delete('/project-setting/:id', ProjectSettingController.deleteProjectSettingById);

module.exports = router;
