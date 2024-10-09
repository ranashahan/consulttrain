const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const {
  deleteMasterCategory,
  updateMasterCategory,
  getMasterCategory,
  getMasterCategorys,
  createMasterCategory,
} = require("../controllers/mastercategoryController");
const {
  deleteSlaveCategory,
  updateSlaveCategory,
  getSlaveCategory,
  getSlaveCategorys,
  createSlaveCategory,
} = require("../controllers/slavecategoryController");
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

/**
 * This is master categories routes
 */
router.route("/master/create").post(ensureAuthenticated, createMasterCategory);
router.route("/master/getAll").get(ensureAuthenticated, getMasterCategorys);
router
  .route("/master/:id")
  .get(ensureAuthenticated, getMasterCategory)
  .put(ensureAuthenticated, updateMasterCategory)
  .delete(ensureAuthenticated, deleteMasterCategory);

/**
 * This is slave categories routes
 */
router.route("/slave/create").post(ensureAuthenticated, createSlaveCategory);
router.route("/slave/getAll").get(ensureAuthenticated, getSlaveCategorys);
router
  .route("/slave/:id")
  .get(ensureAuthenticated, getSlaveCategory)
  .put(ensureAuthenticated, updateSlaveCategory)
  .delete(ensureAuthenticated, deleteSlaveCategory);
module.exports = router;
