const router = require('express').Router()
module.exports = router
const { call } = require('../db')

/*----------  CREATE  ----------*/
router.post('/', (req, res, next) => {
  const { name, placeId } = req.body
  call.createItem({ name, placeId })
    .then(({ id }) => {
      res.send({ id, created: true })
    })
    .catch(next)
})
