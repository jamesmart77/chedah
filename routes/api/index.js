const router = require('express').Router()
const transactions = require('./transactions')
const plaidRoutes = require('./plaid')
const users = require('./users')
const gigs = require('./gigs')
const goals = require('./goals')
const categories = require('./categories')
const authRoutes = require('./auth')

// Plaid routes
router.use('/plaid', plaidRoutes)
router.use('/transactions', transactions)
router.use('/users', users)
router.use('/gigs', gigs)
router.use('/goals', goals)
router.use('/categories', categories)
router.use('/auth', authRoutes)

module.exports = router
