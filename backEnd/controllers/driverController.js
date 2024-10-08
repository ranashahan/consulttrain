const asyncHandler = require("express-async-handler");
const db = require("../dataBase/driverQ");

/**
 * @description Create a driver
 * @route POST /api/driver/create
 * @access private
 */
const createDriver = asyncHandler(async (req, res) => {
  try {
    const {
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
    } = req.body;

    if (!name || !licensenumber || !nic || !userid) {
      return res.status(422).json({
        message:
          "Please fill in all fields (driver name license number, NIC and userid)",
      });
    }
    const [driverNIC] = await db.driverFindByNIC(nic);
    if (driverNIC) {
      return res
        .status(409)
        .json({ message: "driver already existed with nic " + nic });
    }
    if (licensenumber) {
      const [driverLicenseNumber] = await db.driverFindByLicense(licensenumber);
      if (driverLicenseNumber) {
        return res.status(409).json({
          message:
            "driver already existed with license number " + licensenumber,
        });
      }
    }

    const newDriver = await db.driverCreate(
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
    );
    const driverID = JSON.stringify(newDriver[0]);

    return res.status(201).json({
      message: `Driver created successfully with driverID: ${
        JSON.parse(driverID).insertId
      }`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
      return item;
    });

    return res.status(200).json(formattedResponse);
  } catch (error) {
    res.status(500);
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
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.driverFindByID(id);
    if (!result.length > 0) {
      return res.status(422).json({
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
      return item;
    });
    return res.status(200).json(formattedResponse);
  } catch (error) {
    res.status(500);
  }
});
/**
 * @description get driver from ID
 * @route GET /api/driver/:id
 * @access private
 */
const getDriverByNIC = asyncHandler(async (req, res) => {
  try {
    const nic = req.query.nic;
    if (!nic) {
      return res.status(422).json({
        message: "Please provide NIC number in body",
      });
    }
    const result = await db.driverFindByNIC(nic);
    if (!result.length > 0) {
      return res.status(422).json({
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
      return item;
    });

    return res.status(200).json(formattedResponse);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description get driver from ID
 * @route GET /api/driver/:id
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
      return item;
    });

    return res.status(200).json(formattedResponse);
  } catch (error) {
    res.status(500);
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
    } = req.body;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const driver = await db.driverFindByID(id);
    if (driver.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.driverUpdateByID(
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
    );

    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
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
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const driver = await db.driverFindByID(id);
    if (driver.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.driverDeleteByID(id);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

module.exports = {
  deleteDriver,
  updateDriver,
  getDriverSearch,
  getDriverByNIC,
  getDriver,
  getDrivers,
  createDriver,
};
