const asyncHandler = require("express-async-handler");
const db = require("../dataBase/trainerQ");

/**
 * @description Create a trainer
 * @route POST /api/trainer/create
 * @access private
 */
const createTrainer = asyncHandler(async (req, res) => {
  try {
    const { name, initials, mobile, address, userid } = req.body;

    if (!name || !initials || !userid) {
      return res.status(422).json({
        message: "Please fill in all fields (name, intials and userid)",
      });
    }
    const [trainerid] = await db.trainerFind(name);
    if (trainerid) {
      return res
        .status(409)
        .json({ message: name + " trainer already exists" });
    }
    const [trainerInitials] = await db.trainerinitialsFind(initials);
    if (trainerInitials) {
      return res
        .status(409)
        .json({ message: initials + " trainer already exists" });
    }

    const newtrainer = await db.trainerCreate(
      name,
      initials,
      mobile,
      address,
      userid
    );
    const trainerID = JSON.stringify(newtrainer[0]);

    return res.status(201).json({
      message: `trainer created successfully with trainerID: ${
        JSON.parse(trainerID).insertId
      }`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @description get all the trainer
 * @route GET /api/trainer/getAll
 * @access private
 */
const getTrainers = asyncHandler(async (req, res) => {
  try {
    const result = await db.trainerAll();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description get trainer from ID
 * @route GET /api/trainer/:id
 * @access private
 */
const getTrainer = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.trainerFindByID(id);
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
 * @description update trainer against param id
 * @route PUT /api/trainer/:id
 * @access private
 */
const updateTrainer = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, initials, mobile, address, userid } = req.body;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const trainer = await db.trainerFindByID(id);
    if (trainer.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.trainerUpdateByID(
      name,
      initials,
      mobile,
      address,
      userid,
      id
    );

    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});
/**
 * @description delete trainer against param id
 * @route DELETE /api/trainer/:id
 * @access private
 */
const deleteTrainer = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const trainer = await db.trainerFindByID(id);
    if (trainer.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.trainerDeleteByID(id);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

module.exports = {
  createTrainer,
  getTrainers,
  getTrainer,
  updateTrainer,
  deleteTrainer,
};
