const CurrencySetting = require("../models/CurrencySetting");

exports.getCurrencySettings = async (req, res) => {
  try {
    const currencySettings = await CurrencySetting.findAll();
    res.status(200).json(currencySettings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getCurrencySettingById = async (req, res) => {
  try {
    const currencySetting = await CurrencySetting.findByPk(req.params.id);
    if (!currencySetting) {
      return res.status(404).json({ message: "Currency setting not found" });
    }
    res.status(200).json(currencySetting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createCurrencySetting = async (req, res) => {
  try {
    const { currency } = req.body;
    const currencySetting = await CurrencySetting.create({ currency });
    res.status(201).json(currencySetting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCurrencySettingById = async (req, res) => {
  try {
    const { currency } = req.body;
    const currencySetting = await CurrencySetting.findByPk(req.params.id);
    if (!currencySetting) {
      return res.status(404).json({ message: "Currency setting not found" });
    }
    currencySetting.currency = currency;
    await currencySetting.save();
    res.status(200).json(currencySetting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCurrencySettingById = async (req, res) => {
  try {
    const currencySetting = await CurrencySetting.findByPk(req.params.id);
    if (!currencySetting) {
      return res.status(404).json({ message: "Currency setting not found" });
    }
    await currencySetting.destroy();
    res.status(200).json({ message: "Currency setting deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
