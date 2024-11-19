const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  roleAuthorize,
  cacheMiddleware,
} = require("../middleware/auth");
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
const { constants } = require("../constants");

router
  .route("/create")
  .post(ensureAuthenticated, roleAuthorize(constants.MANAGERS), createTrainer);
router
  .route("/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getTrainers
  );
router
  .route("/dashboardcounts")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLSTAFF),
    getDashboardTrainerCounts
  );
router
  .route("/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getTrainer
  )
  .put(ensureAuthenticated, roleAuthorize(constants.MANAGERS), updateTrainer)
  .delete(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    deleteTrainer
  );
module.exports = router;
