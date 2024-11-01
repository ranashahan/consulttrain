const asyncHandler = require("express-async-handler");
const db = require("../dataBase/mastercategoryQ");
const dbSlave = require("../dataBase/slavecategoryQ");

/**
 * @description Create a mastercategory
 * @route POST /api/mastercategory/create
 * @access private
 */
const createMasterCategory = asyncHandler(async (req, res) => {
  try {
    const { name, description, userid } = req.body;

    if (!name || !userid) {
      return res.status(422).json({
        message: "Please fill in all fields (mastercategory name and userid)",
      });
    }
    const [mastercategory] = await db.mcFind(name);
    if (mastercategory) {
      return res
        .status(409)
        .json({ message: name + " mastercategory already exists" });
    }

    const newmastercategory = await db.mcCreate(name, description, userid);
    const mastercategoryid = JSON.stringify(newmastercategory[0]);

    return res.status(201).json({
      message: `mastercategory created successfully with ID: ${
        JSON.parse(mastercategoryid).insertId
      }`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @description get all the mastercategorys
 * @route GET /api/mastercategory/getAll
 * @access private
 */
const getMasterCategorys = asyncHandler(async (req, res) => {
  try {
    const result = await db.mcAll();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description get mastercategory from ID
 * @route GET /api/mastercategory/:id
 * @access private
 */
const getMasterCategory = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.mcFindByID(id);
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
 * @description update mastercategory against param id
 * @route PUT /api/mastercategory/:id
 * @access private
 */
const updateMasterCategory = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, userid } = req.body;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const mastercategory = await db.mcFindByID(id);
    if (mastercategory.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.mcUpdateByID(name, description, userid, id);

    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});
/**
 * @description delete mastercategory against param id
 * @route DELETE /api/mastercategory/:id
 * @access private
 */
const deleteMasterCategory = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { userid } = req.body;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const mastercategory = await db.mcFindByID(id);
    if (mastercategory.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }

    const slaveCategories = await dbSlave.scFindByMasterID(id);
    if (slaveCategories.length > 0) {
      return res.status(422).json({
        message: `Category ${id} has active secondary categories and cannot be deleted.`,
      });
    }

    const result = await db.mcDeleteByID(userid, id);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

module.exports = {
  deleteMasterCategory,
  updateMasterCategory,
  getMasterCategory,
  getMasterCategorys,
  createMasterCategory,
};
