const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const {
  deleteActivity,
  updateActivity,
  getActivity,
  getActivities,
  createaActivity,
  getActivitiesBySlaveID,
} = require("../controllers/activityController");

router.route("/create").post(ensureAuthenticated, createaActivity);
router.route("/getAll").get(ensureAuthenticated, getActivities);
router
  .route("/getbyslave/:id")
  .get(ensureAuthenticated, getActivitiesBySlaveID);
router
  .route("/:id")
  .get(ensureAuthenticated, getActivity)
  .put(ensureAuthenticated, updateActivity)
  .delete(ensureAuthenticated, deleteActivity);
module.exports = router;
