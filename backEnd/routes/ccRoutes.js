const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const {
  getByContractorID,
  getByClientID,
  getByBothIDs,
} = require("../controllers/ccController");

router.route("/contractorid/:id").get(ensureAuthenticated, getByContractorID);
router.route("/clientid/:id").get(ensureAuthenticated, getByClientID);
router.route("/both").post(ensureAuthenticated, getByBothIDs);
// .put(ensureAuthenticated, updateClient)
// .delete(ensureAuthenticated, deleteClient);
module.exports = router;
