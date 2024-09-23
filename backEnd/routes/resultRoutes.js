const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const {
  deleteResult,
  updateResult,
  getResult,
  getResults,
  createResult,
} = require("../controllers/resultController");

router.route("/create").post(ensureAuthenticated, createResult);
router.route("/getAll").get(ensureAuthenticated, getResults);
router
  .route("/:id")
  .get(ensureAuthenticated, getResult)
  .put(ensureAuthenticated, updateResult)
  .delete(ensureAuthenticated, deleteResult);
module.exports = router;
