const pool = require("./db.js");

/**
 * This method for fetch dltype via type
 * @param {string} type dl type
 * @returns {result} result
 */
const dlTypeFind = async (type) => {
  const query = "select id from licensetype where type=? limit 1";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [type]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while userfind");
    return error;
  }
};

/**
 * This method use to fetch DL type by ID
 * @param {string} id licensetype param id
 * @returns {result} result
 */
const dlTypeFindByID = async (id) => {
  const query = "select * from licensetype where id=?";
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
 * This method will update DL Type by ID
 * @param {string} type DL type
 * @param {string} userid user userid as modified by
 * @param {int} id licensetype id
 * @returns {result} result
 */
const dlTypeUpdateByID = async (type, userid, id) => {
  const query = "UPDATE licensetype SET type=?, modifiedby=? where id=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [type, userid, id]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while user update by ID");
    return error;
  }
};
/**
 * This method will delete licensetype via licensetypeid
 * @param {string} id licensetypeid
 * @returns {result} result
 */
const dlTypeDeleteByID = async (id) => {
  const query = "DELETE FROM licensetype where id=?";

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
 * This method for fetch all the licensetype.
 * @returns {result} result
 */
const dlTypeAll = async () => {
  const query = "SELECT * FROM licensetype;";
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
 * This method for create licensetype.
 * @param {string} type DL type
 * @param {string} userid user ID
 * @returns {result} result
 */
const dlTypeCreate = async (type, userid) => {
  const query =
    "INSERT INTO licensetype (type, createdby, modifiedby) VALUES(?,?,?)";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [type, userid, userid]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while create user");
    return error;
  }
};

module.exports = {
  dlTypeCreate,
  dlTypeAll,
  dlTypeFind,
  dlTypeFindByID,
  dlTypeUpdateByID,
  dlTypeDeleteByID,
};
