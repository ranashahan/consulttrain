const asyncHandler = require("express-async-handler");
const db = require("../dataBase/trainingQ");
const asstdb = require("../dataBase/assessmentQ");
const { constants } = require("../constants");

/**
 * @description Create a training
 * @route POST /api/training/create
 * @access private
 */
const createTraining = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      courseid,
      categoryid,
      plandate,
      startdate,
      enddate,
      duration,
      titleid,
      clientid,
      contractorid,
      trainerid,
      trainingexpiry,
      invoicenumber,
      invoicedate,
      charges,
      transportation,
      miscexpense,
      tax,
      total,
      bank,
      cheque,
      amountreceived,
      requestedby,
      contactnumber,
      source,
      venue,
      locationid,
      status,
      classroom,
      assessment,
      commentry,
      userid,
    } = req.body;

    if (!name || !trainerid || !userid) {
      return res.status(constants.UNPROCESSABLE).json({
        message:
          "Please fill in all fields (training name, trainerid and userid)",
      });
    }
    const [trainingdup] = await db.trainingFind(name);
    if (trainingdup) {
      return res
        .status(constants.CONFLICT)
        .json({ message: "training already existed with name " + name });
    }

    const newtraining = await db.trainingCreate(
      name,
      courseid,
      categoryid,
      plandate,
      startdate,
      enddate,
      duration,
      titleid,
      clientid,
      contractorid,
      trainerid,
      trainingexpiry,
      invoicenumber,
      invoicedate,
      charges,
      transportation,
      miscexpense,
      tax,
      total,
      bank,
      cheque,
      amountreceived,
      requestedby,
      contactnumber,
      source,
      venue,
      locationid,
      status,
      classroom,
      assessment,
      commentry,
      userid
    );
    const trainingID = JSON.stringify(newtraining[0]);

    return res.status(201).json({
      message: `training created successfully with trainingID: ${
        JSON.parse(trainingID).insertId
      }`,
    });
  } catch (error) {
    return res.status(constants.SERVER_ERROR).json({ message: error.message });
  }
});

/**
 * @description get all the trainings
 * @route GET /api/training/getAll
 * @access private
 */
const getTrainings = asyncHandler(async (req, res) => {
  try {
    const result = await db.trainingAll();
    let dataFromDatabase = result;
    const formattedResponse = dataFromDatabase.map((item) => {
      if (item.plandate) {
        item.plandate = new Date(item.plandate).toLocaleDateString();
      }
      if (item.startdate) {
        item.startdate = new Date(item.startdate).toLocaleDateString();
      }
      if (item.enddate) {
        item.enddate = new Date(item.enddate).toLocaleDateString();
      }
      if (item.trainingexpiry) {
        item.trainingexpiry = new Date(
          item.trainingexpiry
        ).toLocaleDateString();
      }
      if (item.invoicedate) {
        item.invoicedate = new Date(item.invoicedate).toLocaleDateString();
      }
      return item;
    });

    return res.status(constants.SUCCESS).json(formattedResponse);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description get all the trainings
 * @route GET /api/training/getbydate
 * @access private
 */
const getTrainingByDate = asyncHandler(async (req, res) => {
  try {
    const results = await db.trainingAllTimeFrame(req);

    return res.status(constants.SUCCESS).json(results);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description get training from ID
 * @route GET /api/training/:id
 * @access private
 */
const getTraining = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.trainingID(id);
    if (!result.length > 0) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    let dataFromDatabase = result;
    const formattedResponse = dataFromDatabase.map((item) => {
      if (item.plandate) {
        item.plandate = new Date(item.plandate).toLocaleDateString();
      }
      if (item.startdate) {
        item.startdate = new Date(item.startdate).toLocaleDateString();
      }
      if (item.enddate) {
        item.enddate = new Date(item.enddate).toLocaleDateString();
      }
      if (item.trainingexpiry) {
        item.trainingexpiry = new Date(
          item.trainingexpiry
        ).toLocaleDateString();
      }
      if (item.invoicedate) {
        item.invoicedate = new Date(item.invoicedate).toLocaleDateString();
      }
      return item;
    });
    return res.status(200).json(formattedResponse);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description update training against param id
 * @route PUT /api/training/:id
 * @access private
 */
const updateTraining = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      courseid,
      categoryid,
      plandate,
      startdate,
      enddate,
      duration,
      titleid,
      clientid,
      contractorid,
      trainerid,
      trainingexpiry,
      invoicenumber,
      invoicedate,
      charges,
      transportation,
      miscexpense,
      tax,
      total,
      bank,
      cheque,
      amountreceived,
      requestedby,
      contactnumber,
      source,
      venue,
      locationid,
      status,
      classroom,
      assessment,
      commentry,
      userid,
    } = req.body;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const training = await db.trainingFindByID(id);
    if (training.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.trainingUpdateByID(
      name,
      courseid,
      categoryid,
      plandate,
      startdate,
      enddate,
      duration,
      titleid,
      clientid,
      contractorid,
      trainerid,
      trainingexpiry,
      invoicenumber,
      invoicedate,
      charges,
      transportation,
      miscexpense,
      tax,
      total,
      bank,
      cheque,
      amountreceived,
      requestedby,
      contactnumber,
      source,
      venue,
      locationid,
      status,
      classroom,
      assessment,
      commentry,
      userid,
      id
    );

    return res.status(201).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});
/**
 * @description delete training against param id
 * @route DELETE /api/training/:id
 * @access private
 */
const deleteTraining = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const training = await db.trainingFindByID(id);
    if (training.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }

    const session = await asstdb.sessionFindByTrainingID(id);
    if (session.length > 0) {
      return res.status(constants.CONFLICT).json({
        message: `training ${id} has active sessions and cannot be deleted.`,
      });
    }

    const result = await db.trainingDeleteByID(id);
    return res.status(201).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

module.exports = {
  deleteTraining,
  updateTraining,
  getTraining,
  getTrainings,
  createTraining,
  getTrainingByDate,
};
