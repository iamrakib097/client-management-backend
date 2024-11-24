const express = require("express");
const ProjectSettingController = require("../controllers/projectSettingController");
const router = express.Router();

router.get("/project-settings", ProjectSettingController.getAllProjectSettings);
router.get(
  "/project-setting/:id",
  ProjectSettingController.getProjectSettingById
);
router.post("/project-setting", ProjectSettingController.createProjectSetting);
router.put(
  "/project-setting/:id",
  ProjectSettingController.updateProjectSettingById
);
router.delete(
  "/project-setting/:id",
  ProjectSettingController.deleteProjectSettingById
);

module.exports = router;
