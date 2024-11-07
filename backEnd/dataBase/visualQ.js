const pool = require("./db.js");

/**
 * This method for fetch id via visual
 * @param {string} name visual
 * @returns {visual} visual
 */
const visualFind = async (name) => {
  const query = "select id from visual where name=? limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while visual find: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while visual find by id: " + error);
    return error;
  }
};

/**
 * This method will update visual via userid
 * @param {string} name visual name
 * @param {string} description visual description
 * @param {string} userid user userid as modified by
 * @param {int} id visual id
 * @returns {visual} visual
 */
const visualUpdateByID = async (name, description, userid, id) => {
  const query =
    "UPDATE visual SET name=?, description=?, modifiedby=? where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name, description, userid, id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while visual update by ID: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while visual delete: " + error);
    return error;
  }
};

/**
 * This method for fetch all the visuals.
 * @returns {visual} visual
 */
const visualAll = async () => {
  const query = "SELECT * FROM visual;";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while all visual: " + error);
    return error;
  }
};

/**
 * This method for create visual.
 * @param {string} name visual name
 * @param {string} description visual description
 * @param {string} userid user ID
 * @returns {visual} visual
 */
const visualCreate = async (name, description, userid) => {
  const query =
    "INSERT INTO visual (name, description, createdby, modifiedby) VALUES(?,?,?,?)";
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
    console.error("error occurred while create visual: " + error);
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
