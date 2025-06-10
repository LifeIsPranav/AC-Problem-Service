const responseHandler = require("../utils/responseHandler")
const NotFound = require('../errors/clientSide/notFound.error')

const { ProblemService } = require('../services')
const { StatusCodes } = require('http-status-codes')
const { ProblemRepository } = require('../repositories')
const BadRequest = require("../errors/clientSide/badRequest.error")


const problemService = new ProblemService(new ProblemRepository())

function pingProblemController(req, res) {
  responseHandler(req, res, StatusCodes.OK, "Pinged Problem Check Controller!")
}


async function addProblem(req, res) {
  try {
    const problemData = req.body
    const problem = await problemService.createProblem(problemData)

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
  
  try {
    const problemId = req.params.id
    if(!problemId) throw new BadRequest("Problem Id", "Please Provide Adequate Problem Id")

    const problem = await problemService.deleteProblem(problemId)
    if(!problem) throw new NotFound()

    responseHandler(req, res, StatusCodes.OK, "Problem Deleted Successfully", problem)

  } catch (error) {
    throw error
  }
}


async function updateProblem(req, res) {

  try {
    const problemId = req.params.id
    const details = req.body

    if(!details) throw new BadRequest("Details", "Kindly Provide Details to Be Updated")
    if(!problemId) throw new BadRequest("Problem Id", "Please Provide Adequate Problem Id")

    const updatedProblem = await problemService.updateProblem(problemId, details)
    responseHandler(req, res, StatusCodes.OK, "Problem Updated Successfully", updateProblem)
    
  } catch (error) {
    throw error
  }
}


module.exports = {
  addProblem,
  getProblem,
  getProblems,
  updateProblem,
  deleteProblem,
  pingProblemController
}