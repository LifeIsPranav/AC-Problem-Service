function getUrl(request) {
  return `${request.protocol}://${request.get('host')}${request.originalUrl}`
}

module.exports = getUrl