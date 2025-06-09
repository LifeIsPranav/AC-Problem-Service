const { StatusCodes } = require('http-status-codes')
const responseHandler = require("../utils/responseHandler")
const NotImplemented = require('../errors/serverSide/notImplemented.error')
const { ProblemService } = require('../services')
const { ProblemRepository } = require('../repositories')


const problemService = new ProblemService(new ProblemRepository())

function pingProblemController(req, res) {
  responseHandler(req, res, StatusCodes.OK, "Pinged Problem Check Controller!")
}


async function addProblem(req, res) {
  try {
    const problemData = req.body
    const problem = await problemService.createProblem(problemData)

    console.log("New Problem Created")
    responseHandler(req, res, StatusCodes.CREATED, "New Problem Created Successfully", problem)

  } catch (error) {
    throw error
  }
}


async function getProblem(req, res) {
  responseHandler(req, res, StatusCodes.NOT_IMPLEMENTED)
}


async function getProblems(req, res) {
  try {
    const problems = await problemService.getAllProblems()

    console.log("All problems Fetched Successfully")
    const data = {
      totalProblems : problems.length,
      problems
    }

    responseHandler(req, res, 200, "All problems Fetched Successfully", data)
    
  } catch (error) {
    throw error
  }
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