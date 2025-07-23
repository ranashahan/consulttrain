const pool = require("./db.js");

/**
 * This method for fetch user via email
 * @param {string} email user email
 * @returns {result} result
 */
const userFind = async (email) => {
  const query =
    "select userid,username,email,password,role from users where email=? and active=1 limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [email]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while userfind: " + error);
    return error;
  }
};

/**
 * This method for fetch user via name
 * @param {string} username user name
 * @returns {result} result
 */
const findbyUsername = async (username) => {
  const query =
    "select username from users where username=? and active = 1 limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [username]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while find by Username: " + error);
    return error;
  }
};

/**
 * This method use to fetch user by ID
 * @param {string} id user param id
 * @returns {result} result
 */
const userFindByID = async (id) => {
  const query = `select userid, username, email, name, mobile, company, designation, imagepath, role 
  from users where userid=? and active = 1`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while user find by id: " + error);
    return error;
  }
};
/**
 * This method use to fetch user by ID
 * @param {string} id user param id
 * @returns {result} result
 */
const userPassFindByID = async (id) => {
  const query = `select password from users where userid=? and active = 1`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while userpass find by id: " + error);
    return error;
  }
};

/**
 * This method will update user via userid
 * @param {string} username user username
 * @param {string} name user name
 * @param {string} mobile user mobile
 * @param {string} company user company
 * @param {string} designation user designation
 * @param {string} imagepath user profile picture
 * @param {string} role user role
 * @param {string} id user id
 * @returns {result} result
 */
const userUpdateByID = async (
  name,
  mobile,
  company,
  designation,
  imagepath,
  role,
  userid,
  id
) => {
  const query =
    "UPDATE users SET name=?, mobile=?, company=?, designation=?,imagepath=?, role=?, modifiedby=? where userid=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [
      name,
      mobile,
      company,
      designation,
      imagepath,
      role,
      userid,
      id,
    ]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while user update by ID: " + error);
    return error;
  }
};

/**
 * This method will update user password via userid
 * @param {string} password
 * @param {number} userid
 * @param {number} id
 * @returns
 */
const userUpdatePasswordByID = async (password, userid, id) => {
  const query = "UPDATE users SET password=?, modifiedby=? where userid=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [password, userid, id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while user update password by ID: " + error);
    return error;
  }
};

/**
 * This method will delete user via userid
 * @param {string} id user id
 * @returns {result} result
 */
const userDeleteByID = async (id) => {
  const query = "update users set active = 0 where userid=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while user delete: " + error);
    return error;
  }
};

/**
 * This method for fetch all the users.
 * @returns {result} result
 */
const allUsers = async () => {
  const query = `CALL ${process.env.DATABASE}.getAllUsers();`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while all users: " + error);
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
  company,
  designation,
  imagepath,
  role
) => {
  const query =
    "INSERT INTO users (username, email, password, name, mobile, company, designation,imagepath, role, createdby, modifiedby) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [
      username,
      email,
      password,
      name,
      mobile,
      company,
      designation,
      imagepath,
      role,
      username,
      username,
    ]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while create user: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [userid, refreshToken]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while create refresh token: " + error);
    return error;
  }
};

/**
 * This method for find refresh token
 * @param {string} userid user userid
 * @param {string} refreshToken user refresh token
 * @returns {result} result
 */
const findRefreshToken = async (userid, refreshToken) => {
  const query =
    "select * from refreshtoken where userid = ? and refreshtoken=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [userid, refreshToken]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while find refresh token: " + error);
    return error;
  }
};

/**
 * This method for delete refresh token
 * @param {string} userid user userid
 * @returns {result} result
 */
const deleteRefreshToken = async (userid) => {
  const query = "DELETE FROM refreshtoken where userid = ?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [userid]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while delete refresh token: " + error);
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
  findbyUsername,
  userUpdatePasswordByID,
  userPassFindByID,
};
