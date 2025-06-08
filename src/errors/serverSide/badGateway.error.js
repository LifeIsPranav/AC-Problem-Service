const BaseError = require("../base.error");
const { StatusCodes } = require('http-status-codes')

class BadGateway extends BaseError {
  constructor() {
    super("BadGateway", StatusCodes.BAD_GATEWAY, 'This is Bad Gateway', "This is a server Side Issue")
  }
}


module.exports = BadGateway