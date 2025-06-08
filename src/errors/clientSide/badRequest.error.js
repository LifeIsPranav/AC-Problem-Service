const BaseError = require("../base.error");
const { StatusCodes } = require('http-status-codes')

class BadRequest extends BaseError {
  constructor(propertyName = "Resource", details = "Bad Request") {
    super("BadRequest", StatusCodes.BAD_REQUEST, `Invalid Structure for ${propertyName} provided`, details)
  }
}


module.exports = BadRequest