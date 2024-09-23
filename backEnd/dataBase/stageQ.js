const pool = require("./db.js");

/**
 * This method for fetch id via stage
 * @param {string} name stage
 * @returns {stage} stage
 */
const stageFind = async (name) => {
  const query = "select id from stage where name=? limit 1";
  //   console.log(email);
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while stage find");
    return error;
  }
};

/**
 * This method use to fetch stage by ID
 * @param {string} id stage param id
 * @returns {stage} stage
 */
const stageFindByID = async (id) => {
  const query = "select * from stage where id=?";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while stage find by id");
    return error;
  }
};

/**
 * This method will update stage via userid
 * @param {string} name stage name
 * @param {string} userid user userid as modified by
 * @param {int} id stage id
 * @returns {stage} stage
 */
const stageUpdateByID = async (name, userid, id) => {
  const query = "UPDATE stage SET name=?, modifiedby=? where id=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name, userid, id]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while stage update by ID");
    return error;
  }
};
/**
 * This method will delete stage via stage id
 * @param {string} id stage id
 * @returns {stage} stage
 */
const stageDeleteByID = async (id) => {
  const query = "DELETE FROM stage where id=?";

  try {
    const client = await pool.pool.getConnection();
    const stage = await client.query(query, [id]);
    client.release();
    return stage;
  } catch (error) {
    console.log("error occurred while userfind");
    return error;
  }
};

/**
 * This method for fetch all the stages.
 * @returns {stage} stage
 */
const stageAll = async () => {
  const query = "SELECT * FROM stage;";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while all stage");
    return error;
  }
};

/**
 * This method for create stage.
 * @param {string} name stage name
 * @param {string} userid user ID
 * @returns {stage} stage
 */
const stageCreate = async (name, userid) => {
  const query = "INSERT INTO stage (name, createdby, modifiedby) VALUES(?,?,?)";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name, userid, userid]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while create stage");
    return error;
  }
};

module.exports = {
  stageCreate,
  stageAll,
  stageDeleteByID,
  stageUpdateByID,
  stageFindByID,
  stageFind,
};
