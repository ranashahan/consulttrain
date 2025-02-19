const asyncHandler = require("express-async-handler");
const db = require("../dataBase/industriesQ");
const { constants } = require("../constants");
/**
 * @description Create a industries
 * @route POST /api/industries/create
 * @access private
 */
const createIndustries = asyncHandler(async (req, res) => {
  try {
    const { name, description, userid } = req.body;

    if (!name || !userid) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please fill in all fields (industry name and userid)",
      });
    }
    const [industries] = await db.industriesFind(name);
    if (industries) {
      return res
        .status(constants.CONFLICT)
        .json({ message: name + " industry already exists" });
    }

    const newindustries = await db.industriesCreate(name, description, userid);
    const industriesid = JSON.stringify(newindustries[0]);

    return res.status(constants.SUCCESS).json({
      message: `industries created successfully with ID: ${
        JSON.parse(industriesid).insertId
      }`,
    });
  } catch (error) {
    return res.status(constants.SERVER_ERROR).json({ message: error.message });
  }
});

/**
 * @description get all the industries
 * @route GET /api/industries/getAll
 * @access private
 */
const getIndustries = asyncHandler(async (req, res) => {
  try {
    const result = await db.industriesAll();
    return res.status(constants.SUCCESS).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description get industries from ID
 * @route GET /api/industries/:id
 * @access private
 */
const getIndustry = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.industriesFindByID(id);
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
 * @description update industries against param id
 * @route PUT /api/industries/:id
 * @access private
 */
const updateIndustries = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, userid } = req.body;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const industries = await db.industriesFindByID(id);
    if (industries.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.industriesUpdateByID(name, description, userid, id);

    return res.status(constants.CREATED).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description delete industries against param id
 * @route DELETE /api/industries/:id
 * @access private
 */
const deleteIndustries = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const industries = await db.industriesFindByID(id);
    if (industries.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.industriesDeleteByID(id);
    return res.status(constants.CREATED).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

module.exports = {
  deleteIndustries,
  updateIndustries,
  getIndustry,
  getIndustries,
  createIndustries,
};
