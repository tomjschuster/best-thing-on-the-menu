const router = require('express').Router()
const passport = require('../passport')
module.exports = router


router.get('/check', (req, res) => {
  const isAuthenticated = req.isAuthenticated()
  const id = req.user !== undefined ? req.user.id : null
  res.send({ isAuthenticated, id })
})

router.get('/google/callback', passport.authenticate('google',
    { successRedirect: '/explore', failureRedirect: '/login' }
))

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))


router.post('/local', passport.authenticate('local'), (req, res, next) => res.redirect('/explore'))

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send(401)
  })
})
