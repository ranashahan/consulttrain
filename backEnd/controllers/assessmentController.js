const asyncHandler = require("express-async-handler");
const db = require("../dataBase/assessmentQ");

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
      trainerIds,
      assessmentData,
    } = req.body.obj;
    const { driverId, userid } = req.body;
    if (
      !sessionName ||
      !sessionDate ||
      !userid ||
      !driverId ||
      !trainerIds ||
      !assessmentData
    ) {
      return res.status(422).json({
        message:
          "Please fill in all fields (sessionName, sessionDate, driverId, trainerIds, userid and assessmentData)",
      });
    }
    const [assessment] = await db.sessionFind(sessionName);
    if (assessment) {
      return res
        .status(409)
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
      userid,
      driverId,
      trainerIds,
      assessmentData
    );

    const newAssessmentmessage = JSON.stringify(newAssessment[0]);
    if (newAssessment.affectedRows == 1) {
      return res.status(201).json({
        message: `assessment created successfully`,
      });
    } else {
      return res.status(422).json({ message: newAssessmentmessage });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    //console.log(results);

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

    return res.status(200).json(categories);
  } catch (error) {
    res.status(500);
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

    return res.status(200).json(results);
  } catch (error) {
    res.status(500);
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
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.sessionFindByID(id);
    if (!result.length > 0) {
      return res.status(422).json({
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

    return res.status(200).json(formattedResponse);
    //return res.status(200).json(result);
  } catch (error) {
    res.status(500);
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
      assessmentData,
    } = req.body.obj;
    const id = req.params.id;
    const { userid } = req.body;

    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }

    if (!sessionDate || !userid || !assessmentData) {
      return res.status(422).json({
        message:
          "Please fill in all fields (sessionDate, userid and assessmentData)",
      });
    }

    const session = await db.sessionFindByID(id);
    if (session.length < 1) {
      return res.status(422).json({
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
      userid,
      assessmentData
    );

    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
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
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const session = await db.sessionFindByID(id);
    if (session.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.sessionDeleteByID(id);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

module.exports = {
  getAssessments,
  createAssessment,
  getSessionByDate,
  getSession,
  updateSession,
  deleteSession,
};
