
const { getUrl } = require("../../utils");
const BaseError = require("../base.error");
const { StatusCodes } = require('http-status-codes')

class Forbidden extends BaseError {
  constructor(request) {
    const str = request ? `You are Forbidden to ${request.method}: ${getUrl(request)}` : 'You are Forbidded'
    super("Forbidden", StatusCodes.FORBIDDEN, str, "Forbidden")
  }
}


module.exports = Forbidden