const { StatusCodes } = require('http-status-codes')
const responseHandler = require("../format/response")

function pingProblemController(req, res) {
  return res.json({message: "Problem Controller is working! "})
}

async function addProblem(req, res) {
  responseHandler(res, StatusCodes.NOT_IMPLEMENTED)
}


async function getProblem(req, res) {
  responseHandler(res, StatusCodes.NOT_IMPLEMENTED)
}


async function getProblems(req, res) {
  responseHandler(res, StatusCodes.NOT_IMPLEMENTED)
}


async function deleteProblem(req, res) {
  responseHandler(res, StatusCodes.NOT_IMPLEMENTED)
}


async function updateProblem(req, res) {
  responseHandler(res, StatusCodes.NOT_IMPLEMENTED)
}


module.exports = {
  addProblem,
  getProblem,
  getProblems,
  updateProblem,
  deleteProblem,
  pingProblemController
}