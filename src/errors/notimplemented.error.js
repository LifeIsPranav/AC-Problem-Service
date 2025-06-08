const getUrl = require("../utils/getUrl");
const BaseError = require("./base.error");
const { StatusCodes } = require('http-status-codes')

/**
*
* @param {RequestObject} request
*
*/ 

class NotImplemented extends BaseError {
  constructor(request) {
    super("NotImplemented", StatusCodes.NOT_IMPLEMENTED, `${request.route.stack[0].name} at ${request.method}: ${getUrl(request)} Not Implemented`, {})
  }
}


module.exports = NotImplemented