const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  cacheMiddleware,
  roleAuthorize,
} = require("../middleware/auth");
const {
  deleteVisual,
  updateVisual,
  getVisual,
  getVisuals,
  createVisual,
} = require("../controllers/visualController");
const { constants } = require("../constants");

router
  .route("/create")
  .post(ensureAuthenticated, roleAuthorize(constants.MANAGERS), createVisual);
router
  .route("/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getVisuals
  );
router
  .route("/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getVisual
  )
  .put(ensureAuthenticated, roleAuthorize(constants.MANAGERS), updateVisual)
  .delete(ensureAuthenticated, roleAuthorize(constants.MANAGERS), deleteVisual);
module.exports = router;
