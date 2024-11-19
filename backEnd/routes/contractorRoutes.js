const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  cacheMiddleware,
  roleAuthorize,
} = require("../middleware/auth");
const {
  createContractor,
  getContractors,
  getContractor,
  updateContractor,
  deleteContractor,
} = require("../controllers/contractorController");
const { constants } = require("../constants");

router
  .route("/create")
  .post(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    createContractor
  );
// router.route("/getAll").get(getContractors);
router
  .route("/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getContractors
  );
router
  .route("/:id")
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
module.exports = router;
