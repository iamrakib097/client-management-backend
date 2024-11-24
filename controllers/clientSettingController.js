const ClientSetting = require('../models/ClientSetting');

// Get all Client Settings
exports.getClientSetting = async (req, res) => {
  try {
    const clientSettings = await ClientSetting.findAll();
    res.status(200).json(clientSettings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create Client Setting (POST)
exports.createClientSetting = async (req, res) => {
  try {
    const { client_status } = req.body;  // Corrected to use client_status
    
    // Create a new client setting
    const newClientSetting = await ClientSetting.create({ client_status });
    
    res.status(201).json(newClientSetting);  // Return the created setting with status 201
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Client Setting by ID
exports.updateClientSettingById = async (req, res) => {
  try {
    const { id } = req.params;
    const { client_status } = req.body;  // Corrected to use client_status

    // Find the client setting by primary key (ID)
    let clientSetting = await ClientSetting.findByPk(id);
    
    if (!clientSetting) {
      return res.status(404).json({ message: 'Client setting not found' });
    }

    // Update the client setting's status
    clientSetting.client_status = client_status;  // Corrected to use client_status
    await clientSetting.save();
    res.status(200).json(clientSetting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Client Setting by ID
exports.deleteClientSettingById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the client setting by primary key (ID)
    const clientSetting = await ClientSetting.findByPk(id);
    
    if (!clientSetting) {
      return res.status(404).json({ message: 'Client setting not found' });
    }

    // Delete the setting
    await clientSetting.destroy();
    res.status(200).json({ message: 'Client setting deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
