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

router.route("/create").post(ensureAuthenticated, createMasterCategory);
router.route("/getAll").get(ensureAuthenticated, getMasterCategorys);
router
  .route("/:id")
  .get(ensureAuthenticated, getMasterCategory)
  .put(ensureAuthenticated, updateMasterCategory)
  .delete(ensureAuthenticated, deleteMasterCategory);
module.exports = router;
