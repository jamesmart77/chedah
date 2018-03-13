const router = require('express').Router()
const goalController = require('../../controllers/goalController')

// router.get('/goal/:name?', goalController.findGoalByName)
router.get('/goal/:id?', goalController.findGoalById)

// router.get('/goal/:name', goalController.findGoalByName)
router.put('/:id', goalController.updateGoal)

// query '/api/goals'
router.get('/goals', goalController.findAll)

// post to '/api/goals'
router.post('/', goalController.addGoal)

module.exports = router
