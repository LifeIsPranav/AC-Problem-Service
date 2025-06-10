
const logger = require("../config/logger.config");
const BadRequest = require("../errors/clientSide/badRequest.error");
const { Problem } = require("../models");
const logEvent = require("../utils/logger.utils");


class ProblemRepository {

  async createProblem(problemData) {
    try {
      logEvent('debug', 'Starting problem creation in Repository', "createProblem", "repository", problemData)

      if(!problemData.title) {
        logEvent('warn', 'Title Not provided', 'createProblem', 'repository')
        throw new BadRequest("Title", "Provide a Title")
      }
      if(!problemData.description) {
        logEvent('warn', 'Description Not provided', 'createProblem', 'repository')
        throw new BadRequest("Description", "Provide a Description")
      }

      const problem = await Problem.create({
        title: problemData.title,
        difficulty: problemData.difficulty ?? undefined,
        description: problemData.description,
        testCases: (problemData.testCases) ? problemData.testCases : [],
        editorial: problemData.editorial ?? undefined
      })

      logEvent('debug', 'Problem created in Repository', "createProblem", "repository", problemData)
      return problem

    } catch(error) {
      logEvent('error', 'Problem Creation Failed', 'createProblem', 'repository', {attemptedData: problemData}, error)
      throw error
    }
  }


  async getAllProblems() {
    try {
      return await Problem.find({})

    } catch (error) {
      throw error
    }
  }


  async getProblem(id) {
    try {
      return await Problem.findById(id)

    } catch (error) {
      throw error
    }
  }


  async deleteProblem(id) {
    try {
      return await Problem.findByIdAndDelete(id)

    } catch (error) {
      throw error
    }
  }


  async updateProblem(id, details) {
    try {
      const updatedProblem = await Problem.findByIdAndUpdate(id, {
        ...(details.title && { title: details.title }),
        ...(details.description && { description: details.description }),
        ...(details.difficulty && { difficulty: details.difficulty }),
        ...(details.testCases && { testCases: details.testCases }),
        ...(details.editorial && { editorial: details.editorial })
      },
      {new: true, runValidators: true})

      return updatedProblem

    } catch (error) {
      throw error
    }
  }

}


module.exports = ProblemRepository