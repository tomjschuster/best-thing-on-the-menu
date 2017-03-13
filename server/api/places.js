const router = require('express').Router()
module.exports = router
const { call } = require('../db')


router.get('/:placeId/reviews', (req, res, next) => {
  const { placeId } = req.params

  call.getPlaceItemsReviews({ placeId })
    .then(({ results, outParams }) => {
      const placeFound = !!outParams.placeFound
      const place = results[0]
      const items = results[1]
      const reviews = results[2]

      res.send({ placeFound, place, items, reviews })

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
