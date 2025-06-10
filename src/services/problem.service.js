const BadRequest = require("../errors/clientSide/badRequest.error")
const NotFound = require("../errors/clientSide/notFound.error")
const { markdownSanitizer } = require("../utils")
const { logError, logInfo, logWarn } = require("../utils/logger.utils")
const { service: context } = require('../config/context.config')


class ProblemService {

  constructor(problemRepository) {
    this.problemRepository = problemRepository
  }


  async createProblem(problemData) {
    const operation = 'createProblem'
    try {
      logInfo("Creating New Problem", operation, context)

      if(!problemData.description) {
        logWarn("Missing Description", operation, context)
        throw new BadRequest("description", "Please Provide a Description to the Problem")
      }

      if(problemData.editorial) problemData.editorial = markdownSanitizer(problemData.editorial)
      problemData.description = markdownSanitizer(problemData.description)
      const problem = await this.problemRepository.createProblem(problemData)
      
      logInfo("Created Successfully", operation, context, { problemId: problem._id })
      return problem

    } catch (error) {
      logError(error, 'Problem Creation Failed', operation, context, {attemptedData: problemData})
      throw error
    }
  }


  async getAllProblems() {
    const operation = 'getAllProblems'
    try {
      logInfo("Fetching All Problems", operation, context)
      const problems =  await this.problemRepository.getAllProblems()

      logInfo("Fetched All Problems", operation, context)
      return problems

    } catch (error) {
      logError(error, 'Fetching Problems Failed', operation, context)
      throw error
    }
  }


  async getProblem(id) {
    const operation = 'getProblem'
    try {
      logInfo("Fetching Problem", operation, context)
      const problem = await this.problemRepository.getProblem(id)

      if(!problem){ 
        logWarn('Problem Data is Empty: No Such Problem Exists', operation, context, {problemId: id})
        throw new NotFound()
      }

      logInfo('Fetched Problem Successfully', operation, context)
      return problem

    } catch (error) {
      logError(error, 'Error Fetching Problem', operation, context, {problemId: id})
      throw error
    }
  }


  async deleteProblem(id) {
    const operation = 'deleteProblem'
    try {
      logInfo('Deleting Problem', operation, context)
      const problem = await this.problemRepository.deleteProblem(id)

      if(!problem) {
        logWarn('Problem Data Empty: No Such Problem Found', operation, context, {problemId: problem})
        throw new NotFound()
      }

      logInfo('Problem Deleted Successfully', operation, context)
      return problem

    } catch (error) {
      logError(error, 'Error Deleting Problem', operation, context, {problemId: id})
      throw error
    }
  }

  
  async updateProblem(id, details) {
    const operation = 'updateProblem'
    try {
      if(Object.keys(details).length === 0) {
        logWarn('No Details Provided for Updating Problem', operation, context, {problemId: id, detailsReceived: details})
        throw new BadRequest('details', 'Please Provide Adequate Details to Update the Problem')
      }

      if(details.description)
      details.description = markdownSanitizer(problemData.description)
    
      if(details.editorial)
      details.editorial = markdownSanitizer(problemData.editorial)

      logInfo('Updating Problem', operation, context)
      const updatedProblem = await this.problemRepository.updateProblem(id, details)

      if(!updatedProblem) {
        logWarn('Error Updating Problem: No Such problem found', operation, context, {problemId: id})
        throw new NotFound()
      }

      logInfo('Updated Problem Successfully', operation, context)
      return updatedProblem

    } catch (error) {
      logError(error, 'Error Updating Problem', operation, context, {problemId: id, detailsReceived: details})
      throw error
    }
  }

}


module.exports = ProblemService