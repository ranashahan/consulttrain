const asyncHandler = require("express-async-handler");
const db = require("../dataBase/dashboardQ");
const { constants } = require("../constants");

/**
 * @description get all the Dashboards
 * @route GET /api/location/getLocationCount
 * @access private
 */
const getDashboardLocation = asyncHandler(async (req, res) => {
  try {
    const result = await db.dashboardLoactionCount();
    return res.status(constants.SUCCESS).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
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
    return res.status(constants.SUCCESS).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description get all the Dashboards
 * @route GET /api/driver/dashboardcounts
 * @access private
 */
const getDashboardTrainerCounts = asyncHandler(async (req, res) => {
  try {
    const rows = await db.dashboardTrainSessionCount();
    if (!rows.length) {
      return res.status(constants.NOCONTENT).json({
        message: `Could not find any result`,
      });
    }

    // Step 1: Get unique trainer names
    const trainerNames = [...new Set(rows.map((row) => row.name))];

    // Step 2: Initialize 12-month categories
    const categories = Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString("en", { month: "short" })
    );

    // Step 3: Initialize trainer-wise data with 0 for each month
    const groupedData = {};
    trainerNames.forEach((name) => {
      groupedData[name] = Array(12).fill(0);
    });

    // Step 4: Populate actual session counts
    rows.forEach((row) => {
      const monthIndex = row.month - 1;
      groupedData[row.name][monthIndex] = row.session_count;
    });

    // Step 5: Convert to ApexCharts series format
    const series = trainerNames.map((name) => ({
      name: name,
      data: groupedData[name],
    }));

    // Final response
    return res.status(constants.SUCCESS).json({ categories, series });
  } catch (error) {
    console.error(error);
    return res.status(constants.SERVER_ERROR).json({ message: "Server error" });
  }
});

module.exports = {
  getDashboardLocation,
  getDashboardDriverCounts,
  getDashboardTrainerCounts,
};
