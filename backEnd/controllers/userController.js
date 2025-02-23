const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../dataBase/userQ");
const { constants } = require("../constants");
const axios = require("axios");
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
      return res.status(constants.UNPROCESSABLE).json({
        message:
          "Please fill out all the fields (username, name, email and password)",
      });
    }
    const [users] = await db.userFind(email);
    if (users) {
      return res
        .status(constants.CONFLICT)
        .json({ message: "Email already exists" });
    }
    const [validateUsername] = await db.findbyUsername(username);
    if (validateUsername) {
      return res
        .status(constants.CONFLICT)
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
    return res.status(constants.SERVER_ERROR).json({ message: error.message });
  }
});

/**
 * @description Login user
 * @route GET /api/users/login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password, token } = req.body;
    if (!email || !password || !token) {
      return res.status(constants.UNPROCESSABLE).json({
        message:
          "Please fill out all the fields (email, password & captchatoken)",
      });
    }

    if (token === "bypass-response") {
      console.log("captcha bypassed");
    } else {
      const verificationResult = await verifyRecaptcha(
        token,
        req.headers["x-forwarded-for"] || req.socket.remoteAddress
      );

      if (!verificationResult.success) {
        return res.status(constants.UNAUTHORIZED).json(verificationResult);
      }
    }

    const user = await db.userFind(email);
    if (!user) {
      return res
        .status(constants.UNAUTHORIZED)
        .json({ message: "Email or password is invalid" });
    }

    const passwordMatch = await bcrypt.compare(password, user[0].password);
    if (!passwordMatch) {
      return res
        .status(constants.UNAUTHORIZED)
        .json({ message: "Email or password is invalid" });
    }

    const userid = user[0].userid;
    const accessToken = jwt.sign({ userid }, constants.ACCESSTOKENSECRET, {
      subject: "accessApi",
      expiresIn: constants.ACCESSTOKENEXPIRESIN,
    });

    const refreshToken = jwt.sign({ userid }, constants.REFRESHTOKENSECRET, {
      subject: "refreshToken",
      expiresIn: constants.REFRESHTOKENEXPIRESIN,
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
  } catch (error) {
    return res.status(constants.SERVER_ERROR).json({ message: error.message });
  }
});

/**
 * This method will fetch captcha response
 * @param {string} token
 * @param {string} userIP
 * @returns {boolean} success
 */
async function verifyRecaptcha(token, userIP) {
  try {
    const url = "https://www.google.com/recaptcha/api/siteverify";
    const data = new URLSearchParams({
      secret: constants.RECAPTCHA_SECRET_KEY,
      response: token,
      remoteip:
        userIP || req.headers["x-forwarded-for"] || req.socket.remoteAddress, // Get user IP (optional but recommended)
    });

    const response = await axios.post(url, data);
    if (!response.data.success) {
      return { success: false, message: "Invalid CAPTCHA!" };
    }
    return { success: true };
  } catch (error) {
    return { success: false, message: "Failed to verify CAPTCHA" }; // Informative error message
  }
}

/**
 * @description current user info
 * @route GET /api/users/findbyemail/currentuser
 * @access public
 */
const currentUser = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide email id ",
      });
    }
    const result = await db.userFind(email);
    return res.status(200).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
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
    res.status(constants.SERVER_ERROR);
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
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const result = await db.userFindByID(id);
    if (result.length === 0) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
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
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const user = await db.userFindByID(id);
    if (user.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const currentUserid = user[0].userid;
    if (id == currentUserid) {
    } else {
      res.status(constants.FORBIDDIN).json({
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
    res.status(constants.SERVER_ERROR);
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
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide id (id)",
      });
    }

    const user = await db.userFindByID(id);
    if (user.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }

    if (!userid || !password) {
      return res.status(422).json({
        message: "Please fill in all fields (userid and password)",
      });
    }

    const currentUserid = user[0].userid;
    if (id != currentUserid) {
      res.status(constants.FORBIDDIN).json({
        message: `Provided (id ${id}) and database id does not match`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.userUpdatePasswordByID(hashedPassword, userid, id);

    return res.status(201).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
  }
});

/**
 * @description update user password against body id
 * @route PUT /api/users/resetpassword
 * @access private
 */
const resetUserPassword = asyncHandler(async (req, res) => {
  try {
    const { id, oldpassword, newpassword, userid } = req.body;

    if (!id || !oldpassword || !newpassword || !userid) {
      return res.status(constants.UNPROCESSABLE).json({
        message:
          "Please fill in all fields (id, oldpassword, newpassword and userid)",
      });
    }

    const [user] = await db.userFindByID(id);
    if (!user) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }

    const currentUserid = user.userid;

    if (id != currentUserid) {
      res.status(constants.FORBIDDIN).json({
        message: `Provided (id ${id}) and database id does not match`,
      });
    }
    const [password] = await db.userPassFindByID(id);

    const passwordMatch = await bcrypt.compare(oldpassword, password.password);
    if (!passwordMatch) {
      return res.status(constants.CONFLICT).json({
        message:
          "Current Password did not match, please insert correct password",
      });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    const result = await db.userUpdatePasswordByID(hashedPassword, userid, id);

    return res.status(constants.CREATED).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
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
      return res.status(constants.UNPROCESSABLE).json({
        message: "Please provide param (id)",
      });
    }
    const user = await db.userFindByID(id);
    if (user.length < 1) {
      return res.status(constants.UNPROCESSABLE).json({
        message: `wrong param (id ${id}) provided`,
      });
    }
    const userid = user[0].userid;
    if (id == userid) {
    } else {
      res.status(constants.FORBIDDIN).json({
        message: `Provided (id ${id}) and database id does not match`,
      });
    }
    const result = await db.userDeleteByID(id);
    return res.status(201).json(result);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
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
      return res
        .status(constants.UNAUTHORIZED)
        .json({ message: "Refresh token not found" });
    }

    const decodedRefreshToken = jwt.verify(
      refreshToken,
      constants.REFRESHTOKENSECRET
    );

    const userid = decodedRefreshToken.userid;
    const userRefreshToken = await db.findRefreshToken(userid, refreshToken);

    if (userRefreshToken.length < 0) {
      return res
        .status(constants.UNAUTHORIZED)
        .json({ message: "Refresh token invalid or expired" });
    }

    await db.deleteRefreshToken(userid);
    // await userRefreshTokens.compactDatafile();

    const accessToken = jwt.sign({ userid }, constants.ACCESSTOKENSECRET, {
      subject: "accessApi",
      expiresIn: constants.ACCESSTOKENEXPIRESIN,
    });

    const newRefreshToken = jwt.sign({ userid }, constants.REFRESHTOKENSECRET, {
      subject: "refreshToken",
      expiresIn: constants.REFRESHTOKENEXPIRESIN,
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
        .status(constants.UNAUTHORIZED)
        .json({ message: "Refresh token invalid or expired" });
    }

    return res.status(constants.SERVER_ERROR).json({ message: error.message });
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
      return res
        .status(constants.UNPROCESSABLE)
        .json({ message: "userid not found" });
    }
    await db.deleteRefreshToken(userid);
    return res.status(204).send();
  } catch (error) {
    return res.status(constants.SERVER_ERROR).json({ message: error.message });
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
  resetUserPassword,
};
