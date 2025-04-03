const asyncHandler = require("express-async-handler");
const db = require("../dataBase/trainingQ");
const asstdb = require("../dataBase/assessmentQ");
const clientdb = require("../dataBase/clientQ");
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
 * @route GET /api/training/getAll
 * @access private
 */
const getTrainingsCount = asyncHandler(async (req, res) => {
  try {
    const result = await db.trainingsCount();

    return res.status(constants.SUCCESS).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description get all the trainings yearly
 * @route GET /api/assessment/getCountReportClients
 * @access private
 */
const getTrainingCountReportClients = asyncHandler(async (req, res) => {
  try {
    const rows = await db.trainingCountReportClients();
    if (!rows.length > 0) {
      return res.status(constants.NOCONTENT).json({
        message: `Could not found any result`,
      });
    }

    const categoriesData = await clientdb.clientAll();

    // Create a map of formId -> formName
    const formNameMap = categoriesData.reduce((acc, row) => {
      acc[row.id] = row.name; // { 16001: "UEP", 16002: "Shell", ... }
      return acc;
    }, {});

    // Initialize categories (Months)
    const categories = Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString("en", { month: "short" })
    );

    // Initialize data structure with 0 for all months
    const groupedData = {};
    let hasUnknownClient = false; // Flag to check if "Unknown" is needed

    // Include a key for known clients
    Object.keys(formNameMap).forEach((clientid) => {
      groupedData[clientid] = Array(12).fill(0);
    });

    // Populate real data
    rows.forEach((row) => {
      let clientKey = row.clientid !== null ? row.clientid : "Unknown";

      if (row.clientid === null) {
        hasUnknownClient = true;
      }

      if (!groupedData[clientKey]) {
        groupedData[clientKey] = Array(12).fill(0);
      }

      groupedData[clientKey][row.month - 1] = row.training_count;
    });

    // If there's no null clientid, remove "Unknown"
    if (!hasUnknownClient) {
      delete groupedData["Unknown"];
    }

    // Convert to ApexCharts series format
    const series = Object.keys(groupedData).map((clientid) => ({
      name: formNameMap[clientid] || "Unknown", // Use form name if available, else "Unknown"
      data: groupedData[clientid],
    }));

    return res.status(constants.SUCCESS).json({ categories, series });
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

/**
 * @description get training report all
 * @route GET /api/training/getReportAll
 * @access private
 */
const getTrainingReportAll = asyncHandler(async (req, res) => {
  try {
    const results = await db.trainingReportAll(req);
    if (!results.length > 0) {
      return res.status(constants.NOCONTENT).json({
        message: `Could not found any result`,
      });
    }

    let dataFromDatabase = results;
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
 * @description get training finance report all
 * @route GET /api/training/getFinanceReport
 * @access private
 */
const getTrainingFinanceReport = asyncHandler(async (req, res) => {
  try {
    const results = await db.trainingFinanceReport(req);
    if (!results.length > 0) {
      return res.status(constants.NOCONTENT).json({
        message: `Could not found any result`,
      });
    }

    let dataFromDatabase = results;
    const formattedResponse = dataFromDatabase.map((item) => {
      if (item.plandate) {
        item.plandate = new Date(item.plandate).toLocaleDateString();
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

module.exports = {
  deleteTraining,
  updateTraining,
  getTraining,
  getTrainings,
  createTraining,
  getTrainingByDate,
  getTrainingReportAll,
  getTrainingFinanceReport,
  getTrainingsCount,
  getTrainingCountReportClients,
};
