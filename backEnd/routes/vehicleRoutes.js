const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const {
  deleteVehicle,
  updateVehicle,
  getVehicle,
  getVehicles,
  createVehicle,
} = require("../controllers/vehicleController");

router.route("/create").post(ensureAuthenticated, createVehicle);
router.route("/getAll").get(ensureAuthenticated, getVehicles);
router
  .route("/:id")
  .get(ensureAuthenticated, getVehicle)
  .put(ensureAuthenticated, updateVehicle)
  .delete(ensureAuthenticated, deleteVehicle);
module.exports = router;
