const router = require('express').Router()
module.exports = router
const { call } = require('../db')


router.post('/', (req, res, next) => {
  const { googleId, name, address } = req.body
  call.createPlace({ googleId, name, address })
    .then(({ id }) => {
      res.send({ id, created: true })
    })
    .catch(next)
})

router.get('/:placeId/reviews', (req, res, next) => {
  const { placeId } = req.params

  call.getPlaceItemsReviews({ placeId })
    .then(({ output, found }) => {
      const place = output[0]
      const items = output[1]
      const reviews = output[2]

      res.send({ found: !!found, place, items, reviews })

    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  call.getPlaces()
    .then(({ results }) => {
      const places = results[0]
      res.send(places)
    })
    .catch(next)
})
