const router = require('express').Router();
const categoryController = require('../../controllers/categoryController');

// router.get('/category/:name?', categoryController.findGoalByName)
router.get('/category/:id?', categoryController.findCategoryById)

// query '/api/categories'
router.get('/categories', categoryController.findAll)

// post to '/api/categories'
router.post('/category', categoryController.addCategory)

module.exports = router
