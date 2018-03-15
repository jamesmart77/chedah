const router = require('express').Router()
const accountsController = require('../../controllers/accountController')

router.route('/')
  .post(accountsController.findAll)

router.route('/:id')
  .post(accountsController.findById)
  .put(accountsController.update)
  .delete(accountsController.delete)

module.exports = router
