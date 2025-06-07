const responseHandler = require("../format/response")

function pingProblemController(req, res) {
  return res.json({message: "Problem Controller is working! "})
}

async function addProblem(req, res) {
  responseHandler(res, 501)
}


async function getProblem(req, res) {
  responseHandler(res, 501)
}


async function getProblems(req, res) {
  responseHandler(res, 501)
}


async function deleteProblem(req, res) {
  responseHandler(res, 501)
}


async function updateProblem(req, res) {
  responseHandler(res, 501)
}


module.exports = {
  addProblem,
  getProblem,
  getProblems,
  updateProblem,
  deleteProblem,
  pingProblemController
}