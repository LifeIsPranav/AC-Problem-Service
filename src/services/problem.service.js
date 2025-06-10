const logger = require("../config/logger.config")
const BadRequest = require("../errors/clientSide/badRequest.error")
const NotFound = require("../errors/clientSide/notFound.error")
const { markdownSanitizer } = require("../utils")
const logEvent = require("../utils/logger.utils")
const { service: context } = require('../config/context.config')


class ProblemService {

  constructor(problemRepository) {
    this.problemRepository = problemRepository
  }

  async createProblem(problemData) {
    const operation = 'createProblem'
    try {
      logEvent("info", "Creating New Problem", operation, context)

      if(!problemData.description) {
        logEvent("warn", "Missing Description", operation, context)
        throw new BadRequest("description", "Please Provide a Description to the Problem")
      }

      problemData.description = markdownSanitizer(problemData.description)
      const problem = await this.problemRepository.createProblem(problemData)
      
      logEvent("info", "Created Successfully", operation, context, { problemId: problem._id })
      return problem

    } catch (error) {
      logEvent('error', 'Problem Creation Failed', operation, context, {attemptedData: problemData}, error)
      throw error
    }
  }


  async getAllProblems() {
    const operation = 'getAllProblems'
    try {
      logEvent("info", "Fetching All Problems", operation, context)
      const problems =  await this.problemRepository.getAllProblems()
      
      logEvent("info", "Fetched All Problems", operation, context)
      return problems

    } catch (error) {
      logEvent('error', 'Fetching Problems Failed', operation, context, {}, error)
      throw error
    }
  }


  async getProblem(id) {
    try {
      const problem = await this.problemRepository.getProblem(id)
      if(!problem) throw new NotFound()
      return problem

    } catch (error) {
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