const express = require('express');
const PaymentController = require('../controllers/paymentController');
const router = express.Router();

// Create Payment
router.post('/payment', PaymentController.createPayment);

// Get all Payments
router.get('/payments', PaymentController.getPayments);

// Get a specific Payment by ID
router.get('/payment/:id', PaymentController.getPaymentById);

// Update Payment
router.put('/payment/:id', PaymentController.updatePayment);

// Delete Payment
router.delete('/payment/:id', PaymentController.deletePayment);

module.exports = router;
