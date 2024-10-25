const express = require("express");
const router = express.Router();
const { ensureAuthenticated, roleAuthorize } = require("../middleware/auth");
const {
  getAssessments,
  createAssessment,
  getSessionByDate,
  getSession,
  updateSession,
} = require("../controllers/assessmentController");

router
  .route("/create")
  .post(
    ensureAuthenticated,
    roleAuthorize(["admin", "manager", "staff"]),
    createAssessment
  );
router.route("/getbydate").get(ensureAuthenticated, getSessionByDate);
router.route("/getAll").get(ensureAuthenticated, getAssessments);
router.route("/:id").get(ensureAuthenticated, getSession);
router
  .route("/:id")
  .put(
    ensureAuthenticated,
    roleAuthorize(["admin", "manager", "staff"]),
    updateSession
  );
//   .delete(ensureAuthenticated, deleteActivity);

module.exports = router;
