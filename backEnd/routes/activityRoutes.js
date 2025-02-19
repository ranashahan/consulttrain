const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  roleAuthorize,
  cacheMiddleware,
} = require("../middleware/auth");
const {
  deleteSuperCategory,
  updateSuperCategory,
  getSuperCategory,
  getSuperCategorys,
  createSuperCategory,
} = require("../controllers/supercategoryController");
const {
  deleteMasterCategory,
  updateMasterCategory,
  getMasterCategory,
  getMasterCategorys,
  createMasterCategory,
} = require("../controllers/mastercategoryController");
const {
  deleteSlaveCategory,
  updateSlaveCategory,
  getSlaveCategory,
  getSlaveCategories,
  createSlaveCategory,
} = require("../controllers/slavecategoryController");
const {
  deleteActivity,
  updateActivity,
  getActivity,
  getActivities,
  createaActivity,
  getActivitiesBySlaveID,
} = require("../controllers/activityController");
const { constants } = require("../constants");

router
  .route("/create")
  .post(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    createaActivity
  );
router
  .route("/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getActivities
  );
router
  .route("/getbyslave/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getActivitiesBySlaveID
  );
router
  .route("/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getActivity
  )
  .put(ensureAuthenticated, roleAuthorize(constants.MANAGERS), updateActivity)
  .post(ensureAuthenticated, roleAuthorize(constants.MANAGERS), deleteActivity);

/**
 * This is master categories routes
 */
router
  .route("/master/create")
  .post(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    createMasterCategory
  );
router
  .route("/master/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getMasterCategorys
  );
router
  .route("/master/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getMasterCategory
  )
  .put(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    updateMasterCategory
  )
  .post(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    deleteMasterCategory
  );

/**
 * This is slave categories routes
 */
router
  .route("/slave/create")
  .post(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    createSlaveCategory
  );
router
  .route("/slave/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getSlaveCategories
  );
router
  .route("/slave/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getSlaveCategory
  )
  .put(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    updateSlaveCategory
  )
  .post(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    deleteSlaveCategory
  );

/**
 * This is super categories routes
 */
router
  .route("/super/create")
  .post(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    createSuperCategory
  );
router
  .route("/super/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getSuperCategorys
  );
router
  .route("/super/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getSuperCategory
  )
  .put(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    updateSuperCategory
  )
  .post(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    deleteSuperCategory
  );
module.exports = router;
