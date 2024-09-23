const pool = require("./db.js");

/**
 * This method for fetch user via email
 * @param {string} email user email
 * @returns {result} result
 */
const userFind = async (email) => {
  const query =
    "select userid,username,email,password,role from users where email=? limit 1";
  //   console.log(email);
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [email]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while userfind");
    return error;
  }
};

/**
 * This method use to fetch user by ID
 * @param {string} id user param id
 * @returns {result} result
 */
const userFindByID = async (id) => {
  const query = "select * from users where userid=?";
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
 * This method will update user via userid
 * @param {string} username user username
 * @param {string} name user name
 * @param {string} mobile user mobile
 * @param {string} profilepic user profile picture
 * @param {string} company user company
 * @param {string} designation user designation
 * @param {string} role user role
 * @param {string} id user id
 * @returns {result} result
 */
const userUpdateByID = async (
  username,
  name,
  mobile,
  profilepic,
  company,
  designation,
  role,
  id
) => {
  const query =
    "UPDATE users SET name=?, mobile=?, profilepic=?, company=?, designation=?, role=?, modifiedby=? where userid=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [
      name,
      mobile,
      profilepic,
      company,
      designation,
      role,
      username,
      id,
    ]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while user update by ID");
    return error;
  }
};
/**
 * This method will delete user via userid
 * @param {string} id user id
 * @returns {result} result
 */
const userDeleteByID = async (id) => {
  const query = "DELETE FROM users where userid=?";

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
 * This method for fetch all the users.
 * @returns {result} result
 */
const allUsers = async () => {
  const query = "select * from users";
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
 * This method for create user through signup form
 * @param {string} username user username
 * @param {string} email user email
 * @param {string} password user password
 * @param {string} name user name
 * @param {string} mobile user mobile number
 * @param {string} profilepic user profile picture
 * @param {string} company user company
 * @param {string} designation user designation
 * @param {string} role user role
 * @returns {result} result
 */
const createUser = async (
  username,
  email,
  password,
  name,
  mobile,
  profilepic,
  company,
  designation,
  role
) => {
  const query =
    "INSERT INTO users (username, email, password, name, mobile, profilepic, company, designation, role, createdby, modifiedby) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [
      username,
      email,
      password,
      name,
      mobile,
      profilepic,
      company,
      designation,
      role,
      username,
      username,
    ]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while create user");
    return error;
  }
};
/**
 * This method will insert record into refreshtoken table
 * @param {string} userid user userid
 * @param {string} refreshToken login refresh token
 * @returns {result} result
 */
const createRefreshToken = async (userid, refreshToken) => {
  const query = "INSERT INTO refreshtoken (userid, refreshtoken) VALUES(?,?)";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [userid, refreshToken]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while create refresh token");
    return error;
  }
};
/**
 *
 * @param {string} userid user userid
 * @param {string} refreshToken user refresh token
 * @returns {result} result
 */
const findRefreshToken = async (userid, refreshToken) => {
  const query =
    "select * from refreshtoken where userid = ? and refreshtoken=?";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [userid, refreshToken]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while find refresh token");
    return error;
  }
};
/**
 *
 * @param {string} userid user userid
 * @returns {result} result
 */
const deleteRefreshToken = async (userid) => {
  const query = "DELETE FROM refreshtoken where userid = ?";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [userid]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while delete refresh token");
    return error;
  }
};

module.exports = {
  createUser,
  userUpdateByID,
  userFindByID,
  allUsers,
  userFind,
  userDeleteByID,
  createRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
};
