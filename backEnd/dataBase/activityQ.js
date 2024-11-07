const pool = require("./db.js");

/**
 * This method for fetch id via activity
 * @param {string} name activity
 * @returns {result} result
 */
const activityFind = async (name) => {
  const query = "select id from activity where name=? limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while activity find: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while activity find by id: " + error);
    return error;
  }
};
/**
 * This method use to fetch activity by slave ID
 * @param {number} id slave category id
 * @returns response
 */
const activityFindBySlaveID = async (id) => {
  const query = `select id,name,description,initials,orderid,slavecategoryid from activity 
    where slavecategoryid = ? and active=1 order by orderid asc`;
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
 * This method will update activity via id
 * @param {string} name activity name
 * @param {string} description activity description
 * @param {string} initials activity initials
 * @param {number} orderid activity orderid
 * @param {number} slavecategoryid slave category id
 * @param {string} userid user userid as modified by
 * @param {int} id activity id
 * @returns {result} result
 */
const activityUpdateByID = async (
  name,
  description,
  initials,
  orderid,
  slavecategoryid,
  userid,
  id
) => {
  const query =
    "UPDATE activity SET name=?,description=?,initials=?, orderid=?, slavecategoryid=?, modifiedby=? where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [
      name,
      description,
      initials,
      orderid,
      slavecategoryid,
      userid,
      id,
    ]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while activity update by ID: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [userid, id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while activity delete: " + error);
    return error;
  }
};

/**
 * This method for fetch all the activitys.
 * @returns {result} result
 */
const activityAll = async () => {
  const query = "SELECT * FROM activity where active=1;";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while all activitys: " + error);
    return error;
  }
};

/**
 * This method for create activity.
 * @param {string} name activity name
 * @param {string} description activity description
 * @param {string} initials activity initials
 * @param {number} orderid category orderid
 * @param {number} slavecategoryid slave category id
 * @param {number} userid user ID
 * @returns {result} result
 */
const activityCreate = async (
  name,
  description,
  initials,
  orderid,
  slavecategoryid,
  userid
) => {
  const query =
    "INSERT INTO activity (name, description,initials, orderid, slavecategoryid, createdby, modifiedby) VALUES(?,?,?,?,?,?,?)";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [
      name,
      description,
      initials,
      orderid,
      slavecategoryid,
      userid,
      userid,
    ]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while create activity: " + error);
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
