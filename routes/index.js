const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

// authentication
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://chedah.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://chedah.herokuapp.com',
  issuer: 'https://chedah.auth0.com/',
  algorithms: ['RS256']
})

// API Routes
router.use('/api', jwtCheck, apiRoutes)

// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})


module.exports = router

