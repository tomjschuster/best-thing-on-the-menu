const express = require('express')
const router = express.Router()
module.exports = router
const pool = require('../db')

const mapUsers = dbUsers => dbUsers.map(
  ({ id,
     first_name,
     last_name,
     email,
     photo_url
   }) => ({ id,
            name: `${first_name} ${last_name}`,
            email,
            photoUrl: photo_url
          })
   )

const mapPlaces = dbPlaces => dbPlaces.map(
  ({ id,
     google_id,
     name,
     address
   }) => ({ id,
            googleId: google_id,
            name,
            address
          })
  )

const mapItems = dbPlaces => dbPlaces.map(
  ({ id,
     place_id,
     name
   }) => ({ id,
            placeId: place_id,
            name
          })
   )

router.get('/users', (req, res, next) => {
  pool.query('select * from user')
    .then(users => res.send(mapUsers(users)))
    .catch(next)
})

router.get('/places', (req, res, next) => {
  pool.query('select * from place')
    .then(place => res.send(mapPlaces(place)))
    .catch(next)
})

router.get('/items', (req, res, next) => {
  pool.query('select * from item')
    .then(item => res.send(mapItems(item)))
    .catch(next)
})
