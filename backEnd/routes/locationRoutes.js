const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  cacheMiddleware,
  roleAuthorize,
} = require("../middleware/auth");
const {
  deletelocation,
  updatelocation,
  getlocation,
  getlocations,
  createlocation,
} = require("../controllers/locationController");
const { getDashboardLocation } = require("../controllers/dashboardController");
const { constants } = require("../constants");

router
  .route("/create")
  .post(ensureAuthenticated, roleAuthorize(constants.MANAGERS), createlocation);
router
  .route("/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getlocations
  );
router
  .route("/getLocationCount")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLSTAFF),
    getDashboardLocation
  );
router
  .route("/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getlocation
  )
  .put(ensureAuthenticated, roleAuthorize(constants.MANAGERS), updatelocation)
  .delete(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    deletelocation
  );
module.exports = router;
