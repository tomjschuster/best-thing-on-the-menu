const router = require('express').Router()
module.exports = router
const db = require('../../db')

/*----------  CREATE  ----------*/
router.post('/check', (req, res, next) => {
  const { googleId, name, address } = req.body
  db.call.checkPlace({ googleId, name, address })
    .then(({ id, newPlace }) => {
      res.send({ id, newPlace: !!newPlace, created: true })
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  const { googleId, name, address } = req.body
  db.call.createPlace({ googleId, name, address })
    .then(({ id }) => {
      res.send({ id, created: true })
    })
    .catch(next)
})


/*----------  READ  ----------*/
router.get('/:placeId/reviews', (req, res, next) => {
  const { placeId } = req.params

  db.call.getPlaceItemsReviews({ placeId })
    .then(({ output, found }) => {
      const place = output[0][0]
      const items = output[1]
      const reviews = output[2]

      res.send({ found: !!found, place, items, reviews })

    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  db.call.getPlaces()
    .then(({ output }) => {
      const places = output[0]
      res.send(places)
    })
    .catch(next)
})
