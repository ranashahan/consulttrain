const asyncHandler = require("express-async-handler");
const db = require("../dataBase/stageQ");

/**
 * @description Create a stage
 * @route POST /api/stage/create
 * @access private
 */
const createStage = asyncHandler(async (req, res) => {
  try {
    const { name, description, userid } = req.body;

    if (!name || !userid) {
      return res.status(422).json({
        message: "Please fill in all fields (stage name and userid)",
      });
    }
    const [stage] = await db.stageFind(name);
    if (stage) {
      return res.status(409).json({ message: name + " stage already exists" });
    }

    const newstage = await db.stageCreate(name, description, userid);
    const stageid = JSON.stringify(newstage[0]);

    return res.status(201).json({
      message: `stage created successfully with ID: ${
        JSON.parse(stageid).insertId
      }`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @description get all the stages
 * @route GET /api/stage/getAll
 * @access private
 */
const getStages = asyncHandler(async (req, res) => {
  try {
    const result = await db.stageAll();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description get stage from ID
 * @route GET /api/stage/:id
 * @access private
 */
const getStage = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.stageFindByID(id);
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
 * @description update stage against param id
 * @route PUT /api/stage/:id
 * @access private
 */
const updateStage = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, userid } = req.body;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const stage = await db.stageFindByID(id);
    if (stage.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.stageUpdateByID(name, description, userid, id);

    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description delete stage against param id
 * @route DELETE /api/stage/:id
 * @access private
 */
const deleteStage = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const stage = await db.stageFindByID(id);
    if (stage.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.stageDeleteByID(id);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

module.exports = {
  deleteStage,
  updateStage,
  getStage,
  getStages,
  createStage,
};
