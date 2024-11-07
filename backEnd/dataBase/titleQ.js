const pool = require("./db.js");

/**
 * This method for fetch id via title
 * @param {string} name title
 * @returns {title} title
 */
const titleFind = async (name) => {
  const query = "select id from title where name=? limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while title find: " + error);
    return error;
  }
};

/**
 * This method use to fetch title by ID
 * @param {string} id title param id
 * @returns {title} title
 */
const titleFindByID = async (id) => {
  const query = "select * from title where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while title find by id: " + error);
    return error;
  }
};

/**
 * This method will update title via userid
 * @param {string} name title name
 * @param {string} description title description
 * @param {string} userid user userid as modified by
 * @param {int} id title id
 * @returns {title} title
 */
const titleUpdateByID = async (name, description, userid, id) => {
  const query =
    "UPDATE title SET name=?, description=?, modifiedby=? where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name, description, userid, id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while title update by ID: " + error);
    return error;
  }
};
/**
 * This method will delete title via title id
 * @param {string} id title id
 * @returns {title} title
 */
const titleDeleteByID = async (id) => {
  const query = "DELETE FROM title where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while title delete: " + error);
    return error;
  }
};

/**
 * This method for fetch all the titles.
 * @returns {title} title
 */
const titleAll = async () => {
  const query = "SELECT * FROM title;";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while all title: " + error);
    return error;
  }
};

/**
 * This method for create title.
 * @param {string} name title name
 * @param {string} description title description
 * @param {string} userid user ID
 * @returns {title} title
 */
const titleCreate = async (name, description, userid) => {
  const query =
    "INSERT INTO title (name, description, createdby, modifiedby) VALUES(?,?,?,?)";
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
    console.error("error occurred while create title: " + error);
    return error;
  }
};

module.exports = {
  titleCreate,
  titleAll,
  titleDeleteByID,
  titleUpdateByID,
  titleFindByID,
  titleFind,
};
