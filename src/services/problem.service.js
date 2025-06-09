const BadRequest = require("../errors/clientSide/badRequest.error")
const NotFound = require("../errors/clientSide/notFound.error")
const { markdownSanitizer } = require("../utils")

class ProblemService {

  constructor(problemRepository) {
    this.problemRepository = problemRepository
  }

  async createProblem(problemData) {
    try {
      if(!problemData.description) throw new BadRequest("description", "Please Provide a Description to the Problem")

      problemData.description = markdownSanitizer(problemData.description)
      const problem = await this.problemRepository.createProblem(problemData)
      return problem

    } catch (error) {
      throw error
    }
  }


  async getAllProblems() {
    try {
      return await this.problemRepository.getAllProblems()
    } catch (error) {
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
      if(!problem) throw new NotFound()

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