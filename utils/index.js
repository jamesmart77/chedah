module.exports = {
    isNegative : num => num < 0 ? true : false,
    isPositive : num => num > 0 ? true : false,
    sum : (x, y) => Math.abs(x) + Math.abs(y),
    sortObjects : (x, y) => x.total - y.total > 0 ? x : y,

    spendingByCategoryGig: gigId => { db.Transaction.aggregate([
            { $match: { gigId: gigId } },
            { $group: { _id: "$category", total: { $sum: "$amount" } } },
            { $sort: {total: -1} }
          ])  
    }
    
}
