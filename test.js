const db = require("./models");
const plaid = require("plaid");
const R = require("ramda");
require("dotenv").config();
const mongoose = require("mongoose");

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/chedah", {
  useMongoClient: true
});

const aggregateAccountCategories = db.Transaction.aggregate([
  { $match: { account_id: "RmKbP4d6PWudGwXl91AxCPjEvgEEqpfMvzXeJ" } },
  { $group: { _id: "$category", total: { $sum: "$amount" } } }
]);

const aggregateAccountVendors = db.Transaction.aggregate([
  { $match: { account_id: "RmKbP4d6PWudGwXl91AxCPjEvgEEqpfMvzXeJ" } },
  { $group: { _id: "$transactionName", total: { $sum: "$amount" } } }
]);

const aggregateGigCategories = db.Transaction.aggregate([
  { $match: { gigId: '5aa1bb8b6b7126f2f5314126' } },
  { $group: { _id: "$category", total: { $sum: "$amount" } } }
]);

const aggregateGigVendors = db.Transaction.aggregate([
  { $match: { gigId: '5aa1bb8b6b7126f2f5314126' } },
  { $group: { _id: "$transactionName", total: { $sum: "$amount" } } }
]);

// const user =   db.User.findOne({ auth_id: req.params.authId }).lean()
const user = db.User.findOne({ auth_id: "facebook|10155456253012712" })
  .lean()
  .populate("accounts")
  .populate("transactions")
  .populate("gigs")
  .populate("categories")
  .populate({
    path: "gigs",
    populate: {
      path: "goals",
      model: "Goal"
    }
  })

const gigs = db.Gig.find().lean()
const accounts = db.Account.find().lean()

const categories = db.Category.find().lean();

Promise.all([
  user,
  gigs,
  accounts
//   categories,
//   aggregateAccountCategories,
//   aggregateAccountVendors,
//   aggregateGigCategories,
//   aggregateGigVendors
])
  .then(([user, gigs, accounts]) => {
      user.transactions.map(t => t.gigName = gigs.find(gig => t.gigId === gig._id.toString()).name)
      user.transactions.map(t => t.accountName = accounts.find(account => t.gigId === account.account_id.toString()).name)
      console.log(user.transactions)
  })
  .catch(console.log);




//   {
//     $lookup:
//       {
//         from: <collection to join>,
//         localField: <field from the input documents>,
//         foreignField: <field from the documents of the "from" collection>,
//         as: <output array field>
//       }
//  }