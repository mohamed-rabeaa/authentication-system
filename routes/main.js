const express = require('express');
const { checkAuthenticated } = require('../helper/auth');
const router = express.Router()

router.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
})



module.exports = router;