const router = require('express').Router()
module.exports = router
const { call } = require('../db')


router.post('/', (req, res, next) => {
  const { stars, comment, itemId, userId } = req.body
  call.createReview({ stars, comment, itemId, userId })
    .then(({ id }) => {
      res.send({ id, created: true })
    })
    .catch(next)
})

