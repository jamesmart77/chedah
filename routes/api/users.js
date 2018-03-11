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

router.route('/:authId/categories')
  .post(userControllers.getCategories)

router.route('/:authId/accounts')
  .post(userControllers.getAccounts)

router.route('/:authId/gigs')
  .post(userControllers.addGigToUser)

router.route('/:authId/gigs/get')
  .post(userControllers.getGigs)

module.exports = router
