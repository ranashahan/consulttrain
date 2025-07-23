const pool = require("./db.js");

/**
 * This method for fetch id via vehicle
 * @param {string} name vehicle
 * @returns {vehicle} vehicle
 */
const vehicleFind = async (name) => {
  const query = "select id from vehicle where name=? limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while vehicle find: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while vehicle find by id: " + error);
    return error;
  }
};

/**
 * This method will update vehicle via userid
 * @param {string} name vehicle name
 * @param {string} description vehicle description
 * @param {string} userid user userid as modified by
 * @param {int} id vehicle id
 * @returns {vehicle} vehicle
 */
const vehicleUpdateByID = async (name, description, userid, id) => {
  const query =
    "UPDATE vehicle SET name=?, description=?, modifiedby=? where id=?";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name, description, userid, id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while vehicle update by ID: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while delete vehicle: " + error);
    return error;
  }
};

/**
 * This method for fetch all the vehicles.
 * @returns {vehicle} vehicle
 */
const vehicleAll = async () => {
  const query = `CALL ${process.env.DATABASE}.getAllVehicles();`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0][0];
  } catch (error) {
    client.release();
    console.error("error occurred while all vehicle: " + error);
    return error;
  }
};

/**
 * This method for create vehicle.
 * @param {string} name vehicle name
 * @param {string} description vehicle description
 * @param {string} userid user ID
 * @returns {vehicle} vehicle
 */
const vehicleCreate = async (name, description, userid) => {
  const query =
    "INSERT INTO vehicle (name, description, createdby, modifiedby) VALUES(?,?,?,?)";
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
    console.error("error occurred while create vehicle: " + error);
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
