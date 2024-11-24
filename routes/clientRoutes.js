const express = require("express");
const ClientController = require("../controllers/clientController");
const router = express.Router();

router.post("/client", ClientController.createClient);
router.get("/clients", ClientController.getClients);
router.get("/client/:id", ClientController.getClientById);
router.put("/client/:id", ClientController.updateClient);
router.delete("/client/:id", ClientController.deleteClient);

module.exports = router;
