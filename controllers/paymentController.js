const Payment = require("../models/Payment");
const Project = require("../models/Project");
const sequelize = require("../config/db").sequelize;

exports.createPayment = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      payment_date,
      received_amount,
      transaction: txn,
      description,
      project_id,
    } = req.body;

    const payment = await Payment.create(
      {
        payment_date,
        received_amount,
        transaction: txn,
        description,
        project_id,
      },
      { transaction }
    );

    const project = await Project.findByPk(project_id, { transaction });
    if (!project) {
      throw new Error("Project not found");
    }

    const updatedRecords = [...project.financialRecords, payment];
    project.financialRecords = updatedRecords;

    await project.save({ transaction });

    await transaction.commit();

    res.status(201).json(payment);
  } catch (err) {
    await transaction.rollback();
    res.status(400).json({ message: err.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.updatePayment = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const {
      payment_date,
      received_amount,
      transaction: txn,
      description,
      project_id,
    } = req.body;

    const project = await Project.findByPk(payment.project_id, { transaction });
    if (!project) {
      throw new Error("Project not found");
    }

    const updatedRecords = project.financialRecords.filter(
      (record) => record.id !== payment.id
    );

    payment.payment_date = payment_date;
    payment.received_amount = received_amount;
    payment.transaction = txn;
    payment.description = description;
    payment.project_id = project_id;

    updatedRecords.push(payment);
    project.financialRecords = updatedRecords;

    await payment.save({ transaction });
    await project.save({ transaction });

    await transaction.commit();
    res.status(200).json(payment);
  } catch (err) {
    await transaction.rollback();
    res.status(400).json({ message: err.message });
  }
};
exports.deletePayment = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const project = await Project.findByPk(payment.project_id, { transaction });
    if (!project) {
      throw new Error("Project not found");
    }

    project.financialRecords = project.financialRecords.filter(
      (record) => record.id !== payment.id
    );

    await project.save({ transaction });

    await payment.destroy({ transaction });

    await transaction.commit();

    res.status(200).json({ message: "Payment deleted" });
  } catch (err) {
    await transaction.rollback();
    res.status(400).json({ message: err.message });
  }
};
