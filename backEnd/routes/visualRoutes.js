const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const {
  deleteVisual,
  updateVisual,
  getVisual,
  getVisuals,
  createVisual,
} = require("../controllers/visualController");

router.route("/create").post(ensureAuthenticated, createVisual);
router.route("/getAll").get(ensureAuthenticated, getVisuals);
router
  .route("/:id")
  .get(ensureAuthenticated, getVisual)
  .put(ensureAuthenticated, updateVisual)
  .delete(ensureAuthenticated, deleteVisual);
module.exports = router;
