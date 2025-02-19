const pool = require("./db.js");

/**
 * This method for fetch industries id via industries name
 * @param {string} name industries
 * @returns {result} result
 */
const industriesFind = async (name) => {
  const query = "select id from industries where name=? limit 1";
  const industries = await pool.getConnection();
  try {
    const result = await industries.query(query, [name]);
    industries.release();
    return result[0];
  } catch (error) {
    industries.release();
    console.error("error occurred while industries find: " + error);
    return error;
  }
};

/**
 * This method use to fetch industries by ID
 * @param {string} id industries param id
 * @returns {result} result
 */
const industriesFindByID = async (id) => {
  const query = "select * from industries where id=?";
  const industries = await pool.getConnection();
  try {
    const result = await industries.query(query, [id]);
    industries.release();
    return result[0];
  } catch (error) {
    industries.release();
    console.error("error occurred while industries find by id: " + error);
    return error;
  }
};

/**
 * This method will update industries via userid
 * @param {string} name industries name
 * @param {string} description industries description
 * @param {number} userid user id
 * @param {number} id industries id
 * @returns {result} result
 */
const industriesUpdateByID = async (name, description, userid, id) => {
  const query =
    "UPDATE industries SET name=?,description=?, modifiedby=? where id=?";
  const industries = await pool.getConnection();
  try {
    const result = await industries.query(query, [
      name,
      description,
      userid,
      id,
    ]);
    industries.release();
    return result;
  } catch (error) {
    industries.release();
    console.error("error occurred while industries update by ID: " + error);
    return error;
  }
};
/**
 * This method will delete industries via industries id
 * @param {string} id industries id
 * @returns {result} result
 */
const industriesDeleteByID = async (id) => {
  const query = "DELETE FROM industries where id=?";
  const industries = await pool.getConnection();
  try {
    const result = await industries.query(query, [id]);
    industries.release();
    return result;
  } catch (error) {
    industries.release();
    console.error("error occurred while industries delete by id: " + error);
    return error;
  }
};

/**
 * This method for fetch all the industries.
 * @returns {result} result
 */
const industriesAll = async () => {
  const query = "CALL `consulttrain`.`getAllIndustries`();";
  const industries = await pool.getConnection();
  try {
    const result = await industries.query(query);
    industries.release();
    return result[0][0];
  } catch (error) {
    industries.release();
    console.error("error occurred while all industries: " + error);
    return error;
  }
};

/**
 * This method for create industries.
 * @param {string} name industries name
 * @param {string} description industries description
 * @param {number} userid user ID
 * @returns {result} result
 */
const industriesCreate = async (name, description, userid) => {
  const query = `INSERT INTO industries (name, description, createdby, modifiedby)
     VALUES(?,?,?,?)`;
  const industries = await pool.getConnection();
  try {
    const result = await industries.query(query, [
      name,
      description,
      userid,
      userid,
    ]);
    industries.release();
    return result;
  } catch (error) {
    industries.release();
    console.error("error occurred while create industries: " + error);
    return error;
  }
};
module.exports = {
  industriesCreate,
  industriesAll,
  industriesDeleteByID,
  industriesUpdateByID,
  industriesFindByID,
  industriesFind,
};
