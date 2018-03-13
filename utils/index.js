const db = require('../models')

// Months from Jan to Sep and days from 1 to 9 are formatted as a single digit, this formats as 2 digits
const getMonth = () => new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1
const getDate = () => new Date().getDate() + 1 < 10 ? `0${new Date().getDate() + 1}` : new Date().getDate() + 1

module.exports = {
    isNegative : num => num < 0 ? true : false,
    isPositive : num => num > 0 ? true : false,
    sum : (x, y) => Math.abs(x) + Math.abs(y),
    sortObjects : (x, y) => x.total - y.total > 0 ? x : y,

    // Date helper functions return dates formatted as yyyy-mm-dd
    getToday: () => {
        const date = new Date()
        return `${date.getFullYear()}-${getMonth()}-${getDate()}`
    },
    getThreeYearsAgoFromToday: () => {
        const date = new Date()
        return `${date.getFullYear()-3}-${getMonth()}-${getDate()}`
    },
    getMonthToDate: () => {
        const date = new Date()
        return [ `${date.getFullYear()}-${getMonth()}-01`, `${date.getFullYear()}-${getMonth()}-${getDate()}` ]
    },
    getYearToDate: () => {
        const date = new Date()
        return [`${date.getFullYear()}-01-01`, `${date.getFullYear()}-${getMonth()}-${getDate()}` ]
    },

    // Aggregations that are used in multiple places
    spendingByCategoryGig: gigId => {
        console.log(gigId)
        return db.Transaction.aggregate([
            { $match: { gigId: gigId.toString() } },
            { $group: { _id: "$category", total: { $sum: "$amount" } } },
            { $sort: {total: -1} }
          ])},

          // this one needs to be tweaked
    spendingByVendorGig : gigId => db.Transaction.aggregate([
            { $match: { gigId: gigId.toString() } },
            { $group: { _id: "$transactionName", total: { $sum: "$amount" } } },
            { $sort: {total: -1} }
          ]),

    // Transactions by Gig
    transactionsGig : gigId => db.Transaction.aggregate([
        { $match: { gigId: gigId.toString() } }
        ]),

           // Transactions by Gig
    summaryGig : gigId => db.Transaction.aggregate([
        { $match: { gigId: gigId.toString() } },
        { $group: {
            _id: null,
            total: { $sum: "$amount" },
            count: { $sum: 1 } 
        }}
        ])
}






// findById: (req, res) => {
//   console.log(`-> looking for a account...`)

//   const account = db.Account.findOne({ account_id: req.params.id }).lean()

  // const aggregateAccountCategories = db.Transaction.aggregate([
  //   { $match: { account_id: req.params.id } },
  //   { $group: { _id: "$category", total: { $sum: "$amount" } } },
  //   { $sort: {total: -1} }
  // ])
  
  // const aggregateAccountVendors = db.Transaction.aggregate([
  //   { $match: { account_id: req.params.id } },
  //   { $group: { _id: "$transactionName", total: { $sum: "$amount" } } },
  //   { $sort: {total: -1} }
  // ])

//   const transactions =  db.Transaction.find({account_id: req.params.id}).lean()

//   Promise.all([account, aggregateAccountCategories, aggregateAccountVendors, transactions])
//   .then(data => {
//     const [account, spendingByCategory, spendingByVendor, transactions] = data
//     const response = {}
//     response.summary = account
//     response.spendingByCategory = spendingByCategory
//     response.spendingByVendor = spendingByVendor
//     response.transactions = transactions
//     res.json(response)
//   })
//   .catch( err => res.status(404).json({ err: err, msg: 'Not able to find an account by id' }) )
// },