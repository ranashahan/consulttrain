const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  cacheMiddleware,
  roleAuthorize,
} = require("../middleware/auth");
const {
  deleteStage,
  updateStage,
  getStage,
  getStages,
  createStage,
} = require("../controllers/stageController");
const { constants } = require("../constants");

router
  .route("/create")
  .post(ensureAuthenticated, roleAuthorize(constants.MANAGERS), createStage);
router
  .route("/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getStages
  );
router
  .route("/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getStage
  )
  .put(ensureAuthenticated, roleAuthorize(constants.MANAGERS), updateStage)
  .delete(ensureAuthenticated, roleAuthorize(constants.MANAGERS), deleteStage);
module.exports = router;
