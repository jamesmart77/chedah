const router = require('express').Router();
const categoryController = require('../../controllers/categoryController');

// query '/api/categories'
// router.get('/', categoryController.findAll)

// post to '/api/categories'
router.post('/', categoryController.create)

// router.get('/category/:name?', categoryController.findGoalByName)
// router.get('/:id', categoryController.findCategoryById)


module.exports = router
