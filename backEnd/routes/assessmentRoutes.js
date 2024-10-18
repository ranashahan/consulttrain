const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const {
  getAssessments,
  createAssessment,
  getSessionByDate,
  getSession,
} = require("../controllers/assessmentController");

router.route("/create").post(ensureAuthenticated, createAssessment);
router.route("/getbydate").get(ensureAuthenticated, getSessionByDate);
router.route("/getAll").get(ensureAuthenticated, getAssessments);
router.route("/:id").get(ensureAuthenticated, getSession);
//   .put(ensureAuthenticated, updateActivity)
//   .delete(ensureAuthenticated, deleteActivity);

module.exports = router;
