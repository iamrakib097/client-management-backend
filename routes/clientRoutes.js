const express = require('express');
const ClientController = require('../controllers/clientController');
const router = express.Router();

// Create Client
router.post('/client', ClientController.createClient);

// Get all Clients
router.get('/clients', ClientController.getClients);

// Get a specific Client by ID
router.get('/client/:id', ClientController.getClientById);

// Update Client
router.put('/client/:id', ClientController.updateClient);

// Delete Client
router.delete('/client/:id', ClientController.deleteClient);

module.exports = router;
