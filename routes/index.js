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
    jwksUri: 'https://chedah.auth0.com/.well-known/jwks.json',
    handleSigningKeyError: (err, cb) => {
      if (err instanceof jwks.SigningKeyNotFoundError) {
        return cb(new Error('This is a bad sign in!!'));
      }
  
      return cb(err);
    }
  }),
  audience: 'https://chedah.herokuapp.com',
  issuer: 'https://chedah.auth0.com/',
  algorithms: ['RS256']
})

// API Routes
router.use('/api', jwtCheck, apiRoutes)

module.exports = router

