const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const {
  deletelocation,
  updatelocation,
  getlocation,
  getlocations,
  createlocation,
} = require("../controllers/locationController");
const { getDashboardLocation } = require("../controllers/dashboardController");

router.route("/create").post(ensureAuthenticated, createlocation);
router.route("/getAll").get(ensureAuthenticated, getlocations);
router
  .route("/getLocationCount")
  .get(ensureAuthenticated, getDashboardLocation);
router
  .route("/:id")
  .get(ensureAuthenticated, getlocation)
  .put(ensureAuthenticated, updatelocation)
  .delete(ensureAuthenticated, deletelocation);
module.exports = router;
