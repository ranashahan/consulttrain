const pool = require("./db.js");

/**
 * This method for fetch id via mastercategory
 * @param {string} name mastercategory
 * @returns {result} result
 */
const mcFind = async (name) => {
  const query = "select id from mastercategory where name=? limit 1";
  //   console.log(email);
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while mastercategory find");
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
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while mastercategory find by id");
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

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name, description, userid, id]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while mastercategory update by ID");
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

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [userid, id]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while mastercategory delete");
    return error;
  }
};

/**
 * This method for fetch all the mastercategorys.
 * @returns {result} result
 */
const mcAll = async () => {
  const query = "SELECT * FROM mastercategory where active=1;";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while all mastercategory");
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
    "INSERT INTO mastercategory (name,description, createdby, modifiedby) VALUES(?,?,?,?)";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [
      name,
      description,
      userid,
      userid,
    ]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while mastercategory user");
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
