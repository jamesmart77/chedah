const router = require('express').Router()
const gigController = require('../../controllers/gigController')

// post to '/api/gigs'
router.post('/account', gigController.addGigToAccount)

// router.get('/gig/:id, gigController.findGigByName)
router.get('/:id', gigController.findById)

router.post('/:id', gigController.addGoalToGig)

router.put('/:id', gigController.edit)

// query '/api/gigs'
router.get('/', gigController.findAll)

// post to '/api/gigs'
router.post('/', gigController.addGig)

// delete to '/api/gigs'
router.delete('/:id', gigController.delete)

module.exports = router
