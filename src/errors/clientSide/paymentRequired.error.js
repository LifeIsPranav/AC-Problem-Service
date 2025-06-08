const BaseError = require("../base.error");
const { StatusCodes } = require('http-status-codes')

class PaymentRequired extends BaseError {
  constructor() {
    super("PaymentRequired", StatusCodes.PAYMENT_REQUIRED, 'You need to Pay to access this Resource!', "Please Purchase to Unlock")
  }
}


module.exports = PaymentRequired