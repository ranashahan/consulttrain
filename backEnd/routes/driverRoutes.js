const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  cacheMiddleware,
  roleAuthorize,
} = require("../middleware/auth");
const {
  deleteDriver,
  updateDriver,
  getDriverSearch,
  getDriverByNIC,
  getDriver,
  getDrivers,
  createDriver,
  getDriverExpiry,
  getDriverSession,
  getDriversCount,
} = require("../controllers/driverController");
const {
  getDashboardDriverCounts,
} = require("../controllers/dashboardController");
const { constants } = require("../constants");

router
  .route("/create")
  .post(ensureAuthenticated, roleAuthorize(constants.ALLSTAFF), createDriver);
router
  .route("/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getDrivers
  );
router
  .route("/getCount")
  .get(ensureAuthenticated, roleAuthorize(constants.ALLROLES), getDriversCount);
router
  .route("/nic")
  .get(ensureAuthenticated, roleAuthorize(constants.ALLROLES), getDriverByNIC);
router
  .route("/expiry")
  .get(ensureAuthenticated, roleAuthorize(constants.ALLROLES), getDriverExpiry);
router
  .route("/search")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getDriverSearch
  );
router
  .route("/dashboardcounts")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLSTAFF),
    getDashboardDriverCounts
  );
router
  .route("/sessiondriver")
  .get(
    ensureAuthenticated,
    roleAuthorize(constants.ALLROLES),
    getDriverSession
  );
router
  .route("/:id")
  .get(ensureAuthenticated, roleAuthorize(constants.ALLROLES), getDriver)
  .put(ensureAuthenticated, roleAuthorize(constants.ALLSTAFF), updateDriver)
  .delete(ensureAuthenticated, roleAuthorize(constants.ALLSTAFF), deleteDriver);
module.exports = router;
