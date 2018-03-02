const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');
const jwtAuth = require('./jwtAuth');

// authentication
router.all('*', jwtAuth, (req, res, next) => {
    // console.log('Successful authentication');
    next();
})


// API Routes
router.use('/api', apiRoutes);

// If no API routes are hit, send the React app
module.exports = router;
