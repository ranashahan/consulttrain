const pool = require("./db.js");

/**
 * This method for fetch client id via client name
 * @param {string} name client
 * @returns {result} result
 */
const clientFind = async (name) => {
  const query = "select id from client where name=? limit 1";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while client find");
    return error;
  }
};

/**
 * This method use to fetch client by ID
 * @param {string} id client param id
 * @returns {result} result
 */
const clientFindByID = async (id) => {
  const query = "select * from client where id=?";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while client find by id");
    return error;
  }
};

/**
 * This method will update client via userid
 * @param {string} name
 * @param {string} contactperson
 * @param {string} contactnumber
 * @param {string} address
 * @param {string} website
 * @param {string} agentname
 * @param {string} agentnumber
 * @param {number} userid
 * @param {number} id
 * @returns {result} result
 */
const clientUpdateByID = async (
  name,
  contactperson,
  contactnumber,
  address,
  website,
  agentname,
  agentnumber,
  userid,
  id
) => {
  const query =
    "UPDATE client SET name=?, contactperson=?, contactnumber=?,address=?,website=?,agentname=?,agentnumber=?, modifiedby=? where id=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [
      name,
      contactperson,
      contactnumber,
      address,
      website,
      agentname,
      agentnumber,
      userid,
      id,
    ]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while client update by ID");
    return error;
  }
};
/**
 * This method will delete client via client id
 * @param {string} id client id
 * @returns {result} result
 */
const clientDeleteByID = async (id) => {
  const query = "DELETE FROM client where id=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while cliend delete by id");
    return error;
  }
};

/**
 * This method for fetch all the client.
 * @returns {result} result
 */
const clientAll = async () => {
  const query = "SELECT * FROM client;";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while all clients");
    return error;
  }
};

/**
 * This method for create client.
 * @param {string} name
 * @param {string} contactperson
 * @param {string} contactnumber
 * @param {string} address
 * @param {string} website
 * @param {string} agentname
 * @param {string} agentnumber
 * @param {number} userid user ID
 * @returns {result} result
 */
const clientCreate = async (
  name,
  contactperson,
  contactnumber,
  address,
  website,
  agentname,
  agentnumber,
  userid
) => {
  const query =
    "INSERT INTO client (name, contactperson, contactnumber,address,website,agentname,agentnumber, createdby, modifiedby) VALUES(?,?,?,?,?,?,?,?,?)";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [
      name,
      contactperson,
      contactnumber,
      address,
      website,
      agentname,
      agentnumber,
      userid,
      userid,
    ]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while create client");
    return error;
  }
};
module.exports = {
  clientCreate,
  clientAll,
  clientDeleteByID,
  clientUpdateByID,
  clientFindByID,
  clientFind,
};
