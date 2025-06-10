const logger = require("../config/logger.config");

/**
 * Utility function to create consistent log messages
 * @param {string} level - Log level (info, warn, error, debug)
 * @param {string} message - The log message
 * @param {string} operation - The operation being performed
 * @param {string} context - Context (service/repository)
 * @param {object} [additionalData] - Additional metadata
 */
function logEvent(level, message, operation, context, additionalData = {}, error = null) {
  // Create metadata object with only additional data
  const metadata = {
      ...additionalData
  }


  if(error) {
    metadata.error = {
      type: error.name || 'Error',
      message: error.message,
      stack: error.stack,
      code: error.code,
      ...error
    }
  }
  
  // Set operation and context as properties on the logger
  logger.operation = operation
  logger.context = context
  
  // Call logger with proper format
  logger[level](message, metadata)
}



function logError(error, message, operation, context, additionalData) {
  logEvent('error', message, operation, context, additionalData, error)
}

function logInfo(message, operation, context, additionalData) {
  logEvent('info', message, operation, context, additionalData)
}

function logDebug(message, operation, context, additionalData) {
  logEvent('debug', message, operation, context, additionalData)
}

function logWarn(message, operation, context, additionalData) {
  logEvent('warn', message, operation, context, additionalData)
}


module.exports = {
  logEvent,
  logError,
  logWarn,
  logInfo,
  logDebug
}