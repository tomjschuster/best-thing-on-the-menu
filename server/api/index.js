require('dotenv').config()
const express = require('express')
const router = express.Router()
module.exports = router


router.use('/auth', require('./auth'))
router.use('/places', require('./places'))
router.use('/items', require('./items'))
router.use('/reviews', require('./reviews'))
