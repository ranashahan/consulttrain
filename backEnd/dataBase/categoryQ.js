const pool = require("./db.js");

/**
 * This method for fetch user via category
 * @param {string} name category
 * @returns {result} result
 */
const categoryFind = async (name) => {
  const query = "select id from category where name=? limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while category find: " + error);
    return error;
  }
};

/**
 * This method use to fetch category by ID
 * @param {string} id category param id
 * @returns {result} result
 */
const categoryFindByID = async (id) => {
  const query = "select * from category where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while category find by id: " + error);
    return error;
  }
};

/**
 * This method will update category via userid
 * @param {string} name category name
 * @param {string} description category description
 * @param {string} userid user userid as modified by
 * @param {int} id category id
 * @returns {result} result
 */
const categoryUpdateByID = async (name, description, userid, id) => {
  const query =
    "UPDATE category SET name=?, description=?, modifiedby=? where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name, description, userid, id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while category update by ID: " + error);
    return error;
  }
};
/**
 * This method will delete category via categoryid
 * @param {string} id category id
 * @returns {result} result
 */
const categoryDeleteByID = async (id) => {
  const query = "DELETE FROM category where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while delete category: " + error);
    return error;
  }
};

/**
 * This method for fetch all the categorys.
 * @returns {result} result
 */
const categoryAll = async () => {
  const query = `CALL ${process.env.DATABASE}.getAllCategories();`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0][0];
  } catch (error) {
    client.release();
    console.error("error occurred while all categorys: " + error);
    return error;
  }
};

/**
 * This method for create category.
 * @param {string} name category name
 * @param {string} description category description
 * @param {string} userid user ID
 * @returns {result} result
 */
const categoryCreate = async (name, description, userid) => {
  const query =
    "INSERT INTO category (name, description, createdby, modifiedby) VALUES(?,?,?,?)";
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
    console.error("error occurred while create category: " + error);
    return error;
  }
};

module.exports = {
  categoryFind,
  categoryFindByID,
  categoryUpdateByID,
  categoryDeleteByID,
  categoryAll,
  categoryCreate,
};
