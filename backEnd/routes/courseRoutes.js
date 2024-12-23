const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  cacheMiddleware,
  roleAuthorize,
} = require("../middleware/auth");
const {
  deleteCourse,
  updateCourse,
  getCourse,
  getCourses,
  createCourse,
} = require("../controllers/courseController");
const { constants } = require("../constants");

router
  .route("/create")
  .post(ensureAuthenticated, roleAuthorize(constants.MANAGERS), createCourse);
router
  .route("/getAll")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getCourses
  );
router
  .route("/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getCourse
  )
  .put(ensureAuthenticated, roleAuthorize(constants.MANAGERS), updateCourse)
  .delete(ensureAuthenticated, roleAuthorize(constants.MANAGERS), deleteCourse);
module.exports = router;
