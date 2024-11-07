const asyncHandler = require("express-async-handler");
const db = require("../dataBase/locationQ");

/**
 * @description Create a location
 * @route POST /api/location/create
 * @access private
 */
const createlocation = asyncHandler(async (req, res) => {
  try {
    const { name, description, userid } = req.body;

    if (!name || !userid) {
      return res.status(422).json({
        message: "Please fill in all fields (location name and userid)",
      });
    }
    const [location] = await db.locationFind(name);
    if (location) {
      return res
        .status(409)
        .json({ message: name + " Location already exists" });
    }

    const newLocation = await db.locationCreate(name, description, userid);
    const locationid = JSON.stringify(newLocation[0]);

    return res.status(201).json({
      message: `Location created successfully with ID: ${
        JSON.parse(locationid).insertId
      }`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @description get all the locations
 * @route GET /api/location/getAll
 * @access private
 */
const getlocations = asyncHandler(async (req, res) => {
  try {
    const result = await db.locationAll();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description get location from ID
 * @route GET /api/location/:id
 * @access private
 */
const getlocation = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.locationFindByID(id);
    if (!result.length > 0) {
      return res.status(422).json({
        message: `wrong param id (${id}) provided`,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description update location against param id
 * @route PUT /api/location/:id
 * @access private
 */
const updatelocation = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, userid } = req.body;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const location = await db.locationFindByID(id);
    if (location.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.locationUpdateByID(name, description, userid, id);

    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});
/**
 * @description delete location against param id
 * @route DELETE /api/location/:id
 * @access private
 */
const deletelocation = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const location = await db.locationFindByID(id);
    if (location.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.locationDeleteByID(id);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

module.exports = {
  deletelocation,
  updatelocation,
  getlocation,
  getlocations,
  createlocation,
};
