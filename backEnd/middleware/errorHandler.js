const {constants} = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.NOT_FOUND:
            res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
            break;
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Failed", message: err.message, stackTrace: err.stack });
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "UnAuthorized", message: err.message, stackTrace: err.stack });
            break;
        case constants.FORBIDDIN:
            res.json({ title: "Forbiddin", message: err.message, stackTrace: err.stack });
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "Server error", message: err.message, stackTrace: err.stack });
            break;
        default: console.log("no error");break;
    }




};
module.exports = errorHandler;
