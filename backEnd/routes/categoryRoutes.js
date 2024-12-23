const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  cacheMiddleware,
  roleAuthorize,
} = require("../middleware/auth");
const {
  deleteCategory,
  updateCategory,
  getCategory,
  getCategories,
  createCategory,
} = require("../controllers/categoryController");
const { constants } = require("../constants");

router
  .route("/create")
  .post(ensureAuthenticated, roleAuthorize(constants.MANAGERS), createCategory);
router
  .route("/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getCategories
  );
router
  .route("/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getCategory
  )
  .put(ensureAuthenticated, roleAuthorize(constants.MANAGERS), updateCategory)
  .delete(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    deleteCategory
  );
module.exports = router;
