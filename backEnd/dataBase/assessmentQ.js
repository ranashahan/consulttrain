const pool = require("./db.js");

/**
 * This method for fetch session info
 * @param {string} name session name
 * @returns {result} result
 */
const sessionFind = async (name) => {
  const query =
    "select id, name, sessiondate,createdby from session where name=? and active=1 limit 1";
  //   console.log(email);
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while session find");
    return error;
  }
};

/**
 * This method for search query
 * @param {string} req request
 * @returns {result} result
 */
const sessionAllTimeFrame = async (req) => {
  try {
    const {
      name,
      nic,
      sessiondate,
      contractorid,
      resultid,
      stageid,
      locationid,
      startDate,
      endDate,
    } = req.query;

    let query = `SELECT s.id, s.name, s.sessiondate,d.id as driverid, d.name as drivername, d.nic, d.contractorid, s.locationid, s.resultid, s.stageid, s.totalscore  
    FROM session s 
    join session_driver sd on sd.session_id = s.id 
    join driver d on sd.driver_id = d.id `;
    const conditions = [];
    if (nic) {
      conditions.push(`d.nic LIKE '%${nic}%'`);
    }
    if (sessiondate) {
      conditions.push(`s.sessiondate = '${sessiondate}'`);
    }
    if (name) {
      conditions.push(`s.name LIKE '%${name}%'`);
    }
    if (contractorid) {
      conditions.push(`d.contractorid = '${contractorid}'`);
    }
    if (resultid) {
      conditions.push(`s.resultid = '${resultid}'`);
    }
    if (locationid) {
      conditions.push(`s.locationid = '${locationid}'`);
    }
    if (stageid) {
      conditions.push(`s.stageid = '${stageid}'`);
    }
    if (startDate) {
      conditions.push(
        `DATE(s.created_at) BETWEEN '${startDate}' AND '${endDate}' `
      );
    }
    if (conditions.length > 0) {
      query +=
        " WHERE " +
        conditions.join(" AND ") +
        "and s.active=1 order by s.created_at desc limit 200";
    }
    const client = await pool.pool.getConnection();
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while driver search");
    return error;
  }
};

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

/**
 * This method for insert assessment form.
 * @param {string} sessionName
 * @param {Date} sessionDate
 * @param {number} locationId
 * @param {number} resultId
 * @param {number} stageId
 * @param {number} titleId
 * @param {number} vehicleId
 * @param {number} totalScore
 * @param {Date} classdate
 * @param {Date} yarddate
 * @param {string} weather
 * @param {string} traffic
 * @param {string} route
 * @param {number} createdUserId
 * @param {number} driverId
 * @param {Sting} trainerIds
 * @param {JSON} assessmentData
 * @returns {result} result
 */
const insertAssessment = async (
  sessionName,
  sessionDate,
  locationId,
  resultId,
  stageId,
  titleId,
  vehicleId,
  totalScore,
  classdate,
  yarddate,
  weather,
  traffic,
  route,
  createdUserId,
  driverId,
  trainerIds,
  assessmentData
) => {
  const params = [
    sessionName,
    sessionDate,
    locationId,
    resultId,
    stageId,
    titleId,
    vehicleId,
    totalScore,
    classdate,
    yarddate,
    weather,
    traffic,
    route,
    createdUserId,
    driverId,
    trainerIds,
    JSON.stringify(assessmentData), // Convert assessmentData to JSON string
  ];
  const query = `CALL insert_session_data(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, params);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while insert assessments");
    return error;
  }
};

/**
 * This method use to fetch session by ID
 * @param {string} id session param id
 * @returns {result} result
 */
const sessionFindByID = async (id) => {
  const query = "select * from vsession where id=? and active = 1";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while session find by id");
    return error;
  }
};

/**
 * This method will update session via userid
 * @param {string} name session name
 * @param {string} userid user userid as modified by
 * @param {int} id session id
 * @returns {result} result
 */
const sessionUpdateByID = async (name, userid, id) => {
  const query = "UPDATE session SET name=?, modifiedby=? where id=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name, userid, id]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while session update by ID");
    return error;
  }
};
/**
 * This method will delete session via sessionid
 * @param {string} id session id
 * @returns {result} result
 */
const sessionDeleteByID = async (id) => {
  const query = "UPDATE session SET active=0 where id=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while delete session");
    return error;
  }
};

module.exports = {
  assessmentAll,
  insertAssessment,
  sessionFind,
  sessionAllTimeFrame,
  sessionDeleteByID,
  sessionUpdateByID,
  sessionFindByID,
};
