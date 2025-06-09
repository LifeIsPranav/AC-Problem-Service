const BadRequest = require("../errors/clientSide/badRequest.error")
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


  async getProblems() {
    try {
      return await this.problemRepository.getProblems()
    } catch (error) {
      throw error
    }
  }
}


module.exports = ProblemService