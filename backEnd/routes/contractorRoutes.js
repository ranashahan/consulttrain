const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const {
  createContractor,
  getContractors,
  getContractor,
  updateContractor,
  deleteContractor,
} = require("../controllers/contractorController");

router.route("/create").post(ensureAuthenticated, createContractor);
router.route("/getAll").get(ensureAuthenticated, getContractors);
router
  .route("/:id")
  .get(ensureAuthenticated, getContractor)
  .put(ensureAuthenticated, updateContractor)
  .delete(ensureAuthenticated, deleteContractor);
module.exports = router;
