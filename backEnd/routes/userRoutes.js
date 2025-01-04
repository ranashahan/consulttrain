const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  roleAuthorize,
  cacheMiddleware,
} = require("../middleware/auth");
const {
  updateUser,
  getUser,
  getUsers,
  registerUser,
  loginUser,
  currentUser,
  refreshToken,
  deleteUser,
  logoutUser,
  updateUserPassword,
  resetUserPassword,
} = require("../controllers/userController");
const { constants } = require("../constants");

router.get(
  "/getusers",
  ensureAuthenticated,
  cacheMiddleware,
  roleAuthorize(constants.MANAGERS),
  getUsers
);
router
  .route("/:id")
  .get(
    ensureAuthenticated,
    cacheMiddleware,
    roleAuthorize(constants.ALLROLES),
    getUser
  )
  .put(ensureAuthenticated, roleAuthorize(constants.ALLROLES), updateUser)
  .delete(ensureAuthenticated, roleAuthorize(constants.MANAGERS), deleteUser);
router.get("/findbyemail/currentuser", currentUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(ensureAuthenticated, logoutUser);
router
  .route("/newpassword")
  .post(
    ensureAuthenticated,
    roleAuthorize(constants.MANAGERS),
    updateUserPassword
  );
router
  .route("/resetpassword")
  .post(
    ensureAuthenticated,
    roleAuthorize(constants.ALLROLES),
    resetUserPassword
  );
router.route("/login/refreshtoken").post(refreshToken);

// router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
