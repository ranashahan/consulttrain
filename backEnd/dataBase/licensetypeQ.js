const pool = require("./db.js");

/**
 * This method for fetch dltype via type
 * @param {string} name dl type
 * @returns {result} result
 */
const dlTypeFind = async (name) => {
  const query = "select id from licensetype where name=? limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while dltype find: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while dltype find by id: " + error);
    return error;
  }
};

/**
 * This method will update DL Type by ID
 * @param {string} name DL type
 * @param {string} description DL type description
 * @param {string} userid user userid as modified by
 * @param {int} id licensetype id
 * @returns {result} result
 */
const dlTypeUpdateByID = async (name, description, userid, id) => {
  const query =
    "UPDATE licensetype SET name=?,description=?, modifiedby=? where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name, description, userid, id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while dltype update by ID: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while dltype delete: " + error);
    return error;
  }
};

/**
 * This method for fetch all the licensetype.
 * @returns {result} result
 */
const dlTypeAll = async () => {
  const query = "CALL `consulttrain`.`getAllLicenseTypes`();";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0][0];
  } catch (error) {
    client.release();
    console.error("error occurred while all dltypes: " + error);
    return error;
  }
};

/**
 * This method for create licensetype.
 * @param {string} name DL type name
 * @param {string} description DL type description
 * @param {string} userid user ID
 * @returns {result} result
 */
const dlTypeCreate = async (name, description, userid) => {
  const query =
    "INSERT INTO licensetype (name, description, createdby, modifiedby) VALUES(?,?,?,?)";
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
    console.error("error occurred while create dltype: " + error);
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
