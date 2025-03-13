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
    roleAuthorize(constants.BILLMANAGERS),
    createSessionTraining
  );
router
  .route("/getbydate")
  .get(
    ensureAuthenticated,
    roleAuthorize(constants.ALLROLES),
    getSessionByDate
  );
router
  .route("/getst")
  .get(
    ensureAuthenticated,
    roleAuthorize(constants.BILLMANAGERS),
    getSessionTraining
  );
router
  .route("/deletets")
  .post(
    ensureAuthenticated,
    roleAuthorize(constants.BILLMANAGERS),
    deleteSessionTraining
  );
router
  .route("/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getAssessments
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
  .get(ensureAuthenticated, roleAuthorize(constants.ALLROLES), getSession)
  .put(ensureAuthenticated, roleAuthorize(constants.ALLSTAFF), updateSession)
  .delete(
    ensureAuthenticated,
    roleAuthorize(constants.ALLSTAFF),
    deleteSession
  );

module.exports = router;
