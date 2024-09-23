const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const {
  deleteClient,
  updateClient,
  getClient,
  getClients,
  createClient,
} = require("../controllers/clientController");

router.route("/create").post(ensureAuthenticated, createClient);
router.route("/getAll").get(ensureAuthenticated, getClients);
router
  .route("/:id")
  .get(ensureAuthenticated, getClient)
  .put(ensureAuthenticated, updateClient)
  .delete(ensureAuthenticated, deleteClient);
module.exports = router;
