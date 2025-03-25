const asyncHandler = require("express-async-handler");
const db = require("../dataBase/bgQ");
const { constants } = require("../constants");
/**
 * @description Create a BloodGroup
 * @route POST /api/bloodgroup/create
 * @access private
 */
const createBloodgroup = asyncHandler(async (req, res) => {
  try {
    const { name, description, userid } = req.body;

    if (!name || !userid) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please fill in all fields (bloodgroup and username)",
      });
    }
    const [bloodGroup] = await db.bgFind(name);
    if (bloodGroup) {
      return res
        .status(constants.CONFLICT)
        .json({ message: "Bloodgroup already exists" });
    }

    const newBloodGroup = await db.bgCreate(name, description, userid);
    const bloodgroupID = JSON.stringify(newBloodGroup[0]);

    return res.status(constants.CREATED).json({
      message: `BloodGroup created successfully with bloodgroupid: ${
        JSON.parse(bloodgroupID).insertId
      }`,
    });
  } catch (error) {
    return res.status(constants.SERVER_ERROR).json({ message: error.message });
  }
});

/**
 * @description get all the bloodgroups
 * @route GET /api/bloodgroup/getAll
 * @access private
 */
const getBloodgroups = asyncHandler(async (req, res) => {
  try {
    const result = await db.bgAll();
    return res.status(constants.SUCCESS).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description get bloodgroup from ID
 * @route GET /api/bloodgroup/:id
 * @access private
 */
const getBloodgroup = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.bgFindByID(id);
    if (!result.length > 0) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    return res.status(constants.SUCCESS).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description update bloodgroup against param id
 * @route PUT /api/bloodgroup/:id
 * @access private
 */
const updateBloodgroup = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, userid } = req.body;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const bloodGroup = await db.bgFindByID(id);
    if (bloodGroup.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.bgUpdateByID(name, description, userid, id);

    return res.status(constants.CREATED).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});
/**
 * @description delete bloodgroup against param id
 * @route DELETE /api/bloodgroup/:id
 * @access private
 */
const deleteBloodgroup = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const Bloodgroup = await db.bgFindByID(id);
    if (Bloodgroup.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.bgDeleteByID(id);
    return res.status(constants.CREATED).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

module.exports = {
  createBloodgroup,
  getBloodgroups,
  getBloodgroup,
  updateBloodgroup,
  deleteBloodgroup,
};
