const asyncHandler = require("express-async-handler");
const db = require("../dataBase/clientQ");

/**
 * @description Create a client
 * @route POST /api/client/create
 * @access private
 */
const createClient = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      contactperson,
      contactnumber,
      address,
      website,
      agentname,
      agentnumber,
      userid,
    } = req.body;

    if (!name || !userid) {
      return res.status(422).json({
        message: "Please fill in all fields (client name and userid)",
      });
    }
    const [client] = await db.clientFind(name);
    if (client) {
      return res.status(409).json({ message: name + " client already exists" });
    }

    const newclient = await db.clientCreate(
      name,
      contactperson,
      contactnumber,
      address,
      website,
      agentname,
      agentnumber,
      userid
    );
    const clientid = JSON.stringify(newclient[0]);

    return res.status(201).json({
      message: `client created successfully with ID: ${
        JSON.parse(clientid).insertId
      }`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @description get all the clients
 * @route GET /api/client/getAll
 * @access private
 */
const getClients = asyncHandler(async (req, res) => {
  try {
    const result = await db.clientAll();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description get client from ID
 * @route GET /api/client/:id
 * @access private
 */
const getClient = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.clientFindByID(id);
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
 * @description update client against param id
 * @route PUT /api/client/:id
 * @access private
 */
const updateClient = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      contactperson,
      contactnumber,
      address,
      website,
      agentname,
      agentnumber,
      userid,
    } = req.body;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const client = await db.clientFindByID(id);
    if (client.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.clientUpdateByID(
      name,
      contactperson,
      contactnumber,
      address,
      website,
      agentname,
      agentnumber,
      userid,
      id
    );

    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description delete client against param id
 * @route DELETE /api/client/:id
 * @access private
 */
const deleteClient = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const client = await db.clientFindByID(id);
    if (client.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const result = await db.clientDeleteByID(id);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

module.exports = {
  deleteClient,
  updateClient,
  getClient,
  getClients,
  createClient,
};
