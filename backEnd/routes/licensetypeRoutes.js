const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const {
  createDLType,
  getDLTypes,
  getDLType,
  updateDLType,
  deleteDLType,
} = require("../controllers/licensetypeController");

router.route("/create").post(ensureAuthenticated, createDLType);
router.route("/getAll").get(ensureAuthenticated, getDLTypes);
router
  .route("/:id")
  .get(ensureAuthenticated, getDLType)
  .put(ensureAuthenticated, updateDLType)
  .delete(ensureAuthenticated, deleteDLType);
module.exports = router;
