const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const {
  createdltype,
  getdltypes,
  getdltype,
  updatedltype,
  deletedltype,
} = require("../controllers/licensetypeController");

router.route("/create").post(ensureAuthenticated, createdltype);
router.route("/getAll").get(ensureAuthenticated, getdltypes);
router
  .route("/:id")
  .get(ensureAuthenticated, getdltype)
  .put(ensureAuthenticated, updatedltype)
  .delete(ensureAuthenticated, deletedltype);
module.exports = router;
