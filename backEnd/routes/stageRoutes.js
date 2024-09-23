const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const {
  deleteStage,
  updateStage,
  getStage,
  getStages,
  createStage,
} = require("../controllers/stageController");

router.route("/create").post(ensureAuthenticated, createStage);
router.route("/getAll").get(ensureAuthenticated, getStages);
router
  .route("/:id")
  .get(ensureAuthenticated, getStage)
  .put(ensureAuthenticated, updateStage)
  .delete(ensureAuthenticated, deleteStage);
module.exports = router;
