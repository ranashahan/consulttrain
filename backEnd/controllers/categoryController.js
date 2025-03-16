const asyncHandler = require("express-async-handler");
const db = require("../dataBase/categoryQ");
const { constants } = require("../constants");

/**
 * @description Create a category
 * @route POST /api/category/create
 * @access private
 */
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name, description, userid } = req.body;

    if (!name || !userid) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please fill in all fields (category name and userid)",
      });
    }
    const [category] = await db.categoryFind(name);
    if (category) {
      return res
        .status(constants.CONFLICT)
        .json({ message: name + " category already exists" });
    }

    const newcategory = await db.categoryCreate(name, description, userid);
    const categoryid = JSON.stringify(newcategory[0]);

    return res.status(constants.CREATED).json({
      message: `category created successfully with ID: ${
        JSON.parse(categoryid).insertId
      }`,
    });
  } catch (error) {
    return res.status(constants.SERVER_ERROR).json({ message: error.message });
  }
});

/**
 * @description get all the categorys
 * @route GET /api/category/getAll
 * @access private
 */
const getCategories = asyncHandler(async (req, res) => {
  try {
    const result = await db.categoryAll();
    return res.status(constants.SUCCESS).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description get category from ID
 * @route GET /api/category/:id
 * @access private
 */
const getCategory = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.categoryFindByID(id);
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
 * @description update category against param id
 * @route PUT /api/category/:id
 * @access private
 */
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, userid } = req.body;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const category = await db.categoryFindByID(id);
    if (category.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.categoryUpdateByID(name, description, userid, id);

    return res.status(constants.CREATED).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description delete category against param id
 * @route DELETE /api/category/:id
 * @access private
 */
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const category = await db.categoryFindByID(id);
    if (category.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.categoryDeleteByID(id);
    return res.status(constants.CREATED).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

module.exports = {
  deleteCategory,
  updateCategory,
  getCategory,
  getCategories,
  createCategory,
};
