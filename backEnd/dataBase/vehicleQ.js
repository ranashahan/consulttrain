const pool = require("./db.js");

/**
 * This method for fetch id via vehicle
 * @param {string} name vehicle
 * @returns {vehicle} vehicle
 */
const vehicleFind = async (name) => {
  const query = "select id from vehicle where name=? limit 1";
  //   console.log(email);
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while vehicle find");
    return error;
  }
};

/**
 * This method use to fetch vehicle by ID
 * @param {string} id vehicle param id
 * @returns {vehicle} vehicle
 */
const vehicleFindByID = async (id) => {
  const query = "select * from vehicle where id=?";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while vehicle find by id");
    return error;
  }
};

/**
 * This method will update vehicle via userid
 * @param {string} name vehicle name
 * @param {string} userid user userid as modified by
 * @param {int} id vehicle id
 * @returns {vehicle} vehicle
 */
const vehicleUpdateByID = async (name, userid, id) => {
  const query = "UPDATE vehicle SET name=?, modifiedby=? where id=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name, userid, id]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while vehicle update by ID");
    return error;
  }
};
/**
 * This method will delete vehicle via vehicle id
 * @param {string} id vehicle id
 * @returns {vehicle} vehicle
 */
const vehicleDeleteByID = async (id) => {
  const query = "DELETE FROM vehicle where id=?";

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
 * This method for fetch all the vehicles.
 * @returns {vehicle} vehicle
 */
const vehicleAll = async () => {
  const query = "SELECT * FROM vehicle;";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while all vehicle");
    return error;
  }
};

/**
 * This method for create vehicle.
 * @param {string} name vehicle name
 * @param {string} userid user ID
 * @returns {vehicle} vehicle
 */
const vehicleCreate = async (name, userid) => {
  const query =
    "INSERT INTO vehicle (name, createdby, modifiedby) VALUES(?,?,?)";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name, userid, userid]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while create vehicle");
    return error;
  }
};

module.exports = {
  vehicleCreate,
  vehicleAll,
  vehicleDeleteByID,
  vehicleUpdateByID,
  vehicleFindByID,
  vehicleFind,
};
