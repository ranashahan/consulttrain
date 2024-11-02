const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const {
  createTrainer,
  getTrainers,
  getTrainer,
  updateTrainer,
  deleteTrainer,
} = require("../controllers/trainerController");
const {
  getDashboardTrainerCounts,
} = require("../controllers/dashboardController");

router.route("/create").post(ensureAuthenticated, createTrainer);
router.route("/getAll").get(ensureAuthenticated, getTrainers);
router
  .route("/dashboardcounts")
  .get(ensureAuthenticated, getDashboardTrainerCounts);
router
  .route("/:id")
  .get(ensureAuthenticated, getTrainer)
  .put(ensureAuthenticated, updateTrainer)
  .delete(ensureAuthenticated, deleteTrainer);
module.exports = router;
