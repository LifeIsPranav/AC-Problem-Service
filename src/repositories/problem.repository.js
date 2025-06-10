
const logger = require("../config/logger.config");
const BadRequest = require("../errors/clientSide/badRequest.error");
const { Problem } = require("../models");
const { logError, logDebug, logWarn } = require("../utils/logger.utils");

const { repository: context } = require('../config/context.config')

class ProblemRepository {

  async createProblem(problemData) {
    const operation = 'createProblem'
    try {
      logDebug('Starting problem creation in Repository', operation, context)

      if(!problemData.title) {
        logWarn('Title Not provided', operation, context, problemData)
        throw new BadRequest("Title", "Provide a Title")
      }
      if(!problemData.description) {
        logWarn('Description Not provided', operation, context, problemData)
        throw new BadRequest("Description", "Provide a Description")
      }

      const problem = await Problem.create({
        title: problemData.title,
        difficulty: problemData.difficulty ?? undefined,
        description: problemData.description,
        testCases: (problemData.testCases) ? problemData.testCases : [],
        editorial: problemData.editorial ?? undefined
      })

      logDebug('Problem created in Repository', operation, context, problemData)
      return problem

    } catch(error) {
      logError(error, 'Problem Creation Failed', operation, context, {attemptedData: problemData})
      throw error
    }
  }


  async getAllProblems() {
    const operation = 'getAllProblems'
    try {
      logDebug('Starting to Fetch All Problems in Repository', operation, context)
      const problems = await Problem.find({})

      logDebug('Fetched All Problems Successfully', operation, context)
      return problems

    } catch (error) {
      logError(error, 'Problem Fetching Failed', operation, context)
      throw error
    }
  }


  async getProblem(id) {
    const operation = 'getProblem'
    try {
      logDebug('Fetching Problem from the DB', operation, context)
      const problem =  await Problem.findById(id)

      logDebug('Fetched Problem Successfully', operation, context, {problemId: id})
      return problem

    } catch (error) {
      logError(error, 'Unable to Fetch Problem', operation, context, {errorMessage: error.message})
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