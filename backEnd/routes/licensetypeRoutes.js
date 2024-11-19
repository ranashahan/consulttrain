const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  cacheMiddleware,
  roleAuthorize,
} = require("../middleware/auth");
const {
  createDLType,
  getDLTypes,
  getDLType,
  updateDLType,
  deleteDLType,
} = require("../controllers/licensetypeController");
const { constants } = require("../constants");

router
  .route("/create")
  .post(ensureAuthenticated, roleAuthorize(constants.MANAGERS), createDLType);
router
  .route("/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getDLTypes
  );
router
  .route("/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getDLType
  )
  .put(ensureAuthenticated, roleAuthorize(constants.MANAGERS), updateDLType)
  .delete(ensureAuthenticated, roleAuthorize(constants.MANAGERS), deleteDLType);
module.exports = router;
