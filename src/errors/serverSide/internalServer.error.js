const BaseError = require("../base.error");
const { StatusCodes } = require('http-status-codes')

class InternalServerError extends BaseError {
  constructor(details = "Internal Server Error") {
    super("InternalServerError", StatusCodes.INTERNAL_SERVER_ERROR, 'Something went Wrong', details)
  }
}


module.exports = InternalServerError