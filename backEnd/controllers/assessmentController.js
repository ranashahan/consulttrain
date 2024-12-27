const asyncHandler = require("express-async-handler");
const db = require("../dataBase/assessmentQ");
const { constants } = require("../constants");

/**
 * @description Create a assessment
 * @route POST /api/assessment/create
 * @access private
 */
const createAssessment = asyncHandler(async (req, res) => {
  try {
    const {
      sessionName,
      sessionDate,
      locationId,
      resultId,
      stageId,
      titleId,
      vehicleId,
      totalScore,
      classdate,
      yarddate,
      weather,
      traffic,
      route,
      quizscore,
      comment,
      trainerid,
      assessmentData,
    } = req.body.obj;
    const { driverId, contractorid, userid } = req.body;
    if (
      !sessionName ||
      !sessionDate ||
      !userid ||
      !driverId ||
      !trainerid ||
      !contractorid ||
      !assessmentData
    ) {
      return res.status(constants.UNPROCESSABLE).json({
        message:
          "Please fill in all fields (sessionName, sessionDate, driverId, trainerId, contractorid, userid and assessmentData)",
      });
    }
    const [assessment] = await db.sessionFind(sessionName);
    if (assessment) {
      return res
        .status(constants.CONFLICT)
        .json({ message: sessionName + " Session already exists" });
    }

    const newAssessment = await db.insertAssessment(
      sessionName,
      sessionDate,
      locationId,
      resultId,
      stageId,
      titleId,
      vehicleId,
      totalScore,
      classdate,
      yarddate,
      weather,
      traffic,
      route,
      quizscore,
      comment,
      userid,
      driverId,
      trainerid,
      contractorid,
      assessmentData
    );

    const newAssessmentmessage = JSON.stringify(newAssessment[0]);
    if (newAssessment.affectedRows == 1) {
      return res.status(constants.CREATED).json({
        message: `assessment created successfully`,
      });
    } else {
      return res
        .status(constants.UNPROCESSABLE)
        .json({ message: newAssessmentmessage });
    }
  } catch (error) {
    return res.status(constants.SERVER_ERROR).json({ message: error.message });
  }
});

/**
 * @description Create a training sessions
 * @route POST /api/assessment/createst
 * @access private
 */
const createSessionTraining = asyncHandler(async (req, res) => {
  try {
    const { trainingId, sessionIds } = req.body.payload;

    if (!trainingId || !Array.isArray(sessionIds) || sessionIds.length === 0) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please fill in all fields (trainingid,  and sessionid)",
      });
    }

    const existingSessions = await db.sessionTrainingFind(
      trainingId,
      sessionIds
    );

    if (existingSessions.length > 0) {
      const conflictIds = existingSessions.map((row) => row.session_id);
      return res.status(constants.CONFLICT).json({
        message: `The following session IDs are already assigned: ${conflictIds.join(
          ", "
        )}`,
      });
    }

    const newTrainingSessions = await db.insertSessionWithTraining(
      trainingId,
      sessionIds
    );

    return res.status(constants.CREATED).json({
      message:
        `Sessions successfully added with training ` +
        newTrainingSessions[0].affectedRows,
    });
  } catch (error) {
    return res.status(constants.SERVER_ERROR).json({ message: error.message });
  }
});

/**
 * @description get all the training sessions
 * @route GET /api/assessment/getst
 * @access private
 */
const getSessionTraining = asyncHandler(async (req, res) => {
  try {
    const results = await db.sessionFindByTrainingID(req.query.trainingid);

    return res.status(constants.SUCCESS).json(results);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description delete trainingsession
 * @route POST /api/assessment/deletest
 * @access private
 */
const deleteSessionTraining = asyncHandler(async (req, res) => {
  try {
    const { trainingid, sessionid } = req.body;

    if (!trainingid || !sessionid) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide trainingid & sessionid",
      });
    }
    const trainingSession = await db.trainingSessionFind(trainingid, sessionid);
    if (trainingSession.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (trainingid ${trainingid}, sessionid ${sessionid}) provided`,
      });
    }

    const result = await db.sessionTrainingDelete(trainingid, sessionid);

    return res.status(constants.CREATED).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description get all the assessments
 * @route GET /api/assessment/getAll
 * @access private
 */
const getAssessments = asyncHandler(async (req, res) => {
  try {
    const results = await db.assessmentAll();
    const categories = [];

    results.forEach((row) => {
      let category = categories.find((c) => c.name === row.categoryName);
      if (!category) {
        category = {
          id: row.categoryId,
          name: row.categoryName,
          initials: row.categoryInitials,
          selected: false,
          assessments: [],
        };
        categories.push(category);
      }

      if (row.activityId) {
        category.assessments.push({
          id: row.activityId,
          name: row.activityName,
          initials: row.activityInitials,
          scoreInitial: null,
          scoreMiddle: null,
          scoreFinal: null,
        });
      }
    });

    // res.json(categories);

    return res.status(constants.SUCCESS).json(categories);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});
/**
 * @description get all the assessments
 * @route GET /api/assessment/getAll
 * @access private
 */
const getAssessmentsExp = asyncHandler(async (req, res) => {
  try {
    const results = await db.assessmentAllExp();
    const categories = results.reduce((acc, row) => {
      let masterCategory = acc.find((mc) => mc.id === row.mastercategory_id);
      if (!masterCategory) {
        masterCategory = {
          id: row.mastercategory_id,
          name: row.mastercategory_name,
          slavecategories: [],
        };
        acc.push(masterCategory);
      }

      let slaveCategory = masterCategory.slavecategories.find(
        (sc) => sc.id === row.slavecategory_id
      );
      if (!slaveCategory) {
        slaveCategory = {
          id: row.slavecategory_id,
          name: row.slavecategory_name,
          initials: row.slavecategory_initials,
          activities: [],
        };
        masterCategory.slavecategories.push(slaveCategory);
      }

      slaveCategory.activities.push({
        id: row.activity_id,
        name: row.activity_name,
        initials: row.activity_initials,
        scoreInitial: null,
        scoreMiddle: null,
        scoreFinal: null,
      });

      return acc;
    }, []);

    // console.log(categories);
    // res.json(categories);

    return res.status(constants.SUCCESS).json(categories);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description get all the assessments
 * @route GET /api/assessment/getbydate
 * @access private
 */
const getSessionByDate = asyncHandler(async (req, res) => {
  try {
    const results = await db.sessionAllTimeFrame(req);
    if (!results.length > 0) {
      return res.status(204).json({
        message: `Could not found any result`,
      });
    }
    return res.status(constants.SUCCESS).json(results);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description get all the assessments
 * @route GET /api/assessment/getReportByDate
 * @access private
 */
const getSessionReportByDate = asyncHandler(async (req, res) => {
  try {
    const results = await db.sessionReportTimeFrame(req);
    if (!results.length > 0) {
      return res.status(204).json({
        message: `Could not found any result`,
      });
    }

    let dataFromDatabase = results;
    const formattedResponse = dataFromDatabase.map((item) => {
      if (item.sessiondate) {
        item.sessiondate = new Date(item.sessiondate).toLocaleDateString();
      }
      if (item.classdate) {
        item.classdate = new Date(item.classdate).toLocaleDateString();
      }
      if (item.yarddate) {
        item.yarddate = new Date(item.yarddate).toLocaleDateString();
      }
      if (item.licenseexpiry) {
        item.licenseexpiry = new Date(item.licenseexpiry).toLocaleDateString();
      }
      if (item.permitexpiry) {
        item.permitexpiry = new Date(item.permitexpiry).toLocaleDateString();
      }
      if (item.permitissue) {
        item.permitissue = new Date(item.permitissue).toLocaleDateString();
      }
      if (item.dob) {
        item.dob = new Date(item.dob).toLocaleDateString();
      }
      return item;
    });
    setTimeout(() => {
      console.log("Message after delay");
      return res.status(constants.SUCCESS).json(formattedResponse);
    }, 2000);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});
/**
 * @description get all the driver + session data
 * @route GET /api/assessment/getReportAll
 * @access private
 */
const getSessionReportAll = asyncHandler(async (req, res) => {
  try {
    const results = await db.sessionReportAll(req);
    if (!results.length > 0) {
      return res.status(204).json({
        message: `Could not found any result`,
      });
    }

    let dataFromDatabase = results;
    const formattedResponse = dataFromDatabase.map((item) => {
      if (item.sessiondate) {
        item.sessiondate = new Date(item.sessiondate).toLocaleDateString();
      }
      if (item.classdate) {
        item.classdate = new Date(item.classdate).toLocaleDateString();
      }
      if (item.yarddate) {
        item.yarddate = new Date(item.yarddate).toLocaleDateString();
      }
      if (item.licenseexpiry) {
        item.licenseexpiry = new Date(item.licenseexpiry).toLocaleDateString();
      }
      if (item.permitexpiry) {
        item.permitexpiry = new Date(item.permitexpiry).toLocaleDateString();
      }
      if (item.permitissue) {
        item.permitissue = new Date(item.permitissue).toLocaleDateString();
      }
      if (item.dob) {
        item.dob = new Date(item.dob).toLocaleDateString();
      }
      if (item.nicexpiry) {
        item.nicexpiry = new Date(item.nicexpiry).toLocaleDateString();
      }
      if (item.medicalexpiry) {
        item.medicalexpiry = new Date(item.medicalexpiry).toLocaleDateString();
      }
      return item;
    });
    setTimeout(() => {
      console.log("Message after delay");
      return res.status(constants.SUCCESS).json(formattedResponse);
    }, 2000);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});
/**
 * @description get session from ID
 * @route GET /api/session/:id
 * @access private
 */
const getSession = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.sessionFindByID(id);
    if (!result.length > 0) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }

    let dataFromDatabase = result;
    const formattedResponse = dataFromDatabase.map((item) => {
      if (item.sessiondate) {
        item.sessiondate = new Date(item.sessiondate).toLocaleDateString();
      }
      if (item.classdate) {
        item.classdate = new Date(item.classdate).toLocaleDateString();
      }
      if (item.yarddate) {
        item.yarddate = new Date(item.yarddate).toLocaleDateString();
      }
      return item;
    });

    return res.status(constants.SUCCESS).json(formattedResponse);
    //return res.status(200).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description update session against param id
 * @route PUT /api/session/:id
 * @access private
 */
const updateSession = asyncHandler(async (req, res) => {
  try {
    const {
      sessionDate,
      locationId,
      resultId,
      stageId,
      titleId,
      vehicleId,
      totalScore,
      classdate,
      yarddate,
      weather,
      traffic,
      route,
      quizscore,
      comment,
      assessmentData,
    } = req.body.obj;
    const id = req.params.id;
    const { userid } = req.body;

    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }

    if (!sessionDate || !userid || !assessmentData) {
      return res.status(constants.UNPROCESSABLE).json({
        message:
          "Please fill in all fields (sessionDate, userid and assessmentData)",
      });
    }

    const session = await db.sessionFindByID(id);
    if (session.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }

    //return res.status(200).json({ message: "Successfull" });
    const result = await db.sessionUpdateByID(
      id,
      sessionDate,
      locationId,
      resultId,
      stageId,
      titleId,
      vehicleId,
      totalScore,
      classdate,
      yarddate,
      weather,
      traffic,
      route,
      quizscore,
      comment,
      userid,
      assessmentData
    );

    return res.status(constants.CREATED).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});
/**
 * @description delete session against param id
 * @route DELETE /api/session/:id
 * @access private
 */
const deleteSession = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const session = await db.sessionFindByID(id);
    if (session.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.sessionDeleteByID(id);
    return res.status(constants.CREATED).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

module.exports = {
  getAssessments,
  createAssessment,
  getSessionByDate,
  getSession,
  updateSession,
  deleteSession,
  createSessionTraining,
  getSessionTraining,
  deleteSessionTraining,
  getAssessmentsExp,
  getSessionReportByDate,
  getSessionReportAll,
};
