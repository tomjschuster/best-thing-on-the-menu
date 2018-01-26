const router = require('express').Router()
module.exports = router
const db = require('../../db')

/*----------  CREATE  ----------*/
router.post('/check/item', (req, res, next) => {
  db.call
    .checkItemAndCreateReview({ ...req.body, userId: req.user.id })
    .then(({ newItem, id }) => {
      res.send({ newItem: !!newItem, id })
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  db.call
    .createReview({ ...req.body, userId: req.user.id })
    .then(({ id }) => {
      res.send({ id, created: true })
    })
    .catch(next)
})

/*----------  DELETE  ----------*/
router.delete('/:reviewId', (req, res, next) => {
  const reviewId = Number(req.params.reviewId)

  if (isNaN(reviewId)) {
    next('invalid id')
  } else {
    db.call
      .deleteReview({ reviewId })
      .then(() => res.send(200))
      .catch(next)
  }
})
