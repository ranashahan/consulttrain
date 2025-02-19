const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  roleAuthorize,
  cacheMiddleware,
} = require("../middleware/auth");
const {
  deleteIndustries,
  updateIndustries,
  getIndustry,
  getIndustries,
  createIndustries,
} = require("../controllers/industriesController");
const {
  deleteContractor,
  updateContractor,
  getContractor,
  getContractors,
  createContractor,
} = require("../controllers/contractorController");
const {
  deleteClient,
  updateClient,
  getClient,
  getClients,
  createClient,
} = require("../controllers/clientController");
const { constants } = require("../constants");

/**
 * This is client routes
 */
router
  .route("/client/create")
  .post(ensureAuthenticated, roleAuthorize(constants.MANAGERS), createClient);
router
  .route("/client/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getClients
  );
router
  .route("/client/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getClient
  )
  .put(ensureAuthenticated, roleAuthorize(constants.MANAGERS), updateClient)
  .delete(ensureAuthenticated, roleAuthorize(constants.MANAGERS), deleteClient);

/**
 * This is contractor routes
 */
router
  .route("/contractor/create")
  .post(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    createContractor
  );
router
  .route("/contractor/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getContractors
  );
router
  .route("/contractor/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getContractor
  )
  .put(ensureAuthenticated, roleAuthorize(constants.MANAGERS), updateContractor)
  .delete(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    deleteContractor
  );

/**
 * This is Industries routes
 */
router
  .route("/industries/create")
  .post(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    createIndustries
  );
router
  .route("/industries/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getIndustries
  );
router
  .route("/industries/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getIndustry
  )
  .put(ensureAuthenticated, roleAuthorize(constants.MANAGERS), updateIndustries)
  .delete(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    deleteIndustries
  );
module.exports = router;
