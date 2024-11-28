const asyncHandler = require("express-async-handler");
const db = require("../dataBase/contractorQ");
const { constants } = require("../constants");

/**
 * @description Create a Contractor
 * @route POST /api/contractor/create
 * @access private
 */
const createContractor = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      ntnnumber,
      contactname,
      contactnumber,
      contactdesignation,
      contactdepartment,
      address,
      initials,
      clientid,
    } = req.body.obj;
    const { userid } = req.body;
    console.log(req.body);

    if (!name || !userid || !clientid) {
      return res.status(constants.UNPROCESSABLE).json({
        message:
          "Please fill in all fields (Contractor Name, clientid and userid)",
      });
    }
    const [contractorid] = await db.contractorFind(name);
    if (contractorid) {
      return res
        .status(constants.CONFLICT)
        .json({ message: name + " Contractor already exists" });
    }

    const newContractor = await db.contractorCreate(
      name,
      description,
      ntnnumber,
      contactname,
      contactnumber,
      contactdesignation,
      contactdepartment,
      address,
      initials,
      clientid,
      userid
    );
    const contractorID = JSON.stringify(newContractor[0]);

    return res.status(constants.CREATED).json({
      message: `Contractor created successfully with contractorID: ${
        JSON.parse(contractorID).insertId
      }`,
    });
  } catch (error) {
    return res.status(constants.SERVER_ERROR).json({ message: error.message });
  }
});

/**
 * @description get all the Contractors
 * @route GET /api/contractor/getAll
 * @access private
 */
const getContractors = asyncHandler(async (req, res) => {
  try {
    const result = await db.contractorAll();
    return res.status(constants.SUCCESS).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description get Contractor from ID
 * @route GET /api/contractor/:id
 * @access private
 */
const getContractor = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.contractorFindByID(id);
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
 * @description update contractor against param id
 * @route PUT /api/contractor/:id
 * @access private
 */
const updateContractor = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      description,
      ntnnumber,
      contactname,
      contactnumber,
      contactdesignation,
      contactdepartment,
      address,
      initials,
      clientid,
      userid,
    } = req.body;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const contractor = await db.contractorFindByID(id);
    if (contractor.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }

    const result = await db.contractorUpdateByID(
      name,
      description,
      ntnnumber,
      contactname,
      contactnumber,
      contactdesignation,
      contactdepartment,
      address,
      initials,
      clientid,
      userid,
      id
    );

    return res.status(constants.CREATED).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});
/**
 * @description delete contractor against param id
 * @route DELETE /api/contractor/:id
 * @access private
 */
const deleteContractor = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const contractor = await db.contractorFindByID(id);
    if (contractor.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.contractorDeleteByID(id);
    return res.status(constants.CREATED).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

module.exports = {
  deleteContractor,
  updateContractor,
  getContractor,
  getContractors,
  createContractor,
};
