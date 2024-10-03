const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const {
  deleteSlaveCategory,
  updateSlaveCategory,
  getSlaveCategory,
  getSlaveCategorys,
  createSlaveCategory,
} = require("../controllers/slavecategoryController");

router.route("/create").post(ensureAuthenticated, createSlaveCategory);
router.route("/getAll").get(ensureAuthenticated, getSlaveCategorys);
router
  .route("/:id")
  .get(ensureAuthenticated, getSlaveCategory)
  .put(ensureAuthenticated, updateSlaveCategory)
  .delete(ensureAuthenticated, deleteSlaveCategory);
module.exports = router;
