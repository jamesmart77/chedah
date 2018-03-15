const router = require('express').Router()
const authController = require('../../controllers/authController')

// Matches with "/api/plaid/get_access_token"
router.route('/login')
  .post(authController.login)

module.exports = router
