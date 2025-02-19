const pool = require("./db.js");

/**
 * This method for fetch contractor id via contractor name
 * @param {string} name contractor
 * @returns {result} result
 */
const contractorFind = async (name) => {
  const query = "select id from contractor where name=? limit 1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while contractor find: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while contractor find by id: " + error);
    return error;
  }
};

/**
 * This method will update contractor via userid
 * @param {string} name contractor name
 * @param {string} description contractor description
 * @param {string} contact contractor contact info
 * @param {string} address contractor address
 * @param {string} initials contractor initials
 * @param {number} clientid clientid
 * @param {number} industriesid industries id
 * @param {string} userid user userid as modified by
 * @param {int} id contractor id
 * @returns {result} result
 */
const contractorUpdateByID = async (
  name,
  description,
  ntnnumber,
  contactname,
  contactnumber,
  contactdesignation,
  contactdepartment,
  address,
  initials,
  clientid,
  industriesid,
  userid,
  id
) => {
  const query = `UPDATE contractor SET name=?,description=?, ntnnumber=?,contactname=?,contactnumber=?,
    contactdesignation=?,contactdepartment=?,address=?,initials=?,clientid=?,industriesid=?, 
    modifiedby=? where id=?`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [
      name,
      description,
      ntnnumber,
      contactname,
      contactnumber,
      contactdesignation,
      contactdepartment,
      address,
      initials,
      clientid,
      industriesid,
      userid,
      id,
    ]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while contractor update by ID: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while contractor delete: " + error);
    return error;
  }
};

/**
 * This method for fetch all the contractor.
 * @returns {result} result
 */
const contractorAll = async () => {
  const query = "CALL `consulttrain`.`getAllContractors`();";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0][0];
  } catch (error) {
    client.release();
    console.error("error occurred while all contractors: " + error);
    return error;
  }
};

/**
 * This method for create contractor.
 * @param {string} name
 * @param {string} description
 * @param {string} ntnnumber
 * @param {string} contactname
 * @param {string} contactnumber
 * @param {string} contactdesignation
 * @param {string} contactdepartment
 * @param {string} address
 * @param {string} initials
 * @param {number} clientid
 * @param {number} userid
 * @returns {result} result
 */
const contractorCreate = async (
  name,
  description,
  ntnnumber,
  contactname,
  contactnumber,
  contactdesignation,
  contactdepartment,
  address,
  initials,
  clientid,
  industriesid,
  userid
) => {
  const query = `INSERT INTO contractor (name, description, ntnnumber, contactname, contactnumber, 
  contactdesignation, contactdepartment, address, initials,clientid,industriesid,
     createdby, modifiedby) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [
      name,
      description,
      ntnnumber,
      contactname,
      contactnumber,
      contactdesignation,
      contactdepartment,
      address,
      initials,
      clientid,
      industriesid,
      userid,
      userid,
    ]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while create contractor: " + error);
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
