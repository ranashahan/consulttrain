const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../config");
const db = require("../dataBase/userQ");

/**
 * @description Register a user
 * @route POST /api/users/register
 * @access public
 */
const registerUser = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password,
      mobile,
      company,
      designation,
      imagepath,
      role,
    } = req.body.obj;

    if (!username || !name || !email || !password) {
      return res.status(422).json({
        message:
          "Please fill in all fields (username, name, email and password)",
      });
    }
    const [users] = await db.userFind(email);
    if (users) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const [validateUsername] = await db.findbyUsername(username);
    if (validateUsername) {
      return res
        .status(409)
        .json({ message: username + " Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.createUser(
      username,
      email,
      hashedPassword,
      name,
      mobile,
      company,
      designation,
      imagepath,
      role
    );
    const useridjson = JSON.stringify(newUser[0]);

    return res.status(201).json({
      message: `User registered successfully with userid: ${
        JSON.parse(useridjson).insertId
      }`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @description Login user
 * @route GET /api/users/login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(422)
        .json({ message: "Please fill in all fields (email and password)" });
    }

    const user = await db.userFind(email);
    if (!user) {
      return res.status(401).json({ message: "Email or password is invalid" });
    }

    const passwordMatch = await bcrypt.compare(password, user[0].password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password is invalid" });
    }

    const userid = user[0].userid;
    const accessToken = jwt.sign({ userid }, config.accessTokenSecret, {
      subject: "accessApi",
      expiresIn: config.accessTokenExpiresIn,
    });

    const refreshToken = jwt.sign({ userid }, config.refreshTokenSecret, {
      subject: "refreshToken",
      expiresIn: config.refreshTokenExpiresIn,
    });

    await db.createRefreshToken(userid, refreshToken);

    return res.status(200).json({
      id: userid,
      email: user[0].email,
      username: user[0].username,
      role: user[0].role,
      accessToken,
      refreshToken,
    });
    // }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @description current user info
 * @route GET /api/users/findbyemail/currentuser
 * @access public
 */
const currentUser = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(422).json({
        message: "Please provide email id ",
      });
    }
    const result = await db.userFind(email);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description get all the users
 * @route GET /api/users/getusers
 * @access private
 */
const getUsers = asyncHandler(async (req, res) => {
  try {
    const result = await db.allUsers();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description get user from ID
 * @route GET /api/users/:id
 * @access private
 */
const getUser = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.userFindByID(id);
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
 * @description update user against param id
 * @route PUT /api/users/:id
 * @access private
 */
const updateUser = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, mobile, company, designation, imagepath, role, userid } =
      req.body;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const user = await db.userFindByID(id);
    if (user.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const currentUserid = user[0].userid;
    if (id == currentUserid) {
    } else {
      res.status(403).json({
        message: `Provided (id ${id}) and database id does not match`,
      });
    }
    const result = await db.userUpdateByID(
      name,
      mobile,
      company,
      designation,
      imagepath,
      role,
      userid,
      id
    );

    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description update user password against body id
 * @route PUT /api/users/newpassword
 * @access private
 */
const updateUserPassword = asyncHandler(async (req, res) => {
  try {
    const { id, password, userid } = req.body;
    if (!id) {
      return res.status(422).json({
        message: "Please provide id (id)",
      });
    }

    const user = await db.userFindByID(id);
    if (user.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }

    if (!userid || !password) {
      return res.status(422).json({
        message: "Please fill in all fields (userid and password)",
      });
    }

    const currentUserid = user[0].userid;
    if (id == currentUserid) {
    } else {
      res.status(403).json({
        message: `Provided (id ${id}) and database id does not match`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.userUpdatePasswordByID(hashedPassword, userid, id);

    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description delete user against param id
 * @route DELETE /api/users/:id
 * @access private
 */
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "Please provide param (id)",
      });
    }
    const user = await db.userFindByID(id);
    if (user.length < 1) {
      return res.status(422).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const userid = user[0].userid;
    if (id == userid) {
    } else {
      res.status(403).json({
        message: `Provided (id ${id}) and database id does not match`,
      });
    }
    const result = await db.userDeleteByID(id);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500);
  }
});

/**
 * @description Refresh token
 * @route Post /api/users/refreshtoken
 * @access public
 */
const refreshToken = asyncHandler(async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    const decodedRefreshToken = jwt.verify(
      refreshToken,
      config.refreshTokenSecret
    );

    //console.log(decodedRefreshToken.userid);
    const userid = decodedRefreshToken.userid;
    const userRefreshToken = await db.findRefreshToken(userid, refreshToken);

    if (userRefreshToken.length < 0) {
      return res
        .status(401)
        .json({ message: "Refresh token invalid or expired" });
    }

    await db.deleteRefreshToken(userid);
    // await userRefreshTokens.compactDatafile();

    const accessToken = jwt.sign({ userid }, config.accessTokenSecret, {
      subject: "accessApi",
      expiresIn: config.accessTokenExpiresIn,
    });

    const newRefreshToken = jwt.sign({ userid }, config.refreshTokenSecret, {
      subject: "refreshToken",
      expiresIn: config.refreshTokenExpiresIn,
    });
    await db.createRefreshToken(userid, refreshToken);

    return res.status(200).json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    if (
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.JsonWebTokenError
    ) {
      return res
        .status(401)
        .json({ message: "Refresh token invalid or expired" });
    }

    return res.status(500).json({ message: error.message });
  }
});

/**
 * @description logout user api
 * @route Post /api/users/logoutUser
 * @access public
 */
const logoutUser = asyncHandler(async (req, res) => {
  try {
    const { userid } = req.body;
    if (userid.length < 1) {
      return res.status(401).json({ message: "userid not found" });
    }
    // console.log("i am in logout user and my id is " + userid);
    await db.deleteRefreshToken(userid);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = {
  updateUser,
  getUser,
  getUsers,
  registerUser,
  loginUser,
  refreshToken,
  currentUser,
  deleteUser,
  logoutUser,
  updateUserPassword,
};
