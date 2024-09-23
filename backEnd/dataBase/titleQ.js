const pool = require("./db.js");

/**
 * This method for fetch id via title
 * @param {string} name title
 * @returns {title} title
 */
const titleFind = async (name) => {
  const query = "select id from title where name=? limit 1";
  //   console.log(email);
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while title find");
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
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while title find by id");
    return error;
  }
};

/**
 * This method will update title via userid
 * @param {string} name title name
 * @param {string} userid user userid as modified by
 * @param {int} id title id
 * @returns {title} title
 */
const titleUpdateByID = async (name, userid, id) => {
  const query = "UPDATE title SET name=?, modifiedby=? where id=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name, userid, id]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while title update by ID");
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
 * This method for fetch all the titles.
 * @returns {title} title
 */
const titleAll = async () => {
  const query = "SELECT * FROM title;";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while all title");
    return error;
  }
};

/**
 * This method for create title.
 * @param {string} name title name
 * @param {string} userid user ID
 * @returns {title} title
 */
const titleCreate = async (name, userid) => {
  const query = "INSERT INTO title (name, createdby, modifiedby) VALUES(?,?,?)";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name, userid, userid]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while create title");
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
