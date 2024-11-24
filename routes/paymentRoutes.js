const express = require("express");
const PaymentController = require("../controllers/paymentController");
const router = express.Router();

router.post("/payment", PaymentController.createPayment);
router.get("/payments", PaymentController.getPayments);
router.get("/payment/:id", PaymentController.getPaymentById);
router.put("/payment/:id", PaymentController.updatePayment);
router.delete("/payment/:id", PaymentController.deletePayment);

module.exports = router;
