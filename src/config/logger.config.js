const path = require('path')
const winston = require('winston')
require('winston-mongodb')

const { LOG_DB_URL } = require('./server.config')


const currentDir = __dirname
const rootDir = path.resolve(currentDir, '../..')

const allowedTransports = []

// Adding Console to Logger
allowedTransports.push(new winston.transports.Console({
  format: winston.format.combine (
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((log) => {
      // Extract additional data from metadata
      const metadata = log[Symbol.for('splat')] || []
      const additionalData = metadata.length ? metadata[0] : {}
      
      // Format the additional data as JSON string
      const additionalInfo = Object.keys(additionalData).length > 0 
        ? JSON.stringify(additionalData)
        : ''
      
      // Use logger properties for operation and context
      const operation = logger.operation || 'unknown'
      const context = logger.context || 'unknown'
      
      return `${log.timestamp} [${log.level}] [${context}] [${operation}]: ${log.message} ${additionalInfo}`
    })
  ),
  handleExceptions: true
}))

// Adding MongoDB to Logger
allowedTransports.push(new winston.transports.MongoDB({
  db: LOG_DB_URL,
  collection: 'logs',
  // level: 'error',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json()
  ),
  handleExceptions: true
}))

// Adding File to Logger
allowedTransports.push(new winston.transports.File({
  filename: `${rootDir}/logs/app.log`,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((log) => {
      // Extract additional data from metadata
      const metadata = log[Symbol.for('splat')] || []
      const additionalData = metadata.length ? metadata[0] : {}
      
      // Format the additional data as JSON string
      const additionalInfo = Object.keys(additionalData).length > 0 
        ? JSON.stringify(additionalData)
        : ''
      
      // Use logger properties for operation and context
      const operation = logger.operation || 'unknown'
      const context = logger.context || 'unknown'
      
      return `${log.timestamp} [${log.level.toUpperCase()}] [${context}] [${operation}]: ${log.message} ${additionalInfo}`
    })
  ),
  handleExceptions: true
}))


// Creating Logger
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json()
  ),

  exitOnError: false,
  transports: allowedTransports
})


logger.errorWithStack = (message, error) => {
  logger.error(message, { 
    stack: error.stack,
    error: error.message,
    name: error.name,
    ...(error.details ? { details: error.details } : {})
  })
}

process.on('unhandledRejection', (error) => {
  logger.error('Unhandled Rejection at:', error.stack || error);
})

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error.stack || error);
  process.exit(1);
})


module.exports = logger