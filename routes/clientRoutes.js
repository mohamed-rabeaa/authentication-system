const express = require('express')
const router = express.Router()

////////////all routes of client/////////////
const authRoutes = require('./client/auth')
router.use('/auth', authRoutes)

module.exports = router;