const pool = require("./db.js");

/**
 * This method for fetch id via supercategory
 * @param {string} name supercategory
 * @returns {result} result
 */
const spFind = async (name) => {
  const query = "select id from supercategory where name=? limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while supercategory find: " + error);
    return error;
  }
};

/**
 * This method use to fetch supercategory by ID
 * @param {string} id supercategory param id
 * @returns {result} result
 */
const spFindByID = async (id) => {
  const query = "select * from supercategory where id=? and active=1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while supercategory find by id: " + error);
    return error;
  }
};

/**
 * This method will update supercategory via id
 * @param {string} name supercategory name
 * @param {string} description supercategory name
 * @param {string} userid user userid as modified by
 * @param {int} id supercategory id
 * @returns {result} result
 */
const spUpdateByID = async (name, description, userid, id) => {
  const query =
    "UPDATE supercategory SET name=?,description=?, modifiedby=? where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name, description, userid, id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while supercategory update by ID: " + error);
    return error;
  }
};
/**
 * This method will delete supercategory via supercategory id
 * @param {string} id supercategory id
 * @returns {result} result
 */
const spDeleteByID = async (userid, id) => {
  const query = "UPDATE supercategory SET active=0, modifiedby=? where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [userid, id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while supercategory delete: " + error);
    return error;
  }
};

/**
 * This method for fetch all the supercategorys.
 * @returns {result} result
 */
const spAll = async () => {
  const query = "SELECT * FROM supercategory where active=1;";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while all supercategory: " + error);
    return error;
  }
};

/**
 * This method for create supercategory.
 * @param {string} name supercategory name
 * @param {string} description supercategory description
 * @param {string} userid user ID
 * @returns {result} result
 */
const spCreate = async (name, description, userid) => {
  const query =
    "INSERT INTO supercategory (name, description, createdby, modifiedby) VALUES(?,?,?,?)";
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
    console.error("error occurred while create supercategory: " + error);
    return error;
  }
};

module.exports = {
  spCreate,
  spAll,
  spDeleteByID,
  spUpdateByID,
  spFindByID,
  spFind,
};
