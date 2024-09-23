const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const {
  createBloodgroup,
  getBloodgroups,
  getBloodgroup,
  updateBloodgroup,
  deleteBloodgroup,
} = require("../controllers/bgController");

router.route("/create").post(ensureAuthenticated, createBloodgroup);
router.route("/getAll").get(ensureAuthenticated, getBloodgroups);
router
  .route("/:id")
  .get(ensureAuthenticated, getBloodgroup)
  .put(ensureAuthenticated, updateBloodgroup)
  .delete(ensureAuthenticated, deleteBloodgroup);
module.exports = router;
