const responseHandler = require("../utils/responseHandler")
const NotFound = require('../errors/clientSide/notFound.error')

const { ProblemService } = require('../services')
const { StatusCodes } = require('http-status-codes')
const { ProblemRepository } = require('../repositories')
const BadRequest = require("../errors/clientSide/badRequest.error")
const { logInfo, logError, logWarn } = require("../utils/logger.utils")
const { controller: context } = require("../config/context.config")



const problemService = new ProblemService(new ProblemRepository())

function pingProblemController(req, res) {
  responseHandler(req, res, StatusCodes.OK, "Pinged Problem Check Controller!")
}


async function addProblem(req, res) {
  const operation = 'addProblem'
  try {
    const problemData = req.body

    logInfo('Delegated Task to Create Problem Service', operation, context)
    const problem = await problemService.createProblem(problemData)
    
    logInfo('Received Response from the Service', operation, context)
    responseHandler(req, res, StatusCodes.CREATED, "New Problem Created Successfully", problem)

  } catch (error) {
    logError(error, 'Error Fetching Data from the Service', operation, context)
    throw error
  }
}


async function getProblem(req, res) {
  const operation = 'getProblem'
  try {
    const problemId = req.params.id

    logInfo('Delegated Task to Get Problem Service', operation, context)
    const problem = await problemService.getProblem(problemId)
    
    if(!problem) {
      logWarn('No Such Problem Found', operation, context, {problemId})
      throw new NotFound()
    }

    logInfo('Problem Fetched Successfully from the Service', operation, context)
    responseHandler(req, res, StatusCodes.OK, "Problem Fetched Successfully", problem)

  } catch (error) {
    logError(error, 'Error Fetching Data from the Service', operation, context)
    throw error
  }

}


async function getProblems(req, res) {
  operation = 'getProblems'
  try {
    logInfo('Delegated Task to Get Problems Service', operation, context)
    const problems = await problemService.getAllProblems()


    const data = {
      totalProblems : problems.length,
      problems
    }

    logInfo('Received Response from the Get Problems Service', operation, context)
    responseHandler(req, res, 200, "All problems Fetched Successfully", data)
    
  } catch (error) {
    logError(error, 'Error Fetching Data from the Service', operation, context)
    throw error
  }
}


async function deleteProblem(req, res) {
  
  try {
    const problemId = req.params.id
    if(!problemId) {
      logWarn('No ProblemId Provided', operation, context)
      throw new BadRequest("Problem Id", "Please Provide Adequate Problem Id")
    }

    logInfo('Delegated Task to Delete Problems Service', operation, context)
    const problem = await problemService.deleteProblem(problemId)

    logInfo('Received Response from the Delete Problems Service', operation, context)
    responseHandler(req, res, StatusCodes.OK, "Problem Deleted Successfully", problem)

  } catch (error) {
    logError(error, 'Error Fetching Data from the Service', operation, context)
    throw error
  }
}


async function updateProblem(req, res) {

  try {
    const problemId = req.params.id
    const details = req.body

    if(!details){
      logWarn('No Updation Details Provided', operation, context)
      throw new BadRequest("Details", "Kindly Provide Details to Be Updated")
    }
    if(!problemId){ 
      logWarn('No ProblemId Provided', operation, context)
      throw new BadRequest("Problem Id", "Please Provide Adequate Problem Id")
    }

    logInfo('Delegated Task to Update Problems Service', operation, context)
    const updatedProblem = await problemService.updateProblem(problemId, details)

    logInfo('Received Response from the Update Problems Service', operation, context)
    responseHandler(req, res, StatusCodes.OK, "Problem Updated Successfully", updateProblem)
    
  } catch (error) {
    logError(error, 'Error Fetching Data from the Service', operation, context)
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