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

router.route("/create").post(ensureAuthenticated, createlocation);
router.route("/getAll").get(ensureAuthenticated, getlocations);
router
  .route("/:id")
  .get(ensureAuthenticated, getlocation)
  .put(ensureAuthenticated, updatelocation)
  .delete(ensureAuthenticated, deletelocation);
module.exports = router;
