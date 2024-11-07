const pool = require("./db.js");

/**
 * This method for fetch id via location
 * @param {string} name location
 * @returns {result} result
 */
const locationFind = async (name) => {
  const query = "select id from location where name=? limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while location find: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while location find by id: " + error);
    return error;
  }
};

/**
 * This method will update location via userid
 * @param {string} name location name
 * @param {string} description location description
 * @param {string} userid user userid as modified by
 * @param {int} id location id
 * @returns {result} result
 */
const locationUpdateByID = async (name, description, userid, id) => {
  const query =
    "UPDATE location SET name=?, description=?, modifiedby=? where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name, description, userid, id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while location update by ID: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while location delete by id: " + error);
    return error;
  }
};

/**
 * This method for fetch all the locations.
 * @returns {result} result
 */
const locationAll = async () => {
  const query = "SELECT * FROM location order by name asc;";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while all locations: " + error);
    return error;
  }
};

/**
 * This method for create location.
 * @param {string} name location name
 * @param {string} description location description
 * @param {string} userid user ID
 * @returns {result} result
 */
const locationCreate = async (name, description, userid) => {
  const query =
    "INSERT INTO location (name, description, createdby, modifiedby) VALUES(?,?,?,?)";
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
    console.error("error occurred while create location: " + error);
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
