const pool = require("./db.js");

/**
 * This method for fetch id via driver name
 * @param {string} name driver
 * @returns {result} result
 */
const driverFindByName = async (name) => {
  const query = "select id from driver where name=? and active=1";
  //   console.log(email);
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while driver find");
    return error;
  }
};
/**
 * This method for fetch id via driver nic
 * @param {string} nic driver
 * @returns {result} result
 */
const driverFindByNIC = async (nic) => {
  const query = "CALL `consulttrain`.`getDriverByNIC`(?);";
  //   console.log(email);
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [nic]);
    client.release();
    return result[0][0];
  } catch (error) {
    console.log("error occurred while driver find");
    return error;
  }
};
/**
 * This method for search query
 * @param {string} req request
 * @returns {result} result
 */
const driverSearch = async (req) => {
  try {
    const {
      name,
      nic,
      licensenumber,
      permitnumber,
      permitexpiry,
      contractorid,
    } = req.query;

    let query = "SELECT * FROM driver";
    const conditions = [];
    if (nic) {
      conditions.push(`nic LIKE '%${nic}%'`);
    }
    if (licensenumber) {
      conditions.push(`licensenumber = '${licensenumber}'`);
    }
    if (name) {
      conditions.push(`name LIKE '%${name}%'`);
    }
    if (contractorid) {
      conditions.push(`contractorid = '${contractorid}'`);
    }
    if (permitnumber) {
      conditions.push(`permitnumber = '${permitnumber}'`);
    }
    if (permitexpiry) {
      conditions.push(`permitexpiry = '${permitexpiry}'`);
    }

    if (conditions.length > 0) {
      query +=
        " WHERE " +
        conditions.join(" AND ") +
        "and active=1 order by created_at desc limit 10";
    }
    const client = await pool.pool.getConnection();
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while driver search");
    return error;
  }
};

/**
 * This method for fetch id via driver license number
 * @param {string} licensenumber driver license number
 * @returns {result} result
 */
const driverFindByLicense = async (licensenumber) => {
  const query = "select * from driver where licensenumber=? and active=1";
  //   console.log(email);
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [licensenumber]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while driver find");
    return error;
  }
};

/**
 * This method use to fetch driver by ID
 * @param {string} id driver param id
 * @returns {result} result
 */
const driverFindByID = async (id) => {
  // const query = "select * from driver where id=? and active=1 limit 1";
  const query = "CALL `consulttrain`.`getDriverByID`(?);";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result[0][0];
    // return result[0];
  } catch (error) {
    console.log("error occurred while driver find by id");
    return error;
  }
};
/**
 * This method use to fetch driver by ID
 * @param {string} id driver param id
 * @returns {result} result
 */
const driverSessionFindByID = async (id) => {
  // const query = "select * from driver where id=? and active=1 limit 1";
  const query = "select * from session_driver where driver_id = ?;";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    console.log("error occurred while driver session find by id");
    return error;
  }
};

/**
 * This method will update driver via userid
 * @param {string} name driver name
 * @param {Date} dob driver date of birth
 * @param {string} nic driver NIC number
 * @param {Date} nicexpiry driver NIC expiry date
 * @param {string} licensenumber driver license number
 * @param {number} licensetypeid driver license type
 * @param {Date} licenseexpiry driver license expiry
 * @param {string} designation driver designation
 * @param {string*} department driver department
 * @param {string} permitnumber driver permit number
 * @param {Date} permitissue driver permit issue date
 * @param {Date} permitexpiry driver permit expiry date
 * @param {number} bloodgroupid driver blood group id
 * @param {number} contractorid driver contractor id
 * @param {number} visualid driver visual id
 * @param {number} ddccount driver course count
 * @param {number} experience driver years of experience.
 * @param {number} userid user userid as modified by
 * @param {number} id driver id
 * @returns {result} result
 */
const driverUpdateByID = async (
  name,
  dob,
  nic,
  nicexpiry,
  licensenumber,
  licensetypeid,
  licenseexpiry,
  designation,
  department,
  permitnumber,
  permitissue,
  permitexpiry,
  bloodgroupid,
  contractorid,
  visualid,
  ddccount,
  experience,
  comment,
  userid,
  id
) => {
  const query =
    "UPDATE driver SET name=?,dob=?,nic=?,nicexpiry=?,licensenumber=?,licensetypeid=?,licenseexpiry=?,designation=?,department=?,permitnumber=?,permitissue=?,permitexpiry=?,bloodgroupid=?,contractorid=?,visualid=?,ddccount=?, experience=?,comment=?, modifiedby=? where id=?";

  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [
      name,
      dob,
      nic,
      nicexpiry,
      licensenumber,
      licensetypeid,
      licenseexpiry,
      designation,
      department,
      permitnumber,
      permitissue,
      permitexpiry,
      bloodgroupid,
      contractorid,
      visualid,
      ddccount,
      experience,
      comment,
      userid,
      id,
    ]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while driver update by ID");
    return error;
  }
};
/**
 * This method will delete driver via driverid
 * @param {string} id driver id
 * @returns {result} result
 */
const driverDeleteByID = async (id) => {
  const query = "UPDATE driver SET active=0 where id=?";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    console.log("error occurred while delete driver");
    return error;
  }
};

/**
 * This method for fetch all the drivers.
 * @returns {result} result
 */
const driversAll = async () => {
  // const query =
  // "select * from driver where active=1 order by created_at desc limit 100";
  const query = "CALL `consulttrain`.`getAllDrivers`();";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query);
    client.release();
    // return result[0];
    return result[0][0];
  } catch (error) {
    console.log("error occurred while all drivers");
    return error;
  }
};

/**
 * This method for create driver.
 * @param {string} name driver name
 * @param {Date} dob driver date of birth
 * @param {string} nic driver NIC number
 * @param {string} nicexpiry driver NIC expiry
 * @param {string} licensenumber driver license number
 * @param {number} licensetypeid driver license type
 * @param {Date} licenseexpiry driver license expiry
 * @param {string} designation driver designation
 * @param {string*} department driver department
 * @param {string} permitnumber driver permit number
 * @param {Date} permitissue driver permit issue date
 * @param {Date} permitexpiry driver permit expiry date
 * @param {number} bloodgroupid driver blood group id
 * @param {number} contractorid driver contractor id
 * @param {number} visualid driver visual id
 * @param {number} ddccount driver formcount
 * @param {number} experience driver exerience
 * @param {string} comment driver comment
 * @param {number} userid user created
 * @returns
 */
const driverCreate = async (
  name,
  dob,
  nic,
  nicexpiry,
  licensenumber,
  licensetypeid,
  licenseexpiry,
  designation,
  department,
  permitnumber,
  permitissue,
  permitexpiry,
  bloodgroupid,
  contractorid,
  visualid,
  ddccount,
  experience,
  comment,
  userid
) => {
  const query =
    "INSERT INTO driver (name,dob,nic,nicexpiry,licensenumber,licensetypeid,licenseexpiry,designation,department,permitnumber,permitissue,permitexpiry,bloodgroupid,contractorid,visualid,ddccount,experience,comment,createdby,modifiedby) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  try {
    const client = await pool.pool.getConnection();
    const result = await client.query(query, [
      name,
      dob,
      nic,
      nicexpiry,
      licensenumber,
      licensetypeid,
      licenseexpiry,
      designation,
      department,
      permitnumber,
      permitissue,
      permitexpiry,
      bloodgroupid,
      contractorid,
      visualid,
      ddccount,
      experience,
      comment,
      userid,
      userid,
    ]);
    client.release();
    return result;
  } catch (error) {
    console.log(error);
    console.log("error occurred while create driver");
    return error;
  }
};

module.exports = {
  driverCreate,
  driversAll,
  driverDeleteByID,
  driverUpdateByID,
  driverFindByID,
  driverFindByLicense,
  driverFindByNIC,
  driverFindByName,
  driverSearch,
  driverSessionFindByID,
};
