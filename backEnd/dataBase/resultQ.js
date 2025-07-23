const pool = require("./db.js");

/**
 * This method for fetch id via result
 * @param {string} name result
 * @returns {result} result
 */
const resultFind = async (name) => {
  const query = "select id from result where name=? limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while result find: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while result find by id: " + error);
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
const resultUpdateByID = async (name, description, userid, id) => {
  const query =
    "UPDATE result SET name=?, description=?, modifiedby=? where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name, description, userid, id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while result update by ID: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while result delete: " + error);
    return error;
  }
};

/**
 * This method for fetch all the results.
 * @returns {result} result
 */
const resultAll = async () => {
  const query = `CALL ${process.env.DATABASE}.getAllResults();`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0][0];
  } catch (error) {
    client.release();
    console.error("error occurred while all results: " + error);
    return error;
  }
};

/**
 * This method for create result.
 * @param {string} name result name
 * @param {string} description result description
 * @param {string} userid user ID
 * @returns {result} result
 */
const resultCreate = async (name, description, userid) => {
  const query =
    "INSERT INTO result (name, description, createdby, modifiedby) VALUES(?,?,?,?)";
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
    console.error("error occurred while create result: " + error);
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
