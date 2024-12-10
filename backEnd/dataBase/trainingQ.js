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
  const query = "select * from training where id=? and active=1";
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
 * This method for search query
 * @param {string} req request
 * @returns {result} result
 */
const trainingAllTimeFrame = async (req) => {
  const client = await pool.getConnection();
  try {
    const {
      name,
      plandate,
      cource,
      category,
      clientid,
      contractorid,
      startDate,
      endDate,
    } = req.query;

    let query = `select id, name, cource, category, plandate, clientid, contractorid, trainerid, 
    total, amountreceived from training`;
    const conditions = [];
    if (name) {
      conditions.push(`name LIKE '%${name}%'`);
    }
    if (plandate) {
      conditions.push(`plandate = '${plandate}'`);
    }
    if (cource) {
      conditions.push(`cource = '${cource}'`);
    }
    if (category) {
      conditions.push(`category = '${category}'`);
    }
    if (clientid) {
      conditions.push(`clientid = '${clientid}'`);
    }
    if (contractorid) {
      conditions.push(`contractorid = '${contractorid}'`);
    }
    if (startDate) {
      conditions.push(
        `DATE(created_at) BETWEEN '${startDate}' AND '${endDate}' `
      );
    }
    if (conditions.length > 0) {
      query +=
        " WHERE " +
        conditions.join(" AND ") +
        "and active=1 order by created_at desc limit 200";
    }
    // console.log(query);
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
  cource,
  category,
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
  const query = `UPDATE training SET name=?, cource=?, category=?, plandate=?,  startdate=?, enddate=?, duration=?, titleid=?,
      clientid=?, contractorid=?, trainerid=?, trainingexpiry=?, invoicenumber=?, invoicedate=?, charges=?,
      transportation=?, miscexpense=?, tax=?, total=?, bank=?, cheque=?, amountreceived=?, requestedby=?,
      contactnumber=?, source=?, venue=?, locationid=?, status=?, classroom=?, assessment=?, commentry=?,
      modifiedby=? where id=?;`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [
      name,
      cource,
      category,
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
  cource,
  category,
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
  const query = `INSERT INTO training (name,cource,category,plandate,startdate,enddate,duration,titleid,clientid,contractorid,trainerid,trainingexpiry,
invoicenumber,invoicedate,charges,transportation,miscexpense,tax,total,bank,cheque,amountreceived,
requestedby,contactnumber,source,venue,locationid,status,classroom,assessment,commentry,createdby,modifiedby)
 VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [
      name,
      cource,
      category,
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

module.exports = {
  trainingCreate,
  trainingAll,
  trainingDeleteByID,
  trainingUpdateByID,
  trainingFindByID,
  trainingFind,
  trainingAllTimeFrame,
};