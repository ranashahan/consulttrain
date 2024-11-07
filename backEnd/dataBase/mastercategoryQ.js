const pool = require("./db.js");

/**
 * This method for fetch id via mastercategory
 * @param {string} name mastercategory
 * @returns {result} result
 */
const mcFind = async (name) => {
  const query = "select id from mastercategory where name=? limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while mastercategory find: " + error);
    return error;
  }
};

/**
 * This method use to fetch mastercategory by ID
 * @param {string} id mastercategory param id
 * @returns {result} result
 */
const mcFindByID = async (id) => {
  const query = "select * from mastercategory where id=? and active=1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while mastercategory find by id: " + error);
    return error;
  }
};

/**
 * This method will update mastercategory via id
 * @param {string} name mastercategory name
 * @param {string} description mastercategory name
 * @param {string} userid user userid as modified by
 * @param {int} id mastercategory id
 * @returns {result} result
 */
const mcUpdateByID = async (name, description, userid, id) => {
  const query =
    "UPDATE mastercategory SET name=?,description=?, modifiedby=? where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name, description, userid, id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while mastercategory update by ID: " + error);
    return error;
  }
};
/**
 * This method will delete mastercategory via mastercategory id
 * @param {string} id mastercategory id
 * @returns {result} result
 */
const mcDeleteByID = async (userid, id) => {
  const query = "UPDATE mastercategory SET active=0, modifiedby=? where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [userid, id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while mastercategory delete: " + error);
    return error;
  }
};

/**
 * This method for fetch all the mastercategorys.
 * @returns {result} result
 */
const mcAll = async () => {
  const query = "SELECT * FROM mastercategory where active=1;";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while all mastercategory: " + error);
    return error;
  }
};

/**
 * This method for create mastercategory.
 * @param {string} name mastercategory name
 * @param {string} description mastercategory description
 * @param {string} userid user ID
 * @returns {result} result
 */
const mcCreate = async (name, description, userid) => {
  const query =
    "INSERT INTO mastercategory (name, description, createdby, modifiedby) VALUES(?,?,?,?)";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [
      name,
      description,
      userid,
      userid,
    ]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while create mastercategory: " + error);
    return error;
  }
};

module.exports = {
  mcCreate,
  mcAll,
  mcDeleteByID,
  mcUpdateByID,
  mcFindByID,
  mcFind,
};
