const ClientSetting = require("../models/ClientSetting");

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
    const { client_status } = req.body;

    const newClientSetting = await ClientSetting.create({ client_status });

    res.status(201).json(newClientSetting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Client Setting by ID
exports.updateClientSettingById = async (req, res) => {
  try {
    const { id } = req.params;
    const { client_status } = req.body;

    let clientSetting = await ClientSetting.findByPk(id);

    if (!clientSetting) {
      return res.status(404).json({ message: "Client setting not found" });
    }

    clientSetting.client_status = client_status; // Corrected to use client_status
    await clientSetting.save();
    res.status(200).json(clientSetting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteClientSettingById = async (req, res) => {
  try {
    const { id } = req.params;

    const clientSetting = await ClientSetting.findByPk(id);

    if (!clientSetting) {
      return res.status(404).json({ message: "Client setting not found" });
    }

    await clientSetting.destroy();
    res.status(200).json({ message: "Client setting deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
