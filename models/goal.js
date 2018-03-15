const mongoose = require('mongoose')
const Schema = mongoose.Schema

// schema for a goal object
const goalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  budget: {
    type: Number
  },
  categories: []
})

const Goal = mongoose.model('Goal', goalSchema)
module.exports = Goal
