const pool = require("./db.js");

/**
 * This method for fetch id via stage
 * @param {string} name stage
 * @returns {stage} stage
 */
const stageFind = async (name) => {
  const query = "select id from stage where name=? limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while stage find: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while stage find by id: " + error);
    return error;
  }
};

/**
 * This method will update stage via userid
 * @param {string} name stage name
 * @param {string} description stage description
 * @param {string} userid user userid as modified by
 * @param {int} id stage id
 * @returns {stage} stage
 */
const stageUpdateByID = async (name, description, userid, id) => {
  const query =
    "UPDATE stage SET name=?,description=?, modifiedby=? where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name, description, userid, id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.log("error occurred while stage update by ID: " + error);
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
  const client = await pool.getConnection();
  try {
    const stage = await client.query(query, [id]);
    client.release();
    return stage;
  } catch (error) {
    client.release();
    console.error("error occurred while userfind: " + error);
    return error;
  }
};

/**
 * This method for fetch all the stages.
 * @returns {stage} stage
 */
const stageAll = async () => {
  const query = "CALL `consulttrain`.`getAllStages`();";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0][0];
  } catch (error) {
    client.release();
    console.error("error occurred while all stage: " + error);
    return error;
  }
};

/**
 * This method for create stage.
 * @param {string} name stage name
 * @param {string} name stage description
 * @param {string} userid user ID
 * @returns {stage} stage
 */
const stageCreate = async (name, description, userid) => {
  const query =
    "INSERT INTO stage (name, description, createdby, modifiedby) VALUES(?,?,?,?)";
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
    console.error("error occurred while create stage: " + error);
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
