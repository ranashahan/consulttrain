const pool = require("./db.js");

/**
 * This method for fetch user via course
 * @param {string} name course
 * @returns {result} result
 */
const courseFind = async (name) => {
  const query = "select id from course where name=? limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while course find: " + error);
    return error;
  }
};

/**
 * This method use to fetch course by ID
 * @param {string} id course param id
 * @returns {result} result
 */
const courseFindByID = async (id) => {
  const query = "select * from course where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while course find by id: " + error);
    return error;
  }
};

/**
 * This method will update course via userid
 * @param {string} name course name
 * @param {string} description course description
 * @param {string} userid user userid as modified by
 * @param {int} id course id
 * @returns {result} result
 */
const courseUpdateByID = async (name, description, userid, id) => {
  const query =
    "UPDATE course SET name=?, description=?, modifiedby=? where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name, description, userid, id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while course update by ID: " + error);
    return error;
  }
};
/**
 * This method will delete course via courseid
 * @param {string} id course id
 * @returns {result} result
 */
const courseDeleteByID = async (id) => {
  const query = "DELETE FROM course where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while delete course: " + error);
    return error;
  }
};

/**
 * This method for fetch all the courses.
 * @returns {result} result
 */
const courseAll = async () => {
  const query = "CALL `consulttrain`.`getAllCourses`();";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0][0];
  } catch (error) {
    client.release();
    console.error("error occurred while all courses: " + error);
    return error;
  }
};

/**
 * This method for create course.
 * @param {string} name course name
 * @param {string} description course description
 * @param {string} userid user ID
 * @returns {result} result
 */
const courseCreate = async (name, description, userid) => {
  const query =
    "INSERT INTO course (name, description, createdby, modifiedby) VALUES(?,?,?,?)";
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
    console.error("error occurred while create course: " + error);
    return error;
  }
};

module.exports = {
  courseFind,
  courseFindByID,
  courseUpdateByID,
  courseDeleteByID,
  courseAll,
  courseCreate,
};
