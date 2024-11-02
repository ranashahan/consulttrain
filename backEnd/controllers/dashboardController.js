const asyncHandler = require("express-async-handler");
const db = require("../dataBase/dashboardQ");

/**
 * @description get all the Dashboards
 * @route GET /api/location/getLocationCount
 * @access private
 */
const getDashboardLocation = asyncHandler(async (req, res) => {
  try {
    const result = await db.dashboardLoactionCount();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description get all the Dashboards
 * @route GET /api/driver/dashboardcounts
 * @access private
 */
const getDashboardDriverCounts = asyncHandler(async (req, res) => {
  try {
    const result = await db.dashboardDriverSessionCount();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description get all the Dashboards
 * @route GET /api/driver/dashboardcounts
 * @access private
 */
const getDashboardTrainerCounts = asyncHandler(async (req, res) => {
  try {
    const result = await db.dashboardTrainSessionCount();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
});

module.exports = {
  getDashboardLocation,
  getDashboardDriverCounts,
  getDashboardTrainerCounts,
};
