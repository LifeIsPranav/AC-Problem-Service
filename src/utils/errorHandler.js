const BaseError = require("../errors/base.error");
const responseHandler = require("../formats/response.format");
const InternalServerError = require('../errors/internalServer.error');

function errorHandler(err, req, res, next) {
  
  if(!(err instanceof BaseError))
  err = new InternalServerError(err.details)

  console.log(err)
  if(err instanceof BaseError){
    return responseHandler(
      req,
      res,
      err.statusCode,
      err.message,
      {},
      err.details,
      false
    )
  }

}

module.exports = errorHandler
