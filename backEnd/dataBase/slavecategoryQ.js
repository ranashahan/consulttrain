const pool = require("./db.js");

/**
 * This method for fetch id via slavecategory
 * @param {string} name slavecategory
 * @returns {result} result
 */
const scFind = async (name) => {
  const query = "select id from slavecategory where name=? limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while slavecategory find: " + error);
    return error;
  }
};

/**
 * This method use to fetch slavecategory by ID
 * @param {string} id slavecategory param id
 * @returns {result} result
 */
const scFindByID = async (id) => {
  const query = "select * from slavecategory where id=? and active=1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while slavecategory find by id: " + error);
    return error;
  }
};

/**
 * This method use to fetch activity by slave ID
 * @param {number} id slave category id
 * @returns response
 */
const scFindByMasterID = async (id) => {
  const query =
    "select id,name,description,initials,orderid,mastercategoryid from slavecategory where mastercategoryid = ? and active=1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while activity find by slave id: " + error);
    return error;
  }
};

/**
 * This method will update slavecategory via id
 * @param {string} name slavecategory name
 * @param {string} description slavecategory description
 * @param {string} initials slavecategory initials
 * @param {number} orderid slavecategory orderid
 * @param {number} mastercategoryid master category id
 * @param {string} userid user userid as modified by
 * @param {int} id slavecategory id
 * @returns {result} result
 */
const scUpdateByID = async (
  name,
  description,
  initials,
  orderid,
  mastercategoryid,
  userid,
  id
) => {
  const query =
    "UPDATE slavecategory SET name=?, description=?, initials=?, orderid=?, mastercategoryid=?, modifiedby=? where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [
      name,
      description,
      initials,
      orderid,
      mastercategoryid,
      userid,
      id,
    ]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while slavecategory update by ID: " + error);
    return error;
  }
};
/**
 * This method will delete slavecategory via slavecategory id
 * @param {string} id slavecategory id
 * @returns {result} result
 */
const scDeleteByID = async (userid, id) => {
  const query = "UPDATE slavecategory SET active=0, modifiedby=? where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [userid, id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while slavecategory delete: " + error);
    return error;
  }
};

/**
 * This method for fetch all the slavecategorys.
 * @returns {result} result
 */
const scAll = async () => {
  const query = "SELECT * FROM slavecategory where active=1;";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while all slavecategorys: " + error);
    return error;
  }
};

/**
 * This method for create slavecategory.
 * @param {string} name slavecategory name
 * @param {string} description slavecategory description
 * @param {string} initials slavecategory initials
 * @param {number} orderid slavecategory orderid
 * @param {number} mastercategoryid master category id
 * @param {number} userid user ID
 * @returns {result} result
 */
const scCreate = async (
  name,
  description,
  initials,
  orderid,
  mastercategoryid,
  userid
) => {
  const query =
    "INSERT INTO slavecategory (name, description,initials,orderid, mastercategoryid, createdby, modifiedby) VALUES(?,?,?,?,?,?,?)";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [
      name,
      description,
      initials,
      orderid,
      mastercategoryid,
      userid,
      userid,
    ]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while slavecategory create: " + error);
    return error;
  }
};

module.exports = {
  scCreate,
  scAll,
  scDeleteByID,
  scUpdateByID,
  scFindByID,
  scFind,
  scFindByMasterID,
};
