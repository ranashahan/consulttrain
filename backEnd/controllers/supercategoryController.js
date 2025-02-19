const asyncHandler = require("express-async-handler");
const db = require("../dataBase/supercategoryQ");
const dbMaster = require("../dataBase/mastercategoryQ");
const { constants } = require("../constants");

/**
 * @description Create a supercategory
 * @route POST /api/super/create
 * @access private
 */
const createSuperCategory = asyncHandler(async (req, res) => {
  try {
    const { name, description, userid } = req.body;

    if (!name || !userid) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please fill in all fields (supercategory name and userid)",
      });
    }
    const [supercategory] = await db.spFind(name);
    if (supercategory) {
      return res
        .status(constants.CONFLICT)
        .json({ message: name + " supercategory already exists" });
    }

    const newsupercategory = await db.spCreate(name, description, userid);
    const supercategoryid = JSON.stringify(newsupercategory[0]);

    return res.status(constants.CREATED).json({
      message: `supercategory created successfully with ID: ${
        JSON.parse(supercategoryid).insertId
      }`,
    });
  } catch (error) {
    return res.status(constants.SERVER_ERROR).json({ message: error.message });
  }
});

/**
 * @description get all the supercategorys
 * @route GET /api/super/getAll
 * @access private
 */
const getSuperCategorys = asyncHandler(async (req, res) => {
  try {
    const result = await db.spAll();
    return res.status(constants.SUCCESS).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description get supercategory from ID
 * @route GET /api/super/:id
 * @access private
 */
const getSuperCategory = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.spFindByID(id);
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
 * @description update supercategory against param id
 * @route PUT /api/super/:id
 * @access private
 */
const updateSuperCategory = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, userid } = req.body;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const supercategory = await db.spFindByID(id);
    if (supercategory.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.spUpdateByID(name, description, userid, id);

    return res.status(constants.CREATED).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});
/**
 * @description delete supercategory against param id
 * @route DELETE /api/super/:id
 * @access private
 */
const deleteSuperCategory = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { userid } = req.body;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const supercategory = await db.spFindByID(id);
    if (supercategory.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }

    const masterCategories = await dbMaster.mcFindByID(id);
    if (masterCategories.length > 0) {
      return res.status(constants.CONFLICT).json({
        message: `Category ${id} has active master categories and cannot be deleted.`,
      });
    }

    const result = await db.spDeleteByID(userid, id);
    return res.status(constants.CREATED).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

module.exports = {
  deleteSuperCategory,
  updateSuperCategory,
  getSuperCategory,
  getSuperCategorys,
  createSuperCategory,
};
