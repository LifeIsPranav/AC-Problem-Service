const { StatusCodes } = require('http-status-codes')
const responseHandler = require("../utils/responseHandler")
const NotImplemented = require('../errors/serverSide/notimplemented.error')
const PaymentRequired = require('../errors/clientSide/paymentRequired.error')
const NotFound = require('../errors/clientSide/notFound.error')
const Unauthorized = require('../errors/clientSide/unauthorized.error')
const MethodNotAllowed = require('../errors/clientSide/methodNotAllowed.error')
const InternalServerError = require('../errors/serverSide/internalServer.error')
const BadRequest = require('../errors/clientSide/badRequest.error')
const Forbidden = require('../errors/clientSide/forbidden.error')
const BadGateway = require('../errors/serverSide/badGateway.error')


function pingProblemController(req, res) {
  responseHandler(req, res, StatusCodes.OK, "Pinged Problem Check Controller!")
}


async function addProblem(req, res, next) {
  try {
    throw new MethodNotAllowed(req)
  } catch (error) {
    next(error)
  }
}


async function getProblem(req, res) {
  responseHandler(req, res, StatusCodes.NOT_IMPLEMENTED)
}


async function getProblems(req, res) {
  responseHandler(req, res, StatusCodes.NOT_IMPLEMENTED)
}


async function deleteProblem(req, res) {
  responseHandler(req, res, StatusCodes.NOT_IMPLEMENTED)
}


async function updateProblem(req, res) {
  responseHandler(req, res, StatusCodes.NOT_IMPLEMENTED)
}


module.exports = {
  addProblem,
  getProblem,
  getProblems,
  updateProblem,
  deleteProblem,
  pingProblemController
}