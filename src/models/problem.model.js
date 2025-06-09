const mongoose = require('mongoose')


const problemSchema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, "Title of a Problem cannot be Empty"]
  },

  description: {
    type: String,
    required: [true, "Description of a Problem cannot be Empty"]
  },

  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Easy'
  },

  testCases: {
    type: [{
      input: {
        type: String,
        required: true
      },
      output: {
        type: String,
        required: true
      },
    }],
    required: true
  },

  editorial: {
    type: String
  }

})

const Problem = mongoose.Model("Problem", problemSchema)
module.exports = Problem