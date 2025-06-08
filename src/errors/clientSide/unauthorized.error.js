const BaseError = require("../base.error");
const { StatusCodes } = require('http-status-codes')

class Unauthorized extends BaseError {
  constructor() {
    super("Unauthorized", StatusCodes.UNAUTHORIZED, 'You are not Authorized to Access this Resource!', "Unauthorized Access Detected")
  }
}


module.exports = Unauthorized