
const logger = require("../config/logger.config");
const BadRequest = require("../errors/clientSide/badRequest.error");
const { Problem } = require("../models");
const { logError, logDebug, logWarn } = require("../utils/logger.utils");

const { repository: context } = require('../config/context.config')

class ProblemRepository {

  async createProblem(problemData) {
    const operation = 'createProblem'
    try {
      logDebug('Starting problem creation in DB', operation, context)

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

      logDebug('Finished Creating a new Problem', operation, context, problemData)
      return problem

    } catch(error) {
      logError(error, 'Problem Creation Failed', operation, context, {attemptedData: problemData})
      throw error
    }
  }


  async getAllProblems() {
    const operation = 'getAllProblems'
    try {
      logDebug('Starting to Fetch All Problems from DB', operation, context)
      const problems = await Problem.find({})

      logDebug('Finished Fetching All Problems', operation, context)
      return problems

    } catch (error) {
      logError(error, 'Problem Fetching Failed', operation, context)
      throw error
    }
  }


  async getProblem(id) {
    const operation = 'getProblem'
    try {
      logDebug('Starting to Fetch Problem from DB', operation, context)
      const problem =  await Problem.findById(id)

      logDebug('Finished Fetching Problem', operation, context, {problemId: id})
      return problem

    } catch (error) {
      logError(error, 'Unable to Fetch Problem', operation, context, {errorMessage: error.message})
      throw error
    }
  }


  async deleteProblem(id) {
    const operation = 'deleteProblem'
    try {
      logDebug('Starting to Delete Problem from DB', operation, context)
      const problem = await Problem.findByIdAndDelete(id)

      logDebug('Finished Deleting Problem', operation, context, {data: problem})
      return problem

    } catch (error) {
      logError(error, 'Error Deleting Problem from DB', operation, context, {problemId: id})
      throw error
    }
  }


  async updateProblem(id, details) {
    const operation = 'updateProblem'

    try {
      logDebug('Starting to Update Problem in DB', operation, context)
      const updatedProblem = await Problem.findByIdAndUpdate(id, {
        ...(details.title && { title: details.title }),
        ...(details.description && { description: details.description }),
        ...(details.difficulty && { difficulty: details.difficulty }),
        ...(details.testCases && { testCases: details.testCases }),
        ...(details.editorial && { editorial: details.editorial })
      },
      {new: true, runValidators: true})

      logDebug('Finished Updating Problem in DB', operation, context)
      return updatedProblem

    } catch (error) {
      logError(error, 'Error Updating Problem', operation, context, {problemId: id, detailsReceived: details})
      throw error
    }
  }

}


module.exports = ProblemRepository