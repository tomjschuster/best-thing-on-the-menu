const router = require('express').Router()
module.exports = router
const { call } = require('../db')


router.post('/', (req, res, next) => {
  const { name, placeId } = req.body
  call.createItem({ name, placeId })
    .then(() => {
      res.send({ created: true })
    })
    .catch(next)
})

