const asyncHandler = require("express-async-handler");
const db = require("../dataBase/mastercategoryQ");
const dbSuper = require("../dataBase/supercategoryQ");
const dbSlave = require("../dataBase/slavecategoryQ");
const { constants } = require("../constants");
/**
 * @description Create a mastercategory
 * @route POST /api/mastercategory/create
 * @access private
 */
const createMasterCategory = asyncHandler(async (req, res) => {
  try {
    const { name, description, supercategoryid, orderid, userid } = req.body;

    if (!name || !supercategoryid || !userid) {
      return res.status(constants.UNPROCESSABLE).json({
        message:
          "Please fill in all fields (mastercategory name, supercategoryid and userid)",
      });
    }
    const [mastercategory] = await db.mcFind(name);
    if (mastercategory) {
      return res
        .status(constants.CONFLICT)
        .json({ message: name + " mastercategory already exists" });
    }

    const supercategory = await dbSuper.spFindByID(supercategoryid);
    if (supercategory < 1) {
      return res.status(constants.CONFLICT).json({
        message: `wrong supercategory (id ${supercategoryid}) provided`,
      });
    }

    const newmastercategory = await db.mcCreate(
      name,
      description,
      supercategoryid,
      orderid,
      userid
    );
    const mastercategoryid = JSON.stringify(newmastercategory[0]);

    return res.status(201).json({
      message: `mastercategory created successfully with ID: ${
        JSON.parse(mastercategoryid).insertId
      }`,
    });
  } catch (error) {
    return res.status(constants.SERVER_ERROR).json({ message: error.message });
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
    return res.status(constants.SUCCESS).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
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
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.mcFindByID(id);
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
 * @description update mastercategory against param id
 * @route PUT /api/mastercategory/:id
 * @access private
 */
const updateMasterCategory = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, supercategoryid, orderid, userid } = req.body;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const mastercategory = await db.mcFindByID(id);
    if (mastercategory.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.mcUpdateByID(
      name,
      description,
      supercategoryid,
      orderid,
      userid,
      id
    );

    return res.status(constants.CREATED).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
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
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const mastercategory = await db.mcFindByID(id);
    if (mastercategory.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }

    const slaveCategories = await dbSlave.scFindByMasterID(id);
    if (slaveCategories.length > 0) {
      return res.status(constants.CONFLICT).json({
        message: `Category ${id} has active secondary categories and cannot be deleted.`,
      });
    }

    const result = await db.mcDeleteByID(userid, id);
    return res.status(constants.SUCCESS).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

module.exports = {
  deleteMasterCategory,
  updateMasterCategory,
  getMasterCategory,
  getMasterCategorys,
  createMasterCategory,
};
