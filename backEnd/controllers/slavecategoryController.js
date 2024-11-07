const asyncHandler = require("express-async-handler");
const db = require("../dataBase/slavecategoryQ");
const dbMaster = require("../dataBase/mastercategoryQ");
const dbActivity = require("../dataBase/activityQ");

/**
 * @description Create a slavecategory
 * @route POST /api/slavecategory/create
 * @access private
 */
const createSlaveCategory = asyncHandler(async (req, res) => {
  try {
    const { name, description, initials, orderid, mastercategoryid, userid } =
      req.body;

    if (!name || !mastercategoryid || !userid) {
      return res.status(422).json({
        message:
          "Please fill in all fields (slavecategory name, mastercategoryid and userid)",
      });
    }
    const [slavecategory] = await db.scFind(name);
    if (slavecategory) {
      return res
        .status(409)
        .json({ message: name + " slavecategory already exists" });
    }

    const mastercategory = await dbMaster.mcFindByID(mastercategoryid);
    if (mastercategory < 1) {
      return res.status(409).json({
        message: `wrong mastercategoryid (id ${mastercategoryid}) provided`,
      });
    }

    const newslavecategory = await db.scCreate(
      name,
      description,
      initials,
      orderid,
      mastercategoryid,
      userid
    );
    const slavecategoryid = JSON.stringify(newslavecategory[0]);

    return res.status(201).json({
      message: `slavecategory created successfully with ID: ${
        JSON.parse(slavecategoryid).insertId
      }`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @description get all the slavecategorys
 * @route GET /api/slavecategory/getAll
 * @access private
 */
const getSlaveCategories = asyncHandler(async (req, res) => {
  try {
    const result = await db.scAll();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description get slavecategory from ID
 * @route GET /api/slavecategory/:id
 * @access private
 */
const getSlaveCategory = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.scFindByID(id);
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
 * @description update slavecategory against param id
 * @route PUT /api/slavecategory/:id
 * @access private
 */
const updateSlaveCategory = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, initials, orderid, mastercategoryid, userid } =
      req.body;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const slavecategory = await db.scFindByID(id);
    if (slavecategory.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }

    const mastercategory = await dbMaster.mcFindByID(mastercategoryid);
    if (mastercategory < 1) {
      return res.status(409).json({
        message: `wrong mastercategoryid (id ${mastercategoryid}) provided`,
      });
    }

    const result = await db.scUpdateByID(
      name,
      description,
      initials,
      orderid,
      mastercategoryid,
      userid,
      id
    );

    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});
/**
 * @description delete slavecategory against param id
 * @route DELETE /api/slavecategory/:id
 * @access private
 */
const deleteSlaveCategory = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { userid } = req.body;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const slavecategory = await db.scFindByID(id);
    if (slavecategory.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }

    const activities = await dbActivity.activityFindBySlaveID(id);
    if (activities.length > 0) {
      return res.status(422).json({
        message: `Category ${id} has active activities and cannot be deleted.`,
      });
    }

    const result = await db.scDeleteByID(userid, id);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

module.exports = {
  deleteSlaveCategory,
  updateSlaveCategory,
  getSlaveCategory,
  getSlaveCategories,
  createSlaveCategory,
};
