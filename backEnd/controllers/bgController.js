const asyncHandler = require("express-async-handler");
const db = require("../dataBase/bgQ");

/**
 * @description Create a BloodGroup
 * @route POST /api/bloodgroup/create
 * @access private
 */
const createBloodgroup = asyncHandler(async (req, res) => {
  try {
    const { name, userid } = req.body;

    if (!name || !userid) {
      return res.status(422).json({
        message: "Please fill in all fields (bloodgroup and username)",
      });
    }
    const [bloodGroup] = await db.bgFind(name);
    if (bloodGroup) {
      return res.status(409).json({ message: "Bloodgroup already exists" });
    }

    const newBloodGroup = await db.bgCreate(name, userid);
    const bloodgroupID = JSON.stringify(newBloodGroup[0]);

    return res.status(201).json({
      message: `BloodGroup created successfully with bloodgroupid: ${
        JSON.parse(bloodgroupID).insertId
      }`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
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
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.bgFindByID(id);
    if (!result.length > 0) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
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
    const { name, userid } = req.body;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const bloodGroup = await db.bgFindByID(id);
    if (bloodGroup.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.bgUpdateByID(name, userid, id);

    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
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
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const Bloodgroup = await db.bgFindByID(id);
    if (Bloodgroup.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.bgDeleteByID(id);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

module.exports = {
  createBloodgroup,
  getBloodgroups,
  getBloodgroup,
  updateBloodgroup,
  deleteBloodgroup,
};
