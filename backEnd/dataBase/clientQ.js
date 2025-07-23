const pool = require("./db.js");

/**
 * This method for fetch client id via client name
 * @param {string} name client
 * @returns {result} result
 */
const clientFind = async (name) => {
  const query = "select id from client where name=? limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while client find: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while client find by id: " + error);
    return error;
  }
};

/**
 * This method will update client via userid
 * @param {string} name client name
 * @param {string} description client description
 * @param {string} contactperson client contact person
 * @param {string} contactnumber client contact person mobile
 * @param {string} address client address
 * @param {string} website client website
 * @param {string} agentname client agent name
 * @param {string} agentnumber client agent number
 * @param {number} userid user id
 * @param {number} id client id
 * @returns {result} result
 */
const clientUpdateByID = async (
  name,
  description,
  contactperson,
  contactnumber,
  address,
  website,
  agentname,
  agentnumber,
  industriesid,
  userid,
  id
) => {
  const query = `UPDATE client SET name=?,description=?, contactperson=?, contactnumber=?,
    address=?,website=?,agentname=?,agentnumber=?,industriesid=?, modifiedby=? where id=?`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [
      name,
      description,
      contactperson,
      contactnumber,
      address,
      website,
      agentname,
      agentnumber,
      industriesid,
      userid,
      id,
    ]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while client update by ID: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while cliend delete by id: " + error);
    return error;
  }
};

/**
 * This method for fetch all the client.
 * @returns {result} result
 */
const clientAll = async () => {
  const query = `CALL ${process.env.DATABASE}.getAllClients();`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0][0];
  } catch (error) {
    client.release();
    console.error("error occurred while all clients: " + error);
    return error;
  }
};

/**
 * This method for create client.
 * @param {string} name client name
 * @param {string} description client description
 * @param {string} contactperson client contact person
 * @param {string} contactnumber client contact person mobile
 * @param {string} address client address
 * @param {string} website client website
 * @param {string} agentname client agent name
 * @param {string} agentnumber client agent mobile
 * @param {number} userid user ID
 * @returns {result} result
 */
const clientCreate = async (
  name,
  description,
  contactperson,
  contactnumber,
  address,
  website,
  agentname,
  agentnumber,
  industriesid,
  userid
) => {
  const query = `INSERT INTO client (name, description, contactperson, contactnumber, address, 
  website, agentname, agentnumber, industriesid, createdby, modifiedby)
     VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [
      name,
      description,
      contactperson,
      contactnumber,
      address,
      website,
      agentname,
      agentnumber,
      industriesid,
      userid,
      userid,
    ]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while create client: " + error);
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
