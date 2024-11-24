const express = require('express');
const ClientSettingController = require('../controllers/clientSettingController');
const router = express.Router();

router.get('/client-settings', ClientSettingController.getClientSetting);

// Create Client Setting (POST)
router.post('/client-setting', ClientSettingController.createClientSetting);

// Update Client Setting by ID
router.put('/client-setting/:id', ClientSettingController.updateClientSettingById);

// Delete Client Setting by ID
router.delete('/client-setting/:id', ClientSettingController.deleteClientSettingById);


module.exports = router;
