const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const {
  deleteTitle,
  updateTitle,
  getTitle,
  getTitles,
  createTitle,
} = require("../controllers/titleController");

router.route("/create").post(ensureAuthenticated, createTitle);
router.route("/getAll").get(ensureAuthenticated, getTitles);
router
  .route("/:id")
  .get(ensureAuthenticated, getTitle)
  .put(ensureAuthenticated, updateTitle)
  .delete(ensureAuthenticated, deleteTitle);
module.exports = router;
