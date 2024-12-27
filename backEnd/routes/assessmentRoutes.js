const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  roleAuthorize,
  cacheMiddleware,
} = require("../middleware/auth");
const {
  getAssessments,
  createAssessment,
  createSessionTraining,
  getSessionByDate,
  getSession,
  updateSession,
  deleteSession,
  getSessionTraining,
  deleteSessionTraining,
  getAssessmentsExp,
  getSessionReportByDate,
  getSessionReportAll,
} = require("../controllers/assessmentController");
const { constants } = require("../constants");

router
  .route("/create")
  .post(
    ensureAuthenticated,
    roleAuthorize(constants.ALLSTAFF),
    createAssessment
  );
router
  .route("/createst")
  .post(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    createSessionTraining
  );
router.route("/getbydate").get(ensureAuthenticated, getSessionByDate);
router.route("/getst").get(ensureAuthenticated, getSessionTraining);
router.route("/deletets").post(ensureAuthenticated, deleteSessionTraining);
router
  .route("/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getAssessments
  );
router
  .route("/getAllExp")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getAssessmentsExp
  );
router
  .route("/getReportByDate")
  .get(
    ensureAuthenticated,
    roleAuthorize(constants.ALLSTAFF),
    getSessionReportByDate
  );
router
  .route("/getReportAll")
  .get(
    ensureAuthenticated,
    roleAuthorize(constants.ALLSTAFF),
    getSessionReportAll
  );
router
  .route("/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getSession
  );
router
  .route("/:id")
  .put(ensureAuthenticated, roleAuthorize(constants.ALLSTAFF), updateSession)
  .delete(
    ensureAuthenticated,
    roleAuthorize(constants.ALLSTAFF),
    deleteSession
  );

module.exports = router;
