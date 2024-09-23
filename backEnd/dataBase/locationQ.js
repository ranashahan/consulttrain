const pool = require("./db.js");

/**
 * This method for fetch id via location
 * @param {string} name location
 * @returns {result} result
 */
const locationFind = async (name) => {
  const query = "select id from location where name=? limit 1";
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
 * This method use to fetch location by ID
 * @param {string} id location param id
 * @returns {result} result
 */
const locationFindByID = async (id) => {
  const query = "select * from location where id=?";
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
 * This method will update location via userid
 * @param {string} name location name
 * @param {string} userid user userid as modified by
 * @param {int} id location id
 * @returns {result} result
 */
const locationUpdateByID = async (name, userid, id) => {
  const query = "UPDATE location SET name=?, modifiedby=? where id=?";

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
 * This method will delete location via location id
 * @param {string} id location id
 * @returns {result} result
 */
const locationDeleteByID = async (id) => {
  const query = "DELETE FROM location where id=?";

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
 * This method for fetch all the locations.
 * @returns {result} result
 */
const locationAll = async () => {
  const query = "SELECT * FROM location;";
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
 * This method for create location.
 * @param {string} name location name
 * @param {string} userid user ID
 * @returns {result} result
 */
const locationCreate = async (name, userid) => {
  const query =
    "INSERT INTO location (name, createdby, modifiedby) VALUES(?,?,?)";
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
  locationCreate,
  locationAll,
  locationDeleteByID,
  locationUpdateByID,
  locationFindByID,
  locationFind,
};
