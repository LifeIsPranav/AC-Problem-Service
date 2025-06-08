const { StatusCodes } = require('http-status-codes')
const responseHandler = require("../formats/response")

function pingProblemController(req, res) {
  responseHandler(req, res, StatusCodes.OK, "Pinged Problem Check Controller!")
}


async function addProblem(req, res) {
  responseHandler(req, res, StatusCodes.NOT_IMPLEMENTED)
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