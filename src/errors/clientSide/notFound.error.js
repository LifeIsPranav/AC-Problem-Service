const BaseError = require("../base.error");
const { StatusCodes } = require('http-status-codes')

class NotFound extends BaseError {
  constructor() {
    super("NotFound", StatusCodes.NOT_FOUND, 'The Resource You were looking isn\'t Available!', "Resource Not Found")
  }
}


module.exports = NotFound