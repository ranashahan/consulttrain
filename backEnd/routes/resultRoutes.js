const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  cacheMiddleware,
  roleAuthorize,
} = require("../middleware/auth");
const {
  deleteResult,
  updateResult,
  getResult,
  getResults,
  createResult,
} = require("../controllers/resultController");
const { constants } = require("../constants");

router
  .route("/create")
  .post(ensureAuthenticated, roleAuthorize(constants.MANAGERS), createResult);
router
  .route("/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getResults
  );
router
  .route("/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getResult
  )
  .put(ensureAuthenticated, roleAuthorize(constants.MANAGERS), updateResult)
  .delete(ensureAuthenticated, roleAuthorize(constants.MANAGERS), deleteResult);
module.exports = router;
