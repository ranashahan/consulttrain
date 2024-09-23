const pool = require("./db.js");

/**
 * This method for fetch user via bloodgroup
 * @param {string} name blood group
 * @returns {result} result
 */
const bgFind = async (name) => {
  const query = "select id from bloodgroup where name=? limit 1";
  //   console.log(email);
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while bloodgroup find");
    return error;
  }
};

/**
 * This method use to fetch bloodgroup by ID
 * @param {string} id bloodgroup param id
 * @returns {result} result
 */
const bgFindByID = async (id) => {
  const query = "select * from bloodgroup where id=?";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while bloodgroup find by id");
    return error;
  }
};

/**
 * This method will update bloodgroup via userid
 * @param {string} name bloodgroup name
 * @param {string} userid user userid as modified by
 * @param {int} id bloodgroup id
 * @returns {result} result
 */
const bgUpdateByID = async (name, userid, id) => {
  const query = "UPDATE bloodgroup SET name=?, modifiedby=? where id=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name, userid, id]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while bloodgroup update by ID");
    return error;
  }
};
/**
 * This method will delete bloodgroup via bloodgroupid
 * @param {string} id bloodgroup id
 * @returns {result} result
 */
const bgDeleteByID = async (id) => {
  const query = "DELETE FROM bloodgroup  where id=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while delete bloodgroup");
    return error;
  }
};

/**
 * This method for fetch all the bloodgroups.
 * @returns {result} result
 */
const bgAll = async () => {
  const query = "CALL `consulttrain`.`getAllBloodGroup`();";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query);
    client.release();
    return result[0][0];
  } catch (error) {
    console.log("error occurred while all bloodgroups");
    return error;
  }
};

/**
 * This method for create bloodgroup.
 * @param {string} name bloodgroup name
 * @param {string} userid user ID
 * @returns {result} result
 */
const bgCreate = async (name, userid) => {
  const query =
    "INSERT INTO bloodgroup (name, createdby, modifiedby) VALUES(?,?,?)";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name, userid, userid]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while create bloodgroup");
    return error;
  }
};

module.exports = {
  bgFind,
  bgFindByID,
  bgUpdateByID,
  bgDeleteByID,
  bgAll,
  bgCreate,
};
