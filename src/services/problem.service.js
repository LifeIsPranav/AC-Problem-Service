const logger = require("../config/logger.config")
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
    try {
      const problem = await this.problemRepository.deleteProblem(id)
      if(!problem) {
        throw new NotFound()
      }

      return problem

    } catch (error) {
      throw error
    }
  }

  async updateProblem(id, details) {
    try {
      const updatedProblem = await this.problemRepository.updateProblem(id, details)
      if(!updatedProblem) throw new NotFound()

      return updatedProblem

    } catch (error) {
      throw error
    }
  }

}


module.exports = ProblemService