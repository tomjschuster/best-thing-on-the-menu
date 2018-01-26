const router = require('express').Router()
module.exports = router
const db = require('../../db')

/*----------  CREATE  ----------*/
router.post('/', (req, res, next) => {
  const { name, placeId } = req.body
  db.call
    .createItem({ name, placeId })
    .then(({ id }) => res.send({ id, created: true }))
    .catch(next)
})

/*----------  DELETE  ----------*/
router.delete('/:itemId', (req, res, next) => {
  const itemId = Number(req.params.itemId)

  if (isNaN(itemId)) {
    next('invalid id')
  } else {
    db.call
      .deleteItem({ itemId })
      .then(() => res.send(200))
      .catch(next)
  }
})
