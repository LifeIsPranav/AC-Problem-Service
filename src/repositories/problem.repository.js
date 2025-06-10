
const logger = require("../config/logger.config");
const BadRequest = require("../errors/clientSide/badRequest.error");
const { Problem } = require("../models");
const logEvent = require("../utils/logger.utils");

const { repository: context } = require('../config/context.config')

class ProblemRepository {

  async createProblem(problemData) {
    const operation = 'createProblem'
    try {
      logEvent('debug', 'Starting problem creation in Repository', operation, context, problemData)

      if(!problemData.title) {
        logEvent('warn', 'Title Not provided', operation, context)
        throw new BadRequest("Title", "Provide a Title")
      }
      if(!problemData.description) {
        logEvent('warn', 'Description Not provided', operation, context)
        throw new BadRequest("Description", "Provide a Description")
      }

      const problem = await Problem.create({
        title: problemData.title,
        difficulty: problemData.difficulty ?? undefined,
        description: problemData.description,
        testCases: (problemData.testCases) ? problemData.testCases : [],
        editorial: problemData.editorial ?? undefined
      })

      logEvent('debug', 'Problem created in Repository', operation, context, problemData)
      return problem

    } catch(error) {
      logEvent('error', 'Problem Creation Failed', operation, context, {attemptedData: problemData}, error)
      throw error
    }
  }


  async getAllProblems() {
    const operation = 'getAllProblems'
    try {
      logEvent('debug', 'Starting to Fetch All Problems in Repository', operation, context)
      const problems = await Problem.find({})

      logEvent('debug', 'Fetched All Problems Successfully', operation, context)
      return problems

    } catch (error) {
      logEvent('error', 'Problem Fetching Failed', operation, context, {}, error)
      throw error
    }
  }


  async getProblem(id) {
    const operation = 'getProblem'
    try {
      logEvent('debug', 'Fetching Problem from the DB', operation, context, {id})
      const problem =  await Problem.findById(id)

      return problem

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