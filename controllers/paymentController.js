const Payment = require("../models/Payment");
const Project = require("../models/Project");
const sequelize = require("../config/db").sequelize; // Ensure sequelize instance is imported

// Create Payment
exports.createPayment = async (req, res) => {
  const transaction = await sequelize.transaction(); // Use a transaction to ensure consistency
  try {
    const {
      payment_date,
      received_amount,
      transaction: txn,
      description,
      project_id,
    } = req.body;

    // Step 1: Create the payment
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

    // Step 2: Update the project's financialRecords
    const project = await Project.findByPk(project_id, { transaction });
    if (!project) {
      throw new Error("Project not found");
    }

    const updatedRecords = [...project.financialRecords, payment];
    project.financialRecords = updatedRecords;

    await project.save({ transaction });

    await transaction.commit(); // Commit the transaction if everything succeeds

    res.status(201).json(payment);
  } catch (err) {
    await transaction.rollback(); // Rollback on error
    res.status(400).json({ message: err.message });
  }
};

// Get all Payments
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get Payment by ID
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

// Update Payment
exports.updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const {
      payment_date,
      received_amount,
      transaction,
      description,
      project_id,
    } = req.body;
    payment.payment_date = payment_date;
    payment.received_amount = received_amount;
    payment.transaction = transaction;
    payment.description = description;
    payment.project_id = project_id;

    await payment.save();
    res.status(200).json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Payment
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    await payment.destroy();
    res.status(200).json({ message: "Payment deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
