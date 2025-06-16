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
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while session find: " + error);
    return error;
  }
};
/**
 * This method for fetch Session froms count
 * @returns {result} result
 */
const sessionCountReportForms = async () => {
  const query = `SELECT 
        MONTH(s.sessiondate) AS month, 
        s.formid,
        COUNT(*) AS session_count
    FROM session s
    WHERE YEAR(s.sessiondate) = YEAR(CURDATE()) AND s.active = 1
    GROUP BY month, s.formid
    ORDER BY month, s.formid;`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while session count forms: " + error);
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

    let query = `SELECT s.id, s.name, s.sessiondate,d.id as driverid, d.name as drivername, 
    d.nic, d.permitnumber, d.permitissue, d.permitexpiry, c.id as contractorid, s.titleid, s.locationid, 
    s.resultid, s.stageid, s.totalscore  
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
        `DATE(s.sessiondate) BETWEEN '${startDate}' AND '${endDate}' `
      );
    }
    if (conditions.length > 0) {
      query +=
        " WHERE " +
        conditions.join(" AND ") +
        "and s.active=1 order by s.sessiondate desc limit 400";
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
const sessionReportAll = async (req) => {
  const client = await pool.getConnection();
  try {
    const {
      name,
      licensetypeid,
      bloodgroupid,
      visualid,
      locationid,
      resultid,
      stageid,
      vehicleid,
      titleid,
      trainerid,
      contractorid,
      startDate,
      endDate,
    } = req.query;
    let query = `SELECT d.id AS driverid
	,d.name AS drivername
	,d.gender
	,d.dob
	,d.nic
	,d.nicexpiry
	,d.licensenumber
	,d.licensetypeid
	,d.licenseexpiry
	,d.licenseverified
	,d.designation
	,d.department
	,d.permitnumber
	,d.permitissue
	,d.permitexpiry
	,d.medicalexpiry
	,d.bloodgroupid
	,d.contractorid AS drivercontractorid
	,d.visualid
	,d.ddccount
	,d.experience
	,d.code
	,d.comment AS drivercomment
	,s.id AS sessionid
	,s.name AS sessioname
	,s.sessiondate
	,s.locationid
	,s.resultid
	,s.stageid
	,s.titleid
	,s.vehicleid
	,s.classdate
	,s.yarddate
	,s.weather
	,s.traffic
	,s.route
  ,s.riskrating
	,s.quizscore
	,s.comment AS sessioncomment
	,c.id AS sessioncontractorid
	,t.id AS trainerid
  ,s.formid
FROM session s
JOIN session_driver sd ON sd.session_id = s.id
LEFT JOIN driver d ON d.id = sd.driver_id
LEFT JOIN session_contractor sc ON sc.session_id = s.id
LEFT JOIN session_trainer st ON st.session_id = s.id
LEFT JOIN trainer t ON t.id = st.trainer_id
LEFT JOIN contractor c ON c.id = sc.contractor_id`;
    const conditions = [];
    if (licensetypeid) {
      conditions.push(`d.licensetypeid = '${licensetypeid}'`);
    }
    if (bloodgroupid) {
      conditions.push(`d.bloodgroupid = '${bloodgroupid}'`);
    }
    if (visualid) {
      conditions.push(`d.visualid = '${visualid}'`);
    }
    if (contractorid) {
      conditions.push(`sc.contractor_id = '${contractorid}'`);
    }
    if (name) {
      conditions.push(`s.name LIKE '%${name}%'`);
    }
    if (locationid) {
      conditions.push(`s.locationid = '${locationid}'`);
    }
    if (resultid) {
      conditions.push(`s.resultid = '${resultid}'`);
    }
    if (titleid) {
      conditions.push(`s.titleid = '${titleid}'`);
    }
    if (stageid) {
      conditions.push(`s.stageid = '${stageid}'`);
    }
    if (vehicleid) {
      conditions.push(`s.vehicleid = '${vehicleid}'`);
    }
    if (trainerid) {
      conditions.push(`st.trainer_id = '${trainerid}'`);
    }
    if (startDate) {
      conditions.push(
        `DATE(s.sessiondate) BETWEEN '${startDate}' AND '${endDate}' `
      );
    }
    if (conditions.length > 0) {
      query +=
        " WHERE " +
        conditions.join(" AND ") +
        "and s.active = 1 and d.active = 1  order by s.sessiondate asc ";
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
    const { name, clientid, contractorid, startDate, endDate } = req.query;

    let query = `SELECT * from vsession`;
    const conditions = [];
    if (name) {
      conditions.push(`name LIKE '%${name}%'`);
    }
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
    sp.id as supercategory_id,
    sp.name as supercategory_name,
    mc.id AS mastercategory_id,
    mc.name AS mastercategory_name,
    sc.id AS slavecategory_id,
    sc.name AS slavecategory_name,
    sc.initials as slavecategory_initials,
    a.id AS activity_id,
    a.name AS activity_name,
    a.initials as activity_initials
FROM 
    supercategory sp
JOIN
    mastercategory mc ON sp.id = mc.supercategoryid
JOIN 
    slavecategory sc ON mc.id = sc.mastercategoryid
JOIN 
    activity a ON sc.id = a.slavecategoryid
WHERE 
sp.active = 1 and
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
 * This method for fetch all the sessions.
 * @returns {result} result
 */
const sessionAll = async () => {
  const query = "CALL `consulttrain`.`getAllSessions`();";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0][0];
  } catch (error) {
    client.release();
    console.error("error occurred while all sessions: " + error);
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
 * @param {string} riskrating
 * @param {number} createdUserId
 * @param {number} driverId
 * @param {Sting} trainerIds
 * @param {JSON} assessmentData
 * @returns {result} result
 */
const insertAssessment = async (
  formid,
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
  riskrating,
  quizscore,
  comment,
  createdUserId,
  driverId,
  trainerid,
  contractorid,
  assessmentData
) => {
  const params = [
    formid,
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
    riskrating,
    quizscore,
    comment,
    createdUserId,
    driverId,
    trainerid,
    contractorid,
    JSON.stringify(assessmentData), // Convert assessmentData to JSON string
  ];
  const query = `CALL insert_session_data(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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
  riskrating,
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
    classdate || null,
    yarddate || null,
    weather,
    traffic,
    route,
    riskrating,
    quizscore,
    comment,
    userid,
    JSON.stringify(assessmentData), // Convert assessmentData to JSON string
  ];
  const query = `CALL update_session_data(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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
  sessionReportTimeFrame,
  sessionReportAll,
  sessionAll,
  sessionCountReportForms,
};
