const getUrl = require("../../utils/getUrl");
const BaseError = require("../base.error");
const { StatusCodes } = require('http-status-codes')

class MethodNotAllowed extends BaseError {
  constructor(request) {
    const str = request ? `Method: '${request.method}' on ${getUrl(request)} not Allowd` : 'This Method is Not Allowed'
    super("MethodNotAllowed", StatusCodes.METHOD_NOT_ALLOWED, str, "Invalid Method Used")
  }
}


module.exports = MethodNotAllowed