const asyncHandler = require("express-async-handler");
const db = require("../dataBase/clientQ");
const { constants } = require("../constants");
/**
 * @description Create a client
 * @route POST /api/sponsor/client/create
 * @access private
 */
const createClient = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      contactperson,
      contactnumber,
      address,
      website,
      agentname,
      agentnumber,
      industriesid,
      userid,
    } = req.body;

    if (!name || !userid) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please fill in all fields (client name and userid)",
      });
    }
    const [client] = await db.clientFind(name);
    if (client) {
      return res
        .status(constants.CONFLICT)
        .json({ message: name + " client already exists" });
    }

    const newclient = await db.clientCreate(
      name,
      description,
      contactperson,
      contactnumber,
      address,
      website,
      agentname,
      agentnumber,
      industriesid,
      userid
    );
    const clientid = JSON.stringify(newclient[0]);

    return res.status(constants.SUCCESS).json({
      message: `client created successfully with ID: ${
        JSON.parse(clientid).insertId
      }`,
    });
  } catch (error) {
    return res.status(constants.SERVER_ERROR).json({ message: error.message });
  }
});

/**
 * @description get all the clients
 * @route GET /api/sponsor/client/getAll
 * @access private
 */
const getClients = asyncHandler(async (req, res) => {
  try {
    const result = await db.clientAll();
    return res.status(constants.SUCCESS).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description get client from ID
 * @route GET /api/sponsor/client/:id
 * @access private
 */
const getClient = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.clientFindByID(id);
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
 * @description update client against param id
 * @route PUT /api/sponsor/client/:id
 * @access private
 */
const updateClient = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      description,
      contactperson,
      contactnumber,
      address,
      website,
      agentname,
      agentnumber,
      industriesid,
      userid,
    } = req.body;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const client = await db.clientFindByID(id);
    if (client.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.clientUpdateByID(
      name,
      description,
      contactperson,
      contactnumber,
      address,
      website,
      agentname,
      agentnumber,
      industriesid,
      userid,
      id
    );

    return res.status(constants.SUCCESS).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description delete client against param id
 * @route DELETE /api/sponsor/client/:id
 * @access private
 */
const deleteClient = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const client = await db.clientFindByID(id);
    if (client.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.clientDeleteByID(id);
    return res.status(constants.CREATED).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

module.exports = {
  deleteClient,
  updateClient,
  getClient,
  getClients,
  createClient,
};
