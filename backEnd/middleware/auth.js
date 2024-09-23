const asyncHandler = require("express-async-handler");
const config = require("../config");
const jwt = require("jsonwebtoken");
const db = require("../dataBase/userQ");

const ensureAuthenticated = asyncHandler(async (req, res, next) => {
  let accessToken = req.headers.authorization || req.headers.Authorization;

  if (!accessToken) {
    return res.status(401).json({ message: "Access token not found" });
  }

  try {
    const decodedAccessToken = jwt.verify(
      accessToken,
      config.accessTokenSecret
    );

    req.accessToken = { value: accessToken, exp: decodedAccessToken.exp };
    req.user = decodedAccessToken.userid;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ message: "Access token expired", code: "AccessTokenExpired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ message: "Access token invalid", code: "AccessTokenInvalid" });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
});

const roleAuthorize = (roles = []) => {
  return asyncHandler(async (req, res, next) => {
    // console.log(req.user);
    const user = await db.userFindByID(req.user);

    if (!user) {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient permissions" });
    }

    const userRole = JSON.parse(JSON.stringify(user[0])).role;

    if (!roles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient permissions" });
    }

    // Proceed to the next middleware if role is valid
    next();
  });
};

module.exports = { ensureAuthenticated, roleAuthorize };
