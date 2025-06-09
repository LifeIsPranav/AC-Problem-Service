const { getUrl } = require("../../utils");
const BaseError = require("../base.error");


const { StatusCodes } = require('http-status-codes')

/**
* @param {RequestObject} request
*/ 

class NotImplemented extends BaseError {
  constructor(request, details = "Not Implemented") {
    const str = request ? `${request.route.stack[0].name} at ${request.method}: ${getUrl(request)} Not Implemented` : 'This Method is Not Implemented'
    super("NotImplemented", StatusCodes.NOT_IMPLEMENTED, str, details)
  }
}


module.exports = NotImplemented