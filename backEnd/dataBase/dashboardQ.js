const pool = require("./db.js");

/**
 * This method for fetch locations count for dashboard
 * @returns {result} result
 */
const dashboardLoactionCount = async () => {
  const query = `SELECT l.name AS location_name, COUNT(s.id) AS session_count FROM session s 
  JOIN location l ON s.locationid = l.id 
  where s.active = 1 
  GROUP BY l.name;`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    return result[0];
  } catch (error) {
    console.error("error occurred while dashboard location count: " + error);
    return error;
  } finally {
    client.release();
  }
};
/**
 * This method for fetch count drivers & session yearly, monthly for dashboard
 * @returns {result} result
 */
const dashboardDriverSessionCount = async () => {
  const query = `CALL getdashboard_counts();`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0][0];
  } catch (error) {
    client.release();
    console.error(
      "error occurred while dashboard driver & session count: " + error
    );
    return error;
  }
};
/**
 * This method for fetch count trainer & session yearly, monthly for dashboard
 * @returns {result} result
 */
const dashboardTrainSessionCount = async () => {
  const query = `CALL getdashboard_Trainer();`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0][0];
  } catch (error) {
    client.release();
    console.error(
      "error occurred while dashboard trainer & session count: " + error
    );
    return error;
  }
};

module.exports = {
  dashboardLoactionCount,
  dashboardDriverSessionCount,
  dashboardTrainSessionCount,
};
