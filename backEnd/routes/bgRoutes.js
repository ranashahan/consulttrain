const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  cacheMiddleware,
  roleAuthorize,
} = require("../middleware/auth");
const {
  createBloodgroup,
  getBloodgroups,
  getBloodgroup,
  updateBloodgroup,
  deleteBloodgroup,
} = require("../controllers/bgController");
const { constants } = require("../constants");

router
  .route("/create")
  .post(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    createBloodgroup
  );
router
  .route("/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getBloodgroups
  );
router
  .route("/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getBloodgroup
  )
  .put(ensureAuthenticated, roleAuthorize(constants.MANAGERS), updateBloodgroup)
  .delete(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    deleteBloodgroup
  );
module.exports = router;
