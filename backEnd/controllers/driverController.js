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
    } = req.body;

    if (!name || !licensenumber || !nic || !userid) {
      return res.status(constants.UNPROCESSABLE).json({
        message:
          "Please fill in all fields (driver name, license number, NIC and userid)",
      });
    }
    const [driverNIC] = await db.driverFindByNIC(nic);
    if (driverNIC) {
      return res
        .status(constants.CONFLICT)
        .json({ message: "NIC number already existed with " + nic });
    }

    const [driverLicenseNumber] = await db.driverFindByLicense(licensenumber);
    if (driverLicenseNumber) {
      return res.status(constants.CONFLICT).json({
        message: "License number already existed with " + licensenumber,
      });
    }

    if (permitnumber) {
      const [driverPermitNumber] = await db.driverFindByPermit(permitnumber);
      if (driverPermitNumber) {
        return res.status(constants.CONFLICT).json({
          message: "Permit number already existed with " + permitnumber,
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
    );

    return res.status(201).json({
      message: `Driver created successfully`,
    });
  } catch (error) {
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
 * @description get driver sessions from driver ID
 * @route GET /api/driver/session:id
 * @access private
 */
const getDriverSession = asyncHandler(async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.driverSessionByID(id);
    if (!result.length > 0) {
      return res.status(201).json({
        message: `does not find any record against ${id}`,
      });
    }
    let dataFromDatabase = result;
    const formattedResponse = dataFromDatabase.map((item) => {
      if (item.classdate) {
        item.classdate = new Date(item.classdate).toLocaleDateString();
      }
      if (item.sessiondate) {
        item.sessiondate = new Date(item.sessiondate).toLocaleDateString();
      }
      return item;
    });
    return res.status(constants.SUCCESS).json(formattedResponse);
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
      if (item.created_at) {
        item.created_at = new Date(item.created_at).toLocaleDateString();
      }
      if (item.modified_at) {
        item.modified_at = new Date(item.modified_at).toLocaleDateString();
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

    if (!name || !licensenumber || !nic || !userid) {
      return res.status(constants.UNPROCESSABLE).json({
        message:
          "Please fill in all fields (driver name, license number, NIC and userid)",
      });
    }

    const [driverNIC] = await db.driverFindByNIC(nic);
    if (driverNIC) {
      if (driverNIC.id != id) {
        return res
          .status(constants.CONFLICT)
          .json({ message: "NIC number already existed with " + nic });
      }
    }

    const [driverLicenseNumber] = await db.driverFindByLicense(licensenumber);
    if (driverLicenseNumber) {
      if (driverLicenseNumber.id != id) {
        return res.status(constants.CONFLICT).json({
          message: "License number already existed with " + licensenumber,
        });
      }
    }

    if (permitnumber) {
      const [driverPermitNumber] = await db.driverFindByPermit(permitnumber);
      if (driverPermitNumber) {
        if (driverPermitNumber.id != id) {
          return res.status(constants.CONFLICT).json({
            message: "Permit number already existed with " + permitnumber,
          });
        }
      }
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
  getDriverSession,
};
