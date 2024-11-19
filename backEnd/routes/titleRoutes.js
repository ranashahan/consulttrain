const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  cacheMiddleware,
  roleAuthorize,
} = require("../middleware/auth");
const {
  deleteTitle,
  updateTitle,
  getTitle,
  getTitles,
  createTitle,
} = require("../controllers/titleController");
const { constants } = require("../constants");

router
  .route("/create")
  .post(ensureAuthenticated, roleAuthorize(constants.MANAGERS), createTitle);
router
  .route("/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getTitles
  );
router
  .route("/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getTitle
  )
  .put(ensureAuthenticated, roleAuthorize(constants.MANAGERS), updateTitle)
  .delete(ensureAuthenticated, roleAuthorize(constants.MANAGERS), deleteTitle);
module.exports = router;
