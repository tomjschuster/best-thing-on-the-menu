const router = require('express').Router()
module.exports = router
const { call } = require('../db')


/*----------  CREATE  ----------*/
router.post('/check/item', (req, res, next) => {
  call.checkItemAndCreateReview(req.body)
    .then(({ newItem, id }) => {
      res.send({ newItem: !!newItem , id})
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  call.createReview(req.body)
    .then(({ id }) => {
      res.send({ id, created: true })
    })
    .catch(next)
})

