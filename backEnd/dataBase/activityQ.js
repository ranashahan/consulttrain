const pool = require("./db.js");

/**
 * This method for fetch id via activity
 * @param {string} name activity
 * @returns {result} result
 */
const activityFind = async (name) => {
  const query = "select id from activity where name=? limit 1";
  //   console.log(email);
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while activity find");
    return error;
  }
};

/**
 * This method use to fetch activity by ID
 * @param {string} id activity param id
 * @returns {result} result
 */
const activityFindByID = async (id) => {
  const query = "select * from activity where id=? and active=1";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while activity find by id");
    return error;
  }
};
/**
 * This method use to fetch activity by slave ID
 * @param {number} id slave category id
 * @returns response
 */
const activityFindBySlaveID = async (id) => {
  const query =
    "select id,name,description,initials,slavecategoryid from activity where slavecategoryid = ? and active=1";
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
 * This method will update activity via id
 * @param {string} name activity name
 * @param {string} description activity description
 * @param {string} initials activity initials
 * @param {number} slavecategoryid slave category id
 * @param {string} userid user userid as modified by
 * @param {int} id activity id
 * @returns {result} result
 */
const activityUpdateByID = async (
  name,
  description,
  initials,
  slavecategoryid,
  userid,
  id
) => {
  const query =
    "UPDATE activity SET name=?,description=?,initials=?, slavecategoryid=?, modifiedby=? where id=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [
      name,
      description,
      initials,
      slavecategoryid,
      userid,
      id,
    ]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while activity update by ID");
    return error;
  }
};
/**
 * This method will delete activity via activity id
 * @param {string} id activity id
 * @returns {result} result
 */
const activityDeleteByID = async (userid, id) => {
  const query = "UPDATE activity SET active=0, modifiedby=? where id=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [userid, id]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while activity delete");
    return error;
  }
};

/**
 * This method for fetch all the activitys.
 * @returns {result} result
 */
const activityAll = async () => {
  const query = "SELECT * FROM activity where active=1;";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while all activitys");
    return error;
  }
};

/**
 * This method for create activity.
 * @param {string} name activity name
 * @param {string} description activity description
 * @param {string} initials activity initials
 * @param {number} mastercategoryid master category id
 * @param {number} userid user ID
 * @returns {result} result
 */
const activityCreate = async (
  name,
  description,
  initials,
  slavecategoryid,
  userid
) => {
  const query =
    "INSERT INTO activity (name, description,initials, slavecategoryid, createdby, modifiedby) VALUES(?,?,?,?,?,?)";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [
      name,
      description,
      initials,
      slavecategoryid,
      userid,
      userid,
    ]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while activity user");
    return error;
  }
};

module.exports = {
  activityCreate,
  activityAll,
  activityDeleteByID,
  activityUpdateByID,
  activityFindBySlaveID,
  activityFindByID,
  activityFind,
};
