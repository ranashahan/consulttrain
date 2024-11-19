const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  cacheMiddleware,
  roleAuthorize,
} = require("../middleware/auth");
const {
  deleteClient,
  updateClient,
  getClient,
  getClients,
  createClient,
} = require("../controllers/clientController");
const { constants } = require("../constants");

router
  .route("/create")
  .post(ensureAuthenticated, roleAuthorize(constants.MANAGERS), createClient);
router
  .route("/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getClients
  );
router
  .route("/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getClient
  )
  .put(ensureAuthenticated, roleAuthorize(constants.MANAGERS), updateClient)
  .delete(ensureAuthenticated, roleAuthorize(constants.MANAGERS), deleteClient);
module.exports = router;
