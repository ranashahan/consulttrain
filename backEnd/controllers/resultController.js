const asyncHandler = require("express-async-handler");
const db = require("../dataBase/resultQ");

/**
 * @description Create a result
 * @route POST /api/result/create
 * @access private
 */
const createResult = asyncHandler(async (req, res) => {
  try {
    const { name, userid } = req.body;

    if (!name || !userid) {
      return res.status(422).json({
        message: "Please fill in all fields (location name and userid)",
      });
    }
    const [result] = await db.resultFind(name);
    if (result) {
      return res
        .status(409)
        .json({ message: name + " Location already exists" });
    }

    const newResult = await db.resultCreate(name, userid);
    const resultid = JSON.stringify(newResult[0]);

    return res.status(201).json({
      message: `Result created successfully with ID: ${
        JSON.parse(resultid).insertId
      }`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @description get all the results
 * @route GET /api/result/getAll
 * @access private
 */
const getResults = asyncHandler(async (req, res) => {
  try {
    const result = await db.resultAll();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description get result from ID
 * @route GET /api/result/:id
 * @access private
 */
const getResult = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.resultFindByID(id);
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
 * @description update result against param id
 * @route PUT /api/result/:id
 * @access private
 */
const updateResult = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, userid } = req.body;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const results = await db.resultFindByID(id);
    if (results.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.resultUpdateByID(name, userid, id);

    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});
/**
 * @description delete result against param id
 * @route DELETE /api/result/:id
 * @access private
 */
const deleteResult = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const results = await db.resultFindByID(id);
    if (results.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.resultDeleteByID(id);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

module.exports = {
  deleteResult,
  updateResult,
  getResult,
  getResults,
  createResult,
};
