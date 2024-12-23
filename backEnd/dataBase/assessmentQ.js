const pool = require("./db.js");

/**
 * This method for fetch session info
 * @param {string} name session name
 * @returns {result} result
 */
const sessionFind = async (name) => {
  const query =
    "select id, name, sessiondate,createdby from session where name=? and active=1 limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while session find: " + error);
    return error;
  }
};
/**
 * This method for fetch training_session info
 * @param {number*} trainingId
 * @param {Array} sessionIds
 * @returns {result} result
 */
const sessionTrainingFind = async (trainingId, sessionIds) => {
  const query =
    "SELECT session_id FROM training_session WHERE training_id = ? AND session_id IN (?);";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [trainingId, sessionIds]);
    console.log(result[0]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while session find: " + error);
    return error;
  }
};

/**
 * This method for search query
 * @param {string} req request
 * @returns {result} result
 */
const sessionAllTimeFrame = async (req) => {
  const client = await pool.getConnection();
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

    let query = `SELECT s.id, s.name, s.sessiondate,d.id as driverid, d.name as drivername, d.nic, c.id as contractorid, s.locationid, s.resultid, s.stageid, s.totalscore  
    FROM session s 
    join session_driver sd on sd.session_id = s.id 
    join driver d on sd.driver_id = d.id 
    LEFT JOIN session_contractor sc on sc.session_id = s.id
    LEFT JOIN contractor c on sc.contractor_id = c.id`;
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
      conditions.push(`c.id = '${contractorid}'`);
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

    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error(
      "error occurred while session All Time Frame search: " + error
    );
    return error;
  }
};

/**
 * This method for search query
 * @param {string} req request
 * @returns {result} result
 */
const sessionReportTimeFrame = async (req) => {
  const client = await pool.getConnection();
  try {
    const { clientid, contractorid, startDate, endDate } = req.query;
    console.log(req.query);

    let query = `SELECT * from vsession`;
    const conditions = [];
    if (clientid) {
      conditions.push(`clientid = '${clientid}'`);
    }
    if (contractorid) {
      conditions.push(`contractorid = '${contractorid}'`);
    }
    if (startDate) {
      conditions.push(
        `DATE(sessiondate) BETWEEN '${startDate}' AND '${endDate}' `
      );
    }
    if (conditions.length > 0) {
      query +=
        " WHERE " +
        conditions.join(" AND ") +
        "and active=1 order by sessiondate asc ";
    }

    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error(
      "error occurred while session All Time Frame search: " + error
    );
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
      a.orderid as activityOrder,
      sc.initials as categoryInitials,
      a.initials as activityInitials
    FROM slavecategory sc
    LEFT JOIN activity a ON sc.id = a.slavecategoryid
    where a.active = 1
    and sc.active = 1 
    ORDER BY 
    sc.orderid ASC, 
    a.orderid ASC;`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while all assessments: " + error);
    return error;
  }
};

const assessmentAllExp = async () => {
  const query = `SELECT 
    mc.id AS mastercategory_id,
    mc.name AS mastercategory_name,
    sc.id AS slavecategory_id,
    sc.name AS slavecategory_name,
    sc.initials as slavecategory_initials,
    a.id AS activity_id,
    a.name AS activity_name,
    a.initials as activity_initials
FROM 
    mastercategory mc
JOIN 
    slavecategory sc ON mc.id = sc.mastercategoryid
JOIN 
    activity a ON sc.id = a.slavecategoryid
WHERE 
mc.active = 1 and
sc.active = 1 and
a.active = 1
ORDER BY 
    sc.orderid, a.orderid;`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while all assessments: " + error);
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
  quizscore,
  comment,
  createdUserId,
  driverId,
  trainerid,
  contractorid,
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
    quizscore,
    comment,
    createdUserId,
    driverId,
    trainerid,
    contractorid,
    JSON.stringify(assessmentData), // Convert assessmentData to JSON string
  ];
  const query = `CALL insert_session_data(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, params);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while insert assessments: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while session find by id: " + error);
    return error;
  }
};

/**
 * This method use to fetch session by ID
 * @param {string} id session param id
 * @returns {result} result
 */
const sessionFindByTrainingID = async (trainingid) => {
  const query = `select driverid, drivername, nic, licensenumber,licensetypeid,licenseexpiry,licenseverified,drivercontractorid, 
    permitnumber,permitexpiry,drivercode,trainername,id,name,sessiondate,titleid,vehicleid,resultid 
    from vsession where id in (select session_id from training_session where training_id = ?) and active = 1`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [trainingid]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while session find by id: " + error);
    return error;
  }
};

/**
 * This method will fetch relationship table
 * @param {number} trainingid
 * @param {number} sessionid
 * @returns {result} result
 */
const trainingSessionFind = async (trainingid, sessionid) => {
  const query = `select * from training_session where training_id = ? and session_id = ?;`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [trainingid, sessionid]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while session find by id: " + error);
    return error;
  }
};

/**
 * This method will delete training session
 * @param {number} trainingid
 * @param {number} sessionid
 * @returns {result} result
 */
const sessionTrainingDelete = async (trainingid, sessionid) => {
  const query = `DELETE FROM training_session WHERE training_id = ? and session_id = ?;`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [trainingid, sessionid]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while session find by id: " + error);
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
const sessionUpdateByID = async (
  id,
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
  quizscore,
  comment,
  userid,
  assessmentData
) => {
  const params = [
    id,
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
    quizscore,
    comment,
    userid,
    JSON.stringify(assessmentData), // Convert assessmentData to JSON string
  ];
  const query = `CALL update_session_data(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, params);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while session update by ID: " + error);
    return error;
  }
};
/**
 * This method will delete session via sessionid
 * @param {string} id session id
 * @returns {result} result
 */
const sessionDeleteByID = async (id) => {
  const query = "CALL delete_session_data(?);";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while delete session: " + error);
    return error;
  }
};

/**
 * This metod will insert training_session records
 * @param {number} trainingId training id
 * @param {Array} sessionIds array of session ids
 * @returns
 */
const insertSessionWithTraining = async (trainingId, sessionIds) => {
  const values = sessionIds.map((sessionId) => [trainingId, sessionId]);
  console.log(values);
  const query =
    "INSERT INTO training_session (training_id, session_id) VALUES ?;";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [values]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while delete session: " + error);
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
  sessionTrainingFind,
  insertSessionWithTraining,
  sessionFindByTrainingID,
  sessionTrainingDelete,
  trainingSessionFind,
  assessmentAllExp,
  sessionReportTimeFrame,
};
