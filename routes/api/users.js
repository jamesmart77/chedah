const router = require('express').Router()
const userControllers = require('../../controllers/userController')
const plaidControllers = require('../../controllers/plaidController')

// Matches with "/api/plaid/get_access_token"
router.route('/')
  .post(userControllers.createUserIfDoesNotExist)

router.route('/items')
  .post(plaidControllers.getPrivateKey)

router.route('/:authId')
  .get(userControllers.getUser)

router.route('/transactions')
  .post(userControllers.getTransactions)

router.route('/categories/all')
  .get(userControllers.getCategories)

router.route('/:authId/gigs')
  .post(userControllers.addGigToUser)

module.exports = router
