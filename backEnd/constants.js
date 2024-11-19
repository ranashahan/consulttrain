exports.constants = {
  VALIDATION_ERROR: 400,
  UNAUTHORIZED: 401,
  FORBIDDIN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  UNPROCESSABLE: 422,
  CONFLICT: 409,
  // TTL: 1000 * 60 * 60,
  TTL: 1000 * 60 * 5,
  ACCESSTOKENSECRET: "consultToken",
  // ACCESSTOKENEXPIRESIN: '30s',
  ACCESSTOKENEXPIRESIN: "1d",

  REFRESHTOKENSECRET: "consultRefreshToken",
  REFRESHTOKENEXPIRESIN: "1w",

  CACHETEMPORARYTOKENPREFIX: "temp_token:",
  CACHETEMPORARYTOKENEXPIRESINSECONDS: 180,
  ALLROLES: ["admin", "manager", "staff", "member", "guest"],
  ALLSTAFF: ["admin", "manager", "staff", "member"],
  MANAGERS: ["admin", "manager"],
};
