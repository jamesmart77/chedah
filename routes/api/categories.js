const router = require('express').Router();
const categoryController = require('../../controllers/categoryController');

// query '/api/categories'
router.get('/', categoryController.findAll)

// router.get('/category/:name?', categoryController.findGoalByName)
router.get('/category/:id?', categoryController.findCategoryById)

// post to '/api/categories'
router.post('/', categoryController.addCategory)

module.exports = router
