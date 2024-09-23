const pool = require("./db.js");

/**
 * This method for fetch id via visual
 * @param {string} name visual
 * @returns {visual} visual
 */
const visualFind = async (name) => {
  const query = "select id from visual where name=? limit 1";
  //   console.log(email);
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while visual find");
    return error;
  }
};

/**
 * This method use to fetch visual by ID
 * @param {string} id visual param id
 * @returns {visual} visual
 */
const visualFindByID = async (id) => {
  const query = "select * from visual where id=?";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while visual find by id");
    return error;
  }
};

/**
 * This method will update visual via userid
 * @param {string} name visual name
 * @param {string} userid user userid as modified by
 * @param {int} id visual id
 * @returns {visual} visual
 */
const visualUpdateByID = async (name, userid, id) => {
  const query = "UPDATE visual SET name=?, modifiedby=? where id=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name, userid, id]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while visual update by ID");
    return error;
  }
};
/**
 * This method will delete visual via visual id
 * @param {string} id visual id
 * @returns {visual} visual
 */
const visualDeleteByID = async (id) => {
  const query = "DELETE FROM visual where id=?";

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
 * This method for fetch all the visuals.
 * @returns {visual} visual
 */
const visualAll = async () => {
  const query = "SELECT * FROM visual;";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while all visual");
    return error;
  }
};

/**
 * This method for create visual.
 * @param {string} name visual name
 * @param {string} userid user ID
 * @returns {visual} visual
 */
const visualCreate = async (name, userid) => {
  const query =
    "INSERT INTO visual (name, createdby, modifiedby) VALUES(?,?,?)";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name, userid, userid]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while create visual");
    return error;
  }
};

module.exports = {
  visualCreate,
  visualAll,
  visualDeleteByID,
  visualUpdateByID,
  visualFindByID,
  visualFind,
};
