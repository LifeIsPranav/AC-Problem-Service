const responseHandler = require("../utils/responseHandler")
const NotFound = require('../errors/clientSide/notFound.error')

const { ProblemService } = require('../services')
const { StatusCodes } = require('http-status-codes')
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
  try {
    const problemId = req.params.id
    const problem = await problemService.getProblem(problemId)

    if(!problemId) throw new NotFound()
    responseHandler(req, res, StatusCodes.OK, "Problem Fetched Successfully", problem)

  } catch (error) {
    throw error
  }

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
  const problemId = req.params.id

  try {
    const problem = await problemService.deleteProblem(problemId)
    if(!problem) throw new NotFound()

    console.log("Problem Deleted Successfully")
    responseHandler(req, res, StatusCodes.OK, "Problem Deleted Successfully", problem)

  } catch (error) {
    throw error
  }
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