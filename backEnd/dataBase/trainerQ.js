const pool = require("./db.js");

/**
 * This method for fetch user via trainer
 * @param {string} name trainer
 * @returns {result} result
 */
const trainerFind = async (name) => {
  const query = "select id from trainer where name=? limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while trainer find: " + error);
    return error;
  }
};
/**
 * This method for fetch initials via trainer initials
 * @param {string} initials trainer initials
 * @returns {result} result
 */
const trainerinitialsFind = async (initials) => {
  const query = "select initials from trainer where initials=? limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [initials]);
    client.release();
    console.log(result[0]);
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while trainerinitials find: " + error);
    return error;
  }
};

/**
 * This method use to fetch trainer by ID
 * @param {string} id trainer param id
 * @returns {result} result
 */
const trainerFindByID = async (id) => {
  const query = "select * from trainer where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while trainer find by id: " + error);
    return error;
  }
};

/**
 * This method will update trainer via userid
 * @param {string} name trainer name
 * @param {string} initials trainer initial
 * @param {string} mobile trainer mobile
 * @param {string} address trainer address
 * @param {string} userid user userid as modified by
 * @param {int} id trainer id
 * @returns {result} result
 */
const trainerUpdateByID = async (
  name,
  initials,
  mobile,
  address,
  userid,
  id
) => {
  const query =
    "UPDATE trainer SET name=?, initials=?, mobile=?, address=?, modifiedby=? where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [
      name,
      initials,
      mobile,
      address,
      userid,
      id,
    ]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while trainer update by ID: " + error);
    return error;
  }
};
/**
 * This method will delete trainer via trainerid
 * @param {string} id trainerid
 * @returns {result} result
 */
const trainerDeleteByID = async (id) => {
  const query = "DELETE FROM trainer where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while trainer Delete By ID: " + error);
    return error;
  }
};

/**
 * This method for fetch all the trainer.
 * @returns {result} result
 */
const trainerAll = async () => {
  const query = "CALL `consulttrain`.`getAllTrainers`();";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0][0];
  } catch (error) {
    client.release();
    console.error("error occurred while all trainers: " + error);
    return error;
  }
};

/**
 * This method for create trainer.
 * @param {string} name trainer name
 * @param {string} initials trainer intials
 * @param {string} mobile trainer contact number
 * @param {string} address trainer address
 * @param {string} userid user ID
 * @returns {result} result
 */
const trainerCreate = async (name, initials, mobile, address, userid) => {
  const query =
    "INSERT INTO trainer (name, initials, mobile, address, createdby, modifiedby) VALUES(?,?,?,?,?,?)";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [
      name,
      initials,
      mobile,
      address,
      userid,
      userid,
    ]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while create trainer: " + error);
    return error;
  }
};

module.exports = {
  trainerCreate,
  trainerAll,
  trainerDeleteByID,
  trainerUpdateByID,
  trainerFindByID,
  trainerinitialsFind,
  trainerFind,
};
