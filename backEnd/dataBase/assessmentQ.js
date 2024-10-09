const pool = require("./db.js");

/**
 * This method for fetch all the assessments.
 * @returns {result} result
 */
const assessmentAll = async () => {
  const query = `SELECT 
      sc.id AS categoryId, 
      sc.name AS categoryName, 
      a.id AS activityId, 
      a.name AS activityName,
      sc.initials as categoryInitials,
      a.initials as activityInitials
    FROM slavecategory sc
    LEFT JOIN activity a ON sc.id = a.slavecategoryid
    and a.active = 1
    and sc.active=1;`;
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while all assessments");
    return error;
  }
};

module.exports = {
  assessmentAll,
};
