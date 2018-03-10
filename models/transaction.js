const mongoose = require('mongoose')
const Schema = mongoose.Schema


// schema for a transaction object
const transactionSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  transactionName: {
    type: String,
    required: true
  },
  transaction_id: {
    type: String,
    required: true,
    unique: true
  },
  account_id: {
    type: String,
    required: true
  },
  gigId: {
    type: String,
    required: true
  }
})



const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction
