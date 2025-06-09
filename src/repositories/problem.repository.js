const BadRequest = require("../errors/clientSide/badRequest.error");
const { Problem } = require("../models");


class ProblemRepository {

  async createProblem(problemData) {
    try {

      if(!problemData.title) throw new BadRequest("Title", "Provide a Title")
      if(!problemData.description) throw new BadRequest("Description", "Provide a Description")

      const problem = await Problem.create({
        title: problemData.title,
        difficulty: problemData.difficulty ?? undefined,
        description: problemData.description,
        testCases: (problemData.testCases) ? problemData.testCases : [],
        editorial: problemData.editorial ?? undefined
      })
      
      return problem

    } catch(error) {
      throw error
    }
  }

}


module.exports = ProblemRepository