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
  getTrainingReportAll,
  getTrainingFinanceReport,
  getTrainingsCount,
  getTrainingCountReportClients,
  getTrainingBySessionID,
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
    roleAuthorize(constants.BILLMANAGERS),
    getTrainings
  );
router
  .route("/getCount")
  .get(
    ensureAuthenticated,
    roleAuthorize(constants.BILLMANAGERS),
    getTrainingsCount
  );
router
  .route("/getCountReportClients")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.BILLMANAGERS),
    getTrainingCountReportClients
  );
router
  .route("/getbydate")
  .get(
    ensureAuthenticated,
    roleAuthorize(constants.BILLMANAGERS),
    getTrainingByDate
  );
router
  .route("/getReportAll")
  .get(
    ensureAuthenticated,
    roleAuthorize(constants.BILLMANAGERS),
    getTrainingReportAll
  );
router
  .route("/getFinanceReport")
  .get(
    ensureAuthenticated,
    roleAuthorize(constants.BILLMANAGERS),
    getTrainingFinanceReport
  );
router
  .route("/getst")
  .get(
    ensureAuthenticated,
    roleAuthorize(constants.ALLROLES),
    getTrainingBySessionID
  );
router
  .route("/:id")
  .get(ensureAuthenticated, roleAuthorize(constants.BILLMANAGERS), getTraining)
  .put(
    ensureAuthenticated,
    roleAuthorize(constants.BILLMANAGERS),
    updateTraining
  )
  .delete(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    deleteTraining
  );
module.exports = router;
