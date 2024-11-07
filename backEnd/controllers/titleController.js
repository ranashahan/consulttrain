const asyncHandler = require("express-async-handler");
const db = require("../dataBase/titleQ");

/**
 * @description Create a title
 * @route POST /api/title/create
 * @access private
 */
const createTitle = asyncHandler(async (req, res) => {
  try {
    const { name, description, userid } = req.body;

    if (!name || !userid) {
      return res.status(422).json({
        message: "Please fill in all fields (title name and userid)",
      });
    }
    const [title] = await db.titleFind(name);
    if (title) {
      return res.status(409).json({ message: name + " title already exists" });
    }

    const newtitle = await db.titleCreate(name, description, userid);
    const titleid = JSON.stringify(newtitle[0]);

    return res.status(201).json({
      message: `title created successfully with ID: ${
        JSON.parse(titleid).insertId
      }`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @description get all the titles
 * @route GET /api/title/getAll
 * @access private
 */
const getTitles = asyncHandler(async (req, res) => {
  try {
    const result = await db.titleAll();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description get title from ID
 * @route GET /api/title/:id
 * @access private
 */
const getTitle = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.titleFindByID(id);
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
 * @description update title against param id
 * @route PUT /api/title/:id
 * @access private
 */
const updateTitle = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, userid } = req.body;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const title = await db.titleFindByID(id);
    if (title.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.titleUpdateByID(name, description, userid, id);

    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});
/**
 * @description delete title against param id
 * @route DELETE /api/title/:id
 * @access private
 */
const deleteTitle = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const title = await db.titleFindByID(id);
    if (title.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.titleDeleteByID(id);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

module.exports = {
  deleteTitle,
  updateTitle,
  getTitle,
  getTitles,
  createTitle,
};
