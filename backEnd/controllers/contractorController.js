const asyncHandler = require("express-async-handler");
const db = require("../dataBase/contractorQ");
const cc = require("../dataBase/ccQ");

/**
 * @description Create a Contractor
 * @route POST /api/contractor/create
 * @access private
 */
const createContractor = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      ntnnumber,
      contactname,
      contactnumber,
      contactdesignation,
      contactdepartment,
      address,
      initials,
      clientids,
    } = req.body.obj;
    const { userid } = req.body;

    if (!name || !userid || clientids.length < 1) {
      return res.status(422).json({
        message:
          "Please fill in all fields (Contractor Name client name and userid)",
      });
    }
    const [contractorid] = await db.contractorFind(name);
    if (contractorid) {
      return res
        .status(409)
        .json({ message: name + " Contractor already exists" });
    }

    const newContractor = await db.contractorCreate(
      name,
      ntnnumber,
      contactname,
      contactnumber,
      contactdesignation,
      contactdepartment,
      address,
      initials,
      userid
    );
    const contractorID = JSON.stringify(newContractor[0]);
    const newRelationship = await cc.ccCreate(
      clientids,
      JSON.parse(contractorID).insertId
    );
    //console.log(newRelationship);
    const info = JSON.stringify(newRelationship[0]);
    console.log(JSON.parse(info).info);
    return res.status(201).json({
      message: `Contractor created successfully with contractorID: ${
        JSON.parse(contractorID).insertId
      }, ${JSON.parse(info).info}`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
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
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.contractorFindByID(id);
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
 * @description update contractor against param id
 * @route PUT /api/contractor/:id
 * @access private
 */
const updateContractor = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      ntnnumber,
      contactname,
      contactnumber,
      contactdesignation,
      contactdepartment,
      address,
      initials,
      clientids,
      userid,
    } = req.body;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const contractor = await db.contractorFindByID(id);
    if (contractor.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }

    const deleteContractor = await cc.ccDeleteByContractor(id);
    // console.log(deleteContractor);

    const result = await db.contractorUpdateByID(
      name,
      ntnnumber,
      contactname,
      contactnumber,
      contactdesignation,
      contactdepartment,
      address,
      initials,
      userid,
      id
    );
    const newRelationship = await cc.ccCreate(clientids, id);
    // console.log(newRelationship);

    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
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
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const contractor = await db.contractorFindByID(id);
    if (contractor.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.contractorDeleteByID(id);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

module.exports = {
  deleteContractor,
  updateContractor,
  getContractor,
  getContractors,
  createContractor,
};
