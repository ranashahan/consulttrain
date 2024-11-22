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
  .route("/nic")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getDriverByNIC
  );
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
  .route("/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getDriver
  )
  .put(ensureAuthenticated, roleAuthorize(constants.ALLSTAFF), updateDriver)
  .delete(ensureAuthenticated, roleAuthorize(constants.ALLSTAFF), deleteDriver);
module.exports = router;
