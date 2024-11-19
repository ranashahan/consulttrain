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
  getSessionByDate,
  getSession,
  updateSession,
  deleteSession,
} = require("../controllers/assessmentController");
const { constants } = require("../constants");

router
  .route("/create")
  .post(
    ensureAuthenticated,
    roleAuthorize(constants.ALLSTAFF),
    createAssessment
  );
router.route("/getbydate").get(ensureAuthenticated, getSessionByDate);
router
  .route("/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getAssessments
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
