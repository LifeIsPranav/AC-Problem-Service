const BaseError = require("../base.error");
const { StatusCodes } = require('http-status-codes')

class ServiceUnavailable extends BaseError {
  constructor(details = "Service Unavailable") {
    super("ServiceUnavailable", StatusCodes.SERVICE_UNAVAILABLE, 'Server Side Issue', details)
  }
}


module.exports = ServiceUnavailable