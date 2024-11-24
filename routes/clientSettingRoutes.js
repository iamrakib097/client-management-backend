const express = require("express");
const ClientSettingController = require("../controllers/clientSettingController");
const router = express.Router();

router.get("/client-settings", ClientSettingController.getClientSetting);

router.post("/client-setting", ClientSettingController.createClientSetting);
router.put(
  "/client-setting/:id",
  ClientSettingController.updateClientSettingById
);
router.delete(
  "/client-setting/:id",
  ClientSettingController.deleteClientSettingById
);

module.exports = router;
