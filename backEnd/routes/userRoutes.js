const express = require("express");
const router = express.Router();
const { ensureAuthenticated, roleAuthorize } = require("../middleware/auth");
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
} = require("../controllers/userController");

router.get("/getusers", ensureAuthenticated, getUsers);
// router.get("/getusers", getUsers);
router
  .route("/:id")
  .get(
    ensureAuthenticated,
    roleAuthorize(["admin", "manager", "staff", "member"]),
    getUser
  )
  .put(ensureAuthenticated, roleAuthorize(["admin", "manager"]), updateUser)
  .delete(ensureAuthenticated, roleAuthorize(["admin", "manager"]), deleteUser);
router.get("/findbyemail/currentuser", currentUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/login/refreshtoken").post(refreshToken);

// router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
