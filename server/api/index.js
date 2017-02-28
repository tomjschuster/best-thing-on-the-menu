const express = require('express')
const router = express.Router()
module.exports = router

router.get('/api', (req, res, next) => {
  console.log('yeah boi')
  res.send('yeah boi')
})
