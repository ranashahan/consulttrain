const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const db = require("../dataBase/userQ");
const { LRUCache } = require("lru-cache");
const { constants } = require("../constants");

const cache = new LRUCache({
  max: 500,
  ttl: constants.TTL, // Time-to-live (TTL) in milliseconds
});

const cacheMiddleware = asyncHandler(async (req, res, next) => {
  if (
    process.env.NODE_ENV === "test" ||
    process.env.NODE_ENV === "production"
  ) {
    const key = req.originalUrl; // Use the request URL as the cache key

    const cachedResponse = cache.get(key);
    if (cachedResponse) {
      // res.set("Cache-Control", "public, max-age=3600");
      res.set("Cache-Control", "public, max-age=300");
      res.send(cachedResponse);
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        res.set("Cache-Control", "no-store");
        const jsonBody = JSON.parse(body);
        cache.set(key, jsonBody);
        res.sendResponse(body);
      };
      next();
    }
  } else {
    next();
  }
});

const ensureAuthenticated = asyncHandler(async (req, res, next) => {
  let accessToken = req.headers.authorization || req.headers.Authorization;

  if (!accessToken) {
    return res
      .status(constants.UNAUTHORIZED)
      .json({ message: "Access token not found" });
  }

  try {
    const decodedAccessToken = jwt.verify(
      accessToken,
      constants.ACCESSTOKENSECRET
    );

    req.accessToken = { value: accessToken, exp: decodedAccessToken.exp };
    req.user = decodedAccessToken.userid;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(constants.UNAUTHORIZED)
        .json({ message: "Access token expired", code: "AccessTokenExpired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(constants.UNAUTHORIZED)
        .json({ message: "Access token invalid", code: "AccessTokenInvalid" });
    } else {
      return res
        .status(constants.SERVER_ERROR)
        .json({ message: error.message });
    }
  }
});

const roleAuthorize = (roles = []) => {
  return asyncHandler(async (req, res, next) => {
    const user = await db.userFindByID(req.user);
    if (!user) {
      return res
        .status(constants.FORBIDDIN)
        .json({ message: "Access denied: Insufficient permissions" });
    }
    const userRole = JSON.parse(JSON.stringify(user[0])).role;

    if (!roles.includes(userRole)) {
      return res
        .status(constants.FORBIDDIN)
        .json({ message: "Access denied: Insufficient permissions" });
    }

    // Proceed to the next middleware if role is valid
    next();
  });
};

module.exports = { ensureAuthenticated, roleAuthorize, cacheMiddleware };
