const pool = require("./db.js");

/**
 * This method for fetch locations count for dashboard
 * @returns {result} result
 */
const dashboardLoactionCount = async () => {
  const query = `SELECT l.name AS location_name, COUNT(s.id) AS session_count FROM session s
JOIN location l ON s.locationid = l.id
GROUP BY l.name;`;
  //   console.log(email);
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while dashboard location count");
    return error;
  }
};
/**
 * This method for fetch count drivers & session yearly, monthly for dashboard
 * @returns {result} result
 */
const dashboardDriverSessionCount = async () => {
  const query = `CALL getdashboard_counts();`;
  //   console.log(email);
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query);
    client.release();
    return result[0][0];
  } catch (error) {
    console.log("error occurred while dashboard driver & session count");
    return error;
  }
};
/**
 * This method for fetch count trainer & session yearly, monthly for dashboard
 * @returns {result} result
 */
const dashboardTrainSessionCount = async () => {
  const query = `CALL getdashboard_Trainer();`;
  //   console.log(email);
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query);
    client.release();
    return result[0][0];
  } catch (error) {
    console.log("error occurred while dashboard driver & session count");
    return error;
  }
};

module.exports = {
  dashboardLoactionCount,
  dashboardDriverSessionCount,
  dashboardTrainSessionCount,
};
