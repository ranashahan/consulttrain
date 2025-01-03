const asyncHandler = require("express-async-handler");
const db = require("../dataBase/driverQ");
const { constants } = require("../constants");

/**
 * @description Create a driver
 * @route POST /api/driver/create
 * @access private
 */
const createDriver = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      gender,
      dob,
      nic,
      nicexpiry,
      licensenumber,
      licensetypeid,
      licenseexpiry,
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
    } = req.body;

    if (!name || !licensenumber || !nic || !userid) {
      return res.status(constants.UNPROCESSABLE).json({
        message:
          "Please fill in all fields (driver name license number, NIC and userid)",
      });
    }
    const [driverNIC] = await db.driverFindByNIC(nic);
    if (driverNIC) {
      return res
        .status(constants.CONFLICT)
        .json({ message: "driver already existed with nic " + nic });
    }
    if (licensenumber) {
      const [driverLicenseNumber] = await db.driverFindByLicense(licensenumber);
      if (driverLicenseNumber) {
        return res.status(constants.CONFLICT).json({
          message:
            "driver already existed with license number " + licensenumber,
        });
      }
    }

    const newDriver = await db.driverCreate(
      name,
      gender,
      dob,
      nic,
      nicexpiry,
      licensenumber,
      licensetypeid,
      licenseexpiry,
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
    );
    const driverID = JSON.stringify(newDriver[0]);
    console.log(driverID);

    return res.status(201).json({
      message: `Driver created successfully with driverID: ${
        JSON.parse(driverID).insertId
      }`,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(constants.SERVER_ERROR).json({ message: error.message });
  }
});

/**
 * @description get all the drivers
 * @route GET /api/driver/getAll
 * @access private
 */
const getDrivers = asyncHandler(async (req, res) => {
  try {
    const result = await db.driversAll();
    let dataFromDatabase = result;
    const formattedResponse = dataFromDatabase.map((item) => {
      if (item.dob) {
        item.dob = new Date(item.dob).toLocaleDateString();
      }
      if (item.licenseexpiry) {
        item.licenseexpiry = new Date(item.licenseexpiry).toLocaleDateString();
      }
      if (item.permitissue) {
        item.permitissue = new Date(item.permitissue).toLocaleDateString();
      }
      if (item.permitexpiry) {
        item.permitexpiry = new Date(item.permitexpiry).toLocaleDateString();
      }
      if (item.medicalexpiry) {
        item.medicalexpiry = new Date(item.medicalexpiry).toLocaleDateString();
      }
      if (item.nicexpiry) {
        item.nicexpiry = new Date(item.nicexpiry).toLocaleDateString();
      }
      return item;
    });

    return res.status(200).json(formattedResponse);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description get driver from ID
 * @route GET /api/driver/:id
 * @access private
 */
const getDriver = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.driverFindByID(id);
    if (!result.length > 0) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    let dataFromDatabase = result;
    const formattedResponse = dataFromDatabase.map((item) => {
      if (item.dob) {
        item.dob = new Date(item.dob).toLocaleDateString();
      }
      if (item.nicexpiry) {
        item.nicexpiry = new Date(item.nicexpiry).toLocaleDateString();
      }
      if (item.licenseexpiry) {
        item.licenseexpiry = new Date(item.licenseexpiry).toLocaleDateString();
      }
      if (item.permitissue) {
        item.permitissue = new Date(item.permitissue).toLocaleDateString();
      }
      if (item.permitexpiry) {
        item.permitexpiry = new Date(item.permitexpiry).toLocaleDateString();
      }
      if (item.medicalexpiry) {
        item.medicalexpiry = new Date(item.medicalexpiry).toLocaleDateString();
      }
      return item;
    });
    return res.status(200).json(formattedResponse);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});
/**
 * @description get driver from ID
 * @route GET /api/driver/nic
 * @access private
 */
const getDriverByNIC = asyncHandler(async (req, res) => {
  try {
    const nic = req.query.nic;
    if (!nic) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide NIC number in body",
      });
    }
    const result = await db.driverFindByNIC(nic);
    if (!result.length > 0) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong NIC ${nic} provided`,
      });
    }

    let dataFromDatabase = result;
    const formattedResponse = dataFromDatabase.map((item) => {
      if (item.dob) {
        item.dob = new Date(item.dob).toLocaleDateString();
      }
      if (item.nicexpiry) {
        item.nicexpiry = new Date(item.nicexpiry).toLocaleDateString();
      }
      if (item.licenseexpiry) {
        item.licenseexpiry = new Date(item.licenseexpiry).toLocaleDateString();
      }
      if (item.permitissue) {
        item.permitissue = new Date(item.permitissue).toLocaleDateString();
      }
      if (item.permitexpiry) {
        item.permitexpiry = new Date(item.permitexpiry).toLocaleDateString();
      }
      if (item.medicalexpiry) {
        item.medicalexpiry = new Date(item.medicalexpiry).toLocaleDateString();
      }
      return item;
    });

    return res.status(200).json(formattedResponse);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description get driver from ID
 * @route GET /api/driver/search
 * @access private
 */
const getDriverSearch = asyncHandler(async (req, res) => {
  try {
    const result = await db.driverSearch(req);
    if (!result.length > 0) {
      return res.status(204).json({
        message: `Could not found any result`,
      });
    }

    let dataFromDatabase = result;
    const formattedResponse = dataFromDatabase.map((item) => {
      if (item.dob) {
        item.dob = new Date(item.dob).toLocaleDateString();
      }
      if (item.nicexpiry) {
        item.nicexpiry = new Date(item.nicexpiry).toLocaleDateString();
      }
      if (item.licenseexpiry) {
        item.licenseexpiry = new Date(item.licenseexpiry).toLocaleDateString();
      }
      if (item.permitissue) {
        item.permitissue = new Date(item.permitissue).toLocaleDateString();
      }
      if (item.permitexpiry) {
        item.permitexpiry = new Date(item.permitexpiry).toLocaleDateString();
      }
      if (item.medicalexpiry) {
        item.medicalexpiry = new Date(item.medicalexpiry).toLocaleDateString();
      }

      return item;
    });

    return res.status(200).json(formattedResponse);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description update driver against param id
 * @route PUT /api/driver/:id
 * @access private
 */
const updateDriver = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      gender,
      dob,
      nic,
      nicexpiry,
      licensenumber,
      licensetypeid,
      licenseexpiry,
      licenseverified,
      designation,
      department,
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
    } = req.body;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const driver = await db.driverFindByID(id);
    if (driver.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.driverUpdateByID(
      name,
      gender,
      dob,
      nic,
      nicexpiry,
      licensenumber,
      licensetypeid,
      licenseexpiry,
      licenseverified,
      designation,
      department,
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
    );

    return res.status(201).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});
/**
 * @description delete driver against param id
 * @route DELETE /api/driver/:id
 * @access private
 */
const deleteDriver = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const driver = await db.driverFindByID(id);
    if (driver.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }

    const session = await db.driverSessionFindByID(id);
    if (session.length > 0) {
      return res.status(constants.CONFLICT).json({
        message: `Driver ${id} has active sessions and cannot be deleted.`,
      });
    }

    const result = await db.driverDeleteByID(id);
    return res.status(201).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description get driver from ID
 * @route GET /api/driver/expiry
 * @access private
 */
const getDriverExpiry = asyncHandler(async (req, res) => {
  try {
    const param = req.query.param;
    if (!param) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param  in request parameter",
      });
    }
    const result = await db.driversExpiryReport(param);
    if (!result.length > 0) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param ${param} provided`,
      });
    }

    let dataFromDatabase = result;
    const formattedResponse = dataFromDatabase.map((item) => {
      if (item.Driver_DateOfBirth) {
        item.Driver_DateOfBirth = new Date(
          item.Driver_DateOfBirth
        ).toLocaleDateString();
      }
      if (item.Driver_NationIdentityCard_Expiry) {
        item.Driver_NationIdentityCard_Expiry = new Date(
          item.Driver_NationIdentityCard_Expiry
        ).toLocaleDateString();
      }
      if (item.Driver_License_Expiry) {
        item.Driver_License_Expiry = new Date(
          item.Driver_License_Expiry
        ).toLocaleDateString();
      }
      if (item.Driver_Permit_Issue) {
        item.Driver_Permit_Issue = new Date(
          item.Driver_Permit_Issue
        ).toLocaleDateString();
      }
      if (item.Driver_Permit_Expiry) {
        item.Driver_Permit_Expiry = new Date(
          item.Driver_Permit_Expiry
        ).toLocaleDateString();
      }
      if (item.Driver_Medical_Expiry) {
        item.Driver_Medical_Expiry = new Date(
          item.Driver_Medical_Expiry
        ).toLocaleDateString();
      }
      return item;
    });

    return res.status(200).json(formattedResponse);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

module.exports = {
  getDriverExpiry,
  deleteDriver,
  updateDriver,
  getDriverSearch,
  getDriverByNIC,
  getDriver,
  getDrivers,
  createDriver,
};
