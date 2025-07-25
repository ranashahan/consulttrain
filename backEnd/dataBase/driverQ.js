const pool = require("./db.js");

/**
 * This method for fetch id via driver name
 * @param {string} name driver
 * @returns {result} result
 */
const driverFindByName = async (name) => {
  const query = "select id from driver where name=? and active=1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [name]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while driver find: " + error);
    return error;
  }
};
/**
 * This method for fetch id via driver nic
 * @param {string} nic driver
 * @returns {result} result
 */
const driverFindByNIC = async (nic) => {
  const query = `CALL ${process.env.DATABASE}.getDriverByNIC(?);`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [nic]);
    client.release();
    return result[0][0];
  } catch (error) {
    client.release();
    console.error("error occurred while driver find by NIC: " + error);
    return error;
  }
};
/**
 * This method for search query
 * @param {string} req request
 * @returns {result} result
 */
const driverSearch = async (req) => {
  const client = await pool.getConnection();
  try {
    const {
      name,
      nic,
      licensenumber,
      permitnumber,
      contractorid,
      startDate,
      endDate,
    } = req.query;
    let query =
      // "SELECT id,name,nic,licensetypeid,licensenumber,licenseexpiry,permitnumber,permitissue,permitexpiry,contractorid FROM driver";
      "SELECT * FROM driver";
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
      conditions.push(`permitnumber LIKE '%${permitnumber}%'`);
    }
    if (startDate) {
      conditions.push(
        `DATE(permitissue) BETWEEN '${startDate}' AND '${endDate}' `
      );
    }

    if (conditions.length > 0) {
      query +=
        " WHERE " +
        conditions.join(" AND ") +
        " and active=1 order by permitissue desc limit 400";
    }
    const result = await client.query(query);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while driver search: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [licensenumber]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while driver find: " + error);
    return error;
  }
};
/**
 * This method for fetch id via driver license number
 * @param {string} permit driver license number
 * @returns {result} result
 */
const driverFindByPermit = async (permit) => {
  const query = "select * from driver where permitnumber=? and active=1";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [permit]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while driver find: " + error);
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
  const query = `CALL ${process.env.DATABASE}.getDriverByID(?);`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0][0];
    // return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while driver find by id: " + error);
    return error;
  }
};

/**
 * This method use to fetch driver by ID
 * @param {string} id driver param id
 * @returns {result} result
 */
const driverSessionByID = async (id) => {
  const query = `select id,name,sessiondate,classdate,locationid,resultid,stageid,titleid, quizscore,totalscore 
 from session 
 where active = 1 
 and  id in (select session_id from session_driver where driver_id = ?) 
 order by sessiondate desc;`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
    // return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while driver session find by id: " + error);
    return error;
  }
};
/**
 * This method use to fetch driver by ID
 * @param {string} id driver param id
 * @returns {result} result
 */
const driverSessionFindByID = async (id) => {
  const query = "select * from session_driver where driver_id = ?;";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result[0];
  } catch (error) {
    client.release();
    console.error("error occurred while driver session find by id: " + error);
    return error;
  }
};

/**
 * This method will update driver via userid
 * @param {string} name driver name
 * @param {string} gender driver gender
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
 * @param {Date} medicalexpiry driver medical expiry date
 * @param {number} bloodgroupid driver blood group id
 * @param {number} contractorid driver contractor id
 * @param {number} visualid driver visual id
 * @param {number} ddccount driver course count
 * @param {number} experience driver years of experience.
 * @param {string} code driver code
 * @param {number} userid user userid as modified by
 * @param {number} id driver id
 * @returns {result} result
 */
const driverUpdateByID = async (
  name,
  gender,
  dob,
  mobile,
  nic,
  nicexpiry,
  licensenumber,
  licensetypeid,
  licenseexpiry,
  licenseverified,
  designation,
  department,
  permitnumber,
  permitissue,
  permitexpiry,
  medicalexpiry,
  bloodgroupid,
  contractorid,
  visualid,
  ddccount,
  experience,
  code,
  comment,
  userid,
  id
) => {
  const query = `UPDATE driver SET name=?, gender=?, dob=?,mobile=?, nic=?, nicexpiry=?, licensenumber=?, licensetypeid=?, licenseexpiry=?,
  licenseverified=?,designation=?, department=?, permitnumber=?, permitissue=?, permitexpiry=?, medicalexpiry=?, bloodgroupid=?, contractorid=?, 
    visualid=?, ddccount=?, experience=?, code=?, comment=?, modifiedby=? where id=?`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [
      name,
      gender,
      dob || null,
      mobile,
      nic,
      nicexpiry || null,
      licensenumber,
      licensetypeid,
      licenseexpiry || null,
      licenseverified,
      designation,
      department,
      permitnumber,
      permitissue || null,
      permitexpiry || null,
      medicalexpiry || null,
      bloodgroupid,
      contractorid,
      visualid,
      ddccount,
      experience,
      code,
      comment,
      userid,
      id,
    ]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while driver update by ID: " + error);
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
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [id]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while delete driver: " + error);
    return error;
  }
};

/**
 * This method for fetch all the drivers.
 * @returns {result} result
 */
const driversAll = async () => {
  const query = `CALL ${process.env.DATABASE}.getAllDrivers();`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    // return result[0];
    return result[0][0];
  } catch (error) {
    client.release();
    console.error("error occurred while all drivers: " + error);
    return error;
  }
};

/**
 * This method for create driver.
 * @param {string} name driver name
 * @param {string} gender driver gender
 * @param {Date} dob driver date of birth
 * @param {string} mobile driver mobile
 * @param {string} nic driver NIC number
 * @param {string} nicexpiry driver NIC expiry
 * @param {string} licensenumber driver license number
 * @param {number} licensetypeid driver license type
 * @param {Date} licenseexpiry driver license expiry
 * @param {string} designation driver designation
 * @param {string} department driver department
 * @param {Date} medicalexpiry driver medical expiry date
 * @param {number} bloodgroupid driver blood group id
 * @param {number} contractorid driver contractor id
 * @param {number} visualid driver visual id
 * @param {number} ddccount driver formcount
 * @param {number} experience driver exerience
 * @param {string} code driver code
 * @param {string} comment driver comment
 * @param {number} userid user created
 * @returns
 */
const driverCreate = async (
  name,
  gender,
  dob,
  mobile,
  nic,
  nicexpiry,
  licensenumber,
  licensetypeid,
  licenseexpiry,
  permitnumber,
  permitissue,
  permitexpiry,
  licenseverified,
  designation,
  department,
  medicalexpiry,
  bloodgroupid,
  contractorid,
  visualid,
  ddccount,
  experience,
  code,
  comment,
  userid
) => {
  const query = `CALL ${process.env.DATABASE}.insert_driver(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  // const query = `INSERT INTO driver (name,gender,dob,nic,nicexpiry,licensenumber,licensetypeid,licenseexpiry,licenseverified,designation,
  //   department,permitnumber,permitissue,permitexpiry,bloodgroupid,contractorid,visualid,ddccount,experience,
  //   code,comment,createdby,modifiedby) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [
      name,
      gender,
      dob,
      mobile,
      nic,
      nicexpiry,
      licensenumber,
      licensetypeid,
      licenseexpiry,
      permitnumber,
      permitissue,
      permitexpiry,
      licenseverified,
      designation,
      department,
      medicalexpiry,
      bloodgroupid,
      contractorid,
      visualid,
      ddccount,
      experience,
      code,
      comment,
      userid,
    ]);
    client.release();
    return result;
  } catch (error) {
    client.release();
    console.error("error occurred while create driver: " + error);
    return error;
  }
};

/**
 * This method for fetch id via driver license,permit,nic,medical expiry
 * @param {string} param driver license,permit,nic,medical expiry
 * @returns {result} result
 */
const driversExpiryReport = async (param) => {
  const query = `CALL ${process.env.DATABASE}.getAllExpireDriver(?);`;
  const client = await pool.getConnection();
  try {
    const result = await client.query(query, [param]);
    client.release();
    return result[0][0];
  } catch (error) {
    client.release();
    console.error("error occurred while driver find: " + error);
    return error;
  }
};

/**
 * This method for fetch all the driver count.
 * @returns {result} result
 */
const driversCount = async () => {
  const query = "select count(id) as totalDriver from driver";
  const client = await pool.getConnection();
  try {
    const result = await client.query(query);
    client.release();
    return result[0][0].totalDriver ?? 0;
  } catch (error) {
    client.release();
    console.error("error occurred while all drivers count: " + error);
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
  driversExpiryReport,
  driverSessionByID,
  driverFindByPermit,
  driversCount,
};
