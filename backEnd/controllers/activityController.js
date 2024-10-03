const asyncHandler = require("express-async-handler");
const db = require("../dataBase/activityQ");
const dbSlave = require("../dataBase/slavecategoryQ");

/**
 * @description Create a activity
 * @route POST /api/activity/create
 * @access private
 */
const createaActivity = asyncHandler(async (req, res) => {
  try {
    const { name, description, initials, slavecategoryid, userid } = req.body;

    if (!name || !slavecategoryid || !userid) {
      return res.status(422).json({
        message:
          "Please fill in all fields (activity name, slavecategoryid and userid)",
      });
    }
    const [activity] = await db.activityFind(name);
    if (activity) {
      return res
        .status(409)
        .json({ message: name + " activity already exists" });
    }

    const slavecategory = await dbSlave.scFindByID(slavecategoryid);
    if (slavecategory < 1) {
      return res.status(409).json({
        message: `wrong slavecategoryid (id ${slavecategoryid}) provided`,
      });
    }

    const newactivity = await db.activityCreate(
      name,
      description,
      initials,
      slavecategoryid,
      userid
    );
    const activityid = JSON.stringify(newactivity[0]);

    return res.status(201).json({
      message: `activity created successfully with ID: ${
        JSON.parse(activityid).insertId
      }`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @description get all the activitys
 * @route GET /api/activity/getAll
 * @access private
 */
const getActivities = asyncHandler(async (req, res) => {
  try {
    const result = await db.activityAll();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description get activity from ID
 * @route GET /api/activity/:id
 * @access private
 */
const getActivity = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.activityFindByID(id);
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
 * @description get activity from slave ID
 * @route GET /api/activity/getbyslave:id
 * @access private
 */
const getActivitiesBySlaveID = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.activityFindBySlaveID(id);

    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description update activity against param id
 * @route PUT /api/activity/:id
 * @access private
 */
const updateActivity = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, initials, slavecategoryid, userid } = req.body;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const activity = await db.activityFindByID(id);
    if (activity.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }

    const slavecategory = await dbSlave.scFindByID(slavecategoryid);
    if (slavecategory < 1) {
      return res.status(409).json({
        message: `wrong slavecategoryid (id ${slavecategoryid}) provided`,
      });
    }

    const result = await db.activityUpdateByID(
      name,
      description,
      initials,
      slavecategoryid,
      userid,
      id
    );

    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});
/**
 * @description delete activity against param id
 * @route DELETE /api/activity/:id
 * @access private
 */
const deleteActivity = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { userid } = req.body;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const activity = await db.activityFindByID(id);
    if (activity.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.activityDeleteByID(userid, id);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

module.exports = {
  deleteActivity,
  updateActivity,
  getActivity,
  getActivities,
  createaActivity,
  getActivitiesBySlaveID,
};
