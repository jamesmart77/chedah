const router = require('express').Router()
const plaidController = require('../../controllers/plaidController')
const transactionsController = require('../../controllers/transactionsController')

// Matches with "/api/plaid/get_access_token"
router.route('/')
  .post(plaidController.getTransactions)

  router.route('/:id')
    .put(transactionsController.updateTransaction)   // updateTransactionGig


module.exports = router
