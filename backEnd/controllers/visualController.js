const asyncHandler = require("express-async-handler");
const db = require("../dataBase/visualQ");

/**
 * @description Create a visual
 * @route POST /api/visual/create
 * @access private
 */
const createVisual = asyncHandler(async (req, res) => {
  try {
    const { name, description, userid } = req.body;

    if (!name || !userid) {
      return res.status(422).json({
        message: "Please fill in all fields (visual name and userid)",
      });
    }
    const [visual] = await db.visualFind(name);
    if (visual) {
      return res.status(409).json({ message: name + " visual already exists" });
    }

    const newvisual = await db.visualCreate(name, description, userid);
    const visualid = JSON.stringify(newvisual[0]);

    return res.status(201).json({
      message: `visual created successfully with ID: ${
        JSON.parse(visualid).insertId
      }`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
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
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.visualFindByID(id);
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
 * @description update visual against param id
 * @route PUT /api/visual/:id
 * @access private
 */
const updateVisual = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, userid } = req.body;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const visual = await db.visualFindByID(id);
    if (visual.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.visualUpdateByID(name, description, userid, id);

    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
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
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const visual = await db.visualFindByID(id);
    if (visual.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.visualDeleteByID(id);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

module.exports = {
  deleteVisual,
  updateVisual,
  getVisual,
  getVisuals,
  createVisual,
};
