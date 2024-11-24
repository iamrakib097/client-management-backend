const CurrencySetting = require('../models/CurrencySetting');

// Get all Currency Settings
exports.getCurrencySettings = async (req, res) => {
  try {
    const currencySettings = await CurrencySetting.findAll();
    res.status(200).json(currencySettings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get Currency Setting by ID
exports.getCurrencySettingById = async (req, res) => {
  try {
    const currencySetting = await CurrencySetting.findByPk(req.params.id);
    if (!currencySetting) {
      return res.status(404).json({ message: 'Currency setting not found' });
    }
    res.status(200).json(currencySetting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create a new Currency Setting (POST)
exports.createCurrencySetting = async (req, res) => {
  try {
    const { currency } = req.body;
    const currencySetting = await CurrencySetting.create({ currency });
    res.status(201).json(currencySetting);  // Return the created setting with status 201
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Currency Setting by ID (PUT)
exports.updateCurrencySettingById = async (req, res) => {
  try {
    const { currency } = req.body;
    const currencySetting = await CurrencySetting.findByPk(req.params.id);
    if (!currencySetting) {
      return res.status(404).json({ message: 'Currency setting not found' });
    }
    currencySetting.currency = currency;
    await currencySetting.save();
    res.status(200).json(currencySetting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Currency Setting by ID (DELETE)
exports.deleteCurrencySettingById = async (req, res) => {
  try {
    const currencySetting = await CurrencySetting.findByPk(req.params.id);
    if (!currencySetting) {
      return res.status(404).json({ message: 'Currency setting not found' });
    }
    await currencySetting.destroy();  // Use destroy instead of remove in Sequelize
    res.status(200).json({ message: 'Currency setting deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
