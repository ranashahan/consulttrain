const pool = require("./db.js");

/**
 * This method for fetch id via slavecategory
 * @param {string} name slavecategory
 * @returns {result} result
 */
const scFind = async (name) => {
  const query = "select id from slavecategory where name=? limit 1";
  //   console.log(email);
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while slavecategory find");
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
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while slavecategory find by id");
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
    "select id,name,description,initials,mastercategoryid from slavecategory where mastercategoryid = ? and active=1";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while activity find by slave id");
    return error;
  }
};

/**
 * This method will update slavecategory via id
 * @param {string} name slavecategory name
 * @param {string} description slavecategory description
 * @param {string} initials slavecategory initials
 * @param {number} mastercategoryid master category id
 * @param {string} userid user userid as modified by
 * @param {int} id slavecategory id
 * @returns {result} result
 */
const scUpdateByID = async (
  name,
  description,
  initials,
  mastercategoryid,
  userid,
  id
) => {
  const query =
    "UPDATE slavecategory SET name=?,description=?,initials=?, mastercategoryid=?, modifiedby=? where id=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [
      name,
      description,
      initials,
      mastercategoryid,
      userid,
      id,
    ]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while slavecategory update by ID");
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

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [userid, id]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while slavecategory delete");
    return error;
  }
};

/**
 * This method for fetch all the slavecategorys.
 * @returns {result} result
 */
const scAll = async () => {
  const query = "SELECT * FROM slavecategory where active=1;";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while all slavecategorys");
    return error;
  }
};

/**
 * This method for create slavecategory.
 * @param {string} name slavecategory name
 * @param {string} description slavecategory description
 * @param {string} initials slavecategory initials
 * @param {number} mastercategoryid master category id
 * @param {number} userid user ID
 * @returns {result} result
 */
const scCreate = async (
  name,
  description,
  initials,
  mastercategoryid,
  userid
) => {
  const query =
    "INSERT INTO slavecategory (name, description,initials, mastercategoryid, createdby, modifiedby) VALUES(?,?,?,?,?,?)";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [
      name,
      description,
      initials,
      mastercategoryid,
      userid,
      userid,
    ]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while slavecategory create");
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
