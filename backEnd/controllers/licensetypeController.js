const asyncHandler = require("express-async-handler");
const db = require("../dataBase/licensetypeQ");

/**
 * @description Create a licensetype
 * @route POST /api/dltype/create
 * @access private
 */
const createDLType = asyncHandler(async (req, res) => {
  try {
    const { name, description, userid } = req.body;

    if (!name || !userid) {
      return res.status(422).json({
        message: "Please fill in all fields (DLType name and userid)",
      });
    }
    const [dltypeid] = await db.dlTypeFind(name);
    if (dltypeid) {
      return res.status(409).json({ message: name + " DLType already exists" });
    }

    const newDLtype = await db.dlTypeCreate(name, description, userid);
    const dlid = JSON.stringify(newDLtype[0]);

    return res.status(201).json({
      message: `Driver License type created successfully with ID: ${
        JSON.parse(dlid).insertId
      }`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @description get all the license types
 * @route GET /api/dltype/getAll
 * @access private
 */
const getDLTypes = asyncHandler(async (req, res) => {
  try {
    const result = await db.dlTypeAll();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description get license type from ID
 * @route GET /api/dltype/:id
 * @access private
 */
const getDLType = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.dlTypeFindByID(id);
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
 * @description update license type against param id
 * @route PUT /api/dltype/:id
 * @access private
 */
const updateDLType = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, userid } = req.body;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const dltype = await db.dlTypeFindByID(id);
    if (dltype.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.dlTypeUpdateByID(name, description, userid, id);

    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});
/**
 * @description delete license type against param id
 * @route DELETE /api/dltype/:id
 * @access private
 */
const deleteDLType = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const dltype = await db.dlTypeFindByID(id);
    if (dltype.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.dlTypeDeleteByID(id);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

module.exports = {
  createDLType,
  getDLTypes,
  deleteDLType,
  updateDLType,
  getDLType,
};
