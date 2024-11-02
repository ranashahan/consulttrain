const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const {
  deleteDriver,
  updateDriver,
  getDriverSearch,
  getDriverByNIC,
  getDriver,
  getDrivers,
  createDriver,
} = require("../controllers/driverController");
const {
  getDashboardDriverCounts,
} = require("../controllers/dashboardController");

router.route("/create").post(ensureAuthenticated, createDriver);
router.route("/getAll").get(ensureAuthenticated, getDrivers);
router.route("/nic").get(ensureAuthenticated, getDriverByNIC);
router.route("/search").get(ensureAuthenticated, getDriverSearch);
router
  .route("/dashboardcounts")
  .get(ensureAuthenticated, getDashboardDriverCounts);
router
  .route("/:id")
  .get(ensureAuthenticated, getDriver)
  .put(ensureAuthenticated, updateDriver)
  .delete(ensureAuthenticated, deleteDriver);
module.exports = router;
