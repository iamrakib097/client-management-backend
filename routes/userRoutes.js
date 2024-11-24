const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

// Create User
router.post('/user', UserController.createUser);

// Get all Users
router.get('/users', UserController.getUsers);

// Get a specific User by ID
router.get('/user/:id', UserController.getUserById);

// Update User
router.put('/user/:id', UserController.updateUser);

// Delete User
router.delete('/user/:id', UserController.deleteUser);

module.exports = router;
