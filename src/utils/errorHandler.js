const BaseError = require("../errors/base.error");
const responseHandler = require("./responseHandler");
const InternalServerError = require('../errors/serverSide/internalServer.error');

function errorHandler( err, req, res, _ ) {
  
  console.log(err)

  // We won't show Internal Errors since it may be a vulnerability
  if(!(err instanceof BaseError))
  err = new InternalServerError(err.details)

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

module.exports = errorHandler
