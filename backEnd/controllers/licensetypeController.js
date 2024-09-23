const asyncHandler = require("express-async-handler");
const db = require("../dataBase/licensetypeQ");

/**
 * @description Create a licensetype
 * @route POST /api/dltype/create
 * @access private
 */
const createdltype = asyncHandler(async (req, res) => {
  try {
    const { type, userid } = req.body;

    if (!type || !userid) {
      return res.status(422).json({
        message: "Please fill in all fields (DLType and userid)",
      });
    }
    const [dltypeid] = await db.dlTypeFind(type);
    if (dltypeid) {
      return res.status(409).json({ message: type + " DLType already exists" });
    }

    const newDLtype = await db.dlTypeCreate(type, userid);
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
const getdltypes = asyncHandler(async (req, res) => {
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
const getdltype = asyncHandler(async (req, res) => {
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
const updatedltype = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { type, userid } = req.body;
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
    const result = await db.dlTypeUpdateByID(type, userid, id);

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
const deletedltype = asyncHandler(async (req, res) => {
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
  createdltype,
  getdltypes,
  deletedltype,
  updatedltype,
  getdltype,
};
