const router = require('express').Router()
const plaidController = require('../../controllers/plaidController')

// Matches with "/api/plaid/get_access_token"
router.route('/')
  .post(plaidController.getTransactions)

module.exports = router
