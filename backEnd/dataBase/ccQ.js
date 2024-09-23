const pool = require("./db.js");

/**
 * This method for fetch client and contractor relationship
 * @param {number} clientid client id
 * @param {number} contractorid  contactorid
 * @returns {result} result
 */
const ccFindBoth = async (clientid, contractorid) => {
  const query =
    "select * from client_contractor where client_id=? and contractor_id=?";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [clientid, contractorid]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while client_contractor find");
    return error;
  }
};

/**
 * This method for fetch all clients against clientid
 * @param {number} clientid client id
 * @returns {result} result
 */
const ccFindByClientID = async (clientid) => {
  const query = "select * from client_contractor where client_id=?";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [clientid]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while client_contractor find");
    return error;
  }
};

/**
 * This method for fetch all clients against contractorid
 * @param {number} contractorid contractor id
 * @returns {result} result
 */
const ccFindByContractorID = async (contractorid) => {
  const query = `select * from client_contractor where contractor_id=?`;
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [contractorid]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while client_contractor find");
    return error;
  }
};

/**
 * This method will delete client via client id
 * @param {Array.<number>} clientids client ids
 * @param {number} contractorid contractor id
 * @returns {result} result
 */
const ccDelete = async (clientids, contractorid) => {
  const relationships = clientids.map((clientid) => [clientid, contractorid]);
  const query =
    "DELETE FROM client_contractor WHERE (client_id, contractor_id) IN (?)";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [relationships]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while cc delete");
    return error;
  }
};
/**
 * This method will delete client via client id
 * @param {Array.<number>} clientids client ids
 * @returns {result} result
 */
const ccDeleteClients = async (clientids) => {
  const relationships = clientids.map((clientid) => [clientid]);
  const query = "DELETE FROM client_contractor WHERE (client_id) IN (?)";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [relationships]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while cc delete");
    return error;
  }
};
/**
 * This method will delete client via client id
 * @param {number} contractorid contractor id
 * @returns {result} result
 */
const ccDeleteByContractor = async (contractorid) => {
  const query = "DELETE FROM client_contractor WHERE contractor_id=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [contractorid]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while cc delete");
    return error;
  }
};

/**
 * This method for create client.
 * @param {Array} clientids client ids
 * @param {number} contractorid contractor id
 * @returns {result} result
 */
const ccCreate = async (clientids, contractorid) => {
  const relationships = clientids.map((clientid) => [clientid, contractorid]);

  const query =
    "INSERT INTO client_contractor (client_id, contractor_id) VALUES ?";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [relationships]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while create cc");
    return error;
  }
};
module.exports = {
  ccCreate,
  ccDeleteByContractor,
  ccDeleteClients,
  ccDelete,
  ccFindBoth,
  ccFindByClientID,
  ccFindByContractorID,
};
