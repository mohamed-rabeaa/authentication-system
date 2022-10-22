const express = require('express')
const router = express.Router()

///////////all routes of admin/////////////
const user = require('./admin/user')
router.use('/user', user)

module.exports = router;
