const { StatusCodes } = require('http-status-codes')
const responseHandler = require("../formats/response.format")
const NotImplemented = require('../errors/notimplemented.error')
const BadRequest = require('../errors/badrequest.error')


function pingProblemController(req, res) {
  responseHandler(req, res, StatusCodes.OK, "Pinged Problem Check Controller!")
}


async function addProblem(req, res, next) {
  try {
    throw new BadRequest("prob", "sb kuch do yaar!")
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