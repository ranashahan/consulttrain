const asyncHandler = require("express-async-handler");
const db = require("../dataBase/visualQ");
const { constants } = require("../constants");
/**
 * @description Create a visual
 * @route POST /api/visual/create
 * @access private
 */
const createVisual = asyncHandler(async (req, res) => {
  try {
    const { name, description, userid } = req.body;

    if (!name || !userid) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please fill in all fields (visual name and userid)",
      });
    }
    const [visual] = await db.visualFind(name);
    if (visual) {
      return res
        .status(constants.CONFLICT)
        .json({ message: name + " visual already exists" });
    }

    const newvisual = await db.visualCreate(name, description, userid);
    const visualid = JSON.stringify(newvisual[0]);

    return res.status(constants.SUCCESS).json({
      message: `visual created successfully with ID: ${
        JSON.parse(visualid).insertId
      }`,
    });
  } catch (error) {
    return res.status(constants.SERVER_ERROR).json({ message: error.message });
  }
});

/**
 * @description get all the visuals
 * @route GET /api/visual/getAll
 * @access private
 */
const getVisuals = asyncHandler(async (req, res) => {
  try {
    const result = await db.visualAll();
    return res.status(constants.SUCCESS).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description get visual from ID
 * @route GET /api/visual/:id
 * @access private
 */
const getVisual = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.visualFindByID(id);
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
 * @description update visual against param id
 * @route PUT /api/visual/:id
 * @access private
 */
const updateVisual = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, userid } = req.body;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const visual = await db.visualFindByID(id);
    if (visual.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.visualUpdateByID(name, description, userid, id);

    return res.status(constants.CREATED).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description delete visual against param id
 * @route DELETE /api/visual/:id
 * @access private
 */
const deleteVisual = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const visual = await db.visualFindByID(id);
    if (visual.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.visualDeleteByID(id);
    return res.status(constants.CREATED).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

module.exports = {
  deleteVisual,
  updateVisual,
  getVisual,
  getVisuals,
  createVisual,
};
