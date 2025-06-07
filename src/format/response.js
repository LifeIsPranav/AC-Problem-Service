const { STATUS_CODES } = require('http')

/**
 * Sends a consistent HTTP response.
 *
 * @param {ResponseObject} response - Express.js response object.
 * @param {Number} [statusCode=200] - HTTP status code.
 * @param {String} [message=''] - Message to include in the response.
 * @param {Object|null} [data=null] - Optional data payload.
 * @param {Error|Object} [error=null] - Optional error object.
 * @param {boolean} [success=null] - Indicates success or failure.
 */


function responseHandler(

  response, 
  statusCode = 200, 
  message = '', 
  data = null, 
  error = null,
  success = null
  
  ) {

  if(!response) return false

  success = typeof success === 'boolean' ? success : statusCode < 400
  message = message || STATUS_CODES[statusCode] || 'Unknown Status';

  console.log("Response Sent!")
  response.status(statusCode).json({
    success,
    message,
    data,
    error,
    timestamp: new Date().toISOString()
  })

  return true

}


module.exports = responseHandler