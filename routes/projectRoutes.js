const express = require("express");
const ProjectController = require("../controllers/projectController");
const Project = require("../models/Project");
const router = express.Router();

router.post("/project", ProjectController.createProject);

router.get("/projects", ProjectController.getAllProjects);

router.get("/project/:projectId", ProjectController.getProjectWithPayments);

router.put("/project/:projectId", ProjectController.updateProject);

router.patch("/project/:projectId", ProjectController.partialUpdateProject);

router.delete("/project/:projectId", ProjectController.deleteProject);

router.patch("/project/:projectId", ProjectController.partialUpdateProject);
module.exports = router;
