const { STATUS_CODES } = require('http');
const { getUrl } = require('.');

/**
 * Sends a consistent HTTP response.
 *
 * @param {RequestObject} request - Express.js response object.
 * @param {ResponseObject} response - Express.js response object.
 * @param {Number} [statusCode=200] - HTTP status code.
 * @param {String} [message=''] - Message to include in the response.
 * @param {Object|null} [data=null] - Optional data payload.
 * @param {Error|Object} [error=null] - Optional error object.
 * @param {boolean} [success=null] - Indicates success or failure.
 */


function responseHandler(

  request,
  response, 
  statusCode = 200, 
  message = '', 
  data = null, 
  error = null,
  success = null,
  
  ) {

  if(!response) return null

  success = typeof success === 'boolean' ? success : statusCode < 400
  message = message || STATUS_CODES[statusCode] || 'Unknown Status';
  
  const timestamp = new Date()
    .toISOString()
    .replace('T', ' ')
    .replace('Z', '')

    
  let logMsg = 'Response Sent'
  if(error) logMsg = 'Error Sent' 
  console.log(`[${timestamp}] [${request.route.stack[0].name}] [${logMsg}]`)

  return response.status(statusCode).json({
    success,
    message,
    data,
    error,
    timestamp,
    url: getUrl(request),
    requestType: request.method
  })  

}


module.exports = responseHandler