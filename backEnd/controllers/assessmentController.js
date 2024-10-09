const asyncHandler = require("express-async-handler");
const db = require("../dataBase/assessmentQ");
const dbSlave = require("../dataBase/slavecategoryQ");

// /**
//  * @description Create a assessment
//  * @route POST /api/assessment/create
//  * @access private
//  */
// const createaassessment = asyncHandler(async (req, res) => {
//   try {
//     const { name, description, initials, slavecategoryid, userid } = req.body;

//     if (!name || !slavecategoryid || !userid) {
//       return res.status(422).json({
//         message:
//           "Please fill in all fields (assessment name, slavecategoryid and userid)",
//       });
//     }
//     const [assessment] = await db.assessmentFind(name);
//     if (assessment) {
//       return res
//         .status(409)
//         .json({ message: name + " assessment already exists" });
//     }

//     const slavecategory = await dbSlave.scFindByID(slavecategoryid);
//     if (slavecategory < 1) {
//       return res.status(409).json({
//         message: `wrong slavecategoryid (id ${slavecategoryid}) provided`,
//       });
//     }

//     const newassessment = await db.assessmentCreate(
//       name,
//       description,
//       initials,
//       slavecategoryid,
//       userid
//     );
//     const assessmentid = JSON.stringify(newassessment[0]);

//     return res.status(201).json({
//       message: `assessment created successfully with ID: ${
//         JSON.parse(assessmentid).insertId
//       }`,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

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

module.exports = {
  getAssessments,
};
