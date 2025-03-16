const asyncHandler = require("express-async-handler");
const db = require("../dataBase/courseQ");
const { constants } = require("../constants");

/**
 * @description Create a course
 * @route POST /api/course/create
 * @access private
 */
const createCourse = asyncHandler(async (req, res) => {
  try {
    const { name, description, userid } = req.body;

    if (!name || !userid) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please fill in all fields (course name and userid)",
      });
    }
    const [course] = await db.courseFind(name);
    if (course) {
      return res
        .status(constants.CONFLICT)
        .json({ message: name + " course already exists" });
    }

    const newcourse = await db.courseCreate(name, description, userid);
    const courseid = JSON.stringify(newcourse[0]);

    return res.status(constants.CREATED).json({
      message: `course created successfully with ID: ${
        JSON.parse(courseid).insertId
      }`,
    });
  } catch (error) {
    return res.status(constants.SERVER_ERROR).json({ message: error.message });
  }
});

/**
 * @description get all the courses
 * @route GET /api/course/getAll
 * @access private
 */
const getCourses = asyncHandler(async (req, res) => {
  try {
    const result = await db.courseAll();
    return res.status(constants.SUCCESS).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description get course from ID
 * @route GET /api/course/:id
 * @access private
 */
const getCourse = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.courseFindByID(id);
    if (!result.length > 0) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    return res.status(constants.SUCCESS).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description update course against param id
 * @route PUT /api/course/:id
 * @access private
 */
const updateCourse = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, userid } = req.body;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const course = await db.courseFindByID(id);
    if (course.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.courseUpdateByID(name, description, userid, id);

    return res.status(constants.CREATED).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description delete course against param id
 * @route DELETE /api/course/:id
 * @access private
 */
const deleteCourse = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const course = await db.courseFindByID(id);
    if (course.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.courseDeleteByID(id);
    return res.status(constants.CREATED).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

module.exports = {
  deleteCourse,
  updateCourse,
  getCourse,
  getCourses,
  createCourse,
};
