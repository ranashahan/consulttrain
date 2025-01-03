const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  roleAuthorize,
  cacheMiddleware,
} = require("../middleware/auth");
const {
  createTraining,
  getTrainings,
  getTraining,
  updateTraining,
  deleteTraining,
  getTrainingByDate,
} = require("../controllers/trainingController");
const { constants } = require("../constants");

router
  .route("/create")
  .post(ensureAuthenticated, roleAuthorize(constants.MANAGERS), createTraining);
router
  .route("/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.MANAGERS),
    getTrainings
  );
router
  .route("/getbydate")
  .get(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    getTrainingByDate
  );

router
  .route("/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.MANAGERS),
    getTraining
  )
  .put(ensureAuthenticated, roleAuthorize(constants.MANAGERS), updateTraining)
  .delete(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    deleteTraining
  );
module.exports = router;
