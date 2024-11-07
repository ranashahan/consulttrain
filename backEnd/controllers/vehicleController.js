const asyncHandler = require("express-async-handler");
const db = require("../dataBase/vehicleQ");

/**
 * @description Create a vehicle
 * @route POST /api/vehicle/create
 * @access private
 */
const createVehicle = asyncHandler(async (req, res) => {
  try {
    const { name, description, userid } = req.body;

    if (!name || !userid) {
      return res.status(422).json({
        message: "Please fill in all fields (vehicle name and userid)",
      });
    }
    const [vehicle] = await db.vehicleFind(name);
    if (vehicle) {
      return res
        .status(409)
        .json({ message: name + " vehicle already exists" });
    }

    const newvehicle = await db.vehicleCreate(name, description, userid);
    const vehicleid = JSON.stringify(newvehicle[0]);

    return res.status(201).json({
      message: `vehicle created successfully with ID: ${
        JSON.parse(vehicleid).insertId
      }`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @description get all the vehicles
 * @route GET /api/vehicle/getAll
 * @access private
 */
const getVehicles = asyncHandler(async (req, res) => {
  try {
    const result = await db.vehicleAll();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description get vehicle from ID
 * @route GET /api/vehicle/:id
 * @access private
 */
const getVehicle = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.vehicleFindByID(id);
    if (!result.length > 0) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description update vehicle against param id
 * @route PUT /api/vehicle/:id
 * @access private
 */
const updateVehicle = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, userid } = req.body;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const vehicle = await db.vehicleFindByID(id);
    if (vehicle.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.vehicleUpdateByID(name, description, userid, id);

    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});
/**
 * @description delete vehicle against param id
 * @route DELETE /api/vehicle/:id
 * @access private
 */
const deleteVehicle = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const vehicle = await db.vehicleFindByID(id);
    if (vehicle.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.vehicleDeleteByID(id);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

module.exports = {
  deleteVehicle,
  updateVehicle,
  getVehicle,
  getVehicles,
  createVehicle,
};
