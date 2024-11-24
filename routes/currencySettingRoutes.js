// routes/currencySettingRoutes.js
const express = require('express');
const CurrencySettingController = require('../controllers/currencySettingController');
const router = express.Router();

// Get all Currency Settings
router.get('/currency-settings', CurrencySettingController.getCurrencySettings); // Note the plural route for fetching all settings

// Get Currency Setting by ID
router.get('/currency-setting/:id', CurrencySettingController.getCurrencySettingById);

// Create a new Currency Setting
router.post('/currency-setting', CurrencySettingController.createCurrencySetting);

// Update Currency Setting by ID
router.put('/currency-setting/:id', CurrencySettingController.updateCurrencySettingById);

// Delete Currency Setting by ID
router.delete('/currency-setting/:id', CurrencySettingController.deleteCurrencySettingById);

module.exports = router;
