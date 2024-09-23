const asyncHandler = require("express-async-handler");
const db = require("../dataBase/ccQ");

/**
 * @description get cc from Contractor ID
 * @route GET /api/cc/:id
 * @access private
 */
const getByContractorID = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.ccFindByContractorID(id);
    if (!result.length > 0) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description get cc from Client ID
 * @route GET /api/cc/:id
 * @access private
 */
const getByClientID = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.ccFindByClientID(id);
    if (!result.length > 0) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    res.status(500);
  }
});
/**
 * @description get cc from Client ID
 * @route GET /api/cc/:id
 * @access private
 */
const getByBothIDs = asyncHandler(async (req, res) => {
  try {
    const { clientid, contractorid } = req.body;
    if (!clientid || !contractorid) {
      return res.status(422).json({
        message: "Please provide clientid and contractor id",
      });
    }
    const result = await db.ccFindBoth(clientid, contractorid);
    if (!result.length > 0) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    res.status(500);
  }
});

module.exports = {
  getByContractorID,
  getByClientID,
  getByBothIDs,
};
