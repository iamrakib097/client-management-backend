// routes/currencySettingRoutes.js
const express = require("express");
const CurrencySettingController = require("../controllers/currencySettingController");
const router = express.Router();

router.get("/currency-settings", CurrencySettingController.getCurrencySettings); // Note the plural route for fetching all settings
router.get(
  "/currency-setting/:id",
  CurrencySettingController.getCurrencySettingById
);
router.post(
  "/currency-setting",
  CurrencySettingController.createCurrencySetting
);
router.put(
  "/currency-setting/:id",
  CurrencySettingController.updateCurrencySettingById
);
router.delete(
  "/currency-setting/:id",
  CurrencySettingController.deleteCurrencySettingById
);

module.exports = router;
