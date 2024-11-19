const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  cacheMiddleware,
  roleAuthorize,
} = require("../middleware/auth");
const {
  getByContractorID,
  getByClientID,
  getByBothIDs,
} = require("../controllers/ccController");
const { constants } = require("../constants");

router
  .route("/contractorid/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getByContractorID
  );
router
  .route("/clientid/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getByClientID
  );
router
  .route("/both")
  .post(ensureAuthenticated, roleAuthorize(constants.ALLROLES), getByBothIDs);
// .put(ensureAuthenticated, updateClient)
// .delete(ensureAuthenticated, deleteClient);
module.exports = router;
