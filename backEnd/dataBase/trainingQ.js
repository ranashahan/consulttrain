const pool = require("./db.js");

/**
 * This method for fetch user via training
 * @param {string} name training
 * @returns {result} result
 */
const trainingFind = async (name) => {
  const query = "select id from training where name=? and active = 1 limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while training find: " + error);
    return error;
  }
};

/**
 * This method use to fetch training by ID
 * @param {string} id training param id
 * @returns {result} result
 */
const trainingFindByID = async (id) => {
  const query = "select id from training where id=? and active=1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while training find by id: " + error);
    return error;
  }
};
/**
 * This method use to fetch training by ID
 * @param {string} id training param id
 * @returns {result} result
 */
const trainingID = async (id) => {
  const query = "CALL `consulttrain`.`getTrainingByID`(?);";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0][0];
  } catch (error) {
    client.release();
    console.error("error occurred while training find by id: " + error);
    return error;
  }
};

/**
 * This method for search query
 * @param {string} req request
 * @returns {result} results
 */
const trainingAllTimeFrame = async (req) => {
  const client = await pool.getConnection();
  try {
    const {
      name,
      plandate,
      courseid,
      categoryid,
      clientid,
      contractorid,
      startDate,
      endDate,
    } = req.query;

    let query = `select id, name, plandate, enddate, courseid, categoryid,  clientid, contractorid, 
    trainerid, total, amountreceived, status, (select count(session_id) from training_session 
    where training_id  = id) as sessioncount 
    from training`;
    const conditions = [];
    if (name) {
      conditions.push(`name LIKE '%${name}%'`);
    }
    if (plandate) {
      conditions.push(`plandate = '${plandate}'`);
    }
    if (courseid) {
      conditions.push(`courseid = '${courseid}'`);
    }
    if (categoryid) {
      conditions.push(`category = '${categoryid}'`);
    }
    if (clientid) {
      conditions.push(`clientid = '${clientid}'`);
    }
    if (contractorid) {
      conditions.push(`contractorid = '${contractorid}'`);
    }
    if (startDate) {
      conditions.push(
        `DATE(plandate) BETWEEN '${startDate}' AND '${endDate}' `
      );
    }
    if (conditions.length > 0) {
      query +=
        " WHERE " +
        conditions.join(" AND ") +
        "and active=1 order by plandate desc limit 200";
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
 * This method will update training via userid
 * @param {string} name
 * @param {string} cource
 * @param {string} category
 * @param {Date} plandate
 * @param {Date} startdate
 * @param {Date} enddate
 * @param {string} duration
 * @param {number} titleid
 * @param {number} clientid
 * @param {number} contractorid
 * @param {number} trainerid
 * @param {Date} trainingexpiry
 * @param {string} invoicenumber
 * @param {Date} invoicedate
 * @param {number} charges
 * @param {number} transportation
 * @param {number} miscexpense
 * @param {number} tax
 * @param {number} total
 * @param {string} bank
 * @param {string} cheque
 * @param {number} amountreceived
 * @param {string} requestedby
 * @param {string} contactnumber
 * @param {string} source
 * @param {string} venue
 * @param {number} locationid
 * @param {string} status
 * @param {number} classroom
 * @param {number} assessment
 * @param {number} commentry
 * @param {number} userid user userid as modified by
 * @param {number} id training id
 * @returns {result} result
 */
const trainingUpdateByID = async (
  name,
  courseid,
  categoryid,
  plandate,
  startdate,
  enddate,
  duration,
  titleid,
  clientid,
  contractorid,
  trainerid,
  trainingexpiry,
  invoicenumber,
  invoicedate,
  charges,
  transportation,
  miscexpense,
  tax,
  total,
  bank,
  cheque,
  amountreceived,
  requestedby,
  contactnumber,
  source,
  venue,
  locationid,
  status,
  classroom,
  assessment,
  commentry,
  userid,
  id
) => {
  const query = `UPDATE training SET name=?, courseid=?, categoryid=?, plandate=?,  startdate=?, enddate=?, duration=?, titleid=?,
      clientid=?, contractorid=?, trainerid=?, trainingexpiry=?, invoicenumber=?, invoicedate=?, charges=?,
      transportation=?, miscexpense=?, tax=?, total=?, bank=?, cheque=?, amountreceived=?, requestedby=?,
      contactnumber=?, source=?, venue=?, locationid=?, status=?, classroom=?, assessment=?, commentry=?,
      modifiedby=? where id=?;`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [
      name,
      courseid,
      categoryid,
      plandate || null,
      startdate || null,
      enddate || null,
      duration,
      titleid,
      clientid,
      contractorid,
      trainerid,
      trainingexpiry || null,
      invoicenumber,
      invoicedate || null,
      charges,
      transportation,
      miscexpense,
      tax,
      total,
      bank,
      cheque,
      amountreceived,
      requestedby,
      contactnumber,
      source,
      venue,
      locationid,
      status,
      classroom,
      assessment,
      commentry,
      userid,
      id,
    ]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while training update by ID: " + error);
    return error;
  }
};
/**
 * This method will delete training via trainingid
 * @param {string} id trainingid
 * @returns {result} result
 */
const trainingDeleteByID = async (id) => {
  const query = "UPDATE training SET active=0 where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while training Delete By ID: " + error);
    return error;
  }
};

/**
 * This method for fetch all the training.
 * @returns {result} result
 */
const trainingAll = async () => {
  const query = "CALL `consulttrain`.`getAllTrainings`();";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0][0];
  } catch (error) {
    client.release();
    console.error("error occurred while all trainings: " + error);
    return error;
  }
};

/**
 * This method for create training.
 * @param {string} name
 * @param {string} cource
 * @param {string} category
 * @param {Date} plandate
 * @param {Date} startdate
 * @param {Date} enddate
 * @param {string} duration
 * @param {number} titleid
 * @param {number} clientid
 * @param {number} contractorid
 * @param {number} trainerid
 * @param {Date} trainingexpiry
 * @param {string} invoicenumber
 * @param {Date} invoicedate
 * @param {number} charges
 * @param {number} transportation
 * @param {number} miscexpense
 * @param {number} tax
 * @param {number} total
 * @param {string} bank
 * @param {string} cheque
 * @param {number} amountreceived
 * @param {string} requestedby
 * @param {string} contactnumber
 * @param {string} source
 * @param {string} venue
 * @param {number} locationid
 * @param {string} status
 * @param {number} classroom
 * @param {number} assessment
 * @param {number} commentry
 * @param {number} userid
 * @returns {result} result
 */
const trainingCreate = async (
  name,
  courseid,
  categoryid,
  plandate,
  startdate,
  enddate,
  duration,
  titleid,
  clientid,
  contractorid,
  trainerid,
  trainingexpiry,
  invoicenumber,
  invoicedate,
  charges,
  transportation,
  miscexpense,
  tax,
  total,
  bank,
  cheque,
  amountreceived,
  requestedby,
  contactnumber,
  source,
  venue,
  locationid,
  status,
  classroom,
  assessment,
  commentry,
  userid
) => {
  const query = `INSERT INTO training (name,courseid,categoryid,plandate,startdate,enddate,duration,titleid,clientid,contractorid,trainerid,trainingexpiry,
invoicenumber,invoicedate,charges,transportation,miscexpense,tax,total,bank,cheque,amountreceived,
requestedby,contactnumber,source,venue,locationid,status,classroom,assessment,commentry,createdby,modifiedby)
 VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [
      name,
      courseid,
      categoryid,
      plandate,
      startdate,
      enddate,
      duration,
      titleid,
      clientid,
      contractorid,
      trainerid,
      trainingexpiry,
      invoicenumber,
      invoicedate,
      charges,
      transportation,
      miscexpense,
      tax,
      total,
      bank,
      cheque,
      amountreceived,
      requestedby,
      contactnumber,
      source,
      venue,
      locationid,
      status,
      classroom,
      assessment,
      commentry,
      userid,
      userid,
    ]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while create training: " + error);
    return error;
  }
};

/**
 * This method will generate data for export report
 * @param {request} req
 * @returns {result} result
 */
const trainingReportAll = async (req) => {
  const client = await pool.getConnection();
  try {
    const {
      name,
      courseid,
      categoryid,
      clientid,
      contractorid,
      titleid,
      trainerid,
      locationid,
      source,
      status,
      startDate,
      endDate,
    } = req.query;
    let query = `select t.id,t.name,t.courseid,t.categoryid,t.plandate,t.startdate,t.enddate,t.duration,
                  t.titleid,t.clientid,t.contractorid,t.trainerid,t.trainingexpiry,t.invoicenumber,t.invoicedate,
                  t.charges,t.transportation,t.miscexpense,t.tax,t.total,t.amountreceived,t.bank,t.cheque,
                  t.requestedby, t.contactnumber,t.source,t.venue,t.locationid,t.status,
                  (select count(session_id) from training_session where training_id  = t.id) as sessioncount,
                  i.id as industriesid,p.username as createdby FROM training t 
                  LEFT JOIN users p on p.userid = t.createdby 
                  LEFT JOIN contractor c on c.id = t.contractorid
                  LEFT JOIN industries i on i.id = c.industriesid`;
    const conditions = [];
    if (courseid) {
      conditions.push(`t.courseid = '${courseid}'`);
    }
    if (categoryid) {
      conditions.push(`t.categoryid = '${categoryid}'`);
    }
    if (clientid) {
      conditions.push(`t.clientid = '${clientid}'`);
    }
    if (contractorid) {
      conditions.push(`t.contractorid = '${contractorid}'`);
    }
    if (name) {
      conditions.push(`t.name LIKE '%${name}%'`);
    }
    if (locationid) {
      conditions.push(`t.locationid = '${locationid}'`);
    }
    if (titleid) {
      conditions.push(`t.titleid = '${titleid}'`);
    }
    if (source) {
      conditions.push(`t.source = '${source}'`);
    }
    if (status) {
      conditions.push(`t.status = '${status}'`);
    }
    if (trainerid) {
      conditions.push(`t.trainerid = '${trainerid}'`);
    }
    if (startDate) {
      conditions.push(
        `DATE(t.created_at) BETWEEN '${startDate}' AND '${endDate}' `
      );
    }
    if (conditions.length > 0) {
      query +=
        " WHERE " +
        conditions.join(" AND ") +
        "and t.active = 1  order by t.plandate asc ";
    }

    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while training Report All: " + error);
    return error;
  }
};

/**
 * This method will generate data for export report
 * @param {request} req
 * @returns {result} result
 */
const trainingFinanceReport = async (req) => {
  const client = await pool.getConnection();
  try {
    const { month, year } = req.query;
    let query = `SELECT YEAR(t.plandate) AS year
	,MONTH(t.plandate) AS month
	,t.plandate
	,t.name
	,t.clientid
	,t.contractorid
	,t.charges
	,t.transportation
	,t.miscexpense
	,t.tax
	,t.total
	,t.amountreceived
	,t.invoicenumber
	,t.invoicedate
	,t.bank
	,t.cheque
FROM training t `;
    const conditions = [];
    if (month) {
      conditions.push(`MONTH(t.plandate) = ${month}`);
    }
    if (year) {
      conditions.push(`YEAR(t.plandate) = ${year}`);
    }
    if (conditions.length > 0) {
      query +=
        " WHERE " +
        conditions.join(" AND ") +
        " AND t.active = 1 ORDER BY MONTH(plandate); ";
    } else {
      client.release();
      return Error("Cannot divide by zero");
    }
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while training Finance Report: " + error);
    return error;
  }
};

module.exports = {
  trainingCreate,
  trainingAll,
  trainingDeleteByID,
  trainingUpdateByID,
  trainingFindByID,
  trainingID,
  trainingFind,
  trainingAllTimeFrame,
  trainingReportAll,
  trainingFinanceReport,
};
