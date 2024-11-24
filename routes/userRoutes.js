const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();

router.post("/user", UserController.createUser);
router.get("/users", UserController.getUsers);
router.get("/user/:id", UserController.getUserById);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

module.exports = router;
