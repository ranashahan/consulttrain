const pool = require("./db.js");
const clientdb = require("./clientQ.js");

/**
 * This method for fetch contractor id via contractor name
 * @param {string} name contractor
 * @returns {result} result
 */
const contractorFind = async (name) => {
  const query = "select id from contractor where name=? limit 1";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while contractor find");
    return error;
  }
};

/**
 * This method use to fetch contractor by ID
 * @param {string} id contractor param id
 * @returns {result} result
 */
const contractorFindByID = async (id) => {
  const query = "select * from contractor where id=?";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while contractor find by id");
    return error;
  }
};

/**
 * This method will update contractor via userid
 * @param {string} name contractor name
 * @param {string} contact contractor contact info
 * @param {string} address contractor address
 * @param {string} initials contractor initials
 * @param {string} userid user userid as modified by
 * @param {int} id contractor id
 * @returns {result} result
 */
const contractorUpdateByID = async (
  name,
  ntnnumber,
  contactname,
  contactnumber,
  contactdesignation,
  contactdepartment,
  address,
  initials,
  userid,
  id
) => {
  const query =
    "UPDATE contractor SET name=?, ntnnumber=?,contactname=?,contactnumber=?,contactdesignation=?,contactdepartment=?,address=?,initials=?, modifiedby=? where id=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [
      name,
      ntnnumber,
      contactname,
      contactnumber,
      contactdesignation,
      contactdepartment,
      address,
      initials,
      userid,
      id,
    ]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while contractor update by ID");
    return error;
  }
};
/**
 * This method will delete contractor via contractor id
 * @param {string} id contractor id
 * @returns {result} result
 */
const contractorDeleteByID = async (id) => {
  const query = "DELETE FROM contractor where id=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while contractor delete");
    return error;
  }
};

/**
 * This method for fetch all the contractor.
 * @returns {result} result
 */
const contractorAll = async () => {
  const query = "CALL `consulttrain`.`getAllContractors`();";
  // const query = "SELECT * FROM contractor;";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query);
    client.release();
    return result[0][0];
  } catch (error) {
    console.log("error occurred while all contractors");
    return error;
  }
};

/**
 * This method for create contractor.
 * @param {string} name
 * @param {string} ntnnumber
 * @param {string} contactname
 * @param {string} contactnumber
 * @param {string} contactdesignation
 * @param {string} contactdepartment
 * @param {string} address
 * @param {string} initials
 * @param {number} userid
 * @returns {result} result
 */
const contractorCreate = async (
  name,
  ntnnumber,
  contactname,
  contactnumber,
  contactdesignation,
  contactdepartment,
  address,
  initials,
  userid
) => {
  const query =
    "INSERT INTO contractor (name,ntnnumber, contactname,contactnumber,contactdesignation,contactdepartment, address,initials, createdby, modifiedby) VALUES(?,?,?,?,?,?,?,?,?,?)";
  //console.log(query);
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [
      name,
      ntnnumber,
      contactname,
      contactnumber,
      contactdesignation,
      contactdepartment,
      address,
      initials,
      userid,
      userid,
    ]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while create contractor");
    return error;
  }
};
module.exports = {
  contractorCreate,
  contractorAll,
  contractorDeleteByID,
  contractorUpdateByID,
  contractorFindByID,
  contractorFind,
};
