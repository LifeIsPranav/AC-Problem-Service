const logger = require("../config/logger.config")
const BadRequest = require("../errors/clientSide/badRequest.error")
const NotFound = require("../errors/clientSide/notFound.error")
const { markdownSanitizer } = require("../utils")
const logEvent = require("../utils/logger.utils")

const logLevel = 'service'
class ProblemService {

  constructor(problemRepository) {
    this.problemRepository = problemRepository
  }

  async createProblem(problemData) {
    const context = 'createProblem'
    try {
      logEvent("info", "Creating New Problem", context, logLevel)

      if(!problemData.description) {
        logEvent("warn", "Missing Description", context, logLevel)
        throw new BadRequest("description", "Please Provide a Description to the Problem")
      }

      problemData.description = markdownSanitizer(problemData.description)
      const problem = await this.problemRepository.createProblem(problemData)
      
      logEvent("info", "Created Successfully", context, logLevel, { problemId: problem._id })
      return problem

    } catch (error) {
      logEvent('error', 'Problem Creation Failed', context, logLevel, {attemptedData: problemData}, error)
      throw error
    }
  }


  async getAllProblems() {
    const context = 'getAllProblems'
    try {
      logEvent("info", "Fetching All Problems", context, logLevel)

      return await this.problemRepository.getAllProblems()
    } catch (error) {
      logEvent('error', 'Fetching Problems Failed', context, logLevel, {}, error)
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