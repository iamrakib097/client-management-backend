const Client = require("../models/Client");
const User = require("../models/User");

exports.createClient = async (req, res) => {
  try {
    const { name, company, email, phone, address, password, status } = req.body;

    const client = await Client.create({
      name,
      company,
      email,
      phone,
      address,
      password,
      status,
    });

    await User.create({
      name,
      email,
      password,
      role: "Client",
    });

    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(client);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    const { name, company, email, phone, address, password, status } = req.body;
    client.name = name;
    client.company = company;
    client.email = email;
    client.phone = phone;
    client.address = address;
    client.password = password;
    client.status = status;

    await client.save();
    res.status(200).json(client);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    await client.destroy();
    res.status(200).json({ message: "Client deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
