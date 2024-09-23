const pool = require("./db.js");

/**
 * This method for fetch id via result
 * @param {string} name result
 * @returns {result} result
 */
const resultFind = async (name) => {
  const query = "select id from result where name=? limit 1";
  //   console.log(email);
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while userfind");
    return error;
  }
};

/**
 * This method use to fetch result by ID
 * @param {string} id result param id
 * @returns {result} result
 */
const resultFindByID = async (id) => {
  const query = "select * from result where id=?";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while user find by id");
    return error;
  }
};

/**
 * This method will update result via userid
 * @param {string} name result name
 * @param {string} userid user userid as modified by
 * @param {int} id result id
 * @returns {result} result
 */
const resultUpdateByID = async (name, userid, id) => {
  const query = "UPDATE result SET name=?, modifiedby=? where id=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name, userid, id]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while user update by ID");
    return error;
  }
};
/**
 * This method will delete result via location id
 * @param {string} id result id
 * @returns {result} result
 */
const resultDeleteByID = async (id) => {
  const query = "DELETE FROM result where id=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while userfind");
    return error;
  }
};

/**
 * This method for fetch all the results.
 * @returns {result} result
 */
const resultAll = async () => {
  const query = "SELECT * FROM result;";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while all users");
    return error;
  }
};

/**
 * This method for create result.
 * @param {string} name result name
 * @param {string} userid user ID
 * @returns {result} result
 */
const resultCreate = async (name, userid) => {
  const query =
    "INSERT INTO result (name, createdby, modifiedby) VALUES(?,?,?)";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name, userid, userid]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while create user");
    return error;
  }
};

module.exports = {
  resultCreate,
  resultAll,
  resultDeleteByID,
  resultUpdateByID,
  resultFindByID,
  resultFind,
};
