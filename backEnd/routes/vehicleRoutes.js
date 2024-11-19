const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  cacheMiddleware,
  roleAuthorize,
} = require("../middleware/auth");
const {
  deleteVehicle,
  updateVehicle,
  getVehicle,
  getVehicles,
  createVehicle,
} = require("../controllers/vehicleController");
const { constants } = require("../constants");

router
  .route("/create")
  .post(ensureAuthenticated, roleAuthorize(constants.MANAGERS), createVehicle);
router
  .route("/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getVehicles
  );
router
  .route("/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getVehicle
  )
  .put(ensureAuthenticated, roleAuthorize(constants.MANAGERS), updateVehicle)
  .delete(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    deleteVehicle
  );
module.exports = router;
